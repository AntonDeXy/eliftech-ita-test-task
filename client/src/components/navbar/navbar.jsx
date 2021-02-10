import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MenuIcon from '@material-ui/icons/Menu'
import { isMobile } from 'react-device-detect'

const NavBar = ({ openAuthModal, user, logout }) => {
  if (isMobile) {
    return <MobileMenu user={user} login={openAuthModal} logout={logout} />
  } else {
    return (
      <DesktopMenu user={user} openAuthModal={openAuthModal} logout={logout} />
    )
  }
}

const DesktopMenu = ({ user, openAuthModal, logout }) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/banks">Bank</NavLink>
        </li>
        <li>
          <NavLink to="/mortgage">Mortgage calculator</NavLink>
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

const MobileMenu = ({ user, logout, login }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="mobile-menu">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <NavLink to="/mortgage">Mortgage calculator</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {user?.username ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <span onClick={login}>Login</span>
          )}
        </MenuItem>
      </Menu>
    </div>
  )
}

export default NavBar
