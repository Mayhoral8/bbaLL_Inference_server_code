import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { changeStat } from "../../redux/actions/sidebarActions";
import { capitalizeFirstLetter } from "../Functions/capitalizeFirstLetter";
import MobileSelectDropdown from "./MobileSelectDropdown";
import { DropListItem } from "./smallselect-style";

//require numbuttons button vars function
const ButtonBoxSelect = ({ dataArray, stat, season, dataType, time }) => {
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
  const [isDropped, setIsDropped] = useState(false);

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
      changeStat({ stat: capitalizeFirstLetter(statPath) });
    }
  }, [statPath, statCategory, isTeam]);

  const dropdown = () => setIsDropped(!isDropped);

  const handleChange = (stat) => {
    changeStat({ stat: stat });
    dropdown();
  };

  const teamOrPlayerLink = (teamOrPlayer, data) => {
    const pathIncludingStat = `/stats/${teamOrPlayer}/${data.toLowerCase()}`;
    const query0 = search.split("&")[0];
    const query1 = search.split("&")[1];
    const query2 = search.split("&")[2];
    const query3 = search.split("&")[3];
    if (!search.includes("time=") && teamOrPlayer === "players") {
      return `${pathIncludingStat}?year=${yearParams}&${query1}&${query2}&time=${time}`;
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
    <MobileSelectDropdown
      text={stat.replace(/-/g, " ")}
      isDropped={isDropped}
      setIsDropped={setIsDropped}
    >
      {isDropped &&
        dataArray
          .filter((statValue) => statValue !== stat.replace(/_/g, " "))
          .map((data) => (
            <DropListItem onClick={() => handleChange(data)} key={data}>
              <Link to={teamOrPlayerLink(teamOrPlayerPath, data)}>
                {data.replace(/-/g, " ")}
              </Link>
            </DropListItem>
          ))}
    </MobileSelectDropdown>
  );
};

export default ButtonBoxSelect;
