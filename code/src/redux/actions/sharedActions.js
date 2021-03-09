import { UPDATE_SIZE, CHANGE_YEAR, CHANGE_AVG_TOT } from "./types";
export const updateSize = (size) => ({
  type: UPDATE_SIZE,
  payload: size,
});
export const changeYear = (year) => ({
  type: CHANGE_YEAR,
  payload: year,
});
export const changeAvgTot = (isTotal) => ({
  type: CHANGE_AVG_TOT,
  payload: isTotal,
});
