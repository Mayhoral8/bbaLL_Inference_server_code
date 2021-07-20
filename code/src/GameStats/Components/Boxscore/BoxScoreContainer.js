import React from 'react';
import BoxScore from './BoxScore';
import TeamTitle from '../GameSummary/TeamTitle';
import { BoxScoreContainerWrapper, HomeTeamBoxScore, AwayTeamBoxScore } from "./BoxScore-style";

const BoxScoreContainer = ({ selectedGameIndex, gamePlayers, info, screenCapture, containerType }) => {

  if(screenCapture){
    if(containerType === 'boxScoreHome'){
      return (
        <>
          <BoxScoreContainerWrapper>
            <HomeTeamBoxScore>
              <TeamTitle name={info.Home.Team} />
              <BoxScore
                home
                data={gamePlayers}
                selectedGameIndex={selectedGameIndex}
                info={info.Home} />
            </HomeTeamBoxScore>
          </BoxScoreContainerWrapper>
        </>
      )
    }
    
    else{
      return (
        <>
          <BoxScoreContainerWrapper>
            <AwayTeamBoxScore>
              <TeamTitle name={info.Away.Team} customStyle={{ marginTop: '3rem' }} />
              <BoxScore
                data={gamePlayers}
                selectedGameIndex={selectedGameIndex}
                info={info.Away}
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
          <HomeTeamBoxScore>
            <TeamTitle name={info.Away.Team} />
            <BoxScore
              data={gamePlayers}
              selectedGameIndex={selectedGameIndex}
              info={info.Away} />
          </HomeTeamBoxScore>
  
          <AwayTeamBoxScore>
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