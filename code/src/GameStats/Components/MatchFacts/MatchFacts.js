import React from 'react';
import MatchFactsPlots from './MatchFactsPlots';
import MatchFactsTable from './MatchFactsTable';
import MatchFactsTitle from './MatchFactsTitle';
import { StyledPlots } from './MatchFacts-styles';

const MatchFacts = ({ leads, ties, fantasy, info, abbreviatedHomeTeam, abbreviatedAwayTeam }) => {

  // home and away info
  const homeTeam = info.Home;
  const awayTeam = info.Away;

  return (
    <>
      <MatchFactsTitle
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        leads={leads}
        ties={ties}
      />

      {/* fantasy table */}
      <StyledPlots>
        <h2 className='table-title table'>Fantasy Ranking</h2>
        <MatchFactsTable
          info={fantasy}
          homeTeamName={abbreviatedHomeTeam}
          awayTeamName={abbreviatedAwayTeam}
        />
      </StyledPlots>

      {/* shot type plots */}
      <StyledPlots plot>
        <h2 className='table-title plots'>Shot Types</h2>
        <div className='legend'>
          <div className='legend-item'>
            <div className='box jump'></div>
            <span>Jump</span>
          </div>
          <div className='legend-item'>
            <div className='box layup'></div>
            <span>Layup</span>
          </div>
          <div className='legend-item'>
            <div className='box dunk'></div>
            <span>Dunk</span>
          </div>
          <div className='legend-item'>
            <div className='box hook'></div>
            <span>Hook</span>
          </div>
        </div>
        <div className='mobile-plot-title table-plot-title'>
          <h4>{abbreviatedAwayTeam}</h4>
          <h4>{abbreviatedHomeTeam}</h4>
        </div>
        <MatchFactsPlots
          info={info}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
        />
      </StyledPlots>
    </>
  );
}

export default MatchFacts;