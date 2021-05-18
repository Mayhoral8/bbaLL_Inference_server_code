import styled from "styled-components";
import { breakpoints } from "../../constants/breakpoints.js";

export const RandomPlayerMobileContiner = styled.div`
  width: 100%;
  cursor: default;
`;

export const EachRandomSetWrapper = styled.div`
  .comparsion{
    max-width: 200px;
    border: 1px solid #39204F;
    box-shadow: 0px 0px 5px;
    border-radius: 10px;
    margin-bottom:20px;
    min-height: 100px;
  }
  .continer {
    text-align: center;
    display: flex;
  }
  .nameTag{
    text-align: center;
    font-size: 10px;
  }
  .information{
    
  }
  .vsText{
    font-family: Ubuntu;
    font-style: normal;
    font-weight: 300;
    text-align: center;
    font-size: 15px;
    @media (min-width: ${breakpoints.desk}) {
      padding-top: 30px;
    }
  }
  .img-container-side {
    margin: 0 auto;
    align-items: center;
    width: 80px;
    height: 80px;
    object-fit: cover;
    overflow: hidden;
    img {
      align-items: center;
      width: 98%;
      border-radius: ${(props) => (props.isTeam === "true" ? "0" : "50%")};
      padding: ${(props) => (props.isTeam === "true" ? "1rem" : 0)};
    }
  }

  .left{
    border: 2px solid;
    border-color: #207EEC;
    border-radius: 50%;
  }

  .right{
    border: 2px solid;
    border-color: #EC2020;
    border-radius: 50%;
  }
`