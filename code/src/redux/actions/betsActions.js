import {fbFirestore} from '../../App/config'
import {fbFirestoreSpigameBet} from '../../App/spigamebetFirebase'
import {GET_FUTURE_GAMES_INFO, GETUSERBETS} from './types'
import momentTimezone from 'moment-timezone'
import moment from 'moment'
import {structureData} from '../../Betting/functions'

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

            let computedData = structureData(data)
            dispatch({
                type:GET_FUTURE_GAMES_INFO,
                payload: {
                    games: computedData,
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

export const submitBetPoints=(selectedValues, gameInfo, userId)=>{
    return async() => {
        let error = {}
        let gameIdKeys = Object.keys(selectedValues)
        let date = new Date
        let today = momentTimezone(date).tz("America/New_York").format('YYYY-MM-DD');
        for (let i = 0; i < gameInfo.length; i++){
            
            for (let j = 0; j < gameIdKeys.length; j++){

                if(gameIdKeys[j] === gameInfo[i].gameId){

                    let gameDate = selectedValues[`${gameIdKeys[j]}`].gameDetails.gameDate ? selectedValues[`${gameIdKeys[j]}`].gameDetails.gameDate : ''
                    // If the bet has already been submitted on that date.
                    // This conditional checks for the values that have already been previously selected and submitted out of moneyLine, handicap and overUnder.
                    // Based on the submitted values, it adds new values (money line or handicap or over under) to the firebase api.
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
                                targetObj.handicap.submittedDate = today
                            }
                            else if(gameInfo[i].overUnder.selected && gameInfo[i].handicap.selected ){
                                targetObj.moneyLine = selectedValues[gameIdKeys[j]].moneyLine
                                targetObj.moneyLine.submittedDate = today
                            }
                            else{
                                targetObj.overAndUnder = selectedValues[gameIdKeys[j]].overAndUnder
                                targetObj.overAndUnder.submittedDate = today
                            }
                        }
                        else{
                            if(gameInfo[i].overUnder.selected){
                                targetObj.handicap = selectedValues[gameIdKeys[j]].handicap
                                targetObj.handicap.submittedDate = selectedValues[gameIdKeys[j]].handicap.odds ? today : ''
                                targetObj.moneyLine = selectedValues[gameIdKeys[j]].moneyLine
                                targetObj.moneyLine.submittedDate = selectedValues[gameIdKeys[j]].moneyLine.odds ? today : ''
                            }
                            if(gameInfo[i].moneyLine.selected){
                                targetObj.handicap = selectedValues[gameIdKeys[j]].handicap
                                targetObj.handicap.submittedDate = selectedValues[gameIdKeys[j]].handicap.odds ? today : ''
                                targetObj.overAndUnder = selectedValues[gameIdKeys[j]].overAndUnder
                                targetObj.overAndUnder.submittedDate = selectedValues[gameIdKeys[j]].overAndUnder.odds ? today : ''
                            }
                            if(gameInfo[i].handicap.selected){
                                targetObj.moneyLine = selectedValues[gameIdKeys[j]].moneyLine
                                targetObj.moneyLine.submittedDate = selectedValues[gameIdKeys[j]].moneyLine.odds ? today : ''
                                targetObj.overAndUnder = selectedValues[gameIdKeys[j]].overAndUnder
                                targetObj.overAndUnder.submittedDate = selectedValues[gameIdKeys[j]].overAndUnder.odds ? today : ''
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
                    //This would run if the user submits the best for the first time on that date.
                    else{

                        let targetObj = {}
                        //Checks for the picked values on the intial bet and then adds submitDate prop to the object based on the conditional
                        targetObj.gameDetails = selectedValues[gameIdKeys[j]].gameDetails
                        targetObj.handicap = selectedValues[gameIdKeys[j]].handicap
                        targetObj.handicap.submittedDate = selectedValues[gameIdKeys[j]].handicap.odds ? today : ''
                        targetObj.moneyLine = selectedValues[gameIdKeys[j]].moneyLine
                        targetObj.moneyLine.submittedDate = selectedValues[gameIdKeys[j]].moneyLine.odds ? today : ''
                        targetObj.overAndUnder = selectedValues[gameIdKeys[j]].overAndUnder
                        targetObj.overAndUnder.submittedDate = selectedValues[gameIdKeys[j]].overAndUnder.odds ? today : ''
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
                                let futureDateKeys = []

                                for (let k = 0 ; k < datekeys.length; k++){
                                    let isFutureDate = moment(datekeys[k]).isAfter(moment(today))
                                    if(isFutureDate || datekeys[k] === today){
                                        futureDateKeys.push(datekeys[k])
                                    }
                                }

                                if(futureDateKeys.length < 1){
                                    betHistoryTargetObj[selectedValues[`${gameIdKeys[j]}`].gameDetails.gameDate] = {}
                                    betHistoryTargetObj[selectedValues[`${gameIdKeys[j]}`].gameDetails.gameDate][gameIdKeys[j]] = ''
                                    await fbFirestoreSpigameBet.collection('userBettingHistoryTracker').doc(userId).collection('year').doc(year).collection('month').doc(month).set(betHistoryTargetObj)
                                }
                                else {
                                    for (let k = 0; k < futureDateKeys.length; k++){

                                        if(futureDateKeys[k] === selectedValues[`${gameIdKeys[j]}`].gameDetails.gameDate){
                                            await fbFirestoreSpigameBet.collection('userBettingHistoryTracker').doc(userId).collection('year').doc(year).collection('month').doc(month).update({
                                                [futureDateKeys[k]]: {
                                                    ...betHistoryTargetObj[futureDateKeys[k]],
                                                    [gameIdKeys[j]]: ''
                                                }
                                            }, {merge: true})
                                        }
    
                                        else{
                                            betHistoryTargetObj[selectedValues[`${gameIdKeys[j]}`].gameDetails.gameDate] = {}
                                            betHistoryTargetObj[selectedValues[`${gameIdKeys[j]}`].gameDetails.gameDate][gameIdKeys[j]] = ''
                                            await fbFirestoreSpigameBet.collection('userBettingHistoryTracker').doc(userId).collection('year').doc(year).collection('month').doc(month).set(betHistoryTargetObj)
                                        }
                                    }
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
        let today = momentTimezone(date).tz("America/New_York").format('YYYY-MM-DD');
        let tomorrow = moment(today, "YYYY-MM-DD").add(1, 'days').format('YYYY-MM-DD');
        let dayAfter = moment(today, "YYYY-MM-DD").add(2, 'days').format('YYYY-MM-DD');

        try{
            let todayGames = await fbFirestoreSpigameBet.collection('userBettingHistory').doc(userId).collection('gameDate').doc(today).collection('gameId').get()
            let tomorrowGames = await fbFirestoreSpigameBet.collection('userBettingHistory').doc(userId).collection('gameDate').doc(tomorrow).collection('gameId').get()
            let dayAfterGames = await fbFirestoreSpigameBet.collection('userBettingHistory').doc(userId).collection('gameDate').doc(dayAfter).collection('gameId').get()

            let todayGamesArray = []
            let tomorrowGamesArray = []
            let dayAfterGamesArray = []

            todayGames.forEach((doc) => {
                const docData = doc.data()
                const docId = doc.id
                todayGamesArray.push({docData,docId})
            })

            tomorrowGames.forEach((doc) => {
                const docData = doc.data()
                const docId = doc.id
                tomorrowGamesArray.push({docData,docId})
            })

            dayAfterGames.forEach((doc) => {
                const docData = doc.data()
                const docId = doc.id
                dayAfterGamesArray.push({docData,docId})
            })

            dispatch({
                type: GETUSERBETS,
                payload: {bets: [...todayGamesArray, ...tomorrowGamesArray, ...dayAfterGamesArray], loading: false}
            })
            return {success: true}
        }
        catch(e){
            throw e
        }
    }
}