import React, { useState, useEffect } from 'react'

//Functions
import { structureData, pointBoxClickHandler } from './functions'

//Actions
import { getFutureGamesInfo, submitBetPoints, getUserBets } from '../redux/actions/betsActions'
import { getUserRecord } from '../redux/actions/userRecordActions'

//Components
import BetPointsOverviewBox from './Shared/betPointsOverviewBox'
import ContentHeader from './Shared/contentHeader'
import UserProfileContainer from '../UserProfile/index'
import Spinner from '../Shared/Spinner/Spinner'
import WarningPopup from '../Shared/Popups/submitBetWarningPopup'

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
    SubmitPointsBtn,
    WarningPopupContainer,
    WarningPopupWrapper
} from './styles'

const Betting=(props)=>{


    const [loader,setLoader] = useState(false);
    const [gameInfo,setGameInfo] = useState([]);
    const [currentDate,setCurrentDate] = useState(null);
    const [selectedValues,setSelectedValues] = useState({});
    const [overviewKeysArray,setOverviewKeysArray] = useState([]);
    const [isIndexSelected, setIsIndexSelected] = useState(false);
    const [error, setError] = useState({status:'',message:'',isError:false});
    const [warningPopup, setWarningPopup] = useState({isVisible: false})


    useEffect(() => {
        props.getFutureGamesInfo();
        window.setInterval(()=>{
            props.getFutureGamesInfo();
            
        },300000);
    },[]);


    useEffect(() => {
        if(props.futureGamesInfo[0] && props.userDetails){
            props.getUserBets(props.userDetails.uid)
            .then(()=>{
                let targetArray = structureData(props.futureGamesInfo);
                setGameInfo(targetArray);
            })
            .catch((e)=>{
                setError({isError:true, message: e.message, status: e.status});
            })
        }

        else if(props.futureGamesInfo[0]){
            let targetArray = structureData(props.futureGamesInfo);
            setGameInfo(targetArray);
        };

        const currentDate = new Date();
        setCurrentDate(currentDate);
        
    },[props.futureGamesInfo, props.userDetails]);


    const onPointBoxClick = ( e, params, index, gameId ,keyName, selectedKey, oddsValue, pointsValue, scoreValue ) => {
        const returnedObj = pointBoxClickHandler( e, params, index, gameId, keyName, selectedKey, oddsValue, pointsValue, scoreValue, props, selectedValues, gameInfo);
        setGameInfo( returnedObj.gameInfoUpdated );
        setSelectedValues( returnedObj.targetObj );
        setOverviewKeysArray( returnedObj.newOverviewKeysArray );
        setIsIndexSelected(true);
    };


    const onRemovePoints = (e, params, gameId) => {
        let targetObj = selectedValues;
        let selectedKey = params === 'moneyLine' ? 'moneyLineSelected' : params === 'handicap' ? 'handicapSelected' : 'overUnderSelected';
        let targetGameInfo= [];
        targetObj[gameId][params] = {}
        if(!targetObj[gameId]['moneyLine'].moneyLineOddsValue && !targetObj[gameId]['handicap'].handicapOddsValue && !targetObj[gameId]['over'].overOddsValue && !targetObj[gameId]['under'].underOddsValue){
            delete targetObj[gameId]
            let targetObjKeys = Object.keys(targetObj)
            targetObjKeys.length === 0 ? setIsIndexSelected(false) : null
        }
        for(let i = 0; i<gameInfo.length; i++){
            if(gameInfo[i].gameId === gameId){
                let newObj = gameInfo[i]
                newObj[selectedKey] = ''
                targetGameInfo.push(newObj)
            }
            else{
                targetGameInfo.push(gameInfo[i])
            }
        }
        let updatedKeysArray = Object.keys(targetObj)
        setOverviewKeysArray(updatedKeysArray)
        setGameInfo(targetGameInfo)
        setSelectedValues(targetObj)
    };


    const onSubmit = async() => {
        setWarningPopup({isVisible: true})
    }

    const submitConfirmation = () => {
        props.submitBetPoints(selectedValues, props.userDetails.uid)
        .then(()=>{
            onCancel()
        })
        .catch((e)=>{
            setError({message: e.message, isError:true, status: e.status})
        })
    }

    const onCancel = () => {
        setWarningPopup({isVisible: false})
    }


    // console.log("STATE UPDATED: ",error)
    console.log("STATE UPDATED: ", gameInfo)
    return(
        <>
            {
            
            loader ? 
                <Spinner/>
            :
            
                <BettingPageContainer className='bettingPageContainer'>
                    {
                        warningPopup.isVisible ? 
                        <WarningPopupContainer>
                            <WarningPopupWrapper>
                                <WarningPopup
                                 onSubmit = {submitConfirmation}
                                 onCancel = {onCancel}
                                />
                            </WarningPopupWrapper>
                        </WarningPopupContainer>
                        :null
                    }
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
                                                    onPointBoxClick(e,'moneyLine',index,gameInfo[index].gameId,'moneyLineSelected',0,gameInfo[index].moneyLine.homeTeamOdds)
                                                 }}
                                                >
                                                    {element.moneyLine.homeTeamOdds}
                                                </PointsBox>

                                                <PointsBox 
                                                 selected={gameInfo[index].moneyLineSelected === 1} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(e,'moneyLine',index,gameInfo[index].gameId,'moneyLineSelected',1,gameInfo[index].moneyLine.awayTeamOdds)
                                                 }}
                                                >
                                                    {element.moneyLine.awayTeamOdds}
                                                </PointsBox>
                                            </Col>

                                            <Col>
                                                <PointsBox 
                                                 selected={gameInfo[index].handicapSelected === 0} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(e,'handicap',index,gameInfo[index].gameId,'handicapSelected',0,gameInfo[index].handicap.handicapHomeTeamOdds,gameInfo[index].handicap.handicapHomeTeamPoints)
                                                 }}
                                                >
                                                    <CommonChild>{element.handicap.handicapHomeTeamPoints}</CommonChild>
                                                    <PointBoxChild>{element.handicap.handicapHomeTeamOdds}</PointBoxChild>
                                                </PointsBox>

                                                <PointsBox 
                                                 selected={gameInfo[index].handicapSelected === 1} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(e,'handicap',index,gameInfo[index].gameId,'handicapSelected',1,gameInfo[index].handicap.handicapAwayTeamOdds,gameInfo[index].handicap.handicapAwayTeamPoints)
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
                                                    onPointBoxClick(e,'over',index,gameInfo[index].gameId,'overUnderSelected',0,gameInfo[index].overUnder.overOddsValue,null,gameInfo[index].overUnder.overTotalScore)
                                                 }}
                                                >
                                                    <CommonChild>{element.overUnder.overTotalScore}</CommonChild>
                                                    <PointBoxChild>{element.overUnder.overOddsValue}</PointBoxChild>
                                                </PointsBox>

                                                <PointsBox
                                                 selected={gameInfo[index].overUnderSelected === 1} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(e,'under',index,gameInfo[index].gameId,'overUnderSelected',1,gameInfo[index].overUnder.underOddsValue,null,gameInfo[index].overUnder.underTotalScore)
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

                            {overviewKeysArray.map((gameId,index)=>{
                                return(
                                    <BetPointsOverviewBox 
                                     selectedValues={selectedValues} 
                                     gameId={gameId}
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
        userDetails: state.authReducer.userDetails,
        userRecord: state.recordReducer.userRecord,
        userBets: state.betsReducer.userBets
    }
}
export default connect(mapStateToProps,
    { getFutureGamesInfo, submitBetPoints, getUserRecord, getUserBets, getUserRecord })(Betting)