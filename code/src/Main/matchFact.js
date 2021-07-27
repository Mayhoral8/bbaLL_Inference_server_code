import React, { useState }from "react";
import { Wrapper, MatchFactWrapper} from './matchFact-Style';
import Information from "./InformationContainer";


const MatchFact = ({futureGames}) => {
  const futureGameChecked = futureGames.filter(game => game['Match Facts'] !== undefined);
  const length = futureGameChecked.length;
  const [currentIndex, setCurrentIndex] = useState(0);
 
  console.log(futureGameChecked)
  return(
    <Wrapper>
      <div
        className="title"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          paddingTop: '20px'
        }}
      >
         Match Fact
      </div>
      <MatchFactWrapper>
        <button
          className= {length === 1 ? 'hide' : 'left-arrow'}
          onClick={() => {
            if (currentIndex <= 0) {
              setCurrentIndex(length - 1);
            } else {
              setCurrentIndex(currentIndex - 1);
            }
          }}
        >
          <img
            style={{ maxWidth: "40px" }}
            src="https://image.flaticon.com/icons/png/512/60/60758.png"
          />
        </button>
        <Information 
          matchFact = {futureGameChecked[currentIndex]['Match Facts']} 
          gameInfo = {futureGameChecked[currentIndex]['Game Info']} />
        <button
          className= {length === 1 ? 'hide' : 'right-arrow'}
          onClick={() => {
            if (currentIndex >= length - 1) {
              setCurrentIndex(0);
            } else {
              setCurrentIndex(currentIndex + 1);
            }
          }}
        >
          <img
            style={{ maxWidth: "40px" }}
            src="https://image.flaticon.com/icons/png/512/60/60758.png"
          />
        </button>
      </MatchFactWrapper>
    </Wrapper>
  )
};

export default MatchFact;