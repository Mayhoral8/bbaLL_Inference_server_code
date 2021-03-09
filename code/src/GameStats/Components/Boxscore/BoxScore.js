import React from 'react'
import { DATA_ATTR, TABLE_HEADINGS, TEAM_DATA_ATTR } from '../../../constants';
import { classNameForTopValues, getClassNameFor, numToMinSec } from 'Shared/Functions/gameStatsFunctions';
import useSortableData from 'Shared/hooks/useSortableData';
import BoxScoreTable from './BoxScoreTable';

const BoxScore = ({ home, selectedGameIndex, info, data }) => {
  // team data attributes
  const teamDataAttr = TEAM_DATA_ATTR;
  TEAM_DATA_ATTR.splice(4, 3, "three_point_field_goals", "three_point_field_goal_attempts", "three_point_field_goal_percentage");
  
  // render Home values when "Home" prop is passed
  const infoDetail = Object.values(home
    ? data[selectedGameIndex]["Home"]
    : data[selectedGameIndex]["Away"]).sort((a, b) => {
      return b["minutes_played"] - a["minutes_played"]
    });
  // sort table data
  const { items, handleSort, sortConfig } = useSortableData(infoDetail);

  // highlight top one or top two values
  const topNValues = (attr, detail) => {
    switch (attr) {
      case 'points':
      case 'box_plus_minus':
      case 'three_points':
      case 'three_point_percentage':
        return classNameForTopValues(items, attr, 2, detail)
      case 'assists':
      case 'total_rebounds':
      case 'blocks':
      case 'steals':
      case 'turnovers':
        return classNameForTopValues(items, attr, 1, detail);
      default:
        return '';
    }
  }

  const renderPlayerData = (attr, detail) => {
    if (attr === 'minutes_played' && detail[attr] !== null) {
      return numToMinSec(detail[attr]);
    } else if (attr === 'minutes_played' && detail[attr] === null) {
      return "DNP";
    } else if (/percentage|rate/g.test(attr) && detail["minutes_played"] !== null) {
      return (detail[attr] * 100).toFixed(1);
    } else {
      return detail[attr];
    }
  }

  // Table data
  const tableRowData = items.map((detail, i) => {
    return (
      <div className='table-row' key={i}>
        {DATA_ATTR.map(attr => (
          <div key={attr} className={`${getClassNameFor(attr, sortConfig)} ${topNValues(attr, detail)} table-data`}>
            {renderPlayerData(attr, detail)}
          </div>
        ))}
      </div>
    )
  });

  // team total data
  const renderTeamData = teamDataAttr.map(attr => (
    <div className='table-data' key={attr}>
      {/percentage|rate/g.test(attr) ? (info[attr] * 100).toFixed(1) : info[attr]}
    </div>
  ));

  return (
    <BoxScoreTable
      leftColHeading="Players"
      data={items}
      bottomRowHeading="Team Totals"
      headings={TABLE_HEADINGS}
      attr={DATA_ATTR}
      handleSort={handleSort}
      sortConfig={sortConfig}
      tableRowData={tableRowData}
      renderTeamData={renderTeamData}
      players
    />
  )
}

export default BoxScore;