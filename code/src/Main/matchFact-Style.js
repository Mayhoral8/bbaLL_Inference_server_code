import styled from "styled-components";

export const MatchFactWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const Wrapper = styled.div`
  min-width: 200px;
  width: 100%;
  margin-left: 20px;
  background: white;
  box-shadow: 0px 1px 6px rgb(9 9 121 / 70%);
  border-radius: 5px;
  padding: 0rem 1rem 1rem 1rem;

  @media (max-width: 730px) {
    margin-top: 20px;
  }
  
  .title {
    @media (max-width: 865px) {
      font-size: 1rem;
    }
    font-size: 1.5rem;
  }

  .hide {
    display: none;
  }

  .button {
    transition-duration: 0.4s;
    background: linear-gradient(to right,#362daa,#0d93f6,#36afca);
    border-radius: 5px;
    color: white;
    padding: 1rem;
    margin: 1rem 0rem 1rem 0rem;
    text-align: center;
    display: inline-block;
    font-size: 1rem;
    transition-duration: 0.4s;
    cursor: pointer;
    min-width: 120px;

    @media (max-width: 834px) {
      min-width: 75px;
      font-size: 0.8rem;
    }
  }

  .button span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }

  .next span:after {
    font-size: 1.5rem;
    content: "\\00bb";
    position: absolute;
    opacity: 0;
    top: -7px;
    right: -20px;
    transition: 0.5s;
  }

  .prev span:before {
    font-size: 1.5rem;
    content: "\\00ab";
    position: absolute;
    opacity: 0;
    top: -7px;
    left: -75px;
    transition: 0.5s;
  }

  .next:hover span {
    padding-right: 20px;
  }

  .prev:hover span {
    padding-left: 20px;
  }

  .button:hover span:after {
    opacity: 1;
    right: 0;
  }

  .button:hover span:before {
    opacity: 1;
    right: 0;
  }
`