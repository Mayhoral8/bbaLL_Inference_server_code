import React, { useState } from "react";
import { Wrapper, MatchFactWrapper } from "./matchFact-Style";
import Information from "./InformationContainer";

const MatchFact = ({ futureGames }) => {
  const futureGameChecked = futureGames.filter(
    (game) => game["Match Facts"] !== undefined
  );
  const length = futureGameChecked.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const justifyContentStyle = length === 1 ? "center" : "space-between";

  const nextbuttonHandle = (event) => {
    if (currentIndex < length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevbuttonHandle = (event) => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(length - 1);
    }
  };

  return (
    <Wrapper>
      <div
        style={{
          paddingTop: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: justifyContentStyle,
          width: "100%",
        }}
      >
        <button
          className={length === 1 ? "hide" : "button prev"}
          onClick={prevbuttonHandle}
        >
          <span>Previous</span>
        </button>
        <div
          className="title"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Match Fact
        </div>
        <button
          className={length === 1 ? "hide" : "button next"}
          onClick={nextbuttonHandle}
        >
          <span>Next</span>
        </button>
      </div>
      <MatchFactWrapper>
        <Information
          matchFact={futureGameChecked[currentIndex]["Match Facts"]}
          gameInfo={futureGameChecked[currentIndex]["Game Info"]}
        />
      </MatchFactWrapper>
    </Wrapper>
  );
};

export default MatchFact;
