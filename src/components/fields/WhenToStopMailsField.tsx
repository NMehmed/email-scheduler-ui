import React from 'react'
import WhenToStop from '../../enums/WhenToStop'
import IWhenToStopMailsState from '../../types/IWhenToStopMailsState'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

interface IWhenToStopMailsFieldProps {
  onChange: Function,
}

class WhenToStopMailsField extends React.Component<IWhenToStopMailsFieldProps, IWhenToStopMailsState> {
  constructor(props: IWhenToStopMailsFieldProps) {
    super(props)

    this.state = {
      whenToStop: WhenToStop.never,
      stopDate: new Date(),
      occurrancy: 0,
    }
  }

  onWhenToStopChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ whenToStop: e.currentTarget.value as WhenToStop }, this.props.onChange(this.state))
  }

  onDateChange = (date: Date) => {
    this.setState({ stopDate: date }, this.props.onChange(this.state))
  }

  onOcurrancyChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ occurrancy: parseInt(e.currentTarget.value) }, this.props.onChange(this.state))
  }

  render() {
    return (
      <div className="field">
        <label className="label">When to stop sending mails</label>
        <div className="control mb-4">
          <label className="radio">
            <input type="radio" name="answer" value={WhenToStop.never} checked={this.state.whenToStop === WhenToStop.never} onChange={this.onWhenToStopChange} />
            Never
        </label>
        </div>
        <div className="control mb-4">
          <label className="radio mr-4">
            <input type="radio" name="answer" value={WhenToStop.onDate} checked={this.state.whenToStop === WhenToStop.onDate} onChange={this.onWhenToStopChange} />
          Stop sending on

          </label>
          <DatePicker
            selected={this.state.stopDate}
            onChange={this.onDateChange}
            minDate={new Date()}
            disabled={this.state.whenToStop !== WhenToStop.onDate}
            className="input"
          />
        </div>
        <div className="control mb-4">
          <label className="radio mr-4">
            <input type="radio" name="answer" value={WhenToStop.afterSomeOccurency} checked={this.state.whenToStop === WhenToStop.afterSomeOccurency} onChange={this.onWhenToStopChange} />
          After
        </label>
          <label>
            <input value={this.state.occurrancy} min="1" style={{ width: '80px' }} className="input mr-4" type="number" onChange={this.onOcurrancyChange} disabled={this.state.whenToStop !== WhenToStop.afterSomeOccurency} />
              occurrences
          </label>
        </div>
      </div>
    )
  }
}

export default WhenToStopMailsField