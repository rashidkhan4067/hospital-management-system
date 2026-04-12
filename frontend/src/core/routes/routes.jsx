import React, { lazy } from 'react';

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
const PatientOnboarding   = lazy(() => import('@/features/auth/pages/PatientOnboarding'));

// ─── CORE NODE ───
const AdminDashboardPage  = lazy(() => import('@/features/core_management/dashboard/pages/DashboardPage'));
const AnalyticsPage       = lazy(() => import('@/features/core_management/analytics/pages/AnalyticsPage'));
const MessagingPage       = lazy(() => import('@/features/core_management/messaging/pages/MessagingPage'));

// ─── CLINICAL NODE ───
const PatientsPage      = lazy(() => import('@/features/clinical/patients/pages/PatientsPage'));
const PatientIntakePage  = lazy(() => import('@/features/clinical/patients/pages/PatientIntakePage'));
const PatientDetailPage  = lazy(() => import('@/features/clinical/patients/pages/PatientDetailPage'));
const AppointmentsPage  = lazy(() => import('@/features/core_management/appointments/pages/AppointmentsPage'));
const BookAppointmentPage = lazy(() => import('@/features/core_management/appointments/pages/BookAppointmentPage'));
const DoctorsPage       = lazy(() => import('@/features/clinical/doctors/pages/DoctorsPage'));
const WardsBedsPage     = lazy(() => import('@/features/clinical/wards/pages/WardsBeds'));
const AdmissionsPage    = lazy(() => import('@/features/clinical/wards/pages/AdmissionsPage'));
const AdmissionsProtocolPage = lazy(() => import('@/features/clinical/wards/pages/AdmissionsProtocolPage'));

// ─── FINANCIAL & PHARMACY NODE ───
const PharmacyPage      = lazy(() => import('@/features/core_management/analytics/pages/PharmacyPage'));
const PharmacyOrderPage = lazy(() => import('@/features/core_management/analytics/pages/PharmacyOrderPage'));
const FinancesPage      = lazy(() => import('@/features/financials/finance/pages/FinancesPage'));
const GenerateInvoicePage = lazy(() => import('@/features/financials/finance/pages/GenerateInvoicePage'));
const InvoiceDetailPage   = lazy(() => import('@/features/financials/finance/pages/InvoiceDetailPage'));

// ─── MANAGEMENT NODE ───
const DepartmentsPage = lazy(() => import('@/features/system/management/pages/Departments'));
const ProfilePage     = lazy(() => import('@/features/profile/pages/ProfilePage'));
const AlertsPage      = lazy(() => import('@/features/system/management/pages/Alerts'));

// ─── PLACEHOLDERS (Maintenance Fallbacks) ───
const ModuleConstructionPage = lazy(() => import('@/components/primitives/ModuleConstructionPage'));



export const GENERIC_ROUTES = [
    {
        path: '/profile',
        element: ProfilePage,
        requireAuth: true,
        title: 'Account Identity'
    },
    {
        path: '/onboarding',
        element: PatientOnboarding,
        requireAuth: true,
        title: 'Complete Profile'
    }
];

export const APP_ROUTES = [
    {
        path: '', 
        element: AdminDashboardPage,
        requireAuth: true,
        requireAdmin: true,
        title: 'Global Hub'
    },
    {
        path: 'messaging',
        element: MessagingPage,
        requireAuth: true, requireAdmin: true, title: 'Operational Chat'
    },
    {
        path: 'departments',
        element: DepartmentsPage,
        requireAuth: true, requireAdmin: true, title: 'Clinical Matrix'
    },
    {
        path: 'appointments',
        element: AppointmentsPage,
        requireAuth: true, requireAdmin: true, title: 'Clinical Scheduling'
    },
    {
        path: 'patients',
        element: PatientsPage,
        requireAuth: true, requireAdmin: true, title: 'Registry Matrix'
    },
    {
        path: 'doctors',
        element: DoctorsPage,
        requireAuth: true, requireAdmin: true, title: 'Practitioner Hub'
    },
    {
        path: 'analytics',
        element: AnalyticsPage,
        requireAuth: true, requireAdmin: true, title: 'Command Intelligence'
    },
    // New mappings for widget links
    {
        path: 'clinical/wards',
        element: WardsBedsPage,
        requireAuth: true, requireAdmin: true, title: 'Ward Occupancy'
    },
    {
        path: 'clinical/admissions',
        element: AdmissionsPage,
        requireAuth: true, requireAdmin: true, title: 'Admissions'
    },
    {
        path: 'pharmacy',
        element: PharmacyPage,
        requireAuth: true, requireAdmin: true, title: 'Pharmacy Hub'
    },
    {
        path: 'financials',
        element: FinancesPage,
        requireAuth: true, requireAdmin: true, title: 'Financials'
    },
    {
        path: 'system/alerts',
        element: AlertsPage,
        requireAuth: true, requireAdmin: true, title: 'System Alerts'
    },
    // Deep links and actions routed to Placeholders
    {
        path: 'patients/new',
        element: PatientIntakePage,
        requireAuth: true, requireAdmin: true, title: 'New Patient'
    },
    {
        path: 'appointments/new',
        element: BookAppointmentPage,
        requireAuth: true, requireAdmin: true, title: 'Book Appointment'
    },
    {
        path: 'clinical/admissions/new',
        element: AdmissionsProtocolPage,
        requireAuth: true, requireAdmin: true, title: 'Admit Patient'
    },
    {
        path: 'financials/invoices/new',
        element: GenerateInvoicePage,
        requireAuth: true, requireAdmin: true, title: 'Generate Invoice'
    },
    {
        path: 'pharmacy/orders/new',
        element: PharmacyOrderPage,
        requireAuth: true, requireAdmin: true, title: 'Order Medication'
    },
    {
        path: 'patients/:id',
        element: PatientDetailPage,
        requireAuth: true, requireAdmin: true, title: 'Patient Profile'
    },
    {
        path: 'appointments/:id',
        element: BookAppointmentPage, // Reusing for now
        requireAuth: true, requireAdmin: true, title: 'Appointment Details'
    },
    {
        path: 'financials/invoices/:id',
        element: InvoiceDetailPage,
        requireAuth: true, requireAdmin: true, title: 'Invoice Details'
    }
];

export const AUTH_ROUTES = [
    { path: '/login', element: LoginPage },
    { path: '/register', element: RegisterPage },
    { path: '/forgot-password', element: ForgotPasswordPage },
    { path: '/magic-link/verify', element: VerifyMagicLinkPage }
];
