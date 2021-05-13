import React, { useState, useEffect } from 'react'

//Functions
import { structureData, pointBoxClickHandler, setTeamIcons, compareUserBetsAndGameInfo, removeBtnSelectionClass } from './functions'

//Actions
import { logoutAction, checkUserRecordCollectionExists } from '../redux/actions/authActions'
import { getFutureGamesInfo, setStructuredFutureGamesInfo, submitBetPoints, getUserBets } from '../redux/actions/betsActions'
import { getUserRecord } from '../redux/actions/recordActions'

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
import firebase from "firebase/app"
import 'firebase/auth';
import {firebaseInstanceSpigamebet} from '../App/spigamebetFirebase'

//Images
import lockIcon from '../assets/images/lockIcon.jpg'
import overIcon from '../assets/images/overIcon.png'
import underIcon from '../assets/images/underIcon.png'
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
    TimeContainer,
    VS,
    Col,
    Section1,
    Section2,
    PointsContainer,
    PointsWrapper,
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
    ArrowIconContainer,
    ArrowIcon,
    TeamIcon,
    LoginModalContainer,
    LoginLogoutBtnsContainer,
    AuthBtn
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
            setPointsSpinner(false)
            setBettingPageSpinner(false)
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
            setGameInfo(props.structuredGameInfo)
        }
    },[props.userBetsDetails])


    const onPointBoxClick = ( e, params, index, gameId ,selectedType, bettingSide, colIndex, oddsValue, pointsValue, scoreValue, selected ) => {
        if(!selected){
            if(!props.userDetails.user.displayName && !props.userDetails.isLoading){
                setLoginModalVisible(true)
            }
            else if(!props.userDetails.user.displayName && props.userDetails.isLoading){
                
            }
            else if(props.userDetails.user.displayName && !props.userDetails.isLoading){

                const returnedObj = pointBoxClickHandler( e, params, index, gameId, selectedType, bettingSide, colIndex, oddsValue, pointsValue, scoreValue, props, selectedValues, gameInfo);
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
        setWarningPopup({isVisible: true})
    }

    const submitConfirmation = async() => {
        setBettingPageSpinner(true)
        onCancel()
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


    const onCancel = () => {
        setWarningPopup({isVisible: false})
    }


    const onOutsideClick = () => {
        setLoginModalVisible(false)
    }

    const onLoginClick = async(params) => {

        if(params === 'google'){
            const provider = new firebase.auth.GoogleAuthProvider()

            firebaseInstanceSpigamebet.auth().signInWithPopup(provider)
            .then(async(res)=>{
                const {uid,displayName,email} = res.user
                setBettingPageSpinner(true)
                setLoginModalVisible(false)
                await props.checkUserRecordCollectionExists({uid, displayName, email, type: 'google'})
                setBettingPageSpinner(false)

            })
            .catch(()=>{
                setError({status: null, message: 'Google login error', isError:true})
            })
        } 
        else if(params === 'facebook'){
            const provider = new firebase.auth.FacebookAuthProvider();

            firebaseInstanceSpigamebet.auth().signInWithPopup(provider)
            .then((res)=>{
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

                setBettingPageSpinner(true)
                setLoginModalVisible(false)
                await props.checkUserRecordCollectionExists({uid, displayName: username, email: displayName, type: 'twitter'})
                setBettingPageSpinner(false)

            })
            .catch((e)=>{
                setError({status: null, message: 'Twitter login error', isError:true})
            })
        }
    }

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
    }
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

                            {
                                props.userDetails.user.uid ? 
                                <UserStatsContainer/>
                                :
                                null
                            }
                            
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
                                <div>
                                    <BettingSectionheader/>
                                </div>

                                <BetSectionPointsContainer>
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
                                                            element.handicap.homeTeam.bettingSide,
                                                            0,
                                                            gameInfo[index].handicap.homeTeam.odds,
                                                            gameInfo[index].handicap.homeTeam.points,
                                                            null,
                                                            element.handicap.selected
                                                        )
                                                    }}
                                                    >
                                                        {
                                                            pointsSpinner ?
                                                            <PointsSpinnerContainer>
                                                                <ClipLoader color = '#C4C4C4' size = '' loading = {pointsSpinner}/>
                                                            </PointsSpinnerContainer>
                                                            :
                                                            <PointsWrapper>
                                                                <PointsValueContainer>{element.handicap.homeTeam.points}</PointsValueContainer>
                                                                <TeamIconOddsContainer>
                                                                    <TeamIconContainer>
                                                                        <TeamIcon src = {teamIconsObj.homeTeamIcon}/>
                                                                    </TeamIconContainer>
                                                                    <OddsValueContainer>{element.handicap.homeTeam.odds}</OddsValueContainer>
                                                                </TeamIconOddsContainer>
                                                                {
                                                                    element.handicap.selected ?
                                                                    <LockIconContainer>
                                                                        <LockIcon src={lockIcon}/>
                                                                    </LockIconContainer>
                                                                    :
                                                                    null
                                                                }
                                                            </PointsWrapper>
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
                                                            element.handicap.awayTeam.bettingSide,
                                                            1,
                                                            gameInfo[index].handicap.awayTeam.odds,
                                                            gameInfo[index].handicap.awayTeam.points,
                                                            null,
                                                            element.handicap.selected
                                                        )
                                                    }}
                                                    >
                                                        {   
                                                            pointsSpinner ?
                                                            <PointsSpinnerContainer>
                                                                <ClipLoader color = '#C4C4C4' size = '' loading = {pointsSpinner}/>
                                                            </PointsSpinnerContainer>
                                                            :
                                                            <PointsWrapper>
                                                                <PointsValueContainer>{element.handicap.awayTeam.points}</PointsValueContainer>
                                                            
                                                                <TeamIconOddsContainer>
                                                                    <TeamIconContainer>
                                                                        <TeamIcon src = {teamIconsObj.awayTeamIcon}/>
                                                                    </TeamIconContainer>
                                                                    <OddsValueContainer>{element.handicap.awayTeam.odds}</OddsValueContainer>
                                                                </TeamIconOddsContainer>
                                                                {
                                                                    element.handicap.selected ?
                                                                    <LockIconContainer>
                                                                        <LockIcon src={lockIcon}/>
                                                                    </LockIconContainer>
                                                                    :
                                                                    null
                                                                }
                                                            </PointsWrapper>
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
                                                            element.moneyLine.homeTeamOdds.bettingSide,
                                                            0,
                                                            gameInfo[index].moneyLine.homeTeamOdds.odds,
                                                            null,
                                                            null,
                                                            element.moneyLine.selected
                                                        )
                                                    }}
                                                    >
                                                        {
                                                            pointsSpinner ? 
                                                            <PointsSpinnerContainer>
                                                                <ClipLoader color = '#C4C4C4' size = '' loading = {pointsSpinner}/>
                                                            </PointsSpinnerContainer>
                                                            :
                                                            <PointsWrapper>
                                                                <MoneyLineOddsContainer>
                                                                <TeamIconContainer>
                                                                    <TeamIcon src = {teamIconsObj.homeTeamIcon}/>
                                                                </TeamIconContainer>
                                                                    {element.moneyLine.homeTeamOdds.odds}
                                                                </MoneyLineOddsContainer>
                                                                {
                                                                    element.moneyLine.selected ?
                                                                    <LockIconContainer>
                                                                        <LockIcon src={lockIcon}/>
                                                                    </LockIconContainer>
                                                                    :
                                                                    null
                                                                }
                                                            </PointsWrapper>
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
                                                            element.moneyLine.awayTeamOdds.bettingSide,
                                                            1,
                                                            gameInfo[index].moneyLine.awayTeamOdds.odds,
                                                            null,
                                                            null,
                                                            element.moneyLine.selected
                                                        )
                                                    }}
                                                    >
                                                        {   
                                                            pointsSpinner ?
                                                            <PointsSpinnerContainer>
                                                                <ClipLoader color = '#C4C4C4' size = '' loading = {pointsSpinner}/>
                                                            </PointsSpinnerContainer>
                                                            :
                                                            <PointsWrapper>
                                                                <MoneyLineOddsContainer>
                                                                <TeamIconContainer>
                                                                    <TeamIcon src = {teamIconsObj.awayTeamIcon}/>
                                                                </TeamIconContainer>
                                                                    {element.moneyLine.awayTeamOdds.odds}
                                                                </MoneyLineOddsContainer>
                                                                {
                                                                    element.moneyLine.selected ?
                                                                    <LockIconContainer>
                                                                        <LockIcon src={lockIcon}/>
                                                                    </LockIconContainer>
                                                                    :
                                                                    null
                                                                }
                                                            </PointsWrapper>
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
                                                            null,
                                                            0,
                                                            gameInfo[index].overUnder.overOddsValue,
                                                            null,
                                                            gameInfo[index].overUnder.overTotalScore,
                                                            element.overUnder.selected
                                                        )
                                                    }}
                                                    >
                                                        { 
                                                            pointsSpinner ?
                                                            <PointsSpinnerContainer>
                                                                <ClipLoader color = '#C4C4C4' size = '' loading = {pointsSpinner}/>
                                                            </PointsSpinnerContainer>
                                                            :
                                                            <PointsWrapper>
                                                                <TotalScoreValueContainer>{element.overUnder.overTotalScore}</TotalScoreValueContainer>

                                                                <TeamIconOddsContainer>
                                                                    <ArrowIconContainer>
                                                                        <ArrowIcon src = {overIcon}/>
                                                                    </ArrowIconContainer>
                                                                    <OddsValueContainer>{element.overUnder.overOddsValue}</OddsValueContainer>
                                                                </TeamIconOddsContainer>
                                                                {
                                                                    element.overUnder.selected ?
                                                                    <LockIconContainer>
                                                                        <LockIcon src={lockIcon}/>
                                                                    </LockIconContainer>
                                                                    :
                                                                    null
                                                                }
                                                            </PointsWrapper>
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
                                                            null,
                                                            1,
                                                            gameInfo[index].overUnder.underOddsValue,
                                                            null,
                                                            gameInfo[index].overUnder.underTotalScore,
                                                            element.overUnder.selected
                                                        )
                                                    }}
                                                    >
                                                        {
                                                            pointsSpinner ?
                                                            <PointsSpinnerContainer>
                                                                <ClipLoader color = '#C4C4C4' size = '' loading = {pointsSpinner}/>
                                                            </PointsSpinnerContainer>
                                                            :
                                                            <PointsWrapper>
                                                                <TotalScoreValueContainer>{element.overUnder.underTotalScore}</TotalScoreValueContainer>

                                                                <TeamIconOddsContainer>
                                                                    <ArrowIconContainer>
                                                                        <ArrowIcon src = {underIcon}/>
                                                                    </ArrowIconContainer>
                                                                    <OddsValueContainer>{element.overUnder.underOddsValue}</OddsValueContainer>
                                                                </TeamIconOddsContainer>
                                                                {
                                                                    element.overUnder.selected ?
                                                                    <LockIconContainer>
                                                                        <LockIcon src={lockIcon}/>
                                                                    </LockIconContainer>
                                                                    :
                                                                    null
                                                                }
                                                            </PointsWrapper>
                                                        }
                                                        
                                                    </PointsContainer>
                                                </Col>
                                            </Section2>
                                        </RowC>
                                    )
                                })
                                }
                                </BetSectionPointsContainer>

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
    { getFutureGamesInfo, submitBetPoints, getUserBets, getUserRecord, setStructuredFutureGamesInfo, logoutAction, checkUserRecordCollectionExists })(Betting)