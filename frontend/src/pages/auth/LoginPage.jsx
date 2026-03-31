import React, { useEffect, useState } from 'react';
import { Sparkles, Terminal } from 'lucide-react';
import { Card, Badge, Alert } from '../../components/ui';
import LoginForm from '../../components/features/auth/LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/apiClient';

export default function LoginPage() {
  const [verifyingLink, setVerifyingLink] = useState(false);
  const [error, setError] = useState(null);
  const { login: contextLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMagicLink = async () => {
      // Check if the URL is a sign-in link
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        
        // If email is missing (e.g. user opened link in different device/browser), prompt them
        if (!email) {
          email = window.prompt('Please provide your email for verification:');
        }

        if (email) {
          setVerifyingLink(true);
          try {
            const result = await signInWithEmailLink(auth, email, window.location.href);
            window.localStorage.removeItem('emailForSignIn');
            
            // Exchange Firebase token for backend JWT
            const idToken = await result.user.getIdToken();
            const response = await api.post('auth/firebase/', { token: idToken });
            
            if (response.data.access) {
              contextLogin(response.data.access, response.data.refresh, response.data.user);
              navigate(response.data.user?.role === 'admin' ? '/admin' : '/dashboard');
            }
          } catch (err) {
            console.error('Magic link verification error:', err);
            setError('Verification failed or link expired. Please try again.');
          } finally {
            setVerifyingLink(false);
          }
        }
      }
    };

    handleMagicLink();
  }, [contextLogin, navigate]);

  if (verifyingLink) {
    return (
      <div className="auth-page flex items-center justify-center p-8">
         <Card className="max-w-md w-full glass-panel p-12 text-center space-y-8 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mx-auto animate-spin-slow">
               <Terminal size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Validating Link</h2>
              <p className="text-gray-400 text-sm font-medium">Securing your session with encrypted credentials...</p>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 animate-progress w-full" />
            </div>
         </Card>
      </div>
    );
  }

  return (
    <div className="auth-page animate-enter">
      <div className="auth-blob blob-1"></div>
      <div className="auth-blob blob-2"></div>

      <Card className="auth-card glass-panel">
        <div className="auth-header">
          <Badge icon={Sparkles} className="badge-glow mb-4">
            Security Enhanced
          </Badge>
          <h1 className="text-gradient font-extrabold tracking-tighter">Identity Control</h1>
          <p className="subtitle">Enterprise Portal Access</p>
        </div>

        {error && <Alert variant="error" className="mb-6">{error}</Alert>}

        <LoginForm />
        
        <div className="auth-footer mt-6 pt-4 border-t border-white/5">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-[0.2em] text-center">
            New to systems? <Link to="/register" className="text-blue-400 hover:text-white transition-colors">Create Node</Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

