import React, { useState } from "react";
import styled from "styled-components";
import { fbStorage } from "../App/config";
import { avoidColourSets } from "../Shared/Functions/gameStatsFunctions";
//import firebasestorage from "firebase";
import { Card, LogoBox } from "./futuregameoddscard-style";
const FutureGameOddsCard = ({ data, reference }) => {
  const [JSON, setJSON] = useState(data);

  // urls for team logo images
  const [homeImg, setHomeImg] = useState("");
  const [awayImg, setAwayImg] = useState("");

  const gameDate = JSON["Game Info"]["Game Time"];
  const ratingNames = ["ELO", "Massey", "Odds"];

  let homeTeamName = JSON["Game Info"]["Home Team"];
  let awayTeamName = JSON["Game Info"]["Away Team"];

  // Finds the latest date of the all the odds
  const allbettingOdds = JSON["Game Odds"]["General"];
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
      value: " - ",
      percent: "",
    },

    {
      value: " - ",
      percent: "",
    },

    {
      value: " - ",
      percent: "",
    },
  ];

  const awayRatings = [
    {
      value: " - ",
      percent: "",
    },

    {
      value: " - ",
      percent: "",
    },

    {
      value: " - ",
      percent: "",
    },
  ];

  try {
    homeRatings[0].value = Math.round(
      JSON["Game Prediction"]["ELO"][homeTeamName]["rating"]
    );
    homeRatings[0].percent = Math.round(
      JSON["Game Prediction"]["ELO"][homeTeamName]["prob"] * 100
    );

    awayRatings[0].value = Math.round(
      JSON["Game Prediction"]["ELO"][awayTeamName]["rating"]
    );
    awayRatings[0].percent = Math.round(
      JSON["Game Prediction"]["ELO"][awayTeamName]["prob"] * 100
    );
  } catch (error) {
    // console.log("Missing data for future game Odds");
  }

  try {
    homeRatings[1].value =
      Math.round(
        JSON["Game Prediction"]["Massey"][homeTeamName]["rating"] * 100
      ) / 100;
    homeRatings[1].percent = Math.round(
      JSON["Game Prediction"]["Massey"][homeTeamName]["prob"] * 100
    );

    awayRatings[1].value =
      Math.round(
        JSON["Game Prediction"]["Massey"][awayTeamName]["rating"] * 100
      ) / 100;
    awayRatings[1].percent = Math.round(
      JSON["Game Prediction"]["Massey"][awayTeamName]["prob"] * 100
    );
  } catch (error) {
    // console.log("Missing data for future game Odds");
  }

  try {
    if (Object.keys(JSON["Game Odds"]["General"]).length > 0) {
      homeRatings[2].value =
        Math.round(
          JSON["Game Odds"]["General"][latestDate][homeTeamName] * 100
        ) / 100;
      awayRatings[2].value =
        Math.round(
          JSON["Game Odds"]["General"][latestDate][awayTeamName] * 100
        ) / 100;
    }
  } catch (error) {
    console.log("Missing data for the future game Odds");
  }

  // Remove this when Game Odds percentage is available in firebase
  if (JSON["Game Odds"]["General"].hasOwnProperty(latestDate)) {
    homeRatings[2].percent = calculateBettingOddsPercent(
      homeRatings[2].value,
      awayRatings[2].value
    );
    awayRatings[2].percent = 100 - homeRatings[2].percent;
  }

  // Rounding values to 2 decimal places
  for (let i = 0; i < awayRatings.length; i++) {
    // i > 0 makes sure ELO isn't rounded to 2 decimals
    if (i > 0) {
      if (awayRatings[i].value !== " - ") {
        awayRatings[i].value = awayRatings[i].value.toFixed(2);
      }
      if (homeRatings[i].value !== " - ") {
        homeRatings[i].value = homeRatings[i].value.toFixed(2);
      }
    }
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

  // shortens team names to the last word to that it fits on the Card
  homeTeamName = homeWords[homeWords.length - 1];
  awayTeamName = awayWords[awayWords.length - 1];

  return (
    <Card
      homeColour={teamColours.colourOne}
      awayColour={teamColours.colourTwo}
      ref={reference}
    >
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
                <b key={index}>
                  <p key={index}>
                    {obj.value}{" "}
                    {obj.percent === "" ? "" : "(" + obj.percent + "%)"}
                  </p>
                </b>
              );
            } else {
              return (
                <p key={index}>
                  {obj.value}{" "}
                  {obj.percent === "" ? "" : "(" + obj.percent + "%)"}
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
                <b key={index}>
                  <p key={index}>
                    {obj.value}{" "}
                    {obj.percent === "" ? "" : "(" + obj.percent + "%)"}
                  </p>
                </b>
              );
            } else {
              return (
                <p key={index}>
                  {obj.value}{" "}
                  {obj.percent === "" ? "" : "(" + obj.percent + "%)"}
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
    <LogoBox>
      <img className="logo-1" src={homeImg} />
      <div className="vs-text">
        <b>VS</b>
      </div>
      <img className="logo-2" src={awayImg} />
    </LogoBox>
  );
};

export default FutureGameOddsCard;
