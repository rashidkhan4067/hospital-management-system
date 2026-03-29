import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Public Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';

// Protected Pages (Patients/Common)
import Dashboard from './pages/Dashboard/Dashboard';
import Doctors from './pages/Booking/Doctors';
import MyAppointments from './pages/Dashboard/MyAppointments';

// Admin Pages
import AdminStats from './pages/Admin/AdminStats';
import AdminDoctors from './pages/Admin/AdminDoctors';
import AdminAppointments from './pages/Admin/AdminAppointments';

// Voice Module
import VoiceAssistant from './components/features/VoiceAssistant/VoiceAssistant';

// Public Route Wrapper (Redirects if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuth();
  if (isAuthenticated) {
    return role === 'admin' ? <Navigate to="/admin/stats" replace /> : <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <VoiceAssistant />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />
        <Route 
          path="/forgot-password" 
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          } 
        />

        {/* PROTECTED ROUTES (Requires JWT) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/book" element={<Navigate to="/doctors" replace />} /> {/* Alias to /doctors */}
          <Route path="/my-appointments" element={<MyAppointments />} />
        </Route>

        {/* ADMIN ROUTES (Requires JWT + Admin Role) */}
        <Route element={<ProtectedRoute requireAdmin={true} />}>
          <Route path="/admin/stats" element={<AdminStats />} />
          <Route path="/admin/doctors" element={<AdminDoctors />} />
          <Route path="/admin/appointments" element={<AdminAppointments />} />
        </Route>

        {/* DEFAULT CATCH-ALL */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}
