import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import {
  LeaderPageDiv,
  LeaderMainDiv,
  LeaderSideDiv,
  MobileFilterDiv,
  LeaderAvgTotButtonBox,
} from "./leader-style";
import { YEARS, STATS } from "Constants";
import { FormatYearLengthen } from "Functions/YearFormat.js";
import AvgTotButtonBox from "./SharedLeaderboard/AvgTotButtonBox";
import LeaderRightBox from "./SharedLeaderboard/LeaderRightBox";
import LeaderBoardStat from "./LeaderboardStat/LeaderBoardStat";
import ScrollToTopOnMount from "../Shared/ScrollToTopOnMount";
import Spinner from "../Shared/Spinner/Spinner";
import StatSelect from "../Shared/SmallSelect/StatSelect";
import Summary from "./Summary/Summary";
import TeamPlayerSelect from "../Shared/SmallSelect/TeamPlayerSelect";
import TitleBox from "Shared/TitleBox/TitleBox";
import { useHistory, useLocation } from "react-router-dom";
import { changeIsTeam } from "../redux/actions/sidebarActions";
import { capitalizeFirstLetter } from "../Shared/Functions/capitalizeFirstLetter";

const LeaderPage = () => {
  // hooks
  const history = useHistory();
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();

  // routes
  const plotQueryExists = search.split("&")[1];
  const yearQueryExists = search.split("&")[0];
  const attrPath = pathname.split("/")[3];
  const teamOrPlayerPath = pathname.split("/")[2];
  const plotType = plotQueryExists && plotQueryExists.split("=")[1];
  const yearQuery = yearQueryExists && yearQueryExists.split("=")[1];

  // redux states and query data from fb
  const yearId = useSelector((state) => state.sharedReducer.yearId);
  const isTeam = useSelector((state) => state.sidebarReducer.isTeam);
  const stat = useSelector((state) => state.sidebarReducer.stat);

  // Plot options - buttons
  const leaderboardPlotOptions = [
    { option: "average", label: "Average" },
    { option: "total", label: "Total" },
    { option: "total_poss", label: "Total/Poss" },
    { option: "efficiency", label: "Efficiency" },
  ];

  useEffect(() => {
    if (pathname.split("/")[2] === "teams" || !pathname.split("/")[2]) {
      dispatch(changeIsTeam({ isTeam: true }));
    } else {
      dispatch(changeIsTeam({ isTeam: false }));
    }

    // check for correct route
    if (
      plotQueryExists &&
      !leaderboardPlotOptions.some((plot) => plot.option === plotType)
    ) {
      history.push("/404");
    }
    if (yearQuery && !YEARS.includes(yearQuery)) {
      history.push("/404");
    }
    if (
      (attrPath && attrPath !== "summary") &&
      !STATS.includes(capitalizeFirstLetter(attrPath))
    ) {
      history.push("/404");
    }
    if (
      teamOrPlayerPath &&
      teamOrPlayerPath !== "teams" &&
      teamOrPlayerPath !== "players"
    ) {
      history.push("/404");
    }
  }, [history]);

  const dbLeaderStats = isTeam
    ? "team_leaderboard_stats"
    : "player_leaderboard_stats";
  useFirebaseConnect([{ path: dbLeaderStats }]);

  const json = useSelector(
    (state) => state.firebaseReducer.ordered[dbLeaderStats]
  );

  // conditionally render leadeboard page
  const formatLeader = () => {
    if (stat === "Summary") {
      return <Summary json={json[yearId].value} />;
    } else {
      return (
        <LeaderBoardStat
          statName={stat}
          years={YEARS}
          json={json[yearId].value}
          yearId={yearId}
        />
      );
    }
  };

  const makeTitle = () =>
    FormatYearLengthen(YEARS[yearId]) + " " + stat.replace(/_/g, " ");

  if (!json) {
    return <Spinner />;
  }
  return (
    <>
      <ScrollToTopOnMount />
      <LeaderPageDiv summary={stat === "Summary" ? "summary" : undefined}>
        <LeaderMainDiv>
          <TitleBox title={makeTitle()} page="leaderboard" />
          <MobileFilterDiv>
            <TeamPlayerSelect
              stats={["Teams", "Players"]}
              isTeam={isTeam}
              stat={STATS}
            />
            <StatSelect
              stats={
                isTeam
                  ? STATS.filter(
                      (stat) =>
                        !["Plus Minus", "Fantasy", "Overall"].includes(stat)
                    )
                  : STATS
              }
              stat="Summary"
            />
          </MobileFilterDiv>
          <LeaderAvgTotButtonBox>
            <AvgTotButtonBox leaderboardPlotOptions={leaderboardPlotOptions} />
          </LeaderAvgTotButtonBox>
          {stat !== "Summary" && (
            <LeaderSideDiv mobile>
              <LeaderRightBox stats={json[yearId].value} />
            </LeaderSideDiv>
          )}
          {formatLeader()}
        </LeaderMainDiv>
        {stat === "Summary" ? (
          ""
        ) : (
          <LeaderSideDiv>
            <LeaderRightBox stats={json[yearId].value} />
          </LeaderSideDiv>
        )}
      </LeaderPageDiv>
    </>
  );
};

export default LeaderPage;
