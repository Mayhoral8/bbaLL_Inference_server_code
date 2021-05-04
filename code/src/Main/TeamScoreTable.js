import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

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
  const DATA_ATTR = ["Massey Rating", "ELO Rating", "Standing"];
  const headings = ["name", "ELO Rating", "Massey Rating", "Win(%)"];
  const numOfTeamsToDisplay = 10;
  console.log(data);
  let listOfTeams = [];

  DATA_ATTR.map((key, scoreIndex) => {
    data[key].map((teamObj) => {
      const teamName = Object.keys(teamObj)[0];
      const score = teamObj[teamName];
      let teamIndex;

      let doesObjExist = false;
      for (let i = 0; i < listOfTeams.length; i++) {
        if (listOfTeams[i].name === teamName) {
          teamIndex = i;
          doesObjExist = true;
          break;
        }
      }

      if (doesObjExist === false) {
        listOfTeams.push({ name: teamName });
        teamIndex = listOfTeams.length - 1;
      }
      if (key === "Standing") {
        listOfTeams[teamIndex]["Win(%)"] = parseFloat(score["PCT"]);

        listOfTeams[teamIndex]["rank"] = parseInt(score["rank"]);
      } else {
        listOfTeams[teamIndex][key] = score;
      }
    });
  });

  console.log(listOfTeams);

  // remove objects without a rank
  // listOfTeams.forEach((obj, i) => {
  //   if (!obj.hasOwnProperty("rank")) {

  //     console.log(listOfTeams);
  //   } else {
  //     console.log(`${obj.name} ${obj.rank}`);
  //   }
  // });

  // sorts list by object property given
  function sortTeams(arr, attr) {
    arr.sort((a, b) => {
      if (attr === "rank") {
        if (!a.hasOwnProperty(attr) && !b.hasOwnProperty(attr)) {
          return 0;
        }
        if (!a.hasOwnProperty(attr)) {
          return 1;
        }
        if (!b.hasOwnProperty(attr)) {
          return -1;
        }
        return a[attr] - b[attr];
      } else {
        if (!a.hasOwnProperty(attr) && !b.hasOwnProperty(attr)) {
          return 0;
        }
        if (!a.hasOwnProperty(attr)) {
          return 1;
        }
        if (!b.hasOwnProperty(attr)) {
          return -1;
        }
        return b[attr] - a[attr];
      }
    });
    console.log(arr);
    console.log(attr);
  }

  console.log(listOfTeams);
  sortTeams(listOfTeams, "rank");

  const tableRowData = listOfTeams
    .slice(0, numOfTeamsToDisplay)
    .map((obj, i) => {
      return (
        <div className="table-row" key={i}>
          {headings.map((attr) => {
            let value = "";
            if (attr in obj) {
              if (attr === "Win(%)") {
                value = Math.round(parseFloat(obj[attr]) * 100);
              } else if (attr === "name") {
                value = obj[attr];
              } else {
                value = Math.round(parseFloat(obj[attr]) * 100) / 100;
              }
            } else {
              value = "  -  ";
            }
            return (
              <div key={attr} className="table-data">
                {value}
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
    return items.slice(0, numOfTeamsToDisplay).map((obj, i) => {
      let value = "";
      if ("rank" in obj) {
        value = obj["rank"];
      } else {
        value = " - ";
      }
      return (
        <div className="table-row" key={i}>
          <div className="table-data" key={i}>
            {value}
          </div>
        </div>
      );
    });
  };

  // Table heading
  const tableHeading = (headings, attr) =>
    headings.map((heading, i) => (
      <div
        key={heading}
        className="table-data"
        onClick={() => sortTeams(listOfTeams, attr[i])}
      >
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
        <div className="table-body">{fixedColumn(listOfTeams)}</div>
      </div>

      <div className="table-scroll">
        <div className="table data">
          <div className="table-header">
            <div className="table-row">{tableHeading(headings, headings)}</div>
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
