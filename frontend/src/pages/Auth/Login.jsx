import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { login as loginService } from '../../services/authService';
import { useForm } from '../../hooks';
import { Card, Input, Button, Badge, Alert } from '../../components/ui';
import SocialLogin from './SocialLogin';

export default function Login() {
  const { formData, error, setError, loading, setLoading, handleChange } = useForm({ email: '', password: '' });
  const { login: contextLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      const data = await loginService(formData);
      contextLogin(data.access, data.user);
      navigate(data.user?.role === 'admin' ? '/admin/stats' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page animate-enter">
      {/* Visual background details */}
      <div className="auth-blob blob-1"></div>
      <div className="auth-blob blob-2"></div>

      <Card className="auth-card delay-100">
        <div className="auth-header">
          <Badge icon={Sparkles} className="mb-4">
            Secure Portal
          </Badge>
          <h1 className="text-gradient">Welcome Back</h1>
          <p className="subtitle">Login to access your medical records</p>
        </div>

        {error && <Alert>{error}</Alert>}

        <form onSubmit={handleSubmit} className="auth-form">
          <Input 
            label="Email Address"
            type="email" 
            name="email" 
            placeholder="Enter email..."
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
            autoFocus
            required
          />
          
          <div className="input-with-link">
            <div className="flex-row">
              <label>Password</label>
              <Link to="/forgot-password" style={{ fontSize: '0.8rem', opacity: 0.7 }}>Forgot Password?</Link>
            </div>
            <Input 
              type="password" 
              name="password" 
              placeholder="Secure password..."
              value={formData.password}
              onChange={handleChange}
              icon={Lock}
              required
            />
          </div>

          <Button type="submit" loading={loading} icon={LogIn} className="w-full">
            SIGN INTO ACCOUNT
          </Button>
        </form>
        
        <SocialLogin />
        
        <div className="auth-footer">
          <p>New to NovaHealth? <Link to="/register">Create an account</Link></p>
        </div>
      </Card>
    </div>
  );
}
