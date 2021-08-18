import React from "react";
import GameSummaryTab from "./GameSummaryTab";
import QuarterlyTable from "./QuarterlyTable";
import GameSummaryBanner from "./GameSummaryBanner";
import { getKeyByValue } from "../../../Shared/Functions/GetKeyByValue";
import { ABB2TEAM } from "../../../constants";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import SelectedGameSummaryTab from "./SelectedGameSummaryTab";
import { GameSummaryWrapper } from "./GameSummary-Styles";

const GameSummary = ({ gameInfo, selectedGameIndex, gamePbp, gamePlayers }) => {
  let { path, url } = useRouteMatch();

  // only display the selected game
  return (
    <GameSummaryWrapper>
      {gameInfo
        .filter((_, i) => i === selectedGameIndex)
        .map((info) => {
          // extract data
          const date = info.id;
          const leads = info.Common.Number_lead_changes;
          const ties = info.Common.Number_ties;
          const fantasyRanking = info.Common.Fantasy_ranking;
          const homeQuarterlyScores = [
            info.Q1.Home.points,
            info.Q2.Home.points,
            info.Q3.Home.points,
            info.Q4.Home.points,
            info.OT ? info.OT.Home.points : null,
          ];
          const awayQuarterlyScores = [
            info.Q1.Away.points,
            info.Q2.Away.points,
            info.Q3.Away.points,
            info.Q4.Away.points,
            info.OT ? info.OT.Away.points : null,
          ];
          const gameSummaryTableData = [
            {
              title: "Away",
              quarterValues: awayQuarterlyScores,
              total: info.Away.points,
            },
            {
              title: "Home",
              quarterValues: homeQuarterlyScores,
              total: info.Home.points,
            },
          ];
          // abbreviated team names
          const abbreviatedHomeTeam = getKeyByValue(ABB2TEAM, info.Home.Team);
          const abbreviatedAwayTeam = getKeyByValue(ABB2TEAM, info.Away.Team);

          return (
            <div className="single-summary" key={date}>
              <div className="top-section">
                <GameSummaryBanner
                  homeTeam={info.Home.Team}
                  awayTeam={info.Away.Team}
                  abbreviatedHomeTeam={abbreviatedHomeTeam}
                  abbreviatedAwayTeam={abbreviatedAwayTeam}
                >
                  <div className="game-summary">
                    <h2>{info.Away.points}</h2>
                    <h2 className="colon">:</h2>
                    <QuarterlyTable rowData={gameSummaryTableData} hide />
                    <h2>{info.Home.points}</h2>
                  </div>
                </GameSummaryBanner>

                <div className="mobile-quarterly-container">
                  <QuarterlyTable rowData={gameSummaryTableData} />
                </div>
              </div>

              {/* Middle section: Select Tabs */}
              <GameSummaryTab gameCode={date} url={url} />

              {/* Bottom section: Summary Content */}
              <div className="game-summary-content">
                <Switch>
                  <Route path={`${path}/:tab?`}>
                    <SelectedGameSummaryTab
                      info={info}
                      leads={leads}
                      ties={ties}
                      fantasy={fantasyRanking}
                      abbreviatedHomeTeam={abbreviatedHomeTeam}
                      abbreviatedAwayTeam={abbreviatedAwayTeam}
                      selectedGameIndex={selectedGameIndex}
                      gamePlayers={gamePlayers}
                      gamePbp={gamePbp}
                    />
                  </Route>
                </Switch>
              </div>
            </div>
          );
        })}
    </GameSummaryWrapper>
  );
};
export default GameSummary;
