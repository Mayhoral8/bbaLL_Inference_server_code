import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { List, ListItem } from "../sidebar-style";

const SidebarLeaderboard = ({ stat, isTeam, handleStat }) => {
  const stats = [
    "Points",
    "Rebounds",
    "Assists",
    "Blocks",
    "Steals",
    "Turnovers",
    "Three Points",
    "Plus Minus",
    "Fantasy",
  ];

  const location = useLocation();
  const yearParams =
    location.search && location.search.split("=")[1].split("&")[0];
  const avgTot = useSelector((state) => state.sharedReducer.isTotal);
  const yearNames = useSelector((state) => state.sharedReducer.yearNames);
  const yearId = useSelector((state) => state.sharedReducer.yearId);

  const renderStatNav = (statData) => {
    if (statData === "Three Points") {
      return "3-Points";
    } else if (statData === "Plus Minus") {
      return "+/-";
    } else {
      return statData;
    }
  };

  return (
    <List noMargin>
      {stats.map((statData) => {
        if (
          (statData === "Plus Minus" ||
            statData === "Overall" ||
            statData === "Fantasy") &&
          isTeam
        ) {
          return <div key={statData} style={{ display: "none" }}></div>;
        }

        return (
          <ListItem
            key={statData}
            isActive={stat === statData.replace(/\s/g, "_")}
            onClick={() => handleStat(statData)}
          >
            <Link
              to={`/leaderboard/${
                isTeam ? "teams" : "players"
              }/${statData.toLowerCase()}?year=${
                yearNames[yearId] || yearParams
              }&plot=${avgTot}`}
            >
              {renderStatNav(statData)}
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
};

const mapStateToProps = (state) => ({
  stat: state.sidebarReducer.stat,
  isTeam: state.sidebarReducer.isTeam,
});

export default connect(mapStateToProps)(SidebarLeaderboard);
