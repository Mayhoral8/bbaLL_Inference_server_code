import { CHANGE_TAB } from "./types";

export const changeGamesTab = (tab) => ({
  type: CHANGE_TAB,
  payload: tab,
});