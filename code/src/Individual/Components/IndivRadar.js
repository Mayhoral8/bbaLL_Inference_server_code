import React, { Fragment } from "react";
import Plot from "react-plotly.js";
import logo from "Assets/images/new-logo-square.png";
import { radarStats } from "../individualConstants";
import useWindowSize from "../../Shared/hooks/useWindowSize";

export const IndivRadar = ({ rotation, stats, text, maxYearly }) => {
  const windowSize = useWindowSize();
  const breakpoint = 500;
  
  let margin,
    legendY,
    legendFontSize = 14,
    radialFontSize = 14,
    yearStats = radarStats.map((categoryName, i) => {
      if (Object.keys(maxYearly).includes(categoryName)) {
        return stats[i] / maxYearly[categoryName].value;
      } else return parseFloat(stats[i]);
    });

  const data = [
    {
      type: "scatterpolar",
      mode: "markers+lines+text",
      //r: stats,
      r: yearStats,
      theta: text,
      fill: "toself",
      text: yearStats.map((stat) => stat.toFixed(1) + "%"), //stats -> yearStats
      textposition: [
        "top right",
        "top right",
        "top center",
        "top center",
        "center left",
        "bottom center",
        "center right",
        "top right",
      ],
      textfont: { color: "#1122ff" },
      name: text,
    },
  ];

  legendY = 1.17;
  margin = {
    l: 50,
    r: 55,
    b: 50,
    t: 50,
  };

  return (
    <Fragment>
      <Plot
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
        data={data}
        config={{
          displayModeBar: false,
          responsive: true,
          staticPlot: windowSize < breakpoint ? true : false,
        }}
        layout={{
          images: [
            {
              source: logo,
              xref: "paper",
              yref: "paper",
              x: 0.5,
              y: 0.3,
              sizex: 0.5,
              sizey: 0.3,
              sizing: "stretch",
              opacity: 0.05,
              layer: "below",
            },
          ],
          autosize: true,
          height: "350",
          polar: {
            radialaxis: {
              visible: false,
              range: [0, 100],
            },

            angularaxis: {
              rotation: rotation,
              direction: "counterclockwise",
              tickfont: { size: radialFontSize },
            },
            bgcolor: "rgba(0,0,0,0)",
          },
          showlegend: false,
          legend: {
            x: 0.2,
            y: legendY,
            orientation: "h",
            bgcolor: "rgba(0,0,0,0)",
            font: {
              size: legendFontSize,
            },
          },
          margin: margin,
        }}
      />
    </Fragment>
  );
};

export default IndivRadar;
