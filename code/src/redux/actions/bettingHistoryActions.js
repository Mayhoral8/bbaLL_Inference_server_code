import {fbFirestoreSpigameBet} from '../../App/spigamebetFirebase'
import {structureUserGameHistory} from '../../Profilepage/function'
import moment from 'moment'
import momentTimeZone from 'moment-timezone'

export const getUserBettingHistory = (userId) => {
    return async(dispatch) => {
        if(userId){
            let date = new Date()
            let newYorkDate = momentTimeZone(date).tz("America/New_York").format('YYYY-MM-DD');
            let thisYear = moment(newYorkDate).format('YYYY')

            let userBettingHistoryTracker = await fbFirestoreSpigameBet.collection('userBettingHistoryTracker').doc(userId).collection('year').doc(thisYear).collection('month').get()
            let data=[]
            userBettingHistoryTracker.forEach((doc) => {
                const docData = doc.data()
                const docId = doc.id
                data.push({docData, docId})
            })

            let betDates = []
            let currentDate = new Date()
            let currentMonth = momentTimeZone(currentDate).tz('America/New_York').format('M')

            for (let i = 0; i < data.length; i++){
                let betDatesKeys = Object.keys(data[i].docData)
                for (let j = 0; j < betDatesKeys.length; j++){
                    let gameMonth = moment(betDatesKeys[j]).format('M')
                    if(gameMonth === currentMonth){
                        betDates.push(betDatesKeys[j])
                    }
                }
                
            }

            let bettingHistory = []
            if(betDates.length > 0){
                for (let i = 0; i < betDates.length; i++){

                    try{

                        let userBettingHistory = await fbFirestoreSpigameBet.collection('userBettingHistory').doc(userId).collection('gameDate').doc(betDates[i]).collection('gameId').get()
                        let recordsArray = []
                        userBettingHistory.forEach((doc) => {
                            const docData = doc.data()
                            const docId = doc.id
                            recordsArray.push({docData, docId})
                        })

                        for (let j = 0; j < recordsArray.length; j++){
                            bettingHistory.push(recordsArray[j].docData)
                        }
                        
                        let structuredData = structureUserGameHistory(bettingHistory); 
                        // let structuredBettingHistoryMoneyLine = structureUserGameHistory(bettingHistory)
                        // let structuredBettingHistorySpread = structureUserGameHistory(bettingHistory)
                        // let structuredBettingHistoryOverUnder = structureUserGameHistory(bettingHistory)

                    
                        // let bettingHistoryTargetObj = {
                        //     moneyLine: structuredBettingHistoryMoneyLine,
                        //     spread: structuredBettingHistorySpread,
                        //     overUnder: structuredBettingHistoryOverUnder,
                        //     isLoading: false
                        // }

                        let bettingHistoryTargetObj = {
                            data: structuredData,
                            isLoading: false
                        }
                        dispatch({
                            type: 'BettingHistory',
                            payload: bettingHistoryTargetObj
                        })
                        return {success: true}
                    }
                    catch(e){
                        throw e
                    }
                }
            }

            else{
                dispatch({
                    type: 'BettingHistory',
                    payload: {
                        data: [],
                        isLoading: false
                    }
                    // payload: {
                    //     moneyLine: [],
                    //     spread: [],
                    //     overUnder: [],
                    //     isLoading: false
                    // }
                })
                return {success: true}
            }
        }
    }
}