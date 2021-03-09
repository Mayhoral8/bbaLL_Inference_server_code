import React, { Fragment } from "react";
import PropTypes from "prop-types";
import basketball from "Assets/images/basketball.png";
import {
  RailOuterStyle,
  RailDotted,
  SliderBallDiv,
  SliderBall,
  TickCircle,
  TickNameDiv,
} from "./timelinecomponents-style";
// *******************************************************
// RAIL
// *******************************************************

export function SliderRail({ getRailProps }) {
  return (
    <Fragment>
      <RailOuterStyle {...getRailProps()} />
      <RailDotted />
    </Fragment>
  );
}

SliderRail.propTypes = {
  getRailProps: PropTypes.func.isRequired,
};

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
export function Handle({ domain: [min, max], handle: { value, percent } }) {
  return (
    <Fragment>
      <SliderBallDiv
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        percent={percent}
      >
        <SliderBall src={basketball} alt="Selected" />
      </SliderBallDiv>
    </Fragment>
  );
}

Handle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
};
// *******************************************************
// TICK COMPONENT
// *******************************************************
export function Tick({ tick, count, format }) {
  return (
    <div>
      <TickCircle percent={tick.percent} />
      <TickNameDiv percent={tick.percent} count={count}>
        {format(tick.value)}
      </TickNameDiv>
    </div>
  );
}

Tick.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  count: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired,
};

Tick.defaultProps = {
  format: (d) => d,
};
