import React from 'react'

const NumberInputField = (props: {
  label: string,
  value: number | null,
  handleChange: Function,
  max: number,
  min: number,
}) => {
  const value = props.value ? props.value : ''

  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control">
        <input
          className="input"
          type="number"
          max={props.max}
          min={props.min}
          value={value}
          onChange={e => props.handleChange(e)} />
      </div>
    </div>
  )
}

export default NumberInputField