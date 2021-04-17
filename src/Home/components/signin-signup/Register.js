//Imports
import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { addCustomer } from '../Actions/UserActions';
import { useDispatch } from 'react-redux';
import './StylesSheet.css';


export default function Signup() {
//reference to the dispatch function from the Redux store(dispatch actions as needed(hook))
  const dispatch = useDispatch();
//returns a mutable ref object whose .current property is initialized to initialValue
  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  //useState: Set or retrive the state(Returns a stateful value, and a function to update it)
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    //Validations
    if (
      !(
        /[A-Z]/.test(passwordRef.current.value) &&
        /[0-9]/.test(passwordRef.current.value) &&
        /^[@#][A-Za-z0-9]{7,13}$/.test(passwordRef.current.value)
      )
    ) {
      return setError('Passwords does not follow the pattern');
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    //Setting the data
    try {
      const customer = {
        address: addressRef.current.value,
        customerName: nameRef.current.value,
        email: emailRef.current.value,
        mobileNo: mobileRef.current.value,
        password: passwordRef.current.value,
      };
      setError('');
      setLoading(true);
      //Signup:(Admin or Customer)
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        'CUSTOMER'
      );
      //Add the customer
      await dispatch(addCustomer(customer));
      history.push('/');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }
  
  return (
    <div>
      <Card bg='dark' text='light' id='card' className='cardSignUp'>
        <Card.Body>
          <h3 className='text-center mb-4'>
            Join to wander in a world of imagination!
          </h3>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' ref={nameRef} required />
            </Form.Group>
            <Form.Group id='email' controlId='formPlaintextEmail' patter='^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
              <Form.Text muted>
                Your email id should be of the format: example@mailid.com
              </Form.Text>
            </Form.Group>
            <Form.Group id='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control type='text' ref={addressRef} required />
            </Form.Group>
            <Form.Group id='mobile'>
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type='text'
                ref={mobileRef}
                pattern='^\d{3}-\d{3}-\d{4}$'
                required
              />
              <Form.Text muted>
                Your mobile no should be of the format: xxx-xxx-xxxx
              </Form.Text>
            </Form.Group>
            <Form.Group
              id='password'
              required
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
              <Form.Text muted>
                Your password should:Start with a special character,8 to 13
                characters,1 uppercase letter,1 number
              </Form.Text>
            </Form.Group>
            <Form.Group
              id='password-confirm'
              pattern='^([@#](?=[^aeiou]{7,13}$)(?=[[:alnum:]]{7,13}$)(?=.[A-Z]{1,}.$).+)$'
              required
            >
              <Form.Label>Confirm password</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-100' type='submit'>
              Let's go
            </Button>
          </Form>
          <div className='w-100 text-center mt-2'>
            Already have an account? <Link to='/'>Log In</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
