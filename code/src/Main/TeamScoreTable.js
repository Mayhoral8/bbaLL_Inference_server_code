import React, { useState, useEffect, useRef } from "react";
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

  const initialSortingType = {
    name: "",
    "ELO Rating": "",
    "Massey Rating": "",
    "Win(%)": "",
  };

  // keeps track of what should ascendingly or descendingly sorted
  const sortingType = useRef({
    name: "",
    "ELO Rating": "",
    "Massey Rating": "",
    "Win(%)": "",
  });

  const numOfTeamsToDisplay = 10;

  const [listOfTeams, setListOfTeams] = useState([]);
  console.log(data);
  let placeholderArray = [];

  useEffect(() => {
    DATA_ATTR.map((key, scoreIndex) => {
      data[key].map((teamObj) => {
        const teamName = Object.keys(teamObj)[0];
        const score = teamObj[teamName];
        let teamIndex;

        let doesObjExist = false;
        for (let i = 0; i < placeholderArray.length; i++) {
          if (placeholderArray[i].name === teamName) {
            teamIndex = i;
            doesObjExist = true;
            break;
          }
        }

        if (doesObjExist === false) {
          placeholderArray.push({ name: teamName });
          teamIndex = placeholderArray.length - 1;
        }
        if (key === "Standing") {
          placeholderArray[teamIndex]["Win(%)"] = parseFloat(score["PCT"]);

          placeholderArray[teamIndex]["rank"] = parseInt(score["rank"]);
        } else {
          placeholderArray[teamIndex][key] = score;
        }
      });
    });

    setListOfTeams(sortTeams(placeholderArray, "rank"));
  }, []);

  console.log(listOfTeams);

  // sorts list by object property given
  function sortTeams(arr, attr) {
    const resetObj = (obj) => {
      Object.keys(obj).forEach((key) => (obj[key] = ""));
    };

    if (attr in sortingType.current) {
      if (sortingType.current[attr].length === 0) {
        sortingType.current = initialSortingType;
        sortingType.current[attr] = "descending";
        console.log("here");
      } else if (sortingType.current[attr] === "descending") {
        sortingType.current = initialSortingType;
        sortingType.current[attr] = "ascending";
      } else if (sortingType.current[attr] === "ascending") {
        sortingType.current = initialSortingType;
        sortingType.current[attr] = "descending";
      }
    }
    console.log(sortingType.current);
    return [...arr].sort((a, b) => {
      // mainly to handle when "rank" prop is missing in json
      // makes sure missing ranks get sorted properly
      const handleMissingProperties = (a, b) => {
        if (!a.hasOwnProperty(attr) && !b.hasOwnProperty(attr)) {
          return 0;
        }
        if (!a.hasOwnProperty(attr)) {
          return 1;
        }
        if (!b.hasOwnProperty(attr)) {
          return -1;
        }
      };

      if (attr === "rank" || sortingType.current[attr] === "ascending") {
        if (!a.hasOwnProperty(attr) || !b.hasOwnProperty(attr)) {
          return handleMissingProperties(a, b);
        }

        return a[attr] - b[attr];
      } else if (sortingType.current[attr] === "descending") {
        if (!a.hasOwnProperty(attr) || !b.hasOwnProperty(attr)) {
          return handleMissingProperties(a, b);
        }
        return b[attr] - a[attr];
      }
    });
  }

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
              <div
                key={attr}
                className={`${sortingType.current[attr]} table-data`}
              >
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
  const tableHeading = (headings) =>
    headings.map((attr, i) => (
      <div
        key={attr}
        className={`${sortingType.current[attr]} table-data`}
        onClick={() => setListOfTeams(sortTeams(listOfTeams, attr))}
      >
        {attr}
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
  margin: 3rem 0 0 0rem;
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
