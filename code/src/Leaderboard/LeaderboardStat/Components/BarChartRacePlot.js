import { select, scaleBand, scaleLinear, max } from "d3";
import { PlotContainerDiv, PlotDiv } from "./scatterline-style";
import React, { useRef, useEffect, useState } from "react";
import { ColorSVG } from "./barchartrace-style";

const BarChart = ({
  x,
  y,
  text,
  xaxis,
  yaxis,
  isTotal,
  stat,
  isTeam,
  teamColours,
  zoom_scale,
  yearId,
  avg_curve,
  avg_name,
  best_curve,
  best_name,
  graphInfo,
}) => {
  const data = [1, 2];
  const pointsData = [];
  const svgRef = useRef();
  const [gameIndex, setGameIndex] = useState(0);

  let maxlength = 0;
  // finds highest number of games
  y.forEach((element) => {
    if (element.length > maxlength) {
      maxlength = element.length;
    }
  });
  for (let i = 0; i < maxlength; i++) {
    pointsData.push([]);
  }
  for (let i = 0; i < y.length; i++) {
    for (let j = 0; j < maxlength; j++) {
      if (j < y[i].length) {
        let obj = {
          name: text[i],
          value: y[i][j],
        };
        pointsData[j].push(obj);
      } else {
        let obj = {
          name: text[i],
          value: 0,
        };
        pointsData[j].push(obj);
      }
    }
  }
  console.log(pointsData);
  console.log(text);
  console.log(y);
  useEffect(() => {
    const svg = select(svgRef.current);
    pointsData[gameIndex].sort((a, b) => b.value - a.value);
    const yScale = scaleBand()
      .paddingInner(0.3)
      .domain(pointsData[gameIndex].map((value, index) => index))
      .range([0, 400]);
    console.log(max(pointsData[gameIndex]));
    const xScale = scaleLinear()
      .domain([0, max(pointsData[gameIndex], (entry) => entry.value)])
      .range([0, 900]);

    svg

      .selectAll(".bar")
      .data(pointsData[gameIndex], (entry) => entry.name)
      .join("rect")
      .attr("fill", (entry, index) => teamColours[index])
      .attr("class", "bar")
      .attr("x", 0)
      .transition()
      .attr("width", (entry) => xScale(entry.value))
      .attr("y", (entry, index) => yScale(index))
      .attr("height", yScale.bandwidth());

    svg
      .selectAll(".label")
      .data(pointsData[gameIndex], (entry) => entry.name)
      .join("text")
      .attr("fill", "#aaaaaa")
      .text((entry) => `${entry.name} Points ${entry.value}`)
      .attr("class", "label")
      .attr("x", 10)
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth());
  });

  return (
    <div>
      <svg width="100%" height="450" ref={svgRef}></svg>
      <button
        style={{ color: "red" }}
        onClick={() => setGameIndex(gameIndex + 1)}
      >
        Increment
      </button>
    </div>
  );
};

export default BarChart;
