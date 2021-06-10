import React from "react";
import {RandomPlayerContiner} from './comparison-style';
import EachRandomSet from "./Components/EachRandomSet";

const RandomComparison = (props) => {
  const currentYear = props.compareYear;
  let valueOne = props.namesArray[0]
  let valueTwo = props.namesArray[1]
  let valueThree = props.namesArray[2]
  let valueFour = props.namesArray[3]
  let valueFive = props.namesArray[4]
  let valueSix = props.namesArray[5]
  let valueSeven = props.namesArray[6]
  let valueEight = props.namesArray[7]
  let valueNine = props.namesArray[8]
  let valueTen = props.namesArray[9]

  function setPlayer(nameOne, nameTwo) {
    props.setTempNameOneProp(nameOne.replace(/ /g, "_").replace(".", ","));
    props.setTempNameTwoProp(nameTwo.replace(/ /g, "_").replace(".", ","));
    props.setTempYearOneProp(currentYear);
    props.setTempYearTwoProp(currentYear);
  }

  return (
      <RandomPlayerContiner>
        <div onClick={()=>setPlayer(valueOne, valueTwo)}>
          <EachRandomSet 
            setPlayer={setPlayer} 
            leftName = {valueOne} 
            rightName = {valueTwo}
            isTeam = {props.isTeam}/>
        </div>

        <div onClick={()=>setPlayer(valueThree, valueFour)}>
          <EachRandomSet 
            onClick={()=>setPlayer(valueThree, valueFour)} 
            leftName = {valueThree} 
            rightName = {valueFour}
            isTeam = {props.isTeam}/>
        </div>

        <div onClick={()=>setPlayer(valueFive, valueSix)}>
          <EachRandomSet  
            leftName = {valueFive} 
            rightName = {valueSix}
            isTeam = {props.isTeam}/>
        </div>

        <div onClick={()=>setPlayer(valueSeven, valueEight)}>
          <EachRandomSet 
            onClick={()=>setPlayer(valueSeven, valueEight)} 
            leftName = {valueSeven} 
            rightName = {valueEight}
            isTeam = {props.isTeam}/>
        </div>

        <div onClick={()=>setPlayer(valueNine, valueTen)}>
          <EachRandomSet 
            onClick={()=>setPlayer(valueNine, valueTen)} 
            leftName = {valueNine} 
            rightName = {valueTen}
            isTeam = {props.isTeam}/>
        </div>
      </RandomPlayerContiner>
  )
}

export default RandomComparison;