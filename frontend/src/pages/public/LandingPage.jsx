import React from 'react';
import LandingHero from '../../components/features/landing/LandingHero';
import LandingSpecialists from '../../components/features/landing/LandingSpecialists';
import LandingAIAgent from '../../components/features/landing/LandingAIAgent';
import LandingBookingPreview from '../../components/features/landing/LandingBookingPreview';
import LandingStats from '../../components/features/landing/LandingStats';
import LandingProcess from '../../components/features/landing/LandingProcess';
import PageContainer from '../../components/common/PageContainer';
import SEO from '../../components/common/SEO';

/**
 * 🏥 Al Shifaa Clinic Landing Page
 * Advanced Refactor: Focused strictly on content. Layout & SEO handled by wrappers.
 */
export default function LandingPage() {
  return (
    <PageContainer 
      title="Modern HMS & Voice AI Node" 
      description="Unified, AI-augmented Hospital Management System for Pakistan. Replacing fragmented manual workflows with voice-driven clinical accessibility."
      maxWidth="full"
      className="p-0!" // Override default padding for landing sections
    >
      <SEO 
        title="AI-Augmented Healthcare & Voice Booking"
        description="Transforming healthcare in developing countries through voice-driven interfaces and unified AI clinic management. Eliminating long queues and scheduling conflicts."
      />
      <LandingHero />
      <LandingSpecialists />
      <LandingAIAgent />
      <LandingBookingPreview />
      <LandingStats />
      <LandingProcess />
    </PageContainer>
  );
}

