import React from "react";
import { Wrapper } from './RandomComparison-style';
import { fbFirestore } from "../App/config";
import Information from "./InformationContainer";

const MatchFact = ({futureGames}) => {

  console.log(futureGames);
  return(
    <Wrapper>
      <div
        className="title"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem"
        }}
      >
          Match Fact
      </div>
      <Information 
        matchFact = {futureGames[1]['Match Facts']} 
        gameInfo = {futureGames[1]['Game Info']}/>
    </Wrapper>
  )
};

export default MatchFact;