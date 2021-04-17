/*eslint-disable*/
import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
// react Home/components for routing our app without refresh
import { Link, useHistory } from 'react-router-dom';

// @material-ui/core Home/components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '@material-ui/core/Button';
// @material-ui/icons
import { Apps, CloudDownload } from '@material-ui/icons';

// core Home/components
import CustomDropdown from 'Home/components/CustomDropdown/CustomDropdown.js';
import styles from 'assets/jss/material-kit-react/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  var user = useAuth().currentUser;
  const history = useHistory();
  async function handleLogout() {
    setError('');
    try {
      await logout();
      history.push('/');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem} style={{ marginTop: '5px' }}>
        <Link to='/customer/tickets/' className={classes.dropdownLink}>
          Tickets
        </Link>
      </ListItem>
      <ListItem className={classes.listItem} style={{ marginTop: '5px' }}>
        <Link to='/customer/contactus/' className={classes.dropdownLink}>
          Contact Us
        </Link>
      </ListItem>

      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText='Profile'
          buttonProps={{
            className: classes.navLink,
            color: 'transparent',
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to={'/customer/detail/'} className={classes.dropdownLink}>
              Profile Details
            </Link>,

            <Link
              to='/customer/'
              className={classes.dropdownLink}
              onClick={handleLogout}
            >
              Log out
            </Link>,
          ]}
        />
      </ListItem>
    </List>
  );
}
