import refresh from "../assets/images/refresh.png";
import styled from "styled-components";

export const Wrapper = styled.div`
  min-width: 230.5px;
  @media (min-width: 280px) and (max-width: 767px){
    padding-bottom: 30px;
  } 
  @media (max-width: 730px) {
    margin-top: 20px;
    min-width: 100%;
  }
  .eachRandomSetWrapper{
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .centerButton{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .button{
    border-radius: 10px;
    background: #090979;
    padding: 8% 30%;
    background-image: url(${refresh});
    background-repeat: no-repeat;
    background-position: center;
    @media (min-width: 280px) and (max-width: 767px){
      padding: 20px 80px;
    } 
  }
`