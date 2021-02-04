import React from 'react'
import BanksListItem from './banks-list-item'
import { motion } from 'framer-motion'

const BanksList = ({ banks, deleteBank, openBankModal }) => {
  return (
    <div className="banks-list">
      {banks?.map((bank) => {
        return (
          <motion.div
            className="animation-wrapper"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <BanksListItem
              bank={bank}
              deleteBank={deleteBank}
              openBankModal={openBankModal}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

export default BanksList
