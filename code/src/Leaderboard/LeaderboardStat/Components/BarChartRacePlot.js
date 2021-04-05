import {
  select,
  scaleBand,
  scaleLinear,
  max,
  easeLinear,
  min,
  axisTop,
} from "d3";
import { PlotContainerDiv, PlotDiv } from "./scatterline-style";
import React, { useRef, useEffect, useState } from "react";
import { ButtonStyle, ColorSVG } from "./barchartrace-style";
import styled from "styled-components";
import Slider from "react-slick";
import { GameSlider } from "./barchartrace-style";
import { padding } from "polished";

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
  const pointsData = [];
  const svgRef = useRef();
  const widthDivRef = useRef();
  //const [gameIndex, setGameIndex] = useState(0);
  const [play, setPlay] = useState(false);
  const [timerID, setTimerID] = useState(null);
  const l = 25;
  //const [incr, setIncr] = useState(0);
  const [frameState, setFrameState] = useState({ incr: 1, gameIndex: 0 });
  let currentTeamFrame = 0;
  let numOfTeams = y.length;
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
          color: teamColours[i],
        };
        pointsData[j].push(obj);
      } else {
        let obj = {
          name: text[i],
          value: pointsData[j - 1][pointsData[j].length].value,
          color: teamColours[i],
        };

        pointsData[j].push(obj);
      }
    }
  }
  for (let i = 0; i < pointsData.length; i++) {
    let best_curve_obj = {
      name: "BEST: " + best_name.split(/[()]+/)[1],
      value: best_curve[i],
      color: "#000000",
    };
    pointsData[i].push(best_curve_obj);
  }
  console.log(best_curve);
  console.log(best_name);
  // console.log(pointsData);
  // console.log(text);
  // console.log(y);
  //console.log(pointsData);
  //console.log(pointsData[0]);
  let biggestVal = 0;
  let maxFrameDiff = 0;
  for (let i = 0; i < pointsData.length; i++) {
    let maxcurrent = max(pointsData[i], (entry) => entry.value);
    let mincurrent = min(pointsData[i], (entry) => entry.value);
    if (maxcurrent - mincurrent > maxFrameDiff) {
      maxFrameDiff = maxcurrent - mincurrent;
      //console.log(i);
    }
    if (maxcurrent > biggestVal) {
      biggestVal = maxcurrent;
    }
  }
  console.log(biggestVal);
  // let maxFrameDiff =
  //   min(pointsData[pointsData.length - 1], (entry) => entry.value) -
  //   max(pointsData[pointsData.length - 1], (entry) => entry.value);

  //console.log("difference = " + maxVal);
  for (let i = 0; i < pointsData.length; i++) {
    let currentFrameDiff =
      max(pointsData[i], (entry) => entry.value) -
      min(pointsData[i], (entry) => entry.value);
    for (let j = 0; j < pointsData[i].length; j++) {
      let team = pointsData[i][j];
      let prevValue = 0;
      let nextValue = team.value;

      if (i > 0) {
        let prevTeam = pointsData[i - 1][j];
        prevValue = prevTeam.value[prevTeam.value.length - 1];
      }
      const increment =
        (nextValue - prevValue) / (l * (currentFrameDiff / maxFrameDiff));
      const newValues = [];
      newValues.push(prevValue);
      for (let k = 0; k < (l * currentFrameDiff) / maxFrameDiff - 2; k++) {
        newValues.push(increment * (k + 1) + prevValue);
      }
      newValues.push(nextValue);
      team.value = newValues;
    }
  }
  // setFrameState({
  //   incr: pointsData[frameState.gameIndex][0].value.length - 1,
  // });
  console.log(frameState.gameIndex);

  useEffect(() => {
    setFrameState({
      ...frameState,
      gameIndex: 0,
      incr: pointsData[0][0].value.length - 1,
    });
  }, [y]);

  useEffect(() => {
    const frameDuration = 200;
    const svg = select(svgRef.current);
    if (frameState.gameIndex < pointsData.length) {
      pointsData[frameState.gameIndex].sort(
        (a, b) => b.value[frameState.incr] - a.value[frameState.incr]
      );

      const yScale = scaleBand()
        .paddingInner(0.1)
        .domain(pointsData[frameState.gameIndex].map((value, index) => index))
        .range([0, 400]);
      const yOffset = 20;

      const xScale = scaleLinear()
        .domain([0, biggestVal])
        .range([0, select(widthDivRef).node().current.clientWidth]);

      svg
        .selectAll(".bar")
        .data(pointsData[frameState.gameIndex], (entry) => entry.name)
        .join("rect")
        .attr("fill", (entry) => entry.color)
        .attr("class", "bar")
        .attr("x", 0)
        .attr("fill-opacity", 0.7)
        .transition()
        .duration(frameDuration)
        .on("end", function () {
          if (play) {
            currentTeamFrame += 1;

            if (
              frameState.incr <
                pointsData[frameState.gameIndex][0].value.length - 1 &&
              currentTeamFrame >= numOfTeams
            ) {
              console.log("Frame " + frameState.incr);
              console.log("GameIndex: " + frameState.gameIndex);
              console.log(
                "Length: " + pointsData[frameState.gameIndex][0].value.length
              );
              currentTeamFrame = 0;
              setFrameState({ ...frameState, incr: frameState.incr + 1 });
            } else if (
              frameState.gameIndex < pointsData.length - 1 &&
              currentTeamFrame >= numOfTeams
            ) {
              setFrameState({
                ...frameState,
                incr: 0,
                gameIndex: frameState.gameIndex + 1,
              });

              currentTeamFrame = 0;
            }
          }
        })
        .ease(easeLinear)
        .attr("width", function (entry, index) {
          console.log("------Game index: " + frameState.gameIndex);
          console.log("------Frame: " + frameState.incr);
          console.log(
            "------Length: " + pointsData[frameState.gameIndex][0].value.length
          );

          return xScale(entry.value[frameState.incr]);
        })
        .attr("y", (entry, index) => yScale(index) + yOffset)
        .attr("height", yScale.bandwidth());
      //console.log(teamColours);

      svg
        .selectAll(".label")
        .data(pointsData[frameState.gameIndex], (entry) => entry.name)
        .join("text")
        .attr("fill", "#f7ce4f")
        .text(
          (entry) =>
            `${entry.name} ${
              Math.round(entry.value[frameState.incr] * 100) / 100
            }`
        )
        .transition()
        .duration(frameDuration)
        .attr("class", "label")
        .attr("x", 10)
        .attr(
          "y",
          (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5 + yOffset
        );

      const chartWidth = select(widthDivRef).node().current.clientWidth;
      const n = pointsData[0].length;
      const barSize = yScale(1);

      var x_axis = axisTop(xScale)
        .ticks(chartWidth / 160)
        .tickSizeOuter(50)
        .tickSizeInner(-barSize * (n + yScale.padding()));

      svg.selectAll("g").remove();
      const g = svg.append("g");
      g.call(x_axis);
      g.attr("transform", "translate(0,16)");
      g.select(".tick:first-of-type text").remove();
      g.selectAll(".tick:not(:first-of-type) line")
        .attr("stroke", "white")
        .attr();
      g.select(".domain").remove();
    }
  });
  //console.log(incr);
  const handleOnChange = (e) => {
    setFrameState({
      ...frameState,
      gameIndex: e.target.value - 1,
      incr: pointsData[e.target.value - 1][0].value.length - 1,
    });

    currentTeamFrame = 0;
    console.log(frameState.incr);
  };

  return (
    <div ref={widthDivRef}>
      <svg
        fontFamily="Roboto Condensed"
        width="100%"
        height="450"
        ref={svgRef}
      ></svg>

      <div>
        <GameSlider>
          <ButtonStyle>
            <button
              className="PauseButton"
              onClick={() => {
                setPlay(!play);
              }}
            >
              {play ? "Pause" : "Start"}
            </button>
          </ButtonStyle>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontFamily: "Roboto Condensed",
              width: "100%",
            }}
          >
            <input
              className="slider"
              style={{ width: "100%", marginTop: "0.75rem" }}
              type="range"
              min={1}
              value={frameState.gameIndex + 1}
              max={pointsData.length}
              onChange={handleOnChange}
            />
            <div style={{ margin: "0.5rem" }}>
              <b>{frameState.gameIndex + 1}</b>{" "}
              {frameState.gameIndex + 1 == 1 ? "Total Game" : "Total Games"}
            </div>
          </div>
        </GameSlider>
      </div>

      <br />
    </div>
  );
};

export default BarChart;
