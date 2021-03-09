import * as teamColours from "Constants/teamColours";
import * as teamColours2 from "Constants/teamColours2";
import { getMonthName } from "./GetMonthName";

// class names for top values
export const classNameForTopValues = (items, attr, n, detail) => {
  let topElements;
  // define top elements
  if (n > items.length) {
    topElement = false;
  } else {
    topElements = items
      .slice()
      .sort((a, b) => b[attr] - a[attr])
      .slice(0, n);
  }

  // check for number of occurrences
  const numOccurrences0 = items.filter(
    (item) => item[attr] === topElements[0][attr]
  ).length;
  const numOccurrencesNminus1 = items.filter(
    (item) => item[attr] === topElements[n - 1][attr]
  ).length;

  // Bound checks
  if (
    n === 2 &&
    topElements[n - 2]["player_id"] === topElements[n - 1]["player_id"]
  ) {
    return "";
  }

  if (
    (topElements[0]["player_id"] === detail["player_id"] &&
      numOccurrences0 === 1) ||
    (topElements[n - 1]["player_id"] === detail["player_id"] &&
      numOccurrences0 === 1 &&
      numOccurrencesNminus1 === 1)
  ) {
    return "top-value";
  }

  return "";
};

// TABLE HEADINGS CLASSNAME
export const getClassNameFor = (name, sortConfig) => {
  if (!sortConfig) {
    return "";
  }
  return sortConfig.key === name ? sortConfig.direction : "";
};

// CONVERT NUMBER TO TIME MM:SS
export const numToMinSec = (minutes) => {
  const sign = minutes < 0 ? "-" : "";
  const min = Math.floor(Math.abs(minutes));
  const sec = Math.floor((Math.abs(minutes) * 60) % 60);
  return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
};

// AVOID TEAM COLOURS
export const avoidColourSets = (home, away) => {
  // These are list of colours that are hard to distinguish among 30 team colours
  const bluishColourSet = [
    "CHARLOTTEHORNETS",
    "DALLASMAVERICKS",
    "DENVERNUGGETS",
    "GOLDENSTATEWARRIORS",
    "INDIANAPACERS",
    "MEMPHISGRIZZLIES",
    "NEWYORKKNICKS",
    "OKLAHOMACITYTHUNDER",
    "ORLANDOMAGIC",
    "SACRAMENTOKINGS",
    "MINNESOTATIMBERWOLVES",
    "WASHINGTONWIZARDS"
  ];
  const redishColourSet = [
    "ATLANTAHAWKS",
    "CHICAGOBULLS",
    "CLEVELANDCAVALIERS",
    "DETROITPISTONS",
    "HOUSTONROCKETS",
    "MIAMIHEAT",
    "PHILADELPHIA76ERS",
    "PORTLANDTRAILBLAZERS",
    "TORONTORAPTORS",
    "LOSANGELESCLIPPERS",
  ];
  const blackColourSet = ["BROOKLYNNETS", "UTAHJAZZ", "SANANTONIOSPURS"];
  const greenColourSet = ["BOSTONCELTICS", "MILWAUKEEBUCKS"];
  const yellowColourSet = ["LOSANGELESLAKERS", "NEWORLEANSPELICANS"];

  const avoidSets = [
    bluishColourSet,
    redishColourSet,
    blackColourSet,
    greenColourSet,
    yellowColourSet,
  ];

  let colourOne;
  let colourTwo;
  for (let colourSet of avoidSets) {
    if (colourSet.includes(home) && colourSet.includes(away)) {
      colourOne = teamColours[home];
      colourTwo = teamColours2[away];
      break;
    } else {
      colourOne = teamColours[home];
      colourTwo = teamColours[away];
    }
  }
  return { colourOne, colourTwo };
};

export const getDateFromGameCode = (game) => {
  const gameCode = game.id;
  return getMonthName(gameCode.substring(4, 6)) + ' ' + gameCode.substring(6, 8);
};