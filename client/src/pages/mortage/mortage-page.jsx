import React, { useState } from 'react'
import MortagePageForm from '../../components/mortage-page/mortage-page-form'

import './mortage-page.scss'

const MortagePage = ({ banks }) => {
  const initialInputData = {
    initialLoan: 0,
    downPayment: 0,
  }

  const [inputData, setInputData] = useState(initialInputData)
  const [chosedBank, setChosedBank] = useState({})
  const [monthlyPayment, setMonthlyPayment] = useState()

  const setChosedBankById = (id) => {
    const bank = banks.find((bank) => bank._id === id)
    setChosedBank(bank)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!chosedBank) {
      return false
    }

    const monthlyPayment =
      (inputData.initialLoan *
        (chosedBank.interestRate / 100 / 12) *
        (1 + chosedBank.interestRate / 100 / 12) ** chosedBank.loanTerm) /
      ((1 + chosedBank.interestRate / 100 / 12) ** chosedBank.loanTerm - 1)
    /* 
      m = (P * (r \ 12) * ((1 + r / 12)**n)) / (((1+r/12)**n) - 1)
    */
    setMonthlyPayment(monthlyPayment)
  }

  return (
    <div className="mortage-page">
      <MortagePageForm
        banks={banks}
        handleSubmit={handleSubmit}
        inputData={inputData}
        setInputData={setInputData}
        chosedBank={chosedBank}
        setChosedBankById={setChosedBankById}
      />

      {monthlyPayment && (
        <span>montlyPayment: {monthlyPayment.toFixed(2)}</span>
      )}
    </div>
  )
}

export default MortagePage
