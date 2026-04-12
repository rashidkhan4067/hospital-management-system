import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/core/store/useAuthStore';
import Loading from '@/components/composed/Loading';

/**
 * 🔒 Al Shifaa Security Gatekeeper (V9PLU)
 * Centralized RBAC enforcement for administrative and clinical route clusters.
 */
const ProtectedRoute = ({ allowedRoles = [], requireAdmin = false, requireDoctor = false }) => {
  const { isAuthenticated, user, loading } = useAuthStore();
  const role = user?.role;

  // 🛰 Synchronizing Authentication Node
  if (loading) return <Loading />;
  
  // 🚫 Access Denied: Session Missing
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  // 🛡️ Legacy Logic (Maintain compatibility)
  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/admin-access-denied" replace />; // Explicit unauthorized path
  }

  if (requireDoctor && role !== 'doctor' && role !== 'admin') {
    return <Navigate to="/access-denied" replace />;
  }

  // 🛡️ Modern RBAC Matrix Enforcement
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    console.warn(`[SECURITY] Forbidden node traversal attempt by ${role} on ${window.location.pathname}`);
    return <Navigate to="/access-denied" replace />;
  }

  // ✅ Security Matrix Validated
  return <Outlet />;
};

export default ProtectedRoute;
