import React, { useState, useEffect, useRef } from "react";
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
    Num_DD: "DD",
    Num_TD: "TD",
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

  useEffect(() => {
    let names = [];
    Object.values(topPlayers).map((obj) => names.push(Object.keys(obj)[0]));

    getPic(names);
  }, [topPlayers]);

  useEffect(() => {
    scoreType.current = Object.keys(data[rankingTypeIndex])[0];
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
    setImgs({});
    playerNames.map((name) => {
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
    });
  };

  let selectOptions = [];
  Object.keys(data[rankingTypeIndex]).map((value) => {
    selectOptions.push({ value: [value], label: [value] });
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
                  placeholder={scoreType.current}
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
                const scoreToDisplay = `${score} ${unit}`;
                return (
                  <div className="player-box">
                    <div className="logo-box">
                      <img src={imgs[playerName]} />
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

export default PlayerRankingsCard;
