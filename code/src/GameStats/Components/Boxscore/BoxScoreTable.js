import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getClassNameFor } from '../../../Shared/Functions/gameStatsFunctions';
import { BoxScoreTableWrapper } from "./BoxScore-style";

const BoxScoreTable = ({ leftColHeading, data, bottomRowHeading, tableRowData, renderTeamData, headings, attr, sortConfig, handleSort, isTeam, players, includeYear }) => {

  // Fixed column - name
  const fixedColumn = items => {
    return items.map((detail, i) => {
      const slug = detail['name'].replace(/\s/g, "_");
      return (
        <div className='table-row' key={i}>
          <div className='table-data' key={i}>
            {
              players
                ? <Link to={`/player/${slug}`}>
                  {detail['name']}
                </Link>
                : <Link to={`/${isTeam ? "team" : "player"}/${slug}`}>
                  {includeYear ? `${+detail['year'].substring(0, 4) + 1} ${detail['name']}` : detail['name']}
                </Link>
            }
          </div>
        </div>
      )
    });
  }

  // Table heading
  const tableHeading = (headings, attr) => headings.map((heading, i) => (
    <div
      key={heading}
      className={`${getClassNameFor(attr[i], sortConfig)} table-data`}
      onClick={() => handleSort(attr[i])}
    >
      {heading}
      <i className="fas fa-caret-up"></i>
      <i className="fas fa-caret-down"></i>
    </div>
  ));

  return (
    <BoxScoreTableWrapper bottomRowHeading={bottomRowHeading} renderTeamData={renderTeamData}>
      {/* fixed column */}
      <div className='table name'>
        <div className='table-header'>
          <div className='table-row'>
            <div className='table-data'>{leftColHeading}</div>
          </div>
        </div>
        <div className='table-body'>
          {fixedColumn(data)}
        </div>
        {/* team header */}
        <div className='table-row team'>
          <div className='table-data'>{bottomRowHeading}</div>
        </div>
      </div>

      {/* player data */}
      <div className='table-scroll'>
        <div className='table data'>
          <div className='table-header'>
            <div className='table-row'>
              {tableHeading(headings, attr)}
            </div>
          </div>
          <div className='table-body'>
            {tableRowData}
            {/* team data */}
            <div className='table-row team'>
              {renderTeamData}
            </div>
          </div>
        </div>
      </div>
    </BoxScoreTableWrapper>
  )
}

const mapStateToProps = (state) => ({
  isTeam: state.sidebarReducer.isTeam,
});

export default connect(mapStateToProps)(BoxScoreTable);