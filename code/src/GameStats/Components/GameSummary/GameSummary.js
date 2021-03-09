import React from "react";
import styled from "styled-components";
import GameSummaryTab from "./GameSummaryTab";
import QuarterlyTable from "./QuarterlyTable";
import GameSummaryBanner from "./GameSummaryBanner";
import backgroundImage from "../../../assets/images/court.jpg";
import { getKeyByValue } from "../../../Shared/Functions/GetKeyByValue";
import { ABB2TEAM } from "../../../constants";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import SelectedGameSummaryTab from "./SelectedGameSummaryTab";

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
              {/* Top section:  Game Scores */}
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
              <GameSummaryTab
                gameCode={date}
                url={url}
              />

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

const GameSummaryWrapper = styled.div`
  width: auto;

  .single-summary {
    margin: 0;
    width: 100%;
    background: var(--white);
  }
  .game-summary-content {
    border: 1px solid silver;
    border-top: 0;
    padding: 2rem 0;
  }
  .top-section {
    background-image: linear-gradient(
        to right,
        rgba(56, 40, 81, 0.95) 50%,
        rgba(56, 40, 81, 0.3)
      ),
      url(${backgroundImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .colon {
    display: flex;
    margin: 0 0.5rem;
  }

  @media (min-width: 768px) {
    .single-summary {
      margin: 2rem 0;
    }
    .mobile-quarterly-container {
      display: none;
    }
    .game-summary-content {
      padding: 2rem;
    }
    .colon {
      display: none;
    }
  }
`;

export default GameSummary;
