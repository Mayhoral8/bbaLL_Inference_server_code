import React, { useState } from "react";
import { fbStorage } from "../App/config";
import { avoidColourSets } from "../Shared/Functions/gameStatsFunctions";
//import firebasestorage from "firebase";
import { Card } from "./futuregameoddscard-style";
const FutureGameOddsCard = (item) => {
  const [JSON, setJSON] = useState(item);

  // urls for logo images
  const [homeImg, setHomeImg] = useState("");
  const [awayImg, setAwayImg] = useState("");

  const gameDate = JSON.data["Game Info"]["Game Time"];
  const ratingNames = ["ELO", "Massey", "Odds"];

  let homeTeamName = JSON.data["Game Info"]["Home Team"];
  let awayTeamName = JSON.data["Game Info"]["Away Team"];

  // Finds the latest date of the all the odds
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
    {
      value: Math.round(JSON.data["Game Prediction"]["ELO"][homeTeamName]),
      percent: 0,
    },

    {
      value:
        Math.round(JSON.data["Game Prediction"]["Massey"][homeTeamName] * 100) /
        100,
      percent: 0,
    },

    {
      value:
        Math.round(
          JSON.data["Game Odds"]["General"][latestDate][homeTeamName] * 100
        ) / 100,
      percent: 0,
    },
  ];

  const awayRatings = [
    {
      value: Math.round(JSON.data["Game Prediction"]["ELO"][awayTeamName]),
      percent: 0,
    },

    {
      value:
        Math.round(JSON.data["Game Prediction"]["Massey"][awayTeamName] * 100) /
        100,
      percent: 0,
    },

    {
      value:
        Math.round(
          JSON.data["Game Odds"]["General"][latestDate][awayTeamName] * 100
        ) / 100,
      percent: 0,
    },
  ];

  // calculating percentages for all ratings
  homeRatings[0].percent = calculateELOPercent(
    homeRatings[0].value,
    awayRatings[0].value
  );
  homeRatings[1].percent = calculateMasseyPercent(
    homeRatings[1].value,
    awayRatings[1].value
  );
  homeRatings[2].percent = calculateBettingOddsPercent(
    homeRatings[2].value,
    awayRatings[2].value
  );

  for (let i = 0; i < awayRatings.length; i++) {
    awayRatings[i].percent = 100 - homeRatings[i].percent;
  }
  for (let i = 1; i < awayRatings.length; i++) {
    console.log(homeRatings[i].value);
    awayRatings[i].value = awayRatings[i].value.toFixed(2);
    homeRatings[i].value = homeRatings[i].value.toFixed(2);
  }

  // formatting team names so respective logos can be fetched
  const homeTeamFormatted = homeTeamName.replaceAll(" ", "_");
  const awayTeamFormatted = awayTeamName.replaceAll(" ", "_");
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

  const teamColours = avoidColourSets(
    // formats team names for function call
    homeTeamName.replaceAll(" ", "").toUpperCase(),
    awayTeamName.replaceAll(" ", "").toUpperCase()
  );

  const homeWords = homeTeamName.split(" ");
  const awayWords = awayTeamName.split(" ");

  // shortens team names to the last word
  homeTeamName = homeWords[homeWords.length - 1];
  awayTeamName = awayWords[awayWords.length - 1];

  return (
    <Card homeColour={teamColours.colourOne} awayColour={teamColours.colourTwo}>
      {vsImg(homeImg, awayImg)}
      <div className="team-names">
        <div className="team-name1">
          <b>{homeTeamName}</b>
        </div>
        <div className="team-name2">
          <b>{awayTeamName}</b>
        </div>
      </div>

      <div className="scores">
        <div className="scores-col">
          {homeRatings.map((obj, index) => {
            if (obj.percent > awayRatings[index].percent) {
              return (
                <b>
                  <p key={index}>
                    {obj.value} ({obj.percent}%)
                  </p>
                </b>
              );
            } else {
              return (
                <p key={index}>
                  {obj.value} ({obj.percent}%)
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
          {awayRatings.map((obj, index) => {
            if (obj.percent > homeRatings[index].percent) {
              return (
                <b>
                  <p key={index}>
                    {obj.value} ({obj.percent}%)
                  </p>
                </b>
              );
            } else {
              return (
                <p key={index}>
                  {obj.value} ({obj.percent}%)
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
