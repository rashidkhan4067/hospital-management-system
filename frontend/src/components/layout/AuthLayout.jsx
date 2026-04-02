import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

/**
 * AuthLayout: Concentrated Centered Layout for Authentication Pages
 */
const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-bg-base transition-colors duration-500 overflow-x-hidden selection:bg-blue-100">
      {/* 🔮 Background Decoration Components */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[20%] -right-[50%] w-[1200px] h-[1200px] bg-blue-500/5 blur-[250px] rounded-full" />
        <div className="absolute -bottom-[20%] -left-[50%] w-[1200px] h-[1200px] bg-indigo-500/5 blur-[250px] rounded-full" />
      </div>

      <nav className="flex items-center justify-between px-8 lg:px-14 py-8 absolute top-0 w-full z-50">
        <div className="text-2xl font-bold flex items-center gap-3 tracking-tighter">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20">
             <span className="text-white text-xl">🏥</span>
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            Al Shifaa
          </span>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10 w-full max-w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AuthLayout;
