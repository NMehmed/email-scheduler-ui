import React from 'react'

const TextInputField = (props: {
  label: string,
  placeholder: string,
  value: string,
  handleChange: Function,
}) => {
  const value = props.value ? props.value : ''

  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder={props.placeholder}
          value={value}
          onChange={e => props.handleChange(e)} />
      </div>
    </div>
  )
}

export default TextInputField