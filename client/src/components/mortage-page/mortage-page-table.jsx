import React, { useMemo } from 'react'
import { useTable } from 'react-table'

const MortagePageTable = ({ tableData }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Month',
        accessor: 'month',
      },
      {
        Header: 'Total payment',
        accessor: 'totalPayment',
      },
      {
        Header: 'Interest payment',
        accessor: 'interestPayment',
      },
      {
        Header: 'Loan balance',
        accessor: 'loanBalance',
      },
      {
        Header: 'Equity',
        accessor: 'equity',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData })

  return (
    <div className="table-wrapper">

    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
    </div>
  )
}

export default MortagePageTable
