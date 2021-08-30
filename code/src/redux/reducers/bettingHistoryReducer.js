const initialState = {
  bettingHistory: {
    isLoading: true,
  },
};

const bettingHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BettingHistory":
      return { ...state, bettingHistory: action.payload };
    default:
      return state;
  }
};
export default bettingHistoryReducer;
