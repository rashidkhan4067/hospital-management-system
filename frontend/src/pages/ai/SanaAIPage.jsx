import React from 'react';
import { PageHeader, Badge, Card } from '../../components/ui';
import { Sparkles, History, Bot, Zap, ShieldCheck } from 'lucide-react';
import SanaAIChat from '../../components/features/ai/SanaAIChat';

/**
 * 🛰️ Unified Sana Neural Experience
 * Public assistant page for patients/doctors.
 */
export default function SanaAIPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-700">
      
      {/* 🔮 Intelligence Metrics Layer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
         <MetricCard label="Neural Latency" value="340ms" icon={Zap} color="text-teal-400" />
         <MetricCard label="Model Core" value="Llama-3.3" icon={Bot} color="text-blue-400" />
         <MetricCard label="Bimodal State" value="Stable" icon={ShieldCheck} color="text-emerald-400" />
         <MetricCard label="Context Shards" value="Active" icon={Sparkles} color="text-fuchsia-400" />
      </div>

      <div className="flex-1 flex items-center justify-center">
          <SanaAIChat />
      </div>
      
      <div className="mt-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">
            Powered by Groq High-Performance Inference Shards
          </p>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon: Icon, color }) {
    return (
        <Card className="p-5 bg-white/5 border-white/5 backdrop-blur-xl rounded-[28px] group hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                    <Icon size={20} />
                </div>
                <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 leading-none">{label}</p>
                    <p className="text-sm font-black text-white mt-1 uppercase tracking-tight">{value}</p>
                </div>
            </div>
        </Card>
    );
}
