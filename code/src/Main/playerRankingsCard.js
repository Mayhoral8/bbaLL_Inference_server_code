import React, { useState, useEffect, useRef } from "react";
import { fbStorage } from "../App/config";
import GetPlayerImage from "../Individual/Components/GetPlayerImage";
import { CardContainer } from "./playerrankingscard-style";

const PlayerRankingsCard = ({ data }) => {
  //const [JSON, setJSON] = useState(data);
  const [imgs, setImgs] = useState();

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
      console.log(data[rankingTypeIndex][scoreType.current]);
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
  const renderComponent = () => {
    if (hasDataLoaded == true) {
      return (
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
            {Object.keys(topPlayers).map((key) => {
              const playerName = Object.keys(topPlayers[key])[0];
              return (
                <div className="player-box">
                  <div className="logo-box">
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

// const GetPlayerImage = (playerName) => {
//   const imageReference = fbStorage.refFromURL(
//     "gs://nba-database-cb52a.appspot.com/player_photo_hayaoStyle_v2/" +
//       playerName.replaceAll(" ", "_") +
//       ".png"
//   );
//   imageReference.getDownloadURL().then((url) => {
//     return url;
//   });
// };
export default PlayerRankingsCard;
