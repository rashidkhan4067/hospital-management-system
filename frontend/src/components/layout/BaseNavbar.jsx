import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Palette, 
  LogOut, 
  User, 
  ChevronDown,
  Sparkles,
  Command,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme, ACCENT_COLORS } from '../../context/ThemeContext';
import { useUI } from '../../context/UIContext';

/**
 * 🍏 BaseNavbar: The Central Command Hub for Admin & App Sections
 * Features: Deep Search, Multi-Theme Control, Live Notifications, Global Profile, and Responsive Toggles.
 */
const BaseNavbar = () => {
  const { user, logout, role } = useAuth();
  const { theme, toggleTheme, changeAccent, accentColor } = useTheme();
  const { notifications, isMobileMenuOpen, toggleMobileMenu } = useUI();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // 🍎 Meta-K Shortcut Logic
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl transition-all duration-500 px-4 md:px-6 py-3 flex items-center justify-between">
      
      {/* 📱 Mobile Menu Toggle */}
      <button 
        onClick={toggleMobileMenu}
        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors mr-2"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* 🔍 Dynamic Search Node */}
      <div className="flex-1 max-w-xl group relative hidden md:block">
        <div className={`relative flex items-center transition-all duration-300 ${
          searchFocused ? 'scale-[1.01]' : ''
        }`}>
          <Search 
            size={16} 
            className={`absolute left-4 transition-colors duration-300 ${
              searchFocused ? 'text-blue-600' : 'text-slate-400'
            }`} 
          />
          <input
            id="global-search"
            type="text"
            placeholder="Search records, patients, or notes..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full h-10 pl-11 pr-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-medium focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all placeholder:text-slate-400/60 shadow-sm"
          />
          {/*  Shortcut Hint */}
          <div className="absolute right-4 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white border border-slate-200 dark:bg-white/5 dark:border-white/10 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
            <Command size={10} />
            <span className="text-[10px] font-bold">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 md:gap-2 ml-auto">
        
        {/* 🎨 Theme Toolkit */}
        <div className="relative">
          <button 
            onClick={() => {
              setIsThemeOpen(!isThemeOpen);
              setIsNotificationsOpen(false);
              setIsProfileOpen(false);
            }}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors relative group"
          >
            <Palette size={18} className="text-slate-500 group-hover:text-slate-900 transition-colors" />
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 bg-blue-600" style={{ backgroundColor: accentColor }}></span>
          </button>

          <AnimatePresence>
            {isThemeOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-14 right-0 w-72 p-6 glass-card z-[100] origin-top-right shadow-[0_20px_50px_rgba(37,99,235,0.15)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">App Appearance</span>
                </div>
                
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500/60">Accent Palette</span>
                  <div className="grid grid-cols-5 gap-2">
                    {ACCENT_COLORS.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => changeAccent(color.value)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 active:scale-95 ${
                          accentColor === color.value ? 'border-slate-900 dark:border-white' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color.value }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 🔔 Notifications */}
        <div className="relative">
          <button 
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsThemeOpen(false);
              setIsProfileOpen(false);
            }}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors relative group"
          >
            <Bell size={18} className="text-slate-500 group-hover:text-slate-900 transition-colors" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-sm animate-in zoom-in duration-300">
                {notifications.length}
              </span>
            )}
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-14 right-0 w-80 glass-card z-[100] origin-top-right shadow-[0_20px_50px_rgba(37,99,235,0.15)]"
              >
                <div className="p-4 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
                  <h3 className="text-xs font-black uppercase italic tracking-tight">Clinical Alerts</h3>
                  <span className="px-2 py-0.5 rounded-full bg-blue-600/10 text-blue-600 text-[10px] font-black uppercase">
                    {notifications.length} Nodes
                  </span>
                </div>
                
                <div className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div key={n.id} className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group cursor-default">
                        <div className="flex gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                            n.type === 'error' ? 'bg-red-500' : 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]'
                          }`} />
                          <div>
                            <p className="text-[11px] font-black translate-y-[-1px] text-slate-900 dark:text-white uppercase leading-tight italic">{n.message}</p>
                            <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest leading-none">Just now • Gate-L01 Shard</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 flex flex-col items-center justify-center gap-4 opacity-40">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                        <Bell size={20} />
                      </div>
                      <p className="text-[9px] font-black uppercase tracking-[0.3em]">No Active Alerts</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 🏔 Divider */}
        <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1 md:mx-2" />

        {/* 👤 Identity Hub */}
        <div className="relative">
          <button 
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsThemeOpen(false);
              setIsNotificationsOpen(false);
            }}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300"
          >
            <div className="w-9 h-9 rounded-xl bg-accent-primary/10 border border-accent-primary/20 p-0.5 shadow-sm overflow-hidden shrink-0">
               <img 
                 src={`https://ui-avatars.com/api/?name=${user?.email || 'User'}&background=transparent&color=0f172a&bold=true`} 
                 className="w-full h-full rounded-lg object-cover" 
                 alt="pfp" 
               />
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-500 hidden sm:block ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-14 right-0 w-64 glass-card z-[100] origin-top-right shadow-[0_20px_50px_rgba(37,99,235,0.15)]"
              >
                 <div className="p-4 bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/10">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Authenticated Shard</p>
                    <p className="text-xs font-black text-slate-900 dark:text-white truncate uppercase italic">{user?.email}</p>
                 </div>
                 <div className="p-2">
                    <Link 
                      to="/admin/profile" 
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-[11px] font-black uppercase italic group dark:text-white"
                    >
                       <User size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors" /> Profile Control
                    </Link>
                    <button onClick={logout} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors text-[11px] font-black uppercase italic group">
                       <LogOut size={14} className="group-hover:rotate-12 transition-transform" /> Sign Out Shard
                    </button>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
};

export default BaseNavbar;
