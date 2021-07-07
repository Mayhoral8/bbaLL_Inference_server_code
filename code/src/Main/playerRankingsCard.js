import React, { useState, useEffect, useRef } from "react";
import * as teamColours from "../constants/teamColours";
import { fbStorage } from "../App/config";
import { exportComponentAsJPEG } from 'react-component-export-image';
import Select from "react-select";
import { CardContainer, OutsideContainer } from "./playerrankingscard-style";
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const PlayerRankingsCard = ({ data, rankingTypes, timeOut, cycling, rankingProps, isScreenCapture, reference }) => {
  console.log(rankingProps)
  const [imgs, setImgs] = useState({});
  try {
    if (data == null) {
    }
  } catch (error) {
    data = {};
  }

  for (let i = 0; i < rankingTypes.length; i++) {
    rankingTypes[i] = capitalizeFirstLetter(rankingTypes[i]);
  }
  const units = {
    Points: "PTS",
    Assist: "AST",
    rebound: "REB",
    "Three-Pointers": "3PTS",
    Num_DD: "Double-Double",
    Num_TD: "Triple-Double",
    FantasyScore: "FAN",
    PointsPerPoss: "PTS/POSS",
  };

  const valueType = {
    FantasyScore: "Fantasy",
    Points: "Points",
    PointsPerPoss: "Possession",
    "Three-Pointers": "Three-points",
    Num_DD: "Num_DD",
    Num_TD: "Num_TD",
  };

  const labelsForDropdown = {
    FantasyScore: "Fantasy Score",
    Points: "Points",
    PointsPerPoss: "Possession",
    "Three-Pointers": "Three-pointers",
    Num_DD: "Double-Double",
    Num_TD: "Triple-Double",
  };

  const hasDataLoaded = Object.entries(data[0]).length !== 0;
  const scoreType = useRef("Points");

  const [rankingTypeIndex, setRankingTypeIndex] = useState(0);
  const [topPlayers, setTopPlayers] = useState({});

  // For cycling through daily, weekly and seasonal rankings
  // If we intend to capture images, we pass cycle as a null value from the parent component or else it's given the amount of time that we would want this card to cycle through.
  // If we capture the isScreenCapture prop will be true.
  const [isCycling, setIsCycling] = useState(cycling);
  const [cycleInterval, setCycleInterval] = useState(timeOut); // 5 seconds between transition: ;


  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useEffect(() => {
    for (let i = 0; i < data.length; i++)
      for (const prop in data[i]) {
        let arr = [];

        for (const name in data[i][prop]) {
          arr.push({ [name]: data[i][prop][name] });
        }

        data[i][prop] = arr;
      }
  }, []);

  useEffect(() => {
    if(hasDataLoaded){

      setTopPlayers(
        data[rankingTypeIndex][scoreType.current]
          .sort((a, b) => {
            const aName = Object.keys(a)[0];
            const bName = Object.keys(b)[0];
            return a[aName]["Rank"] - b[bName]["Rank"];
          })
          .slice(0, 4)
      );

    }
  }, []);

  useEffect(() => {
    let names = [];
    Object.values(topPlayers).map((obj) => names.push(Object.keys(obj)[0]));
    getPic(names);
  }, [topPlayers]);

  // If 
  let selectOptions = [];
  if(isScreenCapture){
    Object.keys(data[rankingProps.rankingTypeIndex]).map((value) => {
      selectOptions.push({ value: [value], label: [labelsForDropdown[value]] });
    })
  }
  else{
    Object.keys(data[rankingTypeIndex]).map((value) => {
      selectOptions.push({ value: [value], label: [labelsForDropdown[value]] });
    })
  }
  
  // This runs when the component is called from the ScreenCapture/homePage.
  useEffect(() => {
   if(isScreenCapture){
    scoreType.current = rankingProps.selectOptions[rankingProps.selectAttrIndex].value[0]
    setTopPlayers(
      data[rankingProps.rankingTypeIndex][scoreType.current]
        .sort((a, b) => {
          const aName = Object.keys(a)[0];
          const bName = Object.keys(b)[0];
          return a[aName]["Rank"] - b[bName]["Rank"];
        })
        .slice(0, 4)
    );
   }
  }, [rankingProps]);

  // This runs when the component is called from the Main/mainPage.js
  useEffect(() => {
      if(!isScreenCapture){
        const InitialLabels = ["Points", "Points", "Num_DD"];
        scoreType.current = InitialLabels[rankingTypeIndex];
        setTopPlayers(
          data[rankingTypeIndex][scoreType.current]
            .sort((a, b) => {
              const aName = Object.keys(a)[0];
              const bName = Object.keys(b)[0];
              return a[aName]["Rank"] - b[bName]["Rank"];
            })
            .slice(0, 4)
        );
      }

  }, [rankingTypeIndex])

  if (isCycling) {
    useInterval(() => {
      if (rankingTypeIndex >= rankingTypes.length - 1) {
        setRankingTypeIndex(0);
      } else {
        setRankingTypeIndex(rankingTypeIndex + 1);
      }
    }, cycleInterval);
  }


  const getPic = async (playerNames) => {
    playerNames.map((name) => {
      if (!(name in imgs)) {
        const imageReference = fbStorage.refFromURL(
          "gs://nba-database-cb52a.appspot.com/player_photo_hayaoStyle_v2/" +
            name.replaceAll(" ", "_").replaceAll(".", ",") +
            ".png"
        );

        imageReference
          .getDownloadURL()
          .then((url) => {
            setImgs((imgs) => ({ [name]: url, ...imgs }));
          })
          .catch(() => {
            const imageReference = fbStorage.refFromURL(
              "gs://nba-database-cb52a.appspot.com/player_photo_hayaoStyle_v2/Anonymous_Image.png"
            );
            imageReference.getDownloadURL().then((url) => {
              setImgs((imgs) => ({ [name]: url, ...imgs }));
            });
          });
      }
    });
  };

  const renderComponent = () => {
    if (hasDataLoaded == true) {
      return (
        <OutsideContainer>
          <button
            className="left-arrow"
            onClick={() => {
              if (rankingTypeIndex <= 0) {
                setRankingTypeIndex(rankingTypes.length - 1);
              } else {
                setRankingTypeIndex(rankingTypeIndex - 1);
              }
              if (cycleInterval !== null) {
                setCycleInterval(null);
              }
            }}
          >
            <img
              style={{ maxWidth: "40px" }}
              src="https://image.flaticon.com/icons/png/512/60/60758.png"
            />
          </button>

          <CardContainer ref = {reference}>
            <div className="top">
              <div className="title">
                {
                  isScreenCapture ?
                  rankingTypes[rankingProps.rankingTypeIndex]
                  :
                  rankingTypes[rankingTypeIndex]
                } Player Rankings
              </div>

              <div className="dropdown">
                <Select
                  value={scoreType.current}
                  styles={{ width: `${8 * scoreType.current.length + 100}px` }}
                  onChange={(selected) => {
                    if(!isScreenCapture){
                      // stops rankings from cycling when component is clicked
                      if (cycleInterval !== null) {
                        setCycleInterval(null);
                      }
                      scoreType.current = selected.value[0];
                      setTopPlayers(
                        data[rankingTypeIndex][scoreType.current]
                          .sort((a, b) => {
                            const aName = Object.keys(a)[0];
                            const bName = Object.keys(b)[0];
                            return a[aName]["Rank"] - b[bName]["Rank"];
                          })
                          .slice(0, 4)
                      );
                    }
                  }}
                  options={isScreenCapture ? rankingProps.selectOptions : selectOptions}
                  className="select"
                  placeholder={labelsForDropdown[scoreType.current]}
                ></Select>
              </div>
            </div>

            <div className="players">
              {Object.keys(topPlayers).map((key, index) => {
                const playerName = Object.keys(topPlayers[key])[0];
                const score =
                  Math.round(
                    topPlayers[key][playerName][valueType[scoreType.current]] *
                      100
                  ) / 100;
                const unit = units[scoreType.current];

                //sets default colour
                let playerColour = "black";

                // looks for team colour of player
                if (topPlayers[key][playerName].hasOwnProperty("Team")) {
                  const teamName = topPlayers[key][playerName]["Team"];
                  playerColour = getPlayerColour(teamName) + "99";
                }

                return (
                  <a
                    key={index}
                    href={`/player/${playerName
                      .replaceAll(" ", "_")
                      .replaceAll(".", ",")}`}
                  >
                    <div
                      key={index}
                      className="player-box"
                      style={{ background: `${playerColour}` }}
                    >
                      <div className="logo-box">
                        <img style={{}} src={imgs[playerName]} />
                        <div className="player-name">
                          {playerName.split(" ")[0]} <br />
                          {playerName.split(" ")[1]}
                        </div>
                      </div>
                      <div className="value">
                        <div>
                          {score + " "}
                          <span className="unit">{unit}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </CardContainer>

          <button
            className="right-arrow"
            onClick={() => {
              if (rankingTypeIndex >= rankingTypes.length - 1) {
                setRankingTypeIndex(0);
              } else {
                setRankingTypeIndex(rankingTypeIndex + 1);
              }
              // stops the rankings from cycling
              if (cycleInterval !== null) {
                setCycleInterval(null);
              }
            }}
          >
            <img
              style={{ maxWidth: "40px" }}
              src="https://image.flaticon.com/icons/png/512/60/60758.png"
            />
          </button>
        </OutsideContainer>
      );
    } else {
      return (
        <CardContainer>
          <div>Loading...</div>
        </CardContainer>
      );
    }
  };

  return renderComponent();
};

const getPlayerColour = (name) => {
  name = name.replaceAll(" ", "").toUpperCase();
  return teamColours[name];
};

export default PlayerRankingsCard;
