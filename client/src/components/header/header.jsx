import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../navbar/navbar'

import './header.scss'

const Header = (props) => {
  return (
    <div className="header-wrapper">
      <header>
        <Link to='/'><h1>Mortage Calc</h1></Link>
        <NavBar />
      </header>
    </div>
  )
}

export default Header
