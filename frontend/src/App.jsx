import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import PageWrapper from './components/layout/PageWrapper';

// --- NEW MODULAR PAGES ---
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import ConfirmEmailPage from './pages/auth/ConfirmEmailPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import DoctorsPage from './pages/doctors/DoctorsPage';
import AppointmentsPage from './pages/appointments/AppointmentsPage';
import VoicePage from './pages/voice/VoicePage';
import AdminPage from './pages/admin/AdminPage';
import LandingPage from './pages/LandingPage';
import ClinicalTechPage from './pages/tech/ClinicalTechPage';
import SafetyPage from './pages/safety/SafetyPage';
import ClinicalReviewsPage from './pages/reviews/ClinicalReviewsPage';

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
      <AuthProvider>
        <PageWrapper>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
            <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} /> 
            <Route path="/reset-password" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} /> 
            <Route path="/verify-email" element={<PublicRoute><VerifyEmailPage /></PublicRoute>} /> 
            <Route path="/confirm-email" element={<PublicRoute><ConfirmEmailPage /></PublicRoute>} /> 

            {/* PUBLIC INFORMATION PAGES */}
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/specialists" element={<DoctorsPage />} />
            <Route path="/clinical-tech" element={<ClinicalTechPage />} />
            <Route path="/safety-protocol" element={<SafetyPage />} />
            <Route path="/reviews" element={<ClinicalReviewsPage />} />

            {/* PROTECTED ROUTES (Patients/Doctors) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/my-appointments" element={<AppointmentsPage />} />
              <Route path="/voice" element={<VoicePage />} />
              <Route path="/book" element={<Navigate to="/doctors" replace />} /> 
            </Route>

            {/* ADMIN ROUTES (Admin Only) */}
            <Route element={<ProtectedRoute requireAdmin={true} />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageWrapper>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}


