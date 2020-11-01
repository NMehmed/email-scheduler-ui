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
  whenToStopMails: IWhenToStopMailsState | null
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
      whenToStopMails: null,
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

  onSubmit = async () => {
    this.setState({ isLoading: true })

    if (this.state.isRecurrent) {
      await this.scheduleNewEmail()
    } else {
      await this.sendMail()
    }

    this.setState({ isLoading: false })
  }

  sendMail = () => {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/send-mail`
    const body = JSON.stringify({
      emailTo: this.state.emailTo,
      subject: this.state.subject,
      message: this.state.message,
      whenToBeSent: this.state.whenToBeSent.toISOString(),
    })

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body
    })
  }

  scheduleNewEmail = () => {
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
    })

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body
    })
  }

  renderRecurrentMailOptions = () => {
    return (
      <div>
        <NumberInputField label="Every day of month" value={this.state.dayOfMonth} handleChange={this.dayOfMonthChange} min={1} max={31} />
        <WeekDaysPicker label="Repeat on:" values={this.state.whichWeeksDaysToBeSent} handleChange={this.weekdayChange} />
        <WhenToStopMailsField onChange={this.onWhenToStopMailsChange} />
      </div>
    )
  }

  render() {
    return (
      <div className="container" >
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