import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import GetPlayerImage from "../Individual/Components/GetPlayerImage";
import Versus from "../Shared/Versus/Versus";
import { Radar } from "react-chartjs-2";
import { rgba } from "polished";
import { Argsort } from "../Shared/Functions/Argsort";
import { calcPValue } from "../Shared/Functions/calcPValue";
import { avoidColourSets } from "../Shared/Functions/gameStatsFunctions";
import {
    StyledComparisonProfileBlank,
    StyledComparisonProfile,
    StyledComparisonProfileElement,
    StyledInfo,
    StyledPlayerInfoAndSwitches,
    StyledPlayerInfo,
    StyleButton,
    StyledRadarCont,
    StyledComparisonBars
} from "./StatisticsInfoemation-style";
import { playerAttributes, abbrPlayerAttributes } from "../constants";
import ComparisonBars from "./ComparisonBars";
import CompareSideInfo from "./CompareSideInfo";

const lightBule = "#207EEC";
const lightRed = "#EC2020";

const StatisticsInformation = (props) => {
    const isTwoValuesSelected = props.isTwoValuesSelected;
    const isTeam = props.isTeam;
    const leftSelectedName = props.leftSelectedName;
    const leftSelectedYear = props.leftSelectedYear;
    const rightSelectedName = props.rightSelectedName;
    const rigthSelectedYear = props.rigthSelectedYear;
    const dataType = props.dataType;
    const dataOne = props.dataOne;
    const dataTwo = props.dataTwo;
    const maxYearlyOne = props.maxYearlyOne;
    const maxYearlyTwo = props.maxYearlyTwo;
    const minYearlyOne = props.minYearlyOne;
    const minYearlyTwo = props.minYearlyTwo;
    const maxOverallYears = props.maxOverallYears;
    const minOverallYears = props.minOverallYears;

    const [statistic, setStatistic] = useState(true);
    const [whoIsBetter, setWhoIsBetter] = useState(false);

    const teamAttributes = playerAttributes.slice(0, 7);
    const abbrTeamAttributes = abbrPlayerAttributes.slice(0, 7);
    const attributes = isTeam ? teamAttributes : playerAttributes;
    const abbreviatedAttr = isTeam ? abbrTeamAttributes : abbrPlayerAttributes;

    function radarDatasets(){
        const lightBuleHover = rgba(lightBule, 0.2);
        const lightRedHover = rgba(lightRed, 0.2);
        const minPoss = 
            dataOne && dataTwo && Math.min(dataOne["POSS"].avg, dataTwo["POSS"].avg);

        const data = {
            labels:
                dataType === "perPoss"
                ? abbreviatedAttr.filter((attr) => attr !== "POSS")
                : abbreviatedAttr,
            datasets: [
                {
                    label: leftSelectedName.replace(/_/g, " "),
                    backgroundColor: lightBuleHover,
                    borderColor: lightBule,
                    pointBackgroundColor: lightBule,
                    pointBorderColor: "#fff",
                    pointRadius: 6,
                    pointHoverBackgroundColor: lightBuleHover,
                    pointHoverBorderColor: lightBule,
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
                                maxOverallYears,
                                minOverallYears,
                                dataOne,
                                attr,
                                minPoss
                            )
                        ),
                },

                {
                    label: rightSelectedName.replace(/_/g, " "),
                    backgroundColor: lightRedHover,
                    borderColor: lightRed,
                    pointBackgroundColor: lightRed,
                    pointBorderColor: "#fff",
                    pointRadius: 6,
                    pointHoverBackgroundColor: lightRedHover,
                    pointHoverBorderColor: lightRed,
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
                                maxOverallYears,
                                minOverallYears,
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

    function normalizeRadarData (
        maxDataOne,
        maxDataTwo,
        minDataOne,
        minDataTwo,
        maxDataOverall,
        minDataOverall,
        data,
        attr,
        minPoss
      ) {
        //console.log(attr);
        
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
    
          const maxYearlyOverall = 
            maxDataOverall[attrLowerCased].value - minDataOverall[attrLowerCased].value;
          
    
          if (dataType === "perPoss") {
            normalizedValue =
              ((data[attr].avg / data["POSS"].avg -
                minDataOne[attrLowerCased].value / minPoss) *
                100) /
              (Math.max(maxYearlyOne, maxYearlyTwo) / minPoss);
          } else {
            normalizedValue =
              ((data[attr].avg - minDataOne[attrLowerCased].value) / maxYearlyOverall ) *100;
              // Math.max(maxYearlyOne, maxYearlyTwo)
          }
        } else {
          normalizedValue =
            dataType === "perPoss" ? data[attr].avg * 100 : data[attr].avg;
        }
        return normalizedValue.toFixed(1);
    };

    function sortComparisonBars() {
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
                leftSelectedName,
                rightSelectedName,
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

    function getTeamColour(nameOne, nameTwo, option){
        if (!option) {
          return "#000000";
        }
        const colour = avoidColourSets(
          nameOne.replace(/_|\s/g, "").toUpperCase(),
          nameTwo.replace(/_|\s/g, "").toUpperCase()
        );
        return colour[option];
    };

    function switchDisplay(num) {
        if (num == 1) {
          setStatistic(true);
          setWhoIsBetter(false);
        } else {
          setStatistic(false);
          setWhoIsBetter(true);
        }
    };

    return(
        <>
            {isTwoValuesSelected ? (
                <StyledComparisonProfile>
                    <StyledComparisonProfileElement 
                        isTeam = {isTeam ? "true" : "false"}
                        teamColour = {lightBule}>
                            <div className="img-container">
                                <GetPlayerImage playerName={leftSelectedName} isTeam={isTeam}/>
                            </div>
                            <StyledInfo margin="left">
                                <h3>
                                    <Link
                                        to={`/${isTeam ? "team" : "player"}/
                                        ${leftSelectedName.replace(/\s/g,"_")}`}>
                                        {leftSelectedName.replace(/_/g, " ").replace(/,/g, ".")}
                                    </Link>
                                </h3>
                                <p>{leftSelectedYear}</p>
                            </StyledInfo>
                    </StyledComparisonProfileElement>
                    <Versus />
                    <StyledComparisonProfileElement
                        isTeam={isTeam ? "true" : "false"}
                        teamColour={lightRed}>
                        <StyledInfo margin="right">
                            <h3>
                                <Link
                                    to={`/${isTeam ? "team" : "player"}/
                                    ${rightSelectedName.replace(/\s/g,"_")}`}>
                                    {rightSelectedName.replace(/_/g, " ").replace(/,/g, ".")}
                            </Link>
                        </h3>
                        <p>{rigthSelectedYear}</p>
                        </StyledInfo>
                        <div className="img-container">
                        <GetPlayerImage playerName={rightSelectedName} isTeam={isTeam} />
                        </div>
                    </StyledComparisonProfileElement>
                </StyledComparisonProfile>
            ) : (
                <StyledComparisonProfileBlank>
                    Select teams or players to view comparison
                </StyledComparisonProfileBlank>
            )}

            {isTwoValuesSelected && (
                <StyledPlayerInfoAndSwitches>
                    <StyledPlayerInfo location={"left"}>
                    <CompareSideInfo isTeam = {isTeam ? "true" : "false"} location = {"left"} 
                            name={leftSelectedName} year={leftSelectedYear}/>
                    </StyledPlayerInfo>
                    <StyleButton left={statistic} right={whoIsBetter}>
                        <div className="button left" onClick={()=>switchDisplay(1)}>
                            Statistic
                        </div>
                        <div className="button right" onClick={()=>switchDisplay(2)}>
                            Who is Better
                        </div>
                  </StyleButton>
                  <StyledPlayerInfo location={"right"}>
                  <CompareSideInfo isTeam = {isTeam ? "true" : "false"} location = {"right"} 
                        name={rightSelectedName} year={rigthSelectedYear}/>
                  </StyledPlayerInfo>
                </StyledPlayerInfoAndSwitches>
            )}

            {isTwoValuesSelected && statistic &&(
                <StyledRadarCont>
                    <Radar 
                        data={radarDatasets().data}
                        options={radarDatasets().options}
                    />
                </StyledRadarCont>
            )}

            {isTwoValuesSelected && whoIsBetter && (
                <StyledComparisonBars>
                <div className="bar-group">
                    {sortComparisonBars()["sortedPValueListOne"].length > 0 && (
                    <p className="bar-heading">
                        <strong>{leftSelectedName.replace(/_/g, " ")} </strong>is better than{" "}
                        <strong>{rightSelectedName.replace(/_/g, " ")} </strong>with
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
                        playerNameOne={leftSelectedName}
                        playerNameTwo={rightSelectedName}
                        bcg="colourOne"
                        dataType={dataType}
                        />
                    )
                    )}
                </div>
                <div className="bar-group">
                    {sortComparisonBars()["sortedPValueListTwo"].length > 0 && (
                    <p className="bar-heading">
                        <strong>{leftSelectedName.replace(/_/g, " ")} </strong>is better than{" "}
                        <strong>{rightSelectedName.replace(/_/g, " ")} </strong>with
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
                        playerNameOne={leftSelectedName}
                        playerNameTwo={rightSelectedName}
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
                        playerNameOne={leftSelectedName}
                        playerNameTwo={rightSelectedName}
                        bcg={null}
                        dataType={dataType}
                        />
                    )
                    )}
                </div>
                </StyledComparisonBars>
            )}
        </>
    )
    
}

export default StatisticsInformation;