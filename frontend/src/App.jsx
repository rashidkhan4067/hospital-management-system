import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from './context/ThemeContext';
import { UIProvider } from './context/UIContext';

// Components & Context
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import PageLoader from './components/common/Loading';
import { useAuth } from './context/AuthContext';

// Layouts (Advanced Routing Architecture)
import PublicLayout from './components/layout/PublicLayout';
import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';

// --- LAZY-LOADED PAGES ---
const DashboardDispatcher = lazy(() => import('./pages/DashboardDispatcher'));
const AdminDashboard = lazy(() => import('./pages/admin/dashboard/Dashboard'));
const AdminUsers = lazy(() => import('./pages/admin/users/Users'));
const AdminAddUser = lazy(() => import('./pages/admin/users/AddUser'));
const AdminPatients = lazy(() => import('./pages/admin/patients/Patients'));
const AdminAddPatient = lazy(() => import('./pages/admin/patients/AddPatient'));
const AdminPatientRecord = lazy(() => import('./pages/admin/patients/PatientRecord'));
const AdminAppointments = lazy(() => import('./pages/admin/patients/Appointments'));
const AdminFinances = lazy(() => import('./pages/admin/dashboard/Finances'));
const AdminInventory = lazy(() => import('./pages/admin/analytics/Inventory'));
const AdminStaff = lazy(() => import('./pages/admin/users/Staff'));
const AdminDoctors = lazy(() => import('./pages/admin/doctors/Doctors'));
const AdminAddDoctor = lazy(() => import('./pages/admin/doctors/AddDoctor'));
const AdminDoctorSchedule = lazy(() => import('./pages/admin/doctors/DoctorSchedule'));
const AdminSpecializations = lazy(() => import('./pages/admin/doctors/Specializations'));
const AdminLab = lazy(() => import('./pages/admin/analytics/Lab'));
const AdminPharmacy = lazy(() => import('./pages/admin/analytics/Pharmacy'));
const AdminAILogs = lazy(() => import('./pages/admin/ai-agent/AILogs'));
const AdminAIChats = lazy(() => import('./pages/admin/ai-agent/AIChats'));
const AdminChat = lazy(() => import('./pages/admin/dashboard/AdminChat'));
const AdminAIConfig = lazy(() => import('./pages/admin/ai-agent/AIConfig'));
const AdminRoles = lazy(() => import('./pages/admin/users/Roles'));
const AdminDepartments = lazy(() => import('./pages/admin/management/Departments'));
const AdminAnalytics = lazy(() => import('./pages/admin/dashboard/Stats'));
const AdminAlerts = lazy(() => import('./pages/admin/management/Alerts'));
const AdminAudit = lazy(() => import('./pages/admin/management/Audit'));
const AdminRules = lazy(() => import('./pages/admin/management/Rules'));
const AdminSettings = lazy(() => import('./pages/admin/management/Structure'));
const AdminProfile = lazy(() => import('./pages/admin/profile/Profile'));
const LandingPage = lazy(() => import('./pages/public/LandingPage'));
const DoctorsPage = lazy(() => import('./pages/public/DoctorsPage'));
const ClinicalTechPage = lazy(() => import('./pages/public/ClinicalTechPage'));
const SafetyPage = lazy(() => import('./pages/public/SafetyPage'));
const ClinicalReviewsPage = lazy(() => import('./pages/public/ClinicalReviewsPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('./pages/auth/VerifyEmailPage'));
const ConfirmEmailPage = lazy(() => import('./pages/auth/ConfirmEmailPage'));
const AppointmentsPage = lazy(() => import('./pages/appointments/AppointmentsPage'));
const SanaAIPage = lazy(() => import('./pages/ai/SanaAIPage'));

// --- ROUTE WRAPPERS ---
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
          <Suspense fallback={<PageLoader />}>
            <Routes>
              
              {/* 🔐 AUTH ROUTES (Centered Layout) */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
                <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} /> 
                <Route path="/reset-password" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} /> 
                <Route path="/verify-email" element={<PublicRoute><VerifyEmailPage /></PublicRoute>} /> 
                <Route path="/confirm-email" element={<PublicRoute><ConfirmEmailPage /></PublicRoute>} /> 
              </Route>

              {/* 🌐 PUBLIC INFORMATION ROUTES (Navbar + Footer Layout) */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/specialists" element={<DoctorsPage />} />
                <Route path="/clinical-tech" element={<ClinicalTechPage />} />
                <Route path="/safety-protocol" element={<SafetyPage />} />
                <Route path="/reviews" element={<ClinicalReviewsPage />} />
              </Route>

              {/* 🏥 PROTECTED APP ROUTES (Sidebar + Navbar Layout) */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<DashboardDispatcher />} />
                  <Route path="/my-appointments" element={<AppointmentsPage />} />
                  <Route path="/sana-ai" element={<SanaAIPage />} />
                  <Route path="/book" element={<Navigate to="/doctors" replace />} /> 

                  {/* ADMIN-ONLY SUB-SECTION */}
                  <Route element={<ProtectedRoute requireAdmin={true} />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/chats" element={<AdminChat />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/users/add" element={<AdminAddUser />} />
                    <Route path="/admin/patients" element={<AdminPatients />} />
                    <Route path="/admin/patients/add" element={<AdminAddPatient />} />
                    <Route path="/admin/patients/:id" element={<AdminPatientRecord />} />
                    <Route path="/admin/appointments" element={<AdminAppointments />} />
                    <Route path="/admin/finances" element={<AdminFinances />} />
                    <Route path="/admin/inventory" element={<AdminInventory />} />
                    <Route path="/admin/staff" element={<AdminStaff />} />
                    <Route path="/admin/doctors" element={<AdminDoctors />} />
                    <Route path="/admin/doctors/add" element={<AdminAddDoctor />} />
                    <Route path="/admin/doctors/schedule" element={<AdminDoctorSchedule />} />
                    <Route path="/admin/doctors/specialty" element={<AdminSpecializations />} />
                    <Route path="/admin/lab" element={<AdminLab />} />
                    <Route path="/admin/pharmacy" element={<AdminPharmacy />} />
                    <Route path="/admin/ai-agent/logs" element={<AdminAILogs />} />
                    <Route path="/admin/ai-agent/config" element={<AdminAIConfig />} />
                    <Route path="/admin/ai-agent/chats" element={<AdminAIChats />} />
                    <Route path="/admin/roles" element={<AdminRoles />} />
                    <Route path="/admin/departments" element={<AdminDepartments />} />
                    <Route path="/admin/analytics" element={<AdminAnalytics />} />
                    <Route path="/admin/notifs/send" element={<AdminAlerts />} />
                    <Route path="/admin/security/audit" element={<AdminAudit />} />
                    <Route path="/admin/settings/general" element={<AdminRules />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                    <Route path="/admin/profile" element={<AdminProfile />} />
                  </Route>
                </Route>
              </Route>

              {/* 🔄 FALLBACKS */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </UIProvider>
    </GoogleOAuthProvider>
  );
}

