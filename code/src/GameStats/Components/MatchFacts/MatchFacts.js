import React from 'react';
import styled from 'styled-components';
import MatchFactsPlots from './MatchFactsPlots';
import MatchFactsTable from './MatchFactsTable';
import MatchFactsTitle from './MatchFactsTitle';

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

const StyledPlots = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 4rem;
  border-top: 1px solid #eee;
  position: relative;
  .f-row {
    display: flex;
    padding-top: 8rem;
    justify-content: center;
  }
  .vertical-line {
    width: 2px;
    height: 100%;
    background: #eee;
    margin: auto;
  }
  .team-name {
    text-align: center;
    margin-bottom: 3rem;
  }
  .table-title {
    position: absolute;
    text-transform: uppercase;
    color: var(--lighter-black);
    font-size: 1.2rem;
    background: var(--white);
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    top: -1.7rem;
    padding: 1rem 2rem;
  }
  .legend {
    position: absolute;
    left: 50%;
    top: 1rem;
    transform: translateX(-50%);
    display: flex;
    background: var(--white);
    padding: 1rem 0 2rem;
    .box {
      width: 20px;
      height: 10px;
      margin-right: 0.5rem;
      &.jump {
        background: #4BC0C0;
      }
      &.layup {
        background: #36A2EB;
      }
      &.dunk {
        background: #FFCE56;
      }
      &.hook {
        background: #FF6384;
      }
    }
    .legend-item {
      display: flex;
      align-items: center;
      margin: 0 0.5rem;
    }
    span {
      font-size: 0.8rem;
      color: var(--lighter-black);
    }
  }

  .table-plot-title {
    color: var(--lighter-black);
    font-size: 1.2rem;
    text-align: center;
  }
  
  .mobile-table-title {
    margin-bottom: 1rem;
    span{
      display: none;
    }
  }

  .mobile-plot-title{
    display: flex;
    width: 100%;
    justify-content: space-around;
    position: absolute;
    top: 4rem;
  }

  @media(max-width: 768px) {
    border-top: none;
    margin-top: 2rem;
    .table-title {
      padding: 0;
      white-space: nowrap;
    }
    .table-title.table {
      display: none;
    }
    .legend {
      padding: 1rem 0;
    }
    .mobile-table-title{
      span{
        display: inline-block;
        margin-left: 0.5rem;
      }
    }
  }
  @media(min-width: 768px) {
    grid-template-columns: ${({ plot }) => plot ? '' : '1fr 1rem 1fr'};
  }
`

export default MatchFacts;