import Axios from 'axios';

export const fetchTheatre = () => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_THEATRE' });
  try {
    const response = await Axios.get('http://localhost:8082/theatre/');
    dispatch({
      type: 'FETCH_THEATRES',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_THEATRES', error: error });
  }
};

export const detailTheatre = (id) => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_THEATRE' });
  try {
    const response = await Axios.get('http://localhost:8082/theatre/' + id);
    dispatch({
      type: 'DETAIL_THEATRE',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_THEATRES', error: error });
  }
};

export const deleteTheatreByID = (id) => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_THEATRE' });
  try {
    const response = await Axios.delete(
      'http://localhost:8082/theatre/id/' + id
    );
    dispatch({
      type: 'DELETE_THEATRE',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_THEATRES', error: error });
  }
};
