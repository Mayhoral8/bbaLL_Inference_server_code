import React from 'react'
import styled from 'styled-components'
import HomeVsAwayTitle from '../HomeVsAwayTitle/HomeVsAwayTitle';
import StatsBarPlot from './StatsBarPlot';

const GameStatsTable = ({ info }) => {
  const y = ['effective_field_goal_percentage', 'field_goal_percentage', 'three_point_attempt_rate', 'turnovers', 'steals', 'blocks', 'offensive_rebounds', 'total_rebounds', 'assists', 'play_score'];
  const modifiedY = ['PLAY', 'AST', 'REB', 'OREB', 'BLK', 'STL', 'TO', '3P%', 'FG%', 'eFG%'];

  return (
    <GameSummaryTableWrapper>
      <HomeVsAwayTitle home={info.Home.Team} away={info.Away.Team} />

      <div className='bar-graph-container' >
        <StatsBarPlot info={info} y={y} mirror away />
        <ul>
          {[...y].reverse().map((label, i) => {
            const homeValue = info.Home[label];
            const awayValue = info.Away[label];
            const labelWithPercentage = modifiedY[i].split('').includes('%');
            return (
              <li key={label}>
                <span className={`${awayValue > homeValue ? 'highlight' : ''}`}>{labelWithPercentage ? (awayValue * 100).toFixed(1) : awayValue}</span>
                {modifiedY[i]}
                <span className={`${homeValue > awayValue ? 'highlight' : ''}`}>{labelWithPercentage ? (homeValue * 100).toFixed(1) : homeValue}</span>
              </li>
            );
          })}
        </ul>
        <StatsBarPlot info={info} y={y} />
      </div>
    </GameSummaryTableWrapper>
  )
}

const GameSummaryTableWrapper = styled.div`
  list-style: none;
  border-bottom: 1px solid silver;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  .bar-graph-container {
    display: grid;
    grid-template-columns: 1fr 250px 1fr;
    ul {
      margin: 2rem 0; 
    }
    li {
      text-transform: capitalize;
      height: 2.2rem;
      margin-bottom: 0.43rem;
      align-items: center;
      justify-content: center;
      text-align: center;
      white-space: pre-line;
      display: grid;
      grid-template-columns: 60px 1fr 60px;
    }
    span:first-child {
      text-align: left;
    }
    span:last-child {
      text-align: right;
    }
    span {
      font-weight: bold;
    }
    .highlight {
      color: var(--accent);
    }
  }
  @media(max-width: 768px) {
    padding: 0 1rem;
    .bar-graph-container {
      grid-template-columns: 1fr;
      ul {
        margin: 1rem 0;
      }
      li {
        height: 1.7rem;
        font-size: 0.9rem
      }
    }
    .versus {
      margin: 0 4.5rem;
      padding: 0.5rem;
      position: relative;
      font-size: 1rem;
    }
    .versus:before, .versus:after {
      width: 2rem;
    }

  }
`

export default GameStatsTable;