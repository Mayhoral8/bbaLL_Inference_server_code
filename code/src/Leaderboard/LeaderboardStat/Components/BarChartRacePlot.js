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
  const [play, setPlay] = useState(false);
  const [timerID, setTimerID] = useState(null);

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
  // console.log(text);
  // console.log(y);

  useEffect(() => {
    if (play) {
      setTimerID(
        setInterval(() => {
          setGameIndex((gameIndex) => gameIndex + 1);
          console.log("incremented");
        }, 1000)
      );
    } else if (!play) {
      clearInterval(timerID);
      setGameIndex((gameIndex) => 0);
    }
  }, [play]);

  useEffect(() => {
    if (gameIndex + 1 > pointsData.length - 1) {
      clearInterval(timerID);
    }

    const svg = select(svgRef.current);
    pointsData[gameIndex].sort((a, b) => b.value - a.value);

    const yScale = scaleBand()
      .paddingInner(0.1)
      .domain(pointsData[gameIndex].map((value, index) => index))
      .range([0, 400]);
    //console.log(max(pointsData[gameIndex], (entry) => entry.value));
    const xScale = scaleLinear()
      .domain([0, max(pointsData[gameIndex], (entry) => entry.value)])
      .range([0, 900]);
    //console.log(gameIndex);
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
      .attr("fill", "#EEEEEE")
      .text((entry) => `${entry.name} ${Math.round(entry.value * 100) / 100}`)
      .attr("class", "label")
      .attr("x", 10)
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
  });

  return (
    <div>
      <button style={{ color: "black" }} onClick={() => setPlay(!play)}>
        {play ? "Reset" : "Start"}
      </button>
      <svg width="100%" height="450" ref={svgRef}></svg>
      <div style={{ textAlign: "end" }}>
        <b>{gameIndex + 1}</b>
      </div>
    </div>
  );
};

export default BarChart;
