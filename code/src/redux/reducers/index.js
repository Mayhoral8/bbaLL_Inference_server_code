import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import sidebarReducer from "./sidebarReducer";
import sharedReducer from "./sharedReducer";
import storageReducer from './storageReducer';
import gamesReducer from "./gamesReducer";

export default combineReducers({
  sharedReducer: sharedReducer,
  sidebarReducer: sidebarReducer,
  firebaseReducer: firebaseReducer,
  firestoreReducer: firestoreReducer,
  storageReducer: storageReducer,
  gamesReducer: gamesReducer
});
