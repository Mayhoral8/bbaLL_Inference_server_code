import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useWindowSize from "Shared/hooks/useWindowSize";
import { HomeAwayGraphDiv, HomeAwayYAxis } from "./homeawayplot-style";
import { MOBILE_SM_BREAKPOINT } from "Constants";
import { Scatter } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const HomeAwayPlot = ({ x, y, names, xaxis, yaxis, teamColours }) => {
  const windowSize = useWindowSize();
  const history = useHistory();
  const isTeam = useSelector((state) => state.sidebarReducer.isTeam);
  const min = Math.floor(Math.min(...x, ...y));
  const max = Math.ceil(Math.max(...x, ...y));

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
    line.push({ label: "", x: i, y: i });
  }
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
          scaleLabel: {
            display: true,
            labelString: "Away",
            fontSize: 20,
          },
          ticks: {
            min,
            max,
            autoSkip: true,
            fontSize: 14,
            userCallback: function (label, index, labels) {
              if (Math.floor(label) === label) {
                return label;
              }
            },
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Home",
            fontSize: 20,
          },
          ticks: {
            min,
            max,
            autoSkip: true,
            fontSize: 14,
            userCallback: function (label, index, labels) {
              if (Math.floor(label) === label) {
                return label;
              }
            },
          },
        },
      ],
    },
    plugins: {
      datalabels: {
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
  return (
    <>
      <HomeAwayYAxis>
        {windowSize < MOBILE_SM_BREAKPOINT ? yaxis : ""}
      </HomeAwayYAxis>
      <HomeAwayGraphDiv isTeam={isTeam}>
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
