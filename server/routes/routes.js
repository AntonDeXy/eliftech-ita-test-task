const express = require('express')
const router = express.Router()
const bankContollers = require('../controllers/bank.controller')
const userContoller = require('../controllers/auth.controller')
const mortageContoller = require('../controllers/mortage.controller')

// banks
router.post('/banks/create', bankContollers.createBank)

router.get('/banks/get-all', bankContollers.getAllBanks)

router.delete('/banks/delete/:bankId', bankContollers.deleteBank)

router.put('/banks/edit/:bankId', bankContollers.editBank)

// mortage
router.post('/add-mortage', mortageContoller.addMortage)

router.delete('/remove-mortage/:mortageId', mortageContoller.removeMortage)

// auth
router.post('/login', userContoller.login)

router.post('/register', userContoller.register)

router.post('/logout', userContoller.logout)

router.post('/get-new-token', userContoller.getNewTokenByRefreshToken)

module.exports = router