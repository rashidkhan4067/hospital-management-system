import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Menu Overlay - Advanced OS Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[#ffffff]/60 backdrop-blur-[60px] md:hidden"
          >
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center h-full gap-12 px-12"
            >
              {[
                { name: 'Specialists', to: '/specialists' },
                { name: 'Clinical Tech', to: '/clinical-tech' },
                { name: 'Safety', to: '/safety-protocol' },
                { name: 'Reviews', to: '/reviews' }
              ].map((link, idx) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-black text-[#1d1d1f] tracking-tighter hover:text-[#007aff] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-[2px] bg-slate-200/50 w-24"></div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="w-full space-y-6"
              >
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-bold text-center text-[#1d1d1f] hover:text-[#007aff]">Sign In</Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="w-full bg-[#007aff] text-white py-6 rounded-3xl font-black text-xl shadow-2xl shadow-blue-500/30 active:scale-95 transition-all text-center">
                        JOIN THE CLINIC
                    </div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
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
        {/* Liquid Reflection Effect */}
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
        
        {/* Desktop Links - EXPERT REVENUE/TRUST CENTERED */}
        <div className="nav-links-desktop !hidden md:!flex items-center gap-6 lg:gap-8 relative z-10">
          {[
            { name: 'Specialists', to: '/specialists' },
            { name: 'Clinical Tech', to: '/clinical-tech' },
            { name: 'Safety', to: '/safety-protocol' },
            { name: 'Reviews', to: '/reviews' }
          ].map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-xs font-black uppercase tracking-widest text-[#1d1d1f]/80 hover:text-[#007aff] transition-colors whitespace-nowrap px-2"
            >
              {link.name}
            </Link>
          ))}
          <div className="w-[1px] h-6 bg-slate-300 mx-2 flex-shrink-0"></div>
          <Link to="/login" className="text-xs font-black uppercase tracking-widest text-[#1d1d1f] hover:text-[#007aff] transition-colors whitespace-nowrap">LOG IN</Link>
          <Link to="/register" className="flex-shrink-0">
              <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 122, 255, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#007aff] text-white px-6 lg:px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap"
              >
                  JOIN CLINIC
              </motion.div>
          </Link>
        </div>

        {/* Modern Animated Hamburger */}
        <div className="md:hidden flex items-center relative z-10 flex-shrink-0">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-4 flex flex-col gap-1.5 focus:outline-none group"
          >
            <motion.span 
                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-[#1d1d1f] rounded-full transition-all"
            />
            <motion.span 
                animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="w-4 h-0.5 bg-[#1d1d1f] rounded-full transition-all"
            />
            <motion.span 
                animate={isMobileMenuOpen ? { rotate: -45, y: -8, w: 24 } : { rotate: 0, y: 0, w: 16 }}
                className={`h-0.5 bg-[#1d1d1f] rounded-full transition-all ${isMobileMenuOpen ? 'w-6' : 'w-4'}`}
            />
          </button>
        </div>
      </motion.nav>
    </>
  );
}
