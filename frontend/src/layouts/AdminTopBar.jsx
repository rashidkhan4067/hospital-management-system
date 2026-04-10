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
        ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-md ring-1 ring-[#CAC4D0]/10' : 'bg-[#FEF7FF]'}
        border-b border-[#CAC4D0]/40
      `}
    >

      {/* 🏥 Left: Brand Identity Cluster */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-full hover:bg-[#6750A4]/5 transition-colors text-[#49454F]"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-[#6750A4] flex items-center justify-center text-white text-xl font-black shadow-lg shadow-[#6750A4]/20 transition-transform group-hover:scale-110">
              S
            </div>
            <div className="hidden sm:flex flex-col">
              <h1 className="text-[22px] font-bold tracking-tight leading-none text-[#6750A4]" style={{ fontFamily: '"Google Sans Display", sans-serif' }}>
                Shifaa HMS
              </h1>
              <span className="text-[12px] font-bold text-[#49454F] tracking-widest uppercase opacity-60">
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
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#6750A4]/5 text-[#49454F]"
        >
          <SearchIcon size={20} />
        </button>

        <NotificationBell />

        <button className="hidden sm:flex w-12 h-12 items-center justify-center rounded-full text-[#49454F] hover:bg-[#49454F]/8 transition-all relative">
          <Settings size={22} strokeWidth={2} />
        </button>

        <div className="h-8 w-px bg-[#CAC4D0]/60 mx-1 hidden xs:block" />

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
            <button onClick={() => setMobileSearchOpen(false)} className="p-2 text-[#49454F]">
              <X size={20} />
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
