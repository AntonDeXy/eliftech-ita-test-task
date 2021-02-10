const express = require('express')
const router = express.Router()
const mortgageContoller = require('../../controllers/mortgages.controller')

router.post('/add', mortgageContoller.addMortgage)

router.delete('/remove/:mortgageId', mortgageContoller.removeMortgage)

module.exports = router