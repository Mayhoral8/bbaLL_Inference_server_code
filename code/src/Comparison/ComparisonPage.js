import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Radar } from "react-chartjs-2";
import { rgba } from "polished";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { changeIsTeam } from "../redux/actions/sidebarActions";
import { FullWidthMain } from "../globalStyles";
import ComparisonDropdown from "./ComparisonDropdown";
import SEO from "../Shared/SEO";
import names from "JSON/name.json";
import ComparisonBars from "./ComparisonBars";
import ComparisonYearSelection from "./ComparisonYearSelection";
import GetPlayerImage from "../Individual/Components/GetPlayerImage";
import Versus from "../Shared/Versus/Versus";
import {
  StyledComparisonBanner,
  StyledComparisonBars,
  StyledComparisonOptions,
  StyledComparisonProfile,
  StyledComparisonProfileBlank,
  StyledComparisonProfileElement,
  StyledInfo,
  StyledOptionName,
  StyledOptionsNames,
  StyledOptionsTeams,
  StyledOptionVs,
  StyledRadarCont,
} from "./comparison-style";
import { fbFirestore } from "../App/config";
import { calcPValue } from "../Shared/Functions/calcPValue";
import { avoidColourSets } from "../Shared/Functions/gameStatsFunctions";
import { Argsort } from "../Shared/Functions/Argsort";
import { playerAttributes, abbrPlayerAttributes, ABB2TEAM } from "../constants";
import * as teamColours from "Constants/teamColours";

const teamAttributes = playerAttributes.slice(0, 7);
const abbrTeamAttributes = abbrPlayerAttributes.slice(0, 7);

const ComparisonPage = () => {
  // const [valueOne, setValueOne] = useState("Toronto_Raptors");
  // const [valueTwo, setValueTwo] = useState("Washington_Wizards");
  // const [yearOne, setYearOne] = useState("2019-20");
  // const [yearTwo, setYearTwo] = useState("2019-20");

  // const [valueOne, setValueOne] = useState("Luka_Doncic");
  // const [valueTwo, setValueTwo] = useState("Giannis_Antetokounmpo");
  // const [yearOne, setYearOne] = useState("2019-20");
  // const [yearTwo, setYearTwo] = useState("2019-20");

  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [yearOne, setYearOne] = useState("");
  const [yearTwo, setYearTwo] = useState("");
  const [tempValueOne, setTempValueOne] = useState("");
  const [tempValueTwo, setTempValueTwo] = useState("");
  const [isTwoValuesSelected, setIsTwoValuesSelected] = useState(false);
  const [dataOne, setDataOne] = useState(null);
  const [dataTwo, setDataTwo] = useState(null);

  const [maxYearlyOne, setMaxYearlyOne] = useState(null);
  const [maxYearlyTwo, setMaxYearlyTwo] = useState(null);
  const [minYearlyOne, setMinYearlyOne] = useState(null);
  const [minYearlyTwo, setMinYearlyTwo] = useState(null);

  const [dataType, setDataType] = useState("perGame");

  const [refOne, setRefOne] = useState(null);
  const [refTwo, setRefTwo] = useState(null);

  const [refYearOne, setRefYearOne] = useState(null);
  const [refYearTwo, setRefYearTwo] = useState(null);

  const isTeam = useSelector((state) => state.sidebarReducer.isTeam);
  const attributes = isTeam ? teamAttributes : playerAttributes;
  const abbreviatedAttr = isTeam ? abbrTeamAttributes : abbrPlayerAttributes;

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(changeIsTeam({ isTeam: false }));
    Chart.plugins.unregister(ChartDataLabels);


    if (tempValueOne && tempValueTwo) {
      setValueOne(tempValueOne);
      setValueTwo(tempValueTwo);
    }

    if (valueOne && valueTwo && yearOne && yearTwo) {
      setIsTwoValuesSelected(true);
      getMaxYearlyStatFromfbFirestore(yearOne, isTeam, "optionOne");
      getMaxYearlyStatFromfbFirestore(yearTwo, isTeam, "optionTwo");

      getMinYearlyStatFromfbFirestore(yearOne, isTeam, "optionOne");
      getMinYearlyStatFromfbFirestore(yearTwo, isTeam, "optionTwo");

      getAttrFromFirestore(
        valueOne,
        yearOne,
        "optionOne",
        dataType === "perPoss" ? "perPoss" : "perGame"
      );
      getAttrFromFirestore(
        valueTwo,
        yearTwo,
        "optionTwo",
        dataType === "perPoss" ? "perPoss" : "perGame"
      );
    } else {
      setIsTwoValuesSelected(false);
    }
  }, [
    tempValueOne,
    tempValueTwo,
    valueOne,
    valueTwo,
    yearOne,
    yearTwo,
    isTeam,
    dataType,
  ]);

  const clearValue = (ref) => {
    ref.select.clearValue();
  };

  const handleCompareBetween = (bool) => {
    setValueOne(null);
    setValueTwo(null);
    setYearOne(null);
    setYearTwo(null);
    setTempValueOne(null);
    setTempValueTwo(null);
    setDataOne(null);
    setDataTwo(null);
    setMaxYearlyOne(null);
    setMaxYearlyTwo(null);
    setIsTwoValuesSelected(false);
    clearValue(refOne);
    clearValue(refTwo);
    clearValue(refYearOne);
    clearValue(refYearTwo);
    dispatch(changeIsTeam({ isTeam: bool }));
  };

  const getAttrFromFirestore = (name, year, option, dataType) => {
    fbFirestore
      .collection(isTeam ? "team_statistics" : "player_statistics")
      .doc(name.replace(/_/g, " "))
      .collection("years")
      .doc(year)
      .get()
      .then((snapshot) => {
        if (dataType === "perPoss") {
          if (option === "optionOne") {
            setDataOne(snapshot.data());
          } else {
            setDataTwo(snapshot.data());
          }
        } else {
          if (option === "optionOne") {
            setDataOne(snapshot.data());
          } else {
            setDataTwo(snapshot.data());
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMaxYearlyStatFromfbFirestore = (year, isTeam, option) => {
    fbFirestore
      .collection("max_yearly_stats")
      .doc(year.slice(0, 4))
      .collection("teams_players")
      .doc(isTeam ? "teams_max" : "players_max")
      .get()
      .then((doc) => {
        option === "optionOne"
          ? setMaxYearlyOne(doc.data())
          : setMaxYearlyTwo(doc.data());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMinYearlyStatFromfbFirestore = (year, isTeam, option) => {
    fbFirestore
      .collection("max_yearly_stats")
      .doc(year.slice(0, 4))
      .collection("teams_players")
      .doc(isTeam ? "teams_min" : "players_min")
      .get()
      .then((doc) => {
        option === "optionOne"
          ? setMinYearlyOne(doc.data())
          : setMinYearlyTwo(doc.data());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const normalizeRadarData = (
    maxDataOne,
    maxDataTwo,
    minDataOne,
    minDataTwo,
    data,
    attr,
    minPoss
  ) => {
    const attrLowerCased =
      attr === "Rebounds"
        ? "total_rebounds"
        : attr === "Three Points"
        ? "three_points"
        : attr === "POSS"
        ? "possession"
        : attr === "TrueShootingPCT"
        ? "true_shooting_percentage"
        : attr === "Plus_Minus"
        ? "box_plus_minus"
        : attr.toLowerCase();

    let normalizedValue;
    if (Object.keys(maxDataOne).includes(attrLowerCased)) {
      const maxYearlyOne =
        maxDataOne[attrLowerCased].value - minDataOne[attrLowerCased].value;

      const maxYearlyTwo =
        maxDataTwo[attrLowerCased].value - minDataTwo[attrLowerCased].value;

      if (dataType === "perPoss") {
        normalizedValue =
          ((data[attr].avg / data["POSS"].avg -
            minDataOne[attrLowerCased].value / minPoss) *
            100) /
          (Math.max(maxYearlyOne, maxYearlyTwo) / minPoss);
      } else {
        normalizedValue =
          ((data[attr].avg - minDataOne[attrLowerCased].value) /
            Math.max(maxYearlyOne, maxYearlyTwo)) *
          100;
      }
    } else {
      normalizedValue =
        dataType === "perPoss" ? data[attr].avg * 100 : data[attr].avg;
    }
    return normalizedValue.toFixed(1);
  };

  const getTeamColour = (nameOne, nameTwo, option) => {
    if (!option) {
      return "#000000";
    }
    const colour = avoidColourSets(
      nameOne.replace(/_|\s/g, "").toUpperCase(),
      nameTwo.replace(/_|\s/g, "").toUpperCase()
    );
    return colour[option];
  };

  const getPlayerTeamColour = (data) => {
    const objectKeyName = isTeam ? "name" : "team";
    const team = data && data[objectKeyName].replace(/\s/g, "").toUpperCase();

    return teamColours[team];
  };

  const radarDatasets = () => {
    const colourOne = isTeam
      ? getTeamColour(valueOne, valueTwo, "colourOne")
      : getPlayerTeamColour(dataOne);
    const colourOneHover = isTeam
      ? rgba(getTeamColour(valueOne, valueTwo, "colourOne"), 0.2)
      : getPlayerTeamColour(dataOne) && rgba(getPlayerTeamColour(dataOne), 0.2);
    const colourTwo = isTeam
      ? getTeamColour(valueOne, valueTwo, "colourTwo")
      : getPlayerTeamColour(dataTwo);
    const colourTwoHover = isTeam
      ? rgba(getTeamColour(valueOne, valueTwo, "colourTwo"), 0.2)
      : getPlayerTeamColour(dataTwo) && rgba(getPlayerTeamColour(dataTwo), 0.2);;
    const minPoss =
      dataOne && dataTwo && Math.min(dataOne["POSS"].avg, dataTwo["POSS"].avg);

    const data = {
      labels:
        dataType === "perPoss"
          ? abbreviatedAttr.filter((attr) => attr !== "POSS")
          : abbreviatedAttr,
      datasets: [
        {
          label: valueOne.replace(/_/g, " "),
          backgroundColor: colourOneHover,
          borderColor: colourOne,
          pointBackgroundColor: colourOne,
          pointBorderColor: "#fff",
          pointRadius: 6,
          pointHoverBackgroundColor: colourOneHover,
          pointHoverBorderColor: colourOne,
          data: attributes
            .filter((attr) => (dataType === "perPoss" ? attr !== "POSS" : attr))
            .map(
              (attr) =>
                dataOne &&
                maxYearlyOne &&
                maxYearlyTwo &&
                normalizeRadarData(
                  maxYearlyOne,
                  maxYearlyTwo,
                  minYearlyOne,
                  minYearlyTwo,
                  dataOne,
                  attr,
                  minPoss
                )
            ),
        },
        {
          label: valueTwo.replace(/_/g, " "),
          backgroundColor: colourTwoHover,
          borderColor: colourTwo,
          pointBackgroundColor: colourTwo,
          pointBorderColor: "#fff",
          pointRadius: 6,
          pointHoverBackgroundColor: colourTwoHover,
          pointHoverBorderColor: colourTwo,
          data: attributes
            .filter((attr) => (dataType === "perPoss" ? attr !== "POSS" : attr))
            .map(
              (attr) =>
                dataTwo &&
                maxYearlyOne &&
                maxYearlyTwo &&
                normalizeRadarData(
                  maxYearlyOne,
                  maxYearlyTwo,
                  minYearlyOne,
                  minYearlyTwo,
                  dataTwo,
                  attr,
                  minPoss
                )
            ),
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      scale: {
        pointLabels: { fontSize: 16 },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
      legend: {
        labels: {
          fontSize: 16,
        },
      },
      tooltips: {
        mode: "label",
        callbacks: {
          title: function (tooltipItem, data) {
            return null;
          },
          label: function (tooltipItem, data) {
            const arrayPosition = tooltipItem.datasetIndex === 0 ? 0 : 1;
            return `${data["datasets"][arrayPosition]["label"]}: ${
              data["datasets"][arrayPosition]["data"][tooltipItem["index"]]
            }%`;
          },
        },
      },
    };
    return { data, options };
  };

  const sortComparisonBars = () => {
    const pValueListOne = [];
    const pValueListTwo = [];
    const pValueListThree = [];
    const sortedPValueListOne = [];
    const sortedPValueListTwo = [];
    const sortedPValueListThree = [];
    const pValueThreshold = 80;

    attributes
      .filter((attr) => (dataType === "perPoss" ? attr !== "POSS" : attr))
      .map((attr, index) => {
        if (dataOne && dataTwo) {
          const attrValueOne =
            dataType === "perPoss"
              ? +dataOne[attr].avg / dataOne["POSS"].avg
              : +dataOne[attr].avg;
          const attrValueTwo =
            dataType === "perPoss"
              ? +dataTwo[attr].avg / dataTwo["POSS"].avg
              : +dataTwo[attr].avg;
          const stdValueOne = dataType === "perPoss"? +dataOne[attr].std / dataOne["POSS"].avg :+dataOne[attr].std ;
          const stdValueTwo = dataType === "perPoss"? +dataTwo[attr].std / dataTwo["POSS"].avg :+dataTwo[attr].std ;
          const teamOne = isTeam ? dataOne["name"] : dataOne["team"];
          const teamTwo = isTeam ? dataTwo["name"] : dataTwo["team"];

          const abbrAttr =
            dataType === "perPoss"
              ? abbreviatedAttr.filter((el) => el !== "POSS")[index]
              : abbreviatedAttr[index];

          const pValue = +calcPValue(
            dataOne,
            dataTwo,
            attr,
            valueOne,
            valueTwo,
            isTeam
          )[1];

          if (attrValueOne >= attrValueTwo && +pValue > pValueThreshold) {
            pValueListOne.push({
              group: "one",
              pValue,
              attr,
              abbrAttr,
              attrValueOne,
              attrValueTwo,
              teamOne,
              teamTwo,
              stdValueOne,
              stdValueTwo,
            });
          } else if (
            attrValueTwo >= attrValueOne &&
            +pValue > pValueThreshold
          ) {
            pValueListTwo.push({
              group: "two",
              pValue,
              attr,
              abbrAttr,
              attrValueOne,
              attrValueTwo,
              teamOne,
              teamTwo,
              stdValueOne,
              stdValueTwo,
            });
          } else {
            pValueListThree.push({
              group: "three",
              pValue,
              attr,
              abbrAttr,
              attrValueOne,
              attrValueTwo,
              teamOne,
              teamTwo,
              stdValueOne,
              stdValueTwo,
            });
          }
        }
      });

    Argsort(pValueListOne.map((val) => val.pValue))
      .reverse()
      .map((list) => {
        sortedPValueListOne.push(pValueListOne[list]);
      });
    Argsort(pValueListTwo.map((val) => val.pValue))
      .reverse()
      .map((list) => {
        sortedPValueListTwo.push(pValueListTwo[list]);
      });
    Argsort(pValueListThree.map((val) => val.pValue))
      .reverse()
      .map((list) => {
        sortedPValueListThree.push(pValueListThree[list]);
      });
    return { sortedPValueListOne, sortedPValueListTwo, sortedPValueListThree };
  };

  return (
    <>
      <SEO
        title="NBA teams or players comparison"
        description="Compare between NBA teams or players"
      />
      <FullWidthMain>
        <StyledComparisonBanner>
          <h1>
            Compare your favorite <span>teams</span> or <span>players</span>
          </h1>
        </StyledComparisonBanner>

        <StyledComparisonOptions>
          <StyledOptionsTeams>
            <p>Compare between: </p>
            <li onClick={() => handleCompareBetween(false)} title="players">
              <span className={!isTeam ? "active" : null}>Players</span>
            </li>
            <li onClick={() => handleCompareBetween(true)} title="teams">
              <span className={isTeam ? "active" : null}>Teams</span>
            </li>
          </StyledOptionsTeams>
          <StyledOptionsTeams>
            <p>View stats: </p>
            <li onClick={() => setDataType("perGame")} title="perGame">
              <span className={dataType === "perGame" ? "active" : null}>
                Per Game
              </span>
            </li>
            <li onClick={() => setDataType("perPoss")} title="perPoss">
              <span className={dataType === "perPoss" ? "active" : null}>
                Per Possession
              </span>
            </li>
          </StyledOptionsTeams>
          <StyledOptionsNames>
            <StyledOptionName>
              <div className="form-control">
                <label>Name : </label>
                <ComparisonDropdown
                  options={names}
                  isTeam={isTeam}
                  onChange={(val) => setTempValueOne(val)}
                  prompt={isTeam ? "Enter team name" : "Enter player name"}
                  length="longer"
                  setRef={setRefOne}
                />
              </div>
              <div className="form-control">
                <label>Year : </label>
                <ComparisonYearSelection
                  isTeam={isTeam}
                  onChange={(val) => setYearOne(val)}
                  prompt="Select season"
                  name={tempValueOne}
                  setRef={setRefYearOne}
                />
              </div>
            </StyledOptionName>
            <StyledOptionVs>vs</StyledOptionVs>
            <StyledOptionName>
              <div className="form-control">
                <label>Name : </label>
                <ComparisonDropdown
                  options={names}
                  isTeam={isTeam}
                  onChange={(val) => setTempValueTwo(val)}
                  prompt={isTeam ? "Enter team name" : "Enter player name"}
                  length="longer"
                  setRef={setRefTwo}
                />
              </div>
              <div className="form-control">
                <label>Year : </label>
                <ComparisonYearSelection
                  isTeam={isTeam}
                  onChange={(val) => setYearTwo(val)}
                  prompt="Select season"
                  name={tempValueTwo}
                  setRef={setRefYearTwo}
                />
              </div>
            </StyledOptionName>
          </StyledOptionsNames>
        </StyledComparisonOptions>

        {isTwoValuesSelected ? (
          <StyledComparisonProfile>
            <StyledComparisonProfileElement
              isTeam={isTeam ? "true" : "false"}
              teamColour={getPlayerTeamColour(dataOne)}
            >
              <div className="img-container">
                <GetPlayerImage playerName={valueOne} isTeam={isTeam} />
              </div>
              <StyledInfo margin="left">
                <h3>
                  <Link
                    to={`/${isTeam ? "team" : "player"}/${valueOne.replace(
                      /\s/g,
                      "_"
                    )}`}
                  >
                    {valueOne.replace(/_/g, " ").replace(/,/g, ".")}
                  </Link>
                </h3>
                <p>{yearOne}</p>
              </StyledInfo>
            </StyledComparisonProfileElement>
            <Versus />
            <StyledComparisonProfileElement
              isTeam={isTeam ? "true" : "false"}
              teamColour={getPlayerTeamColour(dataTwo)}
            >
              <StyledInfo margin="right">
                <h3>
                  <Link
                    to={`/${isTeam ? "team" : "player"}/${valueTwo.replace(
                      /\s/g,
                      "_"
                    )}`}
                  >
                    {valueTwo.replace(/_/g, " ").replace(/,/g, ".")}
                  </Link>
                </h3>
                <p>{yearTwo}</p>
              </StyledInfo>
              <div className="img-container">
                <GetPlayerImage playerName={valueTwo} isTeam={isTeam} />
              </div>
            </StyledComparisonProfileElement>
          </StyledComparisonProfile>
        ) : (
          <StyledComparisonProfileBlank>
            Select teams or players to view comparison
          </StyledComparisonProfileBlank>
        )}

        {isTwoValuesSelected && (
          <StyledRadarCont>
            <Radar
              data={radarDatasets().data}
              options={radarDatasets().options}
            />
          </StyledRadarCont>
        )}

        {isTwoValuesSelected && (
          <StyledComparisonBars>
            <div className="bar-group">
              {sortComparisonBars()["sortedPValueListOne"].length > 0 && (
                <p className="bar-heading">
                  <strong>{valueOne.replace(/_/g, " ")} </strong>is better than{" "}
                  <strong>{valueTwo.replace(/_/g, " ")} </strong>with
                  <strong> 80% or greater probability</strong>
                </p>
              )}

              {sortComparisonBars()["sortedPValueListOne"].map(
                (list, index) => (
                  <ComparisonBars
                    key={index}
                    getTeamColour={getTeamColour}
                    listGroup="one"
                    list={list}
                    valueOne={valueOne}
                    valueTwo={valueTwo}
                    bcg="colourOne"
                    dataType={dataType}
                  />
                )
              )}
            </div>
            <div className="bar-group">
              {sortComparisonBars()["sortedPValueListTwo"].length > 0 && (
                <p className="bar-heading">
                  <strong>{valueTwo.replace(/_/g, " ")} </strong>is better than{" "}
                  <strong>{valueOne.replace(/_/g, " ")} </strong>with
                  <strong> 80% or greater probability</strong>
                </p>
              )}
              {sortComparisonBars()["sortedPValueListTwo"].map(
                (list, index) => (
                  <ComparisonBars
                    key={index}
                    getTeamColour={getTeamColour}
                    listGroup="two"
                    list={list}
                    valueOne={valueOne}
                    valueTwo={valueTwo}
                    bcg="colourTwo"
                    dataType={dataType}
                  />
                )
              )}
            </div>
            <div className="bar-group">
              {sortComparisonBars()["sortedPValueListThree"].length > 0 && (
                <p className="bar-heading">
                  Probability is <strong>less than 80%</strong>
                </p>
              )}
              {sortComparisonBars()["sortedPValueListThree"].map(
                (list, index) => (
                  <ComparisonBars
                    key={index}
                    getTeamColour={getTeamColour}
                    listGroup="three"
                    list={list}
                    valueOne={valueOne}
                    valueTwo={valueTwo}
                    bcg={null}
                    dataType={dataType}
                  />
                )
              )}
            </div>
          </StyledComparisonBars>
        )}
      </FullWidthMain>
    </>
  );
};

export default ComparisonPage;
