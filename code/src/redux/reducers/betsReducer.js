import { GET_FUTURE_GAMES_INFO, GETUSERBETS, SET_STRUCTURED_GAME_INFO } from "../actions/types"

const initialState = {
  futureGamesInfo: {
    games: [],
    isLoading: true
  },
  structuredGameInfo: [],
  userBetsDetails:{
    loading: true,
    bets: []
  }
}

const betsReducer = (state=initialState, action) => {
  switch (action.type) {

    case GET_FUTURE_GAMES_INFO:
      return { ...state, futureGamesInfo: action.payload }

    case GETUSERBETS:
      return { ...state, userBetsDetails: action.payload }

    case SET_STRUCTURED_GAME_INFO:
      return { ...state, structuredGameInfo: action.payload }

    default:
      return state

  }
};
export default betsReducer
