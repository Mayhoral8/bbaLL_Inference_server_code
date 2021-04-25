import {LOGIN} from './types'
import {fbFirestoreSpigameBet} from '../../App/spigamebetFirebase'

export const LoginAction = (user) => {
    return async(dispatch)=>{
      fbFirestoreSpigameBet.collection('userRecords').doc(user.uid).get()
      .then(async(doc)=>{
        if(!doc.data()){
          fbFirestoreSpigameBet.collection('userRecords').doc(user.uid).set({
            totalPoints:0,
            winPercentage:0,
            rank:'',
            displayName: user.displayName,
            emailAddress: user.email
          })
        }
        dispatch({
          type: LOGIN,
          payload: {user, isLoading: false},
        })
      })
      .catch((e)=>{
        throw e
      })
    }
}