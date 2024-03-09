import React from 'react';
import { Route, Redirect , Navigate} from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to="/" replace />
        )
      }
    />
  );
};

export default PrivateRoute;
