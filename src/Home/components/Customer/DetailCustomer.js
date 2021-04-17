//Imports
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { fetchCustomerByEmail } from '../Actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import hist from '../Theatre/hist';
import firebase from 'firebase';
require('firebase/auth');

function DetailCustomer() {
  var user = useAuth().currentUser;
  const [error, setError] = useState('');
  const history = useHistory();
  var { logout, deleteUser } = useAuth();
  const customer = useSelector((state) => state.user.customer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomerByEmail(user.email));
  }, [dispatch, user.email]);

  async function handleLogout() {
    setError('');
    try {
      await logout();
      history.push('/');
    } catch {
      setError('Failed to log out');
    }
  }
  async function deleteU() {
    setError('');
    //Verify the User
    var user = firebase.auth().currentUser;
    var password = prompt('Enter Password To Confirm');
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    // Prompt the user to re-provide their sign-in credentials

    user
      .reauthenticateWithCredential(credential)
      .then(async function () {
        // User re-authenticated.
        await deleteUser();
        history.push('/');
      })
      .catch(function (error) {
        // An error happened.
        setError('Failed to log out');
        return alert(error);
      });
  }

  const tryAuth = () => {
    var user = firebase.auth().currentUser;
    var password = prompt('Enter Password To Confirm');
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    // Prompt the user to re-provide their sign-in credentials
    user
      .reauthenticateWithCredential(credential)
      .then(function () {
        // User re-authenticated.
        hist.push('/customer/detail/edit/');
      })
      .catch(function (error) {
        // An error happened.
        return alert(error);
      });
  };

  return (
    <div>
      <form>
        <h3>Profile Details:</h3>
        {customer && customer.email && (
          <div style={{ margin: '30px', padding: '30px' }}>
            <TextField
              label='Email:'
              value={customer.email}
              fullWidth={true}
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label='Name:'
              value={customer.customerName}
              fullWidth={true}
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label='Mobile:'
              value={customer.mobileNo}
              fullWidth={true}
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label='Address:'
              value={customer.address}
              fullWidth={true}
              style={{ marginBottom: '10px' }}
            />
            {error && error}
            <Button
              variant='contained'
              onClick={() => {
                tryAuth();
              }}
              color='primary'
              style={{ margin: '10px' }}
            >
              Edit
            </Button>
            <Button
              variant='contained'
              onClick={deleteU}
              color='secondary'
              style={{ margin: '10px' }}
            >
              Delete
            </Button>
            <Button variant='contained' color='primary' onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default DetailCustomer;
