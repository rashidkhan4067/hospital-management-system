import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Shield, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { register as registerService } from '../../../services/authService';
import { useForm } from '../../../hooks';
import { Input, Button, Alert } from '../../ui';
import SocialLogin from './SocialLogin';

/**
 * 📝 RegisterForm - Clinical Admission Hub
 * Redesigned for High-Fidelity UI matching Landing Page.
 */
export default function RegisterForm({ setError: setParentError }) {
  const { formData, error, setError, loading, setLoading, handleChange } = useForm({ 
    first_name: '', 
    last_name: '', 
    email: '', 
    password: '', 
    confirm_password: '',
    role: 'patient' 
  });
  const navigate = useNavigate();

  const handleLocalError = (err) => {
    setError(err);
    if (setParentError) setParentError(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLocalError('');
    
    if (formData.password !== formData.confirm_password) {
      handleLocalError('Primary Key Mismatch: Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await registerService(formData);
      navigate('/verify-email');
    } catch (err) {
      console.error('Registration error:', err);
      const errorData = err.response?.data;
      if (errorData) {
        const firstError = Object.values(errorData)[0];
        handleLocalError(Array.isArray(firstError) ? firstError[0] : (typeof firstError === 'string' ? firstError : 'Admission Protocol Failed'));
      } else {
        handleLocalError('Network Rejection: Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <form onSubmit={handleSubmit} className="space-y-10 group/form">
        <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
                <Input 
                    label="First Entry"
                    type="text" 
                    name="first_name" 
                    placeholder="Ahmed" 
                    value={formData.first_name} 
                    onChange={handleChange} 
                    icon={User}
                    required 
                />
                <Input 
                    label="Last Entry"
                    type="text" 
                    name="last_name" 
                    placeholder="Khan" 
                    value={formData.last_name} 
                    onChange={handleChange} 
                    icon={User}
                    required 
                />
            </div>

            <Input 
                id="register-email"
                label="Clinical ID (Email)"
                type="email" 
                name="email" 
                placeholder="patient@clinical.com" 
                value={formData.email} 
                onChange={handleChange} 
                icon={Mail}
                required 
            />
            
            <div className="grid grid-cols-2 gap-6">
                <Input 
                    label="Secure Key"
                    type="password" 
                    name="password" 
                    placeholder="••••••••" 
                    value={formData.password} 
                    onChange={handleChange} 
                    icon={Lock}
                    required 
                />
                <Input 
                    label="Verify Key"
                    type="password" 
                    name="confirm_password" 
                    placeholder="••••••••" 
                    value={formData.confirm_password} 
                    onChange={handleChange} 
                    icon={Shield}
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
              Confirm Admission <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>

      <div className="relative">
         <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-50"></div></div>
         <div className="relative flex justify-center text-[8px] font-black uppercase tracking-[0.6em] text-[#86868b] bg-white px-8 mx-auto w-fit">Clinical Federation sign-up</div>
      </div>

      <SocialLogin />
    </div>
  );
}
