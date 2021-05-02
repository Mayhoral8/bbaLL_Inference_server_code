import React, { useState, useEffect, useRef } from "react";
import { fbStorage } from "../App/config";
import GetPlayerImage from "../Individual/Components/GetPlayerImage";
import { CardContainer } from "./playerrankingscard-style";

const PlayerRankingsCard = ({ data }) => {
  //const [JSON, setJSON] = useState(data);
  const [imgs, setImgs] = useState("");

  try {
    if (data == null) {
    }
  } catch (error) {
    data = {};
  }
  const rankingTypes = ["Daily", "Weekly", "Seasonal"];
  console.log(data);

  const scoreType = useRef("Points");
  const valueType = {
    FantasyScore: "Fantasy",
    Points: "Points",
    PointsPerPoss: "Possession",
    "Three-Pointers": "Three-points",
    Num_DD: "Double_frequency",
    Num_TD: "Triple_frequency",
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
  console.log(imgs);

  const getPic = async (playerNames) => {
    playerNames.map((name) => {
      const imageReference = fbStorage.refFromURL(
        "gs://nba-database-cb52a.appspot.com/player_photo_hayaoStyle_v2/" +
          name.replaceAll(" ", "_") +
          ".png"
      );
      imageReference.getDownloadURL().then((url) => {
        setImgs((imgs) => [...imgs, url]);
      });
    });
  };

  const renderComponent = () => {
    if (hasDataLoaded == true) {
      return (
        <div>
          <button>
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
                <select
                  onChange={(e) => {
                    scoreType.current = e.target.value;

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
                  value={scoreType.current}
                >
                  {Object.keys(data[rankingTypeIndex]).map((scoreTypes) => {
                    return <option value={scoreTypes}>{scoreTypes}</option>;
                  })}
                </select>
              </div>
            </div>

            <div className="players">
              {Object.keys(topPlayers).map((key, index) => {
                const playerName = Object.keys(topPlayers[key])[0];
                return (
                  <div className="player-box">
                    <div className="logo-box">
                      <img src={imgs[index]} />
                      <div className="player-name">
                        {playerName.split(" ")[0]} <br />
                        {playerName.split(" ")[1]}
                      </div>
                    </div>
                    <div className="value">
                      {Math.round(
                        topPlayers[key][playerName][
                          valueType[scoreType.current]
                        ] * 100
                      ) / 100}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContainer>
        </div>
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
