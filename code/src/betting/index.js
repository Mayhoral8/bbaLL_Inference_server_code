import React,{useState,useEffect} from 'react'
import {structureData} from './functions'
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

    useEffect(()=>{
        props.getFutureGamesInfo()
        window.setInterval(()=>{
            props.getFutureGamesInfo()
            
        },300000)
    },[])

    useEffect(()=>{
        if(props.futureGamesInfo[0]){
            let targetArray=structureData(props.futureGamesInfo)
            setGameInfo(targetArray)
        }
        const currentDate=new Date()
        setCurrentDate(currentDate)
    },[props.futureGamesInfo])

    const onPointBoxClick=(e,params,index,keyName,selectedKey,oddsValue,pointsValue,scoreValue)=>{
        let gameInfoUpdated = [...gameInfo]
        gameInfoUpdated[index][keyName] = selectedKey
        let targetObj={...selectedValues}
        targetObj[index]={...data.selectedValues}
        if(props.userDetails){
            if(params==='moneyLine'){
                targetObj[index][params].moneyLineOddsValue=oddsValue
            } else if(params==='handicap'){
                targetObj[index][params].handicapOddsValue=oddsValue
                targetObj[index][params].handicapPointsValue=pointsValue
            } else{
                if(params.includes('over')){
                    targetObj[index][params].overOdds=oddsValue
                    targetObj[index][params].overTotalScoreValue=scoreValue
                    targetObj[index]['under'].underOdds=null
                    targetObj[index]['under'].underTotalScoreValue=null
                } else{
                    targetObj[index][params].underOdds=oddsValue
                    targetObj[index][params].underTotalScoreValue=scoreValue
                    targetObj[index]['over'].overOdds=null
                    targetObj[index]['over'].overTotalScoreValue=null
                }
            }
            targetObj[index].gameDetails=gameInfoUpdated[index].gameDetails
            let newOverviewKeysArray=Object.keys(targetObj)
            setGameInfo(gameInfoUpdated)
            setSelectedValues({...targetObj})
            setOverviewKeysArray([...newOverviewKeysArray])
        } else{
            props.history.push('/login')    
        }
    }

    console.log("STATE UPDATED: ",gameInfo)
    console.log("STATE UPDATED: ",selectedValues)
    return(
        <>
            {loader?<Spinner/>:
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
                                    <BetPointsOverviewBox selectedValues={selectedValues} index={element}/>
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