import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Camera, 
  Edit3, 
  Lock, 
  Globe, 
  Bell, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/core/auth/AuthContext';
import { PageHeader, Button, Card, Badge } from '@/components/primitives';
import { motion } from 'framer-motion';

/**
 * 👤 Identity Shard Protocol (Profile Page)
 * High-fidelity personal identity management for clinical personnel.
 */
export default function Profile() {
  const { user, role } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: user?.displayName || 'Admin Node-01',
    email: user?.email || 'admin@alshifaa.com',
    phone: '+1 555-01-XX',
    role: role || 'SYSTEM ADMIN',
    bio: 'Overseeing clinical node propagation and neural shard orchestration at Al Shifaa Medical Matrix.',
    location: 'Sector-4 Mainframe'
  });

  const handleUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 p-4 md:p-6 pb-20">
      
      <PageHeader 
        title="Identity Shard" 
        subtitle="Personal Metadata & Authorization Console"
        actions={
          <Button 
            onClick={handleUpdate}
            disabled={loading}
            className="bg-accent-primary text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/20 border-none"
          >
            {loading ? 'Propagating...' : 'Sync Identity Shard'}
          </Button>
        }
      />

      {success && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-3 text-emerald-500 mb-8"
        >
          <CheckCircle2 size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">Identity Shard Updated Successfully</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Profile Identity Shard */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm text-center">
             <div className="relative w-32 h-32 mx-auto mb-6 group">
                <div className="w-full h-full rounded-[40px] bg-accent-primary/10 flex items-center justify-center text-accent-primary font-black text-3xl shadow-inner border border-accent-primary/20">
                   {profileData.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center text-slate-400 hover:text-accent-primary transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                   <Camera size={18} />
                </button>
             </div>
             
             <div className="space-y-1">
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white leading-none">{profileData.fullName}</h3>
                <p className="text-[9px] font-black text-accent-primary uppercase tracking-[0.3em] mt-2 italic px-3 py-1 bg-accent-primary/10 rounded-full inline-block">{profileData.role}</p>
             </div>

             <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 space-y-4">
                <ProfileStat label="Active Node" value={profileData.location} />
                <ProfileStat label="Authorization" value="Level-9" />
                <ProfileStat label="Last Sync" value="12m ago" />
             </div>
          </Card>

          <Card className="p-8 bg-black/5 dark:bg-black/40 border-none rounded-[40px] shadow-inner">
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-1 h-4 bg-accent-primary rounded-full" />
                   <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Security Node</h3>
                </div>
                <div className="space-y-3">
                   <SecurityNode icon={<ShieldCheck size={14}/>} label="2FA Protocol" status="Active" />
                   <SecurityNode icon={<Lock size={14}/>} label="AES-Link" status="Verified" />
                   <SecurityNode icon={<Activity size={14}/>} label="Audit Log" status="Oversight" />
                </div>
             </div>
          </Card>
        </div>

        {/* Identity Metadata Shard */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="p-10 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
             <div className="space-y-8">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-1 h-4 bg-accent-primary rounded-full" />
                   <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Identity Fragments</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <FragmentInput label="Identity Handle" icon={<User size={16}/>} value={profileData.fullName} onChange={v => setProfileData({...profileData, fullName: v})} />
                   <FragmentInput label="Email Propagation" icon={<Mail size={16}/>} value={profileData.email} onChange={v => setProfileData({...profileData, email: v})} />
                   <FragmentInput label="Comms Shard" icon={<Phone size={16}/>} value={profileData.phone} onChange={v => setProfileData({...profileData, phone: v})} />
                   <FragmentInput label="Clinical Basin" icon={<Globe size={16}/>} value={profileData.location} onChange={v => setProfileData({...profileData, location: v})} />
                </div>

                <div className="space-y-2 pt-4">
                   <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">Personal Shard Bio</label>
                   <textarea 
                     rows={4}
                     className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-[32px] py-6 px-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white resize-none"
                     value={profileData.bio}
                     onChange={e => setProfileData({...profileData, bio: e.target.value})}
                   />
                </div>
             </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm flex items-center justify-between group cursor-pointer hover:bg-accent-primary/5 transition-all">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                     <Lock size={20} />
                   </div>
                   <div className="space-y-0.5">
                      <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">Security Credentials</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Update Master Key</p>
                   </div>
                </div>
                <Edit3 size={16} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
             </Card>

             <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm flex items-center justify-between group cursor-pointer hover:bg-accent-primary/5 transition-all">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                     <Bell size={20} />
                   </div>
                   <div className="space-y-0.5">
                      <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">Alert Preferences</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Tune Propagation</p>
                   </div>
                </div>
                <Edit3 size={16} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileStat({ label, value }) {
  return (
    <div className="flex justify-between items-center px-2">
       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
       <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{value}</span>
    </div>
  )
}

function SecurityNode({ icon, label, status }) {
  return (
    <div className="flex justify-between items-center group">
       <div className="flex items-center gap-3">
          <div className="text-emerald-500 group-hover:scale-110 transition-all">{icon}</div>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
       </div>
       <span className="text-[9px] font-black uppercase text-emerald-500">{status}</span>
    </div>
  )
}

function FragmentInput({ label, icon, value, onChange }) {
  return (
    <div className="space-y-2">
       <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">{label}</label>
       <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent-primary transition-colors">
            {icon}
          </div>
          <input 
            type="text" 
            className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-5 pl-12 pr-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white"
            value={value}
            onChange={e => onChange(e.target.value)}
          />
       </div>
    </div>
  )
}
