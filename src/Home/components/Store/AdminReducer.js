const initStat = {
  admins: [],
  loading: false,
  error: null,
  admin: {},
};

const ScreenReducer = (state = initStat, action) => {
  switch (action.type) {
    case 'LOADING_ADMIN':
      return {
        ...state,
        loading: true,
        error: '',
      };
    case 'FETCH_ADMIN':
      return {
        ...state,
        admin: action.payload,
        loading: false,
        error: null,
      };

    case 'ADD_ADMIN':
      return {
        ...state,
        admin: action.payload,
        loading: false,
        error: null,
      };

    case 'ERROR_ADMIN':
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
