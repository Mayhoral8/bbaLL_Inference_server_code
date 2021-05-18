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
                    headerGroups.map((headerGroup, index) => {
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column, index) => {
                                    <HeaderCell {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </HeaderCell>
                                })
                            }
                        </TableRow>
                    })
                }
            </TableHead>

            <TableBody {...getTableBodyProps()}>
                {
                    rows.map((row, index) => {
                        prepareRow(row)
                        return(
                            <TableRow {...row.getRowProps()}>
                                {
                                    row.cells.map((cell, index) => {
                                        return(
                                            <DataCell {...cell.getCellProps}>
                                                {cell.render('Cell')}
                                            </DataCell>
                                        )
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