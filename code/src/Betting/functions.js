import constants from './constants.json'
import moment from 'moment'
import momentTimezone from 'moment-timezone'

//teams logos imports
import AtlantaHawks from '../assets/teamLogos/Atlanta_Hawks.png'
import BostonCeltics from '../assets/teamLogos/Boston_Celtics.png'
import BrooklynNets from '../assets/teamLogos/Brooklyn_Nets.png'
import CharlotteHornets from '../assets/teamLogos/Charlotte_Hornets.png'
import ChicagoBulls from '../assets/teamLogos/Chicago_Bulls.png'
import ClevelandCavaliers from '../assets/teamLogos/Cleveland_Cavaliers.png'
import DallasMavericks from '../assets/teamLogos/Dallas_Mavericks.png'
import DenverNuggets from '../assets/teamLogos/Denver_Nuggets.png'
import DetroitPistons from '../assets/teamLogos/Detroit_Pistons.png'
import GoldenStateWarriors from '../assets/teamLogos/Golden_State_Warriors.png'
import HoustonRockets from '../assets/teamLogos/Houston_Rockets.png'
import IndianaPacers from '../assets/teamLogos/Indiana_Pacers.png'
import LosAngelesClippers from '../assets/teamLogos/Los_Angeles_Clippers.png'
import LosAngelesLakers from '../assets/teamLogos/Los_Angeles_Lakers.png'
import MemphisGrizzlies from '../assets/teamLogos/Memphis_Grizzlies.png'
import MiamiHeat from '../assets/teamLogos/Miami_Heat.png'
import MilwaukeeBucks from '../assets/teamLogos/Milwaukee_Bucks.png'
import MinnesotaTimberwolves from '../assets/teamLogos/Minnesota_Timberwolves.png'
import NewOrleansPelicans from '../assets/teamLogos/New_Orleans_Pelicans.png'
import NewYorkKnicks from '../assets/teamLogos/New_York_Knicks.png'
import OklahomaCityThunder from '../assets/teamLogos/Oklahoma_City_Thunder.png'
import OrlandoMagic from '../assets/teamLogos/Orlando_Magic.png'
import Philadelphia76ers from '../assets/teamLogos/Philadelphia_76ers.png'
import PhoenixSuns from '../assets/teamLogos/Phoenix_Suns.png'
import PortlandTrailBlazers from '../assets/teamLogos/Portland_Trail_Blazers.png'
import SacramentoKings from '../assets/teamLogos/Sacramento_Kings.png'
import SanAntonioSpurs from '../assets/teamLogos/San_Antonio_Spurs.png'
import TorontoRaptors from '../assets/teamLogos/Toronto_Raptors.png'
import UtahJazz from '../assets/teamLogos/Utah_Jazz.png'
import WashingtonWizards from '../assets/teamLogos/Washington_Wizards.png'

//Data restructuring that comes from the firebase api.
export const structureData = (futureGamesInfo) => {
    let targetArray=[]

    futureGamesInfo.map(({docId, docData}, index) => {
        let pointsKeysArray=Object.keys(docData['Game Odds'].General)
        let awayTeam=docData['Game Info']['Away Team']
        let homeTeam=docData['Game Info']['Home Team']
        let pointsTargetObj={}
        let gameDetails={
            gameDate: docData['Game Info']['Game Date'],
            awayTeam,
            homeTeam,
            gameStartTime: docData['Game Info']['Game Start Time']
        }

        if(pointsKeysArray.length === 0){
            pointsTargetObj = {
                awayTeam: {
                    odds: '',
                    bettingSide: ''
                },
                homeTeam: {
                    odds: '',
                    bettingSide: ''
                }
            }
        } 
        else{

            pointsKeysArray.sort()
            let pointsLastIndex = pointsKeysArray.length-1
            let pointsTargetKey = pointsKeysArray[pointsLastIndex]
            pointsTargetObj = {
                awayTeam: {
                    odds: docData['Game Odds'].General[pointsTargetKey][awayTeam],
                    bettingSide: awayTeam,
                }, 
                homeTeam: {
                    odds: docData['Game Odds'].General[pointsTargetKey][homeTeam],
                    bettingSide: homeTeam
                }
            }

        }


        let handiKeysArray = Object.keys(docData['Game Odds'].Handicap)
        let handiTargetObj

        if(handiKeysArray.length === 0){
            handiTargetObj = {
                awayTeam: {
                    bettingSide: '',
                    odds: '',
                    points: ''
                },
                homeTeam: {
                    bettingSide: '',
                    odds: '',
                    points: ''
                }
            }
        } 
        else{

            handiKeysArray.sort()
            let handiLastIndex=handiKeysArray.length-1
            let handiTargetKey=handiKeysArray[handiLastIndex]
            let homeTeamObject = docData['Game Odds'].Handicap[handiTargetKey][homeTeam]
            let awayTeamObject = docData['Game Odds'].Handicap[handiTargetKey][awayTeam]

            let handiHomeTeamKey = Object.keys(homeTeamObject)
            let handiAwayTeamKey = Object.keys(awayTeamObject)



            handiTargetObj = {
                awayTeam: {
                    bettingSide: awayTeam,
                    odds: awayTeamObject[handiAwayTeamKey[0]],
                    points: handiAwayTeamKey[0]
                },
                homeTeam: {
                    bettingSide: homeTeam,
                    odds: homeTeamObject[handiHomeTeamKey[0]],
                    points: handiHomeTeamKey[0]
                }
            }
        }


        let overUnderKeysArray=Object.keys(docData['Game Odds'].Over_and_under)
        let overUnderTargetObj={}

        if(overUnderKeysArray.length === 0){
            overUnderTargetObj={overTotalScore:'',underTotalScore:'',overBettingOdds:'',underBettingOdds:''}
        } 
        else{

            overUnderKeysArray.sort()
            let underTotalScore
            let overTotalScore
            let overUnderLastIndex = overUnderKeysArray.length-1
            let overUnderTargetKey=overUnderKeysArray[overUnderLastIndex]
            let childOverUnderTargetKeys=Object.keys(docData['Game Odds'].Over_and_under[overUnderTargetKey])

            childOverUnderTargetKeys.sort()
            if(childOverUnderTargetKeys[0].includes('Under')){
                underTotalScore = childOverUnderTargetKeys[0]
            }else{
                overTotalScore = childOverUnderTargetKeys[0]
            }
            if(childOverUnderTargetKeys[1].includes('Over')){
                overTotalScore = childOverUnderTargetKeys[1]
            }else{
                underTotalScore = childOverUnderTargetKeys[1]
            }

            let overOddsValue = docData['Game Odds'].Over_and_under[overUnderTargetKey][overTotalScore]
            let underOddsValue = docData['Game Odds'].Over_and_under[overUnderTargetKey][underTotalScore]

            underTotalScore = childOverUnderTargetKeys[0].split(' ')[1]
            overTotalScore = childOverUnderTargetKeys[0].split(' ')[1]
            overUnderTargetObj = {overTotalScore,underTotalScore,overOddsValue,underOddsValue}

        }

        targetArray.push({
            overUnder: overUnderTargetObj,
            moneyLine: pointsTargetObj,
            handicap: {...handiTargetObj},
            gameDetails,
            gameId:docId,
            handicapSelected:null,
            overUnderSelected:null,
            moneyLineSelected:null
        })
    })

    return targetArray
}

//This function runs when the user clicks on the point box to select the game odds for initiating the bet.
export const pointBoxClickHandler = (e, params, index, gameId,  selectedType, bettingSide, colIndex, oddsValue, pointsValue, scoreValue, props, selectedValues, gameInfo) => {

    if(props.userDetails){
        let gameInfoUpdated = gameInfo;

        if(gameInfoUpdated[index][selectedType] === colIndex){

            gameInfoUpdated[index][selectedType] = null;
            let targetObj = selectedValues

            if(!targetObj[gameId].moneyLine.odds && !targetObj[gameId].handicap.odds || !targetObj[gameId].moneyLine.odds && !targetObj[gameId].overAndUnder.odds || !targetObj[gameId].handicap.odds && !targetObj[gameId].overAndUnder.odds){
                delete targetObj[gameId]

            }
            else{
                if(params === 'moneyLine'){
                    targetObj[gameId][params] = {}
                } 
                else if(params === 'handicap'){
                    targetObj[gameId][params] = {}
                } 
                else{
                    targetObj[gameId].overAndUnder = {};
                }
            }

            let newOverviewKeysArray=Object.keys(targetObj);
            return{
                gameInfoUpdated, targetObj, newOverviewKeysArray
            }

        }
        else{
            
            gameInfoUpdated[index][selectedType] = colIndex;
            let targetObj={}
            let gameDetailsObj

            for(let i = 0; i < gameInfoUpdated.length; i++){

                if(gameInfoUpdated[i].gameId === gameId){
                    gameDetailsObj = gameInfoUpdated[i].gameDetails
                }

            }

            if(selectedValues[gameId]){
                targetObj = selectedValues
            } 
            else{
                
                let newObj = { 
                    moneyLine: { ...constants.selectedValues.moneyLine },
                    handicap: { ...constants.selectedValues.handicap },
                    overAndUnder: {...constants.selectedValues.overAndUnder}
                }
                selectedValues[gameId] = newObj
                targetObj = selectedValues

            }

            if(params === 'moneyLine'){

                targetObj[gameId][params].odds = oddsValue;
                targetObj[gameId][params].bettingSide = bettingSide;

            } 
            else if(params === 'handicap'){

                targetObj[gameId][params].odds = oddsValue;
                targetObj[gameId][params].spread = pointsValue;
                targetObj[gameId][params].bettingSide = bettingSide;

            } 
            else{

                let overAndUnder = {}
                overAndUnder.odds = oddsValue
                overAndUnder.totalScore = scoreValue

                if(params.includes('over')){
                    overAndUnder.type = 'over'
                } 
                else{
                    overAndUnder.type = 'under'
                }

                targetObj[gameId].overAndUnder = overAndUnder;
            }

            targetObj[gameId].gameDetails = gameDetailsObj;
            targetObj[gameId].gameDate = targetObj[gameId].gameDetails.gameDate
            let newOverviewKeysArray=Object.keys(targetObj);

            return {
                gameInfoUpdated, targetObj, newOverviewKeysArray
            }
        }

    }
    else{
        props.history.push('/login')
    }
}

export const setTeamIcons = (homeTeam, awayTeam) => {
    let homeTeamIcon = homeTeam === 'Atlanta Hawks' ? AtlantaHawks
    : 
    homeTeam === 'Boston Celtics' ? BostonCeltics
    :
    homeTeam === 'Brooklyn Nets' ? BrooklynNets
    :
    homeTeam === 'Charlotte Hornets' ? CharlotteHornets
    :
    homeTeam === 'Chicago Bulls' ? ChicagoBulls
    :
    homeTeam === 'Cleveland Cavaliers' ? ClevelandCavaliers
    :
    homeTeam === 'Dallas Mavericks' ? DallasMavericks
    :
    homeTeam === 'Denver Nuggets' ? DenverNuggets
    :
    homeTeam === 'Detroit Pistons' ? DetroitPistons
    :
    homeTeam === 'Golden State Warriors' ? GoldenStateWarriors
    :
    homeTeam === 'Houston Rockets' ? HoustonRockets
    :
    homeTeam === 'Indiana Pacers' ? IndianaPacers
    :
    homeTeam === 'Los Angeles Clippers' ? LosAngelesClippers
    :
    homeTeam === 'Los Angeles Lakers' ? LosAngelesLakers
    :
    homeTeam === 'Memphis Grizzlies' ? MemphisGrizzlies
    :
    homeTeam === 'Miami Heat' ? MiamiHeat
    :
    homeTeam === 'Milwaukee Bucks' ? MilwaukeeBucks
    :
    homeTeam === 'Minnesota Timberwolves' ? MinnesotaTimberwolves
    :
    homeTeam === 'New Orleans Pelicans' ? NewOrleansPelicans
    :
    homeTeam === 'New York Knicks' ? NewYorkKnicks
    :
    homeTeam === 'Oklahoma City Thunder' ? OklahomaCityThunder
    :
    homeTeam === 'Orlando Magic' ? OrlandoMagic
    :
    homeTeam === 'Philadelphia 76ers' ? Philadelphia76ers
    :
    homeTeam === 'Phoenix Suns' ? PhoenixSuns
    :
    homeTeam === 'Portland Trail Blazers' ? PortlandTrailBlazers
    :
    homeTeam === 'Sacramento Kings' ? SacramentoKings
    :
    homeTeam === 'San Antonio Spurs' ? SanAntonioSpurs
    :
    homeTeam === 'Toronto Raptors' ? TorontoRaptors
    :
    homeTeam === 'Utah Jazz' ? UtahJazz
    :
    homeTeam === 'Washington Wizards' ? WashingtonWizards
    :
    null

    let awayTeamIcon = awayTeam === 'Atlanta Hawks' ? AtlantaHawks
    : 
    awayTeam === 'Boston Celtics' ? BostonCeltics
    :
    awayTeam === 'Brooklyn Nets' ? BrooklynNets
    :
    awayTeam === 'Charlotte Hornets' ? CharlotteHornets
    :
    awayTeam === 'Chicago Bulls' ? ChicagoBulls
    :
    awayTeam === 'Cleveland Cavaliers' ? ClevelandCavaliers
    :
    awayTeam === 'Dallas Mavericks' ? DallasMavericks
    :
    awayTeam === 'Denver Nuggets' ? DenverNuggets
    :
    awayTeam === 'Detroit Pistons' ? DetroitPistons
    :
    awayTeam === 'Golden State Warriors' ? GoldenStateWarriors
    :
    awayTeam === 'Houston Rockets' ? HoustonRockets
    :
    awayTeam === 'Indiana Pacers' ? IndianaPacers
    :
    awayTeam === 'Los Angeles Clippers' ? LosAngelesClippers
    :
    awayTeam === 'Los Angeles Lakers' ? LosAngelesLakers
    :
    awayTeam === 'Memphis Grizzlies' ? MemphisGrizzlies
    :
    awayTeam === 'Miami Heat' ? MiamiHeat
    :
    awayTeam === 'Milwaukee Bucks' ? MilwaukeeBucks
    :
    awayTeam === 'Minnesota Timberwolves' ? MinnesotaTimberwolves
    :
    awayTeam === 'New Orleans Pelicans' ? NewOrleansPelicans
    :
    awayTeam === 'New York Knicks' ? NewYorkKnicks
    :
    awayTeam === 'Oklahoma City Thunder' ? OklahomaCityThunder
    :
    awayTeam === 'Orlando Magic' ? OrlandoMagic
    :
    awayTeam === 'Philadelphia 76ers' ? Philadelphia76ers
    :
    awayTeam === 'Phoenix Suns' ? PhoenixSuns
    :
    awayTeam === 'Portland Trail Blazers' ? PortlandTrailBlazers
    :
    awayTeam === 'Sacramento Kings' ? SacramentoKings
    :
    awayTeam === 'San Antonio Spurs' ? SanAntonioSpurs
    :
    awayTeam === 'Toronto Raptors' ? TorontoRaptors
    :
    awayTeam === 'Utah Jazz' ? UtahJazz
    :
    awayTeam === 'Washington Wizards' ? WashingtonWizards
    :
    null

    return {homeTeamIcon, awayTeamIcon}
}

//As the function receives the bet history (userBets) and the existing games (gameInfo), it compares and sees which of the games
//did user submit the bets on and the returns the computed array which is then looped over and displayed on the betting page.
export const compareUserBetsAndGameInfo = (userBets, gameInfo) => {
    let gameInfoArray = [...gameInfo]
    let userBetsArray = [...userBets]
    for (let i = 0; i < gameInfoArray.length; i++){

        for(let j = 0; j < userBetsArray.length; j++){

            if(gameInfoArray[i].gameId === userBetsArray[j].docId){
                if(userBetsArray[j].docData.handicap.odds){
                    gameInfoArray[i].handicap.selected = true
                }
                if(userBetsArray[j].docData.moneyLine.odds){
                    gameInfoArray[i].moneyLine.selected = true
                }
                if(userBetsArray[j].docData.overAndUnder.odds){
                    gameInfoArray[i].overUnder.selected = true
                }
            }

        }
    }
    return gameInfoArray
}

//When the user clicks on the point box the selected class is enabled, this function is to diminish the selected class so that the css styles are removed.
export const removeBtnSelectionClass = (gameInfo) => {
    for (let i = 0; i < gameInfo.length; i++){
        gameInfo[i].handicapSelected = null
        gameInfo[i].moneyLineSelected = null
        gameInfo[i].overUnderSelected = null
    }
    return gameInfo
}

//This function checks if the game has started on bet submission or not, in case the game has started the bet won't be submitted as the request gets cancelled.
export const checkGameTimings = (selectedGames) => {
    let currentDate = momentTimezone(new Date()).tz("America/New_York").format('YYYY-MM-DD hh:mm A')
    let keysArray = Object.keys(selectedGames)
    let isTrue = 0
    let isFalse = 0
    for(let i = 0; i < keysArray.length; i++){
        let gameStartDate = selectedGames[keysArray[i]].gameDetails.gameDate +  " " +selectedGames[keysArray[i]].gameDetails.gameStartTime
        let isGameStartTimeBeforeTheCurrentTime = moment(gameStartDate).isAfter(moment(currentDate))
        if(isGameStartTimeBeforeTheCurrentTime){
            isTrue++
        }
        else{
            isFalse++
        }
    }

    if(isTrue === keysArray.length){
        return true
    }
    else{
        return isFalse
    }
}
