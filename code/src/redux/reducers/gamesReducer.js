import { CHANGE_TAB } from "../actions/types";

const initialState = {
  activeTab: "overview"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TAB:
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
};
