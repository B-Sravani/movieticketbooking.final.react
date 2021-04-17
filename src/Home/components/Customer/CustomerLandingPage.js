import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Header from './Header.js';
import classNames from 'classnames';
import HeaderLinks from './HeaderLinks.js';
import hist from 'Home/components/Theatre/hist.js';
import styles from 'assets/jss/material-kit-react/views/components.js';
import { makeStyles } from '@material-ui/core/styles';
import Home from './Home.js';
import Location from './Location';
import Explore from './Explore';
import Footer from '../Footer/Footer';
import BookShow from './Book/BookShow';
import DetailCustomer from './DetailCustomer';
import CustomerTickets from './CustomerTickets.js';
import ExploreTheatre from './ExploreTheatre';
import UpdateDetails from './UpdateDetails';
import FeedBack from './Book/FeedBack';
import ContactUs from './Contact/ContactUs';

const useStyles = makeStyles(styles);

function CustomerLandingPage() {
  const classes = useStyles();

  return (
    <div>
      <div style={{ backgroundColor: '#000' }}>
        <Header
          rightLinks={<HeaderLinks />}
          fixed
          color='transparent'
          changeColorOnScroll={{
            height: 300,
            color: 'dark',
          }}
        />
        <Home />
        <br />
        <br />

        <Router history={hist}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <Switch>
              <Route
                exact
                path='/customer/city/:cityName'
                component={Explore}
              />
              <Route
                exact
                path='/customer/bookShow/:showId'
                component={BookShow}
              />
              <Route
                exact
                path='/customer/tickets/'
                component={CustomerTickets}
              />
              <Route exact path='/customer/contactus/' component={ContactUs} />
              <Route
                exact
                path='/customer/detail/'
                component={DetailCustomer}
              />
              <Route
                exact
                path='/customer/theatre/detail/:theatreId'
                component={ExploreTheatre}
              />
              <Route
                exact
                path='/customer/detail/edit'
                component={UpdateDetails}
              />
              <Route exact path='/customer/feedback/' component={FeedBack} />
              <Route exact path='/customer' component={Location} />
            </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    </div>
  );
}

export default CustomerLandingPage;
