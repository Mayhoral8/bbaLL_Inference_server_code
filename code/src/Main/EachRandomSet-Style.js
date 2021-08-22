import styled from "styled-components";
import { breakpoints } from "../constants/breakpoints.js";

export const EachRandomSetWrapper = styled.div`
  width: 70%;
  @media (min-width: 280px) and (max-width: 767px){
    width: 200px;
  } 
  .comparsion{
    width:100%;
    border: 1px solid #39204F;
    box-shadow: 0px 0px 5px;
    border-radius: 10px;
    margin-bottom:20px;
    min-height: 100px;
    @media (min-width: ${breakpoints.tabletMD}) {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
    }
    @media (min-width: 280px) and (max-width: 767px){
      display: grid;
      grid-template-columns: 1fr auto 1fr;
    } 
  }

  .comparsion:hover{
    box-shadow: 0px 0px 18px #2F195F;
  }
  .continer {
    text-align: center;
    padding-top: 10px;
  }
  .nameTag{
    text-align: center;
    font-size: 10px;
  }
  .vsText{
    font-family: Ubuntu;
    font-style: normal;
    font-weight: 300;
    text-align: center;
    font-size: 15px;
    @media (min-width: ${breakpoints.tabletMD}) {
      padding-top: 30px;
    }
    @media (min-width: 280px) and (max-width: 767px){
      padding-top: 30px;
    } 
  }
  .img-container-side {
    display: inline-block;
    margin: 0 auto;
    align-items: center;
    display: flex;
    width: 50px;
    height: 50px;
    object-fit: cover;
    overflow: hidden;
    @media (max-width: ${breakpoints.tabletLG}) {
      width: 30px;
      height: 30px;
    }

    @media(min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.tabletMD}){
      display: none;
    }

    @media (min-width: 280px) and (max-width: 767px){
      width: 50px;
      height: 50px;
    }
    img {
      align-items: center;
      width: 98%;
      border-radius: ${(props) => (props.isTeam === "true" ? "0" : "50%")};
      padding: ${(props) => (props.isTeam === "true" ? "1rem" : 0)};
    }
  }

  .left{
    border: 3px solid;
    border-color: #207EEC;
    border-radius: 50%;
  }

  .right{
    border: 3px solid;
    border-color: #EC2020;
    border-radius: 50%;
  }
`