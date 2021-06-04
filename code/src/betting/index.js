import React, { useState, useEffect } from 'react'

//Functions
import {
    pointBoxClickHandler,
    setTeamIcons,
    compareUserBetsAndGameInfo,
    removeBtnSelectionClass,
    checkGameTimings
} from './functions'

//Actions
import { logoutAction, checkUserRecordCollectionExists } from '../redux/actions/authActions'
import { getFutureGamesInfo, submitBetPoints, getUserBets } from '../redux/actions/betsActions'
import { getUserRecord } from '../redux/actions/recordActions'

//Components
import BetPointsOverviewBox from './Shared/betPointsOverviewBox'
import BettingSectionheader from './Shared/bettingSectionHeader'
import UserStatsContainer from './Shared/userStatsContainer'
import Spinner from '../Shared/Spinner/Spinner'
import WarningPopup from '../Shared/Popups/popup'
import UserRankContainer from './Shared/usersRankContainer'
import LoginModal from '../Auth/Login'
import PointsBox from './Shared/pointsBox'

//Libraries and Functions
import 'firebase/auth';
import firebase from "firebase/app"
import {firebaseInstanceSpigamebet} from '../App/spigamebetFirebase'
import {connect} from 'react-redux'
import moment from 'moment'
import momentTimezone from 'moment-timezone'
import OutsideClickHandler from 'react-outside-click-handler'

//Images
import loginIcon from '../assets/images/loginIcon.png'
import logoutIcon from '../assets/images/logoutIcon.png'

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
    BetSectionPointsContainer,
    TodayBtnContainer,
    RowC,
    TeamNameContainer,
    TeamName,
    VS,
    Col,
    Section1,
    Section2,
    BetSubmitFormC,
    BetSubmitPointsContainer,
    OverviewHeader,
    SubmitPointsBtn,
    PopupContainer,
    PopupWrapper,
    Col1,
    UserStatsRankWrapper,
    LoginModalContainer,
    LoginLogoutBtnsContainer,
    AuthBtn
} from './styles'

const Betting=(props)=>{

    const [gameInfo, setGameInfo] = useState([]);
    const [selectedValues, setSelectedValues] = useState({});
    const [overviewKeysArray, setOverviewKeysArray] = useState([]);
    const [isIndexSelected, setIsIndexSelected] = useState(false);
    const [error, setError] = useState({status:'',message:'',isError:false});
    const [betSubmitPopup, setBetSubmitPopup] = useState({isVisible: false});
    const [exceedingTimeLimitPopup, setExceedingTimeLimitPopup] = useState({isVisible: false});
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [pointsSpinner, setPointsSpinner] = useState(true);
    const [bettingPageSpinner, setBettingPageSpinner] = useState(false);
    const [loadingBetPoints, setLoadingBetPoints] = useState(true);
    const [numberOfGamesExceedingTimeLimit, setnumberOfGamesExceedingTimeLimit] = useState(0);


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

        if(props.futureGamesInfo.games.length > 0 && !props.futureGamesInfo.isLoading){
            if(props.userDetails.isLoading){
                setGameInfo(props.futureGamesInfo.games)
            }
            else if(!props.userDetails.user.displayName && !props.userDetails.isLoading){
                setGameInfo(props.futureGamesInfo.games)
                setLoadingBetPoints(false)
                setPointsSpinner(false)
                setBettingPageSpinner(false)
            }
            else if(props.userDetails.user.displayName && !props.userDetails.isLoading){
                let response = props.getUserBets(props.userDetails.user.uid)
                if(response.isError){
                    setError({status: response.status, message: response.message, isError:true})
                }
                else{
                    props.getUserRecord(props.userDetails.user.uid)
                }
            }
        }

        else if(props.futureGamesInfo.length < 1 && !props.futureGamesInfo.isLoading){
            setError({
                message: "No games today"
            })
        }

    },[props.futureGamesInfo, props.userDetails]);

    useEffect(() => {
        if(props.userBetsDetails.bets[0] && !props.userBetsDetails.loading){
            let computedArray = compareUserBetsAndGameInfo(props.userBetsDetails.bets, props.futureGamesInfo.games)
            setPointsSpinner(false)
            setLoadingBetPoints(false)
            setGameInfo(computedArray)

        } else if(!props.userBetsDetails.loading){
            setPointsSpinner(false)
            setGameInfo(props.futureGamesInfo.games)
        }
    },[props.userBetsDetails]);


    const onPointBoxClick = ( e, params, index, gameId ,selectedType, bettingSide, colIndex, oddsValue, pointsValue, scoreValue, onScreenSelection, betSubmitted, isGameStartTimeBeforeTheCurrentTime ) => {
        if(!betSubmitted && oddsValue){
            if(!props.userDetails.user.displayName && !props.userDetails.isLoading){
                setLoginModalVisible(true);
            }
            else if(props.userDetails.user.displayName && !props.userDetails.isLoading){
                console.log('clicked')
                const returnedObj = pointBoxClickHandler( e, params, index, gameId, selectedType, bettingSide, colIndex, oddsValue, pointsValue, scoreValue, props, selectedValues, gameInfo, onScreenSelection);
                setGameInfo( returnedObj.gameInfoUpdated );
                setSelectedValues( returnedObj.targetObj );
                Object.keys(returnedObj.targetObj).length === 0 ? setIsIndexSelected(false) : setIsIndexSelected(true);
                setOverviewKeysArray( returnedObj.newOverviewKeysArray );

            }
        }
    };

    const onRemovePoints = (e, params, gameId) => {
        let targetObj = selectedValues;
        let selectedKey = params === 'moneyLine' ? 'moneyLineSelected' : params === 'handicap' ? 'handicapSelected' : 'overUnderSelected';
        let targetGameInfo= [];
        targetObj[gameId][params] = {}

        if(!targetObj[gameId]['moneyLine'].odds && !targetObj[gameId]['handicap'].odds && !targetObj[gameId].overAndUnder.odds){

            delete targetObj[gameId]
            let targetObjKeys = Object.keys(targetObj)
            targetObjKeys.length === 0 ? setIsIndexSelected(false) : null

        }

        for(let i = 0; i < gameInfo.length; i++){

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
        setBetSubmitPopup({isVisible: true});
    };

    const submitConfirmation = async() => {
        setBettingPageSpinner(true)
        onPopupClose('Submit bet warning')
        let result = checkGameTimings(selectedValues)
        if(result === true){
            let response = await props.submitBetPoints(selectedValues, gameInfo,props.userDetails.user.uid)
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
        else{
            setnumberOfGamesExceedingTimeLimit(result)
            setBettingPageSpinner(false)
            setExceedingTimeLimitPopup({isVisible: true})
        }
    };

    const onPopupClose = (params) => {
        if(params === 'Submit bet warning'){
            setBetSubmitPopup({isVisible: false})
        }
        else if(params === 'Bet time limit exceeded'){
            setExceedingTimeLimitPopup({isVisible: false})
            setLoadingBetPoints(true)
            setPointsSpinner(true)
            let response = props.getFutureGamesInfo();
            if(response.isError){
                setError({status: response.status, message: response.message, isError:true})
            }
        }
    };

    const onOutsideClick = () => {
        setLoginModalVisible(false)
    };

    const onLoginClick = async(params) => {
        let localStorageObj = {}
        if(params === 'google'){
            const provider = new firebase.auth.GoogleAuthProvider()

            firebaseInstanceSpigamebet.auth().signInWithPopup(provider)
            .then(async(res)=>{
                const {uid,displayName,email} = res.user
                setBettingPageSpinner(true)
                setLoginModalVisible(false)
                localStorageObj.uid = uid
                localStorageObj.displayName = displayName
                localStorageObj.email = email
                localStorageObj.type = 'google'
                localStorage.setItem('User', JSON.stringify(localStorageObj))
                await props.checkUserRecordCollectionExists(localStorageObj)
                setBettingPageSpinner(false)
            })
            .catch(()=>{
                setError({status: null, message: 'Google login error', isError:true})
            })
        } 
        else if(params === 'facebook'){
            const provider = new firebase.auth.FacebookAuthProvider();

            firebaseInstanceSpigamebet.auth().signInWithPopup(provider)
            .then(async(res)=>{
                //Needs to configures
            })
            .catch((e)=>{
                console.log(e)//error handeling
            })
        } 
        else{
            const provider = new firebase.auth.TwitterAuthProvider()

            firebaseInstanceSpigamebet.auth().signInWithPopup(provider)
            .then(async(res)=>{
                const {displayName, uid} = res.user
                const {username} = res.additionalUserInfo
                localStorageObj.uid = uid
                localStorageObj.displayName = username
                localStorageObj.email = displayName
                localStorageObj.type = 'twitter'
                setBettingPageSpinner(true)
                setLoginModalVisible(false)
                localStorage.setItem('User', JSON.stringify(localStorageObj))
                await props.checkUserRecordCollectionExists(localStorageObj)
                setBettingPageSpinner(false)
            })
            .catch((e)=>{
                setError({status: null, message: 'Twitter login error', isError:true})
            })
        }
    };

    const onLogoutClick = async() => {
        setLoginModalVisible(false)
        setBettingPageSpinner(true)
        setLoadingBetPoints(true)
        setPointsSpinner(true)
        let response = await props.logoutAction()
        if(response.processed){
            let response = props.getFutureGamesInfo();
            if(response.isError){
                setError({status: response.status, message: response.message, isError:true})
            }
        }
        else{
            setError({status: response.status, message: response.message, isError:true})
        }
    };

    console.log(selectedValues)
    
    return(
        <> 
            {
                !gameInfo[0] 
                ?
                <Spinner/>
                :
                <BettingPageContainer className='bettingPageContainer'>
                    {
                        loginModalVisible ? 
                            <LoginModalContainer>

                                <div>

                                    <OutsideClickHandler
                                     onOutsideClick = {() => {
                                        onOutsideClick()
                                     }}
                                    >
                                        <LoginModal
                                         onLoginClick = {onLoginClick}
                                        />
                                    </OutsideClickHandler>

                                </div>
                                
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
                        betSubmitPopup.isVisible ? 
                            <PopupContainer>
                            <PopupWrapper>
                                <WarningPopup
                                 type = 'Submit bet warning'
                                 onSubmit = {submitConfirmation}
                                 onPopupClose = {onPopupClose}
                                />
                            </PopupWrapper>
                        </PopupContainer>
                        :
                        exceedingTimeLimitPopup.isVisible ? 
                            <PopupContainer>
                            <PopupWrapper>
                                <WarningPopup
                                 type = ''
                                 onPopupClose = {onPopupClose}
                                 numberOfGamesExceedingTimeLimit = {numberOfGamesExceedingTimeLimit}
                                />
                            </PopupWrapper>
                        </PopupContainer>
                        :null
                    }
                    
                    <ContentC>
                        <ContentW>
                            <Col1>

                                <LoginLogoutBtnsContainer onClick = {() => {
                                    props.userDetails.user.uid ? onLogoutClick() : setLoginModalVisible(true)
                                }}>
                                    {
                                        props.userDetails.user.uid ? 
                                        <AuthBtn 
                                        src = {logoutIcon}
                                        />
                                        :
                                        <AuthBtn
                                        src = {loginIcon}
                                        />
                                    }
                                </LoginLogoutBtnsContainer>

                                <UserStatsRankWrapper>
                                    {
                                        props.userDetails.user.uid && props.userRecord ? 
                                        <UserStatsContainer/>
                                        :
                                        null
                                    }
                                    
                                    <UserRankContainer/>
                                </UserStatsRankWrapper>

                            </Col1>

                            <BetSectionContainer>

                                <ContentHeader>
                                    <h1>NBA Betting</h1>
                                    <div style = {{textAlign: 'center'}}>Display Games</div>
                                    <DisplayGamesBtnContainer>
                                        <TodayBtnContainer>Today</TodayBtnContainer>
                                    </DisplayGamesBtnContainer>
                                </ContentHeader>

                                <BetSectionWrapper>
                                    {
                                        error.message === 'No games today'
                                        ?
                                        <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                            <h1>No games today</h1>
                                        </div>
                                        :
                                        <>
                                            <BetSectionPointsContainer>
                                                {gameInfo.map((element,index)=>{
                                                    let teamIconsObj = setTeamIcons(element.gameDetails.homeTeam, element.gameDetails.awayTeam)
                                                    let currentDate = momentTimezone(new Date()).tz("America/New_York").format('YYYY-MM-DD hh:mm A')
                                                    let gameStartDate = element.gameDetails.gameDate +  " " + element.gameDetails.gameStartTime
                                                    let isGameStartTimeBeforeTheCurrentTime = moment(gameStartDate).isAfter(moment(currentDate))
                                                    return(
                                                        <>
                                                        <div>
                                                            <BettingSectionheader
                                                             gameStartTime = {element.gameDetails.gameStartTime.split(' PM')}
                                                            />
                                                        </div>
                                                        <RowC>
                                                            
                                                            <Section1>
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
                                                                    <PointsBox
                                                                     type = 'handicap'
                                                                     homeOrAway = 'homeTeam'
                                                                     element = {element}
                                                                     index = {index}
                                                                     gameInfo = {gameInfo}
                                                                     selectedClass = 'handicapSelected'
                                                                     colIndex = {0}
                                                                     onPointBoxClick = {onPointBoxClick}
                                                                     isGameStartTimeBeforeTheCurrentTime = {isGameStartTimeBeforeTheCurrentTime}
                                                                     teamIconsObj = {teamIconsObj}
                                                                     pointsSpinner = {pointsSpinner}
                                                                    />
                                                                    <PointsBox
                                                                     type = 'handicap'
                                                                     homeOrAway = 'awayTeam'
                                                                     element = {element}
                                                                     index = {index}
                                                                     gameInfo = {gameInfo}
                                                                     selectedClass = 'handicapSelected'
                                                                     colIndex = {1}
                                                                     onPointBoxClick = {onPointBoxClick}
                                                                     isGameStartTimeBeforeTheCurrentTime = {isGameStartTimeBeforeTheCurrentTime}
                                                                     teamIconsObj = {teamIconsObj}
                                                                     pointsSpinner = {pointsSpinner}
                                                                    />
                                                                </Col>

                                                                <Col>
                                                                    <PointsBox
                                                                     type = 'moneyLine'
                                                                     index = {index}
                                                                     gameInfo = {gameInfo}
                                                                     selectedClass = 'moneyLineSelected'
                                                                     element = {element}
                                                                     colIndex = {0}
                                                                     isGameStartTimeBeforeTheCurrentTime = {isGameStartTimeBeforeTheCurrentTime}
                                                                     homeOrAway = 'homeTeam'
                                                                     onPointBoxClick = {onPointBoxClick}
                                                                     teamIconsObj = {teamIconsObj}
                                                                     pointsSpinner = {pointsSpinner}
                                                                    />
                                                                    <PointsBox
                                                                     type = 'moneyLine'
                                                                     index = {index}
                                                                     gameInfo = {gameInfo}
                                                                     selectedClass = 'moneyLineSelected'
                                                                     element = {element}
                                                                     colIndex = {1}
                                                                     isGameStartTimeBeforeTheCurrentTime = {isGameStartTimeBeforeTheCurrentTime}
                                                                     homeOrAway = 'awayTeam'
                                                                     onPointBoxClick = {onPointBoxClick}
                                                                     teamIconsObj = {teamIconsObj}
                                                                     pointsSpinner = {pointsSpinner}
                                                                    />
                                                                </Col>

                                                                <Col>
                                                                    <PointsBox
                                                                     type = 'overUnder'
                                                                     overOrUnder = 'over'
                                                                     overOrUnderTotalScore = 'overTotalScore'
                                                                     overOrUnderOddsValue = 'overOddsValue'
                                                                     index = {index}
                                                                     gameInfo = {gameInfo}
                                                                     selectedClass = 'overUnderSelected'
                                                                     element = {element}
                                                                     colIndex = {0}
                                                                     isGameStartTimeBeforeTheCurrentTime = {isGameStartTimeBeforeTheCurrentTime}
                                                                     onPointBoxClick = {onPointBoxClick}
                                                                     teamIconsObj = {teamIconsObj}
                                                                     pointsSpinner = {pointsSpinner}
                                                                    />
                                                                    <PointsBox
                                                                     type = 'overUnder'
                                                                     overOrUnder = 'under'
                                                                     overOrUnderTotalScore = 'underTotalScore'
                                                                     overOrUnderOddsValue = 'underOddsValue'
                                                                     index = {index}
                                                                     gameInfo = {gameInfo}
                                                                     selectedClass = 'overUnderSelected'
                                                                     element = {element}
                                                                     colIndex = {1}
                                                                     isGameStartTimeBeforeTheCurrentTime = {isGameStartTimeBeforeTheCurrentTime}
                                                                     onPointBoxClick = {onPointBoxClick}
                                                                     teamIconsObj = {teamIconsObj}
                                                                     pointsSpinner = {pointsSpinner}
                                                                    />
                                                                </Col>
                                                                
                                                            </Section2>
                                                        </RowC> 
                                                        </>
                                                    )
                                                })
                                                }
                                            </BetSectionPointsContainer>
                                        </>
                                    }
                                </BetSectionWrapper>
                            </BetSectionContainer>

                            <BetSubmitFormC>
                                <OverviewHeader>Summary</OverviewHeader>

                                <BetSubmitPointsContainer>
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
                                </BetSubmitPointsContainer>
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
};

const mapStateToProps=(state)=>{
    return{
        futureGamesInfo: state.betsReducer.futureGamesInfo,
        userDetails: state.authReducer.userDetails,
        userRecord: state.recordReducer.userRecord,
        userBetsDetails: state.betsReducer.userBetsDetails
    };
};

export default connect(mapStateToProps,
    { getFutureGamesInfo, submitBetPoints, getUserBets, getUserRecord, logoutAction, checkUserRecordCollectionExists })(Betting);