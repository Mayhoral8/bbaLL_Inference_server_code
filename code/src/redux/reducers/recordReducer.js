const initialState={
    userRecord: {}
}

const recordReducer = (state = initialState, action) =>{
    switch (action.type){
        case "GetUserRecord":
            return { ...state, userRecord:action.payload }
        default:
            return state
    }
}

export default recordReducer