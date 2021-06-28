import styled from 'styled-components'

const media = {
  deskLLG: `@media(max-width: 1350px)`,
  deskLG: `@media(max-width: 1100px)`,
  deskMD: `@media(max-width: 930px)`,
  tablet: `@media(max-width: 768px)`,
  phone: `@media(max-width: 550px)`,
  phoneMD: `@media(max-width: 440px)`,
}


export const Continer = styled.div`
  padding-top: 20px;

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
`
export const StyledButtonsContiner = styled.div`
  padding-top: 30px;
  @media screen and (max-width: 610px) {
    display: flex;
    justify-content: center;
  }
`

export const StyleButton = styled.div`
  display: inline-block;  
  .eachButton {
    margin-left:10px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    border: solid 1px;
    padding: 10px 40px;
    border-radius: 5px;
    background-color: ${(props) => props.isActive ? "#33274B" : "#552A9F"};
    color: white;
    ${media.deskLG} {
      padding: 10px 20px;
    }
  }
`

export const TablesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`