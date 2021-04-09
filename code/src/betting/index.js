import React, { useState, useEffect } from 'react'
import { structureData, pointBoxClickHandler } from './functions'
import data from './data.json'

import {
    BettingPageContainer,
    Content,
    BetInfo,
    RowC,
    TeamNameC,
    PointsBox,
    Col,
    Section1,
    Section2,
    PointBoxChild,
    DateC,
    CommonChild,
    BetSubmitFormC,
    OverviewHeader
} from './styles'

import BetPointsOverviewBox from './Shared/betPointsOverviewBox'
import ContentHeader from './Shared/contentHeader'
import UserProfileContainer from '../UserProfile/index'
import {connect} from 'react-redux'
import {getFutureGamesInfo} from '../redux/actions/betsActions'
import Spinner from '../Shared/Spinner/Spinner'
import moment from 'moment'

const Betting=(props)=>{

    const [loader,setLoader]=useState(false)
    const [gameInfo,setGameInfo]=useState([])
    const [currentDate,setCurrentDate]=useState(null)
    const [selectedValues,setSelectedValues]=useState({})
    const [overviewKeysArray,setOverviewKeysArray]=useState([])

    useEffect(() => {
        props.getFutureGamesInfo()
        window.setInterval(()=>{
            props.getFutureGamesInfo()
            
        },300000)
    },[])

    useEffect(() => {
        if(props.futureGamesInfo[0]){
            let targetArray = structureData(props.futureGamesInfo)
            setGameInfo(targetArray)
        }
        const currentDate = new Date()
        setCurrentDate(currentDate)
    },[props.futureGamesInfo])

    const onPointBoxClick = ( e, params, index, keyName, selectedKey, oddsValue, pointsValue, scoreValue ) => {
        const returnedObj = pointBoxClickHandler( e, params, index, keyName, selectedKey, oddsValue, pointsValue, scoreValue, props, selectedValues, gameInfo);
        setGameInfo( returnedObj.gameInfoUpdated );
        setSelectedValues( returnedObj.targetObj );
        setOverviewKeysArray( returnedObj.newOverviewKeysArray );
    }

    const onRemovePoints = (e, params, index) => {
        let targetObj = selectedValues
        
        let selectedKey = params === 'moneyLine' ? 'moneyLineSelected' : params === 'handicap' ? 'handicapSelected' : 'overUnderSelected'
        let targetGameInfoObj = gameInfo 

        targetObj[index][params] = {}
        if(!targetObj[index]['moneyLine'].moneyLineOddsValue && !targetObj[index]['handicap'].handicapOddsValue && !targetObj[index]['over'].overOdds && !targetObj[index]['under'].underOdds){
            targetObj[index].gameDetails = {}
            delete targetObj[index]
        }
        targetGameInfoObj[index][selectedKey] = ''
        let updatedKeysArray = Object.keys(targetObj)
        setOverviewKeysArray(updatedKeysArray)
        setGameInfo(targetGameInfoObj)
        setSelectedValues(targetObj)
    }

    // console.log("STATE UPDATED: ",gameInfo)
    console.log("STATE UPDATED: ",selectedValues)
    return(
        <>
            {loader ? <Spinner/>
            :
                <BettingPageContainer className='bettingPageContainer'>
                    <UserProfileContainer/>
                    <Content>
                        <BetInfo>
                            <ContentHeader/>

                            {gameInfo.map((element,index)=>{
                                return(
                                    <RowC key={index*12}>
                                        <Section1>
                                            <TeamNameC>
                                                {element.gameDetails['Home Team']}
                                            </TeamNameC>
                                            <TeamNameC>
                                                {element.gameDetails['Away Team']}
                                            </TeamNameC>
                                            <DateC>
                                                {
                                                    moment(currentDate).format('DD/MM/YYYY') === moment(element.gameDetails['Game Date']).format('DD/MM/YYYY') ? 'Today at ' + element.gameDetails['Game Start Time']
                                                    :
                                                    moment(element.gameDetails['Game Date']).format('MM/DD/YYYY')
                                                }
                                            </DateC>
                                        </Section1>
                                        <Section2>
                                            <Col>
                                                <PointsBox 
                                                 selected={gameInfo[index].moneyLineSelected === 0} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(e,'moneyLine',index,'moneyLineSelected',0,gameInfo[index].moneyLine.homeTeamOdds)
                                                 }}
                                                >
                                                    {element.moneyLine.homeTeamOdds}
                                                </PointsBox>

                                                <PointsBox 
                                                 selected={gameInfo[index].moneyLineSelected === 1} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(e,'moneyLine',index,'moneyLineSelected',1,gameInfo[index].moneyLine.awayTeamOdds)
                                                 }}
                                                >
                                                    {element.moneyLine.awayTeamOdds}
                                                </PointsBox>
                                            </Col>

                                            <Col>
                                                <PointsBox 
                                                 selected={gameInfo[index].handicapSelected === 0} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(e,'handicap',index,'handicapSelected',0,gameInfo[index].handicap.handicapHomeTeamOdds,gameInfo[index].handicap.handicapHomeTeamPoints)
                                                 }}
                                                >
                                                    <CommonChild>{element.handicap.handicapHomeTeamPoints}</CommonChild>
                                                    <PointBoxChild>{element.handicap.handicapHomeTeamOdds}</PointBoxChild>
                                                </PointsBox>

                                                <PointsBox 
                                                 selected={gameInfo[index].handicapSelected === 1} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(e,'handicap',index,'handicapSelected',1,gameInfo[index].handicap.handicapAwayTeamOdds,gameInfo[index].handicap.handicapAwayTeamPoints)
                                                 }}
                                                >
                                                    <CommonChild>{element.handicap.handicapAwayTeamPoints}</CommonChild>
                                                    <PointBoxChild>{element.handicap.handicapAwayTeamOdds}</PointBoxChild>
                                                </PointsBox>
                                            </Col>

                                            <Col>
                                                <PointsBox 
                                                 selected={gameInfo[index].overUnderSelected === 0} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(e,'over',index,'overUnderSelected',0,gameInfo[index].overUnder.overOdds,null,gameInfo[index].overUnder.overTotalScore)
                                                 }}
                                                >
                                                    <CommonChild>{element.overUnder.overTotalScore}</CommonChild>
                                                    <PointBoxChild>{element.overUnder.overOdds}</PointBoxChild>
                                                </PointsBox>

                                                <PointsBox
                                                 selected={gameInfo[index].overUnderSelected === 1} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(e,'under',index,'overUnderSelected',1,gameInfo[index].overUnder.underOdds,null,gameInfo[index].overUnder.underTotalScore)
                                                 }}
                                                >
                                                    <CommonChild>{element.overUnder.underTotalScore}</CommonChild>
                                                    <PointBoxChild>{element.overUnder.underOdds}</PointBoxChild>
                                                </PointsBox>
                                            </Col>
                                        </Section2>
                                    </RowC>
                                )
                            })
                            }

                        </BetInfo>
                        <BetSubmitFormC>
                            <OverviewHeader>Summary</OverviewHeader>

                            {overviewKeysArray.map((element,index)=>{
                                return(
                                    <BetPointsOverviewBox 
                                     selectedValues={selectedValues} 
                                     index={element} 
                                     key={index}
                                     onRemovePoints={onRemovePoints}
                                    />
                                )
                            })}
                        </BetSubmitFormC>
                    </Content>
                </BettingPageContainer>
            }
        </>     
    )
}
const mapStateToProps=(state)=>{
    return{
        futureGamesInfo: state.betsReducer.futureGamesInfo,
        userDetails: state.authReducer.userDetails
    }
}
export default connect(mapStateToProps,{getFutureGamesInfo})(Betting)