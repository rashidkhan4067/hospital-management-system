import React, { useState, useEffect } from 'react';
import { Settings, Search as SearchIcon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalSearch from './GlobalSearch';
import NotificationBell from './NotificationBell';
import ProfileMenu from './ProfileMenu';
import { useAuthStore } from '@/core/store/useAuthStore';
import { useUIStore } from '@/core/store/useUIStore';
import { IconButton } from '@/components/primitives';

/**
 * 🛰️ AdminTopBar (MD3 Specification)
 * A fully responsive, sticky top navigation bar for the Shifaa admin dashboard.
 * Features Elevation Level 2 shadow on scroll and refined MD3 identity.
 */
const AdminTopBar = () => {
  const user = useAuthStore(state => state.user);
  const toggleSidebar = useUIStore(state => state.toggleSidebar);
  const toggleMobileMenu = useUIStore(state => state.toggleMobileMenu);

  const [scrolled, setScrolled] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Elevation Level 2 Shadow on Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        sticky top-0 z-[100] h-[72px] w-full flex items-center justify-between px-6 transition-all duration-300
        ${scrolled ? 'bg-surface-bright/90 backdrop-blur-xl elev-2 ring-1 ring-outline-variant/20' : 'bg-surface-bright'}
        border-b border-outline-variant/40
      `}
      aria-label="Admin navigation"
    >

      {/* 🏥 Left: Brand Identity Cluster */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMobileMenu}
            aria-label="Open navigation menu"
            aria-expanded={false}
            aria-haspopup="dialog"
            className="lg:hidden icon-btn text-text-sub hover:bg-primary/5"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white text-xl font-black shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              S
            </div>
            <div className="hidden sm:flex flex-col">
              <h1 className="text-[22px] font-bold tracking-tight leading-none text-primary" style={{ fontFamily: '"Google Sans Display", sans-serif' }}>
                Shifaa HMS
              </h1>
              <span className="text-[12px] font-bold text-text-sub tracking-widest uppercase opacity-60">
                Admin Panel
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* 🔍 Center: MD3 Intelligence Search Bar */}
      <div className="hidden md:flex flex-1 justify-center px-8 relative">
        <GlobalSearch />
      </div>

      {/* ⚡ Right: Action Framework Cluster */}
      <div className="flex items-center gap-2">
        {/* Mobile Search Overlay Trigger */}
        <button
          onClick={() => setMobileSearchOpen(true)}
          aria-label="Open search"
          className="md:hidden icon-btn text-text-sub hover:bg-primary/5"
        >
          <SearchIcon size={20} aria-hidden="true" />
        </button>

        <NotificationBell />

        <button
          aria-label="Open settings"
          className="hidden sm:flex icon-btn text-text-sub hover:bg-text-sub/8"
        >
          <Settings size={22} strokeWidth={2} aria-hidden="true" />
        </button>

        <div className="h-8 w-px bg-outline-variant/60 mx-1 hidden xs:block" />

        <ProfileMenu user={user} />
      </div>

      {/* 📱 Mobile Full-Width Search Overlay */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            className="absolute inset-0 bg-white z-[200] flex items-center px-4 gap-4"
          >
            <button
              onClick={() => setMobileSearchOpen(false)}
              aria-label="Close search"
              className="icon-btn text-text-sub"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <div className="flex-grow">
              <GlobalSearch isMobile={true} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default AdminTopBar;
