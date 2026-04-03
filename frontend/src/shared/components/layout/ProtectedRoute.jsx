import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/core/auth/AuthContext';
import Navbar from './Navbar';

const ProtectedRoute = ({ requireAdmin = false }) => {
  const { isAuthenticated, role, loading } = useAuth();
  
  if (loading) return <div>Authenticating...</div>; // Could inject a spinner component here
  
  // If not logged in, boot to login
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  // If an Admin route is requested but user is not admin, boot to dashboard
  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Auth passed, render child routes. The layout is handled by PageWrapper.
  return (
    <div className="page-container">
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
