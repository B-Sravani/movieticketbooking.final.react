import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../Actions/UserActions';
import hist from '../Theatre/hist';
import MuiAlert from '@material-ui/lab/Alert';
import { Col } from 'react-bootstrap';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const getUser = useSelector((state) => state.user.user);
  const getError = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (password === getUser.password && email === getUser.email) {
      if (getUser.role === 'CUSTOMER') {
        hist.push('/customer');
      }
      if (getUser.role === 'ADMIN') {
        hist.push('/admin');
      }
    }
  }, [dispatch, getUser, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userObject = {
      email: email,
      password: password,
    };

    await dispatch(fetchUser(userObject, password));
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <center>
          <Row style={{ margin: 5 }}>
            <TextField
              variant='outlined'
              required
              type='small'
              style={{ width: 155 }}
              inputRef={emailRef}
              label='Email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Row>
          <Row style={{ margin: 5 }}>
            <TextField
              variant='outlined'
              required
              style={{ width: 155 }}
              inputRef={passwordRef}
              label='Password'
              type='password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Row>
          <Button color='primary' variant='contained' type='submit'>
            Sign in
          </Button>
        </center>
      </form>
      {getError && (
        <Col>
          <Alert severity='error'>{getError}</Alert>
        </Col>
      )}
    </div>
  );
}

export default Signin;
