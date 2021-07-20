import React from 'react';
import { Link } from 'react-router-dom';
import { MOBILE_SM_BREAKPOINT } from '../../../constants';
import useWindowSize from '../../../Shared/hooks/useWindowSize';
import { GameSummaryBannerWrapper } from './GameSummary-Styles';

const GameSummaryBanner = ({ homeTeam, awayTeam, children, abbreviatedHomeTeam, abbreviatedAwayTeam }) => {

  const windowSize = useWindowSize();

  return (
    <GameSummaryBannerWrapper>
      <div className='team away'>
        <p className='team-name'>
          <Link to={`/team/${awayTeam.replace(/\s/g, "_")}`}>{windowSize < MOBILE_SM_BREAKPOINT ? abbreviatedAwayTeam : awayTeam}</Link>
        </p>
      </div>

      <div className='game-summary-container'>
        {children}
      </div>

      <div className='team home'>
        <p className='team-name'>
          <Link to={`/team/${homeTeam.replace(/\s/g, "_")}`}>{windowSize < MOBILE_SM_BREAKPOINT ? abbreviatedHomeTeam : homeTeam}</Link>
        </p>
      </div>
    </GameSummaryBannerWrapper>
  )
}

export default GameSummaryBanner;