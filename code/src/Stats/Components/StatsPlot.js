import React from "react";
import { useHistory } from "react-router-dom";
import { cleanName } from "../../Shared/Functions/PlotFunctions";
import { ABB2TEAM } from "../../constants";
import { MobileYAxisTitle } from "../../globalStyles";
import { GraphInstruction, StatsPlotDiv } from "../stats-style";
import useWindowSize from "../../Shared/hooks/useWindowSize";
import logo from "Assets/images/new-logo-square.png";
import { Scatter, defaults } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { createScatterPlot } from "../../Shared/Functions/scatterPlotFunctions";

const StatsPlot = ({
  x,
  y,
  names,
  teamColours,
  xAxisTitle,
  yAxisTitle,
  isTeam,
  statCategory,
  stat,
}) => {
  const windowSize = useWindowSize();
  const breakpoint = 500;
  const medBreakpoint = 768;
  const history = useHistory();

  // configure data
  let labelFontSize,
    tickFontSize,
    labelString,
    yAxisDistance,
    labelDisplay,
    callback;

  Chart.plugins.register(ChartDataLabels);

  if (windowSize < breakpoint) {
    labelFontSize = 12;
    tickFontSize = 12;
    labelString = "";
    labelDisplay = false;
    yAxisDistance = 15;
  } else if (windowSize < medBreakpoint) {
    yAxisDistance = 40;
  } else {
    labelFontSize = 20;
    tickFontSize = 16;
    labelString = yAxisTitle.replace("_", " ");
    labelDisplay = true;
    yAxisDistance = 90;
  }

  // Configure axis range
  const minX =
    Math.min.apply(Math, x) -
    (Math.max.apply(Math, x) - Math.min.apply(Math, x)) / 5;
  const maxX =
    Math.max.apply(Math, x) +
    (Math.max.apply(Math, x) - Math.min.apply(Math, x)) / 5;
  const minY =
    Math.min.apply(Math, y) -
    (Math.max.apply(Math, y) - Math.min.apply(Math, y)) / 5;
  const maxY =
    Math.max.apply(Math, y) +
    (Math.max.apply(Math, y) - Math.min.apply(Math, y)) / 5;

  // New display name
  const namesAbbr = names.map((name) =>
    Object.keys(ABB2TEAM).find((key) => ABB2TEAM[key] === name)
  );

  const newNames =
    isTeam && statCategory === "Basic"
      ? namesAbbr
      : isTeam && statCategory === "Champion"
      ? names.map((name) => cleanName(name))
      : names.map((name) => cleanName(name));

  // Create data object{x: , y: }
  const scatterObj = [];
  x.forEach((x, i) => createScatterPlot(y, scatterObj, x, i));

  const data = {
    labels: newNames,
    datasets: [
      {
        backgroundColor: "white",
        borderColor: "white",
        pointRadius: 1,
        data: scatterObj,
        labels: newNames,
        datalabels: {
          align: "center",
          anchor: "center",
          font: {
            size: "17",
            weight: "100",
          }
        }
      },
    ],
  };

  defaults.global.defaultFontFamily = "Roboto Condensed";
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          id: "left-x-axis",
          type: "linear",
          ticks: {
            fontSize: tickFontSize,
            suggestedMin: minX,
            suggestedMax: maxX,
            callback: function (value, index, values) {
              if (stat === "Total_Salary_vs_Winning_%") {
                return "$" + value / 1000000 + "M";
              } else if (xAxisTitle.includes("$")) {
                return "$" + value + "M";
              }
              return value;
            },
          },
          gridLines: {
            drawBorder: false,
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: xAxisTitle.replace("_", " "),
            fontSize: labelFontSize,
          },
        },
      ],
      yAxes: [
        {
          id: "left-y-axis",
          type: "linear",
          position: "left",
          ticks: {
            fontSize: tickFontSize,
            suggestedMin: minY,
            suggestedMax: maxY,
          },
          gridLines: {
            drawBorder: false,
          },
          display: true,
          afterFit: function (scale) {
            scale.width = yAxisDistance;
          },
          scaleLabel: {
            display: labelDisplay,
            labelString: labelString,
            fontSize: 20,
          },
        },
      ],
    },
    annotation: {
      annotations: [
        {
          type: "box",
          drawTime: "beforeDatasetsDraw",
          xScaleID: "left-x-axis",
          yScaleID: "left-y-axis",
          xMin: 0,
          xMax: 30,
          yMin: 95,
          yMax: 125,
          backgroundColor: "rgba(0, 255, 0, 1)",
          display: true,
        },
      ],
    },

    watermark: {
      image: logo,
      x: 50,
      y: 50,
      width: 150,
      height: 70,
      opacity: 0.15,
      alignX: "right",
      alignY: "top",
      position: "front",
    },
    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        formatter: function (value, context) {
          return context.chart.data.datasets[0].labels[context.dataIndex];
        },
        color: teamColours,
        font: {
          weight: "bold",
          size: "14",
          family: "Roboto Condensed",
        },
        textAlign: "center",
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          let label =
            data.datasets[tooltipItem.datasetIndex].labels[tooltipItem.index] ||
            "";

          if (label) {
            label += ": ";
          }
          label += Math.round(tooltipItem.yLabel * 100) / 100;
          return label;
        },
      },
      custom: function (tooltip) {
        if (!tooltip) return;
        tooltip.displayColors = false;
      },
    },
  };



  // handle click event on data points
  const handleClickData = (e) => {
    if (e[0]) {
      const labelsArr = e[0]._xScale.chart.$datalabels._datasets[0];
      const index = e[0]._index;
      const label = labelsArr[0].$context.dataset.labels[index];

      let link;

      if (statCategory === "Basic" && isTeam) {
        link = ABB2TEAM[label].replaceAll(" ", "_");
      } else if (statCategory === "Basic" && !isTeam) {
        link = label.replaceAll("\n", "_");
      } else if (statCategory !== "Basic" && isTeam) {
        link = ABB2TEAM[label.substring(8)]
          .replace(/[^a-zA-Z]+/g, " ")
          .trim()
          .replaceAll(" ", "_");
      } else {
        link = label
          .substring(8)
          .replace(/[^a-zA-Z]+/g, " ")
          .trim()
          .replaceAll(" ", "_");
      }
      history.push(`/${isTeam ? "team" : "player"}/${link}`);
    }
  };

  return (
    <StatsPlotDiv isBasic={statCategory === "Basic"} isTeam={isTeam}>
      <MobileYAxisTitle>
        {windowSize < medBreakpoint ? yAxisTitle : ""}
      </MobileYAxisTitle>
      <div className="plot-container">
        <div className="plot">
          <Scatter
            data={data}
            options={options}
            plugins={[
              {
                beforeDraw: function(chart, args, options) {
                  const ctx = chart.ctx;
                  const canvas = chart.canvas;
                  const chartArea = chart.chartArea;

                  let startingX = chartArea.left;
                  let endingX = chartArea.right;
                  let startingY = chartArea.top;
                  let endingY = chartArea.bottom;
                  let width = endingX - startingX;
                  let height = endingY - startingY; 

                  // Chart background
                  let leftTopCorner = canvas.getContext("2d").createLinearGradient(0, 0, 0, height / 2);
                  let rightTopCorner = canvas.getContext("2d").createLinearGradient(0, 0, 0, height / 2);
                  let letBottomCorner = canvas.getContext("2d").createLinearGradient(0, startingY + height / 2, 0, height);
                  let rightBottomCorner = canvas.getContext("2d").createLinearGradient(0, startingY + height / 2, 0, height);
                  leftTopCorner.addColorStop(0, "rgba(0, 255, 0, 0.4)");
                  leftTopCorner.addColorStop(1, "rgba(0, 0, 0, 0)");

                  rightTopCorner.addColorStop(0, "rgba(60, 255, 0, 0.4)");
                  rightTopCorner.addColorStop(1, "rgba(0, 0, 0, 0)");

                  letBottomCorner.addColorStop(0, "rgba(0, 0, 0, 0)");
                  letBottomCorner.addColorStop(1, "rgba(255, 0, 0, 0.4)")

                  rightBottomCorner.addColorStop(0, "rgba(0, 0, 0, 0)");
                  rightBottomCorner.addColorStop(1,"rgba(255, 20, 0, 0.4)")
                  ctx.fillStyle = leftTopCorner;
                  ctx.fillRect(startingX, startingY,width / 2, height / 2);

                  ctx.fillStyle = rightTopCorner;
                  ctx.fillRect(startingX + width / 2, startingY,width / 2, height / 2);

                  ctx.fillStyle = letBottomCorner;
                  ctx.fillRect(startingX, startingY + height / 2, width / 2, height / 2);

                  ctx.fillStyle = rightBottomCorner;
                  ctx.fillRect(startingX + width / 2, startingY + height / 2, width / 2, height / 2)
                }
              }
            ]}
            onElementsClick={handleClickData}
          />
        </div>
      </div>
      <GraphInstruction>
        <span className="scroll-txt">scroll to view</span>
        <i className="fas fa-long-arrow-alt-right arrow"></i>
      </GraphInstruction>
    </StatsPlotDiv>
  );
};

export default StatsPlot;
