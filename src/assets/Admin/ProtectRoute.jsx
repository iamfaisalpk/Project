import React from 'react';
import { Navigate } from 'react-router-dom';

// Assuming you have some way to check if user is authenticated and is admin
const ProtectedRoute = ({ children }) => {
  // Replace this with your actual authentication logic
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Example
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Example

  if (!isAuthenticated || !isAdmin) {
    // Redirect to login if not authenticated or not admin
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;