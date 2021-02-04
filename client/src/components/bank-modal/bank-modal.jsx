import React, { useEffect, useMemo, useState } from 'react'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import api from '../../api/api'

import './bank-modal.scss'

const BankModal = ({ modalData, closeModal, createBank, updateBank }) => {
  const initialBankState = useMemo(() => ({
    name: '',
    interestRate: 0,
    maximumLoan: 0,
    minimumDownPayment: 0,
    loanTerm: 0,
  }), []) 

  const [bank, setBank] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')

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

    setError('')

    const bankKeys = Object.keys(initialBankState)

    const isAnyValueEqualsZero = bankKeys.some(key => bank[key] === 0)

    if (isAnyValueEqualsZero) {
      return setError('Values must be greates than 0')
    }

    const res = modalData.type === 'edit' 
    ? await updateBank(bank._id, bank)
    : await createBank(bank)

    if (res) {
      closeModalAndClearBankData()
    } else {
      setError('Something went wrong, try again later')
    }
  }

  const handleNumberChange = (value, key, min, max) => {
    if (checkIfValueIsRight(value, min, max)) {
      setBank({...bank, [key]: value})
    }
  }

  const checkIfValueIsRight = (value, min, max) => {
    setError('')

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
            onChange={e => handleNumberChange(+e.target.value, 'interestRate', 0, 100)}
          />
          <TextField 
            required
            type='number'
            id="outlined-basic" variant="outlined"
            label="Maximum loan" 
            value={bank.maximumLoan} 
            onChange={e => handleNumberChange(+e.target.value, 'maximumLoan', 0)}
          />
          <TextField 
            required
            type='number'
            id="outlined-basic" variant="outlined"
            label="Minimum down payment %" 
            value={bank.minimumDownPayment} 
            onChange={e => handleNumberChange(+e.target.value, 'minimumDownPayment', 0, 100)}
          />
          <TextField 
            required
            type='number'
            id="outlined-basic" variant="outlined"
            label="Loan term (month count)" 
            value={bank.loanTerm} 
            onChange={e => handleNumberChange(+e.target.value, 'loanTerm', 0)}
          />

          {error && <span className='error-message'>{error}</span>}
          
          <Button type="submit" variant="contained" color="primary">
            {modalData.type === "edit" ? 'Edit' : 'Create'}
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default BankModal
