import React, { Fragment } from "react";
import { radarStats } from "../individualConstants";
import { Radar } from "react-chartjs-2";
import { rgba } from "polished";
import "chartjs-plugin-datalabels";

export const IndivRadar = ({ stats, text, maxYearly }) => {

  const lightBuleHover = rgba(197, 239, 247, 1);
  const lightBule = "#207EEC";

  const yearStats = radarStats.map((categoryName, i) => {
    if (Object.keys(maxYearly).includes(categoryName)) {
      return stats[i] / maxYearly[categoryName].value;
    } else return parseFloat(stats[i]);
  });

  // data format for Radar chart.js
  const chartData = {
    labels: text,
    datasets: [
      {
        borderColor: lightBule,
        pointBackgroundColor: lightBule,
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverBackgroundColor: lightBuleHover,
        pointHoverBorderColor: lightBule,
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,0.8)",
        data: yearStats.map((stat) => stat.toFixed(2)),
      },
    ],
  };
  //options for Radar chart.js
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    scale: {
      pointLabels: { fontSize: 12 },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 100,
        showLabelBackdrop: true,
      },
    },
    legend: {
      display: false,
    },
    plugins: {
      //Radar data labels format go here
      datalabels: {
        backgroundColor: function (context) {
          return context.dataset.borderColor;
        },
        color: "white",
        font: {
          weight: "bold",
        },
        formatter: function (value, context) {
          return Math.round(value) + "%";
        },
        padding: 2,
      },
      aspectRatio: 4 / 3,
      elements: {
        point: {
          hoverRadius: 7,
          radius: 5,
        },
      },
    },
  };

  return (
    <Fragment>
      <Radar data={chartData} options={options} />
    </Fragment>
  );
};

export default IndivRadar;
