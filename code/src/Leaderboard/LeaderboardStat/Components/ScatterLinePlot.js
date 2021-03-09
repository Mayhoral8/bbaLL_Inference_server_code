import React, { useState } from "react";
import Plot from "react-plotly.js";
import GraphInfo from "Shared/GraphInfo/GraphInfo";
import logo from "Assets/images/new-logo-square.png";
import useWindowSize from "Shared/hooks/useWindowSize";
import { PlotDiv, PlotContainerDiv, ScatterGraphToolBar } from "./scatterline-style";
import { BadgeButton, MobileYAxisTitle } from "../../../globalStyles";
import { STATS, GRAPHINFO2ARRAY, MOBILE_SM_BREAKPOINT } from "Constants";
import { GRAPH_COLOR } from "../../../constants";
import { createGlobalStyle } from "styled-components";

const ScatterLinePlot = ({
  x,
  y,
  text,
  xaxis,
  yaxis,
  isTotal,
  stat,
  isTeam,
  teamColours,
  zoom_scale,
  yearId,
  avg_curve,
  avg_name,
  best_curve,
  best_name,
  graphInfo
}) => {

  let scale, setScale;
  let ytimeseriesLen = y[0].length;
  if (ytimeseriesLen < 50) {
    [scale, setScale] = useState(zoom_scale[2]);
  } else {
    [scale, setScale] = useState(zoom_scale[1]);
  }
  const [selectedZoom, setSelectedZoom] = useState('All')
  const [power, setPower] = useState(10);
  const windowSize = useWindowSize();

  // define graph layout variables
  let yAxisTitle, margin, legend, staticPlot, axisFontSize, tickFontSize;
  let
    plotFontSize = 15,
    showlegend = true,
    images = [
      {
        source: logo,
        xref: "paper",
        yref: "paper",
        x: 1,
        y: 0.05,
        sizex: 1,
        sizey: 0.3,
        opacity: 0.1,
        layer: "below",
        xanchor: "right",
        yanchor: "bottom",
      },
    ];

  // control graph layout depending on the browser width
  if (windowSize < MOBILE_SM_BREAKPOINT) {
    axisFontSize = 12;
    tickFontSize = 12;
    yAxisTitle = "";
    margin = {
      t: 30,
      l: 40,
      r: 20,
      b: 50,
    };
    legend = {
      x: 0,
      y: -0.25,
      orientation: "h",
      font: {
        size: plotFontSize,
      },
    };
    staticPlot = true;
  } else {
    axisFontSize = 20;
    tickFontSize = 16;
    yAxisTitle = { text: yaxis.replace(/_/g, " ") };
    margin = {
      t: 30,
      l: 90,
      r: 50,
      b: 50,
    };
    legend = {
      x: 0.5,
      y: -0.2,
      xanchor: "center",
      orientation: "h",
      font: {
        size: plotFontSize,
      },
    };
    staticPlot = false;
  }

  //Plot Data
  const maxX = Math.max.apply(Math, x);
  const minY = Math.min.apply(
    Math,
    y.map((value) => Math.min.apply(Math, value))
  );
  //Get Max Y Value
  const maxY = Math.max.apply(
    Math,
    y.map((value) => Math.max.apply(Math, value))
  ) * 1.05;

  let arrayLinearRange, ticktext;
  let yTrans = [];
  let xTrans = [];
  //If Total
  if (isTotal === "total" && ytimeseriesLen > 50) {
    /* Changing the Y and tick values to power(Y, k) and power(tick,k). */
    arrayLinearRange = [];
    ticktext = [];
    //YTicks
    for (let i = 0; i < maxY;) {
      let ii = Math.pow(i, power);
      ticktext.push(i);
      arrayLinearRange.push(ii);
      if (maxY > 5000) i += 1000;
      else if (maxY > 3000) i += 500;
      else if (maxY > 1500) i += 200;
      else if (maxY > 500) i += 100;
      else if (maxY > 300) i += 50;
      else if (maxY > 100) i += 20;
      else i += 10;
    }

    //Y Value
    for (let i = 0; i < y.length; i++) {
      let xTrans_i = [];
      let yTrans_i = [];
      for (let j = 0; j < y[i].length; j++) {
        yTrans_i.push(Math.pow(y[i][j], power));
        xTrans_i.push(Math.pow(j, power));
      }
      yTrans.push(yTrans_i);
      xTrans.push(xTrans_i);
    }
  } else {
    const imageX = y[0].length / maxX;
    const imageY = +`${isTeam ? 0.05 : 0}` + (y[0][y[0].length - 1] - minY) / (maxY - minY);
    const imageYanchor = "bottom";
    arrayLinearRange = "";
    ticktext = "";
  }

  let y_copy = isTotal === "total" && ytimeseriesLen > 50 ? yTrans : y;
  let traces = [];
  let annotations = [];
  let i, start_ind;

  //TODO:  NEEDS TO BE MOVED TO UTIL FUNCTION
  const range = (start, end) => Array(end - start + 1).fill().map((_, idx) => start + idx);

  let maxlength = 0;
  for (i = 0; i < y_copy.length; i++)
    maxlength = Math.max(maxlength, y_copy[i].length);

  // Compute the slider index range
  if (scale === zoom_scale[0]) {
    let zscale = Number(zoom_scale[0][0]);
    start_ind = Math.floor(maxlength * (1 - 1 / zscale));
  } else if (scale === zoom_scale[1]) {
    let zscale = Number(zoom_scale[1][0]);
    start_ind = Math.floor(maxlength * (1 - 1 / zscale));
  } else {
    start_ind = 0;
  }

  let newMaxY = 0;
  let newMinY = 100000;
  for (i = 0; i < y_copy.length; i++) {
    // Pase the slider index range
    let trace = y_copy[i];
    if (start_ind < trace.length) {
      let x = range(start_ind, trace.length);
      trace = trace.slice(start_ind, trace.length);
      newMinY = Math.min(Math.min.apply(null, trace), newMinY);
      newMaxY = Math.max(Math.max.apply(null, trace), newMaxY);

      // Append the array to traces
      traces.push({
        x: x,
        y: trace,
        type: "scatter",
        name: text[i],
        marker: {
          opacity: 0,
        },
        line: {
          width: 3,
          color: teamColours[i],
        },
        hoverinfo: "name",
      });

      let name = isTeam
        ? text[i].split(" ").slice(-1)[0] //.slice(1).join(" ")
        : text[i].replace(/\s/g, "<br>");

      //if (scale !== "All" || isTotal !== "total" || !isTeam) {
      annotations.push({
        x: x.slice(-1)[0] - 0.75,
        y: trace.slice(-1)[0],
        xref: "x",
        yref: "y",
        font: { color: teamColours[i] },
        text: name, //y[i].slice(-1)[0].toFixed(0).toString(),
        showarrow: false,
        arrowhead: 7,
        ax: 0,
        ay: 0,
      });
    }
  }

  let mobileYaxis;
  switch (isTotal) {
    case "total":
      mobileYaxis = `Total ${stat}`;
    case "total_poss":
      mobileYaxis = `Total ${stat} Per Possession"`;
    case "totol_poss":
      mobileYaxis = `${stat} Efficiency`;
    case "average":
      mobileYaxis = `Avg ${stat}`;
    default:
      mobileYaxis = `Total ${stat}`;
  }

  //Adding best curve among all seasons
  let ybest = [];
  let avg_val = avg_curve;
  if (isTotal === "total" && ytimeseriesLen > 50) {
    for (let j = 0; j < best_curve.length; j++) {
      ybest.push(Math.pow(best_curve[j], power));
    }
    avg_val = Math.pow(avg_val, power);
  } else if (isTotal !== "total") {
    ybest = best_curve;
  }
  let xbest = range(start_ind, best_curve.length);
  ybest = ybest.slice(start_ind, ybest.length);
  newMinY = Math.min(Math.min.apply(null, ybest), newMinY);
  newMaxY = Math.max(Math.max.apply(null, ybest), newMaxY);

  if (yearId >= 1) {
    traces.push({
      x: xbest,
      y: ybest,
      type: "scatter",
      name: best_name,
      marker: {
        opacity: 0,
      },
      line: {
        width: 1.5,
        color: "black",
        dash: "dashdot",
      },
      hoverinfo: "name",
    });

    if (scale !== "All" || isTotal !== "total" || !isTeam) {
      annotations.push({
        x: xbest.slice(-1)[0],
        y: ybest.slice(-1)[0],
        xref: "x",
        yref: "y",
        font: { color: "black" },
        text: best_name,
        showarrow: false,
        arrowhead: 7,
        ax: 0,
        ay: 0,
      });
    }
  }

  let shape = null;
  if (yearId >= 2 && (ytimeseriesLen > 50 || isTotal !== "total")) {
    annotations.push({
      x: (xbest.slice(-1)[0] * 9) / 10,
      y: avg_val,
      xref: "x",
      yref: "y",
      font: { color: "black" },
      text: avg_name,
      showarrow: false,
      arrowhead: 7,
      ax: 0,
      ay: 0,
    });
    shape = [
      {
        type: "line",
        xref: "paper",
        x0: 0,
        y0: avg_val,
        x1: 81,
        y1: avg_val,
        line: {
          color: "gray",
          width: 1,
          dash: "dot",
        },
      },
    ];
  }

  if (isTotal === "total" && y.length < 50) {
  }

  const layouts = {
    showlegend,
    legend,
    margin,
    images,
    autosize: true,
    height: 600,
    font: {
      family: "Roboto Condensed",
    },
    xaxis: {
      //rangeselector: selectorOptions,
      //rangeslider: { autorange: true, thickness: 0.025 },
      fixedrange: true,
      title: {
        text: xaxis,
      },
      tickfont: {
        size: tickFontSize,
      },
      titlefont: {
        size: axisFontSize,
        color: GRAPH_COLOR,
      },
      showgrid: false,
      dtick: 10,
    },
    yaxis: {
      ticktext,
      tickfont: {
        size: tickFontSize,
      },
      titlefont: {
        size: axisFontSize,
        color: GRAPH_COLOR,
      },
      tickvals: arrayLinearRange,
      fixedrange: true,
      title: yAxisTitle,
      showgrid: true,
      tickfont: {
        size: plotFontSize,
      },
    },
    annotations: annotations,
    shapes: shape,
  };

  const config = {
    displayModeBar: false,
    staticPlot: staticPlot,
    responsive: true,
  }

  // grab corresponding graph info
  let graphInfo2;
  STATS.forEach((el, i) => {
    let attr = el;
    if (/\s/.test(attr)) {
      attr = attr.replace(/\s/, '_');
    }
    if (attr === '+/-') {
      attr = 'PLUS_MINUS';
    }
    if (attr === stat) {
      return graphInfo2 = GRAPHINFO2ARRAY.splice(0, 1, "")[i];
    }
  });

  return (
    <PlotContainerDiv>
      <ScatterGraphToolBar>
        <GraphInfo
          nomargin
          plotType={graphInfo}
          plotType2={graphInfo2}
        />
        <div style={{display:'flex'}}>
          {zoom_scale.map((scale, i) => {
            let power;
            if (i === 0) power = 5;
            if (i === 1) power = 10;
            if (i === 2) power = 1;
            return (
              <BadgeButton
                key={i}
                isActive={selectedZoom === zoom_scale[i]}
                onClick={() => {
                  setSelectedZoom(scale);
                  setScale(zoom_scale[i]);
                  setPower(power);
                }}
                plot
              >
                {zoom_scale[i]}
              </BadgeButton>
            )
          })}
        </div>
      </ScatterGraphToolBar>
      <MobileYAxisTitle leaderboard>
        {windowSize < MOBILE_SM_BREAKPOINT ? mobileYaxis : ""}
      </MobileYAxisTitle>
      <PlotDiv>
        <Plot
          useResizeHandler
          data={traces}
          config={config}
          className="scatter-line-plot"
          layout={layouts}
        />
      </PlotDiv>
    </PlotContainerDiv>
  );
};

export default ScatterLinePlot;