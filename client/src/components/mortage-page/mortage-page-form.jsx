import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

const MortagePageForm = ({
  banks,
  handleSubmit,
  inputData,
  setInputData,
  chosedBank,
  setChosedBankById,
}) => {
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <TextField
        required
        type="number"
        id="outlined-basic"
        variant="outlined"
        label="Initial loan"
        value={inputData.initialLoan}
        onChange={(e) =>
          setInputData({ ...inputData, initialLoan: +e.target.value })
        }
      />
      <TextField
        required
        type="number"
        id="outlined-basic"
        variant="outlined"
        label="Down payment"
        value={inputData.downPayment}
        onChange={(e) =>
          setInputData({ ...inputData, downPayment: +e.target.value })
        }
      />
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
          {banks?.map((bank) => {
            return <option value={bank._id}>{bank.name}</option>
          })}
        </Select>
      </div>

      <Button type="submit" variant="contained" color="primary">
        Calculate
      </Button>
    </form>
  )
}

export default MortagePageForm
