import React, { useState, lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { FullWidthMain } from "../globalStyles";
import { fbFirestore } from "../App/config";
import EventList from "./eventlist";
import SEO from "../Shared/SEO";
import useWindowSize from "Shared/hooks/useWindowSize";
import Spinner from "./spinner";

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

const PlayerRankingsCard = lazy(() => import("./playerRankingsCard"));
const MemeCard = lazy(() => import("./memeCard"));
const TeamScoreTable = lazy(() => import("./TeamScoreTable"));
const FutureGameList = lazy(() => import("./futuregamelist"));

const GamePageContainer = (props) => {
  const [memeUrls, setMemeUrls] = useState([]);
  const [rankingTypes, setRankingTypes] = useState([]);
  const [games, setGames] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    let rankingsData = [];
    const initialTypes = ["bidaily", "weekly", "seasonal"];
    let rankingTypesArray = [];
    initialTypes.forEach((type) => {
      if (
        type in props.rankings[0] &&
        Object.keys(props.rankings[0][type]).length !== 0
      ) {
        rankingsData.push(props.rankings[0][type]);
        rankingTypesArray.push(type);
      }
    });

    setRankingTypes(rankingTypesArray);
    rankingsData.push(props.rankings[1]);
    setData(rankingsData);
    let sortedGames = props.futureGames;
    sortedGames.sort((game1, game2) => {
      return (
        new Date(game1["Game Info"]["Game Time"]) -
        new Date(game2["Game Info"]["Game Time"])
      );
    });
    setGames(sortedGames);

    fbFirestore
      .collection("landing_page_Video")
      .get()
      .then((snapshot) => {
        const documents = snapshot.docs.map((doc) => doc.data());
        setMemeUrls(documents["0"].links);
      })
      .catch((error) => {
        console.log(error); //Error handeling
      });
  }, []);

  let hasDataLoaded = Object.keys(data).length === 4;
  return (
    <>
      <SEO
        title="NBA game analytics"
        description="NBA game analytics - powered by AI, Machine learning, & Statistics. We provide match facts, boxscores, shot types, fantasy ranking, and time series analysis. The time series analysis consists of game of runs, effective field goal percentage, fantasy scores, plays (possessions), and play by play texts. We aim to have the most accurate and fastest sports stats provider."
      />
      <FullWidthMain>
        <EventList
          gameInfo={props.orderedGameInfo}
          gamePbp={props.gamePbp}
          gamePlayers={props.gamePlayers}
        />

        <MainPageContainer>
          <div className="wrapper">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <RowContainer>
                {hasDataLoaded ? (
                  <Suspense
                    fallback={<Spinner width="556.364px" height="481.960px" />}
                  >
                    <PlayerRankingsCard
                      data={[data[0], data[1], data[2]]}
                      rankingTypes={rankingTypes}
                      timeOut={5000}
                      cycling={true}
                    />
                  </Suspense>
                ) : (
                  <PlayerRankingPlaceholderBox>
                    <PlayerRankingsPlaceholderTitle>
                      Player Rankings
                    </PlayerRankingsPlaceholderTitle>
                  </PlayerRankingPlaceholderBox>
                )}
                <Suspense fallback={<div>Loading</div>}>
                  <MemeCard urls={memeUrls} />
                </Suspense>
              </RowContainer>

              <Suspense
                fallback={<Spinner width="1244px" height="463.065px" />}
              >
                <TeamRankingsContainer>
                  <TeamRankingsTitle>NBA Team Rankings</TeamRankingsTitle>
                  {hasDataLoaded ? (
                    <TeamScoreTable leftColHeading={"Rank"} data={data[3]} />
                  ) : (
                    <div style={{ minHeight: "400px" }}></div>
                  )}
                </TeamRankingsContainer>
              </Suspense>
            </div>

            {useWindowSize() < 1400 && games.length > 0 && (
              <Suspense fallback={<Spinner width="100%" height="283.506px" />}>
                <FutureGameListBox>
                  <FutureGameTitle>Upcoming Games</FutureGameTitle>
                  <FutureGameListRow>
                    <FutureGameList games={games} />
                  </FutureGameListRow>
                </FutureGameListBox>
              </Suspense>
            )}

            {useWindowSize() > 1400 && games.length > 0 && (
              <Suspense fallback={<Spinner width="292px" height="300px" />}>
                <FutureGameListBox>
                  <FutureGameTitle>Upcoming Games</FutureGameTitle>
                  <FutureGameList games={games} />
                </FutureGameListBox>{" "}
              </Suspense>
            )}
          </div>
        </MainPageContainer>
      </FullWidthMain>
    </>
  );
};
const mapStateToProps = ({
  firestoreReducer,
  gamesReducer,
  playersReducer,
}) => {
  return {
    orderedGameInfo: firestoreReducer.ordered.gameInfoJson,
    gamePbp: firestoreReducer.ordered.gamePbpJson,
    gamePlayers: firestoreReducer.ordered.gamePlayersJson,
    futureGames: gamesReducer.futureGames.games,
    rankings: playersReducer.rankings.rankings,
  };
};

export default connect(mapStateToProps, {})(GamePageContainer);
