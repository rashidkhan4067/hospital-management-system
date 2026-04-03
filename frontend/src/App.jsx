import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LazyMotion, domMax } from 'framer-motion';

// ─── Core ────────────────────────────────────────────────────────────────────
import { ThemeProvider } from '@/core/theme/ThemeContext';
import { UIProvider } from '@/core/ui/UIContext';
import { useAuth } from '@/core/auth/AuthContext';

// ─── Shared Layout ────────────────────────────────────────────────────────────
import { ProtectedRoute, PublicLayout, AppLayout, AuthLayout } from '@/shared/components/layout';
import Loading from '@/shared/components/common/Loading';

// ─── Feature: Auth ────────────────────────────────────────────────────────────
const LoginPage           = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage        = lazy(() => import('@/features/auth/pages/RegisterPage'));
const ForgotPasswordPage  = lazy(() => import('@/features/auth/pages/ForgotPasswordPage'));
const ResetPasswordPage   = lazy(() => import('@/features/auth/pages/ResetPasswordPage'));
const VerifyEmailPage     = lazy(() => import('@/features/auth/pages/VerifyEmailPage'));
const ConfirmEmailPage    = lazy(() => import('@/features/auth/pages/ConfirmEmailPage'));

// ─── Feature: Dashboard (role-based) ─────────────────────────────────────────
const DashboardDispatcher = lazy(() => import('@/features/dashboard/pages/DashboardDispatcher'));
const AdminDashboardPage  = lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const DoctorDashboard     = lazy(() => import('@/features/dashboard/pages/DoctorDashboard'));
const PatientDashboard    = lazy(() => import('@/features/dashboard/pages/PatientDashboard'));
const StatsPage           = lazy(() => import('@/features/dashboard/pages/StatsPage'));
const AdminChatPage       = lazy(() => import('@/features/dashboard/pages/AdminChatPage'));

// ─── Feature: Identity ────────────────────────────────────────────────────────
const UsersPage    = lazy(() => import('@/features/identity/pages/UsersPage'));
const StaffPage    = lazy(() => {
  return import('@/features/identity/pages/UsersPage').then(m => ({
    default: (props) => <m.default {...props} mode="personnel" />
  }));
});
const RolesPage    = lazy(() => import('@/features/identity/pages/RolesPage'));
const ProfilePage  = lazy(() => import('@/features/identity/pages/ProfilePage'));

// ─── Feature: Patients ────────────────────────────────────────────────────────
const PatientsPage      = lazy(() => import('@/features/patients/pages/PatientsPage'));
const PatientRecordPage = lazy(() => import('@/features/patients/pages/PatientRecordPage'));

// ─── Feature: Appointments ────────────────────────────────────────────────────
const AdminAppointmentsPage = lazy(() => import('@/features/appointments/pages/AppointmentsPage'));
const UserAppointmentsPage  = lazy(() => import('@/features/appointments/pages/UserAppointmentsPage'));

// ─── Feature: Doctors ────────────────────────────────────────────────────────
const DoctorsPage         = lazy(() => import('@/features/doctors/pages/DoctorsPage'));
const DoctorSchedulePage  = lazy(() => import('@/features/doctors/pages/DoctorSchedulePage'));
const SpecializationsPage = lazy(() => import('@/features/doctors/pages/SpecializationsPage'));

// ─── Feature: Finance ────────────────────────────────────────────────────────
const FinancesPage = lazy(() => import('@/features/finance/pages/FinancesPage'));

// ─── Feature: Analytics ──────────────────────────────────────────────────────
const InventoryPage = lazy(() => import('@/features/analytics/pages/InventoryPage'));
const LabPage       = lazy(() => import('@/features/analytics/pages/LabPage'));
const PharmacyPage  = lazy(() => import('@/features/analytics/pages/PharmacyPage'));

// ─── Feature: AI ─────────────────────────────────────────────────────────────
const SanaAIPage   = lazy(() => import('@/features/ai/pages/SanaAIPage'));
const AILogsPage   = lazy(() => import('@/features/ai/pages/AILogs'));
const AIChatsPage  = lazy(() => import('@/features/ai/pages/AIChats'));
const AIConfigPage = lazy(() => import('@/features/ai/pages/AIConfig'));

// ─── Feature: Management ─────────────────────────────────────────────────────
const AlertsPage      = lazy(() => import('@/features/management/pages/Alerts'));
const AuditPage       = lazy(() => import('@/features/management/pages/Audit'));
const DepartmentsPage = lazy(() => import('@/features/management/pages/Departments'));
const RulesPage       = lazy(() => import('@/features/management/pages/Rules'));
const StructurePage   = lazy(() => import('@/features/management/pages/Structure'));

// ─── Feature: Public ─────────────────────────────────────────────────────────
const LandingPage         = lazy(() => import('@/features/public/pages/LandingPage'));
const DoctorsPublicPage   = lazy(() => import('@/features/public/pages/DoctorsPage'));
const ClinicalTechPage    = lazy(() => import('@/features/public/pages/ClinicalTechPage'));
const SafetyPage          = lazy(() => import('@/features/public/pages/SafetyPage'));
const ClinicalReviewsPage = lazy(() => import('@/features/public/pages/ClinicalReviewsPage'));

// ─── Route Guard ─────────────────────────────────────────────────────────────
const PublicRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuth();
  if (isAuthenticated) {
    return role === 'admin' ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UIProvider>
        <ThemeProvider>
          <LazyMotion features={domMax} strict>
            <Suspense fallback={<Loading />}>
              <Routes>

                {/* 🔐 AUTH */}
                <Route element={<AuthLayout />}>
                  <Route path="/login"           element={<PublicRoute><LoginPage /></PublicRoute>} />
                  <Route path="/register"        element={<PublicRoute><RegisterPage /></PublicRoute>} />
                  <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
                  <Route path="/reset-password"  element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />
                  <Route path="/verify-email"    element={<PublicRoute><VerifyEmailPage /></PublicRoute>} />
                  <Route path="/confirm-email"   element={<PublicRoute><ConfirmEmailPage /></PublicRoute>} />
                </Route>

                {/* 🌐 PUBLIC */}
                <Route element={<PublicLayout />}>
                  <Route path="/"              element={<LandingPage />} />
                  <Route path="/doctors"       element={<DoctorsPublicPage />} />
                  <Route path="/specialists"   element={<DoctorsPublicPage />} />
                  <Route path="/clinical-tech" element={<ClinicalTechPage />} />
                  <Route path="/safety"        element={<SafetyPage />} />
                  <Route path="/reviews"       element={<ClinicalReviewsPage />} />
                </Route>

                {/* 🏥 PROTECTED APP */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<AppLayout />}>
                    <Route path="/dashboard"       element={<DashboardDispatcher />} />
                    <Route path="/my-appointments" element={<UserAppointmentsPage />} />
                    <Route path="/sana-ai"         element={<SanaAIPage />} />

                    {/* 🔒 ADMIN ONLY */}
                    <Route element={<ProtectedRoute requireAdmin={true} />}>

                      {/* Dashboard */}
                      <Route path="/admin"          element={<AdminDashboardPage />} />
                      <Route path="/admin/chats"    element={<AdminChatPage />} />
                      <Route path="/admin/analytics" element={<StatsPage />} />

                      {/* Identity */}
                      <Route path="/admin/users"     element={<UsersPage />} />
                      <Route path="/admin/users/add" element={<UsersPage autoOpenAdd={true} />} />
                      <Route path="/admin/staff"     element={<StaffPage />} />
                      <Route path="/admin/staff/add" element={<UsersPage mode="personnel" autoOpenAdd={true} />} />
                      <Route path="/admin/roles"     element={<RolesPage />} />
                      <Route path="/admin/profile"   element={<ProfilePage />} />

                      {/* Patients */}
                      <Route path="/admin/patients"     element={<PatientsPage />} />
                      <Route path="/admin/patients/add" element={<PatientsPage autoOpenAdd={true} />} />
                      <Route path="/admin/patients/:id" element={<PatientRecordPage />} />

                      {/* Appointments */}
                      <Route path="/admin/appointments"     element={<AdminAppointmentsPage />} />
                      <Route path="/admin/appointments/add" element={<AdminAppointmentsPage autoOpenAdd={true} />} />

                      {/* Doctors */}
                      <Route path="/admin/doctors"           element={<DoctorsPage />} />
                      <Route path="/admin/doctors/add"       element={<DoctorsPage autoOpenAdd={true} />} />
                      <Route path="/admin/doctors/schedule"  element={<DoctorSchedulePage />} />
                      <Route path="/admin/doctors/specialty" element={<SpecializationsPage />} />

                      {/* Finance */}
                      <Route path="/admin/finances" element={<FinancesPage />} />

                      {/* Analytics */}
                      <Route path="/admin/inventory"     element={<InventoryPage />} />
                      <Route path="/admin/inventory/add" element={<InventoryPage autoOpenAdd={true} />} />
                      <Route path="/admin/lab"           element={<LabPage />} />
                      <Route path="/admin/pharmacy"      element={<PharmacyPage />} />

                      {/* AI */}
                      <Route path="/admin/ai-agent/logs"   element={<AILogsPage />} />
                      <Route path="/admin/ai-agent/chats"  element={<AIChatsPage />} />
                      <Route path="/admin/ai-agent/config" element={<AIConfigPage />} />

                      {/* Management */}
                      <Route path="/admin/departments"     element={<DepartmentsPage />} />
                      <Route path="/admin/notifs/send"     element={<AlertsPage />} />
                      <Route path="/admin/security/audit"  element={<AuditPage />} />
                      <Route path="/admin/settings/general" element={<RulesPage />} />
                      <Route path="/admin/settings"        element={<StructurePage />} />
                    </Route>
                  </Route>
                </Route>

                {/* 🔄 FALLBACK */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </LazyMotion>
        </ThemeProvider>
      </UIProvider>
    </GoogleOAuthProvider>
  );
}
