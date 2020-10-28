import React from 'react'
import Weekdays from '../../enums/Weekdays'

interface IWeekDaysPickerProps {
  label?: string,
  values: Array<any>,
  handleChange: Function,
}

export default ({ label, values, handleChange }: IWeekDaysPickerProps) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="buttons control">
        {Object.keys(Weekdays).map((day, index) =>
          values.indexOf(day) > -1 ?
          <button key={index} className="button is-primary" onClick={() => handleChange(day)}>{day}</button>
          : <button key={index} className="button" onClick={() => handleChange(day)}>{day}</button>
        )}
      </div>
    </div>
  )
}