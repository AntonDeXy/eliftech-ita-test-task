const express = require('express')
const router = express.Router()
const mortageContoller = require('../../controllers/mortage.controller')

router.post('/add', mortageContoller.addMortage)

router.delete('/remove/:mortageId', mortageContoller.removeMortage)

module.exports = router