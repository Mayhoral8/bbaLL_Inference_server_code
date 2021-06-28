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
        height: 397px;
    }
    ${media.phone}{
        display: none;
    }
`

export const Header = styled.h4`
    margin-bottom: 20px;
`

export const ColContainer = styled.div`
    width: 100%;
    height: 90%;
    overflow: auto;
`

export const Col = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 0.5px solid black;
    border-top: ${props => props.header == 'false' && "0"};
    background-color: ${props => props.header == 'false' && "rgba(220, 220, 214, 0.4)"};
    padding: 10px 0px;
`

export const ColHeading = styled.div`
    font-weight: 900;
`