import styled from 'styled-components'

export const Continer = styled.div`
  border: solid;
  padding-top: 20px;

  .titleStyle {
    padding-left: 60px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    color: #FB4A59;
    line-height: 30px;
  }
`
export const StyledButtonsContiner = styled.div`
  padding-top: 30px;
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
  }
`

export const TablesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`