import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getClassNameFor } from "../Shared/Functions/gameStatsFunctions";
import useSortableData from "Shared/hooks/useSortableData";

const TeamScoreTable = ({
  leftColHeading,
  data,
  bottomRowHeading,
  renderTeamData,
  attr,
  sortConfig,
  handleSort,
  isTeam,
  players,
  includeYear,
}) => {
  const DATA_ATTR = ["ELO Ranking", "ELO Rating", "Standing"];
  const headings = ["ELO Ranking", "ELO Rating", "Standing"];
  const numOfTeamsToDisplay = 10;

  let ObjOfTeams = {};
  Object.keys(data).map((key, scoreIndex) => {
    data[key].map((teamObj, teamIndex) => {
      const teamName = Object.keys(teamObj)[0];
      const score = teamObj[teamName];
      if (teamName in ObjOfTeams === false) {
        ObjOfTeams[teamName] = {};
      }
      if (key === "Standing") {
        ObjOfTeams[teamName][key] = parseFloat(score["PCT"]);
      } else {
        ObjOfTeams[teamName][key] = score;
      }
    });
  });

  console.log(ObjOfTeams);
  function objSlice(obj, lastExclusive) {
    var filteredKeys = Object.keys(obj).slice(0, lastExclusive);
    var newObj = {};
    filteredKeys.forEach(function (key) {
      newObj[key] = obj[key];
    });
    return newObj;
  }

  data = objSlice(ObjOfTeams, numOfTeamsToDisplay);
  const tableRowData = Object.keys(data).map((name, i) => {
    return (
      <div className="table-row" key={i}>
        {DATA_ATTR.map((attr) => {
          let score = "";
          if (attr in data[name]) {
            score = Math.round(parseFloat(data[name][attr]) * 100) / 100;
          } else {
            score = "  -  ";
          }
          return (
            <div key={attr} className="table-data">
              {score}
            </div>
          );
        })}
      </div>
    );
  });

  // const tableRowData = items.map((detail, i) => {
  //   return (
  //     <div className="table-row" key={i}>
  //       {DATA_ATTR.map((attr) => (
  //         <div
  //           key={attr}
  //           className={`${getClassNameFor(attr, sortConfig)} ${topNValues(
  //             attr,
  //             detail
  //           )} table-data`}
  //         >
  //           {renderPlayerData(attr, detail)}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // });

  // Fixed column - name
  const fixedColumn = (items) => {
    return Object.keys(items).map((name, i) => {
      const slug = name.replace(/\s/g, "_");
      return (
        <div className="table-row" key={i}>
          <div className="table-data" key={i}>
            {name}
          </div>
        </div>
      );
    });
  };

  // Table heading
  const tableHeading = (headings) =>
    headings.map((heading, i) => (
      <div key={heading} className="table-data">
        {heading}
        <i className="fas fa-caret-up"></i>
        <i className="fas fa-caret-down"></i>
      </div>
    ));

  return (
    <BoxScoreTableWrapper>
      {/* fixed column */}
      <div className="table name">
        <div className="table-header">
          <div className="table-row">
            <div className="table-data">{leftColHeading}</div>
          </div>
        </div>
        <div className="table-body">{fixedColumn(data)}</div>
      </div>

      <div className="table-scroll">
        <div className="table data">
          <div className="table-header">
            <div className="table-row">{tableHeading(headings)}</div>
          </div>
          <div className="table-body">{tableRowData}</div>
        </div>
      </div>
    </BoxScoreTableWrapper>
  );
};

const BoxScoreTableWrapper = styled.div`
  background: white;
  border: solid gray 1px;
  display: flex;
  margin: 2rem 0 0 0rem;
  user-select: none;

  .table-scroll {
    overflow-x: auto;
    position: relative;
  }
  .table {
    font-family: "Roboto Condensed", sans-serif;
  }
  .table.name,
  .table.name .table-body {
    display: flex;
    flex-direction: column;
    min-width: 11rem;
  }
  .table.name {
    border-right: 1px solid #eee;
  }
  .table-body {
    display: flex;
    flex-flow: row wrap;
  }
  .table-header {
    background: var(--penblue);
    color: var(--white);
    text-transform: uppercase;
    font-size: 0.8rem;
    cursor: pointer;
    display: flex;
    width: 100%;
  }
  .table.data {
    width: 100%;
    min-width: 800px;
    max-width: 1300px;
  }
  .table-row {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #eee;
  }
  .table-header .table-row {
    border-bottom: none;
  }
  .table.name .table-data {
    width: 100%;
  }
  .table.data .table-data {
    text-align: center;
    position: relative;
    width: 100%;
  }
  .table-data {
    padding: 0.5rem;
    overflow: hidden;
    white-space: nowrap;
    font-size: 0.9rem;
    a {
      text-decoration: none;
      color: var(--black);
      &:hover {
        font-weight: bold;
      }
    }
  }
  .table-row.team {
    background: ${({ bottomRowHeading }) =>
      bottomRowHeading ? "rgba(0, 0, 0, 0.05)" : ""};
  }
  .table-row.team .table-data {
    display: ${({ renderTeamData }) => (renderTeamData ? "block" : "none")};
  }

  .table-row .descending.table-data,
  .table-row .ascending.table-data {
    background: rgba(53, 48, 88, 0.05);
  }
  .top-value {
    color: var(--accent);
    font-weight: bold;
  }
  .fa-caret-down,
  .fa-caret-up {
    position: absolute;
    color: #7870b1;
    left: 50%;
    transform: translateX(-50%);
    bottom: -0.2rem;
  }
  .fa-caret-down {
    display: none;
  }
  .descending {
    .fa-caret-up {
      display: none;
    }
    .fa-caret-down {
      display: flex;
    }
  }

  @media (max-width: 1200px) {
    /* .table.data {
      width: 800px;
      overflow-x: auto;
    } */
  }
`;

const mapStateToProps = (state) => ({
  isTeam: state.sidebarReducer.isTeam,
});

export default connect(mapStateToProps)(TeamScoreTable);
