import React from "react";
import styled from "styled-components";
import GetPlayerImage from "../../../Individual/Components/GetPlayerImage";
import { breakTeamName } from "../../../Shared/Functions/breakTeamName";
import { RecentEventsItemWrapper } from "./RecentEventsItemList-style";

const RecentEventsItem = ({
  homeTeam,
  awayTeam,
  gameSummary,
  homeScore,
  awayScore,
  index,
  selectedGameIndex,
}) => {

  return (
    <RecentEventsItemWrapper gameSummary={gameSummary}>
      <div
        className={`${
          selectedGameIndex === index ? "active" : "inactive"
        } team-container`}
      >
        <div className="team away">
          <div className="image-container">
            <GetPlayerImage
              playerName={awayTeam.replace(/\s/g, "_")}
              isTeam={true}
            />
          </div>
          <p className="team-name">
            {breakTeamName(awayTeam).firstName}
            <br />
            {breakTeamName(awayTeam).lastName}
          </p>
          <p className="team-score">{awayScore}</p>
        </div>

        <div className="team home">
          <div className="image-container">
            <GetPlayerImage
              playerName={homeTeam.replace(/\s/g, "_")}
              isTeam={true}
            />
          </div>
          <p className="team-name">
            {breakTeamName(homeTeam).firstName}
            <br />
            {breakTeamName(homeTeam).lastName}
          </p>
          <p className="team-score">{homeScore}</p>
        </div>
      </div>
    </RecentEventsItemWrapper>
  );
};

export default RecentEventsItem;
