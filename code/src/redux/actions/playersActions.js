import { fbFirestore } from "../../App/config";

export const getPlayerRankings = () => {
  return async (dispatch) => {
    try {
      const rankings = await fbFirestore.collection("ranking").get();
      let data = [];

      await rankings.forEach((doc) => {
        const docData = doc.data();
        data.push(docData);
      });
      
      dispatch({
        type: "PlayerRankings",
        payload: {
          rankings: data,
          isLoading: false,
        },
      });
    } catch (e) {
      throw e;
    }
  };
};
