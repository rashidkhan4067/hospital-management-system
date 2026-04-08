import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Globe, 
  Database, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Lock,
  RefreshCw,
  Cpu,
  Fingerprint,
  Layers,
  Server,
  Cloud,
  ExternalLink,
  Save,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button, Card, Badge, StatsCard } from '@/components/primitives';
import AdminPage from '@/layouts/AdminPage';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';

// ─── SHARD COMPONENTS ────────────────────────────────────────────────────────

const ProtocolControl = ({ label, icon: Icon, description, children, status = 'active' }) => (
  <div className="flex items-center justify-between p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[2.5rem] group hover:border-accent-primary/20 hover:translate-x-1 transition-all duration-500 shadow-sm relative overflow-hidden">
     <div className="flex items-center gap-6 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-accent-primary group-hover:bg-accent-primary/10 transition-all duration-500 border border-transparent group-hover:border-accent-primary/10">
           <Icon size={24} strokeWidth={2.5} />
        </div>
        <div className="space-y-1.5">
           <div className="flex items-center gap-3">
              <h4 className="text-[14px] font-black uppercase italic tracking-tighter text-slate-900 dark:text-white leading-none font-display">{label}</h4>
              <div className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-amber-500 shadow-amber-500/50'} shadow-sm animate-pulse`} />
           </div>
           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic opacity-70 leading-none">{description}</p>
        </div>
     </div>
     <div className="flex items-center gap-4 relative z-10">
        {children}
     </div>
     {/* 🐝 Subtle Hover Glow */}
     <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
  </div>
);

const ComplianceShard = ({ label, status, icon: Icon }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-accent-primary/10 transition-all group">
     <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-accent-primary transition-colors shadow-sm">
           <Icon size={14} strokeWidth={2.5} />
        </div>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic">{label}</span>
     </div>
     <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest">{status}</span>
     </div>
  </div>
);

// ─── MAIN HUB ────────────────────────────────────────────────────────────────

export default function Rules() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [settings, setSettings] = useState({
    hospitalName: 'Al Shifaa Medical Matrix',
    networkUrl: 'https://matrix.alshifaa.com',
    authProtocol: 'L9-BIOMETRIC',
    archiveDelay: '42s',
    encryptionStrength: 'AES-256-GCM',
    adminOverride: true,
    dataRetention: '7-YEARS'
  });

  const kpis = [
    { label: 'System Uptime', value: '99.98%', icon: Activity, trend: '+0.02%', status: 'success' },
    { label: 'Active Nodes', value: '1,242', icon: Server, trend: 'Stable', status: 'processing' },
    { label: 'Storage Shard', value: '74%', icon: Database, trend: 'Optimal', status: 'success' },
    { label: 'Sync Latency', value: '18ms', icon: Zap, trend: '-2ms', status: 'success' },
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <AdminPage>
      <div className="space-y-8 animate-in fade-in duration-1000 italic pb-20">
        
        <PageHeader 
          title="Global System Protocols" 
          subtitle="Master Configuration Matrix & Institutional Grid Orchestration"
          actions={
            <div className="flex items-center gap-3">
               <button className="p-3 bg-white dark:bg-slate-900 rounded-2xl text-slate-400 hover:text-accent-primary transition-all shadow-2als border border-slate-50 dark:border-white/5">
                  <RefreshCw size={18} strokeWidth={2.5} />
               </button>
               <Button 
                onClick={handleSave}
                disabled={loading}
                className="bg-accent-primary text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/25 border-none hover:scale-105 active:scale-95 transition-all"
               >
                {loading ? 'Initializing Sync...' : <><Save size={16}/> Commit Protocols</>}
               </Button>
            </div>
          }
        />

        <UnifiedHeroCTA 
          compact
          title={<>System <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Orchestration.</span></>}
          subtitle="Global administrative logic hub. Manage institutional metadata, clinical safety protocols, and cross-shard synchronization parameters."
          pillPrefix="Master Control Matrix"
          pillIcon={Settings}
          actions={[
             { title: 'Security Audit', subtitle: 'L5 Log Registry', icon: ShieldCheck, onClick: () => {} },
             { title: 'Network Pulse',  subtitle: 'Live Telemetry',  icon: Activity,    onClick: () => {} }
          ]}
        />

        <UnifiedKpiGrid loading={false} stats={kpis} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* 🧩 PROTOCOL MATRIX */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-4">
                  <div className="w-1.5 h-6 bg-accent-primary rounded-full shadow-lg" />
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white font-display">Configuration Hub</h3>
               </div>
               <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest italic animate-pulse">Network Stable</Badge>
            </div>

            <div className="space-y-4">
              <ProtocolControl 
                label="Identity Gateway" 
                icon={Fingerprint} 
                description="Global biometric and L9 auth protocol mapping"
              >
                 <select className="bg-slate-50 dark:bg-black/20 border-none rounded-xl py-3 px-6 text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white appearance-none focus:ring-2 focus:ring-accent-primary/20 transition-all cursor-pointer shadow-inner">
                    <option>L9-BIOMETRIC</option>
                    <option>RFID-HARDENED</option>
                    <option>LEGACY-PASS</option>
                 </select>
              </ProtocolControl>

              <ProtocolControl 
                label="Archive Propagation" 
                icon={Database} 
                description="Cold storage shard replication frequency"
              >
                 <div className="flex items-center gap-3">
                    <input 
                      type="text" 
                      value={settings.archiveDelay}
                      onChange={e => setSettings({...settings, archiveDelay: e.target.value})}
                      className="w-20 bg-slate-50 dark:bg-black/20 border-none rounded-xl py-3 px-4 text-[11px] font-black uppercase tracking-widest text-center text-accent-primary shadow-inner italic"
                    />
                    <span className="text-[10px] font-black text-slate-400 italic">SEC</span>
                 </div>
              </ProtocolControl>

              <ProtocolControl 
                label="Encryption Core" 
                icon={Lock} 
                description="Neural link encryption standard across all units"
              >
                 <Badge className="bg-slate-900 dark:bg-black text-white border border-white/10 px-6 py-2.5 rounded-2xl text-[10px] font-black tracking-widest italic shadow-xl">
                    AES-256-GCM-AUTO
                 </Badge>
              </ProtocolControl>

              <ProtocolControl 
                label="Multi-Shard Balancing" 
                icon={Layers} 
                description="Automatic traffic redirection during load threshold"
              >
                 <button 
                  onClick={() => setSettings({...settings, adminOverride: !settings.adminOverride})}
                  className={`w-14 h-7 rounded-full relative transition-all duration-500 ${settings.adminOverride ? 'bg-accent-primary shadow-lg shadow-accent-primary/25' : 'bg-slate-200 dark:bg-white/10 shadow-inner'}`}
                 >
                    <motion.div 
                      layout
                      className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ left: settings.adminOverride ? 'calc(100% - 24px)' : '4px' }}
                    />
                 </button>
              </ProtocolControl>

              <ProtocolControl 
                label="Public Exposure Node" 
                icon={Globe} 
                description="Visibility of clinical endpoints to verified external APIs"
                status="inactive"
              >
                 <button className="flex items-center gap-2 group/btn">
                    <span className="text-[10px] font-black uppercase text-slate-400 group-hover/btn:text-accent-primary transition-colors">Configure Gate</span>
                    <ExternalLink size={14} className="text-slate-300 group-hover/btn:text-accent-primary" />
                 </button>
              </ProtocolControl>
            </div>
          </div>

          {/* 🏛️ SYSTEM IDENTITY & VITALITY */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Card className="p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als flex flex-col items-center text-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
               
               <div className="w-24 h-24 rounded-[2.5rem] bg-slate-900 flex items-center justify-center mb-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/20 to-transparent" />
                  <Cpu className="text-accent-primary w-12 h-12 relative z-10" strokeWidth={1} />
               </div>

               <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic font-display tracking-tighter leading-none">{settings.hospitalName}</h4>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3 italic mb-8">Node Identity verified - Stable</p>

               <div className="w-full space-y-4 text-left">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 px-2">
                     <span>Deployment Logic</span>
                     <span className="text-accent-primary">v2.10.4-L9</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden mb-8">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '88%' }}
                        className="h-full bg-accent-primary shadow-[0_0_20px_rgba(20,184,166,0.3)] rounded-full"
                     />
                  </div>

                  <div className="space-y-2">
                     <ComplianceShard label="HIPAA/L9 Security" status="Compliant" icon={ShieldCheck} />
                     <ComplianceShard label="Data Residency Hub" status="Region-A" icon={Cloud} />
                     <ComplianceShard label="Audit Log Shards" status="Indexed" icon={CheckCircle} />
                  </div>
               </div>

               <Button className="w-full mt-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.4em] italic shadow-2xl hover:scale-[1.02] active:scale-95 transition-all border-none font-display">
                  Initialize Sync Wave
               </Button>
            </Card>

            <Card className="flex-1 p-10 rounded-[3rem] bg-rose-500/5 border border-rose-500/10 flex flex-col justify-center gap-6 relative overflow-hidden group italic">
               <div className="flex items-center gap-4 text-rose-500">
                  <AlertTriangle size={24} />
                  <h4 className="text-[12px] font-black uppercase tracking-[0.3em]">Institutional Kill Protocol</h4>
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.1em] text-rose-400/70 leading-relaxed mb-4">
                  Activating the 'Sector-0' disconnect shard will immediately terminate all active clinical sessions and lock down the institutional grid recursively.
               </p>
               <button className="w-full bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white py-5 rounded-[2rem] border border-rose-500/20 text-[10px] font-black uppercase tracking-[0.5em] transition-all shadow-xl shadow-rose-500/5 font-display italic">
                  Terminate Institutional Matrix
               </button>
            </Card>
          </div>

        </div>

      </div>
      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 px-10 py-5 bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-500/20 text-xs font-black uppercase tracking-[0.5em] italic z-[1000] border border-white/20 backdrop-blur-md"
          >
             Global Protocols Synced Successfully
          </motion.div>
        )}
      </AnimatePresence>
    </AdminPage>
  );
}
