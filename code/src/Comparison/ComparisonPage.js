import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { changeIsTeam } from "../redux/actions/sidebarActions";
import ComparisonDropdown from "./ComparisonDropdown";
import SEO from "../Shared/SEO";
import names from "JSON/name.json";
import candidates from "JSON/player_candidates_for_comparison.json";
import teamCandidates from "JSON/team_candidates_for_comparison.json";
import RandomPlayerContiner from "./RandomComparison";
import RandomComparisonMobile from "./RandomComparisonMobile/RandomComparisonMobile"

import ComparisonYearSelection from "./ComparisonYearSelection";
import {
  StyledMainContent,
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
import { backgrounds } from "polished";

const ComparisonPage = () => {
  const [playerNameOne, setPlayerNameOne] = useState(null);
  const [playerNameTwo, setPlayerNameTwo] = useState(null);

  const [randomNameOne, setRandomNameOne] = useState(null);
  const [randomNameTwo, setRandomNameTwo] = useState(null);
  const [randomNameThree, setrandomNameThree] = useState(null);
  const [randomNameFour, setrandomNameFour] = useState(null);
  const [randomNameFive, setRrandomNameFive] = useState(null);
  const [randomNameSix, setrandomNameSix] = useState(null);
  const [randomNameSeven, setRandomNameSeven] = useState(null);
  const [randomNameEight, setRandomNameEight] = useState(null);
  const [randomNameNine, setrandomNameNine] = useState(null);
  const [randomNameTen, setrandomNameTen] = useState(null);


  const [yearOne, setYearOne] = useState(null);
  const [yearTwo, setYearTwo] = useState(null);
  const [yearComparison, setYearComparison] = useState(null);
  
  const [tempPlayerNameOne, setTempPlayerNameOne] = useState(null);
  const [tempPlayerNameTwo, setTempPlayerNameTwo] = useState(null);
  const [tempYearOne, setTempYearOne] = useState(null);
  const [tempYearTwo, setTempYearTwo] = useState(null);
  
  const [isTwoValuesSelected, setIsTwoValuesSelected] = useState(false);
  const [dataOne, setDataOne] = useState(null);
  const [dataTwo, setDataTwo] = useState(null);

  const [maxYearlyOne, setMaxYearlyOne] = useState(null);
  const [maxYearlyTwo, setMaxYearlyTwo] = useState(null);
  const [minYearlyOne, setMinYearlyOne] = useState(null);
  const [minYearlyTwo, setMinYearlyTwo] = useState(null);

  const [maxOverallYears, setMaxOverallYears] = useState(null);
  const [minOverallYears, setMinOverallYears] = useState(null);

  const [dataType, setDataType] = useState("perGame");

  const [refOne, setRefOne] = useState(null);
  const [refTwo, setRefTwo] = useState(null);

  const [refYearOne, setRefYearOne] = useState(null);
  const [refYearTwo, setRefYearTwo] = useState(null);

  const isTeam = useSelector((state) => state.sidebarReducer.isTeam);

  const dispatch = useDispatch();
  const history = useHistory();
  const pathname = history.location.pathname.split('/');
  const search = history.location.search;
  const splitedSearch = history.location.search.split('&');
  const teamsOrPlayersPath = pathname[2];
  const dataTypePath = pathname[3];

  
  const parsedQueryParams = splitedSearch.map(term=> term.split('=')[1]);
  const queryNameOne = parsedQueryParams[0];
  const queryYearOne = parsedQueryParams[1];
  const queryNameTwo = parsedQueryParams[2];
  const queryYearTwo = parsedQueryParams[3];

  // length 10, stored either player / team name for random compare
  var selectedForComparison = new Array();
  var nameObject;
  var year;

  const screenWidth = useWindowSize();

  useEffect(() => {
    Chart.plugins.unregister(ChartDataLabels);

    if(teamsOrPlayersPath && dataTypePath && search) {                                 
      if(teamsOrPlayersPath === 'players') {
        dispatch(changeIsTeam({ isTeam: false }));
      } else {
        dispatch(changeIsTeam({ isTeam: true }));
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
    
    // set the temp name with new update when they are not empty
    if (tempPlayerNameOne != "" && tempPlayerNameTwo != "" ) {
      setPlayerNameOne(tempPlayerNameOne);
      setPlayerNameTwo(tempPlayerNameTwo);
    }

    // set the temp year with new update when they are not empty
    if (tempYearOne != "" && tempYearTwo != "") {
      setYearOne(tempYearOne);
      setYearTwo(tempYearTwo);
    }

    if (playerNameOne && playerNameTwo && yearOne && yearTwo) {
      setIsTwoValuesSelected(true);
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
      const navpath = history.location.pathname.split('/')[1];
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

  const clearValue = (ref) => {
    ref.select.clearValue();
  };

  const handleCompareBetween = (bool) => {
    setPlayerNameOne(null);
    setPlayerNameTwo(null);
    setYearOne(null);
    setYearTwo(null);

    setTempPlayerNameOne(null);
    setTempPlayerNameTwo(null);
    setTempYearOne(null);
    setTempYearTwo(null);

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

  const getMaxMinOverAllStatFromfbFirestore = (isTeam) => {
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

  const setPromoteStringName = (nums) => {
    /*
    if (parsedQueryParams.length == 1) {
      return isTeam ? "Enter team name" : "Enter player name";
    } else {
      return parsedQueryParams[nums];
    }
    */

    return isTeam ? "Enter team name" : "Enter player name";
  };

  // return the promot string on the year section
  const setPromoteStringYear = (nums) => {
    /*
    if(parsedQueryParams.length == 1) {
      return "Select Year";
    } else {
      return parsedQueryParams[nums];
    }
    */
    
    return "Select Year";
  }

  function loadRandomPlayers() {
      // if this is the fist time loading the screen
      // get the year name from the JSON file and conver it to string
      var data = isTeam ? teamCandidates : candidates;
      var randRange = isTeam ? 29 : 59;

      year = JSON.stringify(Object.keys(data));

      // get the player candidates array
      nameObject = (Object.values(data))["0"];

      // remove [] and "" from the year string
      year = year.replace("[", "");
      year = year.replace("]", "");
      year = year.replace(/['"]+/g, "");

      // randomly pick two player file the array

      for (var index = 0; index < 10; index=index+2) {
        var indexOne = Math.floor((Math.random() * randRange) + 0);
        var indexTwo = Math.floor((Math.random() * randRange) + 0);
        if (indexOne == indexTwo) {
          indexTwo = Math.floor((Math.random() * randRange) + 0);
        }

        selectedForComparison.push(indexOne);
        selectedForComparison.push(indexTwo);
      }
      
      
      setRandomNameOne(nameObject[selectedForComparison[0]]);
      setRandomNameTwo(nameObject[selectedForComparison[1]])
      setrandomNameThree(nameObject[selectedForComparison[2]]);
      setrandomNameFour(nameObject[selectedForComparison[3]]);
      setRrandomNameFive(nameObject[selectedForComparison[4]]);
      setrandomNameSix(nameObject[selectedForComparison[5]]);
      setRandomNameSeven(nameObject[selectedForComparison[6]]);
      setRandomNameEight(nameObject[selectedForComparison[7]]);
      setrandomNameNine(nameObject[selectedForComparison[8]]);
      setrandomNameTen(nameObject[selectedForComparison[9]]);
      setYearComparison(year);
  }

  if ((tempPlayerNameOne == null && tempPlayerNameTwo == null && playerNameOne == null && playerNameTwo == null)) {
    loadRandomPlayers();  

    setPlayerNameOne(nameObject[selectedForComparison[0]].replace(/ /g, "_").replace(".", ","));
    setTempPlayerNameOne(nameObject[selectedForComparison[0]].replace(/ /g, "_").replace(".", ","));
    setPlayerNameTwo(nameObject[selectedForComparison[1]].replace(/ /g, "_").replace(".", ","));
    setTempPlayerNameTwo(nameObject[selectedForComparison[1]].replace(/ /g, "_").replace(".", ","));

    setYearOne("2020-21");
    setTempYearOne("2020-21");
    setYearTwo("2020-21");
    setTempYearTwo("2020-21");
  }

  return (
    <>
      <SEO
        title="NBA teams or players comparison"
        description="Compare between NBA teams or players"
      />

        <StyledMainContent>
          {screenWidth < 1024 && (
            <StyledPlayerCanidatesMobile>
              <RandomComparisonMobile 
                one={randomNameOne} 
                two={randomNameTwo} 
                three={randomNameThree} 
                four={randomNameFour} 
                five={randomNameFive} 
                six={randomNameSix}
                seven={randomNameSeven}
                eight={randomNameEight}
                nine = {randomNameNine}
                ten = {randomNameTen}

                isTeam={isTeam}
                compareYear = {yearComparison}
                setTempNameOneProp = {setTempPlayerNameOne}
                setTempNameTwoProp = {setTempPlayerNameTwo}
                setTempYearOneProp = {setTempYearOne}
                setTempYearTwoProp = {setTempYearTwo}

                setNameOneProp = {setPlayerNameOne}
                setNameTwoProp = {setPlayerNameTwo}
                setYearOneProp = {setYearOne}
                setYearTwoProp = {setYearTwo}
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
                        <div className="form-control">
                          <label>Name</label>
                          <ComparisonDropdown
                            options={names}
                            isTeam={isTeam}
                            onChange={(val) => setTempPlayerNameOne(val)}
                            prompt={setPromoteStringName(0)}
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
                        <div className="form-control">
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
                            prompt={setPromoteStringYear(3)}
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
                        <div className="form-control">
                          <label>Name</label>
                          <ComparisonDropdown
                            options={names}
                            isTeam={isTeam}
                            onChange={(val) => setTempPlayerNameOne(val)}
                            prompt={setPromoteStringName(0)}
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
                        <div className="form-control">
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
                            prompt={setPromoteStringYear(3)}
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
                        one={randomNameOne} 
                        two={randomNameTwo} 
                        three={randomNameThree} 
                        four={randomNameFour} 
                        five={randomNameFive} 
                        six={randomNameSix}
                        seven={randomNameSeven}
                        eight={randomNameEight}
                        nine = {randomNameNine}
                        ten = {randomNameTen}
    
                        isTeam={isTeam}
                        compareYear = {yearComparison}
                        setTempNameOneProp = {setTempPlayerNameOne}
                        setTempNameTwoProp = {setTempPlayerNameTwo}
                        setTempYearOneProp = {setTempYearOne}
                        setTempYearTwoProp = {setTempYearTwo}
    
                        setNameOneProp = {setPlayerNameOne}
                        setNameTwoProp = {setPlayerNameTwo}
                        setYearOneProp = {setYearOne}
                        setYearTwoProp = {setYearTwo}
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
        </StyledMainContent>
    </>
  );
};

export default ComparisonPage;