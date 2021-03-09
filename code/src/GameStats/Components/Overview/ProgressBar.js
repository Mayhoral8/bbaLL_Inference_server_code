import React from 'react'
import styled from 'styled-components'

const ProgressBar = ({ toggled, scoresProgress, selectedPlotProgress, awayColour, homeColour }) => {
  // render progress value
  const renderProgressValue = (homeValue, awayValue) => {
    const valueObj = {};
    if (homeValue === 0 && awayValue !== 0) {
      valueObj.home = '';
      valueObj.away = awayValue.toFixed(2);
    } else if (homeValue !== 0 && awayValue === 0) {
      valueObj.home = homeValue.toFixed(2);
      valueObj.away = '';
    } else if (homeValue === 0 && awayValue === 0) {
      valueObj.home = 0;
      valueObj.away = 0;
    } else {
      valueObj.home = homeValue.toFixed(2);
      valueObj.away = awayValue.toFixed(2);
    }
    return valueObj
  }

  return (
    <ProgressBarWrapper
      progressbar={toggled ? selectedPlotProgress : scoresProgress}
      homecolour={homeColour}
      awaycolour={awayColour}
    >
      <div className='bar home-bar'>
        <span>{toggled ? renderProgressValue(selectedPlotProgress[0], selectedPlotProgress[1]).home : scoresProgress[0]}</span>
      </div>
      <div className='bar away-bar'>
        <span>{toggled ? renderProgressValue(selectedPlotProgress[0], selectedPlotProgress[1]).away : scoresProgress[1]}</span>
      </div>
    </ProgressBarWrapper>

  )
}

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 2.5rem;
  background: grey;
  display: flex;
  /* margin-bottom: 1rem; */
  .bar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    color: var(--white);
  }

  .home-bar {
    width: ${({ progressbar }) => {
    if (progressbar && (progressbar[0] === 0 && progressbar[1] === 0)) {
      return 50;
    } else if (progressbar) {
      return (progressbar[0] / (progressbar[0] + progressbar[1])) * 100;
    }
  }}%;
    background: ${({ homecolour }) => homecolour && homecolour};
  }

  .away-bar {
    width: ${({ progressbar }) => {
    if (progressbar && (progressbar[0] === 0 && progressbar[1] === 0)) {
      return 50;
    } else if (progressbar) {
      return (progressbar[1] / (progressbar[0] + progressbar[1])) * 100;
    }
  }}%;
    height: 2.5rem;
    background: ${({ awaycolour }) => awaycolour && awaycolour};
  }
`

export default ProgressBar;