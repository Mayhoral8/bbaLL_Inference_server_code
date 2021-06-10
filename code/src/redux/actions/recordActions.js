import {fbFirestoreSpigameBet} from '../../App/spigamebetFirebase'

export const getUserRecord = (userId) => {
    return async(dispatch) => {
        try{
            let recordResponse = await fbFirestoreSpigameBet.collection('userRecords').doc(userId).get()
            dispatch({
                type: 'GetUserRecord',
                payload: recordResponse.data()
            })
        }
        catch(e){
            throw e
        }
    }
}