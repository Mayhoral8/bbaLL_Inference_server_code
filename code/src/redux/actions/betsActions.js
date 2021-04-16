import {fbFirestore} from '../../App/config'
import {fbFirestoreSpigameBet} from '../../App/spigamebetFirebase'
import firebase from 'firebase'
import {GET_FUTURE_GAMES_INFO, GETUSERBETS} from './types'
import moment from 'moment'
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
        keys.map((gameId,i)=>{
            let gameDate = selectedValues[`${gameId}`].gameDetails.gameDate ? selectedValues[`${gameId}`].gameDetails.gameDate : ''
            
            fbFirestoreSpigameBet.collection('userBets').doc(userId).collection('gameDates').doc(gameDate).set(selectedValues)
            .then((res)=>{
                return
            })
            .catch((e)=>{
                throw e
            })
        })
    }
}
export const getUserBets = (userId) => {
    // console.log(userId)
    return async(dispatch) => {
        let date = new Date
        console.log(date)
        let today = moment(date).format('YYYY-MM-DD')
        fbFirestoreSpigameBet.collection('userBets').doc(userId).collection('gameDates').doc(today).get()
        .then((doc)=>{
            console.log(doc.exists)
            // console.log("DOCS: ", doc.docs.data())
            // doc.docs.map((el, index)=>{
            //     console.log(el.data())
            // })
            // dispatch({
            //     type: GETUSERBETS,
            //     payload: docs.data()
            // })
        })
        .catch((e)=>{
            console.log(e)
        })
    }
}