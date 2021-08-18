import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

const firesbaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY1,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN1,
  databaseURL:process.env.REACT_APP_FIREBASE_Database_URL1,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID1,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET1,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID1,
  appId: process.env.REACT_APP_FIREBASE_APP_ID1,
  measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENT_ID1
};

export const firebaseInstanceSpigamebet = firebase.initializeApp(firesbaseConfig,'secondary');

const db = firebase.database()
export const fbFirestoreSpigameBet = firebaseInstanceSpigamebet.firestore();
// fbFirestoreSpigameBet.settings({ experimentalForceLongPolling: true });
export const fbStorage = firebase.storage();
export const fbRealtimeDB = db;