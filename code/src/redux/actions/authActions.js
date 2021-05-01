import {LOGIN} from './types'
import {fbFirestoreSpigameBet, firebaseInstanceSpigamebet} from '../../App/spigamebetFirebase'

export const checkUserRecordCollectionExists = (user) => {
    return async(dispatch)=>{
      try{
        let response = await fbFirestoreSpigameBet.collection('userRecords').doc(user.uid).get()
        if(!response.data()){
          fbFirestoreSpigameBet.collection('userRecords').doc(user.uid).set({
            totalPoints: 0,
            winPercentage: 0,
            rank: '-',
            displayName: user.displayName,
            emailAddress: user.email,
            level: 1
          })
        }
        dispatch({
          type: LOGIN,
          payload: {user, isLoading: false},
        })
        return {requestSuccessful: true}
      }
      catch(e){
        throw e
      }
    }
}

export const checkLoginStatus = () => {
  return async(dispatch) => {
    try{
      firebaseInstanceSpigamebet.auth().onAuthStateChanged(async(user)=>{
        if(user){
          console.log("User From Login Status Check",user)
          const {displayName,email,uid} = user
          dispatch({
            type: LOGIN,
            payload: {user: {displayName, email, uid}, isLoading: false}
          })
          return {requestSuccessful: true}
        }
        else{
          dispatch({
            type: LOGIN,
            payload: {user: {}, isLoading: false}
          })
          return {requestSuccessful: true}
        }
      })
    }
    catch(e){
      throw e
    }
  }
}

export const logoutAction = () => {
  return async(dispatch) => {
    try {
      await firebaseInstanceSpigamebet.auth().signOut()
      dispatch({
        type: LOGIN,
        payload: {user: {}, isLoading: false},
      })
      return {processed: true}
    }
    catch(e){
      throw e
    }
  }
}