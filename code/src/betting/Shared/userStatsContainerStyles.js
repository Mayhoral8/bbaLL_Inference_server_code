import styled from 'styled-components'

const media = {
    deskLLG: `@media(max-width: 1350px)`,
    deskLG: `@media(max-width: 1100px)`,
    phone: `@media(max-width: 550px)`,
}

export const UserStatsContainer = styled.div`
    border: 0.5px solid rgba(57, 32, 79, 0.25);
    box-shadow: 0px 0px 5px rgba(57, 32, 79, 0.25);
    border-radius: 5px;
    padding:20px;
    ${media.deskLG}{
        height: 300px;
        width: 400px;
        margin: 0px 10px;
    }
    ${media.deskLG}{
        height: 300px;
        width: 400px;
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

export const FiguresViewMore = styled.div`
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
    /* ${media.deskLG}{
        margin-right: 15px;
    } */
`

export const ViewMoreLink = styled.a`
    font-weight:900;
    margin-top: 10px;
    cursor: pointer;
    transition: 0.4s;
    &:hover{
        text-decoration: underline;
        transition: 0.4s;
    }

`

export const Points = styled.div`
    margin:5px 0px;
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
        margin-right: 15px;
        display: none;
    }
`

export const WinningRate = styled.div`
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