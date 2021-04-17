import React, { useRef, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Col } from 'react-bootstrap';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Row } from 'react-bootstrap';
import { addUser, clearUser } from '../Actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import hist from '../Theatre/hist';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function Welcome() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const error = useSelector((state) => state.user.error);
  const getUser = useSelector((state) => state.user.user);

  const checkEmail = () => {
    if (error === '' && getUser) {
      dispatch(clearUser());
      hist('/login');
    }
    emailRef.current.focus();
  };

  useEffect(() => {
    console.log(typeof getUser.email);
    if (getUser.email === email) {
      hist.push('/sign/login');
    }
  }, [getUser, email]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      address: address,
      customerName: name,
      email: email,
      mobileNo: mobile,
      password: password,
    };
    await dispatch(addUser(user));
    checkEmail();
  };
  return (
    <div>
      <div
        style={{
          padding: 16,

          backgroundColor: '#fff',
        }}
      >
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Typography variant='h4' align='center' component='h1' gutterBottom>
            Register Here!
          </Typography>
          <Typography paragraph>
            Your not new? You know what to do to watch a movie:
            <Link to='/login'>Click me!!</Link>
          </Typography>
          <center>
            <Row style={{ margin: 5 }}>
              <TextField
                variant='outlined'
                required
                autoFocus={true}
                type='small'
                style={{ width: 155 }}
                inputRef={nameRef}
                label='Name'
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Row>
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
                type='small'
                style={{ width: 155 }}
                inputRef={addressRef}
                label='Address'
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </Row>
            <Row style={{ margin: 5 }}>
              <TextField
                variant='outlined'
                required
                type='small'
                style={{ width: 155 }}
                inputRef={mobileRef}
                label='Mobile'
                onChange={(e) => {
                  setMobile(e.target.value);
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
            <br />

            <Button color='primary' variant='contained' type='submit'>
              Submit
            </Button>
          </center>
        </form>
      </div>
      {error && (
        <Col>
          <Alert severity='error'>{error}</Alert>
        </Col>
      )}
    </div>
  );
}

export default Welcome;
