import React, { useState, useEffect } from 'react'

//Functions
import { structureData, pointBoxClickHandler, setTeamIcons, compareUserBetsAndGameInfo, removeBtnSelectionClass } from './functions'

//Actions
import { getFutureGamesInfo, setStructuredFutureGamesInfo, submitBetPoints, getUserBets } from '../redux/actions/betsActions'
import { getUserRecord } from '../redux/actions/userRecordActions'

//Components
import BetPointsOverviewBox from './Shared/betPointsOverviewBox'
import BettingSectionheader from './Shared/bettingSectionHeader'
import UserStatsContainer from './Shared/userStatsContainer'
import Spinner from '../Shared/Spinner/Spinner'
import WarningPopup from '../Shared/Popups/submitBetWarningPopup'
import UserRankContainer from './Shared/usersRankContainer'
import LoginModal from '../Auth/Login'
import OutsideClickHandler from 'react-outside-click-handler'

//Libraries and Functions
import {connect} from 'react-redux'
import {ClipLoader} from 'react-spinners'

//Images
import lockIcon from '../assets/images/lockIcon.png'

//Styled Components
import {
    BettingPageContainer,
    BettingPageSpinnerContainer,
    ContentC,
    ContentW,
    ContentHeader,
    DisplayGamesBtnContainer,
    BetSectionContainer,
    BetSectionWrapper,
    TodayBtnContainer,
    RowC,
    TeamNameContainer,
    TeamName,
    TimeContainer,
    VS,
    Col,
    Section1,
    Section2,
    PointsContainer,
    PointsSpinnerContainer,
    LockIconContainer,
    LockIcon,
    PointsValueContainer,
    OddsValueContainer,
    TotalScoreValueContainer,
    BetSubmitFormC,
    OverviewHeader,
    SubmitPointsBtn,
    WarningPopupContainer,
    WarningPopupWrapper,
    UserStatsRankWrapper,
    MoneyLineOddsContainer,
    TeamIconOddsContainer,
    TeamIconContainer,
    TeamIcon,
    LoginModalContainer,
    LoginModalWrapper
} from './styles'

const Betting=(props)=>{

    const [loader, setLoader] = useState(false);
    const [gameInfo, setGameInfo] = useState([]);
    const [selectedValues, setSelectedValues] = useState({});
    const [overviewKeysArray, setOverviewKeysArray] = useState([]);
    const [isIndexSelected, setIsIndexSelected] = useState(false);
    const [error, setError] = useState({status:'',message:'',isError:false});
    const [warningPopup, setWarningPopup] = useState({isVisible: false})
    const [loginModalVisible, setLoginModalVisible] = useState(false)
    const [pointsSpinner, setPointsSpinner] = useState(true)
    const [bettingPageSpinner, setBettingPageSpinner] = useState(false)
    const [loadingBetPoints, setLoadingBetPoints] = useState(true)

    useEffect(() => {
        let response = props.getFutureGamesInfo();
        if(response.isError){
            setError({status: response.status, message: response.message, isError:true})
        }
        window.setInterval(()=>{
            let response = props.getFutureGamesInfo();
            if(response.isError){
                setError({status: response.status, message: response.message, isError:true})
            }
            
        },300000);
    },[]);


    useEffect(() => {
        if(props.futureGamesInfo[0]){
            let targetArray = structureData(props.futureGamesInfo);
            props.setStructuredFutureGamesInfo(targetArray);
        }   
        
    },[props.futureGamesInfo]);


    useEffect(() => {

        if(props.structuredGameInfo[0] && props.userDetails.isLoading){
            setGameInfo(props.structuredGameInfo)
        }
        else if(props.structuredGameInfo[0] &&  !props.userDetails.user.displayName && !props.userDetails.isLoading){
            setGameInfo(props.structuredGameInfo)
            setLoadingBetPoints(false)
        }
        else if(props.structuredGameInfo[0] &&  props.userDetails.user.displayName && !props.userDetails.isLoading){
            let response = props.getUserBets(props.userDetails.user.uid)
            if(response.isError){
                setError({status: response.status, message: response.message, isError:true})
            }
        }

    },[props.structuredGameInfo, props.userDetails])

    useEffect(() => {
        if(props.userBetsDetails.bets[0] && !props.userBetsDetails.loading){
            let computedArray = compareUserBetsAndGameInfo(props.userBetsDetails.bets, props.structuredGameInfo)
            setPointsSpinner(false)
            setLoadingBetPoints(false)
            setGameInfo(computedArray)

        } else if(!props.userBetsDetails.loading){
            setPointsSpinner(false)
        }
    },[props.userBetsDetails])


    const onPointBoxClick = ( e, params, index, gameId ,keyName, selectedKey, oddsValue, pointsValue, scoreValue, disabled ) => {
        if(!disabled){
            if(!props.userDetails.user.displayName && !props.userDetails.isLoading){
                setLoginModalVisible(true)
            }
            else if(!props.userDetails.user.displayName && props.userDetails.isLoading){
                
            }
            else if(props.userDetails.user.displayName && !props.userDetails.isLoading){
    
                const returnedObj = pointBoxClickHandler( e, params, index, gameId, keyName, selectedKey, oddsValue, pointsValue, scoreValue, props, selectedValues, gameInfo);
                setGameInfo( returnedObj.gameInfoUpdated );
                setSelectedValues( returnedObj.targetObj );
                setOverviewKeysArray( returnedObj.newOverviewKeysArray );
                setIsIndexSelected(true);
    
            }
        }
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


    const submitConfirmation = async() => {
        setBettingPageSpinner(true)
        onCancel()
        let response = await props.submitBetPoints(selectedValues, props.userDetails.user.uid)
        if(response.isError){
            setError({status: response.status, message: response.message, isError:true})
        }
        else{
            let getUserBetsResponse = await props.getUserBets(props.userDetails.user.uid)
            if(getUserBetsResponse.isError){
                setError({status: getUserBetsResponse.status, message: getUserBetsResponse.message, isError:true})
            }
            else{
                let computedArray = removeBtnSelectionClass(gameInfo)
                setGameInfo(computedArray)
                setOverviewKeysArray([])
                setIsIndexSelected(false)
                setSelectedValues({})
                setBettingPageSpinner(false)
            }
        }
    }


    const onCancel = () => {
        setWarningPopup({isVisible: false})
    }


    const onOutsideClick = () => {
        setLoginModalVisible(false)
    }


    console.log("GAMEINFO STATE: ", gameInfo)
    // console.log("ERROR STATE: ", error)
    return(
        <> 
            {
                !gameInfo[0] ?
                <Spinner/>
                :
                <BettingPageContainer className='bettingPageContainer'>
                    {
                        loginModalVisible ? 
                            <LoginModalContainer>

                                <LoginModalWrapper>

                                    <OutsideClickHandler
                                     onOutsideClick = {() => {
                                        onOutsideClick()
                                     }}
                                    >
                                        <LoginModal/>
                                    </OutsideClickHandler>

                                </LoginModalWrapper>
                                
                            </LoginModalContainer>
                        :
                            null
                    }
                    {
                        bettingPageSpinner ? 
                            <BettingPageSpinnerContainer>
                                <Spinner/>
                            </BettingPageSpinnerContainer>
                        :null
                    }
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
                    
                    <ContentC>
                        <ContentW>
                        <UserStatsRankWrapper>

                            <UserStatsContainer/>
                            <UserRankContainer/>

                        </UserStatsRankWrapper>

                        <BetSectionContainer>
                            <ContentHeader>
                                <h1>NBA Betting</h1>
                                <DisplayGamesBtnContainer>
                                    <div>Display Games</div>
                                    <TodayBtnContainer>Today</TodayBtnContainer>
                                </DisplayGamesBtnContainer>
                            </ContentHeader>
                            <BetSectionWrapper>

                            <BettingSectionheader/>
                            {gameInfo.map((element,index)=>{
                                let teamIconsObj = setTeamIcons(element.gameDetails.homeTeam, element.gameDetails.awayTeam)
                                return(
                                    <RowC key={index*12}>
                                        <Section1>

                                            <TimeContainer>
                                                {element.gameDetails.gameStartTime.split(' PM')}
                                            </TimeContainer>

                                            <TeamNameContainer>
                                                <TeamName>
                                                    {element.gameDetails.homeTeam}
                                                </TeamName>
                                                <VS>VS</VS>
                                                <TeamName>
                                                    {element.gameDetails.awayTeam}
                                                </TeamName>
                                            </TeamNameContainer>

                                        </Section1>

                                        <Section2>
                                            <Col>
                                                <PointsContainer 
                                                 selected={gameInfo[index].handicapSelected === 0} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(
                                                        e,
                                                        'handicap',
                                                        index,
                                                        gameInfo[index].gameId,
                                                        'handicapSelected',
                                                        0,
                                                        gameInfo[index].handicap.handicapHomeTeamOdds,
                                                        gameInfo[index].handicap.handicapHomeTeamPoints,
                                                        null,
                                                        element.disabled
                                                    )
                                                 }}
                                                >
                                                    {
                                                        pointsSpinner ?
                                                        <PointsSpinnerContainer>
                                                            <ClipLoader color = '#C4C4C4' size = '' loading = {pointsSpinner}/>
                                                        </PointsSpinnerContainer>
                                                        :
                                                        element.disabled ?
                                                        <LockIconContainer>
                                                            <LockIcon src={lockIcon}/>
                                                        </LockIconContainer>
                                                        :
                                                        <>
                                                            <PointsValueContainer>{element.handicap.handicapHomeTeamPoints}</PointsValueContainer>

                                                            <TeamIconOddsContainer>
                                                                <TeamIconContainer>
                                                                    <TeamIcon src = {teamIconsObj.homeTeamIcon}/>
                                                                </TeamIconContainer>
                                                                <OddsValueContainer>{element.handicap.handicapHomeTeamOdds}</OddsValueContainer>
                                                            </TeamIconOddsContainer>
                                                        </>
                                                    }

                                                </PointsContainer>

                                                <PointsContainer 
                                                 selected={gameInfo[index].handicapSelected === 1} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(
                                                        e,
                                                        'handicap',
                                                        index,
                                                        gameInfo[index].gameId,
                                                        'handicapSelected',
                                                        1,
                                                        gameInfo[index].handicap.handicapAwayTeamOdds,
                                                        gameInfo[index].handicap.handicapAwayTeamPoints,
                                                        null,
                                                        element.disabled
                                                    )
                                                 }}
                                                >
                                                    {   
                                                        pointsSpinner ?
                                                        <PointsSpinnerContainer>
                                                            <ClipLoader color = '#C4C4C4' size = '' loading = {pointsSpinner}/>
                                                        </PointsSpinnerContainer>
                                                        :
                                                        element.disabled ?
                                                        <LockIconContainer>
                                                            <LockIcon src={lockIcon}/>
                                                        </LockIconContainer>
                                                        :
                                                        <>
                                                            <PointsValueContainer>{element.handicap.handicapAwayTeamPoints}</PointsValueContainer>
                                                        
                                                            <TeamIconOddsContainer>
                                                                <TeamIconContainer>
                                                                    <TeamIcon src = {teamIconsObj.awayTeamIcon}/>
                                                                </TeamIconContainer>
                                                                <OddsValueContainer>{element.handicap.handicapAwayTeamOdds}</OddsValueContainer>
                                                            </TeamIconOddsContainer>
                                                        </>
                                                    }

                                                </PointsContainer>
                                            </Col>

                                            <Col>
                                                <PointsContainer 
                                                 selected={gameInfo[index].moneyLineSelected === 0} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(
                                                        e,
                                                        'moneyLine',
                                                        index,
                                                        gameInfo[index].gameId,
                                                        'moneyLineSelected',
                                                        0,
                                                        gameInfo[index].moneyLine.homeTeamOdds,
                                                        null,
                                                        null,
                                                        element.disabled
                                                    )
                                                 }}
                                                >
                                                    {
                                                        pointsSpinner ? 
                                                        <PointsSpinnerContainer>
                                                            <ClipLoader color = '#C4C4C4' size = '' loading = {pointsSpinner}/>
                                                        </PointsSpinnerContainer>
                                                        :
                                                        element.disabled ?
                                                        <LockIconContainer>
                                                            <LockIcon src={lockIcon}/>
                                                        </LockIconContainer>
                                                        :
                                                        <>
                                                            <MoneyLineOddsContainer>
                                                            <TeamIconContainer>
                                                                <TeamIcon src = {teamIconsObj.homeTeamIcon}/>
                                                            </TeamIconContainer>
                                                                {element.moneyLine.homeTeamOdds}
                                                            </MoneyLineOddsContainer>
                                                        </>
                                                    }

                                                </PointsContainer>

                                                <PointsContainer 
                                                 selected={gameInfo[index].moneyLineSelected === 1} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(
                                                        e,
                                                        'moneyLine',
                                                        index,
                                                        gameInfo[index].gameId,
                                                        'moneyLineSelected',
                                                        1,
                                                        gameInfo[index].moneyLine.awayTeamOdds,
                                                        null,
                                                        null,
                                                        element.disabled
                                                    )
                                                 }}
                                                >
                                                    {   
                                                        pointsSpinner ?
                                                        <PointsSpinnerContainer>
                                                            <ClipLoader color = '#C4C4C4' size = '' loading = {pointsSpinner}/>
                                                        </PointsSpinnerContainer>
                                                        :
                                                        element.disabled ?
                                                        <LockIconContainer>
                                                            <LockIcon src={lockIcon}/>
                                                        </LockIconContainer>
                                                        :
                                                        <>
                                                            <MoneyLineOddsContainer>
                                                            <TeamIconContainer>
                                                                <TeamIcon src = {teamIconsObj.awayTeamIcon}/>
                                                            </TeamIconContainer>
                                                                {element.moneyLine.awayTeamOdds}
                                                            </MoneyLineOddsContainer>
                                                        </>
                                                    }

                                                </PointsContainer>
                                            </Col>

                                            <Col>
                                                <PointsContainer 
                                                 selected={gameInfo[index].overUnderSelected === 0} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(
                                                        e,
                                                        'over',
                                                        index,
                                                        gameInfo[index].gameId,
                                                        'overUnderSelected',
                                                        0,
                                                        gameInfo[index].overUnder.overOddsValue,
                                                        null,
                                                        gameInfo[index].overUnder.overTotalScore,
                                                        element.disabled
                                                    )
                                                 }}
                                                >
                                                    { 
                                                        pointsSpinner ?
                                                        <PointsSpinnerContainer>
                                                            <ClipLoader color = '#C4C4C4' size = '' loading = {pointsSpinner}/>
                                                        </PointsSpinnerContainer>
                                                        :
                                                        element.disabled ?
                                                        <LockIconContainer>
                                                            <LockIcon src={lockIcon}/>
                                                        </LockIconContainer>
                                                        :
                                                        <>
                                                            <TotalScoreValueContainer>{element.overUnder.overTotalScore}</TotalScoreValueContainer>

                                                            <TeamIconOddsContainer>
                                                                <TeamIconContainer>
                                                                    <TeamIcon src = {teamIconsObj.homeTeamIcon}/>
                                                                </TeamIconContainer>
                                                                <OddsValueContainer>{element.overUnder.overOddsValue}</OddsValueContainer>
                                                            </TeamIconOddsContainer>
                                                        </>
                                                    }

                                                </PointsContainer>

                                                <PointsContainer
                                                 selected={gameInfo[index].overUnderSelected === 1} 
                                                 onClick={(e)=>{
                                                    onPointBoxClick(
                                                        e,
                                                        'under',
                                                        index,
                                                        gameInfo[index].gameId,
                                                        'overUnderSelected',
                                                        1,
                                                        gameInfo[index].overUnder.underOddsValue,
                                                        null,
                                                        gameInfo[index].overUnder.underTotalScore,
                                                        element.disabled
                                                    )
                                                 }}
                                                >
                                                    {
                                                        pointsSpinner ?
                                                        <PointsSpinnerContainer>
                                                            <ClipLoader color = '#C4C4C4' size = '' loading = {pointsSpinner}/>
                                                        </PointsSpinnerContainer>
                                                        :
                                                        element.disabled ?
                                                        <LockIconContainer>
                                                            <LockIcon src={lockIcon}/>
                                                        </LockIconContainer>
                                                        :
                                                        <>
                                                            <TotalScoreValueContainer>{element.overUnder.underTotalScore}</TotalScoreValueContainer>

                                                            <TeamIconOddsContainer>
                                                                <TeamIconContainer>
                                                                    <TeamIcon src = {teamIconsObj.awayTeamIcon}/>
                                                                </TeamIconContainer>
                                                                <OddsValueContainer>{element.overUnder.underOddsValue}</OddsValueContainer>
                                                            </TeamIconOddsContainer>
                                                        </>
                                                    }
                                                    
                                                </PointsContainer>
                                            </Col>
                                        </Section2>
                                    </RowC>
                                )
                            })
                            }
                            </BetSectionWrapper>

                        </BetSectionContainer>
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
        userBetsDetails: state.betsReducer.userBetsDetails,
        structuredGameInfo: state.betsReducer.structuredGameInfo
    }
}
export default connect(mapStateToProps,
    { getFutureGamesInfo, submitBetPoints, getUserRecord, getUserBets, getUserRecord, setStructuredFutureGamesInfo })(Betting)