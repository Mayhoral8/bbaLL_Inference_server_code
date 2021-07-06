import styled from "styled-components";
export const VideoResonsiveWrapper = styled.div`
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
  iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    max-height: 380px;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0rem 0rem 2rem 0rem;
  min-width: 200px;
  @media (min-width: 634px) {
    margin: 2rem 0rem 2rem 0rem;
    min-height: 355px;
  }
  width: 100%;

  .title {
    @media (max-width: 865px) {
      font-size: 1rem;
    }
    font-size: 1.5rem;
  }

  background: white;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.08);

  @media (min-width: 1200px) {
    margin: 2rem 0rem 0rem 0rem;
    max-height: 500px;
  }
  @media (min-width: 1400px) {
    margin: 0rem 0rem 0rem 0rem;
    max-height: 485px;
  }

  padding: 0rem 1rem 1rem 1rem;

  .content {
    margin: auto 0;
  }

  .error-message {
    text-align: center;
    position: relative;
    top: -5px;
  }

  .button {
    transition-duration: 0.4s;
    background-color: white;
    border: solid #555555 2px;
    border-radius: 5px;
    color: black;

    padding: 1rem;
    margin: 1rem 0rem 1rem 0rem;

    text-align: center;
    display: inline-block;
    @media (max-width: 834px) {
      min-width: 75px;
      font-size: 0.8rem;
    }

    font-size: 1rem;

    transition-duration: 0.4s;
    cursor: pointer;
    min-width: 120px;
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

  .button:hover {
    background-color: #555555;
    color: white;
  }
`;
