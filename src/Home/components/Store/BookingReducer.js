const initStat = {
  location: [],
  loading: false,
  error: null,
  theatres: [],
  show: {},
};
const BookingReducer = (state = initStat, action) => {
  switch (action.type) {
    case 'LOADING_BOOKING':
      return {
        ...state,
        loading: true,
        error: '',
      };

    case 'FETCH_BOOKING':
      return {
        ...state,
        loading: false,
        location: action.payload,
        error: '',
      };

    case 'FETCH_THEATRES':
      return {
        ...state,
        loading: false,
        theatres: action.payload,
        error: '',
      };

    case 'ADD_BOOKING':
      return {
        ...state,
        loading: false,
        customer: action.payload,
        error: '',
      };

    case 'ADD_FEEDBACK':
      return {
        ...state,
        loading: false,
        error: '',
      };

    case 'ERROR_BOOKING':
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };

    default:
      return state;
  }
};
export default BookingReducer;
