import styled from 'styled-components'

const media = {
    deskLLG: `@media(max-width: 1350px)`,
    deskLG: `@media(max-width: 1100px)`,
    phone: `@media(max-width: 550px)`,
}

export const UsersRankContainer = styled.div`
    width: 100%;
    border: 0.5px solid rgba(57, 32, 79, 0.25);
    box-shadow: 0px 0px 5px rgba(57, 32, 79, 0.25);
    border-radius: 5px;
    margin-top: 20px;
    padding: 20px;
    height: 400px;
    ${media.deskLG}{
        margin: 0px 10px;
        height: 300px;
    }
    ${media.phone}{
        display: none;
    }
`

export const Header = styled.h4`
    margin-bottom: 20px;
`

export const ColContainer = styled.div`
    display: flex;
    width: 100%;
`

export const Col = styled.div`
    width: 50%;
`

export const ColHeading = styled.div`
    font-weight: 900;
`