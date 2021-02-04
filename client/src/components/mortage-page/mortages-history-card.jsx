import React from 'react'
import Button from '@material-ui/core/Button'

const MortagesHistoryCard = ({ mortage, removeMortage, showTable }) => {
  return (
    <div className='mortages-history__card'>
      <div className="data">
        <span>loan: {mortage.initialLoan}</span>
        <span>bank name: {mortage.bankData?.name}</span>
        <span>term: {mortage.bankData?.loanTerm}</span>
        <span>rate: {mortage.bankData?.interestRate}</span>
      </div>
      <div className="buttons">
        <Button variant="contained" color="primary" onClick={showTable} >show</Button>
        <Button variant="contained" color="primary" onClick={removeMortage}>remove</Button>
      </div>
    </div>
  )
}

export default MortagesHistoryCard
