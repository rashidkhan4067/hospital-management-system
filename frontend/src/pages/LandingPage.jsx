import React from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import LandingHero from '../components/landing/LandingHero';
import LandingSpecialists from '../components/landing/LandingSpecialists'; 
import LandingAIAgent from '../components/landing/LandingAIAgent';
import LandingBookingPreview from '../components/landing/LandingBookingPreview'; // NEW
import LandingStats from '../components/landing/LandingStats';
import LandingProcess from '../components/landing/LandingProcess';
import LandingFooter from '../components/landing/LandingFooter';

/**
 * 🏥 Al Shifaa Clinic Landing Page
 * Modularized for premium performance and Apple OS-like advanced UI.
 */
export default function LandingPage() {
  return (
    <div className="landing-wrapper bg-[#ffffff] relative selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* 🧊 Core Layout Components */}
      <LandingNavbar />
      
      <main>
        <LandingHero />
        <LandingSpecialists />   {/* Technical: Database Specialists */}
        <LandingAIAgent />      {/* Practical: User AI Agent */}
        <LandingBookingPreview /> {/* Dashboard Proof: UI demonstration */}
        <LandingStats />         {/* Validation: Atomic locking data */}
        <LandingProcess />       {/* Infrastructure: Three-tier flow */}
      </main>

      <LandingFooter />

      {/* Decorative Blur Overlays (Global) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-20 opacity-20">
         <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-blue-500 blur-[180px] rounded-full"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-400 blur-[150px] rounded-full"></div>
      </div>
    </div>
  );
}
