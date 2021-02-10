import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../navbar/navbar'

import './header.scss'

const Header = ({openAuthModal, user, logout}) => {
  return (
    <div className="header-wrapper">
      <header>
        <Link to='/'><h1>Mortgage Calc</h1></Link>
        <NavBar logout={logout} user={user} openAuthModal={openAuthModal} />
      </header>
    </div>
  )
}

export default Header
