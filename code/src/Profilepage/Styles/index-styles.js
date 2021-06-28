import styled from 'styled-components'

export const ProfilePageContainer = styled.div`
    margin-top: 64px;
    height: auto;
    @media(min-width: 610px) {
        margin-top: 64px;
        height: auto;
        display: grid;
        grid-template-columns: 1fr 5fr;
    }

`

export const TablesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`