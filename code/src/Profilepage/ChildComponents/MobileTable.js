import React from 'react';
import { Continer,
        LeftInformation,
        RightInformation,
        MobileWrapper } from '../Styles/mobileStyle';

const EachColum = (
  { bettingType, 
    isGameFinish, 
    score, 
    homeTeam, 
    awayTeam, 
    winTeam, 
    date,
    betOdds, 
    time }) => {
  
  let displayInformation = "";

  if (bettingType.includes('Money Line')) {
    let tempArray = bettingType.split(' ');
    bettingType = tempArray[0] + ' ' + tempArray[1];
    displayInformation = winTeam + " wins";
  } else if (bettingType.includes('Spread')) {
    let array = bettingType.split(' ');
    let number = array[1].replace(/[{()}]/g, '');
    let winTeamArray = winTeam.split(' ');
    let newWinTeamString = winTeamArray[winTeamArray.length - 1];
    displayInformation = newWinTeamString + " wins with " + number + " spread ";
  } else if (bettingType.includes('Over & Under')) {
    let array = bettingType.split(' ');
    let number = array[3].replace(/[{()}]/g, '');
    displayInformation = "Total score over " + number;
    bettingType = array[0] + ' ' + array[1] + ' ' + array[2];
  }
    
  return(
    <Continer>
      <LeftInformation>
        <div className='dispalyInfo'>{displayInformation}</div>
        <div className='teamNames'>{homeTeam} - {awayTeam}</div>
        <div className='betInfo'>Bet: {betOdds}</div>
      </LeftInformation>
      <RightInformation>
        <div className='bettingType'>{bettingType}</div>
        <div className='dateInfo'>{date} {time}</div>
        {
          isGameFinish == 'Finished' ? 
            (<div className='gameFinish finish'>{isGameFinish}</div>) : 
            (<div className='gameFinish ongoing'>{isGameFinish}</div>)
        }
      </RightInformation>
    </Continer>
  )
}

const MobileTable = ({data}) => {
  let dataObejct = data.map((eachBet, i) => ({id: i, info: eachBet}));
  return(
    dataObejct.length > 0 ? 
    <MobileWrapper>
    {
      dataObejct.map((eachBet) => {
        let teamNamesArray = (eachBet.info['vs']).split('vs');
        let awayTeamAndWinteam = teamNamesArray[1].split('--');
        let DateArray = (eachBet.info['gameDateTime']).split(' ');

        let bettingType = eachBet.info['BettingType'];
        let isGameFinish = eachBet.info['gameFinished'];
        let score = eachBet.info['score'];
        let betOdds = eachBet.info['betOdds'];
        let homeTeam = teamNamesArray[0];
        let awayTeam = awayTeamAndWinteam[0];
        let winTeam = awayTeamAndWinteam[1];
        let date = DateArray[0];
        let time = DateArray[1];

        return(
          <EachColum 
            key={eachBet.id}
            bettingType = {bettingType} 
            isGameFinish = {isGameFinish}
            score = {score}
            homeTeam = {homeTeam}
            awayTeam = {awayTeam}
            winTeam = {winTeam}
            date = {date}
            time = {time}
            betOdds = {betOdds}
          /> 
        )
      })
    } 
    </MobileWrapper>
    :
    <MobileWrapper>
      <div className="message">
        No Data Available
      </div>
    </MobileWrapper>
  )
};

export default MobileTable
