import React from 'react'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'

const BanksListItem = ({bank, deleteBank, openBankModal}) => {
  return (
    <div className="bank">
      <h1>{bank.name}</h1>
      <div className="bank__info">
        <span>Interest rate: {bank.interestRate}</span>
        <span>Maximum loan: {bank.maximumLoan}</span>
        <span>Minimum down payment: {bank.minimumDownPayment}</span>
        <span>Loan term: {bank.loanTerm}</span>
      </div>
      <div className="bank__actions">
        <EditIcon
          className="bank__actions__edit-icon"
          onClick={() => openBankModal('edit', bank)}
        />
        <DeleteForeverIcon
          className="bank__actions__delete-icon"
          onClick={() => deleteBank(bank._id)}
        />
      </div>
    </div>
  )
}

export default BanksListItem
