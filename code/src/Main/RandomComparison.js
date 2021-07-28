import React from 'react';
import EachRandomSet from "./EachRandomSet";
import { useHistory } from "react-router-dom";
import { Wrapper } from './RandomComparison-style';

const RandomComparison = ({nameArray, loadRandomPlayers}) => {
  const history = useHistory();

  function routeChange(playerOne, playerTwo, year){
    let nameOne = (playerOne).replace(/ /g, '_').replace('.', ',');
    let nameTwo = (playerTwo).replace(/ /g, '_').replace('.', ',');
    let path = `/comparison/players/per-game?nameOne=${nameOne}&yearOne=2020-21&nameTwo=${nameTwo}&yearTwo=2020-21`; 
    history.push(path);
  }

  return(
    <Wrapper> 
      {nameArray.map((eachPair, index)=> {
          return(
            <div 
              key={index} 
              onClick={()=>routeChange(eachPair.nameOne, eachPair.nameTwo, '2020-21')}
              className='eachRandomSetWrapper'>
              <EachRandomSet 
                leftName={eachPair.nameOne}
                rightName={eachPair.nameTwo}
                isTeam = {false}/>
            </div>
          )
        })}
      <div className={"centerButton"}>
        <button
          className={"button"}
          onClick={() => loadRandomPlayers()}
        ></button>
      </div>
    </Wrapper>
  )
}

export default RandomComparison;