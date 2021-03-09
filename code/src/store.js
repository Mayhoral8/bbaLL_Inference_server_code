import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers";
import { getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFireStore } from "redux-firestore";
import fbConfig from "./App/config";
const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//react-redux-firestore config
export const rrfConfig = {
  userProfile: "users",
};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFireStore })),
    reduxFirestore(fbConfig)
  )
);
export default store;
