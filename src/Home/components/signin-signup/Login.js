import React, { useRef, useState } from 'react';
import { Form, Card, Alert } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { fetchUser } from '../Actions/UserActions';
import { useDispatch } from 'react-redux';

export default function Login() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      dispatch(fetchUser(emailRef.current.value));
      history.push('/dashboard');
    } catch {
      setError('Incorect credentials');
    }

    setLoading(false);
  }

  return (
    <div>
      <Card bg='dark' text='light'>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>
                <h5>Email</h5>
              </Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>
                <h5>Password</h5>
              </Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Button
              disabled={loading}
              fullWidth={true}
              color='primary'
              variant='contained'
              type='submit'
            >
              Log In
            </Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/forgot-password'>Forgot Password?</Link>
          </div>
          <div className='w-100 text-center mt-2'>
            Need an account? <Link to='/signup'>Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
