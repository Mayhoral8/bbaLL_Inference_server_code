import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { capitalizeFirstLetter } from "../Functions/capitalizeFirstLetter";
import { Button, ButtonBoxDiv } from "./buttonbox-style";

//require numbuttons button vars function
const ButtonBox = ({
  dataArray,
  buttonFunction,
  isActive,
  hide,
  season,
  dataType,
  time,
}) => {
  // routes
  const history = useHistory();
  const pathname = history.location.pathname;
  const search = history.location.search;
  let teamOrPlayerPath = pathname.split("/")[2];
  const statPath = pathname.split("/")[3];
  let yearParams = search && search.split("=")[1].split("&")[0];

  // states
  const statCategory = useSelector(
    (state) => state.sidebarReducer.statCategory
  );
  const isTeam = useSelector((state) => state.sidebarReducer.isTeam);
  const yearNames = useSelector((state) => state.sharedReducer.yearNames);
  const yearId = useSelector((state) => state.sharedReducer.yearId);

  // check if year exists in url
  if (yearParams === "") {
    yearParams = yearNames[yearId];
  }

  // check if teams/players exists in url
  if (!teamOrPlayerPath) {
    if (statCategory === "Basic" && isTeam) {
      teamOrPlayerPath = "teams";
    } else if (statCategory === "Basic" && !isTeam) {
      teamOrPlayerPath = "players";
    } else if (statCategory === "mvp") {
      teamOrPlayerPath = "mvp";
    } else if (statCategory === "champion") {
      teamOrPlayerPath = "champions";
    }
  }

  useEffect(() => {
    if (statPath) {
      buttonFunction(capitalizeFirstLetter(statPath));
    }
  }, [statPath, statCategory, isTeam]);

  const handleButtonClick = (data) => {
    buttonFunction(data);
  };

  const teamOrPlayerLink = (teamOrPlayer, data) => {
    const pathIncludingStat = `/stats/${teamOrPlayer}/${data.toLowerCase()}`;
    const query0 = search.split("&")[0];
    const query1 = search.split("&")[1];
    const query2 = search.split("&")[2];
    const query3 = search.split("&")[3];
    if (!search.includes("time=") && teamOrPlayer === "players") {
      return `${pathIncludingStat}?year=${yearParams}&type=${dataType.toLowerCase()}&season=${season.toLowerCase()}&time=${time}`;
    } else if (search.includes("type=")) {
      return teamOrPlayer === "mvp" || teamOrPlayer === "champions"
        ? `${pathIncludingStat}${query0}&${query1}`
        : teamOrPlayer === "players"
        ? `${pathIncludingStat}?year=${yearParams}&${query1}&${query2}&${query3}`
        : `${pathIncludingStat}?year=${yearParams}&${query1}&${query2}`;
    } else {
      return teamOrPlayer === "mvp" || teamOrPlayer === "champions"
        ? `${pathIncludingStat}`
        : teamOrPlayer === "players"
        ? `${pathIncludingStat}?year=${yearParams}&type=${dataType.toLowerCase()}&season=${season.toLowerCase()}&time=${time}`
        : `${pathIncludingStat}?year=${yearParams}&type=${dataType.toLowerCase()}&season=${season.toLowerCase()}`;
    }
  };

  return (
    <ButtonBoxDiv hide={hide}>
      {dataArray.map((data) => (
        <Link to={teamOrPlayerLink(teamOrPlayerPath, data)} key={data}>
          <Button
            isActive={data === isActive}
            onClick={() => handleButtonClick(data)}
          >
            {data.replace(/-/g, " ")}
          </Button>
        </Link>
      ))}
    </ButtonBoxDiv>
  );
};

export default ButtonBox;
