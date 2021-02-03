import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/banks">Bank</NavLink>
        </li>
        <li>
          <NavLink to="/mortage">Mortage calculator</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
