import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../contexts/AuthContext';
import { fetchAdmin } from '../Actions/AdminActions';
import { Form, Card } from 'react-bootstrap';

function Profile() {
  const dispatch = useDispatch();
  const user = useAuth().currentUser;
  const admin = useSelector((state) => state.admin.admin);
  useEffect(() => {
    dispatch(fetchAdmin(user.email));
  }, [dispatch, user.email]);

  return (
    <div style={{ background: '#fff' }}>
      <h1>Admin Profile</h1>
      {user.displayName === 'ROOT' && (
        <Link to='/admin/addAdmin'>
          <Button
            variant='contained'
            color='primary'
            size='medium'
            style={{ margin: 3 }}
          >
            Add Admin
          </Button>
        </Link>
      )}
      <Link to='/admin/allcustomers'>
        <Button
          variant='contained'
          color='primary'
          size='medium'
          style={{ margin: 3 }}
        >
          View Customers
        </Button>
      </Link>
      <Card>
        <Card.Body>
          <Form noValidate autoComplete='on'>
            <Form.Group id='name'>
              <Form.Label>Admin Name</Form.Label>
              {admin.adminName && (
                <Form.Control
                  type='text'
                  value={admin.adminName}
                  autoFocus={true}
                  disabled={true}
                  required
                />
              )}
            </Form.Group>

            <Form.Group id='contact'>
              <Form.Label>Admin Contact</Form.Label>
              {admin.adminContact && (
                <Form.Control
                  type='text'
                  value={admin.adminContact}
                  disabled={true}
                  required
                />
              )}
            </Form.Group>

            <Form.Group id='email'>
              <Form.Label>
                <h5>Admin Email</h5>
              </Form.Label>
              {admin.email && (
                <Form.Control
                  type='email'
                  value={admin.email}
                  disabled={true}
                  required
                />
              )}
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
