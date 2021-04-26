import React from "react";
import { useParams } from "react-router-dom";
import BoxScoreContainer from "../Boxscore/BoxScoreContainer";
import GameStatsTable from "../GameStats/GameStatsTable";
import MatchFacts from "../MatchFacts/MatchFacts";
import Overview from "../Overview/Overview";
import Summary from "../Overview/Summary";

const SelectedGameSummaryTab = ({
  info,
  leads,
  ties,
  fantasy,
  abbreviatedHomeTeam,
  abbreviatedAwayTeam,
  selectedGameIndex,
  gamePlayers,
  gamePbp,
}) => {
  let { tab } = useParams();

  if (tab === "stats") {
    return (
      <>
        <GameStatsTable info={info} />
        <Summary 
        selectedGameIndex={selectedGameIndex}
        homeTeam={info.Home.Team}
        awayTeam={info.Away.Team}
        gamePbp={gamePbp}
        />
      </>
    );
  } else if (tab === "boxscore") {
    return (
      <>
        <BoxScoreContainer
          selectedGameIndex={selectedGameIndex}
          info={info}
          gamePlayers={gamePlayers}
        />
        <Summary 
        selectedGameIndex={selectedGameIndex}
        homeTeam={info.Home.Team}
        awayTeam={info.Away.Team}
        gamePbp={gamePbp}
        />
      </>
    );
  } else if (tab === "overview" || !tab) {
    return (
      <>
        <Overview
          highlights={info.Highlights.Text}
          YoutubeHighlight={info.Common.YoutubeHighlight}
        />
        <Summary 
          selectedGameIndex={selectedGameIndex}
          homeTeam={info.Home.Team}
          awayTeam={info.Away.Team}
          gamePbp={gamePbp}
        />
      </>
    );
  } else {
    return (
      <>
        <MatchFacts
          leads={leads}
          ties={ties}
          fantasy={fantasy}
          info={info}
          abbreviatedHomeTeam={abbreviatedHomeTeam}
          abbreviatedAwayTeam={abbreviatedAwayTeam}
        />
          <Summary 
          selectedGameIndex={selectedGameIndex}
          homeTeam={info.Home.Team}
          awayTeam={info.Away.Team}
          gamePbp={gamePbp}
        />
      </>
    );
  }
};

export default SelectedGameSummaryTab;
