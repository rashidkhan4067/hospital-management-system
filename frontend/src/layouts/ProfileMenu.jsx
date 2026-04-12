import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Shield, LogOut, ChevronDown, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/core/store/useAuthStore';

/**
 * 🧑‍💻 ProfileMenu (MD3 Interactive)
 * Initials circle avatar and interactive profile dropdown.
 */
const ProfileMenu = ({ user }) => {
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);
  
  const initials = user?.name?.split(' ').map(n=>n[0]).join('').toUpperCase() || 'AD';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { label: 'My Bio Profile', icon: UserCircle, action: () => navigate('/profile') },
    { label: 'Switch Operational Role', icon: Shield, action: () => alert('Opening Role Switcher...') },
    { label: 'Intelligence Settings', icon: Settings, action: () => alert('Opening Settings...') },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* 🧑 Avatar Pill */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-1.5 py-1.5 rounded-full transition-all border ${isOpen ? 'bg-[#6750A4]/15 border-[#6750A4]/30' : 'bg-surface hover:bg-surface-variant hover:border-outline border-transparent'}`}
      >
        <div className="w-9 h-9 rounded-full bg-[#EADDFF] flex items-center justify-center text-[#21005D] text-sm font-black shadow-inner">
            {initials}
        </div>
        <div className="hidden lg:flex flex-col items-start pr-3">
             <span className="text-[12px] font-black text-[#1C1B1F] tracking-tight">{user?.name || 'Administrator'}</span>
             <span className="text-[10px] text-[#49454F] font-bold uppercase tracking-widest">{user?.role || 'Director'}</span>
        </div>
        <ChevronDown size={14} className={`text-[#49454F] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* 📂 Dropdown Menu Shell */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-14 w-64 bg-white border border-[#CAC4D0] rounded-[24px] shadow-2xl z-[130] overflow-hidden"
          >
            <div className="p-4 bg-surface border-b border-outline/5 flex flex-col gap-1 items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#EADDFF] flex items-center justify-center text-xl font-black text-[#21005D] shadow-inner mb-2 ring-4 ring-white shadow-xl">
                    {initials}
                </div>
                <span className="text-sm font-black text-[#1C1B1F]">{user?.name || 'Rashid Al Shifaa'}</span>
                <span className="text-xs text-[#49454F] font-medium">{user?.email || 'director@alshifaa.com'}</span>
            </div>

            <div className="p-2 flex flex-col gap-1">
                {menuItems.map((item, i) => (
                    <button 
                        key={i} 
                        onClick={() => { item.action(); setIsOpen(false); }}
                        className="w-full flex items-center gap-3 p-3 hover:bg-[#6750A4]/8 rounded-xl transition-all group"
                    >
                        <item.icon size={18} className="text-[#49454F] group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium text-[#1C1B1F] group-hover:pl-0.5 transition-all">{item.label}</span>
                    </button>
                ))}
                
                <div className="h-px bg-[#CAC4D0]/40 my-1 px-4" />
                
                <button 
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-error/5 text-[#B3261E] rounded-xl transition-all group"
                >
                    <LogOut size={18} />
                    <span className="text-sm font-bold group-hover:pl-0.5 transition-all">Command Logout</span>
                </button>

            </div>
            
            <div className="p-3 bg-surface border-t border-outline/5 flex items-center justify-center opacity-40">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#49454F]">Secure Session 0xF24E</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileMenu;
