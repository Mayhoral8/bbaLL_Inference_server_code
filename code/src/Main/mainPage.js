import React, { useState, useEffect } from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { FullWidthMain } from "../globalStyles";
import EventList from "./eventlist";
import SEO from "../Shared/SEO";
import FutureGameOddsCard from "./futureGameOddsCard";
import { fbFirestore } from "../App/config";
import useWindowSize from "Shared/hooks/useWindowSize";
import PlayerRankingsCard from "./playerRankingsCard";
import MemeCard from "./memeCard";
import BoxScoreTable from "../GameStats/Components/Boxscore/BoxScoreTable";
import { autoPercentage } from "chartjs-plugin-watermark";

const getFirebaseData = () => {
  let data = [];
  const documents = [
    "bidaily_Top10",
    "weekly_Top10",
    "seasonal_Top10",
    "team_Top10",
  ];
  const collections = {
    bidaily_Top10: [
      "FantasyScore",
      "Points",
      "PointsPerPoss",
      "Three-Pointers",
    ],
    weekly_Top10: ["FantasyScore", "Points", "PointsPerPoss", "Three-Pointers"],
    seasonal_Top10: ["Num_DD", "Num_TD"],
    team_Top10: ["ELO Ranking", "ELO Rating", "Standing"],
  };
  documents.forEach((docName) => {
    let currentData = new Object();
    collections[docName].forEach((collName) => {
      fbFirestore
        .collection("landing_page_Top10")
        .doc(docName)
        .collection(collName)
        .get()
        .then((snapshot) => {
          const documents = snapshot.docs.map((doc) => doc.data());
          currentData[collName] = documents;
        });
    });
    data.push(currentData);
  });
  return data;
};

const GamePageContainer = () => {
  const collection = "landing_page_Top10";
  const [data, setData] = useState([{}, {}, {}]);
  const [games, setGames] = useState([]);
  const [memeUrls, setMemeUrls] = useState([]);
  useEffect(() => {
    fbFirestore
      .collection("future_game_info")
      .get()
      .then((snapshot) => {
        setGames(snapshot.docs.map((doc) => doc.data()));
      })
      .catch((error) => {
        console.log(error);
      });
    fbFirestore
      .collection("landing_page_Video")
      .get()
      .then((snapshot) => {
        const documents = snapshot.docs.map((doc) => doc.data());
        setMemeUrls(documents["0"].links);
      })
      .catch((error) => {
        console.log(error);
      });
    setData(getFirebaseData());
  }, []);
  console.log([data[1], data[2]]);
  console.log(data);

  const hasDataLoaded = Object.entries(data[0]).length !== 0;

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

  games.sort((game1, game2) => {
    return (
      new Date(game1["Game Info"]["Game Time"]) -
      new Date(game2["Game Info"]["Game Time"])
    );
  });
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
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            maxWidth: "1440px",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          {hasDataLoaded ? (
            <PlayerRankingsCard data={[data[0], data[1], data[2]]} />
          ) : (
            <div></div>
          )}
          <MemeCard urls={memeUrls} />

          {/* <div
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
              <div style={{}}>
                <div>Player 1</div>
                <div>Player 2</div>
                <div>Player 3</div>
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
          </div> */}
          {useWindowSize() > 834 ? (
            <div
              style={{
                backgroundColor: "white",
                marginTop: "3rem",
                marginRight: "3rem",
                height: "100%",
                width: "300px",
                display: "flex",
                flexDirection: "column",
                padding: "0.5rem",
                overflowY: "scroll",
                position: "relative",
                border: "solid gray 1px",
                height: "675px",
                scrollbarWidth: "thin" /* "auto" or "thin" */,
                // scrollbarColor: "#8783A8 #9693ab" /* scroll thumb and track */,
              }}
            >
              {games.map((item, index) => {
                return <FutureGameOddsCard data={item} key={index} />;
              })}
            </div>
          ) : (
            <div
              style={{
                zIndex: 0,
                backgroundColor: "white",
                borderTop: "solid gray 1px",
                borderBottom: "solid gray 1px",
                marginTop: "3rem",
                marginLeft: "0rem",
                marginRight: "0rem",
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                padding: "0.5rem",
                overflowX: "scroll",
                overflowY: "hidden",
                scrollbarWidth: "thin" /* "auto" or "thin" */,
                // scrollbarColor: "#8783A8 #9693ab" /* scroll thumb and track */,
              }}
            >
              {games.map((item, index) => {
                return <FutureGameOddsCard data={item} key={index} />;
              })}
            </div>
          )}
        </div>
      </FullWidthMain>
    </>
  );
};

export default GamePageContainer;
