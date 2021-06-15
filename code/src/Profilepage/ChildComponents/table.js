import React, {useMemo} from 'react'
import {useTable} from 'react-table'
import {
    TableContainer,
    TableHead,
    HeaderCell,
    TableBody,
    TableRow,
    DataCell,
    Continer
} from '../Styles/tableStyles'

const Table = (props) => {

    const columns = useMemo(() => props.columns)
    const data = useMemo(() => props.data)
    const tableInstance = useTable({
        columns,
        data,
    })
    let {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance
   
    return(
        <Continer>
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
                                        switch (childIndex){
                                            case 0:
                                                let DateArray = cell.render('Cell').props.cell.value.split(' ');
                                                let date = DateArray[0];
                                                let time = DateArray[1];
                                                return(
                                                    <DataCell {...cell.getCellProps} key = {childIndex}>
                                                        <p>{date}</p>
                                                        <p>{time}</p>
                                                    </DataCell>
                                                )
                                            case 1:
                                                let bettingTypeArray = cell.render('Cell').props.cell.value.split('(');
                                                return(
                                                    <DataCell {...cell.getCellProps} key = {childIndex}>
                                                        <p>{bettingTypeArray[0]}</p>
                                                        <p>{"(" + bettingTypeArray[1]}</p>
                                                    </DataCell>
                                                )
                                            case 2:
                                                let teamNamesArray = cell.render('Cell').props.cell.value.split('vs')
                                                let homeTeam = teamNamesArray[0].split(' ')
                                                let awayTeam = teamNamesArray[1].split(' ')
                                                return(
                                                    <DataCell {...cell.getCellProps} key = {childIndex}>
                                                        <p>{homeTeam[0] + " " + homeTeam[1] + " vs"}</p>
                                                        <p>&emsp;&emsp;&emsp;&emsp;{awayTeam[2] + " " + awayTeam[3]} </p>
                                                    </DataCell>
                                                )
                                            case 5:
                                                let isGameFinished = cell.render('Cell').props.cell.value;
                                                if (isGameFinished === 'Ongoing') {
                                                    return(
                                                        <DataCell {...cell.getCellProps} key = {childIndex}>
                                                            <p style={{color: "#552A9F"}}>{isGameFinished}</p>
                                                        </DataCell>
                                                    )
                                                } else {
                                                    return(
                                                        <DataCell {...cell.getCellProps} key = {childIndex}>
                                                            <p style={{color: "#FB4A59"}}>{isGameFinished}</p>
                                                        </DataCell>
                                                    )
                                                }
                                            default:
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
        </Continer>
    )
}

export default Table