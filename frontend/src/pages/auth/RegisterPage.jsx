import React from 'react';
import { UserPlus } from 'lucide-react';
import { Card, Badge } from '../../components/ui';
import RegisterForm from '../../components/features/auth/RegisterForm';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div className="auth-page animate-enter">
      <div className="auth-blob blob-1"></div>
      <div className="auth-blob blob-2"></div>

      <Card className="auth-card glass-panel">
        <div className="auth-header">
          <Badge icon={UserPlus} className="badge-glow mb-4">
            Join NovaHealth
          </Badge>
          <h1 className="text-gradient font-bold">Create Account</h1>
          <p className="subtitle text-sm">Join our medical community today</p>
        </div>

        <RegisterForm />
        
        <div className="auth-footer mt-8">
          <p className="text-sm">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
