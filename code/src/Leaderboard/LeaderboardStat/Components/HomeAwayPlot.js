import React from "react";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useWindowSize from "Shared/hooks/useWindowSize";
import logo from "Assets/images/new-logo-square.png";
import { HomeAwayGraphDiv, HomeAwayYAxis } from "./homeawayplot-style";
import { ABB2TEAM, GRAPH_COLOR, MOBILE_SM_BREAKPOINT } from 'Constants';

const HomeAwayPlot = ({ x, y, names, xaxis, yaxis, teamColours }) => {
  const windowSize = useWindowSize();
  const history = useHistory();
  const isTeam = useSelector(state => state.sidebarReducer.isTeam);

  // define graph layout variables
  let data, margin, yAxisTitle, axisFontSize, tickFontSize;
  let markerFontSize = 16;
  const graphDashColor = "#534a91";


  const minOrMaxRange = (range, dividend) => {
    if (range === 'min') {
      return (Math.min(
        Math.min.apply(Math, x) - (Math.max.apply(Math, x) - Math.min.apply(Math, x)) / dividend,
        Math.min.apply(Math, y) - (Math.max.apply(Math, y) - Math.min.apply(Math, y)) / dividend
      ))
    }

    return (Math.max(
      Math.max.apply(Math, x) + (Math.max.apply(Math, x) - Math.min.apply(Math, x)) / dividend,
      Math.max.apply(Math, y) + (Math.max.apply(Math, y) - Math.min.apply(Math, y)) / dividend
    ))
  }

  // control graph layout depending on the browser width
  if (windowSize < MOBILE_SM_BREAKPOINT) {
    margin = {
      l: 20,
      r: 20,
      b: 40,
      t: 10,
    };
    yAxisTitle = "";
    axisFontSize = 12;
    tickFontSize = 12;
  } else {
    margin = {
      l: 80,
      r: 50,
      b: 60,
      t: 10,
    };
    yAxisTitle = yaxis;
    axisFontSize = 20;
    tickFontSize = 16;
  }

  // logo config
  const images = [
    {
      source: logo,
      xref: "paper",
      yref: "paper",
      x: 1,
      y: 0.05,
      sizex: 0.7,
      sizey: 0.2,
      opacity: 0.1,
      layer: "below",
      xanchor: "right",
      yanchor: "bottom",
    },
  ];

  // layout
  const layout = {
    showlegend: false,
    colorway: [],
    images,
    autosize: true,
    margin,
    font: {
      family: 'Roboto Condensed'
    },
    xaxis: {
      fixedrange: true,
      title: {
        text: xaxis,
      },
      titlefont: {
        size: axisFontSize,
        color: GRAPH_COLOR
      },
      tickfont: {
        size: tickFontSize,
        color: GRAPH_COLOR
      },
      range: [
        minOrMaxRange('min', 5),
        minOrMaxRange('max', 5)
      ],
    },
    yaxis: {
      fixedrange: true,
      title: {
        text: yAxisTitle,
      },
      tickfont: {
        size: tickFontSize,
        color: GRAPH_COLOR
      },
      titlefont: {
        size: axisFontSize,
        color: GRAPH_COLOR
      },
      range: [
        minOrMaxRange('min', 5),
        minOrMaxRange('max', 4)
      ],
    },
  };

  const config = {
    displayModeBar: false,
    responsive: true,
    staticPlot: false,
  }

  // data config
  const namesAbbr = names.map(name => Object.keys(ABB2TEAM).find(key => ABB2TEAM[key] === name));
  const dataText = namesAbbr.map(name => '<b>' + name + '</b>');
  if (isTeam) {
    data = [
      {
        x: x,
        y: y,
        text: dataText,
        link: namesAbbr,
        textfont: {
          color: teamColours,
          size: markerFontSize,
        },
        type: "scatter",
        mode: "text",
      },
    ];
  } else {
    data = [
      {
        x: x,
        y: y,
        text: names.map((name) => name.replace(/\s/g, "<br>")),
        link: names,
        textfont: {
          color: teamColours,
          size: markerFontSize,
        },
        type: "scatter",
        mode: "text",
      },
    ];
  }

  data.push({
    mode: "lines",
    name: "lines",
    type: "scatter",
    x: [0, 1000],
    y: [0, 1000],
    line: {
      color: graphDashColor,
      dash: "dash",
    },
  });

  // handle click event on data points
  const handleClickData = (e) => {
    const selectedName = e.points[0].data.link[e.points[0].pointIndex]
    const link = isTeam ? ABB2TEAM[selectedName].replaceAll(" ", "_") : selectedName.replaceAll(" ", "_");
    history.push(
      `/${isTeam ? "team" : "player"}/${link}`
    );
  };

  return (
    <>
      <HomeAwayYAxis>{windowSize < MOBILE_SM_BREAKPOINT ? yaxis : ""}</HomeAwayYAxis>
      <HomeAwayGraphDiv isTeam={isTeam}>
        <Plot
          useResizeHandler
          data={data}
          onClick={(e) => handleClickData(e)}
          config={config}
          className="plot"
          style={{ width: "100%", height: "60vh" }}
          layout={layout}
        />
      </HomeAwayGraphDiv>
    </>
  );
};

export default HomeAwayPlot;