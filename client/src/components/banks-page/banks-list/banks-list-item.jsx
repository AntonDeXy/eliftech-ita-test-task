import React from 'react'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import { Popconfirm } from 'antd'

const BanksListItem = ({ bank, deleteBank, openBankModal }) => {
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
        <Popconfirm
          title="Are you sure to delete this bank?"
          onConfirm={deleteBank}
          okText="Yes"
          cancelText="No"
        >
          <DeleteForeverIcon className="bank__actions__delete-icon" />
        </Popconfirm>
      </div>
    </div>
  )
}

export default BanksListItem
