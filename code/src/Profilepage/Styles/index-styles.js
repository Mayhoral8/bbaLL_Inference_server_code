import styled from 'styled-components'

const media = {
    deskLLG: `@media(max-width: 1350px)`,
    deskLG: `@media(max-width: 1100px)`,
    deskMD: `@media(max-width: 930px)`,
    tablet: `@media(max-width: 768px)`,
    phone: `@media(max-width: 550px)`,
    phoneMD: `@media(max-width: 440px)`,
}
  

export const ProfilePageContainer = styled.div`
    margin-top: 64px;
    @media(min-width: 610px) {
        margin-top: 64px;
        min-height: 80vh;
        display: grid;
        grid-template-columns: 1fr 5fr;
    }
    .titleStyle {
        padding-left: 60px;
        font-family: Poppins;
        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        color: #FB4A59;
        line-height: 30px;
        ${media.deskLG} {
            padding-left: 30px;
        }
        @media screen and (max-width: 610px) {
            text-align: center;
        }
    }
    .Wrapper{
        padding-top: 20px;
    }

`

export const TablesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`