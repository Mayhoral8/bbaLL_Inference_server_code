const initialState = {
  stats: {
      isLoading: true,
      stats: null
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "Stats":
      return {
        ...state,
        stats: action.payload
      }
    default:
      return state;
  }
}