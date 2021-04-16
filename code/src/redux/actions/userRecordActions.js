import {fbFirestoreSpigameBet} from '../../App/spigamebetFirebase'
import {GETUSERRECORD} from './types'

export const getUserRecord = (userId) => {
    return async(dispatch) => {
        return fbFirestoreSpigameBet.collection('userRecords').doc(userId).get()
        .then((doc)=>{
            console.log(doc.data())
            dispatch({
                type: GETUSERRECORD,
                payload: doc.data()
            })
        })
        .catch((e)=>{
            throw e
        })
    }
}