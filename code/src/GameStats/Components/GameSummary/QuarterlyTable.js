import React from 'react';
import { QuarterTableWrapper } from "./GameSummary-Styles";

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

export default QuarterTable;