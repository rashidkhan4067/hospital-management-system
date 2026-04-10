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
const VerifyMagicLinkPage = lazy(() => import('@/features/auth/pages/VerifyMagicLinkPage'));

// ─── CORE NODE ───
const AdminDashboardPage  = lazy(() => import('@/features/core_management/dashboard/pages/DashboardPage'));
const AnalyticsPage       = lazy(() => import('@/features/core_management/analytics/pages/AnalyticsPage'));
const MessagingPage       = lazy(() => import('@/features/core_management/messaging/pages/MessagingPage'));

// ─── CLINICAL NODE ───
const PatientsPage      = lazy(() => import('@/features/clinical/patients/pages/PatientsPage'));
const AppointmentsPage  = lazy(() => import('@/features/core_management/appointments/pages/AppointmentsPage'));
const DoctorsPage       = lazy(() => import('@/features/clinical/doctors/pages/DoctorsPage'));

// ─── MANAGEMENT NODE ───
const DepartmentsPage = lazy(() => import('@/features/system/management/pages/Departments'));

export const APP_ROUTES = [
    {
        path: '', // Index route for /admin
        element: AdminDashboardPage,
        requireAuth: true,
        requireAdmin: true,
        title: 'Global Hub'
    },
    {
        path: 'messaging',
        element: MessagingPage,
        requireAuth: true,
        requireAdmin: true,
        title: 'Operational Chat'
    },
    {
        path: 'departments',
        element: DepartmentsPage,
        requireAuth: true,
        requireAdmin: true,
        title: 'Clinical Matrix'
    },
    {
        path: 'appointments',
        element: AppointmentsPage,
        requireAuth: true,
        requireAdmin: true,
        title: 'Clinical Scheduling'
    },
    {
        path: 'patients',
        element: PatientsPage,
        requireAuth: true,
        requireAdmin: true,
        title: 'Registry Matrix'
    },
    {
        path: 'doctors',
        element: DoctorsPage,
        requireAuth: true,
        requireAdmin: true,
        title: 'Practitioner Hub'
    },
    {
        path: 'analytics',
        element: AnalyticsPage,
        requireAuth: true,
        requireAdmin: true,
        title: 'Command Intelligence'
    }
];

export const AUTH_ROUTES = [
    { path: '/login', element: LoginPage },
    { path: '/register', element: RegisterPage },
    { path: '/forgot-password', element: ForgotPasswordPage },
    { path: '/magic-link/verify', element: VerifyMagicLinkPage }
];


