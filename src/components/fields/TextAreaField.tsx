import React from 'react'

interface ITextAreaFieldProps {
  label?: string,
  value: string,
  handleChange: Function,
}

export default ({ label = 'Message', value, handleChange }: ITextAreaFieldProps) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <textarea className="textarea" placeholder="Textarea" onChange={e => handleChange(e)} value={value} />
      </div>
    </div>
  )
}