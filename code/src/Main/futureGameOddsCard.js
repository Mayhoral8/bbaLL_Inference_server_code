import React, { useState } from "react";
import { Card } from "./futuregameoddscard-style";
const FutureGameOddsCard = () => {
  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "row" }}>
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
        <div>Atlanta Hawks</div>
        <div>Boston Celtics</div>
      </div>

      <div className="scores">
        <div class="scores-row">
          <div>
            <b>599</b>
          </div>
          <div>ELO Rating</div>
          <div>343</div>
        </div>
        <div class="scores-row">
          <div>1.46</div>
          <div>Game Odds</div>
          <div>
            <b>3.56</b>
          </div>
        </div>
        <div class="scores-row">
          <div>30%</div>
          <div>Betting Odds</div>
          <div>
            <b>60%</b>
          </div>
        </div>

        <div className="game-date">Game Date: Mon Apr 10 2021 at 7:00pm</div>
      </div>
    </Card>
  );
};

export default FutureGameOddsCard;
