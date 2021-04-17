import Axios from 'axios';
import { error } from 'jquery';

export const fetchScreens = () => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_SCREEN' });

  try {
    const response = await Axios.get('http://localhost:8082/screen/').catch(
      function (error) {
        throw new Error(error.response.data.message);
      }
    );

    if (response.status !== 200) {
      throw new error(response.status);
    }
    dispatch({
      type: 'FETCH_SCREENS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_SCREEN', error: error });
  }
};

export const deleteScreenByID = (id) => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_SCREEN' });
  try {
    const response = await Axios.delete(
      'http://localhost:8082/screen/id/' + id
    ).catch(function (error) {
      throw new Error(error.response.data.message);
    });
    dispatch({
      type: 'DELETE_SCREEN',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_SCREEN', error: error });
  }
};

export const detailScreen = (id) => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_SCREEN' });
  try {
    const response = await Axios.get(
      'http://localhost:8082/screen/' + id
    ).catch(function (error) {
      throw new Error(error.response.data.message);
    });

    dispatch({
      type: 'DETAIL_SCREEN',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_SCREEN', error: error });
  }
};

export const updateScreen = (screen) => async (dispatch, getState) => {
  try {
    const response = await Axios({
      method: 'put',
      url: 'http://localhost:8082/screen/',
      headers: {},
      data: {
        screenId: screen.screenId,
        screenName: screen.screenName,
        rows: screen.rows,
        columns: screen.columns,
      },
    }).catch(function (error) {
      throw new Error(error.response.data.message);
    });
    dispatch({
      type: 'UPDATE_SCREEN',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_SCREEN', error: error });
  }
};

export const addScreen = (screen) => async (dispatch, getState) => {
  try {
    const response = await Axios({
      method: 'post',
      url: 'http://localhost:8082/screen/',
      headers: {},
      data: {
        theatreId: screen.theatreId,
        screenName: screen.screenName,
        rows: screen.rows,
        columns: screen.columns,
      },
    }).catch(function (error) {
      throw new Error(error.response.data.message);
    });

    dispatch({
      type: 'ADD_SCREEN',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_SCREEN', error: error });
  }
};
