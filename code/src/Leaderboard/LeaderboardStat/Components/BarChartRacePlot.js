import { select, scaleBand, scaleLinear, max, easeLinear, min } from "d3";
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
  const [incr, setIncr] = useState(0);

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
          value: 0,
          color: teamColours[i],
        };
        pointsData[j].push(obj);
      }
    }
  }
  console.log(pointsData);
  // console.log(text);
  // console.log(y);
  const l = 50;
  //console.log(pointsData[0]);
  for (let i = 0; i < pointsData.length; i++) {
    for (let j = 0; j < pointsData[i].length; j++) {
      let team = pointsData[i][j];
      let prevValue = 0;
      let nextValue = team.value;
      if (i > 0) {
        let prevTeam = pointsData[i - 1][j];
        prevValue = prevTeam.value[prevTeam.value.length - 1];
      }
      const increment = (nextValue - prevValue) / l;
      const newValues = [];
      newValues.push(prevValue);
      for (let k = 0; k < l - 2; k++) {
        newValues.push(increment * (k + 1) + prevValue);
      }
      newValues.push(nextValue);
      team.value = newValues;
    }
  }
  console.log(pointsData);

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
    pointsData[gameIndex].sort((a, b) => b.value[incr] - a.value[incr]);

    const yScale = scaleBand()
      .paddingInner(0.1)
      .domain(pointsData[gameIndex].map((value, index) => index))
      .range([0, 400]);
    //console.log(max(pointsData[gameIndex], (entry) => entry.value));
    const xScale = scaleLinear()
      .domain([0, max(pointsData[gameIndex], (entry) => entry.value[incr])])
      .range([0, 900]);
    console.log(
      //   max(pointsData[gameIndex], (entry) => entry.value[entry.value.length - 1])
      xScale(120)
    );

    svg
      .selectAll(".bar")
      .data(pointsData[gameIndex], (entry) => entry.name)
      .join("rect")
      .attr("fill", (entry) => entry.color)
      .attr("class", "bar")
      .attr("x", 0)
      .transition()
      .duration(500)
      .on("end", function () {
        if (incr < 48) {
          setIncr((incr) => incr + 1);
        } else {
          setIncr(0);
          setGameIndex(gameIndex + 1);
        }
      })
      .ease(easeLinear)
      .attr("width", (entry, index) => xScale(entry.value[incr]))
      .attr("y", (entry, index) => yScale(index))
      .attr("height", yScale.bandwidth());
    console.log(teamColours);

    svg
      .selectAll(".label")
      .data(pointsData[gameIndex], (entry) => entry.name)
      .join("text")
      .attr("fill", "#EEEEEE")
      .text(
        (entry) => `${entry.name} ${Math.round(entry.value[incr] * 100) / 100}`
      )
      .transition()
      .duration(500)
      .attr("class", "label")
      .attr("x", 10)
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
    //console.log("doing stuf");
  });

  const handleOnChange = (e) => {
    setGameIndex(e.target.value - 1);
    setIncr(0);
  };

  return (
    <div>
      <div>
        <input
          style={{ width: "100%" }}
          type="range"
          min={1}
          value={gameIndex + 1}
          max={pointsData.length}
          onChange={handleOnChange}
        />
      </div>

      <br />
      {/* () => setPlay(!play) */}
      <button
        style={{ color: "black" }}
        onClick={() => {
          if (incr < 48) {
            setIncr((incr) => incr + 1);
          } else {
            setIncr(0);
            setGameIndex(gameIndex + 1);
          }
        }}
      >
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
