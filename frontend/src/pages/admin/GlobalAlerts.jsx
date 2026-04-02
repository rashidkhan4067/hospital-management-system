import React, { useState } from 'react';
import { 
  Bell, 
  Send, 
  ShieldAlert, 
  Users, 
  Globe, 
  Mail, 
  MessageCircle, 
  Zap, 
  CheckCircle2,
  AlertTriangle,
  History
} from 'lucide-react';
import { PageHeader, Button, Card } from '../../components/ui';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 📡 Global Alert Propagation Shard
 * Multi-channel clinical notification system (SMS, Email, Push).
 */
export default function GlobalAlerts() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [alert, setAlert] = useState({
    title: '',
    message: '',
    channel: 'PUSH',
    priority: 'STABLE',
    audience: 'ALL'
  });

  const handlePropagate = (e) => {
    e.preventDefault();
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
        title="Global Alert Node" 
        subtitle="Network-wide Notification Propagation Protocol"
        actions={
          <Button 
            onClick={() => navigate('/admin/notifs/history')}
            className="bg-transparent text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 border-none text-[9px] font-black uppercase tracking-widest"
          >
            <History size={14} /> Propagation History
          </Button>
        }
      />

      {success && (
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-[32px] flex items-center gap-4 text-emerald-500 mb-8 shadow-sm"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-[11px] font-black uppercase tracking-widest leading-none">Alert Propagated</h3>
            <p className="text-[9px] font-bold opacity-60 uppercase tracking-widest">Global delivery initialized across all clinical shards.</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Composition Shard */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
             <form onSubmit={handlePropagate} className="space-y-8">
                <div className="flex items-center gap-3">
                   <div className="w-1 h-4 bg-rose-500 rounded-full" />
                   <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Compose Operational Alert</h3>
                </div>

                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">Header Shard (Subject)</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. SYSTEM MAINTENANCE: SECTOR 12"
                        className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-5 px-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white"
                        value={alert.title}
                        onChange={e => setAlert({...alert, title: e.target.value})}
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">Message Body Shard</label>
                      <textarea 
                        required
                        rows={5}
                        placeholder="Clinical personnel: Emergency protocols initiated. Verify all life-support matrix nodes..."
                        className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-[32px] py-6 px-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white resize-none"
                        value={alert.message}
                        onChange={e => setAlert({...alert, message: e.target.value})}
                      />
                   </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Button 
                    disabled={loading}
                    type="submit"
                    className="flex-1 bg-rose-500 text-white py-6 rounded-[32px] text-[11px] font-black uppercase tracking-[0.3em] shadow-xl shadow-rose-500/20 hover:scale-[1.02] active:scale-95 transition-all border-none flex items-center justify-center gap-3"
                  >
                    {loading ? 'Initializing Propagation...' : <><Send size={16}/> Propagate Alert</>}
                  </Button>
                </div>
             </form>
          </Card>
        </div>

        {/* Configuration Shard */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
             <div className="space-y-8">
                <div className="flex items-center gap-3">
                   <div className="w-1 h-4 bg-accent-primary rounded-full" />
                   <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Propagation Config</h3>
                </div>

                <ConfigMatrix 
                  label="Delivery Channel" 
                  options={[
                    { id: 'PUSH', icon: <Bell size={14}/>, label: 'Push Hub' },
                    { id: 'MAIL', icon: <Mail size={14}/>, label: 'Email Shard' },
                    { id: 'SMS', icon: <MessageCircle size={14}/>, label: 'Comms Shard' }
                  ]}
                  value={alert.channel}
                  onChange={v => setAlert({...alert, channel: v})}
                />

                <ConfigMatrix 
                  label="Urgency Node" 
                  options={[
                    { id: 'STABLE', icon: <Globe size={14}/>, label: 'Stable' },
                    { id: 'CRITICAL', icon: <ShieldAlert size={14}/>, label: 'Critical' },
                    { id: 'EMERGENCY', icon: <Zap size={14}/>, label: 'Sector-0' }
                  ]}
                  value={alert.priority}
                  onChange={v => setAlert({...alert, priority: v})}
                />

                <ConfigMatrix 
                  label="Target Audience" 
                  options={[
                    { id: 'ALL', icon: <Globe size={14}/>, label: 'Whole Matrix' },
                    { id: 'MEDICAL', icon: <Users size={14}/>, label: 'Medical Elite' },
                    { id: 'STAFF', icon: <Users size={14}/>, label: 'Facility Staff' }
                  ]}
                  value={alert.audience}
                  onChange={v => setAlert({...alert, audience: v})}
                />
             </div>
          </Card>

          <Card className="p-8 bg-rose-500/5 border border-rose-500/10 rounded-[40px]">
             <div className="flex items-center gap-3 text-rose-500 mb-3">
               <AlertTriangle size={18} />
               <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-500 italic underline decoration-transparent">Emergency Protocol</h4>
             </div>
             <p className="text-[9px] font-black uppercase tracking-[0.2em] text-rose-400 leading-relaxed">
               Propagating a Sector-0 alert bypasses all clinical silence protocols. Use with extreme caution.
             </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ConfigMatrix({ label, options, value, onChange }) {
  return (
    <div className="space-y-3">
       <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">{label}</label>
       <div className="grid grid-cols-1 gap-2">
          {options.map(opt => (
            <button
               key={opt.id}
               onClick={() => onChange(opt.id)}
               className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all border-none ${
                 value === opt.id 
                 ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20 scale-[1.02]' 
                 : 'bg-slate-50 dark:bg-black/10 text-slate-400 hover:text-slate-600 dark:hover:text-white'
               }`}
            >
               <div className="flex items-center gap-3">
                  <div className={value === opt.id ? 'text-white' : 'text-slate-300'}>{opt.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{opt.label}</span>
               </div>
               {value === opt.id && <CheckCircle2 size={14} />}
            </button>
          ))}
       </div>
    </div>
  );
}
