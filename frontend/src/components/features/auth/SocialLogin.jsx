import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  sendSignInLinkToEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../../../services/firebase';
import { Globe, Mail, ChevronRight, MailPlus } from 'lucide-react';
import { Button, Alert, Modal, Input } from '../../ui';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/apiClient';

export default function SocialLogin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'email' | null
  
  // Email State
  const [emailLink, setEmailLink] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const { login: contextLogin } = useAuth();
  const navigate = useNavigate();

  // Handle cross-origin callback from redirect
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          setLoading(true);
          console.log("[DEBUG] Google Redirect Authenticated:", result.user.email);
          const idToken = await result.user.getIdToken();
          const response = await api.post('auth/firebase/', { token: idToken });
          
          if (response.data.access) {
            contextLogin(response.data.access, response.data.refresh, response.data.user);
            navigate(response.data.user?.role === 'admin' ? '/admin' : '/dashboard');
          }
        }
      } catch (err) {
        console.error("[DEBUG] Google Redirect Error Details:", {
          code: err.code,
          message: err.message,
          customData: err.customData
        });
        
        if (err.code !== 'auth/popup-closed-by-user') {
           const detailedError = err.code === 'auth/unauthorized-domain' 
             ? 'This domain (localhost) is not authorized in Firebase Console.'
             : (err.code || err.message);
           setError('Google login failed: ' + detailedError);
        }
      } finally {
        setLoading(false);
      }
    };
    handleRedirectResult();
  }, [contextLogin, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("[DEBUG] Starting Google Auth Flow...");

      // Try popup but be ready for it to be blocked
      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("[DEBUG] Popup Successful:", result.user.email);
        const idToken = await result.user.getIdToken();
        const response = await api.post('auth/firebase/', { token: idToken });
        
        if (response.data.access) {
          contextLogin(response.data.access, response.data.refresh, response.data.user);
          navigate(response.data.user?.role === 'admin' ? '/admin' : '/dashboard');
        }
      } catch (popupErr) {
        console.warn("[DEBUG] Popup failed/closed, forcing redirect:", popupErr.code);
        // Common error codes where we should try redirect
        if (['auth/popup-blocked', 'auth/popup-closed-by-user', 'auth/cancelled-popup-request'].includes(popupErr.code)) {
           await signInWithRedirect(auth, googleProvider);
        } else {
           throw popupErr;
        }
      }
    } catch (err) {
      console.error('[DEBUG] Authentication Master Error:', {
        code: err.code,
        message: err.message,
        response: err.response?.data
      });
      
      const errorMessage = err.response?.data?.detail || err.response?.data?.error || err.code || err.message;
      setError('Google Sign-In Error: ' + errorMessage);
    } finally {
      // Don't set loading false if we are redirecting as the page will unload
    }
  };

  const handleEmailLink = async (e) => {
    e.preventDefault();
    if (!emailLink) return;

    setLoading(true);
    setError(null);
    try {
      const actionCodeSettings = {
        url: window.location.origin + '/login',
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, emailLink, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', emailLink);
      setEmailSent(true);
    } catch (err) {
      console.error('[DEBUG] Email Link Error:', err);
      setError('Security link failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="social-auth-section mt-12 w-full max-w-sm mx-auto">
      {error && <Alert variant="error" className="mb-6">{error}</Alert>}
      
      <div className="relative mb-8 text-center uppercase tracking-[0.2em] text-[10px] font-black text-gray-500">
         <div className="absolute top-1/2 left-0 w-full h-px bg-white/5"></div>
         <span className="relative z-10 px-4 bg-slate-900/0 backdrop-blur-xl">Passwordless Access</span>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Button 
          variant="outline" 
          onClick={handleGoogleLogin}
          loading={loading && !activeModal}
          icon={Globe}
          className="w-full justify-between py-4 border-white/5 hover:border-blue-500/50 bg-white/[0.02] hover:bg-blue-500/5 group transition-all duration-500"
        >
          <span className="flex-1 text-center font-bold tracking-tight group-hover:text-blue-400">Continue with Google</span>
          <ChevronRight size={16} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => setActiveModal('email')}
          icon={Mail}
          className="w-full justify-between py-4 border-white/5 hover:border-purple-500/50 bg-white/[0.02] hover:bg-purple-500/5 group font-bold transition-all duration-300"
        >
          <span className="flex-1 text-center font-bold tracking-tight group-hover:text-purple-400">Email Magic Link</span>
          <ChevronRight size={16} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Button>
      </div>

      <p className="mt-8 text-center text-[10px] uppercase font-bold tracking-widest text-gray-600">
        Enterprise Security by NovaHealth
      </p>

      {/* Modern Magic Link Modal */}
      <Modal
        isOpen={activeModal === 'email'}
        onClose={() => setActiveModal(null)}
        title="Magic Link Login"
        subtitle="Passwordless Security"
        maxWidth="max-w-md"
      >
        {!emailSent ? (
          <form onSubmit={handleEmailLink} className="space-y-6">
            <p className="text-sm text-gray-400 leading-relaxed mb-6 font-medium">
              We'll send a unique, secure login link directly to your inbox. Just click the link to be signed in instantly without a password.
            </p>
            <Input 
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={emailLink}
              onChange={(e) => setEmailLink(e.target.value)}
              icon={Mail}
              autoFocus
              required
            />
            <Button type="submit" loading={loading} className="w-full py-4 border-purple-500/30 hover:bg-purple-500/10 text-purple-400" icon={MailPlus}>
              SEND SECURITY LINK
            </Button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mx-auto animate-bounce-slow">
               <Mail size={40} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Check your Inbox</h3>
              <p className="text-sm text-gray-400">A secure login link has been sent to:<br/><strong className="text-indigo-400">{emailLink}</strong></p>
            </div>
            <div className="pt-4 space-y-3">
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Can't find it?</p>
              <Button variant="social" onClick={() => setEmailSent(false)} className="w-full text-xs">
                Resend security link
              </Button>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-xs text-gray-500 hover:text-white underline underline-offset-4 transition-colors"
              >
                Close and wait for email
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
