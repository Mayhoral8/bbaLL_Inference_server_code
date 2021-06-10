import React from 'react'

import {
    PointsBoxContainer,
    PointsWrapper,
    PointsSpinnerContainer,
    LockIconContainer,
    LockIcon,
    PointsValueContainer,
    OddsValueContainer,
    TotalScoreValueContainer,
    MoneyLineOddsContainer,
    TeamIconOddsContainer,
    TeamIconContainer,
    ArrowIconContainer,
    ArrowIcon,
    TeamIcon
} from './pointsBoxStyles'

import {ClipLoader} from 'react-spinners'

import blueLock from '../../assets/images/blueLock.png'
import yellowLock from '../../assets/images/yellowLock.png'
import redLock from '../../assets/images/redLock.png'
import overIcon from '../../assets/images/overIcon.png'
import underIcon from '../../assets/images/underIcon.png'

const PointsBox = ({
    type,
    overOrUnder,
    overOrUnderOddsValue,
    overOrUnderTotalScore,
    homeOrAway,
    index,
    gameInfo,
    selectedClass,
    element,
    colIndex,
    onPointBoxClick,
    isGameStartTimeBeforeTheCurrentTime,
    teamIconsObj,
    pointsSpinner
}) => {
    return(
        <PointsBoxContainer 
         selected = {
             gameInfo[index][selectedClass] === colIndex
            } 
         onClick={(e)=>{
            if(type === 'moneyLine'){
                onPointBoxClick(
                    e,
                    type,
                    index,
                    gameInfo[index].gameId,
                    selectedClass,
                    element.moneyLine[homeOrAway].bettingSide,
                    colIndex,
                    gameInfo[index].moneyLine[homeOrAway].odds,
                    null,
                    null,
                    element.moneyLineSelected,
                    element.moneyLine.selected,
                    isGameStartTimeBeforeTheCurrentTime
                )
            }
            else if(type === 'handicap'){
                onPointBoxClick(
                    e,
                    type,
                    index,
                    gameInfo[index].gameId,
                    selectedClass,
                    element.handicap[homeOrAway].bettingSide,
                    colIndex,
                    gameInfo[index].handicap[homeOrAway].odds,
                    gameInfo[index].handicap[homeOrAway].points,
                    null,
                    element.handicapSelected,
                    element.handicap.selected,
                    isGameStartTimeBeforeTheCurrentTime
                )
            }
            else{
                onPointBoxClick(
                    e,
                    overOrUnder,
                    index,
                    gameInfo[index].gameId,
                    selectedClass,
                    null,
                    colIndex,
                    gameInfo[index].overUnder[overOrUnderOddsValue],
                    null,
                    gameInfo[index].overUnder[overOrUnderTotalScore],
                    element.overUnderSelected,
                    element.overUnder.selected,
                    isGameStartTimeBeforeTheCurrentTime
                )
            }
         }}
        >
            {
            pointsSpinner ? 
                <PointsSpinnerContainer>
                    <ClipLoader color = '#C4C4C4' size = '' loading = {pointsSpinner}/>
                </PointsSpinnerContainer>
            :
                <PointsWrapper>
                    {
                        type === 'moneyLine' ? 
                            <MoneyLineOddsContainer>

                                <TeamIconContainer>
                                    <TeamIcon src = {
                                        homeOrAway === 'homeTeam' ? teamIconsObj.homeTeamIcon : teamIconsObj.awayTeamIcon
                                    }/>
                                </TeamIconContainer>

                                {
                                    element.moneyLine[homeOrAway].odds
                                }
                            </MoneyLineOddsContainer>
                        :
                        type === 'handicap' ?
                            <>
                                <PointsValueContainer>
                                    {
                                        element.handicap[homeOrAway].points
                                    }
                                </PointsValueContainer>
                                <TeamIconOddsContainer>

                                    <TeamIconContainer>
                                        <TeamIcon src = {
                                            homeOrAway === 'homeTeam' ? teamIconsObj.homeTeamIcon : teamIconsObj.awayTeamIcon
                                        }/>
                                    </TeamIconContainer>

                                    <OddsValueContainer>
                                        {
                                            element.handicap[homeOrAway].odds
                                        }
                                    </OddsValueContainer>

                                </TeamIconOddsContainer>
                            </>
                        :
                        <>
                            <TotalScoreValueContainer>
                                {
                                    element.overUnder[overOrUnderTotalScore]
                                }
                            </TotalScoreValueContainer>

                            <TeamIconOddsContainer>

                                <ArrowIconContainer>
                                    <ArrowIcon src = {
                                        overOrUnder == 'under' ? underIcon : overIcon
                                    }/>
                                </ArrowIconContainer>

                                <OddsValueContainer>
                                    {
                                        element.overUnder[overOrUnderOddsValue]
                                    }
                                </OddsValueContainer>

                            </TeamIconOddsContainer>
                        </>
                    }

                    {
                        type === 'overUnder' ? 
                            element[type].selected ?
                            <LockIconContainer>
                                <LockIcon src={blueLock}/>
                            </LockIconContainer>
                            :
                            !element[type][overOrUnderOddsValue]
                            ?
                            <LockIconContainer>
                                <LockIcon src={yellowLock}/>
                            </LockIconContainer>
                            :
                            !isGameStartTimeBeforeTheCurrentTime?
                            <LockIconContainer>
                                <LockIcon src={redLock}/>
                            </LockIconContainer>
                            :
                            null
                        :

                        [
                            element[type].selected ?
                        <LockIconContainer>
                            <LockIcon src={blueLock}/>
                        </LockIconContainer>
                        :
                        !element[type][homeOrAway].odds
                        ?
                        <LockIconContainer>
                            <LockIcon src={yellowLock}/>
                        </LockIconContainer>
                        :
                        !isGameStartTimeBeforeTheCurrentTime?
                        <LockIconContainer>
                            <LockIcon src={redLock}/>
                        </LockIconContainer>
                        :
                        null
                        ]
                    }
                </PointsWrapper>
            }

        </PointsBoxContainer>
    )
}

export default PointsBox