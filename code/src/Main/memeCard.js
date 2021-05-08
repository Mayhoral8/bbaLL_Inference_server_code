import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

const MemeCard = ({ urls }) => {
  const [currentVid, setCurrentVid] = useState(0);

  const buttonHandle = (event) => {
    if (currentVid < urls.length - 1) {
      setCurrentVid(currentVid + 1);
    } else {
      setCurrentVid(0);
    }
  };
  return (
    <Card>
      <ReactPlayer url={urls[currentVid]}></ReactPlayer>
      <button className="button" onClick={buttonHandle}>
        <span>Next Video</span>
      </button>
    </Card>
  );
};

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  max-height: 450px;

  background: white;
  border: solid gray 1px;

  margin: 0rem 0rem auto 0rem;
  padding: 1rem;

  .button {
    transition-duration: 0.4s;
    background-color: white;
    border: solid #555555 2px;
    border-radius: 5px;
    color: black;

    padding: 1rem;
    margin: 1rem;

    text-align: center;
    display: inline-block;
    font-size: 16px;

    transition-duration: 0.4s;
    cursor: pointer;
    max-width: 150px;
  }

  .button span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }
  .react-player {
    padding-top: 56.25%;
    position: relative;
  }

  .button span:after {
    font-size: 1.5rem;
    content: "\\00bb";
    position: absolute;
    opacity: 0;
    top: -7px;
    right: -20px;
    transition: 0.5s;
  }

  .button:hover span {
    padding-right: 25px;
  }

  .button:hover span:after {
    opacity: 1;
    right: 0;
  }

  .button:hover {
    background-color: #555555;
    color: white;
  }
`;

export default MemeCard;
