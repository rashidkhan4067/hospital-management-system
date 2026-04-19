import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { LazyMotion, domMax } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ─── Core ────────────────────────────────────────────────────────────────────
import { useAuthStore } from '@/core/store/useAuthStore';
import { useUIStore } from '@/core/store/useUIStore';
import { APP_ROUTES, AUTH_ROUTES, GENERIC_ROUTES } from '@/core/routes/routes';


// ─── Shared Layout ────────────────────────────────────────────────────────────
import { ProtectedRoute, AppLayout, AuthLayout } from '@/layouts';

import Loading from '@/components/composed/Loading';
import TeleSystem from '@/core/api/services/TeleSystem';
import api from '@/core/api/services/apiClient';

// ─── Query Config ───
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// ─── Route Guard ───
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuthStore();
  const role = user?.role;

  if (loading) return <Loading />;

  if (isAuthenticated) {
    const redirectMap = {
      'admin': '/admin/dashboard',
      'doctor': '/doctor/dashboard',
      'patient': user?.onboarding_completed ? '/patient/home' : '/onboarding'
    };
    return <Navigate to={redirectMap[role] || '/dashboard'} replace />;
  }
  return children;
};


export default function App() {
  const { loading } = useAuthStore();

  if (loading) return <Loading />;

  return (
    <QueryClientProvider client={queryClient}>
      <TeleSystem>
        <LazyMotion features={domMax} strict>
          <Suspense fallback={<Loading />}>
            <Routes>
              
              {/* 🔐 AUTH CLUSTER */}
              <Route element={<AuthLayout />}>
                {AUTH_ROUTES.map(route => (
                  <Route key={route.path} path={route.path} element={<PublicRoute><route.element /></PublicRoute>} />
                ))}
              </Route>

              {/* 🏥 PROTECTED FS CLUSTER (No Sidebar/TopBar) */}
              <Route element={<ProtectedRoute />}>
                 {GENERIC_ROUTES.map(route => (
                   <Route key={route.path} path={route.path} element={<route.element />} />
                 ))}
              </Route>

              {/* 🏥 PROTECTED SHELL CLUSTER (With Sidebar/TopBar) */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>

                  {/* 🏢 GLOBAL ADMIN CLUSTER */}
                  <Route path="/admin">
                     <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={
                            <Suspense fallback={<Loading />}>
                                {APP_ROUTES.find(r => r.path === '')?.element ? 
                                 React.createElement(APP_ROUTES.find(r => r.path === '')?.element) : <div>Admin Dashboard Node</div>}
                            </Suspense>
                        } />
                        {APP_ROUTES.filter(r => r.path !== '').map(route => (
                          <Route 
                            key={route.path} 
                            path={route.path} 
                            element={<route.element />} 
                          />
                        ))}
                     </Route>
                  </Route>

                  {/* 🩺 DOCTOR CLUSTER */}
                  <Route path="/doctor">
                     <Route element={<ProtectedRoute allowedRoles={['doctor', 'admin']} />}>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<div className="p-8"><h1 className="text-2xl font-bold">Doctor Command Center</h1><p className="opacity-60">Provisioning clinical telemetry...</p></div>} />
                     </Route>
                  </Route>

                  {/* 🛌 PATIENT CLUSTER */}
                  <Route path="/patient">
                     <Route element={<ProtectedRoute allowedRoles={['patient', 'admin']} />}>
                        <Route index element={<Navigate to="home" replace />} />
                        <Route path="home" element={<div className="p-8"><h1 className="text-2xl font-bold">Patient Wellness Hub</h1><p className="opacity-60">Retrieving medical health records...</p></div>} />
                     </Route>
                  </Route>

                  {/* 📟 OPERATIONAL DASHBOARD (Fallback/General) */}
                  <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
                  <Route path="/access-denied" element={<div className="flex flex-col items-center justify-center p-20 text-center"><h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1><p className="text-slate-600">You do not have the required role to access this portal.</p></div>} />
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Suspense>
        </LazyMotion>
      </TeleSystem>
    </QueryClientProvider>
  );
}




