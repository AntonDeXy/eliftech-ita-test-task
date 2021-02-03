import React from 'react'
import Button from '@material-ui/core/Button'

const BanksPageHeader = ({ openBankModal }) => {
  return (
    <div className="banks-page__header">
      <h3>Banks</h3>
      <Button
        variant="contained"
        color="primary"
        onClick={() => openBankModal('create')}
      >
        Create bank
      </Button>
    </div>
  )
}

export default BanksPageHeader
