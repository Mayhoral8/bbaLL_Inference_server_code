import React, {useRef, useState, useEffect} from 'react';

import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

import { exportComponentAsJPEG } from 'react-component-export-image'
import { ABB2TEAM } from "../../constants";
import { getKeyByValue } from "../../Shared/Functions/GetKeyByValue";
import momentTimezone from 'moment-timezone'

import Overview from '../../GameStats/Components/Overview/Overview';
import GameStats from '../../GameStats/Components/GameStats/GameStatsTable';
import BoxScore from '../../GameStats/Components/Boxscore/BoxScoreContainer';
import GameSummaryBanner from '../../GameStats/Components/GameSummary/GameSummaryBanner'
import QuarterlyTable from '../../GameStats/Components/GameSummary/QuarterlyTable'

import {
    GamePageContainer,
    OverviewContainer,
    GameStatsContainer,
    BoxScoreContainer,
    GameSummaryWrapper
} from './gamePageStyles'

const { WebClient } = require('@slack/web-api');
const slack = new WebClient(process.env.REACT_APP_SLACK_TOKEN, { retries: 0  });

const GamePage = () => {
    const [containerType, setContainerType] = useState('overview')
    const [startCapture, setStartCapture] = useState('await')

    let overviewRefsArray = useRef(null)
    let statsRefsArray = useRef(null)
    let homeBoxScoreRefsArray = useRef(null)
    let awayBoxScoreRefsArray = useRef(null)

    let gameInfo
    let gamePlayers

    useEffect(() => {
        setStartCapture('start')
    }, [])

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

    gameInfo = useSelector(state => state.firestoreReducer.ordered.gameInfoJson);
    gamePlayers = useSelector(state => state.firestoreReducer.ordered.gamePlayersJson)

    useEffect(() => {
        
        setTimeout(async() => {
            if(startCapture === 'start' && gameInfo){
                console.log(gameInfo)
                if(containerType === 'overview'){

                    for(let i = 0; i < overviewRefsArray.current.length; i++){
                        let nodeObject = {
                            current: overviewRefsArray.current[i]
                        }

                        let fileName = `Overview Card | ${gameInfo[i]['Away']['Team']} vs ${gameInfo[i]['Home']['Team']}`
                        exportComponentAsJPEG(nodeObject, {fileName})
                        await triggerSlackMessage(fileName)
                    }
                    setContainerType('gameStats')
                }

                else if(containerType === 'gameStats'){

                    for(let i = 0; i < statsRefsArray.current.length; i++){
                        let nodeObject = {
                            current: statsRefsArray.current[i]
                        }

                        let fileName = `Stats Card | ${gameInfo[i]['Away']['Team']} vs ${gameInfo[i]['Home']['Team']}`
                        exportComponentAsJPEG(nodeObject, {fileName})
                        await triggerSlackMessage(fileName)
                    }
                    setContainerType('boxScoreHome')
                }

                else if(containerType === 'boxScoreHome'){

                    for(let i = 0; i < homeBoxScoreRefsArray.current.length; i++){
                        let nodeObject = {
                            current: homeBoxScoreRefsArray.current[i]
                        }

                        let fileName = `Box Score Card | Home Team | ${gameInfo[i]['Home']['Team']}`
                        exportComponentAsJPEG(nodeObject, {fileName})
                        await triggerSlackMessage(fileName)
                    }
                    setContainerType('boxScoreAway')
                }

                else if(containerType === 'boxScoreAway'){

                    for(let i = 0; i < awayBoxScoreRefsArray.current.length; i++){
                        let nodeObject = {
                            current: awayBoxScoreRefsArray.current[i]
                        }

                        let fileName = `Box Score Card | Away Team | ${gameInfo[i]['Away']['Team']}`
                        exportComponentAsJPEG(nodeObject, {fileName})
                        await triggerSlackMessage(fileName)
                    }
                }
            }
        }, 10000);
    }, [containerType, startCapture, gameInfo])

    const triggerSlackMessage = async(fileName) => {
        const date = momentTimezone(new Date()).tz("America/New_York").format('YYYY-MM-DD hh:mm A')
        await slack.chat.postMessage({
          text: `Games page image added: {${date}}  {${fileName}}`,
          channel: process.env.REACT_APP_SLACK_CHANNEL_ID,
        });
      }

    if(gameInfo){
        overviewRefsArray.current = new Array(gameInfo.length)
        statsRefsArray.current = new Array(gameInfo.length)
        homeBoxScoreRefsArray.current = new Array(gameInfo.length)
        awayBoxScoreRefsArray.current = new Array(gameInfo.length)
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
                {
                    gameInfo.map((element, index) => {
                        let abbreviatedHomeTeam = getKeyByValue(ABB2TEAM, element.Home.Team);
                        let abbreviatedAwayTeam = getKeyByValue(ABB2TEAM, element.Away.Team);
                        const homeQuarterlyScores = [
                            element.Q1.Home.points,
                            element.Q2.Home.points,
                            element.Q3.Home.points,
                            element.Q4.Home.points,
                            element.OT ? element.OT.Home.points : null,
                          ];
                          const awayQuarterlyScores = [
                            element.Q1.Away.points,
                            element.Q2.Away.points,
                            element.Q3.Away.points,
                            element.Q4.Away.points,
                            element.OT ? element.OT.Away.points : null,
                          ];
                          const gameSummaryTableData = [
                            {
                              title: "Away",
                              quarterValues: awayQuarterlyScores,
                              total: element.Away.points,
                            },
                            {
                              title: "Home",
                              quarterValues: homeQuarterlyScores,
                              total: element.Home.points,
                            },
                          ];
                        return(
                            <div key = {index} className = {containerType}>
                                {
                                    containerType === 'overview' 
                                    ?
                                    <OverviewContainer ref = {referedEl => overviewRefsArray.current[index] = referedEl}>
                                        <GameSummaryWrapper>
                                            <div className='single-summary'>
                                                <div className="top-section">
                                                    <GameSummaryBanner
                                                     homeTeam={element.Home.Team}
                                                     awayTeam={element.Away.Team}
                                                     abbreviatedHomeTeam={abbreviatedHomeTeam}
                                                     abbreviatedAwayTeam={abbreviatedAwayTeam}
                                                    >
                                                        <div className="game-summary">
                                                            <h2>{element.Away.points}</h2>
                                                            <h2 className="colon">:</h2>
                                                            <QuarterlyTable rowData={gameSummaryTableData} hide />
                                                            <h2>{element.Home.points}</h2>
                                                        </div>
                                                    </GameSummaryBanner>

                                                    <div className="mobile-quarterly-container">
                                                    <QuarterlyTable rowData={gameSummaryTableData} />
                                                    </div>
                                                </div>
                                            </div>
                                        </GameSummaryWrapper>
                                        
                                        <Overview
                                         highlights={element.Highlights.Text}
                                         YoutubeHighlight={element.Common.YoutubeHighlight}
                                         screenCapture = {true}
                                        />
                                    </OverviewContainer>
                                    :
                                    null
                                }

                                {
                                    containerType === 'gameStats'
                                    ?
                                    <GameStatsContainer ref = {referedEl => statsRefsArray.current[index] = referedEl}>
                                        <GameStats 
                                         info = {element}
                                        />
                                    </GameStatsContainer>
                                    :null
                                }

                                {
                                    containerType.includes('boxScore')
                                    ?
                                    <BoxScoreContainer ref = {referedEl => containerType === 'boxScoreHome' ? homeBoxScoreRefsArray.current[index] = referedEl : awayBoxScoreRefsArray.current[index] = referedEl}>
                                        <BoxScore
                                         selectedGameIndex = {index}
                                         gamePlayers = {gamePlayers}
                                         info = {element}
                                         screenCapture = {true}
                                         containerType = {containerType}
                                        />
                                    </BoxScoreContainer>
                                    :
                                    null
                                }
                            </div>
                        )
                    })
                }
            </GamePageContainer>
        )
    }
}

export default GamePage