import React, {useMemo} from 'react'
import {useTable} from 'react-table'

import {
    TableContainer,
    TableHead,
    HeaderCell,
    TableBody,
    TableRow,
    DataCell
} from './tableStyles'

const Table = (props) => {

    const columns = useMemo(() => props.columns)
    const data = useMemo(() => props.data)
    const tableInstance = useTable({
        columns,
        data
    })
    let {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance
   
    return(
        <TableContainer {...getTableProps()}>
            <TableHead>
                {
                    headerGroups.map((headerGroup, parentIndex) => {
                        return(
                            <TableRow {...headerGroup.getHeaderGroupProps()} key = {parentIndex}>
                                {
                                    headerGroup.headers.map((column, childIndex) => {
                                        return(
                                            <HeaderCell {...column.getHeaderProps()} key = {childIndex}>
                                                {column.render('Header')}
                                            </HeaderCell>
                                        )
                                    })
                                }
                            </TableRow>
                        )
                    })
                }
            </TableHead>

            <TableBody {...getTableBodyProps()}>
                {
                    rows.map((row, parentIndex) => {
                        prepareRow(row)
                        return(
                            <TableRow {...row.getRowProps()} key = {parentIndex}>
                                {
                                    row.cells.map((cell, childIndex) => {
                                        if(childIndex === 1){
                                            let teamNamesArray = cell.render('Cell').props.cell.value.split('vs')
                                            let homeTeam = teamNamesArray[0].split(' ')
                                            let awayTeam = teamNamesArray[1].split(' ')
                                            return(
                                                <DataCell {...cell.getCellProps} key = {childIndex}>
                                                    <p>{homeTeam[0] + " " + homeTeam[1]}</p>
                                                    <p>vs</p>
                                                    <p>{awayTeam[2] + " " + awayTeam[3]} </p>
                                                </DataCell>
                                            )
                                        }
                                        else{
                                            return(
                                                <DataCell {...cell.getCellProps} key = {childIndex}>
                                                    {cell.render('Cell')}
                                                </DataCell>
                                            )
                                        }
                                    })
                                }
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </TableContainer>
    )
}

export default Table