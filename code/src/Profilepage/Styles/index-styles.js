import styled from 'styled-components'

export const ProfilePageContainer = styled.div`
    margin-top: 64px;
    @media(min-width: 610px) {
        margin-top: 64px;
        min-height: 80vh;
        display: grid;
        grid-template-columns: 1fr 5fr;
    }

`

export const TablesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`