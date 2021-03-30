import styled from 'styled-components'

export const BettingPageContainer=styled.div`
    width:100%;
    min-height:100vh;
    max-height:auto;
    padding:0px 3px;
    margin-top:64px;
`

export const Content=styled.div`
    width:100%;
    height:900px;
    display:flex;
    padding:100px 0px;
`

export const BetInfo=styled.div`
    width:100%;
    height:100%;
    overflow-y:auto;
`

export const RowC=styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:5px 0px;
    border-bottom:1px solid #bfbfbf;
`

export const Section1=styled.div`
    max-width:15%;
    min-width:193px;
    display:flex;
    flex-direction:column;
    color:#757575;
`

export const Section2=styled.div`
    width:85%;
    display:flex;
    justify-content:space-between;
    align-items:center;
`

export const TeamNameC=styled.div`
    font-weight:600;
    margin-bottom:5px;
    color:#333333;
`

export const PointsBox=styled.div`
    border:1px solid #bebebe;
    padding:10px 0px;
    font-size: 13px;
    font-weight: 900;
    border-radius:7px;
    height:50px;
    width:80px;
    cursor: pointer;
    color:#477eff;
    margin:0px 10px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    &:hover{
        border:1px solid red;
    }
`

export const PointBoxChild=styled.li`
    list-style-type:none;
    font-size:13px;
    font-weight:900;
    margin-top:5px;
`

export const Col=styled.div`
    display:flex;
    justify-content:center;
    width:33.33%;
`
export const DateC=styled.div`
    color:#757575;
    margin-top:5px;
`

export const CommonChild=styled.li`
    list-style-type:none;
    font-weight:100;
    font-size:11px;
    color:#333333;
`


export const BetSubmitFormC=styled.div`
    width:500px;
    border:1px solid #e6e6e6;
    margin-left:10px;
    display:flex;
    flex-direction:column;
    padding:10px;
`