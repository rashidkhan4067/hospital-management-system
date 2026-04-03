import React from 'react';
import LandingHero from '@/shared/components/common/LandingHero';
import LandingSpecialists from '@/shared/components/common/LandingSpecialists';
import LandingAIAgent from '@/shared/components/common/LandingAIAgent';
import LandingBookingPreview from '@/shared/components/common/LandingBookingPreview';
import LandingStats from '@/shared/components/common/LandingStats';
import LandingProcess from '@/shared/components/common/LandingProcess';
import PageContainer from '@/shared/components/common/PageContainer';
import SEO from '@/shared/components/common/SEO';

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

