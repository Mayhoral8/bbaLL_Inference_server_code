import React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { FullWidthMain } from "../globalStyles";
import EventList from "./eventlist";
import SEO from "../Shared/SEO";

const GamePageContainer = () => {
  const currentYear = "2020-21";
  useFirestoreConnect(() => [
    {
      collection: "game_info",
      doc: currentYear,
      subcollections: [
        {
          collection: "Gamecode",
        },
      ],
      storeAs: "gameInfoJson",
    },
    {
      collection: "game_pbp",
      doc: currentYear,
      subcollections: [
        {
          collection: "Gamecode",
        },
      ],
      storeAs: "gamePbpJson",
    },
    {
      collection: "game_players",
      doc: currentYear,
      subcollections: [
        {
          collection: "Gamecode",
        },
      ],
      storeAs: "gamePlayersJson",
    },
  ]);
  const gameInfo = useSelector(
    (state) => state.firestoreReducer.ordered.gameInfoJson
  );
  const gamePbp = useSelector(
    (state) => state.firestoreReducer.ordered.gamePbpJson
  );
  const gamePlayers = useSelector(
    (state) => state.firestoreReducer.ordered.gamePlayersJson
  );
  return (
    <>
      <SEO
        title="NBA game analytics"
        description="NBA game analytics - powered by AI, Machine learning, & Statistics. We provide match facts, boxscores, shot types, fantasy ranking, and time series analysis. The time series analysis consists of game of runs, effective field goal percentage, fantasy scores, plays (possessions), and play by play texts. We aim to have the most accurate and fastest sports stats provider."
      />
      <FullWidthMain>
        <EventList
          gameInfo={gameInfo}
          gamePbp={gamePbp}
          gamePlayers={gamePlayers}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "gray",
              margin: "1rem",
              flexDirection: "column",
              width: "100%",
              margin: "3rem",
            }}
          >
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <div style={{ paddingTop: "10rem", paddingBottom: "10rem" }}>
                Top Players
              </div>
              <div style={{ paddingTop: "10rem", paddingBottom: "10rem" }}>
                Meme
              </div>
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <div style={{ paddingTop: "10rem", paddingBottom: "10rem" }}>
                Top Teams
              </div>
              <div style={{ paddingTop: "10rem", paddingBottom: "10rem" }}>
                Survey
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "gray",
              marginTop: "3rem",
              marginRight: "3rem",
              height: "100%",
              width: "40%",
              display: "flex",
              justifyContent: "center",
              paddingTop: "40rem",
              paddingBotto: "40rem",
            }}
          >
            <div>Future Game Odds</div>
          </div>
        </div>
      </FullWidthMain>
    </>
  );
};

export default GamePageContainer;
