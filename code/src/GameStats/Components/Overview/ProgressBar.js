import React from 'react'
import { ProgressBarWrapper } from "./Overview-styles";;

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

export default ProgressBar;