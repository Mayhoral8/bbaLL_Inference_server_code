import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import {
  changeIsTeam,
  changeStat,
  changeStatCategory,
} from "../../redux/actions/sidebarActions";
import { DropListItem, DropList } from "./smallselect-style";
import MobileSelectDropdown from "./MobileSelectDropdown";
import { Link } from "react-router-dom";
import { doesStatInclude } from "../Functions/doesStatInclude";

const TeamPlayerSelect = ({
  stats,
  changeIsTeam,
  isTeam,
  stat,
  changeStat,
  changeStatCategory,
}) => {
  const yearNames = useSelector((state) => state.sharedReducer.yearNames);
  const yearId = useSelector((state) => state.sharedReducer.yearId);
  const avgTot = useSelector((state) => state.sharedReducer.isTotal);

  const [isDropped, setIsDropped] = useState(false);
  const dropdown = () => setIsDropped(!isDropped);

  const teamOrPlayerLink = (teamOrPlayer) => {
    let link;

    const leaderboardPath = `/leaderboard/${teamOrPlayer}`;

    if (doesStatInclude(["Plus_Minus", "Overall", "Fantasy"], stat)) {
      link = `${leaderboardPath}/points?year=${yearNames[yearId]}&plot=${avgTot}`;
    } else {
      link = `${leaderboardPath}/${stat.toLowerCase()}?year=${
        yearNames[yearId]
      }&plot=${avgTot}`;
    }
    return link;
  };

  const handleIsTeam = (isTeam) => {
    changeStatCategory({ statCategory: "Basic" });
    if (["Plus_Minus", "Overall", "Fantasy"].includes(stat)) {
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
    changeIsTeam({ isTeam: isTeam === "Teams" ? true : false });
    dropdown();
  };

  return (
    <MobileSelectDropdown
      text={isTeam ? "Teams" : "Players"}
      dropdown={dropdown}
      isDropped={isDropped}
      setIsDropped={setIsDropped}
    >
      {isDropped &&
        stats
          .filter((statValue) => statValue !== (isTeam ? "Teams" : "Players"))
          .map((statValue) => (
            <DropListItem
              key={statValue}
              onClick={() => handleIsTeam(statValue)}
            >
              <Link to={teamOrPlayerLink(statValue.toLowerCase())}>{statValue}</Link>
            </DropListItem>
          ))}
    </MobileSelectDropdown>
  );
};

const mapStateToProps = (state) => ({
  stat: state.sidebarReducer.stat,
});

export default connect(mapStateToProps, {
  changeIsTeam,
  changeStatCategory,
  changeStat,
})(TeamPlayerSelect);
