import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Menu, X, ShieldCheck, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * 🏥 LandingNavbar - Elite Navigation Hub (V2.5)
 * Features: Dynamic 'Command Hub' for authenticated users, Hybrid OS-style mobile menu.
 */
export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Specialists', to: '/specialists' },
    { name: 'Clinical Tech', to: '/clinical-tech' },
    { name: 'Safety', to: '/safety-protocol' },
    { name: 'Reviews', to: '/reviews' }
  ];

  return (
    <>
      {/* 📱 Mobile Menu Overlay - Advanced OS Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-[#ffffff]/60 backdrop-blur-[60px] md:hidden"
          >
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center h-full gap-12 px-12"
            >
              <div className="flex flex-col items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-black text-[#1d1d1f] tracking-tighter hover:text-[#007aff] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="h-[2px] bg-slate-200/50 w-24"></div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="w-full space-y-6"
              >
                {isAuthenticated ? (
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="w-full bg-[#1d1d1f] text-white py-6 rounded-3xl font-black text-xl shadow-2xl active:scale-95 transition-all text-center flex items-center justify-center gap-4">
                        COMMAND HUB <Activity size={24} />
                    </div>
                  </Link>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-bold text-center text-[#1d1d1f] hover:text-[#007aff]">Sign In</Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="w-full bg-[#007aff] text-white py-6 rounded-3xl font-black text-xl shadow-2xl shadow-blue-500/30 active:scale-95 transition-all text-center">
                            JOIN THE CLINIC
                        </div>
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 🚀 Desktop / Tablet Floating Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-6 left-6 right-6 mx-auto max-w-7xl z-[1000] px-6 md:px-8 py-3 md:py-4 rounded-[28px] border transition-all duration-500 ${
          scrolled 
            ? 'glass-panel bg-white/70 shadow-2xl border-white/80' 
            : 'bg-white/20 border-white/60 backdrop-blur-3xl shadow-soft'
        } flex items-center justify-between group overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        <Link to="/" className="flex items-center gap-3 relative z-10 flex-shrink-0">
          <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-[#007aff] rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            <Heart className="text-white" size={18} fill="white" />
          </motion.div>
          <span className="text-xl font-black tracking-tight text-[#1d1d1f] uppercase hidden sm:block">Al Shifaa</span>
        </Link>
        
        {/* Navigation Core */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 relative z-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-[#86868b] hover:text-[#007aff] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Haptic Action Hub */}
        <div className="flex items-center gap-4 relative z-10">
          {!isAuthenticated && (
             <Link to="/login" className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-[#1d1d1f] hover:text-[#007aff] px-4">
                Portal
             </Link>
          )}

          {isAuthenticated ? (
            <Link to="/dashboard">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#1d1d1f] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl flex items-center gap-3"
                >
                    Command Hub <Activity size={14} />
                </motion.div>
            </Link>
          ) : (
            <Link to="/register">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#007aff] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20"
                >
                    Admission
                </motion.div>
            </Link>
          )}

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-12 h-12 bg-white/50 rounded-2xl flex items-center justify-center text-[#1d1d1f] border border-slate-200/50 backdrop-blur-xl"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>
    </>
  );
}
