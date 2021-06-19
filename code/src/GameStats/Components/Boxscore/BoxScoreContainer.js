import React, {useRef} from 'react';
import BoxScore from './BoxScore';
import TeamTitle from '../GameSummary/TeamTitle';
import { BoxScoreContainerWrapper, HomeTeamBoxScore, AwayTeamBoxScore } from "./BoxScore-style";

const BoxScoreContainer = ({ selectedGameIndex, gamePlayers, info }) => {
  const homeTeamBoxScoreRef = useRef(null)
  const awayTeamBoxScoreRef = useRef(null)
  return (
    <>
    <BoxScoreContainerWrapper>

      <HomeTeamBoxScore ref = {homeTeamBoxScoreRef}>

        <TeamTitle name={info.Away.Team} />
        <BoxScore
          data={gamePlayers}
          selectedGameIndex={selectedGameIndex}
          info={info.Away} />

      </HomeTeamBoxScore>

      <AwayTeamBoxScore ref = {awayTeamBoxScoreRef}>

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

export default BoxScoreContainer;