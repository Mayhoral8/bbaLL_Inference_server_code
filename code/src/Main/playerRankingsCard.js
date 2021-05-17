import React, { useState, useEffect, useRef } from "react";
import * as teamColours from "../constants/teamColours";
import { fbStorage } from "../App/config";
import GetPlayerImage from "../Individual/Components/GetPlayerImage";
import Select from "react-select";
import {
  CardContainer,
  OutsideContainer,
  selectContainer,
} from "./playerrankingscard-style";

const PlayerRankingsCard = ({ data }) => {
  //const [JSON, setJSON] = useState(data);
  const [imgs, setImgs] = useState({});

  try {
    if (data == null) {
    }
  } catch (error) {
    data = {};
  }
  const rankingTypes = ["Daily", "Weekly", "Seasonal"];

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

  const scoreType = useRef("Points");
  const valueType = {
    FantasyScore: "Fantasy",
    Points: "Points",
    PointsPerPoss: "Possession",
    "Three-Pointers": "Three-points",
    Num_DD: "Num_DD",
    Num_TD: "Num_TD",
  };
  const [rankingTypeIndex, setRankingTypeIndex] = useState(0);

  const [topPlayers, setTopPlayers] = useState({});

  // for cycling through daily, weekly and seasonal rankings
  const [isCycling, setIsCycling] = useState(true);
  const [cycleInterval, setCycleInterval] = useState(5000); // 5 seconds between transition

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

  const hasDataLoaded = Object.entries(data[0]).length !== 0;
  if (hasDataLoaded) {
    useEffect(() => {
      setTopPlayers(
        data[rankingTypeIndex][scoreType.current]
          .sort((a, b) => {
            const aName = Object.keys(a)[0];
            const bName = Object.keys(b)[0];
            return a[aName]["Rank"] - b[bName]["Rank"];
          })
          .slice(0, 4)
      );
    }, []);
  }
  if (isCycling) {
    useInterval(() => {
      console.log(rankingTypeIndex);
      if (rankingTypeIndex >= rankingTypes.length - 1) {
        setRankingTypeIndex(0);
      } else {
        setRankingTypeIndex(rankingTypeIndex + 1);
      }
    }, cycleInterval);
  }

  useEffect(() => {
    let names = [];
    Object.values(topPlayers).map((obj) => names.push(Object.keys(obj)[0]));

    getPic(names);
  }, [topPlayers]);

  const InitialLabels = ["Points", "Points", "Num_DD"];

  useEffect(() => {
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
  }, [rankingTypeIndex]);

  const getPic = async (playerNames) => {
    playerNames.map((name) => {
      if (!(name in imgs)) {
        const imageReference = fbStorage.refFromURL(
          "gs://nba-database-cb52a.appspot.com/player_photo_hayaoStyle_v2/" +
            name.replaceAll(" ", "_") +
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

  const labelsForDropdown = {
    FantasyScore: "Fantasy Score",
    Points: "Points",
    PointsPerPoss: "Possession",
    "Three-Pointers": "Three-pointers",
    Num_DD: "Double-Double",
    Num_TD: "Triple-Double",
  };

  let selectOptions = [];
  Object.keys(data[rankingTypeIndex]).map((value) => {
    selectOptions.push({ value: [value], label: [labelsForDropdown[value]] });
  });
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
          <CardContainer>
            <div className="top">
              <div className="title">
                {rankingTypes[rankingTypeIndex]} Player Rankings
              </div>

              <div className="dropdown">
                <Select
                  value={scoreType.current}
                  styles={{ width: `${8 * scoreType.current.length + 100}px` }}
                  onChange={(selected) => {
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
                  }}
                  options={selectOptions}
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
