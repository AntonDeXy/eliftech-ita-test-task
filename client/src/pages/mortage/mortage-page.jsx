import React, { useState } from 'react'
import MortagePageForm from '../../components/mortage-page/mortage-page-form'
import MortagePageTable from '../../components/mortage-page/mortage-page-table'

import './mortage-page.scss'

const MortagePage = ({ banks }) => {
  const initialInputData = {
    initialLoan: 0,
    downPayment: 0,
  }

  const [inputData, setInputData] = useState(initialInputData)
  const [chosedBank, setChosedBank] = useState({})
  const [monthlyPayment, setMonthlyPayment] = useState()
  const [tableData, setTableData] = useState([])

  const setChosedBankById = (id) => {
    const bank = banks.find((bank) => bank._id === id)
    setChosedBank(bank)
  }

  const getMonthlyPayment = (initialLoan, interestRate, loanTerm) => {
    const monthlyPayment = (
      (initialLoan *
        (interestRate / 100 / 12) *
        (1 + interestRate / 100 / 12) ** loanTerm) /
      ((1 + interestRate / 100 / 12) ** loanTerm - 1)
    ).toFixed(2)

    /* 
      m = (P * (r \ 12) * ((1 + r / 12)**n)) / (((1+r/12)**n) - 1)
    */

    return +monthlyPayment
  }

  const handleSubmit = () => {
    let tableData = []

    if (!chosedBank) {
      return false
    }

    const monthlyPayment = getMonthlyPayment(
      inputData.initialLoan,
      chosedBank.interestRate,
      chosedBank.loanTerm
    )

    for (let i = 1; i <= chosedBank.loanTerm; i++) {
      const prevLoanBalance =
        i === 1 ? inputData.initialLoan : tableData[i - 2].loanBalance

      const prevEquity =
        i === 1 ? inputData.downPayment : +tableData[i - 2].equity

      const monthlyRate = (chosedBank.interestRate / 100 / 12).toFixed(5)

      const interestPayment = prevLoanBalance * +monthlyRate
      
      const leftToPay = (
        prevLoanBalance -
        (+monthlyPayment - interestPayment)
      ).toFixed(2)

      const tempTableData = {
        month: i,
        totalPayment: monthlyPayment.toFixed(2),
        interestPayment: +interestPayment.toFixed(2),
        loanBalance: leftToPay < 1 ? 0 : leftToPay,
        equity: (prevEquity + (monthlyPayment - interestPayment)).toFixed(2),
      }

      tableData.push(tempTableData)
    }

    setTableData(tableData)
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

      {monthlyPayment && <span>montlyPayment: {monthlyPayment.toFixed(2)}</span>}

      {tableData.length > 0 && <MortagePageTable tableData={tableData} />}
    </div>
  )
}

export default MortagePage
