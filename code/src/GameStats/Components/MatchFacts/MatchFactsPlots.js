import React from 'react';
import styled from 'styled-components';
import ShotTypeBarPlot from './ShotTypeBarPlot';
import ShotTypeDonutPlot from './ShotTypeDonutPlot';

const MatchFactsPlots = ({ info, homeTeam, awayTeam }) => {

  // create an array of team shot type values
  const quarterlyShotType = (team, type) => {
    const quarterlyArr = [];
    for (let i = 1; i < 6; i++) {
      if (i < 5) {
        quarterlyArr.push(info[`Q${i}`][team][type]);
      } else {
        quarterlyArr.push(info.OT && info.OT[team][type]);
      }
    }
    return quarterlyArr;
  }

  // home and away Q# jump, layup, dunk, hook
  const homeQuarterlyJump = quarterlyShotType('Home', 'jump_made');
  const homeQuarterlyLayup = quarterlyShotType('Home', 'layup_made');
  const homeQuarterlyDunk = quarterlyShotType('Home', 'dunk_made');
  const homeQuarterlyHook = quarterlyShotType('Home', 'hook_made');

  const awayQuarterlyJump = quarterlyShotType('Away', 'jump_made');
  const awayQuarterlyLayup = quarterlyShotType('Away', 'layup_made');
  const awayQuarterlyDunk = quarterlyShotType('Away', 'dunk_made');
  const awayQuarterlyHook = quarterlyShotType('Away', 'hook_made');

  return (
    <StyledMatchFactsPlots>
      <div className='item-1'>
        <ShotTypeDonutPlot
          jump={awayTeam.jump_made}
          layup={awayTeam.layup_made}
          dunk={awayTeam.dunk_made}
          hook={awayTeam.hook_made}
        />
      </div>
      <div className='item-2'>
        <ShotTypeBarPlot
          jump={awayQuarterlyJump}
          layup={awayQuarterlyLayup}
          dunk={awayQuarterlyDunk}
          hook={awayQuarterlyHook}
        />
      </div>
      <div className='vertical-line'></div>
      <div className='item-3'>
        <ShotTypeDonutPlot
          jump={homeTeam.jump_made}
          layup={homeTeam.layup_made}
          dunk={homeTeam.dunk_made}
          hook={homeTeam.hook_made}
        />
      </div>
      <div className='item-4'>
        <ShotTypeBarPlot
          jump={homeQuarterlyJump}
          layup={homeQuarterlyLayup}
          dunk={homeQuarterlyDunk}
          hook={homeQuarterlyHook}
        />
      </div>

    </StyledMatchFactsPlots>
  );
}

const StyledMatchFactsPlots = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 5rem 1fr 1fr;
  grid-template-areas:
    "homeDonut homeBar vline awayDonut awayBar";
  margin: auto;
  margin-top: 8rem;
  .item-1 {
    grid-area: homeDonut;
  }
  .item-2 {
    grid-area: homeBar;
  }
  .vertical-line {
    grid-area: vline;
  }
  .item-3 {
    grid-area: awayDonut;
  }
  .item-4 {
    grid-area: awayBar;
  }
  @media(max-width: 500px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
    "homeDonut awayDonut"
     "homeBar  awayBar";
    grid-gap: 1.5rem;
    width: 100%;
    margin-top: 5rem;
    .vertical-line {
      display:none;
    }
  }
`

export default MatchFactsPlots;