import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Shield, CheckCircle2 } from 'lucide-react';
import { register as registerService } from '../../services/authService';
import { useForm } from '../../hooks';
import { Card, Input, Button, Badge, Alert } from '../../components/ui';
import SocialLogin from './SocialLogin';

export default function Register() {
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
    
    // Core requirements
    if (!formData.email || !formData.password || !formData.first_name || !formData.last_name || !formData.confirm_password) {
      setError('Required fields are missing.');
      return;
    }
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await registerService(formData);
      navigate('/login');
    } catch (err) {
      const errorData = err.response?.data;
      if (typeof errorData === 'object') {
        const firstError = Object.values(errorData)[0];
        setError(Array.isArray(firstError) ? firstError[0] : JSON.stringify(firstError));
      } else {
        setError('Registration failed. Try a different email.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page animate-enter">
      <div className="auth-blob blob-1"></div>
      <div className="auth-blob blob-2"></div>

      <Card className="auth-card delay-100">
        <div className="auth-header">
          <Badge icon={UserPlus} className="mb-4">
            Patient & Doctor Portal
          </Badge>
          <h1 className="text-gradient">Join NovaHealth</h1>
          <p className="subtitle">Enter your details to create an account</p>
        </div>

        {error && <Alert>{error}</Alert>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="flex gap-4">
            <Input 
              label="First Name"
              type="text" 
              name="first_name" 
              placeholder="John" 
              value={formData.first_name} 
              onChange={handleChange} 
              icon={User}
              wrapperClassName="flex-1"
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
              wrapperClassName="flex-1"
              required 
            />
          </div>

          <Input 
            label="Email address"
            type="email" 
            name="email" 
            placeholder="name@example.com" 
            value={formData.email} 
            onChange={handleChange} 
            icon={Mail}
            required 
          />
          
          <div className="flex gap-4">
            <Input 
              label="Password"
              type="password" 
              name="password" 
              placeholder="••••••••" 
              value={formData.password} 
              onChange={handleChange} 
              icon={Lock}
              wrapperClassName="flex-1"
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
              wrapperClassName="flex-1"
              required 
            />
          </div>

          <div className="input-container">
            <label>I am a...</label>
            <div className="input-wrapper">
              <Shield className="input-icon" size={20} />
              <select name="role" className="input-glass" value={formData.role} onChange={handleChange} style={{ appearance: 'none' }}>
                <option value="patient">Patient (Booking Only)</option>
                <option value="doctor">Doctor (Practitioner)</option>
              </select>
            </div>
          </div>

          <Button type="submit" loading={loading} icon={CheckCircle2} className="w-full">
            CREATE MY ACCOUNT
          </Button>
        </form>
        
        <SocialLogin />
        
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign in here</Link></p>
        </div>
      </Card>
    </div>
  );
}
