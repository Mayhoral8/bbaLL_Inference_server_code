import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { changeAvgTot } from "Redux/actions/sharedActions";
import { BadgeButton } from "../../globalStyles";
import { AvgTotButtonBoxDiv } from "./avgtotbuttonbox-style";

const AvgTotButtonBox = ({
  isTotal,
  changeAvgTot,
  summary,
  leaderboardPlotOptions,
}) => {
  const { pathname, search } = useLocation();
  const teamOrPlayerPath = pathname.split("/")[2];
  const yearNames = useSelector((state) => state.sharedReducer.yearNames);
  const yearId = useSelector((state) => state.sharedReducer.yearId);
  const isTeam = useSelector((state) => state.sidebarReducer.isTeam);

  let yearPath, extractedPlotType;
  if (search) {
    yearPath = search.split("?")[1].split("&")[0];
    extractedPlotType =
      search.split("&")[1] && search.split("&")[1].split("=")[1];
  }
  let pathIncludingYear;
  if (!pathname.includes(teamOrPlayerPath)) {
    pathIncludingYear = `${pathname}/${
      isTeam ? "teams" : "players"
    }/summary?year=${yearNames[yearId]}`;
  } else {
    pathIncludingYear = `${pathname}?year=${yearNames[yearId]}`;
  }

  const plotPath = (plottype) => {
    return `${pathIncludingYear}&plot=${plottype}`;
  };

  useEffect(() => {
    if (extractedPlotType) {
      plotPath(extractedPlotType);
      changeAvgTot({ isTotal: extractedPlotType });
    }
  }, [location]);

  return (
    <AvgTotButtonBoxDiv>
      {leaderboardPlotOptions.map(({ option, label }) => (
        <BadgeButton
          key={option}
          summary={summary}
          isActive={isTotal === option}
          onClick={() => changeAvgTot({ isTotal: option })}
        >
          <Link to={plotPath(option)}>{label}</Link>
        </BadgeButton>
      ))}
    </AvgTotButtonBoxDiv>
  );
};

const mapStateToProps = (state) => ({
  isTotal: state.sharedReducer.isTotal,
});

export default connect(mapStateToProps, { changeAvgTot })(AvgTotButtonBox);
