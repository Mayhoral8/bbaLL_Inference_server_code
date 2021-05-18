import styled from 'styled-components'

export const UserStatsContainer = styled.div`
    width: 100%;
    border: 0.5px solid rgba(57, 32, 79, 0.25);
    box-shadow: 0px 0px 5px rgba(57, 32, 79, 0.25);
    border-radius: 5px;
    padding:20px;
`

export const UserName = styled.h3`
    width: 100%;
    text-align: center;
    margin-bottom:20px;
`

export const ProfileImgFiguresViewMore = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const FiguresViewMore = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align:start;
    width: 160px;
    margin-top:20px;
`

export const ProfileImg = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 50%;
    margin-right:10px;
`

export const ViewMoreLink = styled.a`
    font-weight:900;
    margin-top: 5px;
    cursor: pointer;
    transition: 0.4s;
    &:hover{
        text-decoration: underline;
        transition: 0.4s;
    }

`

export const BettingOddsRank = styled.div`
    margin:5px 0px;
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