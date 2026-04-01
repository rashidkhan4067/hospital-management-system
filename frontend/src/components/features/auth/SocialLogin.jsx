import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Globe, Mail, ChevronRight, MailPlus, ShieldCheck, Activity, ArrowRight } from 'lucide-react';
import { Button, Alert, Modal, Input, Badge } from '../../ui';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/apiClient';

/**
 * 🌐 SocialLogin - Federation Access Hub (Compact Edition)
 * Design: Minimal high-contrast list for passwordless clinical access.
 */
export default function SocialLogin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [emailLink, setEmailLink] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const { login: contextLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) verifyMagicLink(token);
  }, [location]);

  const handleAuthRedirect = (user) => {
    // 🚀 CLINICAL REDIRECTION PROTOCOL
    // If the backend indicates a new profile was created/missing (onboarding)
    // Or if this is a first-time clinical registration
    if (user.is_new_user || user.onboarding_required) {
        // Option to move to a specialized profile setup page if exists
        // Currently moving to dashboard as primary hub
        navigate('/dashboard');
    } else {
        // Advanced role-based dispatch
        switch (user.role) {
            case 'admin':
                navigate('/admin');
                break;
            case 'doctor':
                navigate('/dashboard'); // Use unified dashboard or specialized route if added later
                break;
            default:
                navigate('/dashboard');
        }
    }
  };

  const verifyMagicLink = async (token) => {
    setLoading(true);
    try {
        const response = await api.post('auth/magic-link/verify/', { token });
        if (response.data.access) {
            contextLogin(response.data.access, response.data.refresh, response.data.user);
            handleAuthRedirect(response.data.user);
        }
    } catch (err) {
        setError(err.response?.data?.error || 'Security Token Invalid');
    } finally {
        setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.post('auth/google/', { access_token: tokenResponse.access_token });
        if (response.data.access) {
          contextLogin(response.data.access, response.data.refresh, response.data.user);
          handleAuthRedirect(response.data.user);
        }
      } catch (err) {
        setError('Federation Handshake Failed');
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError('Google Identity Hub Error'),
  });

  const handleMagicLinkRequest = async (e) => {
    e.preventDefault();
    if (!emailLink) return;
    setLoading(true);
    setError(null);
    try {
      await api.post('auth/magic-link/send/', { email: emailLink });
      setEmailSent(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Dispatch Protocol Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {error && (
        <div className="p-4 bg-red-50 border border-red-500/10 rounded-2xl flex items-center gap-3">
           <Activity size={14} className="text-red-500" />
           <p className="text-[9px] font-black uppercase tracking-widest text-red-600">{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-3">
        {/* Simple Modern Google Button */}
        <button 
          onClick={() => googleLogin()}
          disabled={loading}
          className="w-full h-16 bg-[#fbfbfd] hover:bg-white border border-slate-100 rounded-3xl px-8 flex items-center gap-4 group transition-all"
        >
          <Globe size={18} className="text-[#007aff] group-hover:scale-110 transition-transform" />
          <span className="flex-1 text-left text-sm font-black text-[#1d1d1f] tracking-tight">Continue with Google</span>
          <ArrowRight size={16} className="text-slate-300 group-hover:text-[#1d1d1f] group-hover:translate-x-1 transition-all" />
        </button>
        
        {/* Simple Modern Magic Link Button */}
        <button 
          onClick={() => setActiveModal('email')}
          disabled={loading}
          className="w-full h-16 bg-[#fbfbfd] hover:bg-white border border-slate-100 rounded-3xl px-8 flex items-center gap-4 group transition-all"
        >
          <Mail size={18} className="text-[#007aff] group-hover:scale-110 transition-transform" />
          <span className="flex-1 text-left text-sm font-black text-[#1d1d1f] tracking-tight">Magic Link Access</span>
          <ArrowRight size={16} className="text-slate-300 group-hover:text-[#1d1d1f] group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      {/* Modern Compact Magic Link Modal */}
      <Modal
        isOpen={activeModal === 'email'}
        onClose={() => setActiveModal(null)}
        maxWidth="max-w-sm"
      >
        <div className="p-8 lg:p-10 space-y-10">
            {!emailSent ? (
              <form onSubmit={handleMagicLinkRequest} className="space-y-10">
                <header className="space-y-4">
                    <h3 className="text-3xl font-black text-[#1d1d1f] tracking-tighter">Magic Link.</h3>
                    <p className="text-sm font-medium text-[#86868b] leading-relaxed">
                        Instant clinical sign-in. We'll dispatch a secure token to your ID.
                    </p>
                </header>
                
                <Input 
                  label="DESTINATION ID"
                  type="email"
                  placeholder="name@email.com"
                  value={emailLink}
                  onChange={(e) => setEmailLink(e.target.value)}
                  icon={Mail}
                  autoFocus
                  required
                />
                
                <Button 
                    type="submit" 
                    loading={loading} 
                    className="w-full h-16 rounded-2xl bg-[#007aff] text-white font-black uppercase tracking-widest text-[9px] shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all"
                >
                    DISPATCH TOKEN
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-8 animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 rounded-[32px] bg-[#fbfbfd] border border-slate-100 flex items-center justify-center text-[#007aff] mx-auto">
                   <Activity size={32} className="animate-pulse" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-black text-[#1d1d1f] tracking-tighter text-center">Token Dispatched.</h3>
                  <p className="text-sm font-medium text-[#86868b] text-center px-4">Verification link sent to:<br/><strong className="text-[#1d1d1f] text-xs">{emailLink}</strong></p>
                </div>
                <div className="pt-4">
                  <button onClick={() => setEmailSent(false)} className="text-[10px] font-black text-[#86868b] uppercase tracking-widest hover:text-[#007aff] transition-colors">
                    Attempt Respatch
                  </button>
                </div>
              </div>
            )}
        </div>
      </Modal>
    </div>
  );
}
