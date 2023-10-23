import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { Router } from "react-router-dom";
import { createFirestoreInstance } from "redux-firestore";
import { createBrowserHistory } from "history";
import ReactGA from "react-ga";
import store from "../store";
import rrfConfig from "../store";
import firebase from "firebase/app";
import Routes from './Routes'
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


console.log(store.getState());
const App = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
      
          <Router history={browserHistory}>
            <Routes/>
          </Router>
     
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};
export default App;
