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
import instruction from '../assets/images/instruction.png'


//Styled Components
import {
    BettingPageContainer,
    BettingPageSpinnerContainer,
    ContentC,
    ContentW,
    ContentHeader,
    DisplayGamesBtnContainer,
    BettingSectionColumn,
    BettingSectionContainer,
    BettingPointsAndTeamsContainer,
    BettingPointsAndTeamsWrapper,
    TodayBtnContainer,
    RowC,
    TeamNameContainer,
    TeamName,
    VS,
    PointsBoxColumn,
    Section1,
    Section2,
    BetPointsSummaryColumn,
    BetSubmitPointsContainer,
    OverviewHeader,
    SubmitPointsBtn,
    PopupContainer,
    PopupWrapper,
    UserStatsAndRankColumn,
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
    const [numberOfGamesExceedingTimeLimit, setnumberOfGamesExceedingTimeLimit] = useState(0);


    //Component did mount, it gets all the future games info from the firebase api
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

    //The function updates when we get the futureGamesInfo and userDetails from the firebase api.
    //This checks if the user is logged in also if the games are present and then shows results based on the scenario
    useEffect(() => {

        if(props.futureGamesInfo.games.length > 0 && !props.futureGamesInfo.isLoading){
            if(props.userDetails.isLoading){
                setGameInfo(props.futureGamesInfo.games)
            }
            else if(!props.userDetails.user.displayName && !props.userDetails.isLoading){
                setGameInfo(props.futureGamesInfo.games)
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

    //The function checks for the user bets history from the firebase api and runs different functions based on scenarios given in conditionals.
    useEffect(() => {
        if(props.userBetsDetails.bets[0] && !props.userBetsDetails.loading){
            let computedArray = compareUserBetsAndGameInfo(props.userBetsDetails.bets, props.futureGamesInfo.games)
            setPointsSpinner(false)
            setGameInfo(computedArray)

        } else if(!props.userBetsDetails.loading){
            setPointsSpinner(false)
            setGameInfo(props.futureGamesInfo.games)
        }
    },[props.userBetsDetails]);


    //The function runs when the user clicks on the pointbox to submit the bet for a game or multiple games at once.
    const onPointBoxClick = ( e, params, index, gameId ,selectedType, bettingSide, colIndex, oddsValue, pointsValue, scoreValue, onScreenSelection, betSubmitted, isGameStartTimeBeforeTheCurrentTime ) => {
        //If the user has already submit a bet on any of the moneyline, overUnder or handicap and the the odds value are present
        //(sometimes odds values aren't available and the firebase api does not return them)
        //in this case the bet cannot be initiated and the conditional below runs.
        if(!betSubmitted && oddsValue){
            if(!props.userDetails.user.displayName && !props.userDetails.isLoading){
                setLoginModalVisible(true);
            }
            //If the is logged in, the bet points aren't loading from the api and the 
            //game hasn't started yet then the function runs in with the conditional statement below.
            else if(props.userDetails.user.displayName && !props.userDetails.isLoading && isGameStartTimeBeforeTheCurrentTime){
                const returnedObj = pointBoxClickHandler( e, params, index, gameId, selectedType, bettingSide, colIndex, oddsValue, pointsValue, scoreValue, props, selectedValues, gameInfo, onScreenSelection);
                setGameInfo( returnedObj.gameInfoUpdated );
                setSelectedValues( returnedObj.targetObj );
                Object.keys(returnedObj.targetObj).length === 0 ? setIsIndexSelected(false) : setIsIndexSelected(true);
                setOverviewKeysArray( returnedObj.newOverviewKeysArray );

            }
        }
    };

    //This function removes the selected bet points whether that be moneyline, handicap or overUnder values,
    //When the user clicks the cross on each game's points, the function runs to remove those values.
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

    //The function runs when the user clicks the submit button on the summary container. This then shows the warning pop to
    //alert the user that the bet submission cannot be undone.
    const onSubmit = async() => {
        setBetSubmitPopup({isVisible: true});
    };

    //If the user after bet submission clicks the submit button on the popup, the function runs and submits the bet into the firebase api.
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

    //A global function for any pop to be closed within the betting page.
    const onPopupClose = (params) => {
        if(params === 'Submit bet warning'){
            setBetSubmitPopup({isVisible: false})
        }
        else if(params === 'Bet time limit exceeded'){
            setExceedingTimeLimitPopup({isVisible: false})
            setPointsSpinner(true)
            let response = props.getFutureGamesInfo();
            if(response.isError){
                setError({status: response.status, message: response.message, isError:true})
            }
        }
    };

    //The function runs when the user click outside the login popup.
    const onOutsideClick = () => {
        setLoginModalVisible(false)
    };

    const onLoginClick = (params) => {
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
                const {uid, displayName, email} = res.user
                setBettingPageSpinner(true)
                setLoginModalVisible(false)
                localStorageObj.uid = uid
                localStorageObj.displayName = displayName
                localStorageObj.email = email
                localStorageObj.type = 'facebook'
                localStorage.setItem('User', JSON.stringify(localStorageObj))
                await props.checkUserRecordCollectionExists(localStorageObj)
                setBettingPageSpinner(false)
            })
            .catch(()=>{
                setError({status: null, message: 'Facebook login error', isError:true})
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
            .catch(()=>{
                setError({status: null, message: 'Twitter login error', isError:true})
            })
        }
    };

    const onLogoutClick = async() => {
        setLoginModalVisible(false)
        setBettingPageSpinner(true)
        setPointsSpinner(true)
        let response = await props.logoutAction()
        if(response.processed){
            setSelectedValues({})
            let response = props.getFutureGamesInfo();
            if(response.isError){
                setError({status: response.status, message: response.message, isError:true})
            }
        }
        else{
            setError({status: response.status, message: response.message, isError:true})
        }
    };
    

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
                            <UserStatsAndRankColumn>

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

                            </UserStatsAndRankColumn>

                            <BettingSectionColumn>

                                <ContentHeader>
                                    <h1>NBA Betting</h1>
                                    <p className="information">Get your own NBA intelligence rating by making the game outcome predictions. 
                                    The concept is the same as sports betting except that you win/lose points instead 
                                        (meaning no real money is involved).
                                    </p>
                                    <DisplayGamesBtnContainer>
                                        <TodayBtnContainer>Today</TodayBtnContainer>
                                    </DisplayGamesBtnContainer>
                                </ContentHeader>

                                <BettingSectionContainer>
                                    {
                                        error.message === 'No games today'
                                        ?
                                        <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                            <h1>No games today</h1>
                                        </div>
                                        :
                                        <BettingPointsAndTeamsContainer>
                                            {gameInfo.map((element, index) => {

                                                let teamIconsObj = setTeamIcons(element.gameDetails.homeTeam, element.gameDetails.awayTeam)
                                                let currentDate = momentTimezone(new Date()).tz("America/New_York").format('YYYY-MM-DD hh:mm A')
                                                let gameStartDate = element.gameDetails.gameDate +  " " + element.gameDetails.gameStartTime
                                                let isGameStartTimeBeforeTheCurrentTime = moment(gameStartDate).isAfter(moment(currentDate))

                                                return(
                                                    <BettingPointsAndTeamsWrapper key={index}>
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

                                                                <PointsBoxColumn>
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
                                                                </PointsBoxColumn>

                                                                <PointsBoxColumn>
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
                                                                </PointsBoxColumn>

                                                                <PointsBoxColumn>
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
                                    onPointBoxClick={onPointBoxClick}
                                    teamIconsObj={teamIconsObj}
                                    pointsSpinner={pointsSpinner}
                                  />
                                  <PointsBox
                                    type="overUnder"
                                    overOrUnder="under"
                                    overOrUnderTotalScore="underTotalScore"
                                    overOrUnderOddsValue="underOddsValue"
                                    index={index}
                                    gameInfo={gameInfo}
                                    selectedClass="overUnderSelected"
                                    element={element}
                                    colIndex={1}
                                    isGameStartTimeBeforeTheCurrentTime={
                                      isGameStartTimeBeforeTheCurrentTime
                                    }
                                    onPointBoxClick={onPointBoxClick}
                                    teamIconsObj={teamIconsObj}
                                    pointsSpinner={pointsSpinner}
                                  />
                                </PointsBoxColumn>
                              </Section2>
                            </RowC>
                          </BettingPointsAndTeamsWrapper>
                        );
                      })}
                    </BettingPointsAndTeamsContainer>
                }
                </BettingSectionContainer>
                <div className="instruction">
                  <h3>Instruction:</h3>
                  <p>
                    You can bet any of three types: Moneyline, spread, and over
                    & under. If you predict correctly, then you earn points
                    based on the displayed betting odds. If you predict
                    incorrectly, you lose 1 point. For example:
                  </p>
                  <figure
                    style={{
                      textAlign: "center",
                      paddingBottom: "10px",
                      paddingTop: "10px",
                    }}
                  >
                    <img
                      style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                      src={instruction}
                    />
                    <figcaption style={{ fontSize: "15px" }}>
                      Money Line example
                    </figcaption>
                  </figure>
                  <p>
                    Say you bet on “ATL” for 2.22 betting odds. If the Clippers
                    win, then you will earn 1.22 points. If the Clippers lose
                    then you lose -1. This is equivalent to having a stake size
                    of $1.
                  </p>
                  <p style={{ paddingTop: "30px" }}>Notes:</p>
                  <ul style={{ paddingLeft: "30px" }}>
                    <li>The results will be updated every morning at 8am.</li>
                    <li>
                      You cannot change your bet once you submit the result.
                    </li>
                  </ul>
                </div>
              </BettingSectionColumn>
              <BetPointsSummaryColumn>
                <OverviewHeader>Summary</OverviewHeader>

                <BetSubmitPointsContainer>
                  {overviewKeysArray.map((gameId, index) => {
                    return (
                      <BetPointsOverviewBox
                        selectedValues={selectedValues}
                        gameId={gameId}
                        key={index}
                        onRemovePoints={onRemovePoints}
                      />
                    );
                  })}
                </BetSubmitPointsContainer>
                {isIndexSelected ? (
                  <SubmitPointsBtn
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    <span>Submit</span>
                  </SubmitPointsBtn>
                ) : null}
              </BetPointsSummaryColumn>
            </ContentW>
          </ContentC>
        </BettingPageContainer>
      }
    </>
  );
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