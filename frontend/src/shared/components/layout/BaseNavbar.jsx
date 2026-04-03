import React, { useState, useEffect, memo } from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Palette, 
  Command,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/core/auth/AuthContext';
import { useTheme, ACCENT_COLORS } from '@/core/theme/ThemeContext';
import { useUI } from '@/core/ui/UIContext';

import NavbarNotifications from './NavbarNotifications';
import NavbarProfileMenu from './NavbarProfileMenu';

/**
 * 🍏 BaseNavbar: The Central Command Hub for Admin & App Sections
 * Features: Deep Search, Multi-Theme Control, Live Notifications, Global Profile, and Responsive Toggles.
 */
const BaseNavbar = memo(() => {
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
        <NavbarNotifications 
          notifications={notifications}
          isOpen={isNotificationsOpen}
          onToggle={() => {
            setIsNotificationsOpen(!isNotificationsOpen);
            setIsThemeOpen(false);
            setIsProfileOpen(false);
          }}
        />

        {/* 🏔 Divider */}
        <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1 md:mx-2" />

        {/* 👤 Identity Hub */}
        <NavbarProfileMenu
          user={user}
          logout={logout}
          isOpen={isProfileOpen}
          onToggle={() => {
            setIsProfileOpen(!isProfileOpen);
            setIsThemeOpen(false);
            setIsNotificationsOpen(false);
          }}
          close={() => setIsProfileOpen(false)}
        />

      </div>
    </header>
  );
});

export default BaseNavbar;
