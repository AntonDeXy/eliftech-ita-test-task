import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Modal from '@material-ui/core/Modal'
import { motion } from 'framer-motion'
import CloseIcon from '@material-ui/icons/Close'

import './auth-page.scss'

const AuthModal = ({ isModalOpen, closeModal, login, register }) => {
  const [isLogin, setLogin] = useState(true)
  const [error, setError] = useState('')
  const [authData, setAuthData] = useState({ username: '', password: '' })

  const closeModalAndClearAuthData = () => {
    setAuthData({})
    closeModal()
  }

  const handleUsernameChange = (e) => {
    setError('')

    setAuthData({ ...authData, username: e.target.value })
  }


  const handlePasswordChange = (e) => {
    setError('')

    setAuthData({ ...authData, password: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setError('')

    if (authData.username.trim().length < 4) {
      return setError('Username must be longer than 4 symbols')
    } else if (authData.password.trim().length < 8) {
      return setError('Passwords must be longer than 8 symbols')
    }

    const res = isLogin ? await login(authData) : await register(authData)

    if (res.success) {
      closeModalAndClearAuthData()
    } else {
      setError( res.msg ? res.msg : 'Something went wrong')
    }
  }

  return (
    <Modal className="auth-modal__wrapper" open={isModalOpen}>
      <motion.div
        className="animation-wrapper"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="auth-modal">
          <div className="auth-modal__header">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <CloseIcon onClick={closeModalAndClearAuthData} />
          </div>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              id="outlined-basic"
              variant="outlined"
              label="Username"
              value={authData.username}
              onChange={handleUsernameChange}
            />
            <TextField
              required
              id="outlined-basic"
              variant="outlined"
              label="Password"
              type='password'
              value={authData.password}
              onChange={handlePasswordChange}
            />

            {error && <span className='error-message'>{error}</span>}

            <div className="buttons">
              <Button type="submit" variant="contained" color="primary">
                {isLogin ? 'Login' : 'Register'}
              </Button>

              <Button
                onClick={() => setLogin(!isLogin)}
                type="button"
                variant="outlined"
                color="primary"
              >
                {isLogin
                  ? "I don't have an account"
                  : 'I already have an account'}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </Modal>
  )
}

export default AuthModal
