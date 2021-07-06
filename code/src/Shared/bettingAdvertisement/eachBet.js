import React, { useEffect, useState } from "react";
import { Wrapper, GameDetail, ButtonDiv } from "./eachBet-style";

import trophy from "../../assets/images/trophy.png";
import { Link } from "react-router-dom";
const EachBet = ({ data }) => {
  let homeTeam = data.gameDetails.homeTeam;
  let awayTeam = data.gameDetails.awayTeam;
  let gameDate =
    data.gameDetails.gameDate + " " + data.gameDetails.gameStartTime;

  return (
    <Wrapper>
      <div className="title">Offer</div>
      <div className="info">
        <p className="date">Date: {gameDate}</p>
        <GameDetail>
          <h2 className="name">{homeTeam}</h2>
          <img src={trophy} />
          <h2 className="name">{awayTeam}</h2>
        </GameDetail>
      </div>
      <ButtonDiv>
        <Link to="/betting" className="buttonStyle">
          Bet Now
        </Link>
      </ButtonDiv>
    </Wrapper>
  );
};

export default EachBet;
