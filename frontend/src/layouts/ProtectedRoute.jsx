import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/core/store/useAuthStore';
import Loading from '@/components/composed/Loading';

/**
 * 🔒 Al Shifaa Security Gatekeeper
 * Enforces atomic role-based authentication and clinical session validation.
 */
const ProtectedRoute = ({ requireAdmin = false, requireDoctor = false }) => {
  const { isAuthenticated, user, loading } = useAuthStore();
  const role = user?.role;

  
  // 🛰 Synchronizing Authentication Node
  if (loading) return <Loading />;
  
  // 🚫 Node Reset: Not Authenticated
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  // ⛔ Access Denied: Admin Rights Required
  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/dashboard" replace />; // Redirect to base role-dashboard
  }

  // ⛔ Access Denied: Doctor Rights Required
  if (requireDoctor && role !== 'doctor' && role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Authentication Matrix Validated
  return <Outlet />;
};

export default ProtectedRoute;
