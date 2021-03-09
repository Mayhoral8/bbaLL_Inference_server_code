import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import {
  changeStat,
  changeIsTeam,
  changeStatCategory,
} from "Redux/actions/sidebarActions";
import { SidebarContainer, List, ListItem } from "./sidebar-style";
import { SidebarSelector } from "./Components/SidebarSelector";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../Functions/capitalizeFirstLetter";
import { doesStatInclude } from "../Functions/doesStatInclude";

const Sidebar = ({ changeStat, changeStatCategory, changeIsTeam, stat }) => {
  // states
  const [active, setActive] = useState(0);
  const yearNames = useSelector((state) => state.sharedReducer.yearNames);
  const yearId = useSelector((state) => state.sharedReducer.yearId);

  // routes
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const searchname = location.search;
  const path = pathname.split("/")[1];
  const teamOrPlayerPath = pathname.split("/")[2] && pathname.split("/")[2];
  const yearParams = searchname && searchname.split("=")[1].split("&")[0];

  useEffect(() => {
    if (teamOrPlayerPath === "teams") {
      dispatch(changeIsTeam({ isTeam: true }));
      setActive(0);
    } else if (teamOrPlayerPath === "players") {
      dispatch(changeIsTeam({ isTeam: false }));
      setActive(1);
    } else if (teamOrPlayerPath === "champions") {
      dispatch(changeStatCategory({ statCategory: "Champion" }));
      setActive(3);
    } else if (teamOrPlayerPath === "mvp") {
      dispatch(changeStatCategory({ statCategory: "MVP" }));
      setActive(2);
    }
    const attrPath = location.pathname.split("/")[3];

    if (attrPath) {
      handleStat(capitalizeFirstLetter(attrPath));
    }
  }, [location]);

  // Leaderboard page
  const handleStat = (stat) => changeStat({ stat });

  const handleIsTeam = (isTeam, index) => {
    changeStatCategory({ statCategory: "Basic" });
    if (doesStatInclude(["Plus-Minus", "Overall", "Fantasy"], stat)) {
      changeStat({ stat: "Points" });
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
      changeStat({ stat: "Possession-Vs-True-Shooting-Percentage" });
    }
    changeIsTeam({ isTeam: isTeam });
    setActive(index);
  };

  // Stats page
  const handleChange = (category, index) => {
    changeStat({ stat: "Points" });
    changeStatCategory({ statCategory: category });
    setActive(index);
  };

  const teamOrPlayerLink = (teamOrPlayer, includeYearParam) => {
    let link;

    const leaderboardPath = `/leaderboard/${teamOrPlayer}`;
    const statPath = `/stats/${teamOrPlayer}`;

    if (path === "leaderboard") {
      if (doesStatInclude(["Plus_Minus", "Overall", "Fantasy"], stat)) {
        link = `${leaderboardPath}/points?year=${yearNames[yearId]}`;
      } else {
        link = `${leaderboardPath}/${stat.toLowerCase()}?year=${
          yearNames[yearId]
        }`;
      }
    } else if (path === "stats") {
      if (teamOrPlayer === "mvp" || teamOrPlayer === "champions") {
        link = `${statPath}/points`;
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
          ? (link = `${statPath}/possession-vs-true-shooting-percentage?year=${yearParams}`)
          : (link = `${statPath}/possession-vs-true-shooting-percentage`);
      } else if (doesStatInclude(["Plus-Minus", "Overall", "Fantasy"], stat)) {
        includeYearParam
          ? (link = `${statPath}/points?year=${yearParams}`)
          : (link = `${statPath}/points`);
      } else {
        includeYearParam
          ? (link = `${statPath}/${stat.toLowerCase()}?year=2020-21`)
          : (link = `${statPath}/${stat.toLowerCase()}`);
      }
    }
    return link;
  };

  return (
    <SidebarContainer>
      {!["player", "team"].includes(path) ? (
        <List>
          <ListItem
            isActive={active === 0}
            onClick={() => handleIsTeam(true, 0)}
          >
            <Link to={teamOrPlayerLink("teams", true)}>Teams</Link>
          </ListItem>

          <ListItem
            isActive={active === 1}
            onClick={() => handleIsTeam(false, 1)}
          >
            <Link to={teamOrPlayerLink("players", true)}>Players</Link>
          </ListItem>

          {path === "stats" && (
            <>
              <ListItem
                isActive={active === 2}
                onClick={() => {
                  handleIsTeam(false);
                  handleChange("MVP", 2);
                }}
              >
                <Link to={teamOrPlayerLink("mvp", false)}>MVP</Link>
              </ListItem>
              <ListItem
                isActive={active === 3}
                onClick={() => {
                  handleIsTeam(true);
                  handleChange("Champion", 3);
                }}
              >
                <Link to={teamOrPlayerLink("champions", false)}>Champions</Link>
              </ListItem>
            </>
          )}
          {path === "stats" ? "" : <span>|</span>}
        </List>
      ) : (
        <></>
      )}
      <SidebarSelector location={path} handleStat={handleStat} />
    </SidebarContainer>
  );
};

const mapStateToProps = (state) => ({
  stat: state.sidebarReducer.stat,
  isTeam: state.sidebarReducer.isTeam,
});

export default connect(mapStateToProps, {
  changeStat,
  changeIsTeam,
  changeStatCategory,
})(Sidebar);
