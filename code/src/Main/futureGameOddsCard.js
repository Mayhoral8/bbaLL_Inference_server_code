import React, { useState } from "react";
import { fbStorage } from "../App/config";
//import firebasestorage from "firebase";
import { Card } from "./futuregameoddscard-style";
const FutureGameOddsCard = (item) => {
  const [JSON, setJSON] = useState(item);
  const [homeImg, setHomeImg] = useState("");
  const [awayImg, setAwayImg] = useState("");

  let homeTeam = JSON.data["Game Info"]["Home Team"];
  let awayTeam = JSON.data["Game Info"]["Away Team"];

  const teamsELO = [
    Math.round(JSON.data["Game Prediction"]["ELO"][homeTeam]),
    Math.round(JSON.data["Game Prediction"]["ELO"][awayTeam]),
  ];
  const teamsMassey = [
    Math.round(JSON.data["Game Prediction"]["Massey"][homeTeam] * 100) / 100,
    Math.round(JSON.data["Game Prediction"]["Massey"][awayTeam] * 100) / 100,
  ];
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
  const teamsBettingOdds = [
    Math.round(JSON.data["Game Odds"]["General"][latestDate][homeTeam] * 100) /
      100,
    Math.round(JSON.data["Game Odds"]["General"][latestDate][awayTeam] * 100) /
      100,
  ];
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

  // homeTeam = homeTeam.replace(/\s+/g, "<br/>");
  // awayTeam = awayTeam.replace(/\s+/g, "<br/>");
  return (
    <Card>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <img id="img1" className="logo-1" src={homeImg} />
        <div className="vs-text">
          <b>VS</b>
        </div>
        <img className="logo-2" src={awayImg} />
      </div>
      <div className="team-names">
        <div>{homeTeam}</div>
        <div>{awayTeam}</div>
      </div>

      <div className="scores">
        <div className="scores-row">
          <div>
            {teamsELO[0]} ({calculateELOPercent(teamsELO[0], teamsELO[1])}%)
          </div>
          <div>ELO Rating</div>
          <div>
            {teamsELO[1]} ({100 - calculateELOPercent(teamsELO[0], teamsELO[1])}
            %)
          </div>
        </div>
        <div className="scores-row">
          <div>
            {teamsMassey[0]} (
            {calculateMasseyPercent(teamsMassey[0], teamsMassey[1])}%)
          </div>
          <div>Massey Rating</div>
          <div>
            {teamsMassey[1]} (
            {100 - calculateMasseyPercent(teamsMassey[0], teamsMassey[1])}%)
          </div>
        </div>
        <div className="scores-row">
          <div>
            {teamsBettingOdds[0]} (
            {calculateBettingOddsPercent(
              teamsBettingOdds[0],
              teamsBettingOdds[1]
            )}
            %)
          </div>
          <div>Game Odds</div>
          <div>
            {teamsBettingOdds[1]} (
            {100 -
              calculateBettingOddsPercent(
                teamsBettingOdds[0],
                teamsBettingOdds[1]
              )}
            %)
          </div>
        </div>

        <div className="game-date">
          Game Date: {JSON.data["Game Info"]["Game Time"]}
        </div>
      </div>
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

export default FutureGameOddsCard;
