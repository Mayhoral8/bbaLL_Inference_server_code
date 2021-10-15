import React from "react";
import Plot from "react-plotly.js";
import logo from "Assets/images/new-logo-square.png";
import { GraphTitle } from "../../globalStyles";
import { BarGraphDiv, GraphInstruction } from "../stats-style";
import useWindowSize from "../../Shared/hooks/useWindowSize";

const StatsBar = ({ x, y, teamColours, yAxisTitle, barPlotHeight }) => {
  console.log(
    "x: ",
    x,
    "y: ",
    y,
    "teamColour: ",
    teamColours,
    "yAxisTitle: ",
    yAxisTitle
  );
  const windowSize = useWindowSize();
  const breakpoint = 600;
  const medBreakpoint = 768;
  const lgBreakpoint = 1024;

  const images = [
    {
      source: logo,
      xref: "paper",
      yref: "paper",
      x: 1,
      y: 0.98,
      sizex: 1,
      sizey: 0.25,
      opacity: 0.1,
      layer: "below",
      xanchor: "right",
      yanchor: "top",
    },
  ];

  let axisFontSize,
    tickFontSize,
    margin,
    titleFont,
    tickAngle,
    plotWidth,
    height,
    marginBottom;

  // margin bottom depending on length of x-axis data
  x.forEach((name) => {
    const nameWithYear = /\d{4}/;
    if (nameWithYear.test(name)) {
      marginBottom = 200;
    } else {
      marginBottom = 150;
    }
  });

  if (windowSize < breakpoint) {
    height = "auto";
  } else {
    height = "";
  }

  if (windowSize <= medBreakpoint) {
    axisFontSize = 12;
    tickFontSize = 12;
    titleFont = {
      size: 12,
    };
    margin = {
      l: 40,
      r: 110,
      b: marginBottom,
      t: 10,
    };
    tickAngle = 45;
    plotWidth = 600;
  } else if (windowSize <= lgBreakpoint) {
    tickAngle = 90;
    margin = {
      l: 30,
      r: 30,
      b: 180,
      t: 50,
    };
  } else {
    axisFontSize = 20;
    tickFontSize = 16;
    tickAngle = 35;
    titleFont = {
      size: 18,
    };
    margin = {
      l: 50,
      r: 100,
      b: 150,
      t: 10,
    };
  }

  // SORT
  var sorted_index = [];
  for (var i in y) {
    let element = parseFloat(y[i].toString().replace("$", "").replace(",", ""));
    sorted_index.push([element, i]);
  }
  sorted_index.sort(function (left, right) {
    return left[0] > right[0] ? -1 : 1;
  });
  let indexes = [],
    sorted_x = [],
    sorted_y = [],
    sorted_teamColours = [];
  for (var j in sorted_index) {
    sorted_y.push(y[sorted_index[j][1]]);
    indexes.push(sorted_index[j][1]);
    sorted_x.push(x[sorted_index[j][1]]);
    sorted_teamColours.push(teamColours[sorted_index[j][1]]);
  }

  let textArray = [];
  for (let i = 0; i < sorted_y.length; i += 1) {
    let y_i = sorted_y[i];
    if (y_i.toString().includes(".")) {
      textArray.push(sorted_y[i].toFixed(1).toString());
    } else {
      textArray.push(sorted_y[i].toString());
    }
  }
  let vmin = Math.min.apply(null, y) * 0.75;
  let vmax = Math.max.apply(null, y) * 1.1;
  const trace1 = {
    x: sorted_x,
    y: sorted_y,
    type: "bar",
    name: "Primary Product",
    text: textArray, //y.map(String),
    textposition: "outside",
    marker: {
      color: sorted_teamColours,
      opacity: 0.7,
    },
  };
  const data = [trace1];
  const layout = {
    hovermode: "x unified",
    barmode: "group",
    //autosize: true,
    width: plotWidth,
    height: height,
    margin,
    images,
    font: {
      family: "Roboto Condensed",
    },
    xaxis: {
      tickfont: {
        size: tickFontSize,
      },
      tickangle: tickAngle,
    },
    yaxis: {
      tickfont: {
        size: tickFontSize,
      },
      range: [vmin, vmax],
    },
  };
  const config = {
    staticPlot: true,
  };

  return (
    <BarGraphDiv>
      <GraphTitle>{yAxisTitle}</GraphTitle>
      <Plot
        className="plot"
        useResizeHandler
        data={data}
        layout={layout}
        config={config}
      />
      <GraphInstruction className="instruction">
        <span className="scroll-txt">scroll to view</span>
        <i className="fas fa-long-arrow-alt-right arrow"></i>
      </GraphInstruction>
    </BarGraphDiv>
  );
};

export default StatsBar;
