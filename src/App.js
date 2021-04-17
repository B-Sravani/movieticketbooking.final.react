import Home from './Home/Home.js';
import React, { useEffect } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Header from 'Home/components/Header/Header.js';
import HeaderLinks from 'Home/components/Header/HeaderLinks.js';
import ViewTheatre from './Home/components/Theatre/ViewTheatre';
import Body from './Home/Body';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-kit-react/views/components.js';
import classNames from 'classnames';
import DetailTheatre from './Home/components/Theatre/DetailTheatre';
import AddTheatre from './Home/components/Theatre/AddTheatre';
import UpdateTheatre from './Home/components/Theatre/UpdateTheatre';
import ViewScreen from './Home/components/Screen/ViewScreen';
import DetailScreen from './Home/components/Screen/DetailScreen';
import UpdateScreen from './Home/components/Screen/UpdateScreen';
import AddScreen from './Home/components/Screen/AddScreen';
import hist from 'Home/components/Theatre/hist.js';
import { useSelector } from 'react-redux';
const useStyles = makeStyles(styles);

function App() {
  const classes = useStyles();
  const getUser = useSelector((state) => state.user.user);

  useEffect(() => {
    console.log(getUser);
    if (getUser.role !== 'ADMIN') {
      hist.push('/login');
    }
  }, [getUser]);

  return (
    <div>
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
            <Route exact path='/admin' component={Body} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
