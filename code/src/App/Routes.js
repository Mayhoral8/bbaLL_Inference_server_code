import React, { useEffect, lazy, Suspense } from "react";
import { MainContainerDiv } from "./app-style";
import { GlobalStyle } from "../globalStyles";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import PageNotFound from "../Shared/PageNotFound/PageNotFound";
import TermsOfUse from "../Policy/TermsOfUse";
import PrivacyPolicy from "../Policy/PrivacyPolicy";
import Layout from "../Shared/Layout/Layout";
import Footer from "../Shared/Layout/Footer";
import Login from "../Auth/Login";
import Spinner from "../Shared/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import "firebase/auth";
import { currentYear } from "Constants";
import { useFirestoreConnect } from "react-redux-firebase";
import { getFutureGamesInfo } from "../redux/actions/gamesActions";
import { getPlayerRankings } from "../redux/actions/playersActions";


const Games = lazy(() => import("../GameStats/GamePageContainer"));
const Leaderboard = lazy(() => import("../Leaderboard/LeaderPageContainer"));
const Stats = lazy(() => import("../Stats/StatsPageContainer.js"));
const Indiv = lazy(() => import("../Individual/IndivContainer"));
const Comparsion = lazy(() => import("../Comparison/ComparisonPage"));
const Betting = lazy(() => import("../Betting/index"));
const Home = lazy(() => import("../Main/mainPage"));
const ProfilePage = lazy(() => import("../Profilepage/index"));
const ScreenCaptureHomePage = lazy(() =>
  import("../ScreenCapture/homePage/homePage")
);
const ScreenCaptureGamesPage = lazy(() =>
  import("../ScreenCapture/gamePage/gamePage")
);

const Routes = () => {
  const rawData = useSelector((store)=> store)
  const dispatch = useDispatch()
  const {firestoreReducer, gamesReducer, playersReducer} = rawData
  const futureGames = gamesReducer.futureGames
  const playerRankings = playersReducer.playerRankings
  const {gameInfoJson, gamePbpJson, gamePlayersJson} = firestoreReducer.ordered
  
  
  useEffect(() => {
    dispatch(getFutureGamesInfo())
    dispatch(getPlayerRankings())
  }, []);

  //const currentYear = "2021-22";
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
  console.warn = () => {};
  if (
    futureGames.isLoading ||
    playerRankings.isLoading ||
    !gameInfoJson ||
    !gamePbpJson ||
    !gamePlayersJson
  ) {
    return (
      <>
        <GlobalStyle />
        <Layout>
          <MainContainerDiv>
            <Spinner />
            <Footer />
          </MainContainerDiv>
        </Layout>
      </>
    );
  } else {
    return (
      <>
        <GlobalStyle />
        <Switch>
          <Layout>
            <MainContainerDiv>
              <Suspense fallback={<Spinner />}>
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <Route path="/home" component={Home} />
                <Route path="/games" component={Games} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route path="/stats" component={Stats} />
                <Route path="/player/:player" component={Indiv} />
                <Route path="/team/:team" component={Indiv} />
                <Route path="/comparison" component={Comparsion} />
                <Route exact path="/terms-of-use" component={TermsOfUse} />
                <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                <Route path="/404" component={PageNotFound} />
                <Route path="/login" component={Login} />
                <Route path="/betting" component={Betting} />
                <Route path="/profile" component={ProfilePage} />
                <Route
                  path="/screen-capture/home-page"
                  component={ScreenCaptureHomePage}
                />
                <Route
                  path="/screen-capture/games-page"
                  component={ScreenCaptureGamesPage}
                />
              </Suspense>
              <Footer />
            </MainContainerDiv>
          </Layout>
        </Switch>
      </>
    );
  }
};

export default Routes;
