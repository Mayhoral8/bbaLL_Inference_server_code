import { LOGIN } from "./types";
import {
  fbFirestoreSpigameBet,
  firebaseInstanceSpigamebet,
} from "../../App/spigamebetFirebase";

export const checkUserRecordCollectionExists = (user) => {
  return async (dispatch) => {
    try {
      let response = await fbFirestoreSpigameBet
        .collection("userRecords")
        .doc(user.uid)
        .get();
      if (!response.data()) {
        fbFirestoreSpigameBet.collection("userRecords").doc(user.uid).set({
          totalPoints: 0,
          numBettings: 0,
          numWins: 0,
          numMoneyLineWins: 0,
          numMoneyLineBettings: 0,
          numSpreadWins: 0,
          numSpreadBettings: 0,
          numOUWins: 0,
          numOUBettings: 0,
          last10Games: [],
          rank: "-",
          displayName: user.displayName,
          emailAddress: user.email,
          level: 1,
        });
      }
      dispatch({
        type: LOGIN,
        payload: { user, isLoading: false },
      });
      return { requestSuccessful: true };
    } catch (e) {
      throw e;
    }
  };
};

// export const checkLoginStatus = () => {
//   return async (dispatch) => {
//     try {
//       firebaseInstanceSpigamebet.auth().onAuthStateChanged(async (user) => {
//         if (user) {
//           let parsedUser = JSON.parse(localStorage.getItem("User"));
//           dispatch({
//             type: LOGIN,
//             payload: { user: parsedUser, isLoading: false },
//           });
//           return { requestSuccessful: true };
//         } else {
//           dispatch({
//             type: LOGIN,
//             payload: { user: {}, isLoading: false },
//           });
//           return { requestSuccessful: true };
//         }
//       });
//     } catch (e) {
//       throw e;
//     }
//   };
// };

export const logoutAction = () => {
  return async (dispatch) => {
    try {
      await firebaseInstanceSpigamebet.auth().signOut();
      localStorage.setItem("User", JSON.stringify({}));
      dispatch({
        type: LOGIN,
        payload: { user: {}, isLoading: false },
      });
      return { processed: true };
    } catch (e) {
      throw e;
    }
  };
};
