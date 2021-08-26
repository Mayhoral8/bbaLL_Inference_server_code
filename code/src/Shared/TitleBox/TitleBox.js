import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { changeYear } from "Redux/actions/sharedActions";
import { YEARS } from "../../constants";
import TimeLine from "../Timeline/TimeLine";
import { TitleBoxDiv, TitleBoxRightDiv, Title } from "./titlebox-style";
import { getStats } from "../../redux/actions/statsActions";

const TitleBox = ({ stat, title, page, changeYear, pageType, getStats }) => {

  const history = useHistory();
  const location = useLocation();
  const pathname = history.location.pathname;
  const pagePath = pathname.split("/")[1];
  const teamOrPlayerPath = pathname.split("/")[2];

  const searchname = history.location.search;
  const yearNames = useSelector((state) => state.sharedReducer.yearNames);
  const [showTimeline, setShowTimeline] = useState(true);

  const isTeam = useSelector((state) => state.sidebarReducer.isTeam);

  const handleTimeLineChange = (statName, year) => {
    statName = statName.replace(/\s/g, "");
    changeYear({ yearId: year });
    getStats(pageType, yearNames[year])

    let pathIncludingYear;
    if (pagePath === "leaderboard") {
      if (!pathname.includes(teamOrPlayerPath)) {
        pathIncludingYear = `${pathname}/${
          isTeam ? "teams" : "players"
        }/summary?year=${yearNames[year]}`;
      } else {
        pathIncludingYear = `${pathname}?year=${yearNames[year]}`;
      }
    } else {
      pathIncludingYear = `${pathname}?year=${yearNames[year]}`;
    }

    if (searchname.includes("type=")) {
      const query1 = searchname.split("&")[1];
      const query2 = searchname.split("&")[2];
      history.push(`${pathIncludingYear}&${query1}&${query2}`);
    } else if (searchname.includes("plot=")) {
      const query1 = searchname.split("&")[1];
      history.push(`${pathIncludingYear}&${query1}`);
    } else {
      history.push(pathIncludingYear);
    }
  };

  useEffect(() => {
    if (pathname.includes("mvp") || pathname.includes("champions")) {
      setShowTimeline(false);
    } else {
      setShowTimeline(true);
    }

    const yearParamsFromPath =
      location.search.length > 1 && location.search.split("=")[1].split("&")[0];

    if (yearParamsFromPath && /\d/.test(yearParamsFromPath)) {
      const yearIndex = YEARS.indexOf(yearParamsFromPath);
      changeYear({ yearId: yearIndex });
    }
  }, [location]);

  return (
    <TitleBoxDiv page={page}>
      <TitleBoxRightDiv page={page}>
        <Title>{title}</Title>
        {showTimeline && (
          <TimeLine
            handleTimeLineChange={handleTimeLineChange}
            statName={stat}
          />
        )}
      </TitleBoxRightDiv>
    </TitleBoxDiv>
  );
};

const mapStateToProps = (state) => ({
  stat: state.sidebarReducer.stat,
});

export default connect(mapStateToProps, { changeYear, getStats })(TitleBox);
