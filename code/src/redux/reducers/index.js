import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import sidebarReducer from "./sidebarReducer";
import sharedReducer from "./sharedReducer";
import storageReducer from './storageReducer';
import gamesReducer from "./gamesReducer";
import authReducer from './authReducer';
import betsReducer from './betsReducer'

export default combineReducers({
  authReducer,
  sharedReducer,
  sidebarReducer,
  firebaseReducer,
  firestoreReducer,
  storageReducer,
  gamesReducer,
  betsReducer
});
