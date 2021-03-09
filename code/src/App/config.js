import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

const firesbaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firesbaseConfig);

const db = firebase.database();
// if (location.hostname === "localhost") {
//   console.log('RTDB is running locally on port 9000')
//   db.useEmulator("localhost", 9000);
// }

export const fbFirestore = firebase.firestore();
// fix to occasional firestore error - "Could not reach firestore backend"
fbFirestore.settings({ experimentalForceLongPolling: true });
export const fbStorage = firebase.storage();
export const fbRealtimeDB = db;
export default firebase;
