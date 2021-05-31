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
import TeamScoreTable from "./TeamScoreTable";
import styled from "styled-components";
import { autoPercentage } from "chartjs-plugin-watermark";

const GamePageContainer = () => {
  const [data, setData] = useState([{}, {}, {}]);
  const [games, setGames] = useState([]);
  const [memeUrls, setMemeUrls] = useState([]);
  const [playerRankingTypes, setPlayerRankingTypes] = useState([]);
  useEffect(() => {
    fbFirestore
      .collection("future_game_info")
      .get()
      .then((snapshot) => {
        let gamesFound = [];
        snapshot.docs.map((doc) => {
          const obj = doc.data();
          console.log(obj);
          if (Object.keys(obj).length !== 0) {
            gamesFound.push(obj);
          }
        });

        setGames(gamesFound);
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

  let test = [{}];
  console.log(games);
  let hasDataLoaded = Object.keys(data).length === 4;

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

  const getFirebaseData = () => {
    let data = [];
    // const documents = [
    //   "bidaily_Top10",
    //   "weekly_Top10",
    //   "seasonal_Top10",
    //   "team_Top10",
    // ];
    // const collections = {
    //   bidaily_Top10: [
    //     "FantasyScore",
    //     "Points",
    //     "PointsPerPoss",
    //     "Three-Pointers",
    //   ],
    //   weekly_Top10: ["FantasyScore", "Points", "PointsPerPoss", "Three-Pointers"],
    //   seasonal_Top10: ["Num_DD", "Num_TD"],
    //   team_Top10: ["Massey Rating", "ELO Rating", "Standing"],
    // };

    const collections = ["player_ranking", "team_ranking"];

    fbFirestore
      .collection("ranking")
      .get()
      .then((snapshot) => {
        const documents = snapshot.docs.map((doc) => doc.data());
        const types = ["bidaily", "weekly", "seasonal"];
        let foundTypes = [];
        types.forEach((type) => {
          if (
            type in documents[0] &&
            Object.keys(documents[0][type]).length !== 0
          ) {
            data.push(documents[0][type]);
            foundTypes.push(type);
          }
        });

        setPlayerRankingTypes(foundTypes);
        data.push(documents[1]);
      });
    return data;
  };

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
        <div style={{ margin: "0rem 0rem 0rem 0rem" }}>
          <MainPageContainer>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {useWindowSize() < 1400 && games.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "white",
                    boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.08)",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      margin: "1rem 0rem 0rem 0rem",
                      fontSize: "1.5rem",
                    }}
                  >
                    Upcoming Games
                  </div>
                  <div
                    style={{
                      zIndex: 0,
                      marginTop: "0rem",
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
                </div>
              )}

              <RowContainer>
                {hasDataLoaded ? (
                  <PlayerRankingsCard
                    data={[data[0], data[1], data[2]]}
                    rankingTypes={playerRankingTypes}
                  />
                ) : (
                  <div
                    style={{
                      background: "white",
                      boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.08)",
                      height: "100%",
                      width: "100%",
                      margin: "0rem 3rem 3rem 0rem",
                      minWidth: "400px",
                    }}
                  >
                    <div style={{ fontSize: "1.5rem", padding: "1.5rem" }}>
                      Player Rankings
                    </div>
                  </div>
                )}
                <MemeCard urls={memeUrls} />
              </RowContainer>

              <TeamRankingsContainer>
                <div
                  style={{
                    fontSize: "1.5rem",
                  }}
                >
                  NBA Team Rankings
                </div>
                {hasDataLoaded ? (
                  <TeamScoreTable leftColHeading={"Rank"} data={data[3]} />
                ) : (
                  <div style={{ minHeight: "400px" }}></div>
                )}
              </TeamRankingsContainer>
            </div>

            {useWindowSize() > 1400 && games.length > 0 && (
              <div
                style={{
                  backgroundColor: "white",
                  marginTop: "0rem",
                  height: "100%",
                  minWidth: "300px",
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.5rem",
                  overflowY: "scroll",
                  overflowX: "hidden",
                  position: "relative",
                  boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.08)",
                  height: "1043px",
                  scrollbarWidth: "thin" /* "auto" or "thin" */,
                  // scrollbarColor: "#8783A8 #9693ab" /* scroll thumb and track */,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    fontSize: "1.5rem",
                    margin: "1rem 0rem 1rem 0rem",
                  }}
                >
                  Upcoming Games
                </div>
                {games.map((item, index) => {
                  return <FutureGameOddsCard data={item} key={index} />;
                })}
              </div>
            )}
          </MainPageContainer>
        </div>
      </FullWidthMain>
    </>
  );
};

const TeamRankingsContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1400px) {
    margin: 0rem 0rem 0rem 0rem;
  }
  margin: 3rem 0rem 0rem 0rem;
  background-color: white;

  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
`;

const futureGameList = styled.div`
  background-color: white;
  margin-top: 0rem;
  margin-left: 3rem;
  height: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  overflow-y: scroll;
  position: relative;
  border: solid gray 1px;
  height: 885px;
  scrollbar-width: thin;
  // scrollbarColor: "#8783A8 #9693ab" /* scroll thumb and track */,
`;

const MainPageContainer = styled.div`
  @media (max-width: 1400px) {
    flex-direction: column;
  }

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-width: 1640px;
  justify-content: center;

  @media screen and (min-width: 996px) {
    margin: 4rem auto 0rem auto;
  }
  margin: 2.2rem auto 0rem auto;
`;

const RowContainer = styled.div`
  @media (max-width: 643px) {
    flex-direction: column;
  }
  display: flex;
  flex-direction: row;
`;

export default GamePageContainer;
