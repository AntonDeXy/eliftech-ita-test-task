import React from 'react'
import BanksListItem from './banks-list-item'

const BanksList = ({ banks, deleteBank, openBankModal }) => {
  return (
    <div className="banks-list">
      {banks?.map((bank) => {
        return (
          <BanksListItem
            bank={bank}
            deleteBank={deleteBank}
            openBankModal={openBankModal}
          />
        )
      })}
    </div>
  )
}

export default BanksList
