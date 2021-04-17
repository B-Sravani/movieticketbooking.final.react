const initStat = {
  screens: [],
  loading: false,
  error: null,
  screen: {},
};

const ScreenReducer = (state = initStat, action) => {
  switch (action.type) {
    case 'LOADING_SCREEN':
      return {
        ...state,
        loading: true,
        error: '',
      };
    case 'FETCH_SCREENS':
      return {
        ...state,
        screens: action.payload,
        loading: false,
        error: null,
      };

    case 'DELETE_SCREEN':
      return {
        ...state,
        screen: action.payload,
        loading: false,
        error: null,
      };

    case 'UPDATE_SCREEN':
      return {
        ...state,
        screen: action.payload,
        loading: false,
        error: null,
      };

    case 'DETAIL_SCREEN':
      return {
        ...state,
        screen: action.payload,
        loading: false,
        error: null,
      };

    case 'ADD_SCREEN':
      return {
        ...state,
        screen: action.payload,
        loading: false,
        error: null,
      };

    case 'ERROR_SCREEN':
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };

    default:
      return state;
  }
};
export default ScreenReducer;
