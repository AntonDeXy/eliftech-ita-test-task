import React, { useState } from 'react'
import MortgagePageForm from '../../components/mortgage-page/mortgage-page-form'
import MortgagePageTable from '../../components/mortgage-page/mortgage-page-table'
import MortgagesHistory from '../../components/mortgage-page/mortgages-history'

import './mortgage-page.scss'

const MortgagePage = ({ banks, mortgagesHistory, createMortgage, removeMortgage }) => {
  const initialInputData = {
    initialLoan: '',
    downPayment: '',
  }

  const [inputData, setInputData] = useState(initialInputData)
  const [chosedBank, setChosedBank] = useState({})
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

  const showTableFromHistory = (mortange) => {
    setInputData(initialInputData)
    setTableData(mortange)
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
        totalPayment: +(monthlyPayment.toFixed(2)),
        interestPayment: +interestPayment.toFixed(2),
        loanBalance: +(leftToPay < 1 ? 0 : leftToPay),
        equity: +(prevEquity + (monthlyPayment - interestPayment)).toFixed(2),
      }

      tableData.push(tempTableData)
    }

    setTableData(tableData)
    createMortgage({
      tableData,
      bankData: {
        name: chosedBank.name,
        interestRate: chosedBank.interestRate,
        loanTerm: chosedBank.loanTerm,
      },
      initialLoan: inputData.initialLoan,
      downPayment: inputData.downPayment
    })
  }

  return (
    <div className="mortgage-page">
      <MortgagePageForm
        banks={banks}
        handleSubmit={handleSubmit}
        inputData={inputData}
        setInputData={setInputData}
        chosedBank={chosedBank}
        setChosedBankById={setChosedBankById}
      />

      {tableData.length > 0 && <MortgagePageTable tableData={tableData} />}
    
      <MortgagesHistory showTableFromHistory={showTableFromHistory} removeMortgage={removeMortgage} mortgagesHistory={mortgagesHistory} />
    </div>
  )
}

export default MortgagePage
