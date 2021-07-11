import React from "react";
import { RoutesContainer } from "./app-style";
import { MainContainerDiv } from "./app-style";
import { GlobalStyle } from "../globalStyles";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import PageNotFound from "../Shared/PageNotFound/PageNotFound";
import TermsOfUse from "../Policy/TermsOfUse";
import PrivacyPolicy from "../Policy/PrivacyPolicy";
import Layout from "../Shared/Layout/Layout";
import Footer from "../Shared/Layout/Footer";
import Login from "../Auth/Login";
import Loadable from "react-loadable";
import Spinner from "../Shared/Spinner/Spinner";
import { compose } from "redux";
import "firebase/auth";

const Games = Loadable({
  loader: () => import("../GameStats/GamePageContainer"),
  loading() {
    return <Spinner />;
  },
});

const Leaderboard = Loadable({
  loader: () => import("../Leaderboard/LeaderPageContainer"),
  loading() {
    return <Spinner />;
  },
});

const Stats = Loadable({
  loader: () => import("../Stats/StatsPageContainer.js"),
  loading() {
    return <Spinner />;
  },
});

const Indiv = Loadable({
  loader: () => import("../Individual/IndivContainer"),
  loading() {
    return <Spinner />;
  },
});

const Comparsion = Loadable({
  loader: () => import("../Comparison/ComparisonPage"),
  loading() {
    return <Spinner />;
  },
});

const Betting = Loadable({
  loader: () => import("../Betting/index"),
  loading() {
    return <Spinner />;
  },
});

const Home = Loadable({
  loader: () => import("../Main/mainPage"),
  loading() {
    return <Spinner />;
  },
});

const ProfilePage = Loadable({
  loader: () => import("../Profilepage/index"),
  loading() {
    return <Spinner />;
  },
});

const ScreenCaptureHomePage = Loadable({
  loader: () => import("../ScreenCapture/homePage/homePage"),
  loading() {
    return <Spinner />;
  },
});

const ScreenCaptureGamesPage = Loadable({
  loader: () => import("../ScreenCapture/gamesPage"),
  loading() {
    return <Spinner />;
  },
});

const ScreenCaptureStatsPage = Loadable({
  loader: () => import("../ScreenCapture/statsPage"),
  loading() {
    return <Spinner />;
  },
});

const Routes = (props) => {

  return (
    <>
      <RoutesContainer>
        <GlobalStyle />
        <Switch>
          <Layout>
            <MainContainerDiv>
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
              <Route
                path="/screen-capture/stats-page"
                component={ScreenCaptureStatsPage}
              />
              <Footer />
            </MainContainerDiv>
          </Layout>
        </Switch>
      </RoutesContainer>
    </>
  );
};

export default compose(
  withRouter
)(Routes);
