import React from 'react'
import { NavLink } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const NavBar = ({ openAuthModal, user, logout }) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/banks">Bank</NavLink>
        </li>
        <li>
          <NavLink to="/mortage">Mortage calculator</NavLink>
        </li>
        {user?.username ? (
          <>
            <li>
              <span className="username">Hey, {user.username}</span>
            </li>
            <li>
              <ExitToAppIcon onClick={logout} />
            </li>
          </>
        ) : (
          <li>
            <span onClick={openAuthModal}>Login</span>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
