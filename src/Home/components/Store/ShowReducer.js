const initStat = {
  shows: [],
  loading: false,
  error: null,
  show: {},
  imageShow: [],
};
const MovieReducer = (state = initStat, action) => {
  switch (action.type) {
    case 'LOADING_SHOW':
      return {
        ...state,
        loading: true,
        error: '',
      };
    case 'FETCH_SHOWS':
      return {
        ...state,
        shows: action.payload,
        loading: false,
        error: null,
      };

    case 'FETCH_SHOWID':
      return {
        ...state,
        loading: false,
        show: action.payload,
        error: '',
      };

    case 'FETCH_SHOWSID_IMAGE':
      return {
        ...state,
        loading: false,
        shows: action.payload,
        error: '',
      };

    case 'ERROR_SHOW':
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };

    default:
      return state;
  }
};
export default MovieReducer;
