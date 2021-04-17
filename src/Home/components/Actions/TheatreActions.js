import Axios from 'axios';
import { error } from 'jquery';

export const updateTheatre = (theatre) => async (dispatch, getState) => {
  try {
    const response = await Axios({
      method: 'put',
      url: 'http://localhost:8082/theatre/',
      headers: {},
      data: {
        theatreId: theatre.theatreId,
        theatreName: theatre.theatreName,
        theatreCity: theatre.theatreCity,
        managerName: theatre.managerName,
        managerContact: theatre.managerContact,
      },
    }).catch(function (error) {
      throw new Error(error.response.data.message);
    });
    dispatch({
      type: 'UPDATE_THEATRE',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_THEATRES', error: error });
  }
};

export const fetchTheatre = () => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_THEATRE' });
  try {
    const response = await Axios.get('http://localhost:8082/theatre/').catch(
      function (error) {
        throw new Error(error.response.data.message);
      }
    );
    if (response.status !== 200) {
      throw new error(response.status);
    }
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
    const response = await Axios.get(
      'http://localhost:8082/theatre/' + id
    ).catch(function (error) {
      throw new Error(error.response.data.message);
    });

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
    ).catch(function (error) {
      throw new Error(error.response.data.message);
    });
    dispatch({
      type: 'DELETE_THEATRE',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_THEATRES', error: error });
  }
};

export const addTheatre = (theatre) => async (dispatch, getState) => {
  try {
    const response = await Axios({
      method: 'post',
      url: 'http://localhost:8082/theatre/',
      headers: {},
      data: {
        theatreName: theatre.theatreName,
        theatreCity: theatre.theatreCity,
        managerName: theatre.managerName,
        managerContact: theatre.managerContact,
        listOfMovies: theatre.movieArr,
        listOfScreens: theatre.screens,
      },
    }).catch(function (error) {
      throw new Error(error.response.data.message);
    });

    dispatch({
      type: 'ADD_THEATRE',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_THEATRES', error: error });
  }
};
