import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/core/auth/AuthContext';
import { LogOut, Bell, Heart, Menu, X, Activity, User, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 *  Ultra Premium Apple-Style Navbar
 * Focus: Glassmorphism, Floating Pill Design, Minimalist Sophistication.
 */
export default function Navbar() {
  const { user, logout, role, isAuthenticated } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const publicPaths = ['/', '/doctors', '/specialists', '/clinical-tech', '/safety-protocol', '/reviews'];
  const isPublic = publicPaths.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Specialists', to: '/specialists' },
    { name: 'Technology', to: '/clinical-tech' },
    { name: 'Safety', to: '/safety-protocol' },
    { name: 'Reviews', to: '/reviews' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] w-full flex justify-center transition-all duration-500 ${
      scrolled ? 'pt-4' : 'pt-0'
    }`}>
      {/* 🧊 Glass Container */}
      <div className={`transition-all duration-700 ease-[0.16, 1, 0.3, 1] relative flex items-center justify-between ${
        scrolled 
          ? 'w-[95%] max-w-6xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-slate-800/50 rounded-[28px] px-8 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)]' 
          : 'w-full bg-transparent border-transparent px-12 py-8'
      }`}>
        
        {/* 🏥 Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-blue-600 rounded-[11px] flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
             <Heart size={18} fill="white" className="text-white" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-slate-900 dark:text-white font-bold text-lg tracking-tight">Al Shifaa</span>
            <span className="text-[9px] font-bold text-blue-600 tracking-widest uppercase opacity-70">Clinical Node</span>
          </div>
        </Link>

        {/* 🧭 Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.to} 
              className="relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 rounded-full transition-all group-hover:w-full opacity-0 group-hover:opacity-100"></span>
            </Link>
          ))}
        </div>

        {/* ⚡ Action Buttons */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Link to="/dashboard" className="flex items-center gap-3 group">
               <div className="text-right hidden sm:block">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{role}</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.email?.split('@')[0]}</p>
               </div>
               <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full p-0.5 border border-white/50 dark:border-slate-700 active:scale-95 transition-all overflow-hidden">
                  <img src={`https://ui-avatars.com/api/?name=${user?.email || 'User'}&background=2563eb&color=fff&bold=true`} className="rounded-full" alt="User" />
               </div>
            </Link>
          ) : (
            <>
              <Link to="/login" className="hidden sm:block text-sm font-semibold text-slate-900 dark:text-white hover:opacity-70 transition-opacity">
                Sign In
              </Link>
              <Link to="/register">
                <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 h-10 rounded-full text-sm font-bold shadow-lg shadow-slate-900/10 active:scale-95 transition-all">
                  Join Al Shifaa
                </button>
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu Overlay - Ultra Glass */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl rounded-[32px] p-8 border border-white/20 dark:border-slate-800/50 shadow-2xl z-[999] md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.to} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-slate-100 dark:border-slate-800" />
              {!isAuthenticated && (
                <div className="flex flex-col gap-4">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-slate-500">Sign In</Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full bg-blue-600 text-white h-14 rounded-2xl font-bold">Get Started</button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
