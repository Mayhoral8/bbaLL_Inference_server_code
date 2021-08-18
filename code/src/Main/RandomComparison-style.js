import refresh from "../assets/images/refresh.png";
import styled from "styled-components";

export const Wrapper = styled.div`
  @media (min-width: 280px) and (max-width: 767px){
    padding-bottom: 30px;
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
    background-color: #7A1DC4;
    border: 2px solid #7500DE;
    border-radius: 10px;
    color: white;
    padding: 8% 30%;
    background-image: url(${refresh});
    background-repeat: no-repeat;
    background-position: center;
    @media (min-width: 280px) and (max-width: 767px){
      padding: 20px 80px;
    } 
  }
`