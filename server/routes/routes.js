const express = require('express')
const router = express.Router()
const bankContollers = require('../controllers/bank.controller')

// banks
router.post('/banks/create', bankContollers.createBank)

router.get('/banks/get-all', bankContollers.getAllBanks)

router.delete('/banks/delete/:bankId', bankContollers.deleteBank)

router.put('/banks/edit/:bankId', bankContollers.editBank)

module.exports = router