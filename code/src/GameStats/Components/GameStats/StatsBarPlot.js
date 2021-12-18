import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { rgba } from "polished";
import { PlotContainer } from "./GameStats-styles";
const StatsBarPlot = ({ info, mirror, y, away }) => {
  // find all objects with key of "Q#"
  const quarterlyInfo = Object.keys(info)
    .filter((el) => el.match(/Q/g))
    .sort();
  // compute sum of all quarters for a particular attr
  const getAttrSum = (attr) => {
    let sum = 0;
    quarterlyInfo.forEach((q) => {
      sum += info[q][away ? "Away" : "Home"][attr];
    });
    return sum;
  };

  // compute ratio of quarterly values
  const quarterlyXRatio = (quarter, team) => {
    let x = [];
    y.forEach((val) => {
      if (/percentage|rate/g.test(val)) {
        const xValue =
          (info[quarter][team][val] / getAttrSum(val)) * (info[team][val] / (info.Home[val] + info.Away[val]));
        x.push(xValue);
      } else {
        const xValue = info[quarter][team][val] / (info.Home[val] + info.Away[val]);
        x.push(xValue);
      }
    });
    return x;
  };

  // convert over time annotations
  const convertOverTime = (quarter) => {
    const quarterInt = +quarter.replace(/Q/, "");
    if (quarter > "Q4") {
      return `OT${quarterInt - 4}`;
    }
    return quarter;
  };

  // create bar graph
  const createBarGraph = (x, y, name, orientation, color, width, type) => {
    return {
      x,
      y,
      name,
      orientation,
      marker: { color, width },
      type,
    };
  };

  // bar graph data structuring
  const data = [];
  quarterlyInfo.forEach((info) => {
    const quarterInt = +info.replace(/Q/, "");
    const opacity = 1 - 0.05 * quarterlyInfo.length + 0.05 * quarterInt;
    const trace = createBarGraph(
      quarterlyXRatio(info, away ? "Away" : "Home"),
      y,
      info,
      "h",
      rgba("#090979", opacity),
      1,
      "bar"
    );
    data.push(trace);
  });

  // bar options
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 1,
            stepSize: 0.1,
            reverse: mirror ? true : false,
          },
          gridLines: {
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          display: false,
          stacked: true,
          position: mirror ? "right" : "left",
          barThickness: 30,
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            reverse: true,
          },
        },
      ],
    },
  };

  // bar data
  const dataConfig = {
    labels: y,
    datasets: [
      {
        data: data[0].x,
        backgroundColor: data[0].marker.color,
      },
      {
        data: data[1].x,
        backgroundColor: data[1].marker.color,
      },
      {
        data: data[2].x,
        backgroundColor: data[2].marker.color,
      },
      {
        data: data[3].x,
        backgroundColor: data[3].marker.color,
      },
    ],
  };

  console.log(data)

  return (
    <PlotContainer>
        <HorizontalBar options={options} data={dataConfig} />
    </PlotContainer>
  );
};

export default StatsBarPlot;
