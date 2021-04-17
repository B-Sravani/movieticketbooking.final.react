import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

export default function PrivateRouteAdmin({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          currentUser.displayName === 'ADMIN' ||
          currentUser.displayName === 'ROOT' ? (
            <Component {...props} />
          ) : (
            <Redirect to='/customer' />
          )
        ) : (
          <Redirect to='/' />
        );
      }}
    ></Route>
  );
}
