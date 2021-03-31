import { select, scaleBand, scaleLinear, max, easeLinear, min } from "d3";
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
  const [gameIndex, setGameIndex] = useState(0);
  const [play, setPlay] = useState(false);
  const [timerID, setTimerID] = useState(null);
  const l = 50;
  const [incr, setIncr] = useState(0);
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
  // console.log(pointsData);
  // console.log(text);
  // console.log(y);
  //console.log(pointsData);
  //console.log(pointsData[0]);
  let maxVal = 0;
  for (let i = 0; i < pointsData.length; i++) {
    let maxcurrent = max(pointsData[i], (entry) => entry.value);
    let mincurrent = min(pointsData[i], (entry) => entry.value);
    if (maxcurrent - mincurrent > maxVal) {
      maxVal = maxcurrent - mincurrent;
      //console.log(i);
    }
  }

  let lastFrameDiff = maxVal;
  // let lastFrameDiff =
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
        (nextValue - prevValue) / (l * (currentFrameDiff / lastFrameDiff));
      const newValues = [];
      newValues.push(prevValue);
      for (let k = 0; k < (l * currentFrameDiff) / lastFrameDiff - 2; k++) {
        newValues.push(increment * (k + 1) + prevValue);
      }
      newValues.push(nextValue);
      team.value = newValues;
    }
  }

  console.log(pointsData);
  // console.log("Gameindex = " + gameIndex);
  // console.log("Incr = " + incr);
  useEffect(() => {
    setGameIndex(0);
    //setIncr(pointsData[gameIndex][0].value.length - 1);
  }, [y]);
  // useEffect(() => {
  //   if (play) {
  //     setTimerID(
  //       setInterval(() => {
  //         setGameIndex((gameIndex) => gameIndex + 1);
  //         //console.log("incremented");
  //       }, 1000)
  //     );
  //   } else if (!play) {
  //     clearInterval(timerID);
  //     setGameIndex((gameIndex) => 0);
  //   }
  // }, [play]);

  useEffect(() => {
    //console.log("update");
    if (gameIndex + 1 > pointsData.length - 1) {
      clearInterval(timerID);
    }

    const svg = select(svgRef.current);
    if (gameIndex < pointsData.length) {
      pointsData[gameIndex].sort((a, b) => b.value[incr] - a.value[incr]);

      const yScale = scaleBand()
        .paddingInner(0.1)
        .domain(pointsData[gameIndex].map((value, index) => index))
        .range([0, 400]);
      //console.log(max(pointsData[gameIndex], (entry) => entry.value));
      const xScale = scaleLinear()
        .domain([0, max(pointsData[gameIndex], (entry) => entry.value[incr])])
        .range([0, select(widthDivRef).node().current.clientWidth]);

      svg
        .selectAll(".bar")
        .data(pointsData[gameIndex], (entry) => entry.name)
        .join("rect")
        .attr("fill", (entry) => entry.color)
        .attr("class", "bar")
        .attr("x", 0)
        .attr("fill-opacity", 0.7)
        .transition()
        .duration(300)
        .on("end", function () {
          if (play) {
            currentTeamFrame += 1;

            if (
              incr < pointsData[gameIndex][0].value.length - 1 &&
              currentTeamFrame >= numOfTeams
            ) {
              console.log("Frame " + incr);
              console.log("GameIndex: " + gameIndex);
              console.log("Length: " + pointsData[gameIndex][0].value.length);
              currentTeamFrame = 0;
              setIncr((incr) => incr + 1);
            } else if (
              gameIndex < pointsData.length - 1 &&
              currentTeamFrame >= numOfTeams
            ) {
              setIncr(0);
              setGameIndex(gameIndex + 1);
              currentTeamFrame = 0;

              // console.log(gameIndex);
              // console.log(incr);
            }
          }
        })
        .ease(easeLinear)
        .attr("width", function (entry, index) {
          console.log("------Game index: " + gameIndex);
          console.log("------Frame: " + incr);
          console.log("------Length: " + pointsData[gameIndex][0].value.length);
          return xScale(entry.value[incr]);
        })
        .attr("y", (entry, index) => yScale(index))
        .attr("height", yScale.bandwidth());
      //console.log(teamColours);

      svg
        .selectAll(".label")
        .data(pointsData[gameIndex], (entry) => entry.name)
        .join("text")
        .attr("fill", "#EEEEEE")
        .text(
          (entry) =>
            `${entry.name} ${Math.round(entry.value[incr] * 100) / 100}`
        )
        .transition()
        .duration(300)
        .attr("class", "label")
        .attr("x", 10)
        .attr(
          "y",
          (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
        );
      //console.log("doing stuf");s
    }
  });
  //console.log(incr);
  const handleOnChange = (e) => {
    setGameIndex(e.target.value - 1);
    //console.log(gameIndex);
    let currentIndex = (gameIndex) => gameIndex;
    setIncr(pointsData[gameIndex][0].value.length - 3);
    currentTeamFrame = 0;
    // console.log(gameIndex);
    // console.log(pointsData[gameIndex][0].value.length - 1);
    console.log(incr);
  };

  return (
    <div ref={widthDivRef}>
      <div></div>

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
              value={gameIndex + 1}
              max={pointsData.length}
              onChange={handleOnChange}
            />
            <div style={{ margin: "0.5rem" }}>
              <b>{gameIndex + 1}</b>{" "}
              {gameIndex + 1 == 1 ? "Total Game" : "Total Games"}
            </div>
          </div>
        </GameSlider>
      </div>

      <br />
      {/* () => setPlay(!play) */}
    </div>
  );
};

export default BarChart;
