import React, { useState } from "react";
import GameSummary from "../GameStats/Components/GameSummary/GameSummary";
import RecentEventsList from "../GameStats/Components/RecentEvents/RecentEventsList";
import Spinner from "../Shared/Spinner/Spinner";
import { CenteredMain } from "../globalStyles";
import ScrollToTopOnMount from "../Shared/ScrollToTopOnMount";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const EventList = ({ gameInfo, gamePbp, gamePlayers }) => {
  if (!gameInfo || !gamePbp || !gamePlayers) {
    return <Spinner />;
  }
  const [selectedGameIndex, setSelectedGameIndex] = useState(
    gameInfo.length - 1
  );
  const { path, url } = useRouteMatch();

  return (
    <>
      <RecentEventsList
        gameInfo={gameInfo}
        setSelectedGameIndex={setSelectedGameIndex}
        selectedGameIndex={selectedGameIndex}
        url={url}
      />
    </>
  );
};

export default EventList;
