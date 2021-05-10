import {fbFirestore} from '../../App/config'
import {fbFirestoreSpigameBet} from '../../App/spigamebetFirebase'
import {GET_FUTURE_GAMES_INFO, GETUSERBETS, SET_STRUCTURED_GAME_INFO} from './types'
import moment from 'moment-timezone'

export const getFutureGamesInfo=()=>{
    return async(dispatch)=>{
        
        try{
            let collection = await fbFirestore.collection('future_game_info').get()
            let data=[]

            await collection.forEach((doc) => {
                const docData=doc.data()
                const docId=doc.id
                data.push({docData,docId})
            })
            dispatch({
                type:GET_FUTURE_GAMES_INFO,
                payload:data
            })

            return {success: true}
        }
        catch(e){
            throw e
        }
    }
}

export const setStructuredFutureGamesInfo = (data) => {
    return async(dispatch) => {
        dispatch({
            type: SET_STRUCTURED_GAME_INFO,
            payload: data
        })
    }
}

export const submitBetPoints=(selectedValues, gameInfo, userId)=>{
    return async(dispatch) => {
        let error = {}
        let keys = Object.keys(selectedValues)

        for (let i = 0; i < gameInfo.length; i++){
            
            for (let j = 0; j < keys.length; j++){

                if(keys[j] === gameInfo[i].gameId){

                    let gameDate = selectedValues[`${keys[j]}`].gameDetails.gameDate ? selectedValues[`${keys[j]}`].gameDetails.gameDate : ''

                    if(gameInfo[i].overUnder.selected || gameInfo[i].moneyLine.selected || gameInfo[i].handicap.selected){
                        let targetObj = {}
                        if(
                            (gameInfo[i].overUnder.selected && gameInfo[i].moneyLine.selected) 
                            || 
                            (gameInfo[i].overUnder.selected && gameInfo[i].handicap.selected) 
                            || 
                            (gameInfo[i].handicap.selected && gameInfo[i].moneyLine.selected)
                        ){
                            if(gameInfo[i].overUnder.selected && gameInfo[i].moneyLine.selected){
                                targetObj.handicap = selectedValues[keys[j]].handicap
                            }
                            else if(gameInfo[i].overUnder.selected && gameInfo[i].handicap.selected ){
                                targetObj.moneyLine = selectedValues[keys[j]].moneyLine
                            }
                            else{
                                targetObj.overAndUnder = selectedValues[keys[j]].overAndUnder
                            }
                        }
                        else{
                            if(gameInfo[i].overUnder.selected){
                                targetObj.handicap = selectedValues[keys[j]].handicap
                                targetObj.moneyLine = selectedValues[keys[j]].moneyLine
                            }
                            if(gameInfo[i].moneyLine.selected){
                                targetObj.handicap = selectedValues[keys[j]].handicap
                                targetObj.overAndUnder = selectedValues[keys[j]].overAndUnder
                            }
                            if(gameInfo[i].handicap.selected){
                                targetObj.moneyLine = selectedValues[keys[j]].moneyLine
                                targetObj.overAndUnder = selectedValues[keys[j]].overAndUnder
                            }
                        }

                        try{
                            await fbFirestoreSpigameBet.collection('userBets').doc(gameDate).collection('gameId').doc(keys[j]).collection('userId').doc(userId).update(targetObj)
                        }
                        catch(e){
                            error.isError = true
                            error.status = e.status
                            error.message = e.message
                            break
                        }
                    }
                    else{

                        let targetObj = {}
                        targetObj.gameDetails = selectedValues[keys[j]].gameDetails
                        targetObj.handicap = selectedValues[keys[j]].handicap
                        targetObj.moneyLine = selectedValues[keys[j]].moneyLine
                        targetObj.overAndUnder = selectedValues[keys[j]].overAndUnder
                        targetObj.gameFinished = false

                        try{
                            await fbFirestoreSpigameBet.collection('userBets').doc(gameDate).collection('gameId').doc(keys[j]).collection('userId').doc(userId).set(targetObj)
                            await fbFirestoreSpigameBet.collection('userList').doc(gameDate).collection('gameId').doc(keys[j]).collection('userId').doc(userId).set({userId})
                        }
                        catch(e){
                            error.isError = true
                            error.status = e.status
                            error.message = e.message
                            break
                        }

                    }
                }

            }
        }

        return error.isError ? error : {success: true}

    }
}

export const getUserBets = (userId) => {
    return async(dispatch) => {
        let date = new Date
        let today = moment(date).tz("America/New_York").format('YYYY-MM-DD');
        try{
            let collection = await fbFirestoreSpigameBet.collection('userBets').doc(today).collection('gameId').doc(userId).collection('userId').get()
            let data=[]
            collection.forEach((doc) => {
                const docData = doc.data()
                const docId=doc.id
                data.push({docData,docId})
            })
            dispatch({
                type: GETUSERBETS,
                payload: {bets: data, loading: false}
            })
            return {success: true}
        }
        catch(e){
            throw e
        }
    }
}