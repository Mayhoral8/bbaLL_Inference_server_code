import styled from 'styled-components'
import * as _ from 'lodash';

const media = {
    deskLLG: `@media(max-width: 1350px)`,
    deskLG: `@media(max-width: 1100px)`
}

export const BettingPageContainer = styled.div`
    width:100%;
    height: calc(100vh - 64px);
    padding:0px 10px;
    margin-top:64px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    ${media.deskLLG} {
        height: auto;
    }
`

export const BettingPageSpinnerContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: rgb(255,255,255,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ContentC = styled.div`
    width:100%;
    height: calc(100% - 40px);
    display:flex;
    justify-content:center;
    align-items:center;
    padding-top:40px;
    padding-bottom: 40px;
`

export const ContentW = styled.div`
    height:100%;
    width:100%;
    display:flex;
    flex-wrap: wrap;
`

export const ContentHeader = styled.div`
    padding: 20px 0px;
`

export const DisplayGamesBtnContainer = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
`

export const TodayBtnContainer = styled.div`
    border: 1px solid black;
    border-radius: 5px;
    padding: 6px 20px;
    margin-left: 20px;
`

export const BetSectionContainer = styled.div`
    width: 67%;
    ${media.deskLLG} {
        width: 84%;
    }
`

export const BetSectionWrapper = styled.div`
    height: calc(100% - 103px);
    box-shadow: 0px 0px 5px rgb(57 32 79 / 25%);
    border-radius: 5px;
`

export const BetSectionPointsContainer = styled.div`
    overflow-y: auto;
    border-bottom-left-radius: 5px;
    height: calc(100% - 58px);
`

export const RowC = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding: 30px 10px;
    border-bottom:1px solid #bfbfbf;
`

export const Section1 = styled.div`
    max-width:20%;
    min-width: 258px;
    display:flex;
    align-items: center;
    color:#757575;
`

export const Section2 = styled.div`
    width:80%;
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
    border-radius: 20px;
    text-align: center;
    width: 52px;
    background: #002B5C;
    color: white;
    padding: 5px 0px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
`

export const PointsContainer = styled.div`
    height: 80px;
    width: 90px;
    border:${props => props.selected ? '4px solid black' : ''};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    cursor: pointer;
    margin:0px 5px;
    display:flex;
    flex-direction:column;
`

export const PointsWrapper = styled.div`
    height: 100%;
    position: relative;
    z-index: 1;
`

export const PointsSpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

export const LockIconContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
`

export const LockIcon = styled.img`
    height: 70px;
    width: 50px;
    opacity: 0.7;
`

export const OddsValueContainer = styled.div`
    text-align: center;
    font-weight: 500;
`

export const PointsValueContainer = styled.div`
    width: 100%;
    text-align: center;
    background: #002B5C;
    color: white;
    border-radius: 5px;
    font-size: 12px;
`

export const TotalScoreValueContainer = styled.div`
    width: 100%;
    text-align: center;
    background: #002B5C;
    color: white;
    border-radius: 5px;
    font-size: 12px;
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
    width: 18%;
    border: 0.5px solid rgba(57, 32, 79, 0.25);
    box-shadow: 0px 0px 5px rgba(57, 32, 79, 0.25);
    border-radius: 5px;
    margin-left:10px;
    padding:10px;
    ${media.deskLLG} {
        width: 100%;
        margin-left: 0px;
        margin-top: 30px;
        flex-direction: row;
    }
    
`

export const BetSubmitPointsContainer = styled.div`
    display:flex;
    flex-direction:column;
    overflow-y: auto;
    ${media.deskLLG} {
        width: 100%;
        margin-left: 0px;
        margin-top: 30px;
        flex-direction: row;
        overflow-x: auto;
    }
`

export const OverviewHeader = styled.h3`
    padding:20px;
    ${media.deskLLG} {
        width: 100%;
        text-align: center;
    }
`

export const SubmitPointsBtn = styled.div`
    background: #7500DE;
    color: white;
    cursor: pointer;
    border-radius:10px;
    width:100%;
    font-weight: 900;
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

export const PopupContainer = styled.div`
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background: rgb(255,255,255,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`

export const PopupWrapper = styled.div`
    width:500px;
    background: #ffff;
`

export const UserStatsRankWrapper = styled.div`
    width: 13%;
    margin-right: 10px;
    ${media.deskLLG} {
        width: 15%;
    }
    ${media.deskLG} {
        width: 100%;
    }
`
export const MoneyLineOddsContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const TeamIconOddsContainer = styled.div`
    height: calc(100% - 14px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`
export const TeamIconContainer = styled.div`
    text-align:center;
`

export const ArrowIconContainer = styled.div`
    text-align:center;
`

export const ArrowIcon = styled.img`
    height: 38px;
    width: 50px;
`

export const TeamIcon = styled.img`
    height: 38px;
    width: 50px;
`

export const LoginModalContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: rgb(255,255,255,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`  

export const LoginLogoutBtnsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    border: 0.5px solid rgba(57, 32, 79, 0.25);
    box-shadow: 0px 0px 5px rgba(57, 32, 79, 0.25);
    border-radius: 5px;
    cursor: pointer;
`

export const AuthBtn = styled.img`
    height: 50px;
    width: 50px;
    cursor: pointer;
`