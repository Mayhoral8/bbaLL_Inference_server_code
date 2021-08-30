import React from "react";
import HomeVsAwayTitle from "../HomeVsAwayTitle/HomeVsAwayTitle";
import StatsBarPlot from "./StatsBarPlot";
import { GameSummaryTableWrapper } from "./GameStats-styles";

const GameStatsTable = ({ info }) => {
  const y = [
    "effective_field_goal_percentage",
    "field_goal_percentage",
    "three_point_attempt_rate",
    "turnovers",
    "steals",
    "blocks",
    "offensive_rebounds",
    "total_rebounds",
    "assists",
    "play_score",
  ];
  const modifiedY = [
    "PLAY",
    "AST",
    "REB",
    "OREB",
    "BLK",
    "STL",
    "TO",
    "3P%",
    "FG%",
    "eFG%",
  ];
  return (
    <GameSummaryTableWrapper>
      <HomeVsAwayTitle home={info.Home.Team} away={info.Away.Team} />

      <div className="bar-graph-container">
        <StatsBarPlot info={info} y={y} mirror away />
        <ul>
          {[...y].reverse().map((label, i) => {
            const homeValue = info.Home[label];
            const awayValue = info.Away[label];
            const labelWithPercentage = modifiedY[i].split("").includes("%");
            return (
              <li key={label}>
                <span className={`${awayValue > homeValue ? "highlight" : ""}`}>
                  {labelWithPercentage
                    ? (awayValue * 100).toFixed(1)
                    : awayValue}
                </span>
                {modifiedY[i]}
                <span className={`${homeValue > awayValue ? "highlight" : ""}`}>
                  {labelWithPercentage
                    ? (homeValue * 100).toFixed(1)
                    : homeValue}
                </span>
              </li>
            );
          })}
        </ul>
        <StatsBarPlot info={info} y={y} />
      </div>
    </GameSummaryTableWrapper>
  );
};

export default GameStatsTable;
