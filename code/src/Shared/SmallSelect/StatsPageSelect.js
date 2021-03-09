import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import {
  changeIsTeam,
  changeStat,
  changeStatCategory,
} from "../../redux/actions/sidebarActions";
import { DropListItem } from "./smallselect-style";
import MobileSelectDropdown from "./MobileSelectDropdown";
import { Link, useLocation } from "react-router-dom";
import { doesStatInclude } from "../Functions/doesStatInclude";

const StatsPageSelect = ({
  statCategory,
  changeStat,
  changeStatCategory,
  stat,
  changeIsTeam,
  isTeam,
}) => {
  const [isDropped, setIsDropped] = useState(false);
  const [dropdownText, setDropdownText] = useState("Teams");
  const yearNames = useSelector((state) => state.sharedReducer.yearNames);
  const yearId = useSelector((state) => state.sharedReducer.yearId);

  const dropdown = () => setIsDropped(!isDropped);

  let stats = ["Teams", "Players", "MVP", "Champions"];
  const location = useLocation();
  const searchname = location.search;
  const yearParams = searchname && searchname.split("=")[1].split("&")[0];

  const handleIsTeam = (isTeam) => {
    changeStatCategory({ statCategory: "Basic" });
    if (["+/-", "Overall", "Fantasy"].includes(stat)) {
      changeStat({ stat: "Points" });
    } else if (
      [
        "Defensive_vs_Offensive_Rating",
        "Total_Salary_vs_Winning_%",
        "Salary_vs_+/-",
      ].includes(stat)
    ) {
      changeStat({ stat: "Possession_vs_True_Shooting_%" });
    }
    changeIsTeam({ isTeam: isTeam });
  };

  const handleClick = (statValue) => {
    changeStat({ stat: "Points" });

    if (statValue === "Teams") {
      handleIsTeam(true);
      handleChange("Teams");
    } else if (statValue === "Players") {
      handleIsTeam(false);
      handleChange("Players");
    } else if (statValue === "Champions") {
      handleIsTeam(true);
      handleChange("Champion");
    } else {
      handleIsTeam(false);
      handleChange("MVP");
    }
  };

  const handleChange = (category) => {
    changeStat({ stat: "Points" });

    let modifiedCategory = category;
    if (modifiedCategory === "Teams") {
      modifiedCategory = "Basic";
    } else if (modifiedCategory === "Players") {
      modifiedCategory = "Basic";
    } else {
      modifiedCategory;
    }
    changeStatCategory({ statCategory: modifiedCategory });
    dropdown();
  };

  const renderDropdownText = (statCategory) => {
    let text = statCategory;
    if (statCategory === "Basic" && isTeam) {
      text = "Teams";
    } else if (statCategory === "Basic" && !isTeam) {
      text = "Players";
    }
    return text;
  };

  const linkPath = (stats, includeYearParam) => {
    let link;

    const statsPath = `/stats/${stats}`;

    if (stats === "mvp" || stats === "champions") {
      link = `${statsPath}/points`;
    } else if (
      doesStatInclude(
        [
          "Defensive-Vs-Offensive-Rating",
          "Total-Salary-Vs-Winning-Percentage",
          "Salary-Vs-Plus-Minus",
        ],
        stat
      )
    ) {
      includeYearParam
        ? (link = `${statsPath}/possession-vs-true-shooting-percentage?year=${yearParams}`)
        : (link = `${statsPath}/possession-vs-true-shooting-percentage`);
    } else {
      includeYearParam
        ? (link = `${statsPath}/${stat.toLowerCase()}?year=2020-21`)
        : (link = `${statsPath}/${stat.toLowerCase()}`);
    }
    return link;
  };

  const includeYearParamFn = (statValue) => {
    if (statValue === "mvp" || statValue === "champions") {
      return;
    }
    return true;
  };

  return (
    <MobileSelectDropdown
      text={renderDropdownText(statCategory)}
      dropdown={dropdown}
      isDropped={isDropped}
      setIsDropped={setIsDropped}
    >
      {isDropped &&
        stats.map((statValue) => (
          <DropListItem key={statValue} onClick={() => handleClick(statValue)}>
            <Link to={linkPath(statValue.toLowerCase(), includeYearParamFn(statValue))}>
              {statValue}
            </Link>
          </DropListItem>
        ))}
    </MobileSelectDropdown>
  );
};

const mapStateToProps = (state) => ({
  stat: state.sidebarReducer.stat,
});

export default connect(mapStateToProps, {
  changeStat,
  changeStatCategory,
  changeIsTeam,
})(StatsPageSelect);
