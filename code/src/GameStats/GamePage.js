import React, { useState } from "react";
import GameSummary from "./Components/GameSummary/GameSummary";
import RecentEventsList from "./Components/RecentEvents/RecentEventsList";
import Spinner from "../Shared/Spinner/Spinner";
import { CenteredMain } from "../globalStyles";
import ScrollToTopOnMount from "../Shared/ScrollToTopOnMount";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const GamePage = ({ gameInfo, gamePbp, gamePlayers }) => {
  if (!gameInfo || !gamePbp || !gamePlayers) {
    return <Spinner />;
  }
  const [selectedGameIndex, setSelectedGameIndex] = useState(
    gameInfo.length - 1
  );
  const { path, url } = useRouteMatch();

  return (
    <>
      <ScrollToTopOnMount />
      <RecentEventsList
        gameInfo={gameInfo}
        setSelectedGameIndex={setSelectedGameIndex}
        selectedGameIndex={selectedGameIndex}
        url={url}
      />
      <CenteredMain games>
        <Switch>
          <Route path={`${path}/:gameId?`}>
            <GameSummary
              gameInfo={gameInfo}
              gamePbp={gamePbp}
              gamePlayers={gamePlayers}
              selectedGameIndex={selectedGameIndex}
            />
          </Route>
        </Switch>
      </CenteredMain>
    </>
  );
};

export default GamePage;
