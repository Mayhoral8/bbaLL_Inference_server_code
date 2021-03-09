import {
  CHANGE_STAT,
  CHANGE_INDIV_STAT,
  CHANGE_IS_TEAM,
  CHANGE_STAT_CATEGORY,
} from "./types";

export const changeStat = (stat) => ({
  type: CHANGE_STAT,
  payload: stat,
});
export const changeIndivStat = (indivStat) => ({
  type: CHANGE_INDIV_STAT,
  payload: indivStat,
});
export const changeStatCategory = (statCategory) => ({
  type: CHANGE_STAT_CATEGORY,
  payload: statCategory,
});
export const changeIsTeam = (isTeam) => ({
  type: CHANGE_IS_TEAM,
  payload: isTeam,
});