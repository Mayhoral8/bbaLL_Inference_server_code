import React from 'react';
import BoxScore from './BoxScore';
import TeamTitle from '../GameSummary/TeamTitle';
import { BoxScoreContainerWrapper, HomeTeamBoxScore, AwayTeamBoxScore } from "./BoxScore-style";

const BoxScoreContainer = ({ selectedGameIndex, gamePlayers, info, screenCapture, containerType, homeTeamBoxScoreReference, awayTeamBoxScoreReference }) => {

  if(screenCapture){
    if(containerType === 'boxScoreHome'){
      return (
        <>
          <BoxScoreContainerWrapper>
            <HomeTeamBoxScore ref = {homeTeamBoxScoreReference}>
              <TeamTitle name={info.Away.Team} />
              <BoxScore
                data={gamePlayers}
                selectedGameIndex={selectedGameIndex}
                info={info.Away} />
            </HomeTeamBoxScore>
          </BoxScoreContainerWrapper>
        </>
      )
    }
    else{
      return (
        <>
          <BoxScoreContainerWrapper>
            <AwayTeamBoxScore ref = {awayTeamBoxScoreReference}>
              <TeamTitle name={info.Home.Team} customStyle={{ marginTop: '3rem' }} />
              <BoxScore
                home
                data={gamePlayers}
                selectedGameIndex={selectedGameIndex}
                info={info.Home}
              />
            </AwayTeamBoxScore>
          </BoxScoreContainerWrapper>
        </>
      )
    }
  }
  else{
    return (
      <>
        <BoxScoreContainerWrapper>
          <HomeTeamBoxScore ref = {homeTeamBoxScoreReference}>
            <TeamTitle name={info.Away.Team} />
            <BoxScore
              data={gamePlayers}
              selectedGameIndex={selectedGameIndex}
              info={info.Away} />
          </HomeTeamBoxScore>
  
          <AwayTeamBoxScore ref = {awayTeamBoxScoreReference}>
            <TeamTitle name={info.Home.Team} customStyle={{ marginTop: '3rem' }} />
            <BoxScore
              home
              data={gamePlayers}
              selectedGameIndex={selectedGameIndex}
              info={info.Home}
            />
          </AwayTeamBoxScore>
        </BoxScoreContainerWrapper>
      </>
    )
  }
}

export default BoxScoreContainer;