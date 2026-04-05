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
const PermissionsPage = lazy(() => import('@/features/identity/pages/RolesPage'));
const UsersPage    = lazy(() => import('@/features/identity/pages/UsersPage'));
const StaffPage    = lazy(() => import('@/features/management/pages/StaffPage'));
const RolesPage    = lazy(() => import('@/features/identity/pages/RolesPage'));
const ProfilePage  = lazy(() => import('@/features/identity/pages/ProfilePage'));

// ─── Feature: Patients ────────────────────────────────────────────────────────
const PatientsPage      = lazy(() => import('@/features/patients/pages/PatientsPage'));
const PatientRecordPage = lazy(() => import('@/features/patients/pages/PatientRecordPage'));

// ─── Feature: Appointments ────────────────────────────────────────────────────
const AdminAppointmentsPage = lazy(() => import('@/features/appointments/pages/AppointmentsPage'));
const UserAppointmentsPage  = lazy(() => import('@/features/appointments/pages/UserAppointmentsPage'));
const BookingDispatcher     = lazy(() => import('@/features/appointments/pages/BookingDispatcher'));

// ─── Feature: Doctors ────────────────────────────────────────────────────────
const DoctorsPage         = lazy(() => import('@/features/doctors/pages/DoctorsPage'));
const DoctorDispatcher    = lazy(() => import('@/features/doctors/pages/DoctorDispatcher'));
const DoctorDetailDispatcher = lazy(() => import('@/features/doctors/pages/DoctorDetailDispatcher'));
const DoctorRecordPage     = lazy(() => import('@/features/doctors/pages/DoctorRecordPage'));
const AppointmentRecordPage = lazy(() => import('@/features/appointments/pages/AppointmentRecordPage'));
const DoctorSchedulePage  = lazy(() => import('@/features/doctors/pages/DoctorSchedulePage'));
const SpecializationsPage = lazy(() => import('@/features/doctors/pages/SpecializationsPage'));

// ─── Feature: Finance ────────────────────────────────────────────────────────
const FinancesPage   = lazy(() => import('@/features/finance/pages/FinancesPage'));
const TransactionRecordPage = lazy(() => import('@/features/finance/pages/TransactionRecordPage'));
const BillingPage    = lazy(() => import('@/features/finance/pages/BillingPage'));
const BillingRecordPage = lazy(() => import('@/features/finance/pages/BillingRecordPage'));
const ExpensesPage   = lazy(() => import('@/features/finance/pages/ExpensesPage'));
const ExpenseRecordPage = lazy(() => import('@/features/finance/pages/ExpenseRecordPage'));
const FinReportsPage = lazy(() => import('@/features/finance/pages/FinancialReportsPage'));

// ─── Feature: Analytics ──────────────────────────────────────────────────────
const InventoryPage      = lazy(() => import('@/features/analytics/pages/InventoryPage'));
const MessengerPage      = lazy(() => import('@/features/communication/pages/MessengerPage'));
const MedicineRecordPage = lazy(() => import('@/features/analytics/pages/MedicineRecordPage'));
const LabPage            = lazy(() => import('@/features/analytics/pages/LabPage'));
const PharmacyPage       = lazy(() => import('@/features/analytics/pages/PharmacyPage'));

// ─── Feature: Wards / IPD / OPD ──────────────────────────────────────────────
const WardsBedsPage   = lazy(() => import('@/features/wards/pages/WardsBeds'));
const AdmissionsPage  = lazy(() => import('@/features/wards/pages/AdmissionsPage'));
const OPDQueuePage    = lazy(() => import('@/features/appointments/pages/OPDQueuePage'));

// ─── Feature: Staff / Rosters ─────────────────────────────────────────────────
// TODO: build ShiftRosterPage, LeaveManagementPage in src/features/identity/
const ShiftRosterPage       = lazy(() => import('@/features/management/pages/ShiftRosterPage'));
const LeaveManagementPage   = lazy(() => import('@/features/management/pages/LeaveManagementPage'));

// ─── Feature: AI Insights ─────────────────────────────────────────────────────
const AIInsightsPage = lazy(() => import('@/features/ai/pages/AILogs')); // placeholder

// ─── Feature: AI ─────────────────────────────────────────────────────────────
const SanaAIPage   = lazy(() => import('@/features/ai/pages/SanaAIPage'));
const SanaVoicePage = lazy(() => import('@/features/ai/pages/SanaVoicePage'));
const AILogsPage   = lazy(() => import('@/features/ai/pages/AILogs'));
const AIChatsPage  = lazy(() => import('@/features/ai/pages/AIChats'));
const AIConfigPage = lazy(() => import('@/features/ai/pages/AIConfig'));

// ─── Feature: Management ─────────────────────────────────────────────────────
const AlertsPage               = lazy(() => import('@/features/management/pages/Alerts'));
const AuditPage                = lazy(() => import('@/features/management/pages/Audit'));
const DepartmentsPage          = lazy(() => import('@/features/management/pages/Departments'));
const RulesPage                = lazy(() => import('@/features/management/pages/Rules'));
const StructurePage            = lazy(() => import('@/features/management/pages/Structure'));
const NotificationSettingsPage = lazy(() => import('@/features/management/pages/Alerts'));  // placeholder
const SystemHealthPage         = lazy(() => import('@/features/management/pages/Structure')); // placeholder

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
                  <Route path="/specialists"   element={<DoctorsPublicPage />} />
                  <Route path="/clinical-tech" element={<ClinicalTechPage />} />
                  <Route path="/safety"        element={<SafetyPage />} />
                  <Route path="/reviews"       element={<ClinicalReviewsPage />} />
                </Route>

                {/* 🏥 PROTECTED APP */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<AppLayout />}>
                    <Route path="/dashboard"       element={<DashboardDispatcher />} />
                    <Route path="/doctors"         element={<DoctorDispatcher />} />
                    <Route path="/doctors/:id"     element={<DoctorDetailDispatcher />} />
                    <Route path="/book/:doctorId"  element={<BookingDispatcher />} />
                    <Route path="/appointments"    element={<UserAppointmentsPage />} />
                    <Route path="/voice"           element={<SanaVoicePage />} />

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
                      <Route path="/admin/appointments/:id" element={<AppointmentRecordPage />} />

                      {/* Doctors */}
                      <Route path="/admin/doctors"           element={<DoctorsPage />} />
                      <Route path="/admin/doctors/add"       element={<DoctorsPage autoOpenAdd={true} />} />
                      <Route path="/admin/doctors/:id"       element={<DoctorRecordPage />} />
                      <Route path="/admin/doctors/schedule"  element={<DoctorSchedulePage />} />
                      <Route path="/admin/doctors/specialty" element={<SpecializationsPage />} />

                      {/* Finance */}
                      <Route path="/admin/finances"           element={<FinancesPage />} />
                      <Route path="/admin/finances/:id"       element={<TransactionRecordPage />} />
                      <Route path="/admin/billing"            element={<BillingPage />} />
                      <Route path="/admin/billing/:id"        element={<BillingRecordPage />} />
                      <Route path="/admin/expenses"           element={<ExpensesPage />} />
                      <Route path="/admin/expenses/:id"       element={<ExpenseRecordPage />} />
                      <Route path="/admin/reports/financial"  element={<FinReportsPage />} />

                      {/* Analytics */}
                      <Route path="/admin/inventory"     element={<InventoryPage />} />
                      <Route path="/admin/inventory/add" element={<InventoryPage autoOpenAdd={true} />} />
                      <Route path="/admin/inventory/:id" element={<MedicineRecordPage />} />
                      <Route path="/admin/lab"           element={<LabPage />} />
                      <Route path="/admin/pharmacy"      element={<PharmacyPage />} />

                      {/* Wards / OPD / IPD */}
                      <Route path="/admin/wards"       element={<WardsBedsPage />} />
                      <Route path="/admin/admissions"  element={<AdmissionsPage />} />
                      <Route path="/admin/opd-queue"   element={<OPDQueuePage />} />

                      {/* Staff / Rosters */}
                      <Route path="/admin/staff/roster" element={<ShiftRosterPage />} />
                      <Route path="/admin/staff/leaves" element={<LeaveManagementPage />} />

                      {/* AI */}
                      <Route path="/admin/ai-agent/logs"     element={<AILogsPage />} />
                      <Route path="/admin/ai-agent/chats"    element={<AIChatsPage />} />
                      <Route path="/admin/ai-agent/config"   element={<AIConfigPage />} />
                      <Route path="/admin/ai-agent/insights" element={<AIInsightsPage />} />

                      {/* Management */}
                      <Route path="/admin/departments"      element={<DepartmentsPage />} />
                      <Route path="/admin/chats"            element={<MessengerPage />} />
                      <Route path="/admin/notifs/send"      element={<AlertsPage />} />
                      <Route path="/admin/security/audit"   element={<AuditPage />} />
                      <Route path="/admin/settings/general" element={<RulesPage />} />
                      <Route path="/admin/settings/gateway" element={<NotificationSettingsPage />} />
                      <Route path="/admin/settings/health"  element={<SystemHealthPage />} />
                      <Route path="/admin/settings"         element={<StructurePage />} />
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
