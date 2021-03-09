import React from "react";
import Plot from "react-plotly.js";
import useWindowSize from "../../Shared/hooks/useWindowSize";

export const IndivPlots = ({ data, layout }) => {
  const windowSize = useWindowSize();
  const breakpoint = 500;

  return (
    <Plot
      style={{ width: "100%" }}
      useResizeHandler
      data={data}
      config={{
        displayModeBar: false,
        staticPlot: windowSize < breakpoint ? true : false,
      }}
      layout={layout}
    />
  )
};

export default IndivPlots;