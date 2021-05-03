import React, { useEffect } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { ThemeProvider } from "styled-components";
import { createBrowserHistory } from "history";
import { MainContainerDiv, BodyDiv } from "./app-style";
import { GlobalStyle } from "../globalStyles";
import { theme } from "../Shared/theme";
import ReactGA from "react-ga";
import store from "../store";
import PageNotFound from "../Shared/PageNotFound/PageNotFound";
import rrfConfig from "../store";
import firebase from "firebase/app";
import TermsOfUse from "../Policy/TermsOfUse";
import PrivacyPolicy from "../Policy/PrivacyPolicy";
import Layout from "../Shared/Layout/Layout";
import Footer from "../Shared/Layout/Footer";
import Loadable from "react-loadable";
import Spinner from "../Shared/Spinner/Spinner";
import Routes from "./Routes";
ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);

//Browser histroy config
const browserHistory = createBrowserHistory();
browserHistory.listen((location, action) => {
  ReactGA.pageview(location.pathname + location.search);
});

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const Home = Loadable({
  loader: () => import("../Main/mainPage"),
  loading() {
    return <Spinner />;
  },
});
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

const App = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Routes />
            <MainContainerDiv>
              <Layout>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/games" />}
                  />
                  <Route path="/games" component={Games} />
                  <Route path="/home" component={Home} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route path="/stats" component={Stats} />
                  <Route path="/player/:player" component={Indiv} />
                  <Route path="/team/:team" component={Indiv} />
                  <Route path="/comparison" component={Comparsion} />
                  <Route exact path="/terms-of-use" component={TermsOfUse} />
                  <Route
                    exact
                    path="/privacy-policy"
                    component={PrivacyPolicy}
                  />
                  <Route path="/404" component={PageNotFound} />
                </Switch>
              </Layout>
            </MainContainerDiv>
            <Footer />
          </Router>
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};
export default App;
