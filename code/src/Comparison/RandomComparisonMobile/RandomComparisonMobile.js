import React from "react";
import {RandomPlayerMobileContiner} from './EachRandomSetMobile-style';
import EachRandomSetMobile from "./EachRandomSetMobile";
import Carousel from "../../GameStats/Components/Carousel/Carousel";

const RandomComparisonMobile = (props) => {
  const currentYear = props.compareYear;
  var namePairs = new Array(5);
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];
  for (var i = 0; i < 5; i++) {
    namePairs[i] = new Array(2);
  }

  namePairs[0][0] = props.namesArray[0];
  namePairs[0][1] = props.namesArray[1];
  namePairs[1][0] = props.namesArray[2];
  namePairs[1][1] = props.namesArray[3];
  namePairs[2][0] = props.namesArray[4];
  namePairs[2][1] = props.namesArray[5];
  namePairs[3][0] = props.namesArray[6];
  namePairs[3][1] = props.namesArray[7];
  namePairs[4][0] = props.namesArray[8];
  namePairs[4][1] = props.namesArray[9];

  function setPlayer(nameOne, nameTwo) {
    props.setTempNameOneProp(nameOne.replace(/ /g, "_").replace(".", ","));
    props.setTempNameTwoProp(nameTwo.replace(/ /g, "_").replace(".", ","));
    props.setTempYearOneProp(currentYear);
    props.setTempYearTwoProp(currentYear);
  }

  function renderRandomComparisonList() {
    return namePairs.map((pair, index)=>{
      const leftSelectedName = pair[0];
      const rightSelectedName = pair[1];
      const eachIndex = index;
      return (
        <div onClick={()=>setPlayer(leftSelectedName, rightSelectedName)} key={eachIndex}>
          <EachRandomSetMobile  
            leftName = {leftSelectedName} 
            rightName = {rightSelectedName}
            isTeam = {props.isTeam}/>
        </div>
      );
    });
  };
  //breakPoints={breakPoints}
  return (
      <RandomPlayerMobileContiner>
        <Carousel numOfItems={5}>
          {renderRandomComparisonList()}
        </Carousel>
      </RandomPlayerMobileContiner>
  )
}

export default RandomComparisonMobile;