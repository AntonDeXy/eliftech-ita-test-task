import React, { useEffect, useMemo, useState } from 'react'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import api from '../../api/api'

import './bank-modal.scss'

const BankModal = ({ modalData, closeModal }) => {
  const initialBankState = useMemo(() => ({
    name: '',
    interestRate: 0,
    maximumLoan: 0,
    minimumDownPayment: 0,
    loanTerm: 0,
  }), []) 

  const [bank, setBank] = useState({})

  useEffect(() => {
    if (modalData.type === "edit") {
      setBank(modalData.bankData)
    } else {
      setBank(initialBankState)
    }
  }, [initialBankState, modalData.bankData, modalData.type])

  const closeModalAndClearBankData = () => {
    setBank(initialBankState)
    closeModal()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = modalData.type === 'edit' 
    ? await api.editBank(bank._id, bank)
    : await api.createBank(bank)

    if (res.success) {
      closeModalAndClearBankData()
    }
  }

  const checkIfValueIsRight = (value, min, max) => {
    if (value >= min && (max ? value <= max : true)) {
      return true
    }
    return false
  }

  return (
    <Modal className='create-bank-modal__wrapper' open={modalData.isOpen}>
      <div className="create-bank-modal">
        <div className="create-bank-modal__header">
          <h2>Create bank</h2>
          <CloseIcon onClick={closeModalAndClearBankData} />
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField 
            required
            id="outlined-basic" variant="outlined"
            label="Name" 
            value={bank.name} 
            onChange={(e) => setBank({...bank, name: e.target.value})}
          />
          <TextField 
            required
            type='number'
            id="outlined-basic" variant="outlined"
            label="Interest rate %" 
            value={bank.interestRate} 
            onChange={(e) => checkIfValueIsRight(e.target.value, 0, 100) && setBank({...bank, interestRate: e.target.value})}
          />
          <TextField 
            required
            type='number'
            id="outlined-basic" variant="outlined"
            label="Maximum loan" 
            value={bank.maximumLoan} 
            onChange={(e) => checkIfValueIsRight(e.target.value, 0) &&  setBank({...bank, maximumLoan: e.target.value})}
          />
          <TextField 
            required
            type='number'
            id="outlined-basic" variant="outlined"
            label="Minimum down payment %" 
            value={bank.minimumDownPayment} 
            onChange={(e) => checkIfValueIsRight(e.target.value, 0, 100) &&  setBank({...bank, minimumDownPayment: e.target.value})}
          />
          <TextField 
            required
            type='number'
            id="outlined-basic" variant="outlined"
            label="Loan term (month count)" 
            value={bank.loanTerm} 
            onChange={(e) => checkIfValueIsRight(e.target.value, 0) &&  setBank({...bank, loanTerm: e.target.value})}
          />
          <Button type="submit" variant="contained" color="primary">
            {modalData.type === "edit" ? 'Edit' : 'Create'}
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default BankModal
