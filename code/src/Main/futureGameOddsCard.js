import React, { useState } from "react";
import { fbStorage } from "../App/config";
//import firebasestorage from "firebase";
import { Card } from "./futuregameoddscard-style";
const FutureGameOddsCard = (item) => {
  const [JSON, setJSON] = useState(item);
  const [homeImg, setHomeImg] = useState("");
  const [awayImg, setAwayImg] = useState("");
  const gameDate = JSON.data["Game Info"]["Game Time"];
  const ratingNames = ["ELO", "Massey", "Odds"];

  let homeTeam = JSON.data["Game Info"]["Home Team"];
  let awayTeam = JSON.data["Game Info"]["Away Team"];

  const allbettingOdds = JSON.data["Game Odds"]["General"];
  let latestDate = "";
  Object.keys(allbettingOdds).map((date) => {
    if (latestDate.length == 0) {
      latestDate = date;
    }
    if (date > latestDate) {
      latestDate = date;
    }
  });

  const homeRatings = [
    [Math.round(JSON.data["Game Prediction"]["ELO"][homeTeam]), 0],
    [
      Math.round(JSON.data["Game Prediction"]["Massey"][homeTeam] * 100) / 100,
      0,
    ],
    [
      Math.round(
        JSON.data["Game Odds"]["General"][latestDate][homeTeam] * 100
      ) / 100,
      0,
    ],
  ];

  const awayRatings = [
    [Math.round(JSON.data["Game Prediction"]["ELO"][awayTeam]), 0],
    [
      Math.round(JSON.data["Game Prediction"]["Massey"][awayTeam] * 100) / 100,
      0,
    ],
    [
      Math.round(
        JSON.data["Game Odds"]["General"][latestDate][awayTeam] * 100
      ) / 100,
      0,
    ],
  ];

  homeRatings[0][1] = calculateELOPercent(homeRatings[0][0], awayRatings[0][0]);
  homeRatings[1][1] = calculateMasseyPercent(
    homeRatings[1][0],
    awayRatings[1][0]
  );
  homeRatings[2][1] = calculateBettingOddsPercent(
    homeRatings[2][0],
    awayRatings[2][0]
  );

  for (let i = 0; i < awayRatings.length; i++) {
    awayRatings[i][1] = 100 - homeRatings[i][1];
  }
  for (let i = 1; i < awayRatings.length; i++) {
    awayRatings[i][0] = awayRatings[i][0].toFixed(2);
    homeRatings[i][0] = homeRatings[i][0].toFixed(2);
  }

  const homeTeamFormatted = homeTeam.replace(/\s+/g, "_");
  const awayTeamFormatted = awayTeam.replace(/\s+/g, "_");
  const homeTeamReference = fbStorage.refFromURL(
    "gs://nba-database-cb52a.appspot.com/team_logo_spi/" +
      homeTeamFormatted +
      ".png"
  );
  const awayTeamReference = fbStorage.refFromURL(
    "gs://nba-database-cb52a.appspot.com/team_logo_spi/" +
      awayTeamFormatted +
      ".png"
  );
  homeTeamReference.getDownloadURL().then((url) => {
    setHomeImg(url);
  });

  awayTeamReference.getDownloadURL().then((url) => {
    setAwayImg(url);
  });

  const homeWords = homeTeam.split(" ");
  const awayWords = awayTeam.split(" ");
  // shortens team names to 1 word
  homeTeam = homeWords[homeWords.length - 1];
  awayTeam = awayWords[awayWords.length - 1];
  return (
    <Card>
      {vsImg(homeImg, awayImg)}
      <div className="team-names">
        <div className="team-name1">{homeTeam}</div>
        <div className="team-name2">{awayTeam}</div>
      </div>

      <div className="scores">
        <div className="scores-col">
          {homeRatings.map((value, index) => {
            if (value[1] > awayRatings[index][1]) {
              return (
                <b>
                  <p key={index}>
                    {value[0]} ({value[1]}%)
                  </p>
                </b>
              );
            } else {
              return (
                <p key={index}>
                  {value[0]} ({value[1]}%)
                </p>
              );
            }
          })}
        </div>
        <div className="scores-col">
          {ratingNames.map((name, index) => {
            return <p key={index}>{name}</p>;
          })}
        </div>
        <div className="scores-col">
          {awayRatings.map((value, index) => {
            if (value[1] > homeRatings[index][1]) {
              return (
                <b>
                  <p key={index}>
                    {value[0]} ({value[1]}%)
                  </p>
                </b>
              );
            } else {
              return (
                <p key={index}>
                  {value[0]} ({value[1]}%)
                </p>
              );
            }
          })}
        </div>
      </div>

      <div className="game-date">{gameDate}</div>
    </Card>
  );
};

const calculateELOPercent = (teamA, teamB) => {
  return Math.round((teamA / (teamA + teamB)) * 100);
};

const calculateMasseyPercent = (teamA, teamB) => {
  const k = 25;
  const p1 = 1 / (1 + Math.exp(-teamA / k));
  const p2 = 1 / (1 + Math.exp(-teamB / k));
  return Math.round((p1 / (p1 + p2)) * 100);
};

const calculateBettingOddsPercent = (teamA, teamB) => {
  const p1 = 1 / teamA;
  const p2 = 1 / teamB;

  return Math.round((p1 / (p1 + p2)) * 100);
};

const vsImg = (homeImg, awayImg) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        minHeight: "75px",
      }}
    >
      <img id="img1" className="logo-1" src={homeImg} />
      <div className="vs-text">
        <b>VS</b>
      </div>
      <img className="logo-2" src={awayImg} />
    </div>
  );
};

export default FutureGameOddsCard;
