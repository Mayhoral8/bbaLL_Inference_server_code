import React, { useState } from "react";
import FutureGameOddsCard from "./futureGameOddsCard";

const FutureGameList = ({ games }) => {
  return games.map((item, index) => {
    return <FutureGameOddsCard data={item} key={index} />;
  });
};

export default FutureGameList;
