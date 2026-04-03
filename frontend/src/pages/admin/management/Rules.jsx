import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Globe, 
  Mail, 
  CreditCard, 
  Bot, 
  Database, 
  ShieldCheck, 
  Zap, 
  Activity, 
  MoreHorizontal,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { PageHeader, Button, Card } from '../../../components/ui';
import { motion } from 'framer-motion';

import { systemService } from '../../../services/admin/managementService';

/**
 * ⚙️ System Protocol Console (Global Settings)
 * Enterprise-grade configuration hub for clinical network protocols.
 */
export default function Rules() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [settings, setSettings] = useState({
    hospitalName: 'Al Shifaa Medical Matrix',
    networkUrl: 'https://matrix.alshifaa.com',
    defaultCurrency: 'USD',
    emailProtocol: 'SMTP-SECURE',
    adminOverride: true,
    dataRetention: '7-YEARS'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await systemService.getConfig('global_settings');
        if (data && data.value) setSettings(data.value);
      } catch (error) {
        console.error('Failed to resolve global metadata shard:', error);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await systemService.updateConfig('global_settings', { value: settings });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
       // if not found, create it (simplified for this task)
       try {
         await systemService.post('/config/', { key: 'global_settings', value: settings });
         setSuccess(true);
       } catch (err) {
         console.error('Propagation Failure:', err);
       }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 p-4 md:p-6 pb-20">
      
      <PageHeader 
        title="System Protocols" 
        subtitle="Global Clinical Network Configuration & Metadata Registry"
        actions={
          <Button 
            onClick={handleSave}
            disabled={loading}
            className="bg-accent-primary text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/20 border-none"
          >
            {loading ? 'Propagating...' : 'Commit Protocol Changes'}
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
          <span className="text-[10px] font-black uppercase tracking-widest">Protocol Matrix Synced Successfully</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Network & Identity Shards */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
             <div className="space-y-8">
                <div className="flex items-center gap-3">
                   <div className="w-1 h-4 bg-accent-primary rounded-full" />
                   <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Network Shard Identity</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <InputProtocol 
                      label="Visual Entity Name" 
                      icon={<Globe size={16}/>} 
                      placeholder="Al Shifaa Medical Matrix" 
                      value={settings.hospitalName} 
                      onChange={v => setSettings({...settings, hospitalName: v})} 
                    />
                   <InputProtocol 
                      label="Network URL Propagation" 
                      icon={<Database size={16}/>} 
                      placeholder="https://..." 
                      value={settings.networkUrl} 
                      onChange={v => setSettings({...settings, networkUrl: v})} 
                    />
                   <SelectProtocol 
                      label="Financial Shard Currency" 
                      icon={<CreditCard size={16}/>} 
                      options={['USD', 'EUR', 'GBP', 'PKR']} 
                      value={settings.defaultCurrency} 
                      onChange={v => setSettings({...settings, defaultCurrency: v})} 
                    />
                   <SelectProtocol 
                      label="Data Retention Protocol" 
                      icon={<Activity size={16}/>} 
                      options={['5-YEARS', '7-YEARS', '10-YEARS', 'PERP']} 
                      value={settings.dataRetention} 
                      onChange={v => setSettings({...settings, dataRetention: v})} 
                    />
                </div>
             </div>
          </Card>

          <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
             <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-1 h-4 bg-accent-primary rounded-full" />
                   <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Security Override Protocol</h3>
                </div>
                
                <div className="flex items-center justify-between p-6 bg-bg-base dark:bg-black/20 rounded-3xl border border-transparent hover:border-accent-primary/10 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-accent-primary/10 text-accent-primary rounded-xl">
                        <Lock size={18} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">Master Admin Override</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">Bypass clinical safety lockouts recursively</p>
                      </div>
                   </div>
                   <button 
                    onClick={() => setSettings({...settings, adminOverride: !settings.adminOverride})}
                    className={`w-12 h-6 rounded-full transition-all relative ${settings.adminOverride ? 'bg-accent-primary shadow-lg shadow-accent-primary/20' : 'bg-slate-300 dark:bg-white/5'}`}
                   >
                     <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.adminOverride ? 'left-7' : 'left-1'}`} />
                   </button>
                </div>
             </div>
          </Card>
        </div>

        {/* Global Metadata Shard */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-8 bg-black/5 dark:bg-black/40 border-none rounded-[40px] shadow-inner">
             <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-1 h-4 bg-accent-primary rounded-full" />
                   <h3 className="text-[11px] font-black uppercase tracking-[0.3em] italic text-slate-400">Node Compliance</h3>
                </div>
                <div className="space-y-4">
                   <ComplianceItem label="HIPAA Shard" value="Verified" icon={<ShieldCheck size={14}/>} />
                   <ComplianceItem label="HL7 Protocol" value="Active" icon={<Zap size={14}/>} />
                   <ComplianceItem label="AES-256 Link" value="Encrypted" icon={<Lock size={14}/>} />
                </div>
             </div>
          </Card>

          <Card className="p-8 bg-accent-primary/5 border border-accent-primary/10 rounded-[40px]">
             <p className="text-[9px] font-black uppercase tracking-widest text-accent-primary text-center leading-relaxed">
               Propagating protocol changes will restart specific clinical nodes. Ensure zero active surgical matrix sessions.
             </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InputProtocol({ label, icon, placeholder, value, onChange }) {
  return (
    <div className="space-y-2">
       <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">{label}</label>
       <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent-primary transition-colors">
            {icon}
          </div>
          <input 
            type="text" 
            placeholder={placeholder}
            className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-5 pl-12 pr-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white"
            value={value}
            onChange={e => onChange(e.target.value)}
          />
       </div>
    </div>
  );
}

function SelectProtocol({ label, icon, options, value, onChange }) {
  return (
    <div className="space-y-2">
       <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">{label}</label>
       <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent-primary transition-colors">
            {icon}
          </div>
          <select 
            className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-5 pl-12 pr-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white appearance-none"
            value={value}
            onChange={e => onChange(e.target.value)}
          >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
       </div>
    </div>
  );
}

function ComplianceItem({ label, value, icon }) {
  return (
    <div className="flex items-center justify-between group">
       <div className="flex items-center gap-3">
          <div className="text-emerald-500 group-hover:scale-110 transition-all">{icon}</div>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
       </div>
       <span className="text-[9px] font-black uppercase text-emerald-500">{value}</span>
    </div>
  );
}

