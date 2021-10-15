import React from "react";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useWindowSize from "Shared/hooks/useWindowSize";
import logo from "Assets/images/new-logo-square.png";
import { HomeAwayGraphDiv, HomeAwayYAxis } from "./homeawayplot-style";
import { ABB2TEAM, GRAPH_COLOR, MOBILE_SM_BREAKPOINT } from "Constants";
import { Scatter, Chart } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const HomeAwayPlot = ({ x, y, names, xaxis, yaxis, teamColours }) => {
  const windowSize = useWindowSize();
  const history = useHistory();
  const isTeam = useSelector((state) => state.sidebarReducer.isTeam);
  const min = Math.floor(Math.min(...x, ...y));
  const max = Math.ceil(Math.max(...x, ...y));
  // define graph layout variables

  let data, margin, yAxisTitle, axisFontSize, tickFontSize;
  let markerFontSize = 16;
  const graphDashColor = "#534a91";

  const minOrMaxRange = (range, dividend) => {
    if (range === "min") {
      return Math.min(
        Math.min.apply(Math, x) -
          (Math.max.apply(Math, x) - Math.min.apply(Math, x)) / dividend,
        Math.min.apply(Math, y) -
          (Math.max.apply(Math, y) - Math.min.apply(Math, y)) / dividend
      );
    }

    return Math.max(
      Math.max.apply(Math, x) +
        (Math.max.apply(Math, x) - Math.min.apply(Math, x)) / dividend,
      Math.max.apply(Math, y) +
        (Math.max.apply(Math, y) - Math.min.apply(Math, y)) / dividend
    );
  };

  // handle click event on data points

  // const handleClickData = (e) => {
  //   const selectedName = e.points[0].data.link[e.points[0].pointIndex];
  //   const link = isTeam
  //     ? ABB2TEAM[selectedName].replaceAll(" ", "_")
  //     : selectedName.replaceAll(" ", "_");
  //   history.push(`/${isTeam ? "team" : "player"}/${link}`);
  // };
  console.log(
    "x: ",
    x.length,
    "y: ",
    y.length,
    "names: ",
    names,
    "xais, : ",
    xaxis,
    "yaxis: ",
    yaxis,
    "yAxisTitle: ",
    yAxisTitle
  );

  // preprocess scatter points data [{x: , y: }...]

  const scatterPoints = [];
  for (let i = 0; i <= x.length - 1; i++) {
    const yVal = y[i].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    const xVal = x[i].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

    const name = names[i];
    scatterPoints.push({
      label: name,
      x: xVal,
      y: yVal,
    });
  }
  // line
  const line = [];
  const b = 1;
  for (let i = min; i <= max; i++) {
    // if (i === 0) x[i] = min;
    // if (i === x.length - 1) x[i] = max;
    line.push({ label: "", x: i, y: i });
  }
  console.log("line-->", line);

  console.log("scatterPoints: ", scatterPoints);
  const scatterChartData = {
    datasets: [
      {
        type: "scatter",
        data: scatterPoints,
        backgroundColor: teamColours,
        borderColor: teamColours,
        borderWidth: 1,
        fill: false,
      },
      {
        type: "line",
        data: line,
        borderWidth: 0,
        fill: false,
        labels: false,
        borderDash: [5, 10],
        pointRadius: 0,
        // borderColor: rgba(210, 77, 255),
        borderColor: "rgb(76, 19, 173)",
        borderWidth: 2,
        font: {
          size: 30,
        },
      },
    ],
  };

  const legend = {
    display: false,
    responsive: true,
  };

  const scatterOptions = {
    responsive: true,
    spanGaps: true,
    scales: {
      yAxes: [
        {
          // type: "linear",
          // position: "bottom",
          scaleLabel: {
            display: true,
            labelString: "Away",
            fontSize: 20,
          },
          ticks: {
            min,
            max,
            // min: minOrMaxRange("min", 5),
            // max: minOrMaxRange("max", 5),
            autoSkip: true,
            fontSize: 14,
            userCallback: function (label, index, labels) {
              // when the floored value is the same as the value we have a whole number
              if (Math.floor(label) === label) {
                return label;
              }
            },
          },
        },
      ],
      xAxes: [
        {
          // type: "linear",
          // position: "bottom",
          scaleLabel: {
            display: true,
            labelString: "Home",
            fontSize: 20,
          },
          ticks: {
            min,
            max,
            // min: minOrMaxRange("min", 5),
            // max: minOrMaxRange("max", 5),
            // labels: scatterPoints.map((data) => {
            //   return data.x;
            // }),
            autoSkip: true,
            // beginAtZero: true,
            fontSize: 14,
            userCallback: function (label, index, labels) {
              // when the floored value is the same as the value we have a whole number
              if (Math.floor(label) === label) {
                return label;
              }
            },
          },
          // gridLines: {
          //   display: true,
          // },
        },
      ],
    },
    plugins: {
      datalabels: {
        display: function (label, index) {
          console.log("label,==>", label);
        },
        align: "top",
        anchor: "right",
        color: "black",
        padding: { right: 10 },
      },
    },
    tooltips: {
      position: "nearest",
      mode: "point",
      intersect: true,
      yPadding: 10,
      xPadding: 10,
      caretSize: 18,
      caretPadding: 10,
      backgroundColor: "white",
      titleFontColor: "#000",
      bodyFontColor: "#000",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      yAlign: "bottom",
    },
    // Core options
    aspectRatio: 5 / 3,
    layout: {
      padding: {
        top: 32,
        right: 16,
        bottom: 16,
        left: 8,
      },
    },
  };
  // const options = {
  //   scales: {
  //     xAxes: {
  //       type: "linear",
  //       position: "bottom",
  //     },
  //     yAxes: {
  //       type: "linear",
  //       position: "bottom",
  //     },
  //   },
  // };
  return (
    <>
      <HomeAwayYAxis>
        {windowSize < MOBILE_SM_BREAKPOINT ? yaxis : ""}
      </HomeAwayYAxis>
      <HomeAwayGraphDiv isTeam={isTeam}>
        {/* <Plot
          useResizeHandler
          data={data}
          onClick={(e) => handleClickData(e)}
          config={config}
          className="plot"
          style={{ width: "100%", height: "60vh" }}
          layout={layout}
        /> */}
        <Scatter
          data={scatterChartData}
          legend={legend}
          options={scatterOptions}
        />
      </HomeAwayGraphDiv>
    </>
  );
};

export default HomeAwayPlot;
