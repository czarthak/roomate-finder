import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, token, ...props }) => {
  return token ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
