import React from "react";
import { useSelector } from "react-redux";
import SummaryBarPlot from "./Components/SummaryBarPlot";
import GraphInfo from "Shared/GraphInfo/GraphInfo";
import { Argsort } from "Shared/Functions/Argsort";
import { LeaderboardSummaryPlotDiv } from "./summary-style";
import { ContainerCard, GraphTitle } from "../../globalStyles";
import { STATS, GRAPHINFO } from "Constants";
import * as teamColours from "Constants/teamColours";

const Summary = ({ json }) => {
  // redux state
  const isTotal = useSelector(state => state.sharedReducer.isTotal);
  const isTeam = useSelector(state => state.sidebarReducer.isTeam);

  const stats = STATS.filter((stat) => !["Overall"].includes(stat));

  // query fb data
  let data = json["LeaderTable"]["Regular_Stats"];

  const summaryBarPlots = stats.map((stat, i) => {
    let stat_key = stat === "Plus Minus" ? "PLUS_MINUS" : stat;
    if (isTeam && ("Plus Minus" === stat || "Fantasy" === stat)) {
      return;
    }

    let statPrime = stat_key.replace(/\s/g, "_");
    let featName = "Average";
    let title = featName;
    let graphInfo2;

    switch (isTotal) {
      case 'total':
        statPrime = statPrime + "_Total";
        featName = "Total";
        title = "Total " + stat;
        break;
      case 'average':
        statPrime = statPrime + "_Avg";
        featName = "Average";
        title = "Average " + stat;
        break;
      case "total_poss":
        statPrime = statPrime + "_TPP";
        featName = "Total_Per_Poss";
        title = "Total " + stat + " Per Poss";
        break;
      case "efficiency":
        statPrime = statPrime + "_Eff";
        featName = "Efficiency";
        title = stat + " Efficiency";
        break;
      default:
        break;
    }

    let playerNames = [];
    let scores = [];
    let teamColourArray = [];

    for (let i = 0; i < data[statPrime].length; i++) {
      playerNames.push(data[statPrime][i]["Name"]);
      const playerOrTeamColour = val => data[statPrime][i][val].replace(/\s/g, "").toUpperCase();

      if (isTeam) {
        teamColourArray.push(
          teamColours[playerOrTeamColour("Name")]
        );
      } else {
        teamColourArray.push(
          teamColours[playerOrTeamColour("Team")]
        );
      }
      scores.push(data[statPrime][i][featName]);
    }

    // Unfortunately total per possession is not sorted in the backend,
    // we need to re-sort the total per possession.
    if (isTotal === "total_poss" || isTotal === "efficiency") {
      let sorted_ind = Argsort(scores).reverse();
      let sorted_scores = [];
      let sorted_names = [];
      let sorted_colours = [];
      sorted_ind.map((indj, i = 0) => {
        sorted_scores.push(scores[indj]);
        sorted_names.push(playerNames[indj]);
        sorted_colours.push(teamColourArray[indj]);
      });
      scores = sorted_scores;
      playerNames = sorted_names;
      teamColourArray = sorted_colours;
      graphInfo2 = new Array(7).fill("Total/Possession").flat();
    }

    return (
      <ContainerCard key={statPrime} graph style={{ margin: "0" }}>
        {/* <GraphInfo
          plotType={GRAPHINFO[i]}
          plotType2={graphInfo2 && graphInfo2[i]}
        />
        <GraphTitle>{title}</GraphTitle>
        <SummaryBarPlot
          x={playerNames}
          y={scores}
          xlabel={"Player"}
          ylabel={stat}
          teamColourArray={teamColourArray}
          isTeam={isTeam}
          isTotal={isTotal}
        /> */}
      </ContainerCard>
    );
  });

  return (
    <LeaderboardSummaryPlotDiv>{summaryBarPlots}</LeaderboardSummaryPlotDiv>
  );
};

export default Summary;