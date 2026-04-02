import React, { useState } from 'react';
import { 
  Bot, 
  Terminal, 
  Zap, 
  Cpu, 
  ShieldCheck, 
  Activity,
  Search,
  Settings,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { PageHeader, Button, Card } from '../../components/ui';
import { motion } from 'framer-motion';

/**
 * 🛰️ Sana AI Neural Configuration Console
 * High-fidelity interface for tuning assistant intelligence and propagation nodes.
 */
export default function AIConfig() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [config, setConfig] = useState({
    confidenceThreshold: 0.85,
    maxLatency: 150,
    model: 'Sana-v4-Enterprise',
    voiceEnabled: true,
    diagnosticDepth: 'Advanced'
  });

  const handleSave = () => {
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
        title="Neural Configuration" 
        subtitle="Global AI Propagation & Intelligence Tuning"
        actions={
          <Button 
            onClick={handleSave}
            disabled={loading}
            className="bg-accent-primary text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/20 border-none"
          >
            {loading ? 'Propagating...' : 'Commit Settings'}
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
          <span className="text-[10px] font-black uppercase tracking-widest">Neural Parameters Synced Successfully</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Intelligence Matrix */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                 <div className="w-1 h-4 bg-accent-primary rounded-full" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Intelligence Matrix</h3>
              </div>

              <div className="space-y-8">
                {/* Confidence Threshold Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Intent Confidence Threshold</label>
                    <span className="text-[11px] font-black text-accent-primary">{(config.confidenceThreshold * 100).toFixed(0)}%</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="0.99" step="0.01"
                    className="w-full accent-accent-primary h-1.5 bg-slate-100 dark:bg-white/5 rounded-full appearance-none cursor-pointer"
                    value={config.confidenceThreshold}
                    onChange={e => setConfig({...config, confidenceThreshold: e.target.value})}
                  />
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Minimum probability required for Sana to execute autonomous clinical intents.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <ConfigSelect 
                    label="Active Neural Model" 
                    icon={<Cpu size={16}/>} 
                    options={['Sana-v4-Enterprise', 'Sana-v4-Internal', 'Clinical-Llama-70B']} 
                    value={config.model}
                    onChange={v => setConfig({...config, model: v})}
                  />
                  <ConfigSelect 
                    label="Diagnostic Depth" 
                    icon={<Activity size={16}/>} 
                    options={['Basic', 'Intermediate', 'Advanced', 'Full-Autonomous']} 
                    value={config.diagnosticDepth}
                    onChange={v => setConfig({...config, diagnosticDepth: v})}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
             <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-1 h-4 bg-accent-primary rounded-full" />
                   <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Interface Protocols</h3>
                </div>
                
                <div className="flex items-center justify-between p-6 bg-bg-base dark:bg-black/20 rounded-3xl border border-transparent hover:border-accent-primary/10 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-accent-primary/10 text-accent-primary rounded-xl">
                        <Zap size={18} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">Real-time Voice Propagation</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">Enable low-latency clinical audio intents</p>
                      </div>
                   </div>
                   <button 
                    onClick={() => setConfig({...config, voiceEnabled: !config.voiceEnabled})}
                    className={`w-12 h-6 rounded-full transition-all relative ${config.voiceEnabled ? 'bg-accent-primary shadow-lg shadow-accent-primary/20' : 'bg-slate-300 dark:bg-white/5'}`}
                   >
                     <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${config.voiceEnabled ? 'left-7' : 'left-1'}`} />
                   </button>
                </div>
             </div>
          </Card>
        </div>

        {/* System Health */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-8 bg-black/5 dark:bg-black/40 border-none rounded-[40px] shadow-inner">
             <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-1 h-4 bg-accent-primary rounded-full" />
                   <h3 className="text-[11px] font-black uppercase tracking-[0.3em] italic text-slate-400">Node Status</h3>
                </div>
                
                <div className="space-y-4">
                   <StatusItem label="Neural Uptime" value="1,482 Hours" status="emerald" />
                   <StatusItem label="Mean Latency" value="24ms" status="emerald" />
                   <StatusItem label="Safety Guard" value="Active" status="blue" />
                   <StatusItem label="Kernel Load" value="12.4%" status="amber" />
                </div>
             </div>
          </Card>

          <Card className="p-8 bg-accent-primary/5 border border-accent-primary/10 rounded-[40px]">
             <p className="text-[9px] font-black uppercase tracking-widest text-accent-primary text-center leading-relaxed">
               Modifying neural settings affects all connected clinical nodes. High diagnostic depth requires additional GPU processing credits.
             </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ConfigSelect({ label, icon, options, value, onChange }) {
  return (
    <div className="space-y-2">
       <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">{label}</label>
       <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent-primary transition-colors">
            {icon}
          </div>
          <select 
            className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-4 pl-12 pr-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white"
            value={value}
            onChange={e => onChange(e.target.value)}
          >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
       </div>
    </div>
  );
}

function StatusItem({ label, value, status }) {
  const colors = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    amber: 'bg-amber-500'
  }
  return (
    <div className="flex items-center justify-between p-2">
       <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
       <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${colors[status]}`} />
          <span className="text-[10px] font-black uppercase leading-none">{value}</span>
       </div>
    </div>
  )
}
