import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Bell } from 'lucide-react';
import { Button } from '../ui';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar glass-panel py-4 px-8 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="logo flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white uppercase shadow-lg shadow-blue-500/20">
           <Heart size={16} fill="white" className="text-white" />
        </div>
        <span className="text-gradient font-black text-xl tracking-tighter uppercase">Al Shifaa</span>
      </Link>

      <div className="nav-actions flex items-center gap-6">
        <button className="text-secondary hover:text-primary transition-colors">
          <Bell size={20} />
        </button>
        
        <div className="user-profile flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{user?.role || 'Patient'}</p>
            <p className="text-sm font-semibold">{user?.email?.split('@')[0] || 'User'}</p>
          </div>
          <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center border border-white/10">
            <User size={20} />
          </div>
        </div>

        <Button variant="social" onClick={logout} className="p-2 min-w-0">
          <LogOut size={18} />
        </Button>
      </div>
    </nav>
  );
}
