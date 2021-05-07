import React, { useEffect, useState } from "react";
import { Scatter, defaults } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { rgba } from "polished";
import { ABB2TEAM, GREEN_ACCENT_COLOR, MOBILE_SM_BREAKPOINT } from "../../../constants";
import { getKeyByValue } from "../../../Shared/Functions/GetKeyByValue";
import GraphInfo from "../../../Shared/GraphInfo/GraphInfo";
import "chartjs-plugin-watermark";
import logo from "Assets/images/new-logo-square.png";
import { ChartContainer } from "./Overview-styles"

const OverviewPlot = (props) => {
  const {
    homeData,
    awayData,
    setTextToDisplay,
    rawText,
    setCurrentText,
    homeTeam,
    awayTeam,
    homeColour,
    awayColour,
    setSelectedPlotProgress,
    setScoresProgress,
    hide,
    yAxisData,
    scoreDiffData,
    selectedPlotBtn,
    progressArr,
    selectedPlotIndex,
    scoreDiffCapVal,
    leftAxisCapVal,
  } = props;

  const [width, setWidth] = useState(window.innerWidth);

  const abbreviatedHomeTeam = getKeyByValue(ABB2TEAM, homeTeam);
  const abbreviatedAwayTeam = getKeyByValue(ABB2TEAM, awayTeam);

  const graphInfoKeys = ["Consecutive Score", , , "Play"];
  const scoreDiffColour = GREEN_ACCENT_COLOR;

  // left yaxis top and bottom label with team names
  const yAxisTeamNamePlugin = (yWidth, yAwayHeight) => {
    return (chart) => {
      if (chart.config.options.plugin_yAxisTeamName) {
        const ctx = chart.chart.ctx;
        ctx.clearRect(0, 0, chart.width, chart.height);
        ctx.save();
        ctx.fillStyle = "gray";
        const yHome = 45;
        const yAway = yAwayHeight;
        ctx.textAlign = "left";
        ctx.fillText(abbreviatedHomeTeam, yWidth, yHome);
        ctx.fillText(abbreviatedAwayTeam, yWidth, yAway);
        ctx.restore();
      }
    };
  };
  // vertical line on hover/touch
  const verticalLinePlugin = {
    afterDraw: function (chart, easing) {
      if (
        chart.config.options.plugin_tooltip &&
        chart.tooltip._active &&
        chart.tooltip._active.length
      ) {
        const activePoint = chart.controller.tooltip._active[0];
        const ctx = chart.ctx;
        const x = activePoint.tooltipPosition().x;

        const topY = chart.scales["left-y-axis"].top;
        const bottomY = chart.scales["left-y-axis"].bottom;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "silver";
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  useEffect(() => {
    const resizeListener = () => setWidth(window.innerWidth);
    window.addEventListener("resize", resizeListener);

    Chart.plugins.unregister(ChartDataLabels);
    Chart.pluginService.register(verticalLinePlugin);

    if (width < MOBILE_SM_BREAKPOINT) {
      Chart.pluginService.register({
        beforeDraw: yAxisTeamNamePlugin(10, 330),
      });
    } else {
      Chart.pluginService.register({
        beforeDraw: yAxisTeamNamePlugin(35, 410),
      });
    }

    return () => {
      window.removeEventListener("resize", resizeListener);
      Chart.plugins.register(ChartDataLabels);
      Chart.pluginService.unregister({
        beforeDraw: yAxisTeamNamePlugin(10, 330),
      });
    };
  }, [width, selectedPlotBtn]);

  // separate win probabily to positive and negative y values
  const posYValues = [...scoreDiffData];
  const negYValues = [...scoreDiffData];
  scoreDiffData.forEach((yval, i) => {
    if (yval.y > 0) {
      posYValues[i] = yval;
      negYValues[i] = 0;
    } else {
      negYValues[i] = yval;
      posYValues[i] = 0;
    }
  });

  // plot options
  let labelDisplay, labelFontSize, tickFontSize, labelString, watermarkWidth, watermarkHeight, watermarkX, watermarkY;
  if (width < MOBILE_SM_BREAKPOINT) {
    labelDisplay = false;
    labelFontSize = 12;
    tickFontSize = 12;
    watermarkWidth = 100;
    watermarkHeight = 50;
    watermarkX = 40;
    watermarkY = 40;
  } else {
    labelDisplay = true;
    labelFontSize = 20;
    tickFontSize = 16;
    watermarkWidth = 150;
    watermarkHeight = 70;
    watermarkX = 80;
    watermarkY = 80;
  }

  defaults.global.defaultFontFamily = "Roboto Condensed";

  switch (selectedPlotBtn) {
    case "EFG":
      labelString = "EFG Difference";
      break;

    case "CS":
      labelString = "Consecutive Scores Difference";
      break;
    case "Fantasy":
      labelString = "Fantasy Score Difference";
      break;
    case "Play":
      labelString = "Play Difference";
      break;
    default:
      break;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          type: "linear",
          ticks: {
            stepSize: 12,
            fontSize: tickFontSize,
          },
          gridLines: {
            drawBorder: false,
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Time(min)",
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
            fontColor: "black",
            min: -leftAxisCapVal[selectedPlotIndex],
            max: leftAxisCapVal[selectedPlotIndex],
          },
          gridLines: {
            drawBorder: false,
          },
          display: true,
          scaleLabel: {
            display: labelDisplay,
            labelString: labelString,
            fontSize: 20,
            fontColor: "black",
          },
        },
        {
          id: "right-y-axis",
          type: "linear",
          position: "right",
          ticks: {
            fontSize: tickFontSize,
            fontColor: scoreDiffColour,
            min: -scoreDiffCapVal,
            max: scoreDiffCapVal,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          display: true,
          scaleLabel: {
            display: labelDisplay,
            labelString: "Score Difference",
            fontSize: 20,
            fontColor: scoreDiffColour,
          },
        },
      ],
    },
    tooltips: {
      intersect: false,
      custom: (tooltipModel) => {
        const xIndex =
          tooltipModel.dataPoints && tooltipModel.dataPoints[0].index;
        let newArr = [];
        for (let i = 3; i > 0; i--) {
          newArr.push(rawText[xIndex - i]);
        }
        for (let i = 0; i < 3; i++) {
          newArr.push(rawText[xIndex + i]);
        }
        setTextToDisplay(newArr);
        setCurrentText(rawText[xIndex]);

        if (progressArr) {
          setSelectedPlotProgress([
            progressArr[selectedPlotIndex]["Home"][xIndex],
            progressArr[selectedPlotIndex]["Away"][xIndex],
          ]);
        }
        setScoresProgress([homeData[xIndex].y, awayData[xIndex].y]);
      },
    },
    plugin_yAxisTeamName: yAxisTeamNamePlugin,
    plugin_tooltip: verticalLinePlugin,
    legend: {
      align: "center",
      labels: {
        boxWidth: 10,
        fontSize: tickFontSize,
        filter: (item, chart) => {
          return !item.text.includes("pos") && !item.text.includes("neg");
        },
      },
    },
    watermark: {
      image: logo,
      x: watermarkX,
      y: watermarkY,
      width: watermarkWidth,
      height: watermarkHeight,
      opacity: 0.15,
      alignX: "left",
      alignY: "top",
      position: "front",
    }
  };

  // plot data
  const data = () => {
    // team scores
    const scoreDiffDatasets = {
      label: "Score Difference",
      fill: false,
      showLine: true,
      borderColor: "black",
      borderWidth: 4,
      pointRadius: 0,
      data: scoreDiffData,
      yAxisID: "right-y-axis"
    };
    // one of four datas
    const yPosDatasets = {
      label: "pos",
      fill: true,
      showLine: true,
      borderColor: "transparent",
      borderWidth: 4,
      backgroundColor: rgba(homeColour, 0.5),
      pointColor: "#fff",
      pointRadius: 0,
      data: posYValues,
      yAxisID: "right-y-axis"
    };
    const yNegDatasets = {
      label: "neg",
      fill: true,
      showLine: true,
      borderColor: "transparent",
      borderWidth: 4,
      backgroundColor: rgba(awayColour, 0.5),
      pointColor: "#fff",
      pointRadius: 0,
      data: negYValues,
      yAxisID: "right-y-axis"
    };
    const yDatasets = {
      label: labelString,
      fill: false,
      showLine: true,
      borderColor: GREEN_ACCENT_COLOR,
      borderWidth: 2,
      pointColor: "#fff",
      pointRadius: 0,
      data: yAxisData,
      yAxisID: "left-y-axis"
    };

    return {
      datasets: [scoreDiffDatasets, yNegDatasets, yPosDatasets, yDatasets],
    };
  };

  return (
    <ChartContainer hide={hide}>
      <GraphInfo nomargin plotType={graphInfoKeys[selectedPlotIndex]} />
      <Scatter
        data={data}
        options={options}
        plugins={[
          {
            beforeInit: function (chart, options) {
              chart.legend.afterFit = function () {
                this.height = this.height + 30;
              };
            },
          },
        ]}
      />
    </ChartContainer>
  );
};
export default OverviewPlot;
