import {LOGIN} from './types'

export const LoginAction = (userDetails) => {
    return async(dispatch)=>{
      dispatch({
        type: LOGIN,
        payload: userDetails,
      })
    }
}