const express = require('express')
const router = express.Router()

const authRoutes = require('./auth/index')
const banksRoutes = require('./banks/index')
const mortgagesRoutes = require('./mortgage/index')

router.use('/auth', authRoutes)
router.use('/banks', banksRoutes)
router.use('/mortgages', mortgagesRoutes)

module.exports = router