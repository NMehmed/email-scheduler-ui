import React from 'react'

interface ITextAreaFieldProps {
  label?: string,
  value: string,
  handleChange: Function,
  placeholder?: string,
}

export default ({ label = 'Message', value, handleChange, placeholder = '' }: ITextAreaFieldProps) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <textarea className="textarea" placeholder={placeholder} onChange={e => handleChange(e)} value={value} />
      </div>
    </div>
  )
}