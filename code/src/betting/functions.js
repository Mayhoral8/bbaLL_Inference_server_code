import data from './data.json'

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
import MilwaukeeBucks from '../assets/teamLogos/Milwaukee_bucks.png'
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
import AtlantHawks from '../assets/teamLogos/Atlanta_Hawks.png'

//Data restructuring that comes from the firebase api.
export const structureData=(futureGamesInfo)=>{
    let targetArray=[]
    futureGamesInfo.map(({docId,docData},index)=>{
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
        if(pointsKeysArray.length===0){
            pointsTargetObj={...docData['Game Info'], bettingOdds:{awayTeamOdds:'', homeTeamOdds:''}}
        } else{
            pointsKeysArray.sort()
            let pointsLastIndex=pointsKeysArray.length-1
            let pointsTargetKey=pointsKeysArray[pointsLastIndex]
            pointsTargetObj={awayTeamOdds:docData['Game Odds'].General[pointsTargetKey][awayTeam], homeTeamOdds:docData['Game Odds'].General[pointsTargetKey][homeTeam]}
        }


        let handiKeysArray=Object.keys(docData['Game Odds'].Handicap)
        let handiTargetObj
        if(handiKeysArray.length===0){
            handiTargetObj={handicapHomeTeamOdds:'',handicapAwayTeamOdds:'',handicapHomeTeamPoints:'',handicapAwayTeamPoints:''}
        } else{
            handiKeysArray.sort()
            let handiLastIndex=handiKeysArray.length-1
            let handiTargetKey=handiKeysArray[handiLastIndex]
            let childHandiTargetKeysArray=Object.keys(docData['Game Odds'].Handicap[handiTargetKey])
            let childHandiValue1=childHandiTargetKeysArray[0]
            let childHandiValue2=childHandiTargetKeysArray[1]
            let handiPoint1=docData['Game Odds'].Handicap[handiTargetKey][childHandiValue1]
            let handiPoint2=docData['Game Odds'].Handicap[handiTargetKey][childHandiValue2]
            handiTargetObj={handicapHomeTeamPoints:childHandiValue1,handicapAwayTeamPoints:childHandiValue2,handicapHomeTeamOdds:handiPoint1,handicapAwayTeamOdds:handiPoint2}
        }


        let overUnderKeysArray=Object.keys(docData['Game Odds'].Over_and_under)
        let overUnderTargetObj={}
        if(overUnderKeysArray.length===0){
            overUnderTargetObj={overTotalScore:'',underTotalScore:'',overBettingOdds:'',underBettingOdds:''}
        } else{
            let newKeysArray = []
            for(let i = 0; i < overUnderKeysArray.length; i++){
                let element = overUnderKeysArray[i]
                if(!docData['Game Odds'].Over_and_under[element].Unavailable){
                    newKeysArray.push(element)
                }
            }
            newKeysArray.sort()
            if(newKeysArray[0]){
                let underTotalScore
                let overTotalScore
                let overUnderLastIndex = newKeysArray.length-1
                let overUnderTargetKey=newKeysArray[overUnderLastIndex]
                let childOverUnderTargetKeys=Object.keys(docData['Game Odds'].Over_and_under[overUnderTargetKey])

                if(childOverUnderTargetKeys[0].includes('Under')){
                    underTotalScore=childOverUnderTargetKeys[0]
                }else{
                    overTotalScore=childOverUnderTargetKeys[0]
                }
                if(childOverUnderTargetKeys[1].includes('Over')){
                    overTotalScore=childOverUnderTargetKeys[1]
                }else{
                    underTotalScore=childOverUnderTargetKeys[1]
                }

                let overOddsValue=docData['Game Odds'].Over_and_under[overUnderTargetKey][overTotalScore]
                let underOddsValue=docData['Game Odds'].Over_and_under[overUnderTargetKey][underTotalScore]

                underTotalScore=childOverUnderTargetKeys[0].split(' ')[1]
                overTotalScore=childOverUnderTargetKeys[0].split(' ')[1]

                overUnderTargetObj={overTotalScore,underTotalScore,overOddsValue,underOddsValue}
            } else {
                overUnderTargetObj={overTotalScore:'',underTotalScore:'',overBettingOdds:'',underBettingOdds:''}
            }
        }
        targetArray.push({
            overUnder:{...overUnderTargetObj},
            moneyLine:{...pointsTargetObj},
            handicap:{...handiTargetObj},
            gameDetails:{...gameDetails},
            gameId:docId,
            handicapSelected:null,
            overUnderSelected:null,
            moneyLineSelected:null
        })
    })
    return targetArray
}

export const compareData = () => {

}

export const pointBoxClickHandler=(e, params, index, gameId ,  keyName, selectedKey, oddsValue, pointsValue, scoreValue, props, selectedValues, gameInfo)=>{
    if(props.userDetails){
        let gameInfoUpdated = gameInfo;
        gameInfoUpdated[index][keyName] = selectedKey;
        let targetObj={}
        let gameDetailsObj
        for(let i = 0; i < gameInfoUpdated.length; i++){
            if(gameInfoUpdated[i].gameId === gameId){
                gameDetailsObj = gameInfoUpdated[i].gameDetails
            }
        }

        if(selectedValues[gameId]){
            targetObj=selectedValues
        } else{
            let newObj = { 
                moneyLine: { ...data.selectedValues.moneyLine },
                handicap: { ...data.selectedValues.handicap },
                over: { ...data.selectedValues.over },
                under: { ...data.selectedValues.under }
            }
            selectedValues[gameId]=newObj
            targetObj=selectedValues
        }

        if(params==='moneyLine'){
            targetObj[gameId][params].moneyLineOddsValue=oddsValue;
        } else if(params==='handicap'){
            targetObj[gameId][params].handicapOddsValue=oddsValue;
            targetObj[gameId][params].handicapPointsValue=pointsValue;
        } else{
            if(params.includes('over')){
                targetObj[gameId][params].overOddsValue=oddsValue;
                targetObj[gameId][params].overTotalScoreValue=scoreValue;
                targetObj[gameId]['under'].underOddsValue=null;
                targetObj[gameId]['under'].underTotalScoreValue=null;
            } else{
                targetObj[gameId][params].underOddsValue=oddsValue;
                targetObj[gameId][params].underTotalScoreValue=scoreValue;
                targetObj[gameId]['over'].overOddsValue=null;
                targetObj[gameId]['over'].overTotalScoreValue=null;
            }
        }
        targetObj[gameId].gameDetails = gameDetailsObj;
        targetObj[gameId].gameDate = targetObj[gameId].gameDetails.gameDate
        let newOverviewKeysArray=Object.keys(targetObj);
        return {
            gameInfoUpdated,targetObj,newOverviewKeysArray
        }

    } else{
        props.history.push('/login')
    }
}


export const setTeamIcons = (homeTeam, awayTeam) => {
    let homeTeamIcon = homeTeam === 'AtlantaHawks' ? AtlantHawks
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
    homeTeam === 'Golden State Warrios' ? GoldenStateWarriors
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
    homeTeam === 'Minnesota Timber Wolves' ? MinnesotaTimberwolves
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
    WashingtonWizards

    let awayTeamIcon = homeTeam === 'AtlantaHawks' ? AtlantHawks
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
    awayTeam === 'Golden State Warrios' ? GoldenStateWarriors
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
    awayTeam === 'Minnesota Timber Wolves' ? MinnesotaTimberwolves
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
    WashingtonWizards

    return {homeTeamIcon, awayTeamIcon}
}


export const compareUserBetsAndGameInfo = (userBets, gameInfo) => {
    let gameInfoArray = [...gameInfo]
    let userBetsArray = [...userBets]
    for (let i = 0; i < gameInfoArray.length; i++){

        for(let j = 0; j < userBetsArray.length; j++){

            if(gameInfoArray[i].gameId === userBetsArray[j].docId){
                gameInfoArray[i].disabled = true
            }

        }
    }
    return gameInfoArray
}

export const removeBtnSelectionClass = (gameInfo) => {
    for (let i = 0; i < gameInfo.length; i++){
        gameInfo[i].handicapSelected = null
        gameInfo[i].moneyLineSelected = null
        gameInfo[i].overUnderSelected = null
    }
    return gameInfo
}