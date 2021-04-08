import React from "react";
import { useSelector } from "react-redux";
import { ContainerCard } from "../../globalStyles";
import GraphInfo from "Shared/GraphInfo/GraphInfo";
import ScatterLinePlot from "./Components/ScatterLinePlot";
import HomeAwayPlot from "./Components/HomeAwayPlot";
import * as teamColours from "Constants/teamColours";
import BarChart from "./Components/BarChartRacePlot";

const scatterLinePlotKeyExtractionMap = {
  total: { isTotalProp: "Total", statSuffix: "_Total" },
  total_poss: { isTotalProp: "Total_Per_Poss", statSuffix: "_TPP" },
  efficiency: { isTotalProp: "Efficiency", statSuffix: "_Eff" },
  average: { isTotalProp: "Average", statSuffix: "_Avg" },
};

const extractDataForScatterLinePlot = (data, totalProp, statKey) => {
  return {
    isTotalProp: totalProp,
    stats: data.ScatterLinePlot.Regular_Stats[statKey],
    leaderTableStats: data.LeaderTable.Regular_Stats[statKey],
    bestScatterStats: data.BestScatterLinePlot.Regular_Stats[statKey],
    avgScatterStats: data.AvgScatterLinePlot.Regular_Stats[statKey],
  };
};

const LeaderBoardStat = ({ json, statName }) => {
  const makePlot = (plotType) => {
    const yearId = useSelector((state) => state.sharedReducer.yearId);
    const isTeam = useSelector((state) => state.sidebarReducer.isTeam);
    const isTotal = useSelector((state) => state.sharedReducer.isTotal);

    let data = json;
    let leaderTableStats, bestScatterStats, avgScatterStats, stats, isTotalProp;
    let stat = statName === "Plus_Minus" ? "PLUS_MINUS" : statName;

    // TODO: REPETITION needs a futhur cleanup
    switch (plotType) {
      case "BarChartRacePlot":
        const lookUpData = scatterLinePlotKeyExtractionMap[isTotal];
        const plotData = extractDataForScatterLinePlot(
          data,
          lookUpData.isTotalProp,
          stat + lookUpData.statSuffix
        );
        isTotalProp = plotData.isTotalProp;
        stats = plotData.stats;
        leaderTableStats = plotData.leaderTableStats;
        bestScatterStats = plotData.bestScatterStats;
        avgScatterStats = plotData.avgScatterStats;
        break;
      case "HomeAwayPlot":
        stats = data.HomeAwayPlot.Regular_Stats[stat + "_Avg"];
        leaderTableStats = data.LeaderTable.Regular_Stats[stat + "_Avg"];
        bestScatterStats =
          data.BestScatterLinePlot.Regular_Stats[stat + "_Avg"];
        avgScatterStats = data.AvgScatterLinePlot.Regular_Stats[stat + "_Avg"];
      default:
        break;
    }

    /* Get Team Colour for each Player in Leaderboard */
    let teamColourArray = [];
    for (let j = 0; j < leaderTableStats.length; j++) {
      const playerOrTeamColour = (val) =>
        leaderTableStats[j][val].replace(/\s/g, "").toUpperCase();
      if (isTeam) {
        teamColourArray.push(teamColours[playerOrTeamColour("Name")]);
      } else {
        teamColourArray.push(teamColours[playerOrTeamColour("Team")]);
      }
    }

    if (plotType === "BarChartRacePlot") {
      let statsAttr = isTotalProp;

      return (
        <ContainerCard graph style={{ margin: "1rem 0" }}>
          <BarChart
            y={stats[statsAttr]}
            text={stats.Name}
            teamColours={teamColourArray}
            best_curve={bestScatterStats[statsAttr]}
            best_name={
              "Best since 2012-13 <br> (" + bestScatterStats["Name"] + ")"
            }
          />
        </ContainerCard>
      );
    } else {
      return (
        <ContainerCard graph style={{ margin: "1rem 0" }}>
          <GraphInfo
            plotType={
              isTeam ? "leader_team_home_away" : "leader_player_home_away"
            }
          />
          <HomeAwayPlot
            x={stats.Avg_Home}
            y={stats.Avg_Away}
            names={stats.Name}
            xaxis="Home"
            yaxis="Away"
            teamColours={teamColourArray}
          />
        </ContainerCard>
      );
    }
  };
  return (
    <>
      {makePlot("BarChartRacePlot")}
      {makePlot("HomeAwayPlot")}
    </>
  );
};

export default LeaderBoardStat;
