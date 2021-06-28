import styled from 'styled-components'

const media = {
    deskLLG: `@media(max-width: 1350px)`,
    deskLG: `@media(max-width: 1100px)`,
    deskMD: `@media(max-width: 930px)`,
    tablet: `@media(max-width: 768px)`,
    phone: `@media(max-width: 550px)`,
    phoneMD: `@media(max-width: 440px)`,
  }

export const Continer = styled.div`
    height: 500px;
    overflow-y: scroll;
    scrollbar-width: auto;
    width: 90%;
    margin: 20px 10px;
    .message{
        text-align: center;
        padding: 20px;
    }
`

export const TableContainer = styled.table`
    font-family: Poppins;
    border-collapse: collapse;
    width: 98%;
`

export const TableHead = styled.thead`

`

export const TableBody = styled.tbody`

`

export const TableRow = styled.tr`

`

export const HeaderCell = styled.th`
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    background-color: #552A9F;
    color: white;
    ${media.deskLLG} {
        padding: 4px;
        font-size: 8px;
    }

    ${media.deskLLG} {
        padding: 2px;
        font-size: 6px;
    }
    
`

export const DataCell = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    height:80px;
    ${media.deskLLG} {
        padding: 4px;
        font-size: 8px;
    }

    ${media.deskLLG} {
        padding: 2px;
        font-size: 6px;
    }
`