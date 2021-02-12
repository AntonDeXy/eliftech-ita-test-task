import React from 'react'
import Button from '@material-ui/core/Button'
import { Popconfirm } from 'antd'

const MortgagesHistoryCard = ({ mortgage, removeMortgage, showTable }) => {
  return (
    <div className="mortgages-history__card">
      <div className="data">
        <span>loan: {mortgage.initialLoan}</span>
        <span>bank name: {mortgage.bankData?.name}</span>
        <span>term: {mortgage.bankData?.loanTerm}</span>
        <span>rate: {mortgage.bankData?.interestRate}</span>
      </div>
      <div className="buttons">
        <Button variant="contained" color="primary" onClick={showTable}>
          show
        </Button>

        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={removeMortgage}
          okText="Yes"
          cancelText="No"
        >
          <Button variant="contained" color="primary">
            remove
          </Button>
        </Popconfirm>
      </div>
    </div>
  )
}

export default MortgagesHistoryCard
