import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

export default function PageWrapper({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    enter: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="app-layout relative min-h-screen flex flex-col bg-slate-900 text-slate-100 overflow-x-hidden">
      {/* Background gradients or glass effects here if needed */}
      
      {!isAuthenticated ? (
        <AnimatePresence mode="wait">
          <motion.main 
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="flex-1 overflow-y-auto"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      ) : (
        <div className="flex flex-1 overflow-hidden h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col relative overflow-hidden backdrop-blur-3xl">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 mb-20 md:mb-0 transition-all duration-500 ease-in-out">
              <div className="max-w-7xl mx-auto space-y-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={location.pathname}
                    variants={pageVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

