import React from 'react'
import MortgagesHistoryCard from './mortgages-history-card'

const MortgagesHistory = ({mortgagesHistory, removeMortgage, showTableFromHistory}) => {
  const sortedMortgageHistoryItems = mortgagesHistory && mortgagesHistory.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
  
  return (
    <div className="mortgages-history">
      {sortedMortgageHistoryItems && sortedMortgageHistoryItems.map(mortgage => {
        return <MortgagesHistoryCard key={mortgage._id} showTable={() => showTableFromHistory(mortgage.tableData)} mortgage={mortgage} removeMortgage={() => removeMortgage(mortgage._id)} />
      })}
    </div>
  )
}

export default MortgagesHistory