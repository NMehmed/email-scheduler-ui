import React from 'react'

interface ICheckboxFieldProps {
  label: string,
  value: boolean,
  handleChange: Function,
}

export default ({ label, value, handleChange }: ICheckboxFieldProps) => {
  return (
    <div className="field">
      <div className="control">
        <label className="checkbox">
          <input type="checkbox" defaultChecked={value} onChange={e => handleChange(e)} />
            {label}
        </label>
      </div>
    </div>
  )
}