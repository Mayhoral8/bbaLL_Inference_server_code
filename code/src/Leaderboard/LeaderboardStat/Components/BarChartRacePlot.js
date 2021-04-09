import {
  select,
  scaleBand,
  scaleLinear,
  max,
  easeLinear,
  min,
  axisTop,
} from "d3";
import React, { useRef, useEffect, useState } from "react";
import { ButtonStyle } from "./barchartrace-style";

import { UserInputContainer } from "./barchartrace-style";

const BarChart = ({ y, text, teamColours, best_curve, best_name }) => {
  const pointsData = [];
  const svgRef = useRef();
  const widthDivRef = useRef();
  const [play, setPlay] = useState(false);
  const MAXFRAMES = 25; // This is tuneable. The max amount of frames for each game
  const FRAMEDURATION = 200; // This is tuneable. The animation speed for each frame in milliseconds
  const [frameState, setFrameState] = useState({
    currentFrame: 1,
    gameIndex: 0,
  });
  let animationsPlayed = 0;
  let numOfTeams = y.length;
  let maxlength = 0;

  // finds highest number of games
  maxlength = max(y, (entry) => entry.length);

  // constructs 2d array of Games x Teams
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

  // adds the Best bar (as a team) to each game
  for (let i = 0; i < pointsData.length; i++) {
    let best_curve_obj = {
      name: "BEST: " + best_name.split(/[()]+/)[1],
      value: best_curve[i],
      color: "#000000",
    };
    pointsData[i].push(best_curve_obj);
  }
  numOfTeams += 1;

  let biggestVal = 0;
  let maxFrameDiff = 0;
  for (let i = 0; i < pointsData.length; i++) {
    let maxcurrent = max(pointsData[i], (entry) => entry.value);
    let mincurrent = min(pointsData[i], (entry) => entry.value);
    // finds the biggest difference in max - min from all the games
    if (maxcurrent - mincurrent > maxFrameDiff) {
      maxFrameDiff = maxcurrent - mincurrent;
    }
    // biggest value found from all the games
    if (maxcurrent > biggestVal) {
      biggestVal = maxcurrent;
    }
  }

  // replaces the value for each team with an array of values
  // example: previous game value [5]
  //          current game value [15]
  //          [5, 7.5, 10, 12.5, 15]
  // Creating more values make the animation smoother
  for (let i = 0; i < pointsData.length; i++) {
    let currentFrameDiff =
      max(pointsData[i], (entry) => entry.value) -
      min(pointsData[i], (entry) => entry.value);
    for (let j = 0; j < pointsData[i].length; j++) {
      let team = pointsData[i][j];
      let prevValue = 0;
      let nextValue = team.value;

      // finds the value of the previous game
      if (i > 0) {
        let prevTeam = pointsData[i - 1][j];
        prevValue = prevTeam.value[prevTeam.value.length - 1];
      }

      // increments for the array
      const increment =
        (nextValue - prevValue) /
        (MAXFRAMES * (currentFrameDiff / maxFrameDiff));
      const newValues = [];
      newValues.push(prevValue);
      for (
        let k = 0;
        k < (MAXFRAMES * currentFrameDiff) / maxFrameDiff - 2;
        k++
      ) {
        newValues.push(increment * (k + 1) + prevValue);
      }
      newValues.push(nextValue);
      team.value = newValues;
    }
  }

  // resets values when the year changes
  useEffect(() => {
    setFrameState({
      ...frameState,
      gameIndex: 0,
      currentFrame: pointsData[0][0].value.length - 1,
    });
  }, [y]);

  useEffect(() => {
    const svg = select(svgRef.current);

    if (frameState.gameIndex < pointsData.length) {
      // sorts the teams by the values in the currentFrame
      pointsData[frameState.gameIndex].sort(
        (a, b) =>
          b.value[frameState.currentFrame] - a.value[frameState.currentFrame]
      );

      const yScale = scaleBand()
        .paddingInner(0.1)
        .domain(pointsData[frameState.gameIndex].map((value, index) => index))
        .range([0, 400]);
      const yOffset = 20;

      // scales the x-axis to the width of parent div of the svg
      const xScale = scaleLinear()
        .domain([0, biggestVal])
        .range([0, select(widthDivRef).node().current.clientWidth]);

      const barOpacity = 0.7;

      // draws the bars
      svg
        .selectAll(".bar")
        .data(pointsData[frameState.gameIndex], (entry) => entry.name)
        .join("rect")
        .attr("fill", (entry) => entry.color)
        .attr("class", "bar")
        .attr("x", 0)
        .attr("fill-opacity", barOpacity)
        .transition()
        .duration(FRAMEDURATION)
        .on("end", function () {
          if (play) {
            animationsPlayed += 1;

            if (
              frameState.currentFrame <
                pointsData[frameState.gameIndex][0].value.length - 1 &&
              animationsPlayed >= numOfTeams
            ) {
              animationsPlayed = 0;
              setFrameState({
                ...frameState,
                currentFrame: frameState.currentFrame + 1,
              });
            } else if (
              frameState.gameIndex < pointsData.length - 1 &&
              animationsPlayed >= numOfTeams
            ) {
              setFrameState({
                ...frameState,
                currentFrame: 0,
                gameIndex: frameState.gameIndex + 1,
              });

              animationsPlayed = 0;
            }
          }
        })
        .ease(easeLinear)
        .attr("width", function (entry, index) {
          // console.log("------Game index: " + frameState.gameIndex);
          // console.log("------Frame: " + frameState.currentFrame);
          // console.log(
          //   "------Length: " + pointsData[frameState.gameIndex][0].value.length
          // );

          return xScale(entry.value[frameState.currentFrame]);
        })
        .attr("y", (entry, index) => yScale(index) + yOffset)
        .attr("height", yScale.bandwidth());

      // draws the labels
      svg
        .selectAll(".label")
        .data(pointsData[frameState.gameIndex], (entry) => entry.name)
        .join("text")
        .attr("fill", "#EEEEEE")
        .text(
          (entry) =>
            `${entry.name} ${
              Math.round(entry.value[frameState.currentFrame] * 100) / 100
            }`
        )
        .transition()
        .duration(FRAMEDURATION)
        .attr("class", "label")
        .attr("x", 10)
        .attr(
          "y",
          (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5 + yOffset
        );

      const chartWidth = select(widthDivRef).node().current.clientWidth;
      const barSize = yScale(1);

      // axis for the ticks
      var xAxis = axisTop(xScale)
        .ticks(chartWidth / 160)
        .tickSizeOuter(50)
        .tickSizeInner(-barSize * (numOfTeams + yScale.padding()));

      // draws the ticks axis
      svg.selectAll("g").remove();
      const g = svg.append("g");
      g.call(xAxis);
      g.attr("transform", "translate(0,16)");
      g.select(".tick:first-of-type text").remove();
      g.selectAll(".tick:not(:first-of-type) line")
        .attr("stroke", "white")
        .attr();
      g.select(".domain").remove();
    }
  });

  // handles setting values when slider
  const handleOnChange = (e) => {
    setFrameState({
      ...frameState,
      gameIndex: e.target.value - 1,
      currentFrame: pointsData[e.target.value - 1][0].value.length - 1,
    });

    animationsPlayed = 0;
  };

  return (
    <div ref={widthDivRef}>
      <b>
        <svg
          fontFamily="Roboto Condensed"
          width="100%"
          height="450"
          ref={svgRef}
        ></svg>
      </b>
      <div>
        <UserInputContainer>
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
        </UserInputContainer>
      </div>

      <br />
    </div>
  );
};

export default BarChart;
