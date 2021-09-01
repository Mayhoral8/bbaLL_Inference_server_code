import React, { Fragment, useEffect, useState } from "react";
import * as CONSTANTS from "../statsConstants";
import {
  MinuteButton,
  StatButtonBoxWrapper,
  StatButtonPillsContainer,
} from "../stats-style";
import ButtonPill from "../../Shared/ButtonPill";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const StatButtons = ({
  statCategory,
  season,
  dataType,
  handleSeason,
  handleMinutes,
  isTeam,
  handleDataType,
  playoffsExist,
  setTime,
  time,
  setActiveMin,
  activeMin
}) => {
  // routes
  const history = useHistory();
  const { pathname, search } = useLocation();
  const pagePath = pathname.split("/")[1];
  const yearPath = search.split("&")[0];
  const timePath =
    search.includes("time=") &&
    search.split("&")[search.split("&").length - 1].split("=")[1];

  // states
  
  const yearNames = useSelector((state) => state.sharedReducer.yearNames);
  const yearId = useSelector((state) => state.sharedReducer.yearId);
  const attr = useSelector((state) => state.sidebarReducer.stat);

  useEffect(() => {
    if (timePath) {
      const timeIndex = CONSTANTS.minuteButtonArray(season).findIndex(
        (e) => e.path === timePath
      );
      let btnsArray = CONSTANTS.minuteButtonArray(season)
      let targetBtn = btnsArray[timeIndex]
      setActiveMin(timeIndex + 1);
      handleMinutes(targetBtn.handleMinutes1, targetBtn.handleMinutes2)
    } else {
      setActiveMin(5);
      if(season === 'Regular'){
        handleMinutes(34.5, 99.5);
      }
      else{
        handleMinutes(37.5, 99.5);
      }
    }
  }, [history]);

  // link path
  let link;
  const linkPath = (time) => {
    if (pagePath === "stats" && pathname.split("/").length === 2) {
      link = `${pathname}/players/${attr.toLowerCase()}?year=${
        yearNames[yearId]
      }&type=${dataType.toLowerCase()}&season=${season.toLowerCase()}&time=${time}`;
      return link;
    } else if (search.includes("&time=")) {
      link = `${pathname}${yearPath}&season=${season.toLowerCase()}&type=${dataType.toLowerCase()}&time=${time}`;
      return link;
    } else {
      link = `${pathname}${search}&time=${time}`;
      return link;
    }
  };

  const minuteButtonBox = () => {
    if (!isTeam && statCategory !== "MVP") {
      return (
        <StatButtonBoxWrapper>
          <h3>Timeline (min)</h3>
          <div className="timeline-container">
            <div className="timeline"></div>
            {CONSTANTS.minuteButtonArray(season).map((button, index) => (
              <Link
                to={linkPath(button.path)}
                onClick={() => setTime(button.path)}
                key={index}
              >
                <div
                  className={`circle ${
                    activeMin === index + 1 ? "active" : "inactive"
                  }`}
                  onClick={() => {
                    setActiveMin(index + 1);
                    handleMinutes(button.handleMinutes1, button.handleMinutes2);
                  }}
                >
                  <MinuteButton>{button.label}</MinuteButton>
                </div>
              </Link>
            ))}
          </div>
        </StatButtonBoxWrapper>
      );
    }
  };

  return (
    <Fragment>
      <StatButtonPillsContainer>
        <ButtonPill
          flexStart={!isTeam ? "flexStart" : ""}
          isActive={dataType}
          dataArr={["Graphs", "Table"]}
          onClickAction={handleDataType}
          customStyle={{ marginRight: "1rem" }}
          additionalQueryParam={`season=${season}`}
          queryParam="type"
          time={time}
        />
        <ButtonPill
          flexStart={!isTeam ? "flexStart" : ""}
          isActive={season}
          dataArr={["Regular", "Playoffs"]}
          onClickAction={handleSeason}
          playoffsExist={playoffsExist}
          additionalQueryParam={`type=${dataType}`}
          queryParam="season"
          time={time}
        />
      </StatButtonPillsContainer>
      {minuteButtonBox()}
    </Fragment>
  );
};

export default StatButtons;
