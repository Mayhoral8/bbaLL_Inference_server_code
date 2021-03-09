import jsStats from "js-stats";

export const calcPValue = (
  dataOne,
  dataTwo,
  stat,
  player1,
  player2,
  isTeam,
  print = 1
) => {
  const playerOne = dataOne[stat];
  const playerTwo = dataTwo[stat];

  let betterPlayer;

  if (playerOne["avg"] > playerTwo["avg"]) {
    betterPlayer = player1;
  } else {
    betterPlayer = player2;
  }
  const n1 = isTeam? dataOne.n_matches[0] : dataOne.games_played;
  const n2 = isTeam? dataTwo.n_matches[0] : dataTwo.games_played;

  const w1 = playerOne["std"] ** 2 / n1;
  const w2 = playerTwo["std"] ** 2 / n2;

  const tscore =
    Math.abs(playerOne["avg"] - playerTwo["avg"]) / Math.sqrt(w1 + w2);

  const v = (w1 + w2) ** 2 / (w1 ** 2 / (n1 - 1) + w2 ** 2 / (n2 - 1));
  const t_distribution = new jsStats.TDistribution(v);

  const conf_level =
    t_distribution.cumulativeProbability(Math.abs(tscore)) * 100;

  // if (print === 1) {
  //   console.log(
  //     betterPlayer,
  //     " has better",
  //     stat,
  //     " with ",
  //     conf_level,
  //     " confidence"
  //   );
  // }

  return [betterPlayer, conf_level.toFixed(1)];
};

//****_w is the weight variable. we want to give choice of 0 to 5 of changing the weight of each variable
export const calBetterPlayer = (
  player1,
  year1,
  player2,
  year2,
  points_w = 1,
  assists_w = 1,
  steals_w = 1,
  blocks_w = 1,
  rebounds_w = 1,
  turnover_w = 1
) => {
  const score = 0;
  const stats = {
    Points: points_w,
    Assists: assists_w,
    Steals: steals_w,
    Blocks: blocks_w,
    Rebounds: rebounds_w,
    Turnovers: turnover_w,
  };

  let stat;
  for (stat in stats) {
    const betterPlayer = calcPValue(
      player1,
      year1,
      player2,
      year2,
      stat,
      (print = 0)
    );
    if (betterPlayer[0] == player1) {
      if (stat !== "Turnovers") {
        score += stats[stat] * betterPlayer[1];
      } else {
        score -= stats[stat] * betterPlayer[1];
      }
    } else {
      if (stat !== "Turnovers") {
        score -= stats[stat] * betterPlayer[1];
      } else {
        score += stats[stat] * betterPlayer[1];
      }
    }
  }
  if (score > 0) {
    console.log(player1, "is better player than", player2);
    return player1;
  } else {
    console.log(player2, "is better player than", player1);
    return player2;
  }
};
