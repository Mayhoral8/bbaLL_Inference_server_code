import React, { useState, lazy, Suspense, useEffect } from "react";
import RecentEventsList from "./Components/RecentEvents/RecentEventsList";
import { CenteredMain } from "../globalStyles";
import ScrollToTopOnMount from "../Shared/ScrollToTopOnMount";
import { Route, useRouteMatch } from "react-router-dom";
import Spinner from "../Shared/Spinner/loadingSpinner";
const GameSummary = lazy(() => import("./Components/GameSummary/GameSummary"));

const GamePage = (props) => {
  const [selectedGameIndex, setSelectedGameIndex] = useState(
    props.gameInfo.length - 1
  );
  const { path, url } = useRouteMatch();

  useEffect(() => {
    props.history.push(`${path}/${props.gameInfo[0].id}`);
  }, []);

  return (
    <>
      <ScrollToTopOnMount />
      <RecentEventsList
        gameInfo={props.gameInfo}
        setSelectedGameIndex={setSelectedGameIndex}
        selectedGameIndex={selectedGameIndex}
        url={url}
      />

      <CenteredMain games>
        <Suspense
          fallback={
            <div
              style={{
                width: "100%",
                height: "calc(100vh - 284.14px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner width="100%" height="100%" />
            </div>
          }
        >
          <Route path={`${path}/:gameId?`}>
            <GameSummary
              gameInfo={props.gameInfo}
              gamePbp={props.gamePbp}
              gamePlayers={props.gamePlayers}
              selectedGameIndex={selectedGameIndex}
            />
          </Route>
        </Suspense>
      </CenteredMain>
    </>
  );
};

export default GamePage;
