import React, { useState, lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { FullWidthMain } from "../globalStyles";
import { fbFirestore } from "../App/config";
import EventList from "./eventlist";
import SEO from "../Shared/SEO";
import Spinner from "./spinner";

//TODO : lazy import
import candidates from "JSON/player_candidates_for_comparison.json";

import {
  FutureGameListBox,
  FutureGameTitle,
  PlayerRankingPlaceholderBox,
  PlayerRankingsPlaceholderTitle,
  FutureGameListRow,
  TeamRankingsTitle,
  TeamRankingsContainer,
  PlayerRankingsMatchFacts,
  MainPageContainer,
  BettingButton,
} from "./mainpage-style";

const PlayerRankingsCard = lazy(() => import("./playerRankingsCard"));
const MemeCard = lazy(() => import("./memeCard"));
const TeamScoreTable = lazy(() => import("./TeamScoreTable"));
const FutureGameList = lazy(() => import("./futuregamelist"));
const MatchFact = lazy(() => import("./matchFact"));
const RandomComparison = lazy(() => import("./RandomComparison"));

const GamePageContainer = (props) => {
  const [memeUrls, setMemeUrls] = useState([]);
  const [rankingTypes, setRankingTypes] = useState([]);
  const [games, setGames] = useState([]);
  const [data, setData] = useState([]);
  const [randomSet, setRandomSet] = useState([]);

  function loadRandomPlayers() {
    let selectedForComparison = new Array();

    let data = candidates;
    let randRange = 59;
    let nameObject;
    let index;

    nameObject = Object.values(data)["0"];

    for (index = 0; index < 3; index++) {
      var indexOne = Math.floor(Math.random() * randRange + 0);
      var indexTwo = Math.floor(Math.random() * randRange + 0);
      if (indexOne == indexTwo) {
        indexTwo = Math.floor(Math.random() * randRange + 0);
      }

      let pair = {
        nameOne: nameObject[indexOne],
        nameTwo: nameObject[indexTwo],
      };

      selectedForComparison.push(pair);
    }

    setRandomSet(selectedForComparison);
  }
  useEffect(() => {
    const initialTypes = ["bidaily", "weekly", "seasonal"];
    let rankingTypesArray = [];
    let playerRankings = [];
    initialTypes.forEach((type) => {
      if (
        type in props.playerRankings[0] &&
        Object.keys(props.playerRankings[0][type]).length !== 0
      ) {
        playerRankings.push({ ...props.playerRankings[0][type] });
        rankingTypesArray.push(type);
      }
    });
    playerRankings.push({ ...props.playerRankings[1] });

    setRankingTypes(rankingTypesArray);
    setData(playerRankings);

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
    loadRandomPlayers();
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
              <PlayerRankingsMatchFacts>
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
                {games.length != 0 ? (
                  <Suspense fallback={<Spinner width="100%" height="500px" />}>
                    <MatchFact futureGames={games} />
                  </Suspense>
                ) : (
                  <Suspense fallback={<div>Loading</div>}>
                    <MemeCard urls={memeUrls} />
                  </Suspense>
                )}
              </PlayerRankingsMatchFacts>
              <Suspense fallback={<Spinner width="100%" height="463.065px" />}>
                <TeamRankingsContainer>
                  <RandomComparison
                    nameArray={randomSet}
                    loadRandomPlayers={loadRandomPlayers}
                  />
                  <div style={{ width: "auto", margin: "0px 10px" }}>
                    <TeamRankingsTitle>NBA Team Rankings</TeamRankingsTitle>
                    {hasDataLoaded ? (
                      <TeamScoreTable leftColHeading={"Rank"} data={data[3]} />
                    ) : (
                      <div style={{ minHeight: "400px" }}></div>
                    )}
                  </div>
                </TeamRankingsContainer>
              </Suspense>
            </div>

            <Suspense fallback={<Spinner width="100%" height="283.506px" />}>
              <div className = "futureGameListContainer">
                <FutureGameTitle>Upcoming Games</FutureGameTitle>
                <BettingButton>
                  <Link to="/betting" className="styledButton">
                    Virtual Bet Now!
                  </Link>
                </BettingButton>
                <FutureGameListBox>
                  <FutureGameListRow>
                    <FutureGameList games={games} />
                  </FutureGameListRow>
                </FutureGameListBox>
              </div>
            </Suspense>
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
    playerRankings: playersReducer.playerRankings.rankings,
  };
};

export default connect(mapStateToProps, {})(GamePageContainer);
