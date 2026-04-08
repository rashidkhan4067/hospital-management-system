import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LazyMotion, domMax } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ─── Core ────────────────────────────────────────────────────────────────────
import { ThemeProvider } from '@/core/theme/ThemeContext';
import { UIProvider } from '@/core/ui/UIContext';
import { useAuth } from '@/core/auth/AuthContext';
import { APP_ROUTES, AUTH_ROUTES } from '@/core/routes/routes';

// ─── Shared Layout ────────────────────────────────────────────────────────────
import { ProtectedRoute, PublicLayout, AppLayout, AuthLayout } from '@/layouts';
import Loading from '@/components/composed/Loading';
import TeleSystem from '@/services/TeleSystem';

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
  const { isAuthenticated, role } = useAuth();
  if (isAuthenticated) {
    return role === 'admin' ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />;
  }
  return children;
};

// ─── App Dispatcher ───
const DashboardDispatcher = lazy(() => import('@/features/dashboard/pages/DashboardDispatcher'));

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <UIProvider>
          <TeleSystem>
            <ThemeProvider>
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
                        
                        {/* 🏢 GLOBAL ADMIN CLUSTER */}
                        <Route element={<ProtectedRoute requireAdmin={true} />}>
                          {APP_ROUTES.map(route => (
                            <Route key={route.path} path={route.path} element={<route.element />} />
                          ))}
                        </Route>

                        {/* Dispatcher (Root) */}
                        <Route path="/dashboard" element={<DashboardDispatcher />} />
                      </Route>
                    </Route>

                    <Route path="*" element={<Navigate to="/login" replace />} />
                  </Routes>
                </Suspense>
              </LazyMotion>
            </ThemeProvider>
          </TeleSystem>
        </UIProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
