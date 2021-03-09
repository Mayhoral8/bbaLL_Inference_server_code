import React from "react";
import { connect } from "react-redux";
import SidebarIndiv from "./SidebarIndiv";
import SidebarLeaderboard from "./SidebarLeaderboard";

export const SidebarSelector = ({ location, isTeam, stat, handleStat }) => {
  if (location.match(/[Ss]tats/)) {
    return '';
  } else if (["team", "player"].includes(location)) {
    return <SidebarIndiv />;
  }
  return (
    <SidebarLeaderboard stat={stat} isTeam={isTeam} handleStat={handleStat} />
  );
};

const mapStateToProps = (state) => ({
  stat: state.sidebarReducer.stat,
  isTeam: state.sidebarReducer.isTeam,
});

export default connect(mapStateToProps)(SidebarSelector);
