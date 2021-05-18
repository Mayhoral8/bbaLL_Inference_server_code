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

  namePairs[0][0] = props.one
  namePairs[0][1] = props.two
  namePairs[1][0] = props.three
  namePairs[1][1] = props.four
  namePairs[2][0] = props.five
  namePairs[2][1] = props.six
  namePairs[3][0] = props.seven
  namePairs[3][1] = props.eight
  namePairs[4][0] = props.nine
  namePairs[4][1] = props.ten;

  function setPlayer(nameOne, nameTwo) {
    props.setTempNameOneProp(nameOne.replace(/ /g, "_").replace(".", ","));
    props.setTempNameTwoProp(nameTwo.replace(/ /g, "_").replace(".", ","));
    props.setTempYearOneProp(currentYear);
    props.setTempYearTwoProp(currentYear);

    props.setNameOneProp(nameOne.replace(/ /g, "_").replace(".", ","));
    props.setNameTwoProp(nameTwo.replace(/ /g, "_").replace(".", ","));
    props.setYearOneProp(currentYear);
    props.setYearTwoProp(currentYear);
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