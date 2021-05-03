import React from 'react';
import LeaderTable from '../../../Leaderboard/LeaderboardStat/Components/LeaderTable';
import { TableDiv } from '../../../Leaderboard/SharedLeaderboard/rightbox-style';
import { StyledLeaderTable } from "./MatchFacts-styles";

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

export default MatchFactsTable;