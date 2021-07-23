import refresh from "../assets/images/refresh.png";
import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 1.5rem 0 0 0rem;
  width: 100%;
  .centerButton{
    padding-left: 24px;
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
  }
`