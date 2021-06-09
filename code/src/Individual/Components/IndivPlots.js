import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import useWindowSize from "../../Shared/hooks/useWindowSize";
import { Bar, Line } from "react-chartjs-2";
import { CenteredMain } from "../../globalStyles";

export const IndivPlots = ({ data, layout, labels }) => {
  const windowSize = useWindowSize();
  const breakpoint = 500;
  // console.log("data", data);
  // console.log(data.dataset.label.includes("M"))

//   yAxes: [{
//     ticks: {
//         // Abbreviate the millions
//         callback: function(value, index, values) {
//             return value / 1e6 + 'M';
//         }
//     }
// }]

  const options = {
    responsive: true,
    // title: { text: "????", display: true },
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function(value, index, values) {
              if(parseInt(value) >= 10000){
                return '$' + value/1e6 + "M";
              } else {
                return value;
              }
            },
            autoSkip: true,
            // maxTicksLimit: 10,
            beginAtZero: true,
            fontSize: 10,
          },
          // gridLines: {
          //   display: false,
          // },
        },
      ],
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            // maxTicksLimit: 10,
            beginAtZero: true,
            fontSize: 10,
            
          },
          // gridLines: {
          //   display: false,
          // },
          stacked: true,
        },
      ],
      plugins: {
        filler: {
          propagate: false,
        },
        "samples-filler-analyser": {
          target: "chart-analyser",
        },
      },
      interaction: {
        intersect: false,
      },
    },
  };

  const legend = {
    display: true,
    position: "top",
    labels: {
      fontColor: "#323130",
      fontSize: 10,
      color: "",
    },
  };

  const chartData = {
    labels,
    datasets: data,
  };
  return (
    <Line data={chartData} options={options} legend={legend} />
    // <Plot
    //   style={{ width: "100%" }}
    //   useResizeHandler
    //   data={data}
    //   config={{
    //     displayModeBar: false,
    //     staticPlot: windowSize < breakpoint ? true : false,
    //   }}
    //   layout={layout}
    // />
  );
};

export default IndivPlots;
