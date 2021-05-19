import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

const MemeCard = ({ urls }) => {
  const [currentVid, setCurrentVid] = useState(0);

  const nextbuttonHandle = (event) => {
    if (currentVid < urls.length - 1) {
      setCurrentVid(currentVid + 1);
    } else {
      setCurrentVid(0);
    }
  };
  const prevbuttonHandle = (event) => {
    if (currentVid > 0) {
      setCurrentVid(currentVid - 1);
    } else {
      setCurrentVid(urls.length - 1);
    }
  };

  return (
    // <Card>
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     width: "100%",
    //   }}
    // >
    //   <button className="button prev" onClick={prevbuttonHandle}>
    //     <span>Previous</span>
    //   </button>
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       fontSize: "1.5rem",
    //     }}
    //   >
    //     Highlights
    //   </div>
    //   <button className="button next" onClick={nextbuttonHandle}>
    //     <span>Next</span>
    //   </button>
    // </div>

    //   <Styles>
    //     <div className="player-wrapper">
    //       <ReactPlayer
    //         className="react-player"
    //         url={urls[currentVid]}
    //         width="100%"
    //         height="100%"
    //       />
    //     </div>
    //   </Styles>
    // </Card>
    <Card1>
      <div
        className="top"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <button className="button prev" onClick={prevbuttonHandle}>
          <span>Previous</span>
        </button>
        <div
          className="title"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Highlights
        </div>
        <button className="button next" onClick={nextbuttonHandle}>
          <span>Next</span>
        </button>
      </div>

      <div className="content">
        {urls.length === 0 ? (
          <div className="error-message">
            Videos are Unavailable at this time.
            <br />
            Try again later.
          </div>
        ) : (
          <Styles>
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                url={urls[currentVid]}
                width="100%"
                height="100%"
                controls={true}
              />
            </div>
          </Styles>
        )}
      </div>
    </Card1>
  );
};

export const Card1 = styled.div`
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
    @media (max-width: 834px) {
      font-size: 1rem;
    }
    font-size: 1.5rem;
  }

  background: white;
  border: solid gray 1px;

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

export const Styles = styled.div`
  .player-wrapper {
    position: relative;
    padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
  }

  .react-player {
    max-height: 380px;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: flex-start;
  // align-items: center;

  height: 100%;

  max-height: 495px;

  background: white;
  border: solid gray 1px;

  //margin: 0rem 0rem auto 0rem;
  padding: 0rem 1rem 1rem 1rem;

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
    font-size: 16px;

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
    content: "\\00bb";
    transform: rotate(180deg);
    position: absolute;
    opacity: 0;
    top: -3px;
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

export default MemeCard;
