import Axios from 'axios';
import { error } from 'jquery';

export const fetchShows = () => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_SHOW' });
  try {
    const response = await Axios.get('http://localhost:8082/show');
    dispatch({
      type: 'FETCH_SHOWS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_SHOW', error: error });
  }
};

export const fetchShowById = (id) => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_SHOW' });

  try {
    const response = await Axios.get(
      'http://localhost:8082/show/id/' + id
    ).catch(function (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    });
    if (response.status !== 200) {
      throw new error(response.status);
    }

    dispatch({
      type: 'FETCH_SHOWID',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_SHOW', error: error });
  }
};

export const fetchShowForImage = (shows) => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_SHOW' });

  try {
    var response = null;
    var showsArr = [];
    shows.map(async (show) => {
      response = await Axios.get('http://localhost:8082/show/id/' + show).catch(
        function (error) {
          console.log(error);
          throw new Error(error.response.data.message);
        }
      );
      if (response.status !== 200) {
        throw new error(response.status);
      }

      showsArr.push(response.data);

      if (showsArr.length === shows.length) {
        dispatch({
          type: 'FETCH_SHOWSID_IMAGE',
          payload: showsArr,
        });
      }
    });
  } catch (error) {
    dispatch({ type: 'ERROR_SHOW', error: error });
  }
};
