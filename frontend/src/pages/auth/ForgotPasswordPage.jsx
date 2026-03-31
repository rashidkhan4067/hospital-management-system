import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, Sparkles, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, Input, Button, Badge, Alert } from '../../components/ui';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSent(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page animate-enter">
      <div className="auth-blob blob-1"></div>
      <div className="auth-blob blob-2"></div>

      <Card className="auth-card glass-panel delay-100">
        <div className="auth-header">
          <Badge icon={Sparkles} className="badge-glow mb-4">
            Security First
          </Badge>
          <h1 className="text-gradient">Reset Password</h1>
          <p className="subtitle">We'll send you instructions to reset your password</p>
        </div>

        {error && <Alert variant="error" className="mb-6">{error}</Alert>}

        {isSent ? (
          <div className="success-state animate-enter text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            <h2 className="text-gradient mb-4">Check your email</h2>
            <p className="subtitle mb-8 text-sm">A password reset link has been sent to <strong>{email}</strong>.</p>
            <Link to="/login" className="w-full">
               <Button variant="primary" icon={ArrowLeft} className="w-full btn-glow">
                 BACK TO LOGIN
               </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <Input 
                label="Email Address"
                type="email" 
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                required
            />

            <Button type="submit" loading={loading} icon={Send} className="w-full btn-glow">
              SEND RECOVERY LINK
            </Button>
            
            <div className="auth-footer mt-8 text-center">
              <Link to="/login" className="text-sm font-bold opacity-60 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <ArrowLeft size={16} /> Back to Login
              </Link>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
