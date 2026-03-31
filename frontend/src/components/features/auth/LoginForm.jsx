import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { login as loginService } from '../../../services/authService';
import { useForm } from '../../../hooks';
import { Input, Button, Alert } from '../../ui';
import SocialLogin from './SocialLogin'; // Corrected import path

export default function LoginForm() {
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
      contextLogin(data.access, data.refresh, data.user);
      const nextPath = data.user?.role === 'admin' ? '/admin/stats' : '/dashboard';
      navigate(nextPath);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.detail || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Alert variant="error" className="mb-6">{error}</Alert>}

      <form onSubmit={handleSubmit} className="auth-form">
        <Input 
          label="Email"
          type="email" 
          name="email" 
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          icon={Mail}
          required
        />
        
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Password</label>
            <Link to="/forgot-password" size="xs" className="text-[10px] text-blue-400 hover:text-blue-300 font-bold uppercase tracking-widest">
              Forgot?
            </Link>
          </div>
          <Input 
            type="password" 
            name="password" 
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            icon={Lock}
            required
          />
        </div>

        <Button 
          type="submit" 
          variant="primary"
          loading={loading} 
          icon={LogIn} 
          className="w-full btn-glow"
        >
          SIGN IN
        </Button>
      </form>

      <SocialLogin />
    </>
  );
}
