import React, { Component } from "react";
import { Slider, Rail, Handles, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Tick } from "./Components/TimeLineComponents";
import { connect } from "react-redux";
import { TimeLineDiv } from "./timeline-style";
import { NUMBEROFYEARS } from "Constants";

const domain = [0, NUMBEROFYEARS - 1];
const validValues = [...Array(NUMBEROFYEARS).keys()];
const sliderStyle = {
  position: "relative",
  width: "80%",
};

class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.formatTick = this.formatTick.bind(this);
  }
  formatTick(val) {
    return this.props.yearNames[val];
  }
  onChange(e) {
    this.props.handleTimeLineChange(this.props.statName, e[0]);
  }
  render() {
    return (
      <TimeLineDiv>
        <Slider
          mode={(curr, next) => {
            if (validValues.indexOf(next[0].val) !== -1) {
              return next;
            }

            return curr;
          }}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onChange={this.onChange}
          values={[this.props.yearId]}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles }) => (
              <div className="slider-handles">
                {handles.map((handle) => (
                  <Handle key={handle.id} handle={handle} domain={domain} />
                ))}
              </div>
            )}
          </Handles>

            <Ticks values={validValues}>
              {({ ticks }) => (
                <div className="slider-ticks">
                  {ticks.map((tick) => (
                    <Tick
                      key={tick.id}
                      tick={tick}
                      count={ticks.length}
                      format={this.formatTick}
                    />
                  ))}
                </div>
              )}
            </Ticks>
        </Slider>
      </TimeLineDiv>
    );
  }
}
const mapStateToProps = (state) => ({
  yearId: state.sharedReducer.yearId,
  yearNames: state.sharedReducer.yearNames,
});
export default connect(mapStateToProps)(TimeLine);
