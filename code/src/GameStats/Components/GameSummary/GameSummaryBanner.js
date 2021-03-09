import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MOBILE_SM_BREAKPOINT } from '../../../constants';
import useWindowSize from '../../../Shared/hooks/useWindowSize';

const GameSummaryBanner = ({ homeTeam, awayTeam, children, abbreviatedHomeTeam, abbreviatedAwayTeam }) => {

  const windowSize = useWindowSize();

  return (
    <GameSummaryWrapper>
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
    </GameSummaryWrapper>
  )
}

const GameSummaryWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100%;
  padding: 3rem;
  color: var(--white);
  .image-container {
    width: 40px;
    height: 40px;
    margin: auto;
    margin-bottom: 0.5rem;
    img {
      width:100%;
      height: 100%;
    }
  }
  .team-name {
    font-size: 1.5rem;
    text-align: center;
    a{
      color: var(--white);
      text-decoration: none;
    }
  }
  .game-summary{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h2 {
    font-size: 2.5rem;
  }
  .team {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
  }
  @media(max-width: 768px) {
    padding: 1.5rem;
    .team-name {
      font-size: 1rem;
      text-align: left;
    }
    h2 {
      font-size: 2rem;
      text-align: left;
    }
    .image-container {
      margin: 0;
      margin-bottom: 0.5rem;
    }
    .team.away .image-container {
      margin-left: auto;
    }
    .team.away .team-name {
      text-align: right;
    }
  }
`

export default GameSummaryBanner;