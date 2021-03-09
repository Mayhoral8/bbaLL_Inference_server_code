import React from "react";
import { Link } from "react-router-dom";
import { ErrorImage, ErrorMessage, ErrorContainer } from "./pagenotfound-style";
import player from "../../assets/images/right-box-player.svg";

const PageNotFound = () => {
  return (
    <ErrorContainer>
      <ErrorMessage>
        <h1>OOPS!</h1>
        <h2>404 Error <br /> Page not found</h2>
        <Link to="/">Return Home</Link>
      </ErrorMessage>
      <ErrorImage>
        <img src={player} alt='Player' />
      </ErrorImage>
    </ErrorContainer>
  );
};

export default PageNotFound;