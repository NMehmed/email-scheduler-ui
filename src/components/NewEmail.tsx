import React from 'react'
import Weekdays from '../enums/Weekdays'
import EmailField from './fields/EmailField'
import TextAreaField from './fields/TextAreaField'
import WeekDaysPicker from './fields/WeekDaysPicker'
import CheckboxField from './fields/CheckboxField'
import TextInputField from './fields/TextInputField'
import NumberInputField from './fields/NumberInputField'
import WhenToStopMailsField from './fields/WhenToStopMailsField'
import IWhenToStopMailsState from '../types/IWhenToStopMailsState'
import WhenToStop from '../enums/WhenToStop'
import TimePicker from 'rc-time-picker'
import IAlertProps from '../types/IAlertProps'

import 'rc-time-picker/assets/index.css';
import Alert from './alerts/Alert'

interface IProps {
}

interface INewEmailState {
  emailTo: string,
  subject: string,
  message: string,
  isRecurrent: boolean,
  whenToBeSent: Date,
  whichWeeksDaysToBeSent: Array<Weekdays>,
  isLoading: boolean,
  dayOfMonth: number | null,
  whenToStopMails: IWhenToStopMailsState,
  tickTime: string | null,
  showAlert: boolean,
  alertProps: IAlertProps,
}

class NewEmail extends React.Component<IProps, INewEmailState> {
  constructor(props: any) {
    super(props)

    this.state = {
      emailTo: '',
      subject: '',
      message: '',
      isRecurrent: true,
      whenToBeSent: new Date(),
      whichWeeksDaysToBeSent: [],
      isLoading: false,
      dayOfMonth: null,
      tickTime: null,
      whenToStopMails: {
        whenToStop: WhenToStop.never,
        occurrancy: 1,
        stopDate: new Date(),
      },
      showAlert: false,
      alertProps: {
        status: 'success',
        message: '',
      }
    }
  }

  emailChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ emailTo: e.currentTarget.value })
  }

  subjectChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ subject: e.currentTarget.value })
  }

  messageChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({ message: e.currentTarget.value })
  }

  recurrentChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ isRecurrent: e.currentTarget.checked })
  }

  dayOfMonthChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ dayOfMonth: parseInt(e.currentTarget.value) })
  }

  weekdayChange = (day: Weekdays) => {
    const whichWeeksDaysToBeSent = this.state.whichWeeksDaysToBeSent
    const pickedDayIndex = whichWeeksDaysToBeSent.findIndex(x => x === day)

    if (pickedDayIndex > -1) {
      whichWeeksDaysToBeSent.splice(pickedDayIndex, 1)
    } else {
      whichWeeksDaysToBeSent.push(day)
    }

    this.setState({ whichWeeksDaysToBeSent })
  }

  onWhenToStopMailsChange = (whenToStopMails: IWhenToStopMailsState) => {
    this.setState({ whenToStopMails })
  }

  onTickTimeChange = (time: any) => {
    this.setState({ tickTime: time.format('HH:mm') })
  }

  onAlertClose = () => {
    this.setState({ showAlert: false })
  }

  onSubmit = async () => {
    this.setState({ isLoading: true })

    if (this.state.isRecurrent) {
      await this.scheduleNewEmail()
    } else {
      await this.sendMail()
    }

    this.setState({ isLoading: false })
  }

  sendMail = async () => {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/send-mail`
    const body = JSON.stringify({
      emailTo: this.state.emailTo,
      subject: this.state.subject,
      message: this.state.message,
      whenToBeSent: this.state.whenToBeSent.toISOString(),
    })

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body
    }).then(res => res.json())

    if (response.awesome) {
      this.setState({
        showAlert: true,
        alertProps: {
          status: 'success',
          message: 'Mail sent successfully',
        }
      })
    } else {
      this.setState({
        showAlert: true,
        alertProps: {
          status: 'error',
          message: `Failed to send mail ${response.message ? response.message : ''}`
        }
      })
    }
  }

  scheduleNewEmail = async () => {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/schedule-mail`
    const body = JSON.stringify({
      emailTo: this.state.emailTo,
      subject: this.state.subject,
      message: this.state.message,
      dayOfMonth: this.state.dayOfMonth,
      weeksDays: this.state.whichWeeksDaysToBeSent,
      whenToStopMails: {
        ...this.state.whenToStopMails,
        stopDate: this.state.whenToStopMails?.stopDate.toISOString()
      },
      tickTime: this.state.tickTime,
    })

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body
    }).then(res => res.json())

    if (response.awesome) {
      this.setState({
        showAlert: true,
        alertProps: {
          status: 'success',
          message: 'Scheduled successfully',
        }
      })
    } else {
      this.setState({
        showAlert: true,
        alertProps: {
          status: 'error',
          message: `Failed to schedule mail ${response.message ? response.message : ''}`
        }
      })
    }
  }

  renderRecurrentMailOptions = () => {
    return (
      <div>
        <div className="control">
          <label className="label">
            Time of day
            <div>
              <TimePicker showSecond={false} onChange={this.onTickTimeChange} />
            </div>
          </label>
        </div>
        <WeekDaysPicker label="Repeat on:" values={this.state.whichWeeksDaysToBeSent} handleChange={this.weekdayChange} />
        <NumberInputField label="Every day of month" value={this.state.dayOfMonth} handleChange={this.dayOfMonthChange} min={1} max={31} />
        <WhenToStopMailsField value={this.state.whenToStopMails} onChange={this.onWhenToStopMailsChange} />
      </div>
    )
  }

  render() {
    return (
      <div className="container" >
        {this.state.showAlert &&
          <Alert message={this.state.alertProps.message} status={this.state.alertProps.status} onCloseClick={this.onAlertClose} />
        }
        <EmailField value={this.state.emailTo} handleChange={this.emailChange} />
        <TextInputField label="Subject" placeholder="Email Subject" value={this.state.subject} handleChange={this.subjectChange} />
        <TextAreaField value={this.state.message} handleChange={this.messageChange} />
        <CheckboxField value={this.state.isRecurrent} handleChange={this.recurrentChange} label="Recurrent email" />
        {this.state.isRecurrent &&
          this.renderRecurrentMailOptions()
        }
        <div className="field is-grouped">
          <div className="control">
            <button className={this.state.isLoading ? 'button is-primary is-loading' : 'button is-primary'} onClick={this.onSubmit}>Send</button>
          </div>
        </div>
      </div>
    )
  }
}

export default NewEmail