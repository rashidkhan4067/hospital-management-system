import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Shield, CheckCircle2 } from 'lucide-react';
import { register as registerService } from '../../../services/authService';
import { useForm } from '../../../hooks';
import { Input, Button, Alert } from '../../ui';
import SocialLogin from './SocialLogin';

export default function RegisterForm() {
  const { formData, error, setError, loading, setLoading, handleChange } = useForm({ 
    first_name: '', 
    last_name: '', 
    email: '', 
    password: '', 
    confirm_password: '',
    role: 'patient' 
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await registerService(formData);
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      const errorData = err.response?.data;
      if (errorData) {
        const firstError = Object.values(errorData)[0];
        setError(Array.isArray(firstError) ? firstError[0] : (typeof firstError === 'string' ? firstError : 'Registration failed'));
      } else {
        setError('Registration failed. Please check your details.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Alert variant="error" className="mb-6">{error}</Alert>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="First Name"
            type="text" 
            name="first_name" 
            placeholder="John" 
            value={formData.first_name} 
            onChange={handleChange} 
            icon={User}
            required 
          />
          <Input 
            label="Last Name"
            type="text" 
            name="last_name" 
            placeholder="Doe" 
            value={formData.last_name} 
            onChange={handleChange} 
            icon={User}
            required 
          />
        </div>

        <Input 
          label="Email Address"
          type="email" 
          name="email" 
          placeholder="john@example.com" 
          value={formData.email} 
          onChange={handleChange} 
          icon={Mail}
          required 
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Password"
            type="password" 
            name="password" 
            placeholder="••••••••" 
            value={formData.password} 
            onChange={handleChange} 
            icon={Lock}
            required 
          />
          <Input 
            label="Confirm"
            type="password" 
            name="confirm_password" 
            placeholder="••••••••" 
            value={formData.confirm_password} 
            onChange={handleChange} 
            icon={Lock}
            required 
          />
        </div>

        <div className="input-container">
          <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Account Type</label>
          <div className="input-wrapper mt-2">
            <Shield className="input-icon" size={18} />
            <select 
              name="role" 
              className="input-glass" 
              value={formData.role} 
              onChange={handleChange}
              style={{ appearance: 'none' }}
            >
              <option value="patient">Patient (Booking Portal)</option>
              <option value="doctor">Doctor (Medical Staff)</option>
            </select>
          </div>
        </div>

        <Button 
          type="submit" 
          variant="primary"
          loading={loading} 
          icon={CheckCircle2} 
          className="w-full btn-glow mt-4"
        >
          CREATE ACCOUNT
        </Button>
      </form>
      
      <SocialLogin />
    </>
  );
}
