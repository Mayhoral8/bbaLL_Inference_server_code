import React, { useState, useEffect } from 'react'

//Functions
import { structureData, pointBoxClickHandler } from './functions'

//Actions
import { getFutureGamesInfo, submitBetPoints } from '../redux/actions/betsActions'

//Components
import BetPointsOverviewBox from './Shared/betPointsOverviewBox'
import ContentHeader from './Shared/contentHeader'
import UserProfileContainer from '../UserProfile/index'
import Spinner from '../Shared/Spinner/Spinner'

//Libraries and Functions
import moment from 'moment'
import {connect} from 'react-redux'

//Styled Components
import {
    BettingPageContainer,
    ContentC,
    ContentW,
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
    OverviewHeader,
    SubmitPointsBtn
} from './styles'

const Betting=(props)=>{

    const [loader,setLoader]=useState(false)
    const [gameInfo,setGameInfo]=useState([])
    const [currentDate,setCurrentDate]=useState(null)
    const [selectedValues,setSelectedValues]=useState({})
    const [overviewKeysArray,setOverviewKeysArray]=useState([])
    const [isIndexSelected, setIsIndexSelected]=useState(false)
    const [error, setError]=useState({status:'',message:'',isError:false})

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
        setIsIndexSelected(true);
    }

    const onRemovePoints = (e, params, index) => {
        let targetObj = selectedValues
        let selectedKey = params === 'moneyLine' ? 'moneyLineSelected' : params === 'handicap' ? 'handicapSelected' : 'overUnderSelected'
        let targetGameInfoObj = gameInfo

        targetObj[index][params] = {}
        if(!targetObj[index]['moneyLine'].moneyLineOddsValue && !targetObj[index]['handicap'].handicapOddsValue && !targetObj[index]['over'].overOddsValue && !targetObj[index]['under'].underOddsValue){
            targetObj[index].gameDetails = {}
            delete targetObj[index]
            let targetObjKeys = Object.keys(targetObj)
            targetObjKeys.length === 0 ? setIsIndexSelected(false) : null
        }
        targetGameInfoObj[index][selectedKey] = ''
        let updatedKeysArray = Object.keys(targetObj)
        setOverviewKeysArray(updatedKeysArray)
        setGameInfo(targetGameInfoObj)
        setSelectedValues(targetObj)
    }

    const onSubmit = async() => {
        props.submitBetPoints(selectedValues, props.userDetails.uid)
        .then(()=>{

        })
        .catch((e)=>{
            setError({message: e.message, isError:true, status: e.status})
        })
    }

    console.log("STATE UPDATED: ",error)
    // console.log("STATE UPDATED: ",selectedValues)
    return(
        <>
            {loader ? <Spinner/>
            :
                <BettingPageContainer className='bettingPageContainer'>
                    <UserProfileContainer/>
                    <ContentC>
                        <ContentW>
                        <BetInfo>
                            <ContentHeader/>

                            {gameInfo.map((element,index)=>{
                                return(
                                    <RowC key={index*12}>
                                        <Section1>
                                            <TeamNameC>
                                                {element.gameDetails.homeTeam}
                                            </TeamNameC>
                                            <TeamNameC>
                                                {element.gameDetails.awayTeam}
                                            </TeamNameC>
                                            <DateC>
                                                {
                                                    moment(currentDate).format('DD/MM/YYYY') === moment(element.gameDetails.gameDate).format('DD/MM/YYYY') ? 'Today at ' + element.gameDetails.gameStartTime
                                                    :
                                                    moment(element.gameDetails.gameDate).format('MM/DD/YYYY')
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
                                                    onPointBoxClick(e,'over',index,'overUnderSelected',0,gameInfo[index].overUnder.overOddsValue,null,gameInfo[index].overUnder.overTotalScore)
                                                 }}
                                                >
                                                    <CommonChild>{element.overUnder.overTotalScore}</CommonChild>
                                                    <PointBoxChild>{element.overUnder.overOddsValue}</PointBoxChild>
                                                </PointsBox>

                                                <PointsBox
                                                 selected={gameInfo[index].overUnderSelected === 1} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(e,'under',index,'overUnderSelected',1,gameInfo[index].overUnder.underOddsValue,null,gameInfo[index].overUnder.underTotalScore)
                                                 }}
                                                >
                                                    <CommonChild>{element.overUnder.underTotalScore}</CommonChild>
                                                    <PointBoxChild>{element.overUnder.underOddsValue}</PointBoxChild>
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
                            {
                                isIndexSelected ?
                                <SubmitPointsBtn
                                 onClick={()=>{
                                     onSubmit()
                                 }}
                                >
                                    <span>Submit</span>
                                </SubmitPointsBtn>
                                :null
                            }
                        </BetSubmitFormC>
                        </ContentW>
                    </ContentC>
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
export default connect(mapStateToProps,{getFutureGamesInfo, submitBetPoints})(Betting)