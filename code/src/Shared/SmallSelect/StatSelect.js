import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import {
  changeIndivStat,
  changeStat,
} from "../../redux/actions/sidebarActions";
import { DropListItem } from "./smallselect-style";
import MobileSelectDropdown from "./MobileSelectDropdown";
import { Link, useLocation } from "react-router-dom";

const StatSelect = ({
  stat,
  stats,
  changeStat,
  single,
  changeIndivStat,
  indivStat,
  indiv,
}) => {
  const [isDropped, setIsDropped] = useState(false);
  const isTeam = useSelector((state) => state.sidebarReducer.isTeam);

  const location = useLocation();
  const yearParams =
    location.search && location.search.split("=")[1].split("&")[0];
  const avgTot = useSelector((state) => state.sharedReducer.isTotal);
  const pagePath = location.pathname.split("/")[1];
  const namePath = location.pathname.split("/")[2];
  const indivPath = location.pathname.split("/")[3];

  useEffect(() => {
    if (indiv && indivPath) {
      changeIndivStat({ indivStat: indivPath });
    }
  }, [location]);

  const handleChange = (stat) => {
    if (indiv) {
      changeIndivStat({ indivStat: stat });
    } else {
      changeStat({ stat: stat });
    }
    dropdown();
  };

  const dropdown = () => setIsDropped(!isDropped);

  const linkPath = (statValue) => {
    let link;
    if (pagePath === "leaderboard") {
      link = `/leaderboard/${
        isTeam ? "teams" : "players"
      }/${statValue.toLowerCase()}?year=${yearParams}&plot=${avgTot}`;
      return link;
    } else if (pagePath === "stats") {
      link = `/stats/${
        isTeam ? "teams" : "players"
      }/${statValue.toLowerCase()}?year=${yearParams} `;
    }
  };

  return (
    <MobileSelectDropdown
      text={indiv ? indivStat.replace(/_/g, " ") : stat.replace(/_/g, " ")}
      isDropped={isDropped}
      single={single}
      setIsDropped={setIsDropped}
    >
      {isDropped && indiv
        ? stats
            .filter((statValue) => statValue !== indivStat.replace(/_/g, " "))
            .map((statValue) => {
              return (
                <DropListItem
                  key={statValue}
                  onClick={() => handleChange(statValue)}
                >
                  <Link to={`/${pagePath}/${namePath}/${statValue}`}>
                    {statValue}
                  </Link>
                </DropListItem>
              );
            })
        : stats
            .filter((statValue) => statValue !== stat.replace(/_/g, " "))
            .map((statValue) => {
              return (
                <DropListItem
                  key={statValue}
                  onClick={() => handleChange(statValue)}
                >
                  <Link
                    to={{
                      pathname: linkPath(statValue),
                    }}
                  >
                    {statValue === "Plus Minus" ? "+/-" : statValue}
                  </Link>
                </DropListItem>
              );
            })}
      {isDropped && location.pathname === "/leaderboard" && (
        <DropListItem onClick={() => handleChange("Summary")}>
          <Link to={linkPath("Summary")}>Summary</Link>
        </DropListItem>
      )}
    </MobileSelectDropdown>
  );
};

const mapStateToProps = (state) => ({
  stat: state.sidebarReducer.stat,
  indivStat: state.sidebarReducer.indivStat,
});

export default connect(mapStateToProps, { changeStat, changeIndivStat })(
  StatSelect
);
