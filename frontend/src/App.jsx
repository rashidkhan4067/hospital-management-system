import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import PageWrapper from './components/layout/PageWrapper';

// --- NEW MODULAR PAGES ---
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import DoctorsPage from './pages/doctors/DoctorsPage';
import AppointmentsPage from './pages/appointments/AppointmentsPage';
import VoicePage from './pages/voice/VoicePage';
import AdminPage from './pages/admin/AdminPage';

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
    <AuthProvider>
      <PageWrapper>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} /> 

          {/* PROTECTED ROUTES (Patients/Doctors) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/my-appointments" element={<AppointmentsPage />} />
            <Route path="/voice" element={<VoicePage />} />
            <Route path="/book" element={<Navigate to="/doctors" replace />} /> 
          </Route>

          {/* ADMIN ROUTES (Admin Only) */}
          <Route element={<ProtectedRoute requireAdmin={true} />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/stats" element={<Navigate to="/admin" replace />} />
            <Route path="/admin/doctors" element={<Navigate to="/admin" replace />} />
            <Route path="/admin/appointments" element={<Navigate to="/admin" replace />} />
          </Route>

          {/* DEFAULT REDIRECTS */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </PageWrapper>
    </AuthProvider>
  );
}


