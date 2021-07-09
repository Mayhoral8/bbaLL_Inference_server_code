import React, { useEffect, useState } from "react";
import { Wrapper, GameDetail, ButtonDiv } from "./eachBet-style";

import trophy from "../../assets/images/trophy.png";
import { Link } from "react-router-dom";

const EachBet = ({data}) => {
  console.log(data);
  let bettingType = null;
  let homeTeam = data.gameDetails.homeTeam;
  let awayTeam = data.gameDetails.awayTeam;
  let gameDate = data.gameDetails.gameDate + ' ' + data.gameDetails.gameStartTime;
  let homeTeamOdd = null;
  let awayTeamOdd = null;
  let randomNumber = Math.floor(Math.random() * 3) + 1;
  switch(randomNumber) {
    case 1:
      bettingType = "Money Line";
      homeTeamOdd = data.moneyLine.homeTeam['odds'];
      awayTeamOdd = data.moneyLine.awayTeam['odds'];
      break;
    case 2:
      bettingType = "Over & Under";
      homeTeamOdd = data.overUnder.overOddsValue;
      awayTeamOdd = data.overUnder.underOddsValue;
      break;
    case 3:
      bettingType = "Speard";
      homeTeamOdd = data.handicap.homeTeam['odds'];
      awayTeamOdd = data.handicap.awayTeam['odds'];
      break;
  }

  return(

    <Wrapper>
      <div className="title">Offer</div>
      <div className="info">
        <p className='date'>Date: {gameDate}</p>
        <p className='bettingName'>{bettingType}</p>
        <GameDetail>
          <h2 className='name'>{homeTeam}<br/>{homeTeamOdd}</h2>
          <img src={trophy}/>
          <h2 className='name'>{awayTeam}<br/>{awayTeamOdd}</h2>

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
