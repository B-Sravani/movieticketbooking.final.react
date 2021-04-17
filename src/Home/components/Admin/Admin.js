import Home from './Home.js';
import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Header from 'Home/components/Header/Header.js';
import HeaderLinks from 'Home/components/Header/HeaderLinks.js';
import ViewTheatre from '../Theatre/ViewTheatre';
import AdminProfile from './AdminProfile';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-kit-react/views/components.js';
import classNames from 'classnames';
import DetailTheatre from '../Theatre/DetailTheatre';
import AddTheatre from '../Theatre/AddTheatre';
import UpdateTheatre from '../Theatre/UpdateTheatre';
import ViewScreen from '../Screen/ViewScreen';
import DetailScreen from '../Screen/DetailScreen';
import UpdateScreen from '../Screen/UpdateScreen';
import AddScreen from '../Screen/AddScreen';
import hist from 'Home/components/Theatre/hist.js';
import AddAdmin from './AddAdmin';
import Footer from '../Footer/Footer';
import ViewMovie from '../Movie/ViewMovie';
import AddMovie from '../Movie/AddMovie';
import UpdateMovie from '../Movie/UpdateMovie';
import AllCustomers from './AllCustomers';
const useStyles = makeStyles(styles);

function Admin() {
  const classes = useStyles();

  return (
    <div style={{ background: '#000' }}>
      <Header
        brand='ADMIN'
        rightLinks={<HeaderLinks />}
        fixed
        color='transparent'
        changeColorOnScroll={{
          height: 300,
          color: 'white',
        }}
      />
      <Home />
      <Router history={hist}>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <Switch>
            <Route
              exact
              path='/admin/theatre/detail/:id'
              component={DetailTheatre}
            />
            <Route
              exact
              path='/admin/theatre/update/:id'
              component={UpdateTheatre}
            />
            <Route
              exact
              path='/admin/theatre/addTheatre'
              component={AddTheatre}
            />
            <Route exact path='/admin/theatre' component={ViewTheatre} />
            <Route exact path='/admin/screen' component={ViewScreen} />
            <Route
              exact
              path='/admin/screen/detail/:id'
              component={DetailScreen}
            />
            <Route
              exact
              path='/admin/screen/update/:id'
              component={UpdateScreen}
            />
            <Route exact path='/admin/screen/addScreen' component={AddScreen} />
            <Route exact path='/admin/movies/addMovie' component={AddMovie} />
            <Route exact path='/admin/movies' component={ViewMovie} />
            <Route exact path='/admin/movies/:id' component={UpdateMovie} />
            <Route exact path='/admin/addAdmin' component={AddAdmin} />
            <Route exact path='/admin/allcustomers' component={AllCustomers} />
            <Route exact path='/admin' component={AdminProfile} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default Admin;
