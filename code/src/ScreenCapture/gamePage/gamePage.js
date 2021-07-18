import React, {useRef, useState, useEffect} from 'react';

import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

import { exportComponentAsJPEG } from 'react-component-export-image'
import { ABB2TEAM } from "../../constants";
import { getKeyByValue } from "../../Shared/Functions/GetKeyByValue";

import Overview from '../../GameStats/Components/Overview/Overview';
import GameStats from '../../GameStats/Components/GameStats/GameStatsTable';
import BoxScore from '../../GameStats/Components/Boxscore/BoxScoreContainer';
import GameSummaryBanner from '../../GameStats/Components/GameSummary/GameSummaryBanner'

import {
    GamePageContainer,
    OverviewContainer,
    GameStatsContainer,
    BoxScoreContainer,
    GameSummaryWrapper
} from './gamePageStyles'

const GamePage = () => {
    const [containerType, setContainerType] = useState('overview')
    const [startCapture, setStartCapture] = useState('await')

    const overviewReference = useRef(null)
    const gameStatsReference = useRef(null)
    const homeBoxScoreReference = useRef(null)
    const awayBoxScoreReference = useRef(null)

    useEffect(() => {
        setStartCapture('start')
    }, [])

    useEffect(() => {
        
        setTimeout(() => {
            if(startCapture === 'start'){
                if(containerType === 'overview'){
                    // exportComponentAsJPEG(overviewReference, {fileName: 'overviewCard'})
                    setContainerType('gameStats')
                }
                else if(containerType === 'gameStats'){
                    // exportComponentAsJPEG(gameStatsReference, {fileName: 'gameStatsCard'})
                    setContainerType('boxScoreHome')
                }
                else if(containerType === 'boxScoreHome'){
                    // exportComponentAsJPEG(homeBoxScoreReference, {fileName: 'boxScoreHomeTeamCard'})
                    setContainerType('boxScoreAway')
                }
                else if(containerType === 'boxScoreAway'){
                    // exportComponentAsJPEG(awayBoxScoreReference, {fileName: 'boxScoreAwayTeamCard'})
                }
            }
        }, 5000);
    }, [containerType, startCapture])

    const currentYear = '2020-21';
    useFirestoreConnect(() => [
        {
            collection: 'game_info',
            doc: currentYear,
            subcollections: [
                {
                    collection: 'Gamecode'
                }
            ],
            storeAs: 'gameInfoJson'
        },
        {
            collection: 'game_pbp',
            doc: currentYear,
            subcollections: [
                {
                    collection: 'Gamecode'
                }
            ],
            storeAs: 'gamePbpJson'
        },
        {
            collection: 'game_players',
            doc: currentYear,
            subcollections: [
                {
                    collection: 'Gamecode'
                }
            ],
            storeAs: 'gamePlayersJson'
        },
    ]);

    const gameInfo = useSelector(state => state.firestoreReducer.ordered.gameInfoJson);
    const gamePbp = useSelector(state => state.firestoreReducer.ordered.gamePbpJson);
    const gamePlayers = useSelector(state => state.firestoreReducer.ordered.gamePlayersJson);
    let abbreviatedAwayTeam
    let abbreviatedHomeTeam
    if(gameInfo){
        abbreviatedHomeTeam = getKeyByValue(ABB2TEAM, gameInfo[0].Home.Team);
        abbreviatedAwayTeam = getKeyByValue(ABB2TEAM, gameInfo[0].Away.Team);
    }

    if(!gameInfo || !gamePlayers){
        return(
            <GamePageContainer>
                Loading
            </GamePageContainer>
        )
    }
    else{
        return(
            <GamePageContainer>
                <OverviewContainer>
                    <GameSummaryWrapper>
                        <div className='single-summary'>
                            <div className="top-section">
                                <GameSummaryBanner
                                 homeTeam={gameInfo[0].Home.Team}
                                 awayTeam={gameInfo[0].Away.Team}
                                 abbreviatedHomeTeam={abbreviatedHomeTeam}
                                 abbreviatedAwayTeam={abbreviatedAwayTeam}
                                >
                                    <div className="game-summary">
                                        <h2>{gameInfo[0].Away.points}</h2>
                                        <h2 className="colon">:</h2>
                                        {/* <QuarterlyTable rowData={gameSummaryTableData} hide /> */}
                                        <h2>{gameInfo[0].Home.points}</h2>
                                    </div>
                                </GameSummaryBanner>

                                <div className="mobile-quarterly-container">
                                {/* <QuarterlyTable rowData={gameSummaryTableData} /> */}
                                </div>
                            </div>
                        </div>
                    </GameSummaryWrapper>
                    
                    <Overview
                     highlights={gameInfo[0].Highlights.Text}
                     YoutubeHighlight={gameInfo[0].Common.YoutubeHighlight}
                     screenCapture = {true}
                     reference = {overviewReference}
                    />
                    </OverviewContainer>
                {/* {
                    containerType === 'overview' 
                    ?
                    <OverviewContainer>
                        <Overview
                         highlights={gameInfo[0].Highlights.Text}
                         YoutubeHighlight={gameInfo[0].Common.YoutubeHighlight}
                         screenCapture = {true}
                         reference = {overviewReference}
                        />
                    </OverviewContainer>
                    :
                    null
                }

                {
                    containerType === 'gameStats'
                    ?
                    <GameStatsContainer>
                        <GameStats 
                         info = {gameInfo[0]}
                         reference = {gameStatsReference}
                        />
                    </GameStatsContainer>
                    :null
                }

                {
                    containerType.includes('boxScore')
                    ?
                    <BoxScoreContainer>
                        <BoxScore
                         selectedGameIndex = {0}
                         gamePlayers = {gamePlayers}
                         info = {gameInfo[0]}
                         screenCapture = {true}
                         containerType = {containerType}
                         homeBoxScoreReference = {homeBoxScoreReference}
                         awayBoxScoreReference = {awayBoxScoreReference}
                        />
                    </BoxScoreContainer>
                    :
                    null
                } */}
            </GamePageContainer>
        )
    }
}

export default GamePage