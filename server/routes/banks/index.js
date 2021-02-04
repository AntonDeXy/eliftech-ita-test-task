const express = require('express')
const router = express.Router()
const bankContollers = require('../../controllers/bank.controller')

router.post('/create', bankContollers.createBank)

router.get('/get-all', bankContollers.getAllBanks)

router.delete('/delete/:bankId', bankContollers.deleteBank)

router.put('/edit/:bankId', bankContollers.editBank)

module.exports = router
