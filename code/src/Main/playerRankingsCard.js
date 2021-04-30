import React, { useState } from "react";
import { fbStorage } from "../App/config";
import { CardContainer } from "./playerrankingscard-style";

const PlayerRankingsCard = () => {
  return (
    <CardContainer>
      <div className="top">
        <div className="title">Daily _______ Rankings</div>
        <div className="dropdown">
          <select>
            <option>Fantasy Score</option>
            <option>Points</option>
            <option>PointsPerPoss</option>
            <option>Three pointers</option>
          </select>
        </div>
      </div>
      <div className="players">
        <div className="player-box">
          <div className="logo-box">
            <img src="https://firebasestorage.googleapis.com/v0/b/nba-database-cb52a.appspot.com/o/player_photo_hayaoStyle_v2%2FAlex_Caruso.png?alt=media&token=384c3147-4468-4680-bb67-63831870f8eb" />
            <div className="player-name">
              Alex <br />
              Caruso
            </div>
          </div>
          <div className="value">2939</div>
        </div>
        <div className="player-box">
          <div className="logo-box">
            <img src="https://firebasestorage.googleapis.com/v0/b/nba-database-cb52a.appspot.com/o/player_photo_hayaoStyle_v2%2FAlex_Caruso.png?alt=media&token=384c3147-4468-4680-bb67-63831870f8eb" />
            <div className="player-name">
              Alex <br />
              Caruso
            </div>
          </div>

          <div className="value">2939</div>
        </div>
        <div className="player-box">
          <div className="logo-box">
            <img src="https://firebasestorage.googleapis.com/v0/b/nba-database-cb52a.appspot.com/o/player_photo_hayaoStyle_v2%2FAlex_Caruso.png?alt=media&token=384c3147-4468-4680-bb67-63831870f8eb" />
            <div className="player-name">
              Alex
              <br />
              Caruso
            </div>
          </div>

          <div className="value">2939</div>
        </div>
        <div className="player-box">
          <div className="logo-box">
            <img src="https://firebasestorage.googleapis.com/v0/b/nba-database-cb52a.appspot.com/o/player_photo_hayaoStyle_v2%2FAlex_Caruso.png?alt=media&token=384c3147-4468-4680-bb67-63831870f8eb" />
            <div className="player-name">
              Alex <br />
              Caruso
            </div>
          </div>

          <div className="value">2939</div>
        </div>
      </div>
    </CardContainer>
  );
};

export default PlayerRankingsCard;
