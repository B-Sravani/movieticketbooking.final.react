import Axios from 'axios';
import { error } from 'jquery';

export const fetchTheatreByCity = () => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_BOOKING' });
  try {
    const response = await Axios.get(
      'http://localhost:8082/theatre/allCity/'
    ).catch(function (error) {
      throw new Error(error.response.data.message);
    });
    if (response.status !== 200) {
      throw new error(response.status);
    }
    dispatch({
      type: 'FETCH_BOOKING',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_BOOKING', error: error });
  }
};

export const fetchTheatresInCity = (city) => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_BOOKING' });
  try {
    const response = await Axios.get(
      'http://localhost:8082/theatre/city/' + city
    ).catch(function (error) {
      throw new Error(error.response.data.message);
    });
    if (response.status !== 200) {
      throw new error(response.status);
    }
    dispatch({
      type: 'FETCH_THEATRES',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_BOOKING', error: error });
  }
};

export const bookingTicket = (customerId, ticketBook) => async (
  dispatch,
  getState
) => {
  try {
    const response = await Axios({
      method: 'post',
      url: 'http://localhost:8082/customer/addCustomerTicket/' + customerId,
      headers: {},
      data: {
        showId: ticketBook.showId,
        ticket: ticketBook.ticket,
        totalCost: ticketBook.totalCost,
        transactionMode: ticketBook.transactionMode,
      },
    }).catch(function (error) {
      throw new Error(error.response.data.message);
    });
    dispatch({
      type: 'ADD_BOOKING',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_BOOKING', error: error });
  }
};

export const cancelTicket = (customerId, ticketid) => async (
  dispatch,
  getState
) => {
  try {
    const response = await Axios({
      method: 'delete',
      url:
        'http://localhost:8082/Booking/delete/' + customerId + '/' + ticketid,
      headers: {},
    }).catch(function (error) {
      throw new Error(error.response.data.message);
    });
    dispatch({
      type: 'CANCEL_BOOKING',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_BOOKING', error: error });
  }
};

export const addFeedback = (feedback) => async (dispatch, getState) => {
  try {
    const response = await Axios({
      method: 'post',
      url: 'http://localhost:8082/feedback/add',
      headers: {},
      data: {
        custId: feedback.custId,
        rating: feedback.rating,
        feedback: feedback.feedback,
      },
    }).catch(function (error) {
      throw new Error(error.response.data.message);
    });
    dispatch({
      type: 'ADD_FEEDBACK',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_BOOKING', error: error });
  }
};
