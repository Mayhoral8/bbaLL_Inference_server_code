import React from 'react';
import ShotTypeBarPlot from './ShotTypeBarPlot';
import ShotTypeDonutPlot from './ShotTypeDonutPlot';
import { StyledMatchFactsPlots } from "./MatchFacts-styles";

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

export default MatchFactsPlots;