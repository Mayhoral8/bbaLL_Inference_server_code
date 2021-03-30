import { GET_FUTURE_GAMES_INFO } from "../actions/types"

const initialState = {
  futureGamesInfo: []
}

const betsReducer=(state=initialState, action) => {
  switch (action.type) {
    case GET_FUTURE_GAMES_INFO:
      return { ...state, futureGamesInfo: action.payload }
    default:
      return state
  }
};
export default betsReducer
