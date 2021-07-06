import React, {useEffect, useState} from 'react';
import firebase from "firebase/app";
import {connect} from 'react-redux';
import { getFutureGamesInfo } from '../../redux/actions/betsActions';
import EachBet from './eachBet';

const Advertisement = ({futureGames}) => {

  return(
    futureGames.length == 0 ? <></> :
    <>
      {futureGames.map((eachData, id) => {
         
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