import * as STATSCONSTANTS from "./statsConstants";
import * as TEAMCOLOURS from "../constants/teamColours";
import { getKeyByValue } from "../Shared/Functions/GetKeyByValue";
import { ABB2TEAM } from "../constants";

const cleanTeam = (name, isTeam) => {
  return name[isTeam ? "name" : "team"].replace(/\s/g, "").toUpperCase();
};

const getPlotPointInfo = (category, entry, isTeam, stat) => {
  let name, colour, xpt, ypt, xlabel, ylabel;

  if (category === "Possession-Vs-True-Shooting-Percentage") {
    if (entry[1]["POSS"]["avg"] !== 0) {
      name = entry[0];
      colour = TEAMCOLOURS[cleanTeam(entry[1], isTeam)];
      xpt = entry[1]["POSS"]["avg"];
      ypt = entry[1]["TrueShootingPCT"]["avg"];
      xlabel = STATSCONSTANTS.XAXISTITLE[1];
      ylabel = STATSCONSTANTS.YAXISTITLE[1];
    }
  } else if (category === "Total-Salary-Vs-Winning-Percentage") {
    let totalSalary = entry[1]["Salary"][0];
    if (
      entry[1]["Win_PCT"]["avg"] > 0 &&
      totalSalary !== "NaN" &&
      totalSalary > 0
    ) {
      name = entry[0];
      colour = TEAMCOLOURS[cleanTeam(entry[1], isTeam)];
      xpt = totalSalary;
      ypt = entry[1]["Win_PCT"]["avg"];
      xlabel = STATSCONSTANTS.XAXISTITLE[2];
      ylabel = STATSCONSTANTS.YAXISTITLE[2];
    }
  } else if (category === "Defensive-Vs-Offensive-Rating") {
    if (entry[1]["ORtg"]["avg"] > 0 && entry[1]["DRtg"]["avg"] > 0) {
      name = entry[0];
      colour = TEAMCOLOURS[cleanTeam(entry[1], isTeam)];
      xpt = entry[1]["DRtg"]["avg"];
      ypt = entry[1]["ORtg"]["avg"];
      xlabel = STATSCONSTANTS.XAXISTITLE[4];
      ylabel = STATSCONSTANTS.YAXISTITLE[4];
    }
  } else if (category === "Salary-Vs-Plus-Minus") {
    if (
      entry[1]["salary"][0] !== null &&
      entry[1]["TrueShootingPCT"][0] !== null &&
      entry[1]["salary"][0] !== -1
    ) {
      name = entry[0];
      colour = TEAMCOLOURS[cleanTeam(entry[1], isTeam)];
      xpt = parseInt(entry[1]["salary"][0].replace('$', ''));
      ypt = entry[1]["TrueShootingPCT"]["avg"];
      xlabel = STATSCONSTANTS.XAXISTITLE[3];
      ylabel = STATSCONSTANTS.YAXISTITLE[3];
    }
  } else if (category === "Plus-Minus") {
    if (entry[1]["Plus_Minus"]["dstd"] !== 0) {
      name = entry[0];
      colour = TEAMCOLOURS[cleanTeam(entry[1], isTeam)];
      xpt = entry[1]["Plus_Minus"]["avg"];
      ypt = entry[1]["Plus_Minus"]["dstd"];
      xlabel = STATSCONSTANTS.XAXISTITLE[0];
      ylabel = STATSCONSTANTS.YAXISTITLE[0] + stat;
    }
  } else {
    if (entry[1][category]["std"] !== 0) {
      name = entry[0];
      colour = TEAMCOLOURS[cleanTeam(entry[1], isTeam)];
      ypt = entry[1][category]["avg"];
      xlabel = STATSCONSTANTS.XAXISTITLE[0];
      ylabel = STATSCONSTANTS.YAXISTITLE[0] + stat;
      if (
        category === "Assists" ||
        category === "Rebounds" ||
        category === "Blocks" ||
        category === "Steals" ||
        category === "Turnovers"
      ) {
        xlabel = "Volatility (Standard Deviation)";
        xpt = entry[1][category]["std"];
      } else {
        xlabel = STATSCONSTANTS.XAXISTITLE[0];
        xpt = entry[1][category]["dstd"];
      }
    }
  }
  return [name, colour, xpt, ypt, xlabel, ylabel];
};

export const preprocessBasicData = (
  statData,
  category,
  stat,
  isTeam,
  playerMinutes
) => {
  let names = [],
    statY = [],
    statX = [],
    textFontSize = [],
    colours = [];
  let xlabels = [];
  let ylabels = [];
  Object.entries(statData).forEach((entry) => {
    if (
      isTeam ||
      (entry[1].minutes[0] >= playerMinutes[0] &&
        entry[1].minutes[0] < playerMinutes[1])
    ) {
      let [name, colour, xpt, ypt, xlabel, ylabel] = getPlotPointInfo(
        category,
        entry,
        isTeam,
        stat
      );

      if (
        ![name, colour, xpt, ypt, xlabel, ylabel].includes(null) &&
        ![name, colour, xpt, ypt, xlabel, ylabel].includes(undefined)
      ) {
        names.push(name);
        colours.push(colour);
        statX.push(xpt);
        statY.push(ypt);
        xlabels.push(xlabel);
        ylabels.push(ylabel);
        if (!isTeam) {
          textFontSize.push(entry[1].minutes[0] - 20);
        }
      }
    }
  });
  let xlabel = xlabels[xlabels.length - 1];
  let ylabel = ylabels[ylabels.length - 1];
  return [statX, statY, names, colours, textFontSize, xlabel, ylabel];
};

export const preprocessChampNmvpData = (statData, category, stat, isTeam) => {
  let names = [],
    statY = [],
    statX = [],
    textFontSize = [],
    colours = [];
  let xlabels = [STATSCONSTANTS.XAXISTITLE[0]];
  let ylabels = [STATSCONSTANTS.YAXISTITLE[0] + stat];

  statData.forEach((entry) => {

    let [name, colour, xpt, ypt, xlabel, ylabel] = getPlotPointInfo(
      category,
      isTeam ? [entry.year + " " + getKeyByValue(ABB2TEAM, entry.name), entry] : [entry.year + " " + entry.name, entry],
      isTeam,
      stat
    );

    if (
      ![name, colour, xpt, ypt, xlabel, ylabel].includes(null) &&
      ![name, colour, xpt, ypt, xlabel, ylabel].includes(undefined)
    ) {
      names.push(name.replace(/\,/g, "."));
      colours.push(colour);
      statX.push(xpt);
      statY.push(ypt);
      xlabels.push(xlabel);
      ylabels.push(ylabel);

      if (!isTeam) {
        textFontSize.push(Math.sqrt(entry.minutes[0] * 4));
      }
    }
  });

  let xlabel = xlabels[xlabels.length - 1];
  let ylabel = ylabels[ylabels.length - 1];
  return [statX, statY, names, colours, textFontSize, xlabel, ylabel];
};
