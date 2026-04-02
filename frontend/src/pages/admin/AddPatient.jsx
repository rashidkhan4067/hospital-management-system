import React, { useState } from 'react';
import { 
  UserPlus, 
  ChevronLeft, 
  Heart, 
  Activity, 
  ShieldCheck, 
  FileText,
  User,
  Phone,
  Mail,
  Home,
  AlertCircle,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Button, Card } from '../../components/ui';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 🏥 Clinical Intake Module (Add Patient)
 * High-fidelity, multi-categorical intake form for patient registration.
 */
export default function AddPatient() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'M',
    bloodType: 'O+',
    address: '',
    emergencyContact: '',
    insuranceId: '',
    medicalHistory: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/admin/patients'), 2000);
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
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Patient Registered</h2>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Medical Record Initialized...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 p-4 md:p-6 pb-20">
      
      <PageHeader 
        title="Clinical Intake" 
        subtitle="Medical Record Propagation Console"
        actions={
          <Button 
            onClick={() => navigate('/admin/patients')}
            className="bg-transparent text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 border-none text-[9px] font-black uppercase tracking-widest"
          >
            <ChevronLeft size={14} /> Back to Registry
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Main Body */}
        <div className="md:col-span-8 space-y-6">
          {/* Identity Shard */}
          <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-1 h-4 bg-accent-primary rounded-full" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Identity Metadata</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Full Patient Name" icon={<User size={16}/>} placeholder="e.g. Ellen Ripley" value={formData.fullName} onChange={v => setFormData({...formData, fullName: v})} />
                <InputGroup label="Contact Shard (Email)" icon={<Mail size={16}/>} placeholder="ripley@weyland.com" type="email" value={formData.email} onChange={v => setFormData({...formData, email: v})} />
                <InputGroup label="Comms (Phone)" icon={<Phone size={16}/>} placeholder="+1 555-01-XX" value={formData.phone} onChange={v => setFormData({...formData, phone: v})} />
                <InputGroup label="Birth Cycle (DOB)" icon={<Activity size={16}/>} placeholder="YYYY-MM-DD" type="date" value={formData.dob} onChange={v => setFormData({...formData, dob: v})} />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">Residential Sector (Address)</label>
                <div className="relative group">
                  <Home className="absolute left-4 top-5 text-slate-300 group-focus-within:text-accent-primary transition-colors" size={16} />
                  <textarea 
                    rows={3}
                    className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-4 pl-12 pr-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white resize-none"
                    placeholder="Sector 12, Weyland Colony..."
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Biological & Insurance Shard */}
          <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-1 h-4 bg-accent-primary rounded-full" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Bio & Protocol Metadata</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">Gender Identity</label>
                  <div className="flex gap-2">
                    {['M', 'F', 'NB'].map(g => (
                      <button 
                        key={g} type="button" 
                        onClick={() => setFormData({...formData, gender: g})}
                        className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.gender === g ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20' : 'bg-slate-50 dark:bg-black/10 text-slate-400'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">Biological Blood Shard</label>
                  <select 
                    className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-4 px-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white"
                    value={formData.bloodType}
                    onChange={e => setFormData({...formData, bloodType: e.target.value})}
                  >
                    {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <InputGroup label="Network Coverage (Insurance ID)" icon={<ShieldCheck size={16}/>} placeholder="WEY-XXXXX-99" value={formData.insuranceId} onChange={v => setFormData({...formData, insuranceId: v})} />
                <InputGroup label="Emergency Node (Contact)" icon={<AlertCircle size={16}/>} placeholder="+1 555-99-XX" value={formData.emergencyContact} onChange={v => setFormData({...formData, emergencyContact: v})} />
              </div>
            </div>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="md:col-span-4 space-y-6">
          <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-1 h-4 bg-accent-primary rounded-full" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Clinical Summary</h3>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                Adding this patient will initialize a new Global Medical ID. All records will be encrypted using the Weyland Sector Protocol.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3 text-emerald-500">
                  <CheckCircle2 size={16} />
                  <span className="text-[9px] font-black uppercase tracking-[0.1em]">256-bit Encryption Verified</span>
                </div>
                <div className="flex items-center gap-3 text-blue-500">
                  <Activity size={16} />
                  <span className="text-[9px] font-black uppercase tracking-[0.1em]">Sana AI Record Ready</span>
                </div>
              </div>
            </div>
          </Card>

          <Button 
            disabled={loading}
            type="submit"
            className="w-full bg-accent-primary text-white py-6 rounded-[32px] text-[11px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-95 transition-all border-none"
          >
            {loading ? 'Propagating Record...' : 'Confirm Intake'}
          </Button>
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
