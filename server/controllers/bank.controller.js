const BankModel = require('../models/bank.model')

exports.createBank = async (req,res) => {
  const newBank = new BankModel({
    name: req.body.bank.name,
    interestRate: req.body.bank.interestRate,
    maximumLoan: req.body.bank.maximumLoan,
    minimumDownPayment: req.body.bank.minimumDownPayment,
    loanTerm: req.body.bank.loanTerm
  })

  try {
    const createdBank = await newBank.save()
    res.json({success: true, bank: createdBank._doc})
  } catch (err) {
    res.json({success: false})
  }
} 

exports.getAllBanks = async (req,res) => {
  try {
    const banks = await BankModel.find({})
    res.json({success: true, banks})
  } catch (err) {
    res.json({success: false})
  }
} 

exports.editBank = async (req,res) => {
  try {
    const bank = await BankModel.findOne({_id: req.params.bankId})
    const bankFromReq = req.body.bank

    bank.name = bankFromReq.name
    bank.interestRate = bankFromReq.interestRate
    bank.maximumLoan = bankFromReq.maximumLoan
    bank.minimumDownPayment = bankFromReq.minimumDownPayment
    bank.loanTerm = bankFromReq.loanTerm

    const updatedBank = await bank.save()

    res.json({success: true, bank: await BankModel.findOne({_id: req.params.bankId})})
  } catch (err) {
    console.log(err)
    res.json({success: false})
  }
} 
 
exports.deleteBank = async (req,res) => {
  try {
    await BankModel.findOneAndDelete({_id: req.params.bankId})

    res.json({success: true})
  } catch (err) {
    res.json({success: false})
  }
} 
