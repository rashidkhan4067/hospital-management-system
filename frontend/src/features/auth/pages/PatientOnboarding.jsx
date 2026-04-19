import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/core/store/useAuthStore';
import { Button } from '@/components/primitives';
import { completeOnboarding } from '../api/patientService';
// Modular Step Components
import IdentityStep from './steps/IdentityStep';
import ClinicalStep from './steps/ClinicalStep';
import EmergencyStep from './steps/EmergencyStep';
import ConsentStep from './steps/ConsentStep';
import WelcomeStep from './steps/WelcomeStep';

/**
 * 🏥 PatientOnboarding - Modular Clinical Shell
 * Synchronized with Al Shifaa backend and international health standards.
 */
export default function PatientOnboarding() {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // Start at Welcome (Step 0)
  const totalSteps = 4; // 1-4 for forms, 0 is welcome
  const [loading, setLoading] = useState(false);

  // Early exit if onboarding is already finalized
  React.useEffect(() => {
    if (user?.onboarding_completed) {
        navigate('/patient/home');
    }
  }, [user, navigate]);

  // Derive initial values from potential session state
  const [formData, setFormData] = useState({
    fullName: user?.full_name || "",
    email: user?.email || "",
    phone: user?.phone_number || "",
    countryCode: '+1',
    dob: '',
    gender: '',
    allergies: '',
    chronicConditions: '',
    currentMedications: '',
    bloodGroup: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    address: '',
    consented: false
  });

  const isGoogleUser = user?.auth_provider === 'google' || !!user?.picture;

  const handleNext = (e) => {
    e.preventDefault();
    if (step < totalSteps) {
        setStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        handleFinalSubmit();
    }
  };

  const handleBack = () => setStep(prev => prev - 1);

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
        const updatedUser = await completeOnboarding(formData);
        setUser({ ...user, ...updatedUser, onboarding_completed: true });
        navigate('/patient/home');
    } catch (error) {
        console.error("Clinical provisioning failed:", error);
    } finally {
        setLoading(false);
    }
  };

  const progressLabels = [
    "Identity Verification",
    "Clinical Baseline",
    "Emergency Contact",
    "Consent & Finalize"
  ];

  const renderStep = () => {
    const props = { formData, setFormData, isGoogleUser, user };
    switch(step) {
        case 0: return <WelcomeStep {...props} />;
        case 1: return <IdentityStep {...props} />;
        case 2: return <ClinicalStep {...props} />;
        case 3: return <EmergencyStep {...props} />;
        case 4: return <ConsentStep {...props} />;
        default: return null;
    }
  };

  return (
    <div className="min-h-screen shifaa-portal-bg flex flex-col items-center justify-center font-['Inter',sans-serif] antialiased selection:bg-[#E8F0FE] py-12 md:py-20">
      
      <header className="w-full max-w-[448px] mb-8 flex justify-between items-center px-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#4285F4] flex items-center justify-center text-white font-bold text-xl shadow-sm">S</div>
          <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tight text-[#202124]">Shifaa HMS</span>
              <span className="text-[9px] font-bold text-[#5f6368] uppercase tracking-[0.1em] -mt-1 opacity-70">Clinical Network</span>
          </div>
        </div>

        {isGoogleUser && (
          <div className="flex items-center gap-2 py-1 pl-1.5 pr-3 bg-white border border-[#DADCE0] rounded-full shadow-sm scale-90 origin-right">
              <div className="w-5 h-5 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 18 18">
                      <path d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.12-.84 2.07-1.79 2.7l2.85 2.2c1.67-1.53 2.63-3.79 2.63-6.54z" fill="#4285F4"/>
                      <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.85-2.2c-.79.53-1.8.84-3.11.84-2.39 0-4.41-1.61-5.13-3.78H.95v2.3C2.43 15.84 5.49 18 9 18z" fill="#34A853"/>
                      <path d="M3.87 10.68c-.18-.53-.28-1.1-.28-1.68s.1-1.15.28-1.68V5.02H.95C.34 6.22 0 7.57 0 9s.34 2.78.95 3.98l2.92-2.3z" fill="#FBBC05"/>
                      <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.89 11.43 0 9 0 5.49 0 2.43 2.16.95 5.02l2.92 2.3c.72-2.17 2.74-3.78 5.13-3.78z" fill="#EA4335"/>
                  </svg>
              </div>
              <span className="text-[9px] font-bold text-[#3c4043] tracking-wider uppercase">Verified Account</span>
          </div>
        )}
      </header>

      <main className="w-full sm:max-w-[480px] bg-white border-[#DADCE0] border-[1px] rounded-[32px] p-8 sm:p-12 flex flex-col shadow-sm animate-in fade-in zoom-in-95 duration-500 overflow-hidden relative min-h-[560px]">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          
          {step > 0 && (
            <div className="mb-10 text-center animate-in fade-in duration-500">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#4285F4] uppercase tracking-[0.15em]">STEP {step} OF {totalSteps}</span>
                    <span className="text-[10px] font-bold text-[#5f6368] uppercase tracking-[0.05em]">{progressLabels[step-1]}</span>
                </div>
                <div className="w-full h-[4px] bg-[#f1f3f4] rounded-full overflow-hidden flex gap-1">
                    {[...Array(totalSteps)].map((_, i) => (
                      <div 
                          key={i+1}
                          className={`h-full flex-grow transition-all duration-500 ${(i + 1) <= step ? 'bg-[#4285F4]' : 'bg-[#e8eaed]'}`} 
                      />
                    ))}
                </div>
            </div>
          )}

          <form onSubmit={handleNext} className="space-y-6">
              
              {renderStep()}

              <div className="pt-8 flex gap-3">
                  {step > 1 && (
                      <button 
                        type="button"
                        onClick={handleBack}
                        className="flex-grow h-[52px] rounded-full border border-[#dadce0] text-[14px] font-semibold text-[#3c4043] hover:bg-[#f8f9fa] transition-all"
                      >
                          Back
                      </button>
                  )}
                  <Button 
                      type="submit" 
                      disabled={loading}
                      className={`h-[52px] rounded-full text-[14px] font-bold shadow-none transition-all active:scale-[0.98] ${step <= 1 ? 'w-full' : 'flex-grow'} bg-[#4285F4] hover:bg-[#3367D6] text-white`}
                  >
                      {loading ? (step === totalSteps ? "Provisioning..." : "One moment...") : step === 0 ? "Get Started" : step === totalSteps ? "Complete Profile" : "Continue"}
                  </Button>
              </div>
          </form>

          <footer className="mt-8 pt-6 border-t border-[#f1f3f4] text-center">
              <p className="text-[11px] text-[#5f6368] opacity-60">
                 Interoperable Healthcare Network Protocol
              </p>
          </footer>
        </motion.div>
      </main>

      <div className="w-full max-w-[480px] mt-8 flex flex-wrap items-center justify-between gap-4 px-4">
        <div className="flex gap-4">
          <span className="text-[11px] text-[#5F6368] hover:underline cursor-pointer">Help</span>
          <span className="text-[11px] text-[#5F6368] hover:underline cursor-pointer">Privacy</span>
          <span className="text-[11px] text-[#5F6368] hover:underline cursor-pointer">Terms</span>
        </div>
        
        <button 
          onClick={() => {
            useAuthStore.getState().logout();
            navigate('/login');
          }}
          className="text-[11px] font-bold text-[#4285F4] hover:bg-blue-50 px-3 py-1.5 rounded-full transition-all"
        >
          Not you? Sign out
        </button>
      </div>
    </div>
  );
}
