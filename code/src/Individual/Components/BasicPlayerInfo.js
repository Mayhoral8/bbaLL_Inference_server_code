import React, { useEffect, useState } from "react";
import * as individualConstants from "../individualConstants";
import { BasicInfoDiv } from "./playerprofile-style";
import { fbFirestore } from "Firebase";
import { ABB2TEAM } from "../../constants/index";
import { FormatNumberToCash } from "Functions/MoneyFormat";
import GetPlayerImage from "./GetPlayerImage";
import { Link, useHistory } from "react-router-dom";

//props: playerName
const BasicPlayerInfo = ({ playerNameProp, setBasicInfo, activeYear, fullActiveYear }) => {
  const history = useHistory();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [nationality, setNationality] = useState("");
  const [salary, setSalary] = useState("");
  const [team, setTeam] = useState("");

  //Gets Player Data from Firestore and sends it over to Player Profile
  const fetchFromFirestore = (activeYear) => {
    fbFirestore
      .collection("player_basic_info")
      .doc(playerNameProp.replace(/\s/g, "_"))
      .get()
      .then((doc) => {
        const years = Object.keys(doc.data().team_abbreviation)
          .filter((year) => year !== "Career")
          .sort()
          .reverse();
        const activeYearString = activeYear.toString() + '-' + (activeYear + 1).toString().substring(2);
        const abbrTeamName = doc.data().team_abbreviation;

        // handle team abbr of "TOT" or null
        const playerInTeamArr = Object.entries(abbrTeamName).sort();
        const getIndexFromYear = (teamArray, year) => {
          for (let i = 0; i < teamArray.length; i++) {
            if (teamArray[i][0] === year) {
              return i;
            }
          }
        }

        const findNonTotTeamRecursion = (i, teamArray, currentIdxTeam) => {

          if (i === teamArray.length - 2) {
            return doc.data().team.team;
          }

          // if currentIdxTeam === null, return an empty string
          if (!currentIdxTeam) {
            return ''
          }
          if (!teamArray[i + 1][1]) {
            return doc.data().team.team
          }
          else if (teamArray[i + 1][1] !== 'TOT') {
            return ABB2TEAM[teamArray[i + 1][1]]
          }
          else if (teamArray[i + 1][1] === 'TOT') {
            if (i === 0) {
              return '';
            }
            if (!teamArray[i - 1][1]) {
              // TODO: FIX IT - NOT ACCURATE
              return findNonTotTeamRecursion(i - 1, teamArray, currentIdxTeam)
            } else if (teamArray[i - 1][1] === 'TOT') {
              console.log(playerNameProp, '3 or more TOTs in a row');
              return ''
            } else {
              return ABB2TEAM[teamArray[i - 1][1]];
            }
          }
        }

        const findNearestNonTotTeam = (teamArray, year) => {
          const startIdx = getIndexFromYear(teamArray, year);

          for (let i = startIdx; i >= 0; i--) {
            const currentIdxTeam = teamArray[i][1];
            if (currentIdxTeam === 'TOT') {
              return findNonTotTeamRecursion(i, teamArray, currentIdxTeam)
            }

            return ABB2TEAM[teamArray[i][1]];
          }
        }
        const activeTeam = findNearestNonTotTeam(playerInTeamArr, activeYearString);

        if (ABB2TEAM[abbrTeamName[activeYearString]] === 'undefined') {
          history.push('/404');
        }

        setHeight(doc.data().height["Career"]);
        setWeight(doc.data().weight["Career"]);
        setNationality(doc.data().nationality["Career"]);
        setSalary(FormatNumberToCash(doc.data().salary[fullActiveYear]));
        setTeam(activeTeam);

        const careerStats = individualConstants.tableStats.map((stat) => {
          return doc.data()[stat]["Career"].toFixed(2);
        });

        setBasicInfo(years, careerStats);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchFromFirestore(activeYear);
  }, [activeYear]);

  const infoConstant = [
    { state: height, text: "Height" },
    { state: weight, text: "Weight" },
    { state: salary, text: "Salary" },
    { state: nationality, text: "nationality" },
  ];

  const removeCommaAndUnderscore = name => {
    return name.replace(/,/g, '.').replace(/_/g, ' ');
  }

  return (
    <BasicInfoDiv>
      <div className="player__img-name">
        <div className='img-container'>
          <GetPlayerImage playerName={playerNameProp} profile="true" />
        </div>
        <div className="player__name">
          <h1>{removeCommaAndUnderscore(playerNameProp)}</h1>
          <p>
            <Link
              to={`/team/${team && team.replace(/\s/g, "_")}`}
              className="team-link"
            >
              {team}
            </Link>
          </p>
        </div>
      </div>
      <div className="player__info">
        {infoConstant.map((info) => {
          info.state === "United States of America"
            ? (info.state = "USA")
            : info.state;
          return (
            <div className="info-container" key={info.text}>
              <h3>{info.state}</h3>
              <p>{info.text}</p>
            </div>
          );
        })}
      </div>
    </BasicInfoDiv>
  );
};

export default BasicPlayerInfo;