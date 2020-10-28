import React from 'react'
import Weekdays from '../enums/Weekdays'
import EmailField from './fields/EmailField'
import TextAreaField from './fields/TextAreaField'
import WeekDaysPicker from './fields/WeekDaysPicker'
import CheckboxField from './fields/CheckboxField'

interface IProps {
}

interface INewEmailState {
  emailTo: string,
  message: string,
  isRecurrent: boolean,
  whenToSendIt: Date,
  whichWeeksDaysToBeSent: Array<Weekdays>,
  isLoading: boolean,
}

class NewEmail extends React.Component<IProps, INewEmailState> {
  constructor(props: any) {
    super(props)

    this.state = {
      emailTo: '',
      message: '',
      isRecurrent: false,
      whenToSendIt: new Date(),
      whichWeeksDaysToBeSent: [],
      isLoading: false
    }
  }

  emailChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ emailTo: e.currentTarget.value })
  }

  messageChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({ message: e.currentTarget.value })
  }

  recurrentChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ isRecurrent: e.currentTarget.checked })
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

  scheduleNewEmail = () => {
    this.setState({ isLoading: true })
  }

  render() {
    return (
      <div className="container" >
        <EmailField value={this.state.emailTo} handleChange={this.emailChange} />
        <TextAreaField value={this.state.message} handleChange={this.messageChange} />
        <CheckboxField value={this.state.isRecurrent} handleChange={this.recurrentChange} label="Recurrent email" />
        {this.state.isRecurrent &&
          <WeekDaysPicker label="Repeat on:" values={this.state.whichWeeksDaysToBeSent} handleChange={this.weekdayChange} />
        }
        <div className="field is-grouped">
          <div className="control">
            <button className={this.state.isLoading ? 'button is-primary is-loading' : 'button is-primary'} onClick={this.scheduleNewEmail}>Send</button>
          </div>
        </div>
      </div>
    )
  }
}

export default NewEmail