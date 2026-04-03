import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { PageHeader, Button, Card, Badge } from '../../../components/ui';
import { motion, AnimatePresence } from 'framer-motion';

import { useAdminSystem } from '../../../hooks/admin/useAdminSystem';
import { useUI } from '../../../context/UIContext';
import PageLoader from '../../../components/common/Loading';

/**
 * 📡 Global Alert Propagation Shard
 * Multi-channel clinical notification system (SMS, Email, Push).
 */
export default function Alerts() {
  const navigate = useNavigate();
  const { alerts, createAlert, loading: systemLoading, refresh } = useAdminSystem();
  const { addNotification } = useUI();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [alert, setAlert] = useState({
    title: '',
    message: '',
    channel: 'PUSH',
    priority: 'info',
    audience: 'ALL'
  });

  const handlePropagate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createAlert({
        title: alert.title,
        message: alert.message,
        priority: alert.priority
      });
      setSuccess(true);
      refresh();
      addNotification('Alert Propagated', 'Global delivery initialized across all clinical shards.', 'success');
      setAlert({ title: '', message: '', channel: 'PUSH', priority: 'info', audience: 'ALL' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      addNotification('Propagation Failure', 'System could not broadcast alert shard.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (systemLoading && alerts.length === 0) return <PageLoader />;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 p-4 md:p-6 pb-20">
      
      <PageHeader 
        title="Global Alert Node" 
        subtitle="Network-wide Notification Propagation Protocol"
        actions={
          <Button 
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
                    { id: 'info', icon: <Globe size={14}/>, label: 'Stable' },
                    { id: 'warning', icon: <ShieldAlert size={14}/>, label: 'Critical' },
                    { id: 'critical', icon: <Zap size={14}/>, label: 'Sector-0' }
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

      {/* 📜 Propagation History Shard */}
      <div className="space-y-6 pt-4">
         <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4">
               <div className="w-1 h-8 bg-accent-primary rounded-full" />
               <h2 className="text-xl font-black italic uppercase tracking-tight">Recent Propagation Shards</h2>
            </div>
         </div>

         <div className="grid grid-cols-1 gap-4">
            {alerts && alerts.length === 0 ? (
              <div className="p-12 bg-bg-offset dark:bg-white/5 rounded-[40px] border border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-40">
                 <History size={32} className="mb-3" />
                 <p className="text-[10px] font-black uppercase tracking-widest leading-none">No propagation history found in this sector</p>
              </div>
            ) : alerts && alerts.slice(0, 5).map((a, i) => (
               <motion.div
                 key={a.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="p-6 bg-white dark:bg-slate-900/40 border border-white/5 rounded-[32px] flex items-center justify-between group hover:bg-bg-base dark:hover:bg-white/5 transition-all"
               >
                  <div className="flex items-center gap-6">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        a.priority === 'critical' ? 'bg-rose-500/10 text-rose-500' : 
                        a.priority === 'warning' ? 'bg-amber-500/10 text-amber-500' : 
                        'bg-accent-primary/10 text-accent-primary'
                     }`}>
                        {a.priority === 'critical' ? <Zap size={20} /> : <Bell size={20} />}
                     </div>
                     <div className="space-y-1">
                        <p className="text-[13px] font-black uppercase italic tracking-tight">{a.title}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate max-w-[400px]">{a.message}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-8 text-right">
                     <div className="hidden md:block">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Time-Stamp</p>
                        <p className="text-[9px] font-bold opacity-60 uppercase">{new Date(a.created_at || a.timestamp).toLocaleString()}</p>
                     </div>
                     <Badge className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase text-white shadow-lg ${
                        a.priority === 'critical' ? 'bg-rose-500 shadow-rose-500/20' : 
                        a.priority === 'warning' ? 'bg-amber-500 shadow-amber-500/20' : 
                        'bg-emerald-500 shadow-emerald-500/20'
                     }`}>
                        {a.priority}
                     </Badge>
                  </div>
               </motion.div>
            ))}
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

