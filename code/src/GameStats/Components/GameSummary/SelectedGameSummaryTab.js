import React from "react";
import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../../Shared/Spinner/loadingSpinner";
import { SpinnerContainer } from "./SelectedGameSummaryTabStyles";
const BoxScoreContainer = lazy(() => import("../Boxscore/BoxScoreContainer"));
const GameStatsTable = lazy(() => import("../GameStats/GameStatsTable"));
const MatchFacts = lazy(() => import("../MatchFacts/MatchFacts"));
const Overview = lazy(() => import("../Overview/Overview"));
const Summary = lazy(() => import("../Overview/Summary"));

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
        <Suspense
          fallback={
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          }
        >
          <GameStatsTable info={info} />
        </Suspense>
        <Suspense
          fallback={
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          }
        >
          <Summary
            selectedGameIndex={selectedGameIndex}
            homeTeam={info.Home.Team}
            awayTeam={info.Away.Team}
            gamePbp={gamePbp}
          />
        </Suspense>
      </>
    );
  } else if (tab === "boxscore") {
    return (
      <>
        <Suspense
          fallback={
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          }
        >
          <BoxScoreContainer
            selectedGameIndex={selectedGameIndex}
            info={info}
            gamePlayers={gamePlayers}
          />
        </Suspense>
        <Suspense
          fallback={
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          }
        >
          <Summary
            selectedGameIndex={selectedGameIndex}
            homeTeam={info.Home.Team}
            awayTeam={info.Away.Team}
            gamePbp={gamePbp}
          />
        </Suspense>
      </>
    );
  } else if (tab === "overview" || !tab) {
    return (
      <>
        <Suspense
          fallback={
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          }
        >
          <Overview
            highlights={info.Highlights.Text}
            YoutubeHighlight={info.Common.YoutubeHighlight}
          />
        </Suspense>
        <Suspense
          fallback={
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          }
        >
          <Summary
            selectedGameIndex={selectedGameIndex}
            homeTeam={info.Home.Team}
            awayTeam={info.Away.Team}
            gamePbp={gamePbp}
          />
        </Suspense>
      </>
    );
  } else {
    return (
      <>
        <Suspense
          fallback={
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          }
        >
          <MatchFacts
            leads={leads}
            ties={ties}
            fantasy={fantasy}
            info={info}
            abbreviatedHomeTeam={abbreviatedHomeTeam}
            abbreviatedAwayTeam={abbreviatedAwayTeam}
          />
        </Suspense>
        <Suspense
          fallback={
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          }
        >
          <Summary
            selectedGameIndex={selectedGameIndex}
            homeTeam={info.Home.Team}
            awayTeam={info.Away.Team}
            gamePbp={gamePbp}
          />
        </Suspense>
      </>
    );
  }
};

export default SelectedGameSummaryTab;
