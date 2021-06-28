import styled from 'styled-components'

export const MobileWrapper = styled.div`
  padding-top: 20px;
  overflow-y: scroll; 
  height:400px;
  margin: 0px 10px;
  .message{
    text-align: center;
    padding: 20px;
  }
`

export const Continer = styled.div`
  border-bottom: 0.4px solid rgba(0, 0, 0, 0.28);
  display: grid;
  grid-template-columns: 5fr 2fr;
`

export const LeftInformation = styled.div`
  .dispalyInfo{
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
  }

  .teamNames{
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 8px;
    color: rgba(0, 0, 0, 0.47);
  }

  .betInfo{
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    text-align: center;
    color: #F70013;
  }
`

export const RightInformation = styled.div`
  .bettingType{
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.47);
  }

  .dateInfo{
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 8px;
    line-height: 13px;
    color: rgba(0, 0, 0, 0.47);
  }

  .gameFinish{
    font-family: Poppins;
    font-style: italic;
    font-weight: 300;
    font-size: 5px;
    line-height: 13px;
  }

  .finish{
    color: #FB4A59;
  }

  ongoing{
    color: #552A9F;
  }
`