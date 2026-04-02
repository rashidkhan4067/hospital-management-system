import React, { useState } from 'react';
import { 
  UserPlus, 
  ChevronLeft, 
  Shield, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Briefcase,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Button, Card, Input } from '../../components/ui';
import { motion } from 'framer-motion';

/**
 * 👤 Identity Provisioning Module (Add User)
 * Clean, focused form for administrative user creation.
 */
export default function AddUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'STAFF',
    department: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/admin/users'), 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Identity Propagated</h2>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Redirecting to User Matrix Control...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 p-4 md:p-6 pb-20">
      
      <PageHeader 
        title="Provision Identity" 
        subtitle="Global Human Capital Expansion"
        actions={
          <Button 
            onClick={() => navigate('/admin/users')}
            className="bg-transparent text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 border-none text-[9px] font-black uppercase tracking-widest"
          >
            <ChevronLeft size={14} /> Back to Registry
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Profile Details */}
        <div className="md:col-span-8 space-y-6">
          <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-1 h-4 bg-accent-primary rounded-full" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Personal Metadata</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">Full Operational Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent-primary transition-colors" size={16} />
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Ellen Ripley"
                      className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-4 pl-12 pr-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white"
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">Contact Shard (Email)</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent-primary transition-colors" size={16} />
                    <input 
                      required
                      type="email" 
                      placeholder="ripley@weyland.com"
                      className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-4 pl-12 pr-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">Comms Frequency (Phone)</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent-primary transition-colors" size={16} />
                    <input 
                      type="tel" 
                      placeholder="+1 555-01-XX"
                      className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-4 pl-12 pr-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">Medical Unit (Dept)</label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent-primary transition-colors" size={16} />
                    <input 
                      type="text" 
                      placeholder="e.g. Cardiology"
                      className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-4 pl-12 pr-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white"
                      value={formData.department}
                      onChange={e => setFormData({...formData, department: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-1 h-4 bg-accent-primary rounded-full" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Security Credentials</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">Access Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent-primary transition-colors" size={16} />
                    <input 
                      required
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-4 pl-12 pr-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">Verify Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent-primary transition-colors" size={16} />
                    <input 
                      required
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-4 pl-12 pr-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white"
                      value={formData.confirmPassword}
                      onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Info / Role Selection */}
        <div className="md:col-span-4 space-y-6">
          <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-1 h-4 bg-accent-primary rounded-full" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Operational Role</h3>
              </div>
              
              <div className="space-y-3">
                {['ADMIN', 'DOCTOR', 'STAFF', 'PATIENT'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({...formData, role})}
                    className={`w-full p-4 rounded-2xl border-none flex items-center justify-between transition-all ${
                      formData.role === role 
                      ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20 scale-[1.02]' 
                      : 'bg-slate-50 dark:bg-black/10 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Shield size={14} className={formData.role === role ? 'text-white' : 'text-slate-300'} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{role}</span>
                    </div>
                    {formData.role === role && <CheckCircle2 size={16} />}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Button 
            disabled={loading}
            type="submit"
            className="w-full bg-accent-primary text-white py-6 rounded-[32px] text-[11px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-95 transition-all border-none"
          >
            {loading ? 'Propagating...' : 'Commit Identity'}
          </Button>
          
          <p className="text-[8px] text-center text-slate-400 font-bold uppercase tracking-[0.2em] px-4">
            Proceeding will authorize this identity across all clinical network nodes.
          </p>
        </div>
      </form>
    </div>
  );
}
