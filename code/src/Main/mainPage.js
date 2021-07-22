import React, { useState, useEffect } from "react";

import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { FullWidthMain } from "../globalStyles";
import EventList from "./eventlist";
import SEO from "../Shared/SEO";
import { fbFirestore } from "../App/config";
import useWindowSize from "Shared/hooks/useWindowSize";
import PlayerRankingsCard from "./playerRankingsCard";
import MemeCard from "./memeCard";
import TeamScoreTable from "./TeamScoreTable";
import FutureGameList from "./futuregamelist";
import {
  FutureGameListBox,
  FutureGameTitle,
  PlayerRankingPlaceholderBox,
  PlayerRankingsPlaceholderTitle,
  FutureGameListRow,
  TeamRankingsTitle,
  TeamRankingsContainer,
  RowContainer,
  MainPageContainer,
} from "./mainpage-style";

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

        <MainPageContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {useWindowSize() < 1400 && games.length > 0 && (
              <FutureGameListBox>
                <FutureGameTitle>Upcoming Games</FutureGameTitle>
                <FutureGameListRow>
                  <FutureGameList games={games} />
                </FutureGameListRow>
              </FutureGameListBox>
            )}

            <RowContainer>
              {hasDataLoaded ? (
                <PlayerRankingsCard
                  data={[data[0], data[1], data[2]]}
                  rankingTypes={playerRankingTypes}
                  timeOut = {5000}
                  cycling = {true}
                />
              ) : (
                <PlayerRankingPlaceholderBox>
                  <PlayerRankingsPlaceholderTitle>
                    Player Rankings
                  </PlayerRankingsPlaceholderTitle>
                </PlayerRankingPlaceholderBox>
              )}
              <MemeCard urls={memeUrls} />
            </RowContainer>

            <TeamRankingsContainer>
              <TeamRankingsTitle>NBA Team Rankings</TeamRankingsTitle>
              {hasDataLoaded ? (
                <TeamScoreTable leftColHeading={"Rank"} data={data[3]} />
              ) : (
                <div style={{ minHeight: "400px" }}></div>
              )}
            </TeamRankingsContainer>
          </div>

          {useWindowSize() > 1400 && games.length > 0 && (
            <FutureGameListBox>
              <FutureGameTitle>Upcoming Games</FutureGameTitle>
              <FutureGameList games={games} />
            </FutureGameListBox>
          )}
        </MainPageContainer>
      </FullWidthMain>
    </>
  );
};

export default GamePageContainer;
