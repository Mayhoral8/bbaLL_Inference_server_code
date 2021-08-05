const initialState = {
    rankings: {isLoading: true, rankings: []}
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'PlayerRankings':
        console.log('SETTING');
        return { ...state, rankings: action.payload };
      default:
        return state;
    }
  };