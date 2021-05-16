import {fbFirestoreSpigameBet, firebaseInstanceSpigamebet} from '../../App/spigamebetFirebase'
import moment from 'moment'
import momentTimeZone from 'moment-timezone'

export const getUserBettingHistory = (userId) => {
    return async(dispatch) => {

        let date = new Date()
        let newYorkDate = momentTimeZone(date).tz("America/New_York").format('YYYY-MM-DD');
        let thisYear = moment(newYorkDate).format('YYYY')

        let userBettingHistory = await fbFirestoreSpigameBet.collection('userBettingHistoryTracker').doc(userId).collection('year').doc(thisYear).collection('month').get()
        let data=[]
        userBettingHistory.forEach((doc) => {
            const docData = doc.data()
            const docId = doc.id
            data.push({docData, docId})
        })
        let gameDates = []
        for (let i = 0; i < data.length; i++){
            let gameDateKey = Object.keys(data[i].docData)
            gameDates.push(gameDateKey)
        }
        console.log(gameDates)
        // let abc = await fbFirestoreSpigameBet.collection('userBettingHistory').doc(userId).collection('gameDate').doc('2021-05-14').collection('gameId').get()
        // let test = []
        // abc.forEach((doc) => {
        //     const docData = doc.data()
        //     const docId = doc.id
        //     test.push({docData, docId})
        // })
        // console.log(test)
    }
}