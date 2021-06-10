import styled from 'styled-components'

const media = {
    deskLLG: `@media(max-width: 1350px)`,
    deskLG: `@media(max-width: 1100px)`,
    deskMD: `@media(max-width: 930px)`,
    tablet: `@media(max-width: 768px)`,
    phone: `@media(max-width: 550px)`,
}

export const UserStatsContainer = styled.div`
    border: 0.5px solid rgba(57, 32, 79, 0.25);
    box-shadow: 0px 0px 5px rgba(57, 32, 79, 0.25);
    border-radius: 5px;
    padding:20px;
    ${media.deskLG}{
        width: 500px;
        margin: 0px 10px;
    }
    ${media.deskLG}{
        margin: 0px 10px;
    }
    ${media.phone}{
        width: 100%;
        margin: 0px;
    }
`

export const UserName = styled.h3`
    width: 100%;
    text-align: center;
    margin-bottom:20px;
    overflow: hidden;
`

export const ProfileImgFiguresViewMore = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* ${media.deskLG}{
        flex-direction: row;
    } */
`

export const StatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align:start;
    width: 100%;
    margin-top:20px;
`

export const ProfileImg = styled.img`
    height: 100px;
    width: 100px;
    border-radius: 50%;
`

export const ViewMoreLink = styled.div`
    font-weight:900;
    margin-top: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    transition: 0.4s;
    &:hover{
        text-decoration: underline;
        transition: 0.4s;
    }

`

export const PointsRank = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LevelWinRate = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Stats = styled.div`
    color: rgb(0,0,0,0.5);
    margin: 0px 20px;
`

export const IconFigure = styled.div`
    display: flex;
    margin-top: 5px;
`

export const Icon = styled.img`

`

export const Figure = styled.div`
    font-weight: 900;
    margin-left: 10px;
    color: black;
`

export const Rank = styled.div`
    margin:5px 0px;
    ${media.deskLG}{
        display: none;
    }
`

export const Level = styled.div`
    margin:5px 0px;
    ${media.deskLG}{
        display: none;
    }
`

export const LogoutImgContainer = styled.div`
    text-align: center;
    margin-top: 20px;
`

export const LogoutImg = styled.img`
    height: 50px;
    width: 50px;
    cursor: pointer;
`

export const LoginLogoutBtnsContainer = styled.div`
    display: none;
    ${media.deskLG}{
        display: flex;
        width: 100%;
        margin-top: 10px;
        justify-content: center;
        align-items: center;
    }
`

export const LoginLogoutBtnsWrapper = styled.div`
    display: flex;
    justify-content: center;
    border: 0.5px solid rgba(57, 32, 79, 0.25);
    box-shadow: 0px 0px 5px rgba(57, 32, 79, 0.25);
    border-radius: 5px;
    cursor: pointer;
`

export const AuthBtn = styled.img`
    height: 35px;
    width: 35px;
    cursor: pointer;
`