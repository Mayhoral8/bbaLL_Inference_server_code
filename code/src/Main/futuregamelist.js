import React, { useRef } from "react";
import FutureGameOddsCard from "./futureGameOddsCard";

const FutureGameList = ({ games }) => {
  const futureGamesReference = useRef(null)
  return games.map((item, index) => {
    return <FutureGameOddsCard data={item} key={index} ref = {futureGamesReference}/>;
  });
};

export default FutureGameList;
