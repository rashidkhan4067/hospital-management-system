import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';

export const ProtectedRoute = ({ requireAdmin = false }) => {
  const { isAuthenticated, role, loading } = useAuth();
  
  if (loading) return <div>Authenticating...</div>; // Could inject a spinner component here
  
  // If not logged in, boot to login
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  // If an Admin route is requested but user is not admin, boot to dashboard
  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Auth passed, render child routes packed inside the Navbar layout
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Outlet />
      </div>
    </>
  );
};
