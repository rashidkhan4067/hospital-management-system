import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * PublicLayout: Full-Width Layout with standard Navbar & Footer
 */
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-bg-base transition-colors duration-500 overflow-x-hidden selection:bg-blue-100">
      {/* 🔮 Background Decoration Components */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[300px] h-[300px] bg-cyan-400/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-indigo-500/3 blur-[150px] rounded-full" />
      </div>

      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
