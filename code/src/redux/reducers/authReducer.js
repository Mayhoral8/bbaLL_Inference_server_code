import {LOGIN} from '../actions/types'
const initialState={
    userDetails:null
}
const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case LOGIN:
            return {...state, userDetails:action.payload}
        default:
            return state
    }
}
export default authReducer