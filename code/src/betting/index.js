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
import BetPointsOverview from './Shared/betPointsOverviewBox'
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
    const [points,setPoints]=useState('')
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
            setGameInfo(targetArray)
        }
        const currentDate=new Date()
        setCurrentDate(currentDate)
    },[props.futureGamesInfo])

    const onPointBoxClick=(params)=>{
        if(params==='points'){

        } else if(params==='handicap'){

        } else{

        }
    }

    // console.log("STATE: ",gameInfo)
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
                                                {element.points['Home Team']}
                                            </TeamNameC>
                                            <TeamNameC>
                                                {element.points['Away Team']}
                                            </TeamNameC>
                                            <DateC>
                                                {
                                                    moment(currentDate).format('DD/MM/YYYY') === moment(element.points['Game Date']).format('DD/MM/YYYY') ? 'Today at ' + element.points['Game Start Time']
                                                    :
                                                    moment(element.points['Game Date']).format('MM/DD/YYYY')
                                                }
                                            </DateC>
                                        </Section1>

                                        <Section2>
                                            <Col>
                                                <PointsBox onClick={()=>{
                                                    if(props.userDetails){
                                                        
                                                    } else{
                                                        props.history.push('/login')
                                                    }
                                                }}>
                                                    {element.points.teams.homeTeam}
                                                </PointsBox>
                                                <PointsBox>
                                                    {element.points.teams.awayTeam}
                                                </PointsBox>
                                            </Col>
                                            <Col>
                                                <PointsBox>
                                                    <CommonChild>{element.handicap.value1}</CommonChild>
                                                    <PointBoxChild>{element.handicap.point1}</PointBoxChild>
                                                </PointsBox>
                                                <PointsBox>
                                                    <CommonChild>{element.handicap.value2}</CommonChild>
                                                    <PointBoxChild>{element.handicap.point2}</PointBoxChild>
                                                </PointsBox>
                                            </Col>
                                            <Col>
                                                <PointsBox>
                                                    <CommonChild>{element.overUnder.over}</CommonChild>
                                                    <PointBoxChild>{element.overUnder.overPoint}</PointBoxChild>
                                                </PointsBox>
                                                <PointsBox>
                                                    <CommonChild>{element.overUnder.under}</CommonChild>
                                                    <PointBoxChild>{element.overUnder.underPoint}</PointBoxChild>
                                                </PointsBox>
                                            </Col>
                                        </Section2>
                                    </RowC>
                                )
                            })
                            }
                        </BetInfo>
                        <BetSubmitFormC>
                            {data.overviewBoxArray.map((element,index)=>{
                                return(
                                    <BetPointsOverview label={element.label} key={index} figures={element.label==='Points'?points:element.label==='Handicap'?handicap:overUnder}/>
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