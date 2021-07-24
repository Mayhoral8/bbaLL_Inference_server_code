import React from "react";
import { Wrapper } from "./RandomComparison-style";
import { fbFirestore } from "../App/config";
import Information from "./InformationContainer";

const MatchFact = ({ futureGames }) => {
  return (
    <Wrapper>
      <div
        className="title"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
        }}
      >
        Match Fact
      </div>
      <Information
        matchFact={futureGames[0]["Match Facts"]}
        gameInfo={futureGames[0]["Game Info"]}
      />
    </Wrapper>
  );
};

export default MatchFact;
