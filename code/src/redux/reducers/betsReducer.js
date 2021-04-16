import { GET_FUTURE_GAMES_INFO, GETUSERBETS } from "../actions/types"

const initialState = {
  futureGamesInfo: [],
  userBets:[]
}

const betsReducer=(state=initialState, action) => {
  switch (action.type) {
    case GET_FUTURE_GAMES_INFO:
      return { ...state, futureGamesInfo: action.payload }
    case GETUSERBETS:
      return { ...state, userBets: action.payload }
    default:
      return state
  }
};
export default betsReducer
