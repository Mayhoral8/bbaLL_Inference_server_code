import React from "react";
import {RandomPlayerContiner} from './comparison-style';
import EachRandomSet from "./EachRandomSet";

const RandomComparison = (props) => {
  const currentYear = props.compareYear;

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
  return (
      <RandomPlayerContiner>
        <div onClick={()=>setPlayer(props.one, props.two)}>
          <EachRandomSet 
            setPlayer={setPlayer} 
            leftName = {props.one} 
            rightName = {props.two}
            isTeam = {props.isTeam}/>
        </div>

        <div onClick={()=>setPlayer(props.three, props.four)}>
          <EachRandomSet 
            onClick={()=>setPlayer(props.three, props.four)} 
            leftName = {props.three} 
            rightName = {props.four}
            isTeam = {props.isTeam}/>
        </div>

        <div onClick={()=>setPlayer(props.five, props.six)}>
          <EachRandomSet  
            leftName = {props.five} 
            rightName = {props.six}
            isTeam = {props.isTeam}/>
        </div>

        <div onClick={()=>setPlayer(props.seven, props.eight)}>
          <EachRandomSet 
            onClick={()=>setPlayer(props.seven, props.eight)} 
            leftName = {props.seven} 
            rightName = {props.eight}
            isTeam = {props.isTeam}/>
        </div>

        <div onClick={()=>setPlayer(props.nine, props.ten)}>
          <EachRandomSet 
            onClick={()=>setPlayer(props.nine, props.ten)} 
            leftName = {props.nine} 
            rightName = {props.ten}
            isTeam = {props.isTeam}/>
        </div>
      </RandomPlayerContiner>
  )
}

export default RandomComparison;