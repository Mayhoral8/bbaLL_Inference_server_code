import React from 'react';
import styled from 'styled-components';
import LeaderTable from '../../../Leaderboard/LeaderboardStat/Components/LeaderTable';
import { TableDiv } from '../../../Leaderboard/SharedLeaderboard/rightbox-style';

const MatchFactsTable = ({ info, homeTeamName, awayTeamName }) => {

  // fantasy ranking data
  const getFantasyRankingData = team => {
    const fantasyRankingData = [];
    info[team].Name.forEach((name, i) => {
      const fantasyObj = {};
      fantasyObj.Name = name;
      fantasyObj.value = +info[team].Val[i];
      fantasyRankingData.push(fantasyObj);
    });
    return fantasyRankingData;
  }

  return (
    <>
      <StyledLeaderTable>
        <h4 className='mobile-table-title table-plot-title'>
          {awayTeamName}
          <span>Fantasy Ranking</span></h4>
        <TableDiv>
          <LeaderTable
            stats={getFantasyRankingData('Away')}
            data="value"
            tableRightName="Scores"
          />
        </TableDiv>
      </StyledLeaderTable>
      <div className='vertical-line'></div>
      <StyledLeaderTable>
        <h4 className='mobile-table-title table-plot-title'>
          {homeTeamName}
          <span>Fantasy Ranking</span>
        </h4>

        <TableDiv>
          <LeaderTable
            stats={getFantasyRankingData('Home')}
            data="value"
            tableRightName="Scores"
          />
        </TableDiv>
      </StyledLeaderTable>
    </>
  );
}

const StyledLeaderTable = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding: 2rem 0;

  @media(max-width: 768px) {
    margin-bottom: 3rem;
    padding: 0;
  }
`

export default MatchFactsTable;