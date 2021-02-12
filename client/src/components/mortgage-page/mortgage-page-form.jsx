import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

const MortgagePageForm = ({
  banks,
  handleSubmit,
  inputData,
  setInputData,
  chosedBank,
  setChosedBankById,
}) => {
  const [initialLoanError, setInitialLoanError] = useState('')
  const [downPaymentError, setDownPaymentError] = useState('')

  const checkInitialLoan = (loan) => {
    if (loan <= 0) {
      setInitialLoanError('Initial loan must be greater than 0')
      return false
    } else if (loan > chosedBank.maximumLoan) {
      setInitialLoanError(
        `This bank offers maximum ${chosedBank.maximumLoan}`
      )
      return false
    }

    return true
  }

  const checkDownPayment = (downPayment) => {
    setDownPaymentError('')

    if (downPayment <= 0) {
      return setDownPaymentError('Down payment must be greater than 0')
    } else if (downPayment >= inputData.initialLoan) {
      return setDownPaymentError("Down payment can't be greater than loan or equal it")
    }

    const minimumDownPayment = inputData.initialLoan * (chosedBank.minimumDownPayment / 100)
    
    if (inputData.downPayment < minimumDownPayment) {
      return setDownPaymentError(`Down payment must be at least ${chosedBank.minimumDownPayment}% (${Math.ceil(minimumDownPayment)})`)
    } else if (inputData.downPayment >= inputData.initialLoan) {
      return setDownPaymentError("Down payment can't be greater than loan or equal it")
    }

  }

  const checkIfValuesAreRight = (e) => {
    e.preventDefault()

    setDownPaymentError('')
    setInitialLoanError('')

    // check initial loan
    checkInitialLoan(inputData.initialLoan)
    // check initial downpayment
    checkDownPayment(inputData.downPayment)

    handleSubmit()
  }

  return (
    <form onSubmit={checkIfValuesAreRight} autoComplete="off">
      <div className="field-wrapper">
        <TextField
          required
          type="number"
          id="outlined-basic"
          variant="outlined"
          label="Initial loan"
          value={inputData.initialLoan}
          onChange={(e) => {
            setInputData({ ...inputData, initialLoan: e.target.value ? +e.target.value : '' })
          }}
        />
        {initialLoanError && <span className="error-message">{initialLoanError}</span>}
      </div>
      <div className="field-wrapper">
        <TextField
          required
          type="number"
          id="outlined-basic"
          variant="outlined"
          label="Down payment"
          value={inputData.downPayment}
          onChange={(e) =>
            setInputData({ ...inputData, downPayment: e.target.value ? +e.target.value : '' })
          }
        />
        {downPaymentError && <span className="error-message">{downPaymentError}</span>}
      </div>
      <div>
        <InputLabel htmlFor="outlined-age-native-simple">Bank</InputLabel>
        <Select
          native
          required
          value={chosedBank?._id}
          onChange={(e) => setChosedBankById(e.target.value)}
          label="Bank"
          inputProps={{
            name: 'Bank',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          
          {banks?.map(bank => {
            return <option key={bank._id} value={bank._id}>{bank.name}</option>
          })}

        </Select>
      </div>

      <Button type="submit" variant="contained" color="primary">
        Calculate
      </Button>
    </form>
  )
}

export default MortgagePageForm
