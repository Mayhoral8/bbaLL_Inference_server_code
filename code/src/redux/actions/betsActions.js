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
    return (dispatch) => {
        dispatch({
            type: SET_STRUCTURED_GAME_INFO,
            payload:data
        })
    }
}

export const submitBetPoints=(selectedValues, userId)=>{
    return async(dispatch) => {
        let error = {}
        let keys = Object.keys(selectedValues)
        for (let i = 0; i < keys.length; i++){
            let gameDate = selectedValues[`${keys[i]}`].gameDetails.gameDate ? selectedValues[`${keys[i]}`].gameDetails.gameDate : ''
            try{
                await fbFirestoreSpigameBet.collection('userBets').doc(userId).collection('gameDates').doc(gameDate).collection('games').doc(keys[i]).set(selectedValues[keys[i]])
            }
            catch(e){
                error.isError = true
                error.status = e.status
                error.message = e.message
                break
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
            let collection = await fbFirestoreSpigameBet.collection('userBets').doc(userId).collection('gameDates').doc(today).collection('games').get()
            let data=[]
            collection.forEach((doc) => {
                const docData=doc.data()
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