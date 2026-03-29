import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
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

      <div className="glass-panel auth-card delay-100">
        <div className="auth-header">
          <div className="badge-glow mb-4">
            <Sparkles size={16} /> Password Recovery
          </div>
          <h1 className="text-gradient">Reset Password</h1>
          <p className="subtitle">We'll send you instructions to reset your password</p>
        </div>

        {error && (
          <div className="error-box">
            <AlertCircle size={24} />
            <span>{error}</span>
          </div>
        )}

        {isSent ? (
          <div className="success-state animate-enter">
            <div className="success-icon-wrapper">
              <CheckCircle size={64} className="text-success" />
            </div>
            <h2 className="text-gradient">Check your email</h2>
            <p className="subtitle">A password reset link has been sent to <strong>{email}</strong>.</p>
            <Link to="/login" className="btn btn-primary btn-glow w-full mt-8">
              <ArrowLeft size={18} /> BACK TO LOGIN
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-container">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input 
                  type="email" 
                  className="input-glass" 
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-glow" disabled={loading}>
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <Send size={18} />
                  <span>SEND RECOVERY LINK</span>
                </>
              )}
            </button>
            
            <div className="auth-footer">
              <Link to="/login" className="back-link">
                <ArrowLeft size={16} /> Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
