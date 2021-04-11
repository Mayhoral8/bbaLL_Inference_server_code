import React from 'react';
import BoxScore from './BoxScore';
import TeamTitle from '../GameSummary/TeamTitle';
import styled from 'styled-components';

const BoxScoreContainer = ({ selectedGameIndex, gamePlayers, info }) => {

  return (
    <>
    <BoxScoreContainerWrapper>
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
      </BoxScoreContainerWrapper>
    </>
  )
}

const BoxScoreContainerWrapper = styled.div`
  border-bottom: 1px solid silver;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
`

export default BoxScoreContainer;