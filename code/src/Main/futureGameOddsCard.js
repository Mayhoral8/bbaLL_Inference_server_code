import React, { useState } from "react";
import { Card } from "./futuregameoddscard-style";
const FutureGameOddsCard = (item) => {
  const [JSON, setJSON] = useState(item);
  const homeTeam = JSON.data["Game Info"]["Home Team"];
  const awayTeam = JSON.data["Game Info"]["Away Team"];
  console.log(JSON);
  return (
    <Card>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <img
          className="logo-1"
          src="https://firebasestorage.googleapis.com/v0/b/nba-database-cb52a.appspot.com/o/team_logo_spi%2FAtlanta_Hawks.png?alt=media&token=5b0509dd-559f-42c9-9f18-6c65097d22b4"
        />
        <div className="vs-text">
          <b>VS</b>
        </div>
        <img
          className="logo-2"
          src="https://firebasestorage.googleapis.com/v0/b/nba-database-cb52a.appspot.com/o/team_logo_spi%2FBoston_Celtics.png?alt=media&token=77445de9-bc0c-4d66-9b64-2387b39d095c"
        />
      </div>
      <div className="team-names">
        <div>{homeTeam}</div>
        <div>{awayTeam}</div>
      </div>

      <div className="scores">
        <div className="scores-row">
          <div>
            <b>{Math.round(JSON.data["Game Prediction"]["ELO"][homeTeam])}</b>
          </div>
          <div>ELO Rating</div>
          <div>{Math.round(JSON.data["Game Prediction"]["ELO"][awayTeam])}</div>
        </div>
        <div className="scores-row">
          <div>1.46</div>
          <div>Massey Rating</div>
          <div>
            <b>3.56</b>
          </div>
        </div>
        <div className="scores-row">
          <div>30%</div>
          <div>Game Odds</div>
          <div>
            <b>60%</b>
          </div>
        </div>

        <div className="game-date">
          Game Date: {JSON.data["Game Info"]["Game Time"]}
        </div>
      </div>
    </Card>
  );
};

export default FutureGameOddsCard;
