import React from 'react';
import { Mail, ArrowRight, CheckCircle, RefreshCcw } from 'lucide-react';
import { Card, Badge, Alert, Button } from '@/components/primitives';
import { Link } from 'react-router-dom';

export default function VerifyEmailPage() {
  return (
    <div className="auth-page animate-enter">
      <div className="auth-blob blob-1"></div>
      <div className="auth-blob blob-2"></div>

      <Card className="auth-card glass-panel max-w-md w-full">
        <div className="auth-header text-center">
            <div className="mx-auto w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse-slow">
                <Mail className="text-blue-400" size={40} />
            </div>
            
            <Badge icon={CheckCircle} className="badge-glow mb-4">
                Registration Successful
            </Badge>
            
            <h1 className="text-gradient font-extrabold tracking-tighter mb-2">Check Your Inbox</h1>
            <p className="subtitle mb-8 text-gray-400">
                We've sent a verification link to your email address. 
                Please click the link to activate your account.
            </p>
        </div>

        <div className="space-y-6">
            <Alert variant="info" className="text-sm bg-white/5 border-white/10 text-gray-300">
                Security at Al Shifaa Clinic is our priority. Verification ensures that only real patients and staff can access our portal.
            </Alert>

            <div className="bg-blue-500/5 p-6 rounded-2xl border border-blue-500/10 space-y-4">
                <p className="text-xs text-blue-300 font-semibold uppercase tracking-widest text-center">Didn't receive the email?</p>
                <ul className="text-sm text-gray-400 space-y-2">
                    <li className="flex items-start gap-2">
                        <ArrowRight size={14} className="mt-1 flex-shrink-0 text-blue-400" />
                        Check your spam or junk folder
                    </li>
                    <li className="flex items-start gap-2">
                        <ArrowRight size={14} className="mt-1 flex-shrink-0 text-blue-400" />
                        Wait a few minutes (sometimes it takes time)
                    </li>
                </ul>
                
                <Button 
                    variant="outline" 
                    className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                    icon={RefreshCcw}
                >
                    RESEND VERIFICATION
                </Button>
            </div>

            <div className="text-center pt-4">
                <Link to="/login" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors">
                    Back to Sign In
                </Link>
            </div>
        </div>
      </Card>
    </div>
  );
}
