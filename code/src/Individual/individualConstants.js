export const plotStats = {
  //[0] names in JSON
  //[1] legend entries
  //[2] Y-axis titles
  //[3] Plot titles
  //[4] bar or scatterline [non-adjusted, adjusted]
  Overall: {
    avg_tot: [
      [["AVG", "TOT"], ["SORT_AVG"]],
      [["Average", "Total"], ["Average"]],
      ["Average", "Total"],
      "Average/Total Points",
      ["scatterline", "scatterline"],
    ],
    plus_minus: [
      [["PLUS_MINUS"], ["SORT_PLUS_MINUS"]],
      [["Plus/Minus"], ["Plus/Minus"]],
      ["Plus/Minus"],
      "Plus/Minus",
      ["scatterline", "scatterline"],
    ],
    salary: [[["SALARY"]], [["Salary"]], ["Salary"], "Salary", ["scatterline"]],
    poss: [
      [["POSS"]],
      [["Possessions"]],
      ["Possessions"],
      "Possessions",
      ["scatterline"],
    ],
    wpct: [
      [["W_PCT"]],
      [["Win Percentage"]],
      ["Win Percentage"],
      "Win Percentage",
      ["scatterline"],
    ],
  },
  Shots: {
    field_goals: [
      [
        ["FGM", "FGA"],
        ["FG_PCT", "SORT_FG_PCT"],
      ],
      [
        ["FGM", "FGA"],
        ["FG%", "Adjusted FG Rating"],
      ],
      ["Field Goals", "Field Goal %"],
      "Field Goals",
      ["bar", "scatterline"],
    ],
    free_throws: [
      [
        ["FTM", "FTA"],
        ["FT_PCT", "SORT_FT_PCT"],
      ],
      [
        ["FTM", "FTA"],
        ["FT%", "Adjusted FT Rating"],
      ],
      ["Free Throws", "Free Throw %"],
      "Free Throws",
      ["bar", "scatterline"],
    ],
    three_points: [
      [
        ["FG3M", "FG3A"],
        ["FG3_PCT", "SORT_FG3_PCT"],
      ],
      [
        ["3PM", "3PA"],
        ["3P%", "Adjusted 3P Rating"],
      ],
      ["3-Points", "3-Points %"],
      "3 Points",
      ["bar", "scatterline"],
    ],
  },
  "Assists & Rebounds": {
    ast: [
      [["AST"], ["SORT_AST"]],
      [["Assists"], ["Adjusted Assists"]],
      ["Assists"],
      "Assists",
      ["scatterline", "scatterline"],
    ],
    reb: [
      [
        ["OREB", "DREB"],
        ["SORT_REB", "SORT_DREB", "SORT_OREB"],
      ],
      [
        ["O. Rebounds", "D. Rebounds"],
        ["Adjusted Tot Reb", "Adjusted D. Reb", "Adjusted O. Reb"],
      ],
      ["Rebounds"],
      "Rebounds",
      ["bar", "scatterline"],
    ],
  },
  Defence: {
    stl: [
      [["STL"], ["SORT_STL"]],
      [["Steals"], ["Adjusted Steals"]],
      ["Steals"],
      "Steals",
      ["scatterline", "scatterline"],
    ],
    blk: [
      [["BLK"], ["SORT_BLK"]],
      [["Blocks"], ["Adjusted Blocks"]],
      ["Blocks"],
      "Blocks",
      ["scatterline", "scatterline"],
    ],
    tov: [
      [["TOV"], ["SORT_TOV"]],
      [["Turnovers"], ["Adjusted Turnovers"]],
      ["Turnovers"],
      "Turnovers",
      ["scatterline", "scatterline"],
    ],
  },
};

export const colours = [
  ["#0313ff", "#f20000", "#04ff00"],
  ["#00098c", "#990000", "#028a00"],
  //["#00098c", "#990000"],
  ["rgba(50, 59, 255, 0.5)", "rgba(255, 50, 50, 0.5)"],
];
export const maxNumbers = {
  // // Per Season
  // assists: 1164, //John Stockton
  // total_rebounds: 1530, //Dennis Rodman
  // steals: 301, //Alvin Robertson
  // blocks: 456, //Mark Eaton
  // //Full Career
  // assists: 15806 / 19, //John Stockton
  // total_rebounds: 17834 / 21, //Moses Malone
  // steals: 3265 / 19, //John Stockton
  // blocks: 3830 / 18, //Hakeem Olajuwon
  //Career stats per game
  assists: 11.19316, //Magic Johnson
  total_rebounds: 13.83639, //Andre Drummond
  steals: 2.71117, //Alvin Robertson
  blocks: 3.50171, //Mark Eaton
};
export const maxTeamNumbers = {
  //Career stats per game
  assists: 30.37805, //GSW 2016-2017
  total_rebounds: 51.69863, //Milwaukee Bucks 2019-2020
  steals: 12.84146, //Seattle SuperSonics 1993-1994
  blocks: 8.36585, //Denver Nuggets 1993-1994
};
export const tableStats = [
  "points",
  "assists",
  "total_rebounds",
  "blocks",
  "steals",
  "three_points",
  "turnovers",
];
export const tableTeamStats = [
  "points",
  "assists",
  "total_rebounds",
  "blocks",
  "steals",
  "three_point_field_goals",
  "turnovers",
];
export const radarStatNames = [
  "TS PCT",
  "FG3 PCT",
  "FT OCT",
  "AST",
  "REB",
  "BLK",
  "STL",
  "TS PCT",
];
export const radarStats = [
  "true_shooting_percentage",
  "three_point_percentage",
  "free_throw_percentage",
  "assists",
  "total_rebounds",
  "blocks",
  "steals",
  "true_shooting_percentage",
];

export const radarTeamStatNames = [
  "FG2 PCT",
  "FG3 PCT",
  "FT OCT",
  "AST",
  "REB",
  "BLK",
  "STL",
  "FG2 PCT",
];
export const radarTeamStats = [
  "two_point_field_goal_percentage",
  "three_point_field_goal_percentage",
  "free_throw_percentage",
  "assists",
  "total_rebounds",
  "blocks",
  "steals",
  "two_point_field_goal_percentage",
];
export const careerTableStatNames = [
  "PTS",
  "AST",
  "REB",
  "BLK",
  "STL",
  "3PT",
  "TOV",
];

export const careerTableYearLength = 50;
export const INDIVRADARWIDTHPC = 0.3;
export const INDIVRADARHEIGHTPC = 0.2;
export const TEAMINDIVIDUALYEARSELECTSIZE = 5;
