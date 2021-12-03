import React from "react";
import { Bar, Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

export const StatsBar = ({ labels, avgData, teamColours, yAxisTitle }) => {
  const barOptions = {
    responsive: true,
    aspectRatio: 5 / 3,
    layout: {
      padding: {
        top: 24,
        right: 16,
        bottom: 0,
        left: 8,
      },
    },
    plugins: {
      datalabels: {
        align: function (context) {
          var index = context.dataIndex;
          var value = context.dataset.data[index];
          var invert = Math.abs(value) <= 1;
          return value < 1 ? "end" : "start";
        },
        anchor: "end",
        backgroundColor: null,
        borderColor: null,
        borderRadius: 4,
        borderWidth: 1,
        color: "white",
        font: {
          size: 12,
          weight: 600,
        },
        offset: 4,
        padding: 0,
        formatter: function (value) {
          return Math.round(value * 10) / 10;
        },
      },
    },
    scales: {
      yAxes: [
        {
          display: true,
        },
      ],

      xAxes: [
        {
          gridLines: {
            display: true,
            offsetGridLines: false,
          },
          ticks: {
            autoSkip: false,
            maxRotation: 70,
            minRotation: 70,
            fontSize: 20,
          },
        },
      ],
    },
  };

  // SORT
  let preprocess_sort = [];
  for (let i = 0; i < labels.length; i++) {
    const player = labels[i];
    const color = teamColours[i];
    const data = avgData[i];
    preprocess_sort.push({ player, color, data });
    // preprocess_sort[player] = [avgData[i], teamColours[i]];
  }
  const sorted_arr = preprocess_sort.sort(function (a, b) {
    return parseFloat(b.data) - parseFloat(a.data);
  });

  let sorted_avgData = [];
  let sorted_teamColours = [];
  let sorted_labels = [];
  for (let i = 0; i < sorted_arr.length; i++) {
    sorted_labels.push(sorted_arr[i].player);
    sorted_avgData.push(sorted_arr[i].data);
    sorted_teamColours.push(sorted_arr[i].color);
  }
  const barChartData = {
    type: "bar",
    labels: sorted_labels,
    datasets: [
      {
        label: yAxisTitle,
        data: sorted_avgData,
        backgroundColor: sorted_teamColours,
        borderColor: sorted_teamColours,
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const legend = {
    display: true,
    responsive: true,
    labels: {
      fontSize: 35,
      boxWidth: 0,
    },
  };

  return <Bar data={barChartData} options={barOptions} legend={legend} />;
};

export default StatsBar;
