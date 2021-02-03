const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bankSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  interestRate: {
    type: Number, // min 0, max 100
    required: true
  },
  maximumLoan: {
    type: Number,
    required: true
  },
  minimumDownPayment: {
    type: Number, // min 0, max 100
    required: true
  },
  loanTerm: {
    type: Number, // months counte
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Bank', bankSchema)