import React from 'react';
import BoxScore from './BoxScore';
import TeamTitle from '../GameSummary/TeamTitle';

const BoxScoreContainer = ({ selectedGameIndex, gamePlayers, info }) => {

  return (
    <>
      {/* Away team */}
      <TeamTitle name={info.Away.Team} />
      <BoxScore
        data={gamePlayers}
        selectedGameIndex={selectedGameIndex}
        info={info.Away} />
      {/* Home team */}
      <TeamTitle name={info.Home.Team} customStyle={{ marginTop: '3rem' }} />
      <BoxScore
        home
        data={gamePlayers}
        selectedGameIndex={selectedGameIndex}
        info={info.Home}
      />
    </>
  )
}

export default BoxScoreContainer;