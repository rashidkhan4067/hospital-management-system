import React from 'react';
import { Cpu, Activity } from 'lucide-react';
import { Card } from '@/shared/components/ui';
import ConfigSelect from './ConfigSelect';

export default function AIIntelligenceMatrix({ config, setConfig }) {
  return (
    <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
      <div className="space-y-8">
        <div className="flex items-center gap-3">
           <div className="w-1 h-4 bg-accent-primary rounded-full" />
           <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Intelligence Matrix</h3>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Intent Confidence Threshold</label>
              <span className="text-[11px] font-black text-accent-primary">{(config.confidenceThreshold * 100).toFixed(0)}%</span>
            </div>
            <input 
              type="range" min="0.5" max="0.99" step="0.01"
              className="w-full accent-accent-primary h-1.5 bg-slate-100 dark:bg-white/5 rounded-full appearance-none cursor-pointer"
              value={config.confidenceThreshold}
              onChange={e => setConfig({...config, confidenceThreshold: parseFloat(e.target.value)})}
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
  );
}
