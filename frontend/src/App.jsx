import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { LazyMotion, domMax } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ─── Core ────────────────────────────────────────────────────────────────────
import { useAuthStore } from '@/core/store/useAuthStore';
import { useUIStore } from '@/core/store/useUIStore';
import { APP_ROUTES, AUTH_ROUTES } from '@/core/routes/routes';


// ─── Shared Layout ────────────────────────────────────────────────────────────
import { ProtectedRoute, AppLayout, AuthLayout } from '@/layouts';

import Loading from '@/components/composed/Loading';
import TeleSystem from '@/core/api/services/TeleSystem';

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
  const { isAuthenticated, user } = useAuthStore();
  const role = user?.role;
  if (isAuthenticated) {
    return role === 'admin' ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />;
  }
  return children;
};


export default function App() {
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

              {/* 🏥 PROTECTED CLUSTER */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  
                  {/* 🏢 GLOBAL ADMIN CLUSTER (Surgical Nesting) */}
                  <Route path="/admin">
                     <Route element={<ProtectedRoute requireAdmin={true} />}>
                        {APP_ROUTES.map(route => (
                          <Route 
                            key={route.path || 'index'} 
                            index={route.path === ''}
                            path={route.path !== '' ? route.path : undefined} 
                            element={<route.element />} 
                          />
                        ))}
                     </Route>
                  </Route>

                  {/* 📟 OPERATIONAL DASHBOARD (Fallback/General) */}
                  <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
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




