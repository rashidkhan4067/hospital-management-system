import React, { useState } from 'react';
import { 
  UserPlus, 
  ChevronLeft, 
  Stethoscope, 
  Award, 
  Clock, 
  Building2,
  Mail,
  Phone,
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Button, Card } from '../../components/ui';
import { motion } from 'framer-motion';

/**
 * 🧛 Specialist Authorization Matrix (Add Doctor)
 * High-fidelity, categorical form for onboarding medical faculty.
 */
export default function AddDoctor() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialty: 'Cardiology',
    credentials: 'MD',
    licenseNumber: '',
    department: 'Medical-Unit-1',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/admin/doctors'), 2000);
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
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Specialist Authorized</h2>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Medical Credentials Verified & Propagated.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 p-4 md:p-6 pb-20">
      
      <PageHeader 
        title="Authorize Specialist" 
        subtitle="Global Medical Faculty Expansion Protocol"
        actions={
          <Button 
            onClick={() => navigate('/admin/doctors')}
            className="bg-transparent text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 border-none text-[9px] font-black uppercase tracking-widest"
          >
            <ChevronLeft size={14} /> Back to Faculty Registry
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Main Identity & Credentials */}
        <div className="md:col-span-8 space-y-6">
          <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-1 h-4 bg-accent-primary rounded-full" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Faculty Metadata</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Full Specialist Name" icon={<Stethoscope size={16}/>} placeholder="Dr. Ellen Ripley" value={formData.fullName} onChange={v => setFormData({...formData, fullName: v})} />
                <InputGroup label="Faculty Email" icon={<Mail size={16}/>} placeholder="ripley@alshifaa.com" type="email" value={formData.email} onChange={v => setFormData({...formData, email: v})} />
                <InputGroup label="Comms Shard" icon={<Phone size={16}/>} placeholder="+1 555-01-XX" value={formData.phone} onChange={v => setFormData({...formData, phone: v})} />
                <InputGroup label="License / Credential ID" icon={<ShieldCheck size={16}/>} placeholder="MED-XXXX-99" value={formData.licenseNumber} onChange={v => setFormData({...formData, licenseNumber: v})} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <SelectGroup 
                    label="Medical Specialty" 
                    icon={<Zap size={16}/>} 
                    options={['Cardiology', 'Neurology', 'Internal-Med', 'Diagnostics', 'Surgery']} 
                    value={formData.specialty}
                    onChange={v => setFormData({...formData, specialty: v})}
                />
                <SelectGroup 
                    label="Faculty Degrees" 
                    icon={<Award size={16}/>} 
                    options={['MD', 'MD, PhD', 'MD, ScD', 'PhD']} 
                    value={formData.credentials}
                    onChange={v => setFormData({...formData, credentials: v})}
                />
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
                <InputGroup label="Access Key" icon={<ShieldCheck size={16}/>} type="password" placeholder="••••••••" value={formData.password} onChange={v => setFormData({...formData, password: v})} />
                <InputGroup label="Verify Key" icon={<ShieldCheck size={16}/>} type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={v => setFormData({...formData, confirmPassword: v})} />
              </div>
            </div>
          </Card>
        </div>

        {/* Action Sidebar */}
        <div className="md:col-span-4 space-y-6">
          <Card className="p-8 bg-black/5 dark:bg-black/40 border-none rounded-[40px] shadow-inner text-center">
             <div className="w-20 h-20 bg-accent-primary/5 border border-accent-primary/10 rounded-3xl mx-auto flex items-center justify-center text-accent-primary mb-6 shadow-inner">
               <Award size={32} />
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-relaxed px-4">
               Authorize this identity to access neural diagnostic nodes and clinical record archives.
             </p>
          </Card>

          <Button 
            disabled={loading}
            type="submit"
            className="w-full bg-accent-primary text-white py-6 rounded-[32px] text-[11px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-95 transition-all border-none"
          >
            {loading ? 'Authorizing faculty...' : 'Commit Authorization'}
          </Button>

          <p className="text-[8px] text-center text-slate-400 font-bold uppercase tracking-[0.2em] px-4 leading-relaxed">
            Faculty authorization implies legal responsibility for clinical intents executed across the network.
          </p>
        </div>
      </form>
    </div>
  );
}

function InputGroup({ label, icon, placeholder, value, onChange, type="text" }) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent-primary transition-colors">
          {icon}
        </div>
        <input 
          required
          type={type}
          placeholder={placeholder}
          className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-4 pl-12 pr-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

function SelectGroup({ label, icon, options, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent-primary transition-colors">
          {icon}
        </div>
        <select 
          required
          className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-4 pl-12 pr-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white"
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </div>
  );
}
