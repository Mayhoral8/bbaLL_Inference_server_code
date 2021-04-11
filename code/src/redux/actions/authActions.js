import {LOGIN} from './types'
import {fbFirestoreSpigameBet} from '../../App/spigamebetFirebase'

export const LoginAction = (userDetails) => {
    return async(dispatch)=>{
      fbFirestoreSpigameBet.collection('userRecords').doc(userDetails.uid).get()
      .then(async(doc)=>{
        if(!doc.data()){
          fbFirestoreSpigameBet.collection('userRecords').doc(userDetails.uid).set({
            totalPoints:'',
            winPercentage:'',
            rank:''
          })
        }
        dispatch({
          type: LOGIN,
          payload: userDetails,
        })
      })
      .catch((e)=>{
        throw e
      })
    }
}