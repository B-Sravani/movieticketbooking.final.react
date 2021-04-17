//Imports
import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerByEmail, updateCustomer } from '../Actions/UserActions';
import { Button } from '@material-ui/core';
import hist from '../Theatre/hist';

function UpdateDetails() {
  var user = useAuth().currentUser;
  const customer = useSelector((state) => state.user.customer);
  const dispatch = useDispatch();
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  useEffect(() => {
    dispatch(fetchCustomerByEmail(user.email));
  }, [dispatch, user.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customer) {
      var customerObj = {
        address: addressRef.current.value,
        customerId: customer.customerId,
        customerName: nameRef.current.value,
        mobileNo: phoneRef.current.value,
      };
      dispatch(updateCustomer(customerObj));
      hist.push('/customer/detail/');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Profile Details:</h3>
        <div style={{ margin: '30px', padding: '30px' }}>
          <TextField
            label='Name:'
            fullWidth={true}
            style={{ marginBottom: '10px' }}
            inputRef={nameRef}
          />
          <TextField
            label='Mobile:'
            fullWidth={true}
            style={{ marginBottom: '10px' }}
            inputRef={phoneRef}
          />
          <TextField
            label='Address:'
            fullWidth={true}
            style={{ marginBottom: '10px' }}
            inputRef={addressRef}
          />
        </div>
        <Button type='submit' variant='contained' color='primary'>
          Update
        </Button>
      </form>
    </div>
  );
}

export default UpdateDetails;
