import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';
import Footer from './Footer';

/**
 * PublicLayout: Full-Width Layout with standard Navbar & Footer
 */
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white transition-colors duration-500 overflow-x-hidden selection:bg-blue-100">
      
      <PublicNavbar />
      <main className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
