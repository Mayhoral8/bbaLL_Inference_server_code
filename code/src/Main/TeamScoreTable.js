import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { BoxScoreTableWrapper } from "./teamscoretable-style";

const TeamScoreTable = ({ data }) => {
  // keys found in firebase data
  const DATA_ATTR = ["Massey", "ELO", "Standing"];

  const headings = ["rank", "ELO", "Massey", "Win(%)"];
  try {
    if (data == null) {
    }
  } catch (error) {
    data = {};
  }

  // Reformatts Incoming Data
  DATA_ATTR.map((key) => {
    let arr = [];
    Object.keys(data[key]).map((entry) => {
      const name = Object.keys(data[key][entry])[0];
      arr.push({ [name]: data[key][entry][name] });
    });
    data[key] = arr;
  });

  // Used to Reset sortingType object
  const initialSortingType = {
    rank: "",
    name: "",
    ELO: "",
    Massey: "",
    "Win(%)": "",
  };

  // keeps track of what should ascendingly or descendingly sorted
  // Rank is the default
  const sortingType = useRef({
    rank: "descending",
    name: "",
    ELO: "",
    Massey: "",
    "Win(%)": "",
  });

  // Holds stats of all teams
  const [listOfTeams, setListOfTeams] = useState([]);

  let placeholderArray = [];

  useEffect(() => {
    DATA_ATTR.map((key) => {
      data[key].map((teamObj) => {
        // Mainly restructuring the team data into the format below
        /* Array of objects, each team has own object
        [
          {
            name: "teamName",
            rank: "2",
            ELO: "999",
          },
          {
            name: "teamName",
            rank: "2",
            ELO: "999",
          }
        ];
        */
        const teamName = Object.keys(teamObj)[0];
        const score = teamObj[teamName];
        let teamIndex;

        // checks if a team object has been created in placeholder array
        let doesObjExist = false;
        for (let i = 0; i < placeholderArray.length; i++) {
          if (placeholderArray[i].name === teamName) {
            teamIndex = i;
            doesObjExist = true;
            break;
          }
        }

        // creates team object if one doesn't exist
        if (doesObjExist === false) {
          placeholderArray.push({ name: teamName });
          teamIndex = placeholderArray.length - 1;
        }

        // Adds data to array, special case for adding "Standing" data
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

  // sorts list by object property given
  const sortTeams = (arr, attr) => {
    // sets the new sorting type based on previous type
    if (attr in sortingType.current) {
      // no sorting type was set before, initalize to "desc"
      if (sortingType.current[attr].length === 0) {
        sortingType.current = initialSortingType;
        sortingType.current[attr] = "descending";
      } else if (sortingType.current[attr] === "descending") {
        sortingType.current = initialSortingType;
        sortingType.current[attr] = "ascending";
      } else if (sortingType.current[attr] === "ascending") {
        sortingType.current = initialSortingType;
        sortingType.current[attr] = "descending";
      }
    }
    return [...arr].sort((a, b) => {
      // mainly to handle when "rank" prop is missing in json
      // makes sure missing ranks get sorted properly(i.e. go to bottom of list)
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

      if (sortingType.current[attr] === "ascending") {
        // handles return if 1 prop is missing from object
        if (!a.hasOwnProperty(attr) || !b.hasOwnProperty(attr)) {
          return handleMissingProperties(a, b);
        }

        return a[attr] - b[attr];
      } else if (sortingType.current[attr] === "descending") {
        // handles return if 1 prop is missing from object
        if (!a.hasOwnProperty(attr) || !b.hasOwnProperty(attr)) {
          return handleMissingProperties(a, b);
        }
        return b[attr] - a[attr];
      }
    });
  };

  const tableRowData = listOfTeams.map((obj, i) => {
    return (
      <div className="table-row" key={i}>
        {headings.map((attr) => {
          let value = "";

          // formatting value based on data type
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

  // Fixed column - Team names with links attached to each name
  const fixedColumn = (items) => {
    return items.map((obj, i) => {
      let value = "";
      let link = "";
      if ("name" in obj) {
        value = obj["name"];
        link = `/team/${value.replaceAll(" ", "_")}`;
      } else {
        value = " - ";
      }

      return (
        <div className="table-row" key={i}>
          <div className="table-data" key={i}>
            <a href={link}>{value}</a>
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
        // sorts teams based on the current heading clicked
        onClick={() => setListOfTeams(sortTeams(listOfTeams, attr))}
      >
        {attr}
        <i className="fas fa-caret-up"></i>
        <i className="fas fa-caret-down"></i>
      </div>
    ));

  return (
    <BoxScoreTableWrapper>
      <div className="table-scroll">
        <div className="table name">
          <div className="table-header">
            <div className="table-row">
              <div className="table-data">{"Name"}</div>
            </div>
          </div>
          <div className="table-body">{fixedColumn(listOfTeams)}</div>
        </div>

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

const mapStateToProps = (state) => ({
  isTeam: state.sidebarReducer.isTeam,
});

export default connect(mapStateToProps)(TeamScoreTable);
