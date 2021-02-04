const express = require('express')
const router = express.Router()
const userContoller = require('../../controllers/auth.controller')

router.post('/login', userContoller.login)

router.post('/register', userContoller.register)

router.post('/logout', userContoller.logout)

router.post('/get-new-token', userContoller.getNewTokenByRefreshToken)

module.exports = router