//STATS PLOT GENERAL
export const PLOTWIDTHPC = 0.65;
export const PLOTHEIGHTPC = 0.55;
export const PLOTWIDTHMOBILE = 1;
export const PLOTHEIGHTMOBILE = 0.55;
//PLAYER TIMES

export const PLAYERTIME = {
  Regular: [28, 30, 32, 33, 35, 100],
  Playoffs: [28, 32, 34, 36, 38, 100],
};

const PLAYERTIMEONE = 0;
const PLAYERTIMETWO = 1;
const PLAYERTIMETHREE = 2;
const PLAYERTIMEFOUR = 3;
const PLAYERTIMEFIVE = 4;
const PLAYERTIMEMAX = 5;

export const minuteButtonArray = (season) => {
  const constantPlayerTime = PLAYERTIME[season];
  return [
    {
      path: `${constantPlayerTime[PLAYERTIMEONE]}-${constantPlayerTime[PLAYERTIMETWO]}`,
      handleMinutes1: constantPlayerTime[PLAYERTIMEONE] - 0.5,
      handleMinutes2: constantPlayerTime[PLAYERTIMETWO] - 0.5,
      label:
        constantPlayerTime[PLAYERTIMEONE] +
        "-" +
        constantPlayerTime[PLAYERTIMETWO],
    },
    {
      path: `${constantPlayerTime[PLAYERTIMETWO]}-${constantPlayerTime[PLAYERTIMETHREE]}`,
      handleMinutes1: constantPlayerTime[PLAYERTIMETWO] - 0.5,
      handleMinutes2: constantPlayerTime[PLAYERTIMETHREE] - 0.5,
      label:
        constantPlayerTime[PLAYERTIMETWO] +
        "-" +
        constantPlayerTime[PLAYERTIMETHREE],
    },
    {
      path: `${constantPlayerTime[PLAYERTIMETHREE]}-${constantPlayerTime[PLAYERTIMEFOUR]}`,
      handleMinutes1: constantPlayerTime[PLAYERTIMETHREE] - 0.5,
      handleMinutes2: constantPlayerTime[PLAYERTIMEFOUR] - 0.5,
      label:
        constantPlayerTime[PLAYERTIMETHREE] +
        "-" +
        constantPlayerTime[PLAYERTIMEFOUR],
    },
    {
      path: `${constantPlayerTime[PLAYERTIMEFOUR]}-${constantPlayerTime[PLAYERTIMEFIVE]}`,
      handleMinutes1: constantPlayerTime[PLAYERTIMEFOUR] - 0.5,
      handleMinutes2: constantPlayerTime[PLAYERTIMEFIVE] - 0.5,
      label:
        constantPlayerTime[PLAYERTIMEFOUR] +
        "-" +
        constantPlayerTime[PLAYERTIMEFIVE],
    },
    {
      path: `${constantPlayerTime[PLAYERTIMEFIVE]}+`,
      handleMinutes1: constantPlayerTime[PLAYERTIMEFIVE] - 0.5,
      handleMinutes2: constantPlayerTime[PLAYERTIMEMAX] - 0.5,
      label: constantPlayerTime[PLAYERTIMEFIVE] + "+",
    },
  ];
};

//PLAYER PLOT
export const PLOTSTATS = {
  Points: ["avg_PTS", "std_PTS"],
  Rebounds: ["avg_REB", "std_REB"],
  Assists: ["avg_AST", "std_AST"],
  Steals: ["avg_STL", "std_STL"],
  Blocks: ["avg_BLK", "std_BLK"],
  Turnovers: ["avg_TOV", "std_TOV"],
  Three_Points: ["avg_FG3M", "std_FG3M"],
  "+/-": ["avg_PLUS_MINUS", "std_PLUS_MINUS"],
};
export const XAXISTITLE = [
  "Downside Volatility (Standard Deviation among below Avg.)",
  "Possession",
  "Total Salary ($)",
  "Salary ($)",
  "Defensive Rating",
];
export const YAXISTITLE = [
  "Average ",
  "True Shooting %",
  "Winning %",
  "Average +/-",
  "Offensive Rating",
];
export const STATS = {
  BasicTeam: [
    "Points",
    "Rebounds",
    "Assists",
    "Blocks",
    "Steals",
    "Turnovers",
    "Three Points",
    "Plus-Minus",
    "Possession-Vs-True-Shooting-Percentage",
    "Defensive-Vs-Offensive-Rating",
    "Total-Salary-Vs-Winning-Percentage",
  ],

  BasicTeam2: [
    "Points",
    "Rebounds",
    "Assists",
    "Blocks",
    "Steals",
    "Turnovers",
    "Three Points",
    "POSS",
    "TrueShootingPCT",
    "DRtg",
    "ORtg",
    "Win_PCT",
  ],

  BasicTeam2Abbrev: [
    "pts",
    "reb",
    "ast",
    "blk",
    "stl",
    "to",
    "fg3",
    "poss",
    "ts%",
    "drtg",
    "ortg",
    "winning%",
  ],

  BasicPlayer: [
    "Points",
    "Rebounds",
    "Assists",
    "Blocks",
    "Steals",
    "Turnovers",
    "Three Points",
    "Plus-Minus",
    "Fantasy",
    "Possession-Vs-True-Shooting-Percentage",
    "Salary-Vs-Plus-Minus",
  ],

  BasicPlayer2: [
    "Points",
    "Rebounds",
    "Assists",
    "Blocks",
    "Steals",
    "Turnovers",
    "Three Points",
    "Plus_Minus",
    "POSS",
    "TrueShootingPCT",
    "salary",
  ],

  BasicPlayer2Abbrev: [
    "pts",
    "reb",
    "ast",
    "blk",
    "stl",
    "to",
    "3pm",
    "+/-",
    "poss",
    "ts%",
    "salary",
  ],

  Champion: [
    "Points",
    "Rebounds",
    "Assists",
    "Blocks",
    "Steals",
    "Turnovers",
    "Three Points",
    "Possession-Vs-True-Shooting-Percentage",
    "Defensive-Vs-Offensive-Rating",
    "Total-Salary-Vs-Winning-Percentage",
  ],
  MVP: [
    "Points",
    "Rebounds",
    "Assists",
    "Blocks",
    "Steals",
    "Turnovers",
    "Three Points",
    // "+/-",
    "Plus-Minus",
    "Fantasy",
    "Possession-Vs-True-Shooting-Percentage",
    // "Possession Vs True Shooting %",
    "Salary-Vs-Plus-Minus",
    // "Salary Vs +/-",
  ],
};
