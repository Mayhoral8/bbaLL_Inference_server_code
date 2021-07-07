export const plotStats = {
  //[0] names in JSON
  //[1] legend entries
  //[2] Y-axis titles
  //[3] Plot titles
  //[4] bar or scatterline [non-adjusted, adjusted]
  Overall: {
    avg_tot: [
      [["AVG_PTS", "DOWN_AVG", "UP_AVG"]],
      [["Player Avg.", "Down Average", "Up Average"]],
      ["Average", "Total"],
      "Average",
      ["scatterline", "scatterline"],
    ],
    plus_minus: [
      [["AVG_PLUS_MINUS", "DOWN_PLUS_MINUS", "UP_PLUS_MINUS"]],
      [["Plus/Minus", "Down Plus/Minus", "Up Plus/Minus"]],
      ["Plus/Minus"],
      "Plus/Minus",
      ["scatterline", "scatterline"],
    ],
    salary: [
      [["SALARY"]],
      [["Player Avg."]],
      ["Salary"],
      "Salary",
      ["scatterline"],
    ],
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
        ["AVG_FGM", "AVG_FGA"],
        ["AVG_FG_PCT", "DOWN_FG_PCT", "UP_FG_PCT"],
      ],
      [
        ["FGM", "FGA"],
        ["FG%", "Down FG Rating", "Up FG Rating"],
      ],
      ["Field Goals", "Field Goal %"],
      "Field Goals",
      ["bar", "scatterline"],
    ],
    free_throws: [
      [
        ["AVG_FTM", "AVG_FTA"],
        ["AVG_FT_PCT", "DOWN_FT_PCT", "UP_FT_PCT"],
      ],
      [
        ["FTM", "FTA"],
        ["FT%", "Down FT Rating", "Up FT Rating"],
      ],
      ["Free Throws", "Free Throw %"],
      "Free Throws",
      ["bar", "scatterline"],
    ],
    three_points: [
      [
        ["AVG_FG3M", "AVG_FG3A"],
        ["AVG_FG3_PCT", "DOWN_FG3_PCT", "UP_FG3_PCT"],
      ],
      [
        ["FG3M", "FG3A"],
        ["3P%", "Down FG3 Rating", "Up FG3 Rating"],
      ],
      ["3_Points", "3_Points %"],
      "3 Points",
      ["bar", "scatterline"],
    ],
  },
  "Assists & Rebounds": {
    ast: [
      [["AVG_AST", "DOWN_AST", "UP_AST"]],
      [["Avg. Assists", "Down Assits", "Up Assists"]],
      ["Assists"],
      "Assists",
      ["scatterline", "scatterline"],
    ],
    reb: [
      [
        ["AVG_OREB", "AVG_DREB"],
        ["AVG_REB", "DOWN_REB", "UP_REB"],
      ],
      [
        ["Offensive Rebounds", "Defensive Rebounds"],
        ["Adjusted Tot Reb", "Adjusted D. Reb", "Adjusted O. Reb"],
      ],
      ["Rebounds"],
      "Rebounds",
      ["bar", "scatterline"],
    ],
  },
  Defence: {
    stl: [
      [["AVG_STL", "DOWN_STL", "UP_STL"]],
      [["Avg. Steals", "Down Steals", "Up Steals"]],
      ["Steals"],
      "Steals",
      ["scatterline", "scatterline"],
    ],
    blk: [
      [["AVG_BLK", "DOWN_BLK", "UP_BLK"]],
      [["Avg. Blocks", "Down Blocks", "Up Blocks"]],
      ["Blocks"],
      "Blocks",
      ["scatterline", "scatterline"],
    ],
    tov: [
      [["AVG_TOV", "DOWN_TOV", "UP_TOV"]],
      [["Avg. Turnovers", "Down Turnovers", "Up Turnovers"]],
      ["Turnovers"],
      "Turnovers",
      ["scatterline", "scatterline"],
    ],
  },
};

export const colours = [
  ["#0313ff", "#f20000", "#04ff00"],
  ["#00098c", "#990000", "#028a00"],
  // AVERAGE(BLUE), DOWN(GREEN), UP(RED)
  [
    "rgba(50, 59, 255, 0.5)",
    "rgba(134, 226, 213, 1)",
    "rgba(255, 50, 50, 0.5)",
  ],
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
  "FT PCT",
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
