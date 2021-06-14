import React, { useEffect, useState } from "react";
import useWindowSize from "../../Shared/hooks/useWindowSize";
import { Bar, Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { Footer } from "../indiv-style"
export const IndivPlots = ({ data, labels, barData, page }) => {
 
  // salary format for Y-Axis on Salary plot and datalabels
  const salaryOption = (value) => {
    if (parseInt(value) >= 10000) {
      return "$" + value / 1e6 + "M";
    } else {
      return value;
    }
  };
  //options for line plotdata
  const lineOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function (value) {
              return salaryOption(value);
            },

            autoSkip: true,
            // maxTicksLimit: 10,
            // beginAtZero: true,
            fontSize: 14,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            beginAtZero: true,
            fontSize: 14,
          },
          gridLines: {
            display: true,
          },
        },
      ],
    },
    plugins: {
      //data labels on each plot
      datalabels: {
        display: function (context) {
          const label = context.dataset.label.split(" ")[0];
          return label === "Up" || label === "Down" ? false : true;
        },
        backgroundColor: function (context) {
          return context.dataset.borderColor;
        },
        borderRadius: 2,
        color: "white",
        font: {
          weight: "bold",
        },
        formatter: function (value, context) {
          // Salary formatter
          if (value > 10000) {
            const newVal = salaryOption(value).slice(1, 4);
            if (newVal.slice(-1) === ".") {
              return newVal.split(".")[0] + "M";
            }
            return newVal + "M";
          }
          // Shots page formatter conditions and other pages as well
          if (
            (page === "Shots" && context.dataset.label.slice(-1) === "%") ||
            (page === "Shots" &&
              context.dataset.label.split(" ")[0] === "Top100") ||
            (page === "Shots" &&
              context.dataset.label.split(" ")[0] === "League") ||
            context.dataset.label.split(" ")[0] === "Win" || context.dataset.label === "League Avg "
          ) {
            return Math.round(value * 100) + "%";
          }
          if (
            (page === "Assists & Rebounds" &&
              context.dataset.type === "line") ||
            page === "Defence"
          ) {
            return Math.round(value * 100) / 100;
          }
          return Math.round(value * 10) / 10;
        },
        padding: 3,
      },
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

  //options for bar plotdata
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
          size: 11,
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
          display: false,
          stacked: true,
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: true,
          },
          stacked: true,
        },
      ],
    },
  };

  // legend options apply
  const legend = {
    display: true,
    responsive: true,
    labels: {
      fontSize: 14,
    },
    labels: {
      filter: function (item, chart) {
        // Logic to remove a particular legend item goes here
        return !item.text.includes("Down") && !item.text.includes("Up");
      },
    },
  };

  const lineChartData = {
    labels,
    datasets: data,
  };
  const barChartData = {
    labels,
    datasets: barData,
  };

  return (
    <div>
      {barData.length ? (
        <Bar data={barChartData} options={barOptions} legend={legend} />
      ) : (
        <div></div>
      )}
      {data.length ? (
        <Line data={lineChartData} options={lineOptions} legend={legend} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default IndivPlots;
