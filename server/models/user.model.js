const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mortgages: [new Schema({
    tableData: [{
      month: Number,
      totalPayment: Number,
      interestPayment: Number,
      loanBalance: Number,
      equity: Number
    }],
    bankData: {
      name: String,
      interestRate: Number,
      loanTerm: Number,
    },
    initialLoan: Number,
    downPayment: Number
  }, { timestamps: true })]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)