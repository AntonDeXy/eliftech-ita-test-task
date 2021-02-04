import React from 'react'
import MortagesHistoryCard from './mortages-history-card'

const MortagesHistory = ({mortagesHistory, removeMortage, showTableFromHistory}) => {
  const sortedMortageHistoryItems = mortagesHistory && mortagesHistory.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
  
  return (
    <div className="mortages-history">
      {sortedMortageHistoryItems && sortedMortageHistoryItems.map(mortage => {
        return <MortagesHistoryCard key={mortage._id} showTable={() => showTableFromHistory(mortage.tableData)} mortage={mortage} removeMortage={() => removeMortage(mortage._id)} />
      })}
    </div>
  )
}

export default MortagesHistory