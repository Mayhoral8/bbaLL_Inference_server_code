import {fbFirestore} from '../../App/config'
import {fbFirestoreSpigameBet} from '../../App/spigamebetFirebase'
import {GET_FUTURE_GAMES_INFO} from './types'

export const getFutureGamesInfo=()=>{
    return async(dispatch)=>{
        return fbFirestore.collection('future_game_info').get()
        .then(async(collections)=>{
            let data=[]
            await collections.forEach((doc) => {
                const docData=doc.data()
                const docId=doc.id
                data.push({docData,docId})
            })
            dispatch({
                type:GET_FUTURE_GAMES_INFO,
                payload:data
            })
            return {status:200}
        })
        .catch((e)=>{
            throw e
        })
    }
}

export const submitBetPoints=(selectedValues, userId)=>{
    return async(dispatch) => {
        let keys = Object.keys(selectedValues)
        for (let index = 0; index<keys.length; index++){
            let targetObj = {
                moneyLineOddsValue:  selectedValues[`${index}`].moneyLine.moneyLineOddsValue ? selectedValues[`${index}`].moneyLine.moneyLineOddsValue: '',
                handicapOddsValue:  selectedValues[`${index}`].handicap.handicapOddsValue ? selectedValues[`${index}`].handicap.handicapOddsValue : '',
                handicapPointsValue: selectedValues[`${index}`].handicap.handicapPointsValue ? selectedValues[`${index}`].handicap.handicapPointsValue : '',
                underOddsValue: selectedValues[`${index}`].under.underOddsValue ? selectedValues[`${index}`].under.underOddsValue : '',
                underTotalScoreValue: selectedValues[`${index}`].under.underTotalScoreValue ? selectedValues[`${index}`].under.underTotalScoreValue : '',
                overOddsValue: selectedValues[`${index}`].over.overOddsValue ? selectedValues[`${index}`].over.overOddsValue : '',
                overTotalScoreValue: selectedValues[`${index}`].over.overTotalScoreValue ? selectedValues[`${index}`].over.overTotalScoreValue : '',
                gameStartTime: selectedValues[`${index}`].gameDetails.gameStartTime ? selectedValues[`${index}`].gameDetails.gameStartTime : '',
                gameDate: selectedValues[`${index}`].gameDetails.gameDate ? selectedValues[`${index}`].gameDetails.gameDate : '',
                homeTeam: selectedValues[`${index}`].gameDetails.homeTeam ? selectedValues[`${index}`].gameDetails.homeTeam : '',
                awayTeam: selectedValues[`${index}`].gameDetails.awayTeam ? selectedValues[`${index}`].gameDetails.awayTeam : '',
                gameId: selectedValues[`${index}`].gameId ? selectedValues[`${index}`].gameId : ''
            }
            fbFirestoreSpigameBet.collection('userBets').doc(userId).set(targetObj)
            .then(()=>{
                return {status:200}
            })
            .catch((e)=>{
                throw e
            })
        }
    }
}