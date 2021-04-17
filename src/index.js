//Imports
import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './Home/components/Admin/Admin';
import 'assets/scss/material-kit-react.scss?v=1.9.0';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import theatreReducer from './Home/components/Store/theatreReducer';
import movieReducer from './Home/components/Store/MovieReducer';
import screenReducer from './Home/components/Store/ScreenReducer';
import userReducer from './Home/components/Store/UserReducer';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import SimplePaper from './Home/components/signin-signup/SimplePaper';
import SimplePaper2 from './Home/components/signin-signup/Simplerpaper2';
import 'bootstrap/dist/css/bootstrap.min.css';
import hist from './Home/components/Theatre/hist';
import { Route, Router, Switch } from 'react-router-dom';
import CustomerLandingPage from 'Home/components/Customer/CustomerLandingPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRouteAdmin from './PrivateRouteAdmin';
import PrivateRouteCustomer from './PrivateRouteCustomer';
import Dashboard from './Dashboard';
import adminReducer from './Home/components/Store/AdminReducer';
import showReducer from './Home/components/Store/ShowReducer';
import bookingReducer from './Home/components/Store/BookingReducer';
import ForgotPassword from './Home/components/signin-signup/ForgotPassword';

//Pass it provider so that reducer can access components
const rootReducer = combineReducers({
  theatre: theatreReducer,
  movie: movieReducer,
  screen: screenReducer,
  user: userReducer,
  admin: adminReducer,
  booking: bookingReducer,
  show: showReducer,
});

//Thunk : Avoids directly causing side effects in our actions, action creators, or components, return a function inside a fun
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  //Access the parent obj by child and child's child
  <Provider store={store}>
    <Router history={hist}>
      {/* To restrict access*/}
      <AuthProvider>
        
        <Switch>
          <PrivateRouteAdmin path='/admin' component={Admin} />
          <PrivateRouteCustomer
            path='/customer'
            component={CustomerLandingPage}
          />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/signup' component={SimplePaper} />
          <Route exact path='/forgot-password' component={ForgotPassword} />
          <Route exact path='/' component={SimplePaper2} />
        </Switch>
      </AuthProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
