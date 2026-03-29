import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Stethoscope, LayoutDashboard, UserPlus, LogOut, Mic } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/doctors', label: 'Book Appointment', icon: <UserPlus size={20} /> },
  ];

  return (
    <nav className="navbar-glass">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <div className="brand-icon">
            <Stethoscope size={28} color="#6366f1" />
          </div>
          <span className="brand-text">Nova<span className="text-gradient">Health</span> AI</span>
        </Link>
        
        <div className="navbar-links">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        
        <div className="navbar-actions">
          <button className="btn btn-glass voice-btn" onClick={() => alert('AI Voice Assistant coming soon!')}>
            <Mic size={20} />
            <span>AI Assist</span>
          </button>
          <button className="btn btn-glass logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
