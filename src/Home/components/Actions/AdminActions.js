import Axios from 'axios';

export const fetchAdmin = (email) => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_ADMIN' });
  try {
    const response = await Axios.get(
      'http://localhost:8082/admin/email/' + email
    ).catch(function (error) {
      throw new Error(error.response.data.message);
    });

    dispatch({
      type: 'FETCH_ADMIN',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_ADMIN', error: error });
  }
};

export const addAdmin = (admin) => async (dispatch, getState) => {
  try {
    const response = await Axios({
      method: 'post',
      url: 'http://localhost:8082/admin/addadmin',
      headers: {},
      data: {
        adminName: admin.adminName,
        adminContact: admin.adminContact,
        email: admin.email,
        password: admin.password,
      },
    }).catch(function (error) {
      throw new Error(error.response.data.message);
    });

    dispatch({
      type: 'ADD_ADMIN',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR_ADMIN', error: error });
  }
};
