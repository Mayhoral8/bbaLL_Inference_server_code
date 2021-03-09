import React from "react";
import Plot from "react-plotly.js";
import useWindowSize from "Shared/hooks/useWindowSize";
import logo from "Assets/images/new-logo-square.png";
import { MOBILE_SM_BREAKPOINT } from "Constants";

const SummaryBarPlot = ({ x, y, teamColourArray, isTotal }) => {
  const windowSize = useWindowSize();

  let textArray = [];
  for (let i = 0; i < y.length; i += 1) {
    let y_i = y[i];

    if (y_i.toString().includes(".")) {
      if (isTotal === "total_poss" || isTotal === "efficiency") {
        textArray.push(y[i].toFixed(3).toString());
      } else {
        textArray.push(y[i].toFixed(1).toString());
      }
    } else {
      textArray.push(y[i].toString());
    }
  }
  let vmin = Math.min.apply(null, y) * 0.75;
  let vmax = Math.max.apply(null, y) * 1.1;

  const trace1 = {
    x: x,
    y: y,
    type: "bar",
    name: "Primary Product",
    text: textArray, //y.map(String),
    textposition: "outside",
    marker: {
      color: teamColourArray,
      opacity: 0.7,
    },
  };

  const data = [trace1];
  let
    margin,
    tickangle;

  if (windowSize < MOBILE_SM_BREAKPOINT) {
    margin = {
      t: 10,
      l: 40,
      r: 0,
      b: 200,
    };
    tickangle = 90;
  } else {
    margin = {
      t: 10,
      l: 50,
      r: 50,
      b: 150,
    };
    tickangle = "auto";
  }

  const images = [{
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
  }];

  const layout = {
    barmode: "group",
    autosize: true,
    margin,
    font: {
      family: "Roboto Condensed",
    },
    xaxis: {
      tickfont: {
        size: 14,
      },
      tickangle,
    },
    yaxis: {
      tickfont: {
        size: 14,
      },
      range: [vmin, vmax],
    },
    images: images,
  };

  const config = {
    staticPlot: true,
  };

  return (
    <Plot
      useResizeHandler
      className="summary-bar-graph"
      data={data}
      layout={layout}
      config={config}
    />
  );
};

export default SummaryBarPlot;