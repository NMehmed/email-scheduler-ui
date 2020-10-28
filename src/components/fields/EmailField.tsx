import React from 'react'

const EmailField = (props: { value: string, handleChange: Function }) => {
  const value = props.value ? props.value : ''

  return (
    <div className="field">
      <label className="label">Email</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className="input"
          type="email"
          placeholder="Email input"
          value={value}
          onChange={e => props.handleChange(e)} />
        <span className="icon is-small is-left">
          <i className="fas fa-envelope"></i>
        </span>
      </div>
    </div>
  )
}

export default EmailField