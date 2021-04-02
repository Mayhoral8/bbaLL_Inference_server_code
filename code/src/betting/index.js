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
    BetSubmitFormC
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
    const [moneyLine,setMoneyLine]=useState('')
    const [handicap,setHandicap]=useState('')
    const [overUnder,setOverUnder]=useState('')

    useEffect(()=>{
        props.getFutureGamesInfo()
        window.setInterval(()=>{
            props.getFutureGamesInfo()
            
        },300000)
    },[])

    useEffect(()=>{
        if(props.futureGamesInfo[0]){
            let targetArray=structureData(props.futureGamesInfo)

            targetArray.moneyLineItemsArray=[...data.moneyLineItemsArray]
            targetArray.handicapItemsArray=[...data.handicapItemsArray]
            targetArray.overUnderItemsArray=[...data.overUnderItemsArray]
            setGameInfo(targetArray)
        }
        const currentDate=new Date()
        setCurrentDate(currentDate)
    },[props.futureGamesInfo])

    const onPointBoxClick=(e,params,index)=>{
        if(params==='moneyLine'){

        } else if(params==='handicap'){

        } else{

        }
    }

    console.log("STATE: ",gameInfo)
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
                                                {element.moneyLine['Home Team']}
                                            </TeamNameC>
                                            <TeamNameC>
                                                {element.moneyLine['Away Team']}
                                            </TeamNameC>
                                            <DateC>
                                                {
                                                    moment(currentDate).format('DD/MM/YYYY') === moment(element.moneyLine['Game Date']).format('DD/MM/YYYY') ? 'Today at ' + element.moneyLine['Game Start Time']
                                                    :
                                                    moment(element.moneyLine['Game Date']).format('MM/DD/YYYY')
                                                }
                                            </DateC>
                                        </Section1>

                                        <Section2>
                                            <Col>
                                                <PointsBox onClick={()=>{
                                                    if(props.userDetails){
                                                        if(element.moneyLine.bettingOdds.homeTeamBettingOdds){

                                                        }else{

                                                        }
                                                    } else{
                                                        props.history.push('/login')
                                                    }
                                                }}>
                                                    {element.moneyLine.bettingOdds.homeTeamBettingOdds}
                                                </PointsBox>
                                                <PointsBox onClick={()=>{
                                                    if(props.userDetails){
                                                        if(element.moneyLine.bettingOdds.awayTeamBettingOdds){

                                                        }else{
                                                            
                                                        }
                                                    } else{
                                                        props.history.push('/login')
                                                    }
                                                }}>
                                                    {element.moneyLine.bettingOdds.awayTeamBettingOdds}
                                                </PointsBox>
                                            </Col>
                                            <Col>
                                                <PointsBox>
                                                    <CommonChild>{element.handicap.handicapHomeTeamOdds}</CommonChild>
                                                    <PointBoxChild>{element.handicap.handicapHomeTeamPoints}</PointBoxChild>
                                                </PointsBox>
                                                <PointsBox>
                                                    <CommonChild>{element.handicap.handicapAwayTeamOdds}</CommonChild>
                                                    <PointBoxChild>{element.handicap.handicapAwayTeamPoints}</PointBoxChild>
                                                </PointsBox>
                                            </Col>
                                            <Col>
                                                <PointsBox>
                                                    <CommonChild>{element.overUnder.overTotalScore}</CommonChild>
                                                    <PointBoxChild>{element.overUnder.overBettingOdds}</PointBoxChild>
                                                </PointsBox>
                                                <PointsBox>
                                                    <CommonChild>{element.overUnder.underTotalScore}</CommonChild>
                                                    <PointBoxChild>{element.overUnder.underBettingOdds}</PointBoxChild>
                                                </PointsBox>
                                            </Col>
                                        </Section2>
                                    </RowC>
                                )
                            })
                            }
                        </BetInfo>
                        <BetSubmitFormC>
                            {data.overviewBoxesArray.map((element,index)=>{
                                return(
                                    <BetPointsOverviewBox label={element.label} key={index} figures={element.label==='Money Line'?moneyLine:element.label==='Handicap'?handicap:overUnder}/>
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