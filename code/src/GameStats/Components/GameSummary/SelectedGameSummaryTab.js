import React from "react";
import { useParams } from "react-router-dom";
import BoxScoreContainer from "../Boxscore/BoxScoreContainer";
import GameStatsTable from "../GameStats/GameStatsTable";
import MatchFacts from "../MatchFacts/MatchFacts";
import Overview from "../Overview/Overview";

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
    return <GameStatsTable info={info} />;
  } else if (tab === "boxscore") {
    return (
      <BoxScoreContainer
        selectedGameIndex={selectedGameIndex}
        info={info}
        gamePlayers={gamePlayers}
      />
    );
  } else if (tab === "overview" || !tab) {
    return (
      <Overview
        selectedGameIndex={selectedGameIndex}
        homeTeam={info.Home.Team}
        awayTeam={info.Away.Team}
        gamePbp={gamePbp}
        highlights={info.Highlights.Text}
      />
    );
  } else {
    return (
      <MatchFacts
        leads={leads}
        ties={ties}
        fantasy={fantasy}
        info={info}
        abbreviatedHomeTeam={abbreviatedHomeTeam}
        abbreviatedAwayTeam={abbreviatedAwayTeam}
      />
    );
  }
};

export default SelectedGameSummaryTab;
