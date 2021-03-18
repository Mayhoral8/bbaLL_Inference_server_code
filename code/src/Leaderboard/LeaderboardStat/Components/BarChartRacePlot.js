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
        pointsData[j].push(y[i][j]);
      } else {
        pointsData[j].push(0);
      }
    }
  }
  console.log(pointsData);
  useEffect(() => {
    const svg = select(svgRef.current);
    //console.log(gameIndex);
    const yScale = scaleBand()
      .paddingInner(0.1)
      .domain(pointsData[gameIndex].map((value, index) => index))
      .range([0, 200]);
    console.log(max(pointsData[gameIndex]));
    const xScale = scaleLinear()
      .domain([0, max(pointsData[gameIndex])])
      .range([0, 900]);

    svg
      .selectAll(".bar")
      .data(pointsData[gameIndex])
      .join("rect")
      .attr("fill", (entry, index) => teamColours[index])
      .attr("class", "bar")
      .attr("x", 0)
      .attr("width", (entry) => xScale(entry))
      .attr("y", (entry, index) => yScale(index))
      .attr("height", yScale.bandwidth());
    svg
      .selectAll(".label")
      .data(pointsData[gameIndex], (entry, index) => text[index])
      .join("text")
      .attr("fill", "#FFFFFF")
      .text((entry, index) => `${text[index]} Points ${entry}`)
      .attr("class", "label")
      .attr("x", 10)
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth());
  }, [gameIndex]);

  return (
    <div>
      <svg width="100%" height="300" ref={svgRef}></svg>
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
