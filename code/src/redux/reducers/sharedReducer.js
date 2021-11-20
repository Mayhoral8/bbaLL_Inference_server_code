import { UPDATE_SIZE, CHANGE_YEAR, CHANGE_AVG_TOT } from "../actions/types";
const yearSmall = ["13", "14", "15", "16", "17", "18", "19", "20", "21"];
const yearMed = [
  "12-13",
  "13-14",
  "14-15",
  "15-16",
  "16-17",
  "17-18",
  "18-19",
  "19-20",
  "20-21",
  "21-22",
];
const yearBig = [
  "2012-13",
  "2013-14",
  "2014-15",
  "2015-16",
  "2016-17",
  "2017-18",
  "2018-19",
  "2019-20",
  "2020-21",
  "2021-22",
];
const initialState = {
  isPlay: false,
  isTotal: "total",
  width: window.innerWidth,
  height: window.innerHeight,
  yearId: 8,
  yearNames: [
    "2012-13",
    "2013-14",
    "2014-15",
    "2015-16",
    "2016-17",
    "2017-18",
    "2018-19",
    "2019-20",
    "2020-21",
    "2021-22",
  ],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_AVG_TOT:
      if (action.payload.isTotal !== state.isTotal) {
        return {
          ...state,
          isTotal: action.payload.isTotal,
        };
      }
      return state;
    case UPDATE_SIZE:
      if (action.payload.width < 600) {
        return {
          ...state,
          width: action.payload.width,
          height: action.payload.height,
          yearNames: yearSmall,
        };
      } else if (action.payload.width < 900) {
        return {
          ...state,
          width: action.payload.width,
          height: action.payload.height,
          yearNames: yearMed,
        };
      }
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
        yearNames: yearBig,
      };
    case CHANGE_YEAR:
      return { ...state, yearId: action.payload.yearId, isPlay: false };
    case "STOP_PLAY":
      return {
        ...state,
        isPlay: false,
      };
    case "START_PLAY":
      return {
        ...state,
        isPlay: true,
      };
    case "CHANGE_PLAY":
      return {
        ...state,
        isPlay: !state.isPlay,
      };
    default:
      return state;
  }
};
