import React from "react";
import Plot from "react-plotly.js";
import { rgba } from "polished";
import { PlotContainer } from "./GameStats-styles";

const StatsBarPlot = ({ info, mirror, y, away }) => {
  // find all objects with key of "Q#"
  const quarterlyInfo = Object.keys(info)
    .filter((el) => el.match(/Q/g))
    .sort();
  // compute sum of all quarters for a particular attr
  const getAttrSum = (attr) => {
    let sum = 0;
    quarterlyInfo.forEach((q) => {
      sum += info[q][away ? "Away" : "Home"][attr];
    });
    return sum;
  };

  // compute ratio of quarterly values
  const quarterlyXRatio = (quarter, team) => {
    let x = [];
    y.forEach((val) => {
      if (/percentage|rate/g.test(val)) {
        const xValue =
          (info[quarter][team][val] / getAttrSum(val)) *
          (info[team][val] / (info.Home[val] + info.Away[val]));
        x.push(xValue);
      } else {
        const xValue =
          info[quarter][team][val] / (info.Home[val] + info.Away[val]);
        x.push(xValue);
      }
    });
    return x;
  };

  // convert over time annotations
  const convertOverTime = (quarter) => {
    const quarterInt = +quarter.replace(/Q/, "");
    if (quarter > "Q4") {
      return `OT${quarterInt - 4}`;
    }
    return quarter;
  };

  // create bar graph
  const createBarGraph = (x, y, name, orientation, color, width, type) => {
    return {
      x,
      y,
      name,
      orientation,
      marker: { color, width },
      type,
    };
  };

  // bar graph data
  const data = [];
  quarterlyInfo.forEach((info) => {
    const quarterInt = +info.replace(/Q/, "");
    const opacity = 1 - 0.05 * quarterlyInfo.length + 0.05 * quarterInt;
    const trace = createBarGraph(
      quarterlyXRatio(info, away ? "Away" : "Home"),
      y,
      info,
      "h",
      rgba("#534a91", opacity),
      1,
      "bar"
    );
    data.push(trace);
  });

  // bar graph layout
  const layout = {
    barmode: "stack",
    showlegend: false,
    xaxis: {
      zeroline: false,
      range: mirror ? [1, 0] : [0, 1],
      dtick: 0.1,
    },
    yaxis: {
      side: mirror && "right",
      showticklabels: false,
    },
    margin: {
      t: 30,
      b: 30,
      l: 10,
      r: 10,
    },
    hovermode: false,
    autosize: true,
  };

  // bar graph config
  const config = {
    responsive: true,
    displayModeBar: false,
    staticPlot: true,
  };

  return (
    <PlotContainer>
      <Plot
        data={data}
        layout={layout}
        config={config}
        style={{ height: "30rem", width: "100%" }}
      />
    </PlotContainer>
  );
};

export default StatsBarPlot;
