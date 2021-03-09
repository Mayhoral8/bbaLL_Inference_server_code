import {
  CHANGE_STAT,
  CHANGE_INDIV_STAT,
  CHANGE_IS_TEAM,
  CHANGE_STAT_CATEGORY,
} from "../actions/types";

const initialState = {
  stat: "Summary",
  indivStat: "Overall",
  statCategory: "Basic",
  isTeam: true,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STAT:
      if (action.payload.stat.includes(" "))
        return { ...state, stat: action.payload.stat.replace(/\s/g, "_") };
      return { ...state, stat: action.payload.stat };
    case CHANGE_INDIV_STAT:
      return { ...state, indivStat: action.payload.indivStat };
    case CHANGE_STAT_CATEGORY:
      return { ...state, statCategory: action.payload.statCategory };
    case CHANGE_IS_TEAM:
      return { ...state, isTeam: action.payload.isTeam };
    default:
      return state;
  }
};
