import styled from 'styled-components'
import * as _ from 'lodash';

export const BettingPageContainer = styled.div`
    width:100%;
    padding:0px 3px;
    margin-top:64px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
`

export const ContentC = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:100px 0px;
`

export const ContentW = styled.div`
    height:100%;
    width:100%;
    display:flex;
`

export const BetInfo = styled.div`
    width:60%;
    max-height:620px;
    overflow-y:auto;
    border: 1px solid #e6e6e6;
`

export const RowC = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding: 10px;
    border-bottom:1px solid #bfbfbf;
`

export const Section1 = styled.div`
    width:15%;
    display:flex;
    align-items: center;
    color:#757575;
`

export const Section2 = styled.div`
    width:85%;
    display:flex;
    justify-content:space-between;
    align-items:center;
`

export const TeamNameContainer = styled.div`
    
`

export const TeamName = styled.div`
    font-weight:600;
    color:#333333;
    text-align: center;
    margin: 7px 0px;
`

export const VS = styled.div`
    text-align: center;
`

export const TimeContainer = styled.div`
    border-radius: 8px;
    text-align: center;
    width: 120px;
    background: #C4C4C4;
    color: black;
    height: 20px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
`

export const PointsContainer = styled.div`
    height:99px;
    width:126px;
    /* border:${props => props.selected ? '1px solid pink' : '1px solid black'}; */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    
    cursor: pointer;
    margin:0px 5px;
    display:flex;
    flex-direction:column;
    &:hover{
        border:1px solid red;
    }
`

export const OddsValueContainer = styled.div`
    
`

export const PointsValueContainer = styled.div`
    width: 100%;
    text-align: center;
    background: rgba(0, 0, 0, 0.08);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`

export const TotalScoreValueContainer = styled.div`
    width: 100%;
    text-align: center;
    background: rgba(0, 0, 0, 0.05);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`

export const PointBoxChild = styled.li`
    list-style-type:none;
    font-size:13px;
    font-weight:900;
    margin-top:5px;
`

export const Col = styled.div`
    display:flex;
    justify-content:center;
    width:33.33%;
`
export const DateC = styled.div`
    color:#757575;
    margin-top:5px;
`

export const CommonChild = styled.li`
    list-style-type:none;
    font-weight:100;
    font-size:11px;
    color:#333333;
`


export const BetSubmitFormC = styled.div`
    width: 20%;
    border:1px solid #e6e6e6;
    margin-left:10px;
    display:flex;
    flex-direction:column;
    padding:10px;
    background: #EFEFEF;
    overflow-y:auto;
    max-height:620px;
`

export const OverviewHeader = styled.h3`
    padding:20px;
`

export const SubmitPointsBtn = styled.div`
    background:#C4C4C4;
    cursor: pointer;
    border-radius:10px;
    width:100%;
    min-height:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:30px;
    transition:0.3s;
    &:hover{
        transition:0.3s;
        background:#dbdbdb;
    }
`

export const WarningPopupContainer = styled.div`
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background: rgb(255,255,255,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const WarningPopupWrapper = styled.div`
    width:500px;
    background: #ffff;
`

export const UserStatsRankWrapper = styled.div`
    width: 20%;
    max-width:278px;
    margin-right: 10px;
`