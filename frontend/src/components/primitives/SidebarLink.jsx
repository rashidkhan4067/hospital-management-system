import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SidebarLink({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
        ${isActive 
          ? 'bg-[#E8F0FE] text-[#1967D2]' 
          : 'text-slate-600 hover:bg-slate-50'}
      `}
    >
      {Icon && <Icon size={20} />}
      <span>{label}</span>
    </NavLink>
  );
}
