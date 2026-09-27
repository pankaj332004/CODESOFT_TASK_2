import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../common/Loader';

/**
 * Route guard component that requires authentication.
 * If user is not authenticated or logged in, redirects to /login
 * while preserving the attempted URL in location state.
 */
export const ProtectedRoute = ({ children, message = 'Please login to attend the quiz' }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullScreen message="Checking authorization..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location, message }} replace />;
  }

  return children;
};

export default ProtectedRoute;
