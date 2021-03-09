import React from 'react'
import styled from 'styled-components'

const QuarterTable = ({ rowData, hide, blackText }) => {
  const rowQuarterlyData = rowData[0].quarterValues;
  return (
    <QuarterTableWrapper hide={hide} blackText={blackText}>
      <table>
        <thead className='heading'>
          <tr>
            <td></td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            {rowQuarterlyData.includes(null) || rowQuarterlyData.includes(undefined) ||
              rowQuarterlyData.length === 4 ? <></> : <td>OT</td>}
            <th>T</th>
          </tr>
        </thead>
        <tbody>
          {
            rowData.map((data, i) => (
              <tr key={i}>
                <td>{data.title}</td>
                {data.quarterValues
                  .filter(val => val !== null && val !== undefined)
                  .map((val, i) =>
                    <td key={i}>{val}</td>
                  )}
                <th>{data.total}</th>
              </tr>
            ))
          }
        </tbody>
      </table>
    </QuarterTableWrapper>
  )
}

const QuarterTableWrapper = styled.div`
  color: ${({ blackText }) => blackText ? 'var(--black)' : 'var(--white)'};
  padding: 0 0 2rem 0;
  font-size: 0.8rem;
  display: ${({ hide }) => hide ? 'none' : 'block'};
  table{
    border-collapse: collapse;
    margin: 0 auto;
  }
  thead {
    border-bottom: 1px solid silver;
  }
  td {
    padding: 0 0.5rem;
    text-align: center;
  }
  th {
    width: 30px;
  }
  @media(min-width:768px) {
    padding: 0 4rem;
    display: block;
    font-size: 1rem;
  }
`

export default QuarterTable;