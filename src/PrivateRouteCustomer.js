import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

export default function PrivateRouteCustomer({
  component: Component,
  ...rest
}) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          currentUser.displayName === 'CUSTOMER' ? (
            <Component {...props} />
          ) : (
            <Redirect to='/' />
          )
        ) : (
          <Redirect to='/' />
        );
      }}
    ></Route>
  );
}
