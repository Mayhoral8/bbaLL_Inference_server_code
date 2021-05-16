const initialState={
    userBettingHistoryApi: [],
    userBettingHistoryStuctured: []
}
const userBettingHistoryReducer = (state = initialState, action) => {
    switch(action.type){
        case 'UserBettingHistory':
            return {...state, userBettingHistoryApi: action.payload}
        default:
            return state
    }
}
export default userBettingHistoryReducer