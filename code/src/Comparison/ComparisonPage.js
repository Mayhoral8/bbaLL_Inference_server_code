import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation} from "react-router-dom";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ComparisonDropdown from "./Components/ComparisonDropdown";
import SEO from "../Shared/SEO";
import names from "JSON/name.json";
import candidates from "JSON/player_candidates_for_comparison.json";
import teamCandidates from "JSON/team_candidates_for_comparison.json";
import RandomPlayerContiner from "./RandomComparison";
import RandomComparisonMobile from "./RandomComparisonMobile/RandomComparisonMobile"
import ComparisonYearSelection from "./Components/ComparisonYearSelection";
import {
  StyledComparisonBanner,
  StyledComparisonOptions,
  StyledPlayerCandidates,
  StyledPlayerCanidatesMobile,
  StyledOptionName,
  StyledOptionsNames,
  StyledOptionsTeams,
  MainContent,
  SideNav,
} from "./comparison-style";
import { fbFirestore } from "../App/config";
import StatisticsInformation from "./StatisticsInformation";
import useWindowSize from "../../src/Shared/hooks/useWindowSize";

const ComparisonPage = () => {

  const location = useLocation();
  const history = useHistory();
  const screenWidth = useWindowSize();

  const [yearComparison, setYearComparison] = useState(null);
  const [randomNamesSet, setRandomNamesSet] = useState(null);
  const [isTwoValuesSelected, setIsTwoValuesSelected] = useState(false);
  
  const [dataOne, setDataOne] = useState(null);
  const [dataTwo, setDataTwo] = useState(null);
  const [maxYearlyOne, setMaxYearlyOne] = useState(null);
  const [maxYearlyTwo, setMaxYearlyTwo] = useState(null);
  const [minYearlyOne, setMinYearlyOne] = useState(null);
  const [minYearlyTwo, setMinYearlyTwo] = useState(null);
  const [maxOverallYears, setMaxOverallYears] = useState(null);
  const [minOverallYears, setMinOverallYears] = useState(null);

  const [refOne, setRefOne] = useState(null);
  const [refTwo, setRefTwo] = useState(null);
  const [refYearOne, setRefYearOne] = useState(null);
  const [refYearTwo, setRefYearTwo] = useState(null);

  const pathname = location.pathname.split('/');
  const search = location.search;
  const splitedSearch = location.search.split('&');
  const teamsOrPlayersPath = pathname[2];
  const dataTypePath = pathname[3];

  const parsedQueryParams = splitedSearch.map(term=> term.split('=')[1]);
  const queryNameOne = parsedQueryParams[0];
  const queryYearOne = parsedQueryParams[1];
  const queryNameTwo = parsedQueryParams[2];
  const queryYearTwo = parsedQueryParams[3];

  let tempIsTeam = null;
  let tempDataType = "perGame";
  let tempLeftName = null;
  let tempRightName = null;
  let tempLeftYear = null;
  let tempRightYear = null;

  if(teamsOrPlayersPath === 'teams') {
    tempIsTeam = true;
  } else if (teamsOrPlayersPath === 'players') {
    tempIsTeam = false;
  }

  if(dataType === 'per-possession') {
    tempDataType = 'perPoss';
  } else {
    tempDataType = 'perGame';
  }

  if (search) {
    tempLeftName = queryNameOne.replace("%27","'");;
    tempRightName = queryNameTwo.replace("%27","'");;
    tempLeftYear = queryYearOne;
    tempRightYear = queryYearTwo
  }

  const [isTeam, setIsTeam] = useState(tempIsTeam);
  const [dataType, setDataType] = useState(tempDataType);
  const [playerNameOne, setPlayerNameOne] = useState(tempLeftName);
  const [playerNameTwo, setPlayerNameTwo] = useState(tempRightName);
  const [yearOne, setYearOne] = useState(tempLeftYear);
  const [yearTwo, setYearTwo] = useState(tempRightYear);

  const [tempPlayerNameOne, setTempPlayerNameOne] = useState(tempLeftName);
  const [tempPlayerNameTwo, setTempPlayerNameTwo] = useState(tempRightName);
  const [tempYearOne, setTempYearOne] = useState(tempLeftYear);
  const [tempYearTwo, setTempYearTwo] = useState(tempRightYear);
  let clearLeftValue = false;
  let clearRightValue = false;

  useEffect(() => {
    Chart.plugins.unregister(ChartDataLabels);

    if(teamsOrPlayersPath && dataTypePath && search) {  
      if(teamsOrPlayersPath === 'players') {
        setIsTeam(false);
      } else if(teamsOrPlayersPath === 'teams') {
        setIsTeam(true);
      }

      if(dataTypePath === 'per-game') {
        setDataType('perGame');
      } else {
        setDataType('perPoss');
      }

      // set selected names into player one and two
      setPlayerNameOne(queryNameOne);
      setPlayerNameTwo(queryNameTwo);

      // set selected years into player one and two
      setYearOne(queryYearOne);
      setYearTwo(queryYearTwo);

      // set names reference for future clear
      setRefOne(queryNameOne);
      setRefTwo(queryNameTwo);

      // set years reference for future clear
      setRefYearOne(queryYearOne);
      setRefYearTwo(queryYearTwo);
    }
    
    // if everything is eampy, assign random player to teh tempplayer
    if(tempPlayerNameOne == null && tempPlayerNameTwo == null) {
      setPlayerNameOne(randomNamesSet[0].replace(/ /g, "_").replace(".", ","));
      setPlayerNameTwo(randomNamesSet[1].replace(/ /g, "_").replace(".", ","));
  
      setYearOne("2020-21");
      setYearTwo("2020-21");
    }

    // set the temp name with new update when they are not empty
    if (tempPlayerNameOne && tempPlayerNameTwo) {
      setPlayerNameOne(tempPlayerNameOne);
      setPlayerNameTwo(tempPlayerNameTwo);
    }

    // set the temp year with new update when they are not empty
    if (tempYearOne && tempYearTwo) {
      setYearOne(tempYearOne);
      setYearTwo(tempYearTwo);
    }

    if (playerNameOne && playerNameTwo && yearOne && yearTwo) {
      setIsTwoValuesSelected(true);
      // getting data from the firebase
      getMaxYearlyStatFromfbFirestore(yearOne, isTeam, "optionOne");
      getMaxYearlyStatFromfbFirestore(yearTwo, isTeam, "optionTwo");

      getMinYearlyStatFromfbFirestore(yearOne, isTeam, "optionOne");
      getMinYearlyStatFromfbFirestore(yearTwo, isTeam, "optionTwo");

      getMaxMinOverAllStatFromfbFirestore(isTeam);

      getAttrFromFirestore(
        playerNameOne,
        yearOne,
        "optionOne",
        dataType === "perPoss" ? "perPoss" : "perGame"
      );
      getAttrFromFirestore(
        playerNameTwo,
        yearTwo,
        "optionTwo",
        dataType === "perPoss" ? "perPoss" : "perGame"
      );
      
      // Routing
      const navpath = location.pathname.split('/')[1];
      const teampath = isTeam? 'teams': 'players';
      const typepath = dataType === 'perGame'? 'per-game': 'per-possession';
      const comparisonPath = `/${navpath}/${teampath}/${typepath}?nameOne=${playerNameOne}&yearOne=${yearOne}&nameTwo=${playerNameTwo}&yearTwo=${yearTwo}`;
      history.push(comparisonPath);

    } else {
      setIsTwoValuesSelected(false);
    }
  }, [
    tempYearOne,
    tempYearTwo,
    tempPlayerNameOne,
    tempPlayerNameTwo,
    playerNameOne,
    playerNameTwo,
    yearOne,
    yearTwo,
    isTeam,
  ]);

  function clearValue(ref) {
    ref.select.clearValue();
  };

  function clearValueProm(ref, num) {
    ref.select.clearValue();
    if(num === 1) {
      clearLeftValue = true;
    } else if (num == 2) {
      clearRightValue = true;
    }
  }

  function handleCompareBetween(bool) {
    setPlayerNameOne(null);
    setPlayerNameTwo(null);
    setYearOne(null);
    setYearTwo(null);

    setTempPlayerNameOne(null);
    setTempPlayerNameTwo(null);
    setTempYearOne(null);
    setTempYearTwo(null);
    
    setRandomNamesSet(null);
    setYearComparison(null);

    setDataOne(null);
    setDataTwo(null);
    setMaxYearlyOne(null);
    setMaxYearlyTwo(null);
    setIsTwoValuesSelected(false);
    
    clearValue(refOne);
    clearValue(refTwo);
    clearValue(refYearOne);
    clearValue(refYearTwo);
    setIsTeam(bool);
  };

  function getAttrFromFirestore(name, year, option, dataType) {
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

  function getMaxYearlyStatFromfbFirestore(year, isTeam, option) {
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

  function getMaxMinOverAllStatFromfbFirestore(isTeam) {
    fbFirestore
      .collection("max_yearly_stats")
      .doc("Overall")
      .collection("teams_players")
      .doc(isTeam ? "teams_max" : "players_max")
      .get()
      .then((doc) => {
        setMaxOverallYears(doc.data())
      })
      .catch((error) => {
        console.log(error);
      });

      fbFirestore
      .collection("max_yearly_stats")
      .doc("Overall")
      .collection("teams_players")
      .doc(isTeam ? "teams_min" : "players_min")
      .get()
      .then((doc) => {
        setMinOverallYears(doc.data())
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function getMinYearlyStatFromfbFirestore(year, isTeam, option) {
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

  function loadRandomPlayers() {
    let selectedForComparison = new Array();
    let names = new Array();
    let nameObject;
    let year;
    let index;

    if(teamsOrPlayersPath === 'players') {
      setIsTeam(false);
    } else if (teamsOrPlayersPath === 'teams'){
      setIsTeam(true);
    }
    //console.log("loading...." + " " + isTeam + " " + teamsOrPlayersPath);

    let data = isTeam ? teamCandidates : candidates;
    let randRange = isTeam ? 29 : 59;

    year = JSON.stringify(Object.keys(data));

    // get the player candidates array
    nameObject = (Object.values(data))["0"];

    // remove [] and "" from the year string
    year = year.replace("[", "");
    year = year.replace("]", "");
    year = year.replace(/['"]+/g, "");

    // randomly pick two player file the array

    for (index = 0; index < 10; index=index+2) {
      var indexOne = Math.floor((Math.random() * randRange) + 0);
      var indexTwo = Math.floor((Math.random() * randRange) + 0);
      if (indexOne == indexTwo) {
        indexTwo = Math.floor((Math.random() * randRange) + 0);
      }

      selectedForComparison.push(indexOne);
      selectedForComparison.push(indexTwo);
    }

    for (index = 0; index < 10; index += 1) {
      names.push(nameObject[selectedForComparison[index]])
    }
    
    setYearComparison(year);
    setRandomNamesSet(names);
  }

  function setPromoteStringName (nums) {
    if (playerNameOne && playerNameTwo) {
      if (nums == 1) {
        return playerNameOne.replace(/_/g, " ").replace(",", ".");
      } else if (nums == 2) {
        return playerNameTwo.replace(/_/g, " ").replace(",", ".");
      }
    }
    return isTeam ? "Enter team name" : "Enter player name";
  };

  // return the promot string on the year section
  function setPromoteStringYear(nums) {
    
    if (nums == 1) {
     if (yearOne) {
        return yearOne
      } else {
        return "Select Year";
      }
    } else if (nums == 2) {
      if (yearTwo){
        return yearTwo
      } else {
        return "Select Year";
      }
    }
    
    return "Select Year";
  }

  if ((randomNamesSet == null)) {
    loadRandomPlayers();
  } 
  
  return (
    <>
      <SEO
        title="NBA teams or players comparison"
        description="Compare between NBA teams or players"
      />

      <div>
        {screenWidth < 1024 && (
          <StyledPlayerCanidatesMobile>
            <RandomComparisonMobile 
              isTeam={isTeam}
              compareYear = {yearComparison}
              namesArray = {randomNamesSet}
              setTempNameOneProp = {setTempPlayerNameOne}
              setTempNameTwoProp = {setTempPlayerNameTwo}
              setTempYearOneProp = {setTempYearOne}
              setTempYearTwoProp = {setTempYearTwo}
            />
            <div className={"button-section"}>
              <button className={"refresh-button"} onClick={()=>loadRandomPlayers()}></button>
            </div>
          </StyledPlayerCanidatesMobile>
        )}
        <StyledComparisonBanner>
          <h1>
            Compare your favorite <span>teams</span> or <span>players</span>
          </h1>
        </StyledComparisonBanner>
        
        {
          screenWidth < 1024 ? (
            <MainContent>
              <div className = "leftContent">
                <StyledComparisonOptions>
                  <StyledOptionsTeams>
                    <p>Compare between: </p>
                    <li onClick={() => handleCompareBetween(false)} title="players">
                      <span className={!isTeam ? "active" : null}><Link to='/comparison'>Players</Link></span>
                    </li>
                    <li onClick={() => handleCompareBetween(true)} title="teams">
                      <span className={isTeam ? "active" : null}><Link to='/comparison'>Teams</Link></span>
                    </li>
                  </StyledOptionsTeams>
                  <StyledOptionsTeams>
                    <p>View stats: </p>
                    <li onClick={() => setDataType("perGame")} title="perGame">
                      <span className={dataType === "perGame" ? "active" : null}>
                        <Link to={`/comparison/${isTeam? 'teams':'players'}/per-game${search}`}>Per Game</Link>
                      </span>
                    </li>
                    <li onClick={() => setDataType("perPoss")} title="perPoss">
                      <span className={dataType === "perPoss" ? "active" : null}>
                      <Link to={`/comparison/${isTeam? 'teams':'players'}/per-possession${search}`}>Per Possession</Link>
                      </span>
                    </li>
                  </StyledOptionsTeams>
                  <StyledOptionsNames>
                    <StyledOptionName>
                      <div className="form-control" onClick={()=>clearValue(refYearOne)}>
                        <label>Name</label>
                        <ComparisonDropdown
                          options={names}
                          isTeam={isTeam}
                          onChange={(val) => setTempPlayerNameOne(val)}
                          prompt={isTeam ? "Enter team name" : "Enter player name"}
                          length="longer"
                          setRef={setRefOne}
                          colorSchem="blue"
                        />
                      </div>
                      <div className="form-control">
                        <label>Year</label>
                        <ComparisonYearSelection
                          isTeam={isTeam}
                          onChange={(val) => setTempYearOne(val)}
                          prompt={"Select Year"}
                          name={tempPlayerNameOne}
                          setRef={setRefYearOne}
                          colorSchem="blue"
                        />
                      </div>
                    </StyledOptionName>
  
                    <StyledOptionName>
                      <div className="form-control" onClick={()=>clearValue(refYearTwo)}>
                        <label>Name</label>
                        <ComparisonDropdown
                          options={names}
                          isTeam={isTeam}
                          onChange={(val) => setTempPlayerNameTwo(val)}
                          prompt={isTeam ? "Enter team name" : "Enter player name"}
                          length="longer"
                          setRef={setRefTwo}
                          colorSchem="red"
                        />
                      </div>
                      <div className="form-control">
                        <label>Year</label>
                        <ComparisonYearSelection
                          isTeam={isTeam}
                          onChange={(val) => setTempYearTwo(val)}
                          prompt={"Select Year"}
                          name={tempPlayerNameTwo}
                          setRef={setRefYearTwo}
                          colorSchem="red"
                        />
                      </div>
                    </StyledOptionName>
                  </StyledOptionsNames>
                </StyledComparisonOptions>
  
                <StatisticsInformation 
                  isTwoValuesSelected = {isTwoValuesSelected}
                  isTeam = {isTeam}
                  dataType={dataType}
                  leftSelectedName = {playerNameOne}
                  rightSelectedName = {playerNameTwo}
                  leftSelectedYear = {yearOne}
                  rigthSelectedYear = {yearTwo}
                  dataOne = {dataOne}
                  dataTwo = {dataTwo}
                  maxYearlyOne = {maxYearlyOne}
                  maxYearlyTwo = {maxYearlyTwo}
                  minYearlyOne = {minYearlyOne}
                  minYearlyTwo = {minYearlyTwo}
                  maxOverallYears = {maxOverallYears}
                  minOverallYears = {minOverallYears}
                  />
              </div>
            </MainContent>  
          ) : (
            <MainContent>
              <div className = "leftContent">
                <StyledComparisonOptions>
                  <StyledOptionsTeams>
                    <p>Compare between: </p>
                    <li onClick={() => handleCompareBetween(false)} title="players">
                      <span className={!isTeam ? "active" : null}><Link to='/comparison'>Players</Link></span>
                    </li>
                    <li onClick={() => handleCompareBetween(true)} title="teams">
                      <span className={isTeam ? "active" : null}><Link to='/comparison'>Teams</Link></span>
                    </li>
                  </StyledOptionsTeams>
                  <StyledOptionsTeams>
                    <p>View stats: </p>
                    <li onClick={() => setDataType("perGame")} title="perGame">
                      <span className={dataType === "perGame" ? "active" : null}>
                        <Link to={`/comparison/${isTeam? 'teams':'players'}/per-game${search}`}>Per Game</Link>
                      </span>
                    </li>
                    <li onClick={() => setDataType("perPoss")} title="perPoss">
                      <span className={dataType === "perPoss" ? "active" : null}>
                      <Link to={`/comparison/${isTeam? 'teams':'players'}/per-possession${search}`}>Per Possession</Link>
                      </span>
                    </li>
                  </StyledOptionsTeams>
                  <StyledOptionsNames>
                    <StyledOptionName>
                      <div className="form-control" onClick={()=>clearValue(refYearOne)}>
                        <label>Name</label>
                        <ComparisonDropdown
                          options={names}
                          isTeam={isTeam}
                          onChange={(val) => setTempPlayerNameOne(val)}
                          prompt={setPromoteStringName(1)}
                          length="longer"
                          setRef={setRefOne}
                          colorSchem="blue"
                        />
                      </div>
                      <div className="form-control">
                        <label>Year</label>
                        <ComparisonYearSelection
                          isTeam={isTeam}
                          onChange={(val) => setTempYearOne(val)}
                          prompt={setPromoteStringYear(1)}
                          name={tempPlayerNameOne}
                          setRef={setRefYearOne}
                          colorSchem="blue"
                        />
                      </div>
                    </StyledOptionName>
  
                    <StyledOptionName>
                      <div className="form-control" onClick={()=>clearValue(refYearTwo)}>
                        <label>Name</label>
                        <ComparisonDropdown
                          options={names}
                          isTeam={isTeam}
                          onChange={(val) => setTempPlayerNameTwo(val)}
                          prompt={setPromoteStringName(2)}
                          length="longer"
                          setRef={setRefTwo}
                          colorSchem="red"
                        />
                      </div>
                      <div className="form-control">
                        <label>Year</label>
                        <ComparisonYearSelection
                          isTeam={isTeam}
                          onChange={(val) => setTempYearTwo(val)}
                          prompt={setPromoteStringYear(2)}
                          name={tempPlayerNameTwo}
                          setRef={setRefYearTwo}
                          colorSchem="red"
                        />
                      </div>
                    </StyledOptionName>
                  </StyledOptionsNames>
                </StyledComparisonOptions>
  
                <StatisticsInformation 
                  isTwoValuesSelected = {isTwoValuesSelected}
                  isTeam = {isTeam}
                  dataType={dataType}
                  leftSelectedName = {playerNameOne}
                  rightSelectedName = {playerNameTwo}
                  leftSelectedYear = {yearOne}
                  rigthSelectedYear = {yearTwo}
                  dataOne = {dataOne}
                  dataTwo = {dataTwo}
                  maxYearlyOne = {maxYearlyOne}
                  maxYearlyTwo = {maxYearlyTwo}
                  minYearlyOne = {minYearlyOne}
                  minYearlyTwo = {minYearlyTwo}
                  maxOverallYears = {maxOverallYears}
                  minOverallYears = {minOverallYears}
                  />
              </div>
              <div>
                <SideNav>
                  <StyledPlayerCandidates>
                    <RandomPlayerContiner                       
                      isTeam={isTeam}
                      namesArray = {randomNamesSet}
                      compareYear = {yearComparison}
                      setTempNameOneProp = {setTempPlayerNameOne}
                      setTempNameTwoProp = {setTempPlayerNameTwo}
                      setTempYearOneProp = {setTempYearOne}
                      setTempYearTwoProp = {setTempYearTwo}
                      />
                      <div className={"centerButton"}>
                        <button className={"button"} onClick={()=>loadRandomPlayers()}></button>
                      </div>
                  </StyledPlayerCandidates>
                </SideNav>
              </div>
          </MainContent>
          )
        }
      </div>
    </>
  );
};

export default ComparisonPage;