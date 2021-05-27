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
                payload: {
                    games: data,
                    isLoading: false
                }
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
        let gameIdKeys = Object.keys(selectedValues)
        let date = new Date
        let today = moment(date).tz("America/New_York").format('YYYY-MM-DD');
        for (let i = 0; i < gameInfo.length; i++){
            
            for (let j = 0; j < gameIdKeys.length; j++){

                if(gameIdKeys[j] === gameInfo[i].gameId){

                    let gameDate = selectedValues[`${gameIdKeys[j]}`].gameDetails.gameDate ? selectedValues[`${gameIdKeys[j]}`].gameDetails.gameDate : ''

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
                                targetObj.handicap = selectedValues[gameIdKeys[j]].handicap
                            }
                            else if(gameInfo[i].overUnder.selected && gameInfo[i].handicap.selected ){
                                targetObj.moneyLine = selectedValues[gameIdKeys[j]].moneyLine
                            }
                            else{
                                targetObj.overAndUnder = selectedValues[gameIdKeys[j]].overAndUnder
                            }
                        }
                        else{
                            if(gameInfo[i].overUnder.selected){
                                targetObj.handicap = selectedValues[gameIdKeys[j]].handicap
                                targetObj.moneyLine = selectedValues[gameIdKeys[j]].moneyLine
                            }
                            if(gameInfo[i].moneyLine.selected){
                                targetObj.handicap = selectedValues[gameIdKeys[j]].handicap
                                targetObj.overAndUnder = selectedValues[gameIdKeys[j]].overAndUnder
                            }
                            if(gameInfo[i].handicap.selected){
                                targetObj.moneyLine = selectedValues[gameIdKeys[j]].moneyLine
                                targetObj.overAndUnder = selectedValues[gameIdKeys[j]].overAndUnder
                            }
                        }

                        try{
                            await fbFirestoreSpigameBet.collection('userBettingHistory').doc(userId).collection('gameDate').doc(gameDate).collection('gameId').doc(gameIdKeys[j]).update(targetObj)
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
                        targetObj.gameDetails = selectedValues[gameIdKeys[j]].gameDetails
                        targetObj.handicap = selectedValues[gameIdKeys[j]].handicap
                        targetObj.moneyLine = selectedValues[gameIdKeys[j]].moneyLine
                        targetObj.overAndUnder = selectedValues[gameIdKeys[j]].overAndUnder
                        targetObj.gameFinished = false

                        try{
                            let userList = await fbFirestoreSpigameBet.collection('userTrackList').doc(gameDate).collection('gameId').doc(gameIdKeys[j]).get()
                            let userListTargetObj = userList.data()

                            if(!userList.data()){
                                userListTargetObj = {}
                            }

                            userListTargetObj[userId] = ''
                            let year = moment(gameDate, 'YYYY-MM-DD').format('YYYY')
                            let month = moment(gameDate, 'YYYY-MM-DD').format('M')
                            let betHistory = await fbFirestoreSpigameBet.collection('userBettingHistoryTracker').doc(userId).collection('year').doc(year).collection('month').doc(month).get()
                            let betHistoryTargetObj = betHistory.data()
                            if(!betHistory.data()){
                                betHistoryTargetObj = {}
                                betHistoryTargetObj[gameDate] = {}
                                betHistoryTargetObj[gameDate][gameIdKeys[j]] = ''
                                await fbFirestoreSpigameBet.collection('userBettingHistoryTracker').doc(userId).collection('year').doc(year).collection('month').doc(month).set(betHistoryTargetObj, {merge: true})
                            }
                            else{
                                let datekeys = Object.keys(betHistoryTargetObj)
                                datekeys.sort()
                                let lastIndex = datekeys.length - 1

                                if(datekeys[lastIndex] === today){
                                    betHistoryTargetObj[datekeys[lastIndex]][gameIdKeys[j]] = ''
                                    await fbFirestoreSpigameBet.collection('userBettingHistoryTracker').doc(userId).collection('year').doc(year).collection('month').doc(month).update({
                                        [datekeys[lastIndex]]: {
                                            [gameIdKeys[j]]: ''
                                        }
                                    })
                                }
                                else{
                                    await fbFirestoreSpigameBet.collection('userBettingHistoryTracker').doc(userId).collection('year').doc(year).collection('month').doc(month).update({
                                        [today]: {
                                            [gameIdKeys[j]]: ''
                                        }
                                    })
                                }
                                
                            }

                            await fbFirestoreSpigameBet.collection('userTrackList').doc(gameDate).collection('gameId').doc(gameIdKeys[j]).set(userListTargetObj)
                            await fbFirestoreSpigameBet.collection('userBettingHistory').doc(userId).collection('gameDate').doc(gameDate).collection('gameId').doc(gameIdKeys[j]).set(targetObj)
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
            let collection = await fbFirestoreSpigameBet.collection('userBettingHistory').doc(userId).collection('gameDate').doc(today).collection('gameId').get()
            let data=[]
            collection.forEach((doc) => {
                const docData = doc.data()
                const docId = doc.id
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