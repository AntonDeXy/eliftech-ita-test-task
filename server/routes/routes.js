const express = require('express')
const router = express.Router()

const authRoutes = require('./auth/index')
const banksRoutes = require('./banks/index')
const mortagesRoutes = require('./mortage/index')

router.use('/auth', authRoutes)
router.use('/banks', banksRoutes)
router.use('/mortages', mortagesRoutes)

module.exports = router