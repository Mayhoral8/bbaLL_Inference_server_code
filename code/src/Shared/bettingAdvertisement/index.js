import React, {useEffect, useState} from 'react';
import EachBet from './eachBet';

const Advertisement = ({futureGames}) => {

  return(
    futureGames.length == 0 ? <></> :
    <>
      {futureGames.slice(0, 2).map((eachData, id) => {
         
        return(
          <div key = {id}>
            <EachBet data = {eachData}/>
          </div>
        )
      })}
    </>
  )
}


export default Advertisement;