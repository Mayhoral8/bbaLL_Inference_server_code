import { CHANGE_TAB } from "../actions/types";

const initialState = {
  activeTab: "overview",
  futureGames: { isLoading: true, futureGames: [] },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TAB:
      return { ...state, activeTab: action.payload };
    case "FutureGames":
      return { ...state, futureGames: action.payload };
    default:
      return state;
  }
};
