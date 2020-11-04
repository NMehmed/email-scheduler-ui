import React from 'react'
import { IMailSchedule } from '../types/IEmailSchedule'
import WhenToStop from '../enums/WhenToStop'

interface IProps {
}

interface IHomeState {
  isFetching: boolean,
  emailSchedules: Array<IMailSchedule>,
}

class Home extends React.Component<IProps, IHomeState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      isFetching: false,
      emailSchedules: [],
    }
  }

  componentDidMount() {
    this.fetchEmailSchedules()
  }

  fetchEmailSchedules = async () => {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/active-mails-schedule`
    this.setState({ isFetching: true })

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }).then(res => res.json())

      this.setState({ emailSchedules: response.activeSchedules })
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({ isFetching: false })
    }
  }

  renderWhenToStopMails({ whenToStopMails, occurrancy }: IMailSchedule) {
    return (
      <span>
        {whenToStopMails.whenToStop === WhenToStop.never && "never"}
        {whenToStopMails.whenToStop === WhenToStop.afterSomeOccurency &&
          <span>Sent {occurrancy} times, out of {whenToStopMails.occurrancy}</span>
        }
        {whenToStopMails.whenToStop === WhenToStop.onDate &&
          <span>Will stop sending mails on {whenToStopMails.stopDate}</span>
        }
      </span>
    )
  }

  render() {
    return (
      <div className="container">
        {this.state.isFetching &&
          <h2 className="is-size-2">Fetching Current Active Mail Scedules List</h2>
        }
        {
          !this.state.isFetching &&
          <table className="table">
            <thead>
              <tr>
                <th>Send To</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Time(UTC)</th>
                <th>Days of Week</th>
                <th>Day Of Month</th>
                <th>When To Stop</th>
              </tr>
            </thead>
            <tbody>
              {this.state.emailSchedules.length > 0 &&
                this.state.emailSchedules.map((emailSchedule, index) =>
                  <tr key={index}>
                    <td>{emailSchedule.emailTo}</td>
                    <td>{emailSchedule.subject}</td>
                    <td>{emailSchedule.message}</td>
                    <td>{emailSchedule.tickTime && emailSchedule.tickTime}</td>
                    <td>{emailSchedule.weeksDays
                      && emailSchedule.weeksDays.length > 0
                      && emailSchedule.weeksDays.map((day, i) =>
                        <span key={i}> {day}</span>)}
                    </td>
                    <td>{emailSchedule.dayOfMonth}</td>
                    <td>
                      {this.renderWhenToStopMails(emailSchedule)}
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        }
      </div>
    )
  }
}

export default Home