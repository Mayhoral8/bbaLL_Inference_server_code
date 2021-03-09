import React from "react";
import { GraphInfoWrapper } from "./graphinfo-style";
import graphInfo from "../../JSON/info.json";

const GraphInfo = ({ plotType, plotType2, nomargin }) => {
  return (
    <GraphInfoWrapper
      data-tooltip={plotType2 ? graphInfo[plotType2] + '\n\n' + graphInfo[plotType] : graphInfo[plotType]
      }
      nomargin={nomargin}
    >
      <i className="fas fa-info-circle"></i>
    </GraphInfoWrapper>
  )
}

export default GraphInfo;