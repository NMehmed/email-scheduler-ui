import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <nav className="navbar is-primary mb-4" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-start">
          <NavLink className="navbar-item has-text-weight-bold" to="/">Home</NavLink>
          <NavLink className="navbar-item has-text-weight-bold" to="/new-email">New Email</NavLink>
        </div>
      </div>
      <hr className="navbar-divider" />
    </nav>
  )
}

export default Header