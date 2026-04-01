import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, ShieldCheck, ChevronRight } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { login as loginService } from '../../../services/authService';
import { useForm } from '../../../hooks';
import { Input, Button, Alert } from '../../ui';
import SocialLogin from './SocialLogin';

/**
 * 🔓 LoginForm - Clinical High-Fidelity Hub
 * Redesigned for Elite Auth UI matching Landing Page.
 */
export default function LoginForm({ setError: setParentError }) {
  const { formData, error, setError, loading, setLoading, handleChange } = useForm({ email: '', password: '' });
  const { login: contextLogin } = useAuth();
  const navigate = useNavigate();

  const handleLocalError = (err) => {
    setError(err);
    if (setParentError) setParentError(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLocalError('');
    
    if (!formData.email || !formData.password) {
      handleLocalError('Mandatory Credentials Missing');
      return;
    }
    
    setLoading(true);
    try {
      const data = await loginService(formData);
      contextLogin(data.access, data.refresh, data.user);
      const nextPath = data.user?.role === 'admin' ? '/admin' : '/dashboard';
      navigate(nextPath);
    } catch (err) {
      console.error('Login error:', err);
      handleLocalError(err.response?.data?.detail || 'Identity Verification Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <form onSubmit={handleSubmit} className="space-y-10 group/form">
        <div className="space-y-8">
            <Input 
                id="login-email"
                label="Clinical ID (Email)"
                type="email" 
                name="email" 
                placeholder="unit@clinical.com"
                value={formData.email}
                onChange={handleChange}
                icon={Mail}
                autoFocus
                required
            />
            
            <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#86868b]">Master Key</label>
                    <Link to="/forgot-password" size="xs" className="text-[10px] text-[#007aff] hover:opacity-100 opacity-60 font-black uppercase tracking-[0.4em] transition-opacity">
                      Recovery
                    </Link>
                </div>
                <Input 
                    id="login-password"
                    type="password" 
                    name="password" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    icon={Lock}
                    required
                />
            </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full h-20 rounded-[32px] bg-[#007aff] text-white font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group/btn"
        >
          {loading ? (
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
             </div>
          ) : (
            <>
              Verify Identity <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>

      <div className="relative">
         <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-50"></div></div>
         <div className="relative flex justify-center text-[8px] font-black uppercase tracking-[0.6em] text-[#86868b] bg-white px-8 mx-auto w-fit">Clinical Federation sign-in</div>
      </div>

      <SocialLogin />
    </div>
  );
}
