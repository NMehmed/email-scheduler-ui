import React from 'react'
import IAlertProps from '../../types/IAlertProps'

const Alert = ({ message, status, onCloseClick }: IAlertProps) => {
  return (
    <div className={status === 'success' ? 'notification is-primary' : 'notification is-danger'} >
      { onCloseClick &&
        <button className="delete" onClick={(e) => onCloseClick(e)}></button>
      }
      {message}
    </div >
  )
}

export default Alert