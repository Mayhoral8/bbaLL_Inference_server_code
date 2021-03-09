import React from 'react'
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { FullWidthMain } from '../globalStyles'
import GamePage from './GamePage'
import SEO from '../Shared/SEO';

const GamePageContainer = () => {
  const currentYear = '2020-21';
  useFirestoreConnect(() => [
    {
      collection: 'game_info',
      doc: currentYear,
      subcollections: [{
        collection: 'Gamecode'
      }],
      storeAs: 'gameInfoJson'
    },
    {
      collection: 'game_pbp',
      doc: currentYear,
      subcollections: [{
        collection: 'Gamecode'
      }],
      storeAs: 'gamePbpJson'
    },
    {
      collection: 'game_players',
      doc: currentYear,
      subcollections: [{
        collection: 'Gamecode'
      }],
      storeAs: 'gamePlayersJson'
    },
  ]);
  const gameInfo = useSelector(state => state.firestoreReducer.ordered.gameInfoJson);
  const gamePbp = useSelector(state => state.firestoreReducer.ordered.gamePbpJson);
  const gamePlayers = useSelector(state => state.firestoreReducer.ordered.gamePlayersJson);
  return (
    <>
      <SEO title="NBA game analytics" description="NBA game analytics - powered by AI, Machine learning, & Statistics. We provide match facts, boxscores, shot types, fantasy ranking, and time series analysis. The time series analysis consists of game of runs, effective field goal percentage, fantasy scores, plays (possessions), and play by play texts. We aim to have the most accurate and fastest sports stats provider."/>
      <FullWidthMain>
        <GamePage
          gameInfo={gameInfo}
          gamePbp={gamePbp}
          gamePlayers={gamePlayers}
        />
      </FullWidthMain>
    </>
  )
}

export default GamePageContainer