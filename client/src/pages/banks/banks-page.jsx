import React from 'react'
import BanksList from '../../components/banks-page/banks-list/banks-list'
import BanksPageHeader from '../../components/banks-page/banks-page-header'

import './banks-page.scss'

const BanksPage = ({ banks, deleteBank, openBankModal }) => {
  return (
    <div className="banks-page">
      <BanksPageHeader openBankModal={openBankModal} />
      <BanksList 
        banks={banks} 
        deleteBank={deleteBank} 
        openBankModal={openBankModal} />
    </div>
  )
}

export default BanksPage
