import { lazy } from 'react';

/**
 * 🛰 Al Shifaa Global Routing Registry
 * Enforces strict role-based access and atomic lazy-loading across the clinical matrix.
 */

// ─── AUTH NODE ───
const LoginPage           = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage        = lazy(() => import('@/features/auth/pages/RegisterPage'));
const ForgotPasswordPage  = lazy(() => import('@/features/auth/pages/ForgotPasswordPage'));
const ResetPasswordPage   = lazy(() => import('@/features/auth/pages/ResetPasswordPage'));

// ─── CORE NODE ───
const DashboardDispatcher = lazy(() => import('@/features/dashboard/pages/DashboardDispatcher'));
const AdminDashboardPage  = lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const StatsPage           = lazy(() => import('@/features/dashboard/pages/StatsPage'));

// ─── CLINICAL NODE ───
const PatientsPage      = lazy(() => import('@/features/patients/pages/PatientsPage'));
const AppointmentsPage  = lazy(() => import('@/features/appointments/pages/AppointmentsPage'));
const DoctorsPage       = lazy(() => import('@/features/doctors/pages/DoctorsPage'));

export const APP_ROUTES = [
    {
        path: '/admin',
        element: AdminDashboardPage,
        requireAuth: true,
        requireAdmin: true,
        title: 'Global Hub'
    },
    {
        path: '/admin/appointments',
        element: AppointmentsPage,
        requireAuth: true,
        requireAdmin: true,
        title: 'Clinical Scheduling'
    },
    {
        path: '/admin/analytics',
        element: StatsPage,
        requireAuth: true,
        requireAdmin: true,
        title: 'Diagnostic Analytics'
    },
    {
        path: '/admin/patients',
        element: PatientsPage,
        requireAuth: true,
        requireAdmin: true,
        title: 'Registry Matrix'
    },
    {
        path: '/admin/doctors',
        element: DoctorsPage,
        requireAuth: true,
        requireAdmin: true,
        title: 'Practitioner Hub'
    }
];

export const AUTH_ROUTES = [
    { path: '/login', element: LoginPage },
    { path: '/register', element: RegisterPage },
    { path: '/forgot-password', element: ForgotPasswordPage }
];
