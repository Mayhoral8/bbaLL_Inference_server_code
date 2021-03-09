import React, { useState, Fragment, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import { changeYear } from "../redux/actions/sharedActions";
import {
  changeIsTeam,
  changeStat,
  changeStatCategory,
} from "../redux/actions/sidebarActions";
import { preprocessBasicData, preprocessChampNmvpData } from "./StatsHelper";
import { ButtonsAndSearchBox, GraphInfoDiv } from "./stats-style";
import { ContainerCard } from "../globalStyles";
import { MobileFilterDiv } from "../Leaderboard/leader-style";
import * as CONSTANTS from "../constants/index";
import * as STATSCONSTANTS from "./statsConstants";
import TitleBox from "../Shared/TitleBox/TitleBox";
import StatButtons from "./Components/StatButtons";
import StatsPlot from "./Components/StatsPlot";
import StatsBar from "./Components/StatsBar";
import ButtonBox from "../Shared/ButtonBox/ButtonBox";
import Spinner from "../Shared/Spinner/Spinner";
import GraphInfo from "../Shared/GraphInfo/GraphInfo";
import StatSelect from "../Shared/SmallSelect/StatSelect";
import StatsPageSelect from "../Shared/SmallSelect/StatsPageSelect";
import StatsTable from "./Components/StatsTable";
import ScrollToTopOnMount from "../Shared/ScrollToTopOnMount";
import { useHistory, useLocation } from "react-router-dom";
import { capitalizeFirstLetter } from "../Shared/Functions/capitalizeFirstLetter";
import ButtonBoxSelect from "../Shared/SmallSelect/ButtonBoxSelect";

const PLAYERTIMEINDEX = 4;
const PLAYERTIMEMAX = 5;

const StatsPage = ({
  isTeam,
  changeYear,
  width,
  height,
  stat,
  statCategory,
  changeStat,
  yearId,
  changeStatCategory,
  changeIsTeam,
}) => {
  const [season, setSeason] = useState("Regular");
  const [dataType, setDataType] = useState("Graphs");
  // minutes = [35, 100]
  const [minutes, setMinutes] = useState([
    STATSCONSTANTS.PLAYERTIME[season][PLAYERTIMEINDEX] - 0.5,
    STATSCONSTANTS.PLAYERTIME[season][PLAYERTIMEMAX],
  ]);
  const [time, setTime] = useState("35+");
  const yearNames = useSelector((state) => state.sharedReducer.yearNames);

  // routes
  const history = useHistory();
  const location = useLocation();
  const yearQueryExists = location.search.split("&")[0].includes("year=");
  const buttonPillQuery1 = location.search.split("&")[1];
  const buttonPillQuery2 = location.search.split("&")[2];
  const playerTime = location.search.split("&")[3];
  const query1 = buttonPillQuery1 && buttonPillQuery1.split("=")[1];
  const query2 = buttonPillQuery2 && buttonPillQuery2.split("=")[1];
  const playerTimeQuery = playerTime && playerTime.split("=")[1];
  const yearQuery =
    yearQueryExists && location.search.split("&")[0].split("=")[1];
  const attrPath = location.pathname.split("/")[3];
  const teamOrPlayerPath = location.pathname.split("/")[2];

  useEffect(() => {
    //changeStatCategory({ statCategory: "Basic" });
    changeStat({ stat: "Points" });
    let seasonPath;
    let dataTypePath;
    if (statCategory === "Basic") {
      const secondQueryParam = location.search.split("&")[1];
      const thirdQueryParam = location.search.split("&")[2];
      if (secondQueryParam && thirdQueryParam) {
        if (!secondQueryParam.includes("type")) {
          seasonPath = secondQueryParam.split("=")[1];
          dataTypePath = thirdQueryParam.split("=")[1];
        } else {
          seasonPath = thirdQueryParam.split("=")[1];
          dataTypePath = secondQueryParam.split("=")[1];
        }
        setSeason(capitalizeFirstLetter(seasonPath));
        setDataType(capitalizeFirstLetter(dataTypePath));
      }
    } else {
      if (teamOrPlayerPath === "mvp") {
        changeStatCategory({ statCategory: "MVP" });
        changeIsTeam({ isTeam: false });
      } else if (teamOrPlayerPath === "champions") {
        changeStatCategory({ statCategory: "Champion" });
        changeIsTeam({ isTeam: true });
      }
      const firstQueryParam = location.search.split("&")[0];
      const secondQueryParam = location.search.split("&")[1];
      if (firstQueryParam && secondQueryParam) {
        if (!firstQueryParam.includes("type")) {
          seasonPath = firstQueryParam.split("=")[1];
          dataTypePath = secondQueryParam.split("=")[1];
        } else {
          seasonPath = secondQueryParam.split("=")[1];
          dataTypePath = firstQueryParam.split("=")[1];
        }
        setSeason(capitalizeFirstLetter(seasonPath));
        setDataType(capitalizeFirstLetter(dataTypePath));
      }
    }

    if (
      attrPath &&
      !STATSCONSTANTS.STATS[
        teamOrPlayerPath === "teams" ? "BasicTeam" : "BasicPlayer"
      ].includes(capitalizeFirstLetter(attrPath.replace('_', ' ')))
    ) {
      history.push("/404");
    }
    if (
      teamOrPlayerPath &&
      !["teams", "players", "mvp", "champions"].includes(teamOrPlayerPath)
    ) {
      history.push("/404");
    }
    if (
      buttonPillQuery1 &&
      buttonPillQuery2 &&
      (!["table", "graphs", "regular", "playoffs"].includes(query1) ||
        !["table", "graphs", "regular", "playoffs"].includes(query2))
    ) {
      history.push("/404");
    }

    if (yearQuery && !yearNames.includes(yearQuery)) {
      history.push("/404");
    }

    if (
      playerTime &&
      !STATSCONSTANTS.minuteButtonArray(season).some((e) =>
        playerTimeQuery.includes(e.label)
      )
    ) {
      console.log('5')
      history.push("/404");
    }
  }, [history, statCategory]);

  let dbCollName;
  if (statCategory === "Basic") {
    dbCollName = isTeam ? "team_stats_page" : "player_stats_page";
  } else {
    dbCollName = isTeam ? "champion_stats_page" : "mvp_stats_page";
  }
  // connect to firebase
  useFirebaseConnect([{ path: dbCollName }]);
  let statData = useSelector(
    (state) => state.firebaseReducer.ordered[dbCollName]
  );
  if (statData === undefined) {
    return <Spinner />;
  }
  // check if playoffs data exist
  const playoffsExist = typeof statData[yearId].value["Playoffs"] === "object";

  statData =
    statCategory === "Basic"
      ? statData[yearId].value[season]
      : statData.map((year) => {
          return year.value[season];
        });

  const makeStatsPlot = () => {
    let names = [],
      statY = [],
      statX = [],
      textFontSize = [],
      colours = [],
      plotWidth = width,
      plotHeight = height * STATSCONSTANTS.PLOTHEIGHTPC,
      category = stat.replace(/_/g, " ");

    let xlabel = STATSCONSTANTS.XAXISTITLE[0];
    let ylabel = STATSCONSTANTS.YAXISTITLE[0] + stat;
    const modifiedYLabel = ylabel.replace(/\_/g, " ");

    if (statData) {
      if (statCategory === "Basic") {
        [
          statX,
          statY,
          names,
          colours,
          textFontSize,
          xlabel,
          ylabel,
        ] = preprocessBasicData(statData, category, stat, isTeam, minutes);
      } else {
        [
          statX,
          statY,
          names,
          colours,
          textFontSize,
          xlabel,
          ylabel,
        ] = preprocessChampNmvpData(statData, category, stat, isTeam, season);
      }
    }

    const renderStatsTable = () => {
      const tableHeadings = isTeam
        ? STATSCONSTANTS.STATS["BasicTeam2"]
        : STATSCONSTANTS.STATS["BasicPlayer2"];
      const tableHeadingsAbbr = isTeam
        ? STATSCONSTANTS.STATS["BasicTeam2Abbrev"]
        : STATSCONSTANTS.STATS["BasicPlayer2Abbrev"];
      if (statX.length !== 0) {
        if (statCategory === "Basic" && isTeam) {
          return (
            <StatsTable
              data={statData}
              tableHeadings={tableHeadings}
              tableHeadingsAbbr={tableHeadingsAbbr}
              isTeam={isTeam}
              leftColHeading="Team"
            />
          );
        } else if (statCategory === "Basic" && !isTeam) {
          return (
            <StatsTable
              data={statData}
              tableHeadings={tableHeadings}
              tableHeadingsAbbr={tableHeadingsAbbr}
              leftColHeading="Players"
            />
          );
        } else if (statCategory === "Champion") {
          return (
            <StatsTable
              data={statData}
              tableHeadings={tableHeadings}
              tableHeadingsAbbr={tableHeadingsAbbr}
              isTeam={isTeam}
              includeYear
              leftColHeading="Champions"
            />
          );
        } else if (statCategory === "MVP") {
          return (
            <StatsTable
              data={statData}
              tableHeadings={tableHeadings}
              tableHeadingsAbbr={tableHeadingsAbbr}
              includeYear
              leftColHeading="MVP"
            />
          );
        }
      }
      return <h3>Playoffs have not started yet.</h3>;
    };

    const displayClassName =
      statX.reduce((a, b) => a + b, 0) === 0 ? "hide" : "show";

    // graph info description
    const graphInfo1 =
      stat === "Points" || stat === "Three Points"
        ? "stats_avg_dstd"
        : "stats_avg_std";

    let graphInfo2;
    let graphInfo2Arr;
    if ((statCategory === "Basic" && isTeam) || statCategory === "Champion") {
      graphInfo2Arr = [
        "Points",
        "REB",
        "AST",
        "BLK",
        "STL",
        "TOV",
        "three_points",
        "",
        "",
        "",
      ];
    } else if (
      (statCategory === "Basic" && !isTeam) ||
      statCategory === "MVP"
    ) {
      graphInfo2Arr = [
        "Points",
        "REB",
        "AST",
        "BLK",
        "STL",
        "TOV",
        "three_points",
        "Plus_Minus",
        "Fantasy",
        "",
        "",
      ];
    }

    CONSTANTS.STATS.forEach((el, i) => {
      let attr = el;
      if (/\s/.test(attr)) {
        attr = attr.replace(/\s/, "_");
      }
      if (attr === stat) {
        return (graphInfo2 = graphInfo2Arr[i]);
      }
    });

    return (
      <div>
        {dataType === "Table" ? (
          renderStatsTable()
        ) : statX.length === 0 ? (
          <h3>Playoffs have not started yet.</h3>
        ) : (
          <>
            <ContainerCard
              className={`${displayClassName} m-1`}
              style={{
                display: `${
                  statX.reduce((a, b) => a + b, 0) === 0 ? "none" : "block"
                }`,
              }}
            >
              <GraphInfoDiv>
                <GraphInfo plotType={graphInfo1} plotType2={graphInfo2} />
                <StatsPlot
                  x={statX}
                  y={statY}
                  names={names}
                  yaxis={`Average ${stat}`}
                  vWidth={width}
                  textFontSize={textFontSize}
                  teamColours={colours}
                  xAxisTitle={xlabel}
                  yAxisTitle={modifiedYLabel}
                  isTeam={isTeam}
                  statCategory={statCategory}
                  stat={stat}
                />
              </GraphInfoDiv>
            </ContainerCard>
            <ContainerCard className="m-1">
              <GraphInfoDiv>
                <GraphInfo plotType="stats_avg" />
                <StatsBar
                  x={names}
                  y={statY}
                  teamColours={colours}
                  yAxisTitle={modifiedYLabel}
                  barPlotWidth={plotWidth}
                  barPlotHeight={plotHeight}
                />
              </GraphInfoDiv>
            </ContainerCard>
            <ContainerCard
              className="m-1"
              style={{
                display: `${
                  statX.reduce((a, b) => a + b, 0) === 0 ? "none" : "block"
                }`,
              }}
            >
              <GraphInfoDiv>
                <GraphInfo
                  plotType={
                    stat === "Points" || stat === "Three_Points"
                      ? "stats_downside_volatility"
                      : "stats_volatility"
                  }
                />
                <StatsBar
                  x={names}
                  y={statX}
                  teamColours={colours}
                  yAxisTitle={xlabel}
                  barPlotWidth={plotWidth}
                  barPlotHeight={plotHeight}
                />
              </GraphInfoDiv>
            </ContainerCard>
          </>
        )}
      </div>
    );
  };

  const makeTitle = () => {
    const originalStat = stat;
    const smallCaseVsStat = originalStat.replace("Vs", "vs");
    return (
      //eg. 2019-2020 Points
      CONSTANTS.YEARS[yearId].substring(0, 5) +
      "20" +
      CONSTANTS.YEARS[yearId].substring(5) +
      " " +
      smallCaseVsStat.replace(/-|_/g, " ")
    );
  };

  // Get attribute menu list
  let attribute_menu = statCategory;
  let title;

  if (isTeam && statCategory === "Champion") {
    attribute_menu = STATSCONSTANTS.STATS.Champion;
    title = statCategory + " - " + stat.replace("Vs", "vs").replace(/-|_/g, " ");
  } else if (!isTeam && statCategory === "MVP") {
    attribute_menu = STATSCONSTANTS.STATS.MVP;
    title = statCategory + " - " + stat.replace("Vs", "vs").replace(/-|_/g, " ");
  } else if (isTeam && statCategory === "Basic") {
    attribute_menu = STATSCONSTANTS.STATS.BasicTeam;
    title = makeTitle();
  } else {
    attribute_menu = STATSCONSTANTS.STATS.BasicPlayer;
    title = makeTitle();
  }

  return (
    <Fragment>
      <ScrollToTopOnMount />
      <TitleBox title={title} page="stats" statCategory={statCategory} />
      {/* Mobile */}
      <MobileFilterDiv>
        <StatsPageSelect
          statData={statData}
          statCategory={statCategory}
          isTeam={isTeam}
        />
      </MobileFilterDiv>
      <MobileFilterDiv>
        <ButtonBoxSelect
          isTeam={isTeam}
          time={time}
          dataArray={attribute_menu.filter((stat) => {
            if (isTeam) {
              return !["Plus-Minus"].includes(stat);
            } else {
              return stat;
            }
          })}
          stat={stat}
          season={season}
          dataType={dataType}
        />
      </MobileFilterDiv>
      {/* Desktop */}
      <ButtonBox
        hide
        isTeam={isTeam}
        time={time}
        isActive={stat.replace(/_/g, " ")}
        buttonFunction={(data) => changeStat({ stat: data })}
        dataArray={attribute_menu.filter((stat) => {
          if (isTeam) {
            return !["Plus-Minus"].includes(stat);
          } else {
            return stat;
          }
        })}
        season={season}
        dataType={dataType}
      />

      <ButtonsAndSearchBox>
        <StatButtons
          statCategory={statCategory}
          season={season}
          dataType={dataType}
          minutes={minutes}
          setTime={setTime}
          time={time}
          handleSeason={(data) => {
            setSeason(data);
            setMinutes([
              STATSCONSTANTS.PLAYERTIME[data][PLAYERTIMEINDEX] - 0.5,
              STATSCONSTANTS.PLAYERTIME[data][PLAYERTIMEMAX],
            ]);
          }}
          handleDataType={(type) => setDataType(type)}
          handleMinutes={(min, max) => setMinutes([min, max])}
          isTeam={isTeam}
          playoffsExist={playoffsExist}
        />
      </ButtonsAndSearchBox>
      {makeStatsPlot()}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  width: state.sharedReducer.width,
  height: state.sharedReducer.height,
  yearId: state.sharedReducer.yearId,
  stat: state.sidebarReducer.stat,
  statCategory: state.sidebarReducer.statCategory,
  isTeam: state.sidebarReducer.isTeam,
});

export default connect(mapStateToProps, {
  changeYear,
  changeStat,
  changeStatCategory,
  changeIsTeam,
})(StatsPage);