import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Mic, Settings, HeartPulse, UserCircle } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="sidebar h-full w-64 glass-panel border-r border-white/5 py-8 px-4 flex flex-col gap-8 transition-all relative z-40">
      <div className="sidebar-brand flex items-center gap-2 px-2 text-primary font-extrabold text-2xl tracking-tighter">
        <HeartPulse className="text-secondary" /> Nova
      </div>

      <nav className="sidebar-links flex flex-col gap-2">
        <SidebarLink to="/dashboard" icon={LayoutDashboard}>Dashboard</SidebarLink>
        <SidebarLink to="/doctors" icon={Users}>Doctors</SidebarLink>
        <SidebarLink to="/my-appointments" icon={Calendar}>Appointments</SidebarLink>
        <SidebarLink to="/voice" icon={Mic}>Sana AI</SidebarLink>
      </nav>

      <div className="sidebar-footer mt-auto flex flex-col gap-2 pt-8 border-t border-white/5">
        <SidebarLink to="/profile" icon={UserCircle}>My Profile</SidebarLink>
        <SidebarLink to="/settings" icon={Settings}>Settings</SidebarLink>
      </div>
    </aside>
  );
}

function SidebarLink({ to, icon: Icon, children }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive 
          ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30 shadow-blue-600/10' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'}`
      }
    >
      <Icon size={20} />
      <span>{children}</span>
    </NavLink>
  );
}
