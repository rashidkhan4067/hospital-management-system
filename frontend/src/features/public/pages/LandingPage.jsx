import React from 'react';
import LandingHero from '@/components/composed/LandingHero';
import LandingSpecialists from '@/components/composed/LandingSpecialists';
import LandingAIAgent from '@/components/composed/LandingAIAgent';
import LandingBookingPreview from '@/components/composed/LandingBookingPreview';
import LandingStats from '@/components/composed/LandingStats';
import LandingProcess from '@/components/composed/LandingProcess';
import PageContainer from '@/components/composed/PageContainer';
import SEO from '@/components/composed/SEO';

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

