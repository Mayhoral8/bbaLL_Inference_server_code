import { rgba } from "polished";
import React from "react";
import {
  StyledBar,
  StyledBarContainer,
  StyledBarText,
} from "./comparison-style";

const ComparisonBars = ({ listGroup, getTeamColour, list, bcg, dataType }) => {
  const {
    attrValueOne,
    attrValueTwo,
    stdValueOne,
    stdValueTwo,
    pValue,
    teamOne,
    teamTwo,
    abbrAttr,
  } = list;

  const calcBarLength = (valOne, valTwo, option) => {
    let valueOne = valOne;
    let valueTwo = valTwo;
    let negativeValue;
    let max;

    if (valOne < 0 && valTwo < 0) {
      negativeValue = Math.min(valOne, valTwo);
    } else if (valOne < 0) {
      negativeValue = valueOne;
    } else if (valTwo < 0) {
      negativeValue = valueTwo;
    }

    if (valOne < 0 || valTwo < 0) {
      valueOne = +valOne + (1 - +negativeValue);
      valueTwo = +valTwo + (1 - +negativeValue);
      max = valueOne + valueTwo;
    } else {
      valueOne = +valOne;
      valueTwo = +valTwo;
      max = valOne + valTwo;
    }

    let percentage;
    if(valueOne ===0 && valueTwo===0) {
      percentage = 50
    } else {
      percentage =
      ((option === "optionOne" ? valueOne : valueTwo) / max) * 100;
    }
    return percentage.toString();
  };

  const computeBcgOpacity = (listGroup, option) => {
    if (listGroup === "one") {
      return option === "optionOne" ? 1 : 0.2;
    } else if (listGroup === "two") {
      return option === "optionOne" ? 0.2 : 1;
    } else {
      return 0.05;
    }
  };

  const computeBcgColour = (colourOption, option) => {
    const teamColour = getTeamColour(teamOne, teamTwo, colourOption);
    if (!teamColour) {
      return "black";
    }
    return rgba(teamColour, computeBcgOpacity(listGroup, option));
  };

  const computeTextColour = (colour) => {
    const rgb = colour
      .substring(colour.lastIndexOf("(") + 1, colour.lastIndexOf(")"))
      .split(",");

    const brightness = Math.round(
      (parseInt(rgb[0]) * 299 +
        parseInt(rgb[1]) * 587 +
        parseInt(rgb[2]) * 114) /
        1000
    );
    if (rgb[3] < 0.5) {
      return "black";
    }
    return brightness > 125 ? "black" : "white";
  };

  return (
    <StyledBarContainer>
      <StyledBar
        className="bar--left"
        width={calcBarLength(attrValueOne, attrValueTwo, "optionOne")}
        text={computeTextColour(computeBcgColour("colourOne", "optionOne"))}
        bcg={"#207EEC"}
      >
        <p>
          {dataType === "perPoss" ? (attrValueOne * 100).toFixed(1) : attrValueOne.toFixed(1)}
          {" "}± {stdValueOne.toFixed(1)}
        </p>
      </StyledBar>

      <StyledBarText bcg={getTeamColour(teamOne, teamTwo, bcg)}>
        <p>
          <span className='text-bold'>{abbrAttr}</span> - {pValue}% Probability
        </p>
      </StyledBarText>

      <StyledBar
        className="bar--right"
        width={calcBarLength(attrValueOne, attrValueTwo, "optionTwo")}
        text={computeTextColour(computeBcgColour("colourTwo", "optionTwo"))}
        bcg={"#EC2020"}
      >
        <p>
          {dataType === "perPoss" ? (attrValueTwo * 100).toFixed(1) : attrValueTwo.toFixed(1)}
           {" "}± {stdValueTwo.toFixed(1)}
        </p>
      </StyledBar>
    </StyledBarContainer>
  );
};

export default ComparisonBars;
