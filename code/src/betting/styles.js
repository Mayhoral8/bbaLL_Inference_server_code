import styled from 'styled-components'

const media = {
    deskLLG: `@media(max-width: 1350px)`,
    deskLG: `@media(max-width: 1100px)`,
    deskMD: `@media(max-width: 930px)`,
    tablet: `@media(max-width: 768px)`,
    phone: `@media(max-width: 550px)`,
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
    justify-content: center;
    align-items: center;
`

export const TodayBtnContainer = styled.div`
    border: 1px solid black;
    border-radius: 5px;
    padding: 6px 20px;
`

export const BetSectionContainer = styled.div`
    width: 67%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${media.deskLLG} {
        width: 84%;
    }
    ${media.deskLG}{
        width: 100%;
    }
`

export const BetSectionWrapper = styled.div`
    width: 100%;
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
    margin: 10px 0px;
`

export const Section1 = styled.div`
    max-width: 18%;
    min-width: 129px;
    display:flex;
    align-items: center;
    color:#757575;
`

export const Section2 = styled.div`
    width: 82%;
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

export const Col = styled.div`
    display:flex;
    justify-content:center;
    width:33.33%;
    ${media.tablet}{
        flex-direction: column;
        align-items: center;
    }
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

export const Col1 = styled.div`
    width: 13%;
    margin-right: 10px;
    ${media.deskLLG} {
        width: 15%;
    }
    ${media.deskLG} {
        width: 100%;
    }
`

export const UserStatsRankWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    ${media.deskLG} {
        flex-direction: row;
        margin-bottom: 50px;
    }
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
    ${media.deskLG}{
        width: 50px;
        margin-left: 10px;
    }
    ${media.phone}{
        margin: 0px;
        margin-bottom: 10px;
    }
`

export const AuthBtn = styled.img`
    height: 50px;
    width: 50px;
    cursor: pointer;
`