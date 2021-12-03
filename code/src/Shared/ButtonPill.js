import React from "react";
import { BadgeButton } from "../globalStyles";
import { Link, useLocation } from "react-router-dom";
import { AvgTotButtonBoxDiv } from "../Leaderboard/SharedLeaderboard/avgtotbuttonbox-style";
import { useSelector } from "react-redux";

const ButtonPill = ({
  onClickAction,
  dataArr,
  isActive,
  flexStart,
  customStyle,
  playoffsExist,
  additionalQueryParam,
  queryParam,
  time,
}) => {
  const { pathname, search } = useLocation();
  const searchPath = search;
  const pagePath = pathname.split("/")[1];
  const statSidebarPath = pathname.split("/")[2];

  // states
  const isTeam = useSelector((state) => state.sidebarReducer.isTeam);
  const yearNames = useSelector((state) => state.sharedReducer.yearNames);
  const yearId = useSelector((state) => state.sharedReducer.yearId);
  const attr = useSelector((state) => state.sidebarReducer.stat);

  const linkPath = (data) => {
    let link;
    if (statSidebarPath === "mvp" || statSidebarPath === "champions") {
      link = `${pathname}?${additionalQueryParam}&${queryParam}=${data.toLowerCase()}`;
      return link;
    }
    if (searchPath && statSidebarPath === "players") {
      const yearPath = searchPath.split("?")[1].split("&")[0];
      link = `${pathname}?${yearPath}&${additionalQueryParam.toLowerCase()}&${queryParam}=${data.toLowerCase()}&time=${time}`;
      return link;
    }
    if (searchPath) {
      const yearPath = searchPath.split("?")[1].split("&")[0];
      link = `${pathname}?${yearPath}&${additionalQueryParam.toLowerCase()}&${queryParam}=${data.toLowerCase()}`;
      return link;
    }
    if (pagePath === "stats" && pathname.split("/").length === 2) {
      link = `${pathname}/${
        isTeam ? "teams" : "players"
      }/${attr.toLowerCase()}?${
        yearNames[yearId]
      }&${additionalQueryParam.toLowerCase()}&${queryParam}=${data.toLowerCase()}`;
      return link;
    }
  };

  const handleButtonClick = (data) => {
    onClickAction(data);
  };

  return (
    <div style = {{display: "flex"}}>
      {dataArr.map((data) => {
        const disabled = data === "Playoffs" && !playoffsExist;

        return (
            <BadgeButton
              key={data}
              isActive={data === isActive}
              onClick={() => handleButtonClick(data)}
              disabled={disabled}
            >
              {yearNames.length - 1 === yearId && data === "Playoffs" ? (
                <span>{data}</span>
              ) : (
                <Link to={linkPath(data)} className = "buttonTitle">{data}</Link>
              )}
            </BadgeButton>
        );
      })}
    </div>
  );
};

export default ButtonPill;
