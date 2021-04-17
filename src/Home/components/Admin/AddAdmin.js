import React, { useState } from 'react';

import MuiAlert from '@material-ui/lab/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Form, Card, InputGroup, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addAdmin } from '../Actions/AdminActions';
import { useAuth } from '../../../contexts/AuthContext';
const eye = <FontAwesomeIcon icon={faEye} />;

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function AddAdmin() {
  const adminNameRef = React.useRef();
  const dispatch = useDispatch();
  const adminContactRef = React.useRef();

  const adminEmailRef = React.useRef();

  const adminPasswordRef = React.useRef();

  const adminPasswordConfirmRef = React.useRef();
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const [visibleC, setVisibleC] = useState(false);
  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (adminNameRef.current.value === '') {
      adminNameRef.current.focus();
      return setError('Enter Name');
    }
    if (adminContactRef.current.value === '') {
      adminContactRef.current.focus();
      return setError('Enter Contact');
    }
    if (adminEmailRef.current.value === '') {
      adminEmailRef.current.focus();
      return setError('Enter Email');
    }
    if (adminPasswordRef.current.value === '') {
      adminPasswordRef.current.focus();
      return setError('Enter Password');
    }
    if (adminPasswordConfirmRef.current.value === '') {
      adminPasswordConfirmRef.current.focus();
      return setError('Enter Password');
    }

    if (
      adminPasswordRef.current.value !== adminPasswordConfirmRef.current.value
    ) {
      adminPasswordConfirmRef.current.focus();
      return setError(<p>Password Doesn't Match</p>);
    }
    const admin = {
      adminName: adminNameRef.current.value,
      adminContact: adminContactRef.current.value,
      email: adminEmailRef.current.value,
      password: adminPasswordRef.current.value,
    };
    console.log(adminEmailRef.current.value, adminPasswordRef.current.value);
    setError('');
    try {
      dispatch(addAdmin(admin));
      await signup(
        adminEmailRef.current.value,
        adminPasswordRef.current.value,
        'ADMIN'
      );
    } catch (error) {
      setError('Failed to create an account');
    }
  }
  return (
    <div style={{ padding: 3, width: '40%', margin: '0 auto' }}>
      <Card>
        <Card.Body>
          <h5>Enter Details:</h5>
          {error && (
            <Alert severity='error' style={{ margin: 4 }}>
              {error}
            </Alert>
          )}
          <Form
            noValidate
            autoComplete='on'
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group id='name'>
              <Form.Label>Admin Name</Form.Label>
              <Form.Control
                type='text'
                ref={adminNameRef}
                autoFocus={true}
                required
              />
            </Form.Group>

            <Form.Group id='contact'>
              <Form.Label>Admin Contact</Form.Label>
              <Form.Control type='text' ref={adminContactRef} required />
            </Form.Group>

            <Form.Group id='email'>
              <Form.Label>
                <h5>Admin Email</h5>
              </Form.Label>
              <Form.Control type='email' ref={adminEmailRef} required />
            </Form.Group>

            <Form.Group md='4'>
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={visible ? 'text' : 'password'}
                  ref={adminPasswordRef}
                  required
                />
                <InputGroup.Append>
                  <Button
                    onClick={() => {
                      setVisible(!visible);
                    }}
                    style={{ width: '25px', padding: 0 }}
                    variant='filled-primary'
                  >
                    {eye}
                  </Button>
                </InputGroup.Append>
                <Form.Control.Feedback type='invalid'>
                  Please enter password
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group md='4'>
              <Form.Label>Password Confirm</Form.Label>

              <InputGroup>
                <Form.Control
                  type={visibleC ? 'text' : 'password'}
                  ref={adminPasswordConfirmRef}
                  required
                />
                <InputGroup.Append>
                  <Button
                    onClick={() => {
                      setVisibleC(!visibleC);
                    }}
                    style={{ width: '25px', padding: 0 }}
                    variant='filled-primary'
                  >
                    {eye}
                  </Button>
                </InputGroup.Append>
                <Form.Control.Feedback type='invalid'>
                  Please enter password
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <br />
            <Button type='Submit' variant='primary'>
              Add
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddAdmin;
