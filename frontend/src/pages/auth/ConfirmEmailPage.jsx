import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { BadgeCheck, ShieldAlert, Loader2, Key } from 'lucide-react';
import axios from 'axios';
import { Card, Alert, Button } from '../../components/ui';

export default function ConfirmEmailPage() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const key = params.get('key');

  useEffect(() => {
    const verify = async () => {
      if (!key) {
        setStatus('error');
        setErrorMsg('Invalid or missing verification key.');
        return;
      }

      try {
        // We use dj-rest-auth's verify-email endpoint or a custom one
        await axios.post('http://localhost:8000/api/v1/auth/registration/verify-email/', { key });
        setStatus('success');
      } catch (err) {
        console.error('Verification failed:', err);
        setStatus('error');
        setErrorMsg(err.response?.data?.detail || 'This verification link is invalid or has expired.');
      }
    };

    verify();
  }, [key]);

  return (
    <div className="auth-page animate-enter">
      <div className="auth-blob blob-1"></div>
      <div className="auth-blob blob-2"></div>

      <Card className="auth-card glass-panel max-w-md w-full text-center">
        {status === 'loading' && (
          <div className="py-12 flex flex-col items-center">
            <Loader2 className="animate-spin text-blue-400 mb-6" size={50} />
            <h1 className="text-xl font-bold tracking-tight">Activating Secure Portal...</h1>
            <p className="subtitle">Please wait while we verify your Al Shifaa Clinic credentials.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="py-8 flex flex-col items-center">
             <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-8 animate-enter">
                <BadgeCheck className="text-green-400" size={40} />
            </div>
            
            <h1 className="text-gradient font-extrabold tracking-tighter mb-4 text-3xl">Email Verified!</h1>
            <p className="subtitle mb-8">
                Your Al Shifaa Clinic account is now fully secured and active. 
                You can proceed to login safely.
            </p>
            
            <Button 
                variant="primary" 
                className="w-full btn-glow"
                onClick={() => navigate('/login')}
            >
                START SECURE SESSION
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="py-8 flex flex-col items-center">
             <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-8 animate-enter">
                <ShieldAlert className="text-red-400" size={40} />
            </div>
            
            <h1 className="text-gradient-red font-extrabold tracking-tighter mb-4 text-3xl">Activation Failed</h1>
            <Alert variant="error" className="mb-6">{errorMsg}</Alert>
            <p className="subtitle mb-8 text-sm">
                If you believe this is an error, please try logging in again to request a new link.
            </p>
            
            <Button 
                variant="outline" 
                className="w-full hover:bg-white/5"
                onClick={() => navigate('/login')}
                icon={Key}
            >
                BACK TO SIGN IN
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
