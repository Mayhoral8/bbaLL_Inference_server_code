import { CHANGE_TAB } from "./types";
import { fbFirestore } from "../../App/config";

export const getFutureGamesInfo = () => {
  return async (dispatch) => {
    try {
      let collection = await fbFirestore.collection("future_game_info").get();
      let data = [];

      await collection.forEach((doc) => {
        const docData = doc.data();
        data.push(docData);
      });

      dispatch({
        type: "FutureGames",
        payload: {
          games: data,
          isLoading: false,
        },
      });
      return { success: true };
    } catch (e) {
      throw e;
    }
  };
};

export const changeGamesTab = (tab) => ({
  type: CHANGE_TAB,
  payload: tab,
});
