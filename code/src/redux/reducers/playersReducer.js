const initialState = {
  playerRankings: {
    isLoading: true,
  },
};

export const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PlayerRankings":
      return { ...state, playerRankings: action.payload };
    default:
      return state;
  }
};

export default playersReducer;
