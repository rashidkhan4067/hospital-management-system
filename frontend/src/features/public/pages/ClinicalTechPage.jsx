import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu as Brain, Binary, Database, Microscope, Boxes } from 'lucide-react';
import { Badge, Button } from '@/components/primitives';
import PageContainer from '@/components/composed/PageContainer';
import SEO from '@/components/composed/SEO';

/**
 * 🛠️ ClinicalTechPage - Performance Optimized Edition
 */
export default function ClinicalTechPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    { 
       icon: <Brain size={28} />, 
       label: "Agentic Hub", 
       title: "Neural Diagnostics", 
       desc: "Al Shifaa specialists utilize real-time agentic research nodes for high-precision diagnostic analysis."
    },
    { 
       icon: <Binary size={28} />, 
       label: "Clinical Tubes", 
       title: "Unified Shard Network", 
       desc: "Connecting Pakistani medical nodes to global clinical protocols via high-integrity streaming."
    },
    { 
       icon: <Database size={28} />, 
       label: "Atomic Consistency", 
       title: "Immutable Health Ledger", 
       desc: "Medical records are managed using atomic locking protocols, ensuring absolute data integrity."
    },
    { 
       icon: <Microscope size={28} />, 
       label: "Precision Unit", 
       title: "Live Consult Stream", 
       desc: "Integrated biometric data-flow providing specialists with immediate diagnostic telemetry."
    }
  ];

  return (
    <PageContainer 
      title="Internal Clinical Tech" 
      description="Engineered for high-fidelity clinical precision and sovereign health data integrity."
      maxWidth="full"
      className="bg-white p-0!"
    >
      <SEO 
        title="Clinical Tech Node" 
        description="Exploring the high-fidelity cloud architecture and AI agents powering our healthcare hub." 
      />
      {/* 🚀 Tech Hero: Minimal Precision Edition */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/40 blur-[150px] -z-10 rounded-full"></div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-10"
            >
                <div className="flex items-center gap-4">
                    <Badge className="bg-[#007aff] text-white border-none px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">System Core v2.4</Badge>
                </div>
                <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black text-[#1d1d1f] tracking-tighter leading-[0.8] lg:leading-[0.75]">
                   Internal <br/> <span className="text-[#007aff]">Clinical Tech.</span>
                </h1>
                <p className="text-xl lg:text-3xl text-[#1d1d1f] font-medium leading-relaxed max-w-2xl opacity-70">
                    Engineered for high-fidelity clinical precision and sovereign health data integrity.
                </p>
            </motion.div>

            <div className="w-[340px] p-8 bg-[#fbfbfd] rounded-[40px] border border-slate-100 shadow-sm hidden lg:block">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-[#007aff] mb-6">Network Health</h4>
               <div className="space-y-4">
                   {[
                       { l: "Agent Latency", v: "152ms" },
                       { l: "DB Replication", v: "Active" },
                       { l: "Stream Integrity", v: "100%" }
                   ].map((n, i) => (
                       <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                             <p className="text-[9px] font-black uppercase text-[#86868b] tracking-widest">{n.l}</p>
                             <p className="text-sm font-black text-[#1d1d1f]">{n.v}</p>
                       </div>
                   ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🧬 Performance Optimized Capability Grid */}
      <section className="py-24 lg:py-32 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                {features.map((feature, i) => (
                    <div 
                        key={i}
                        className="p-10 lg:p-20 bg-[#fbfbfd] rounded-[48px] border border-slate-50 transition-all hover:bg-white hover:border-slate-200 hover:shadow-soft"
                    >
                        <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center text-[#007aff] shadow-sm mb-10 ring-1 ring-slate-100">
                             {feature.icon}
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#007aff] mb-4">{feature.label}</p>
                        <h3 className="text-3xl lg:text-5xl font-black text-[#1d1d1f] mb-6 leading-tight tracking-tighter">{feature.title}</h3>
                        <p className="text-lg lg:text-xl text-[#86868b] leading-relaxed font-medium">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 💎 Redesigned "Engineering Trust" Obsidian Section */}
      <section className="py-24 lg:py-48 bg-[#1d1d1f] text-white relative overflow-hidden rounded-[40px] lg:rounded-[64px] mx-4 lg:mx-8 mb-20 shadow-2xl">
         <div className="absolute top-0 right-0 w-[600px] h-full bg-[#007aff]/5 -skew-x-[20deg] translate-x-[200px]"></div>
         <div className="absolute top-10 left-10 p-8 border-l border-white/10 opacity-30">
            <p className="text-[9px] font-black uppercase tracking-widest leading-none mb-2">Internal Metric Node</p>
            <p className="text-lg font-bold font-mono">0x4F-22B</p>
         </div>

         <div className="container mx-auto px-10 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center justify-between gap-20">
            <div className="lg:w-1/2 space-y-12">
                <div className="space-y-6">
                    <Badge className="bg-white/10 text-white border-none px-6 py-2 text-[10px] font-black uppercase tracking-[0.5em]">Verified Engineering</Badge>
                    <h2 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none">
                       Engineering <br /> <span className="text-[#007aff]">Trust.</span>
                    </h2>
                    <p className="text-lg lg:text-2xl opacity-40 font-medium max-w-xl py-4">
                        Clinical outcomes are built on technical precision. We maintain absolute transparency in diagnostic throughput.
                    </p>
                </div>
                
                <div className="flex flex-wrap gap-12">
                   {[
                       { l: "NPS Rating", v: "9.8" },
                       { l: "Global Latency", v: "140ms" },
                       { l: "Data Integrity", v: "100%" }
                   ].map((s, i) => (
                       <div key={i} className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest text-[#007aff]">{s.l}</p>
                           <p className="text-3xl lg:text-5xl font-black">{s.v}</p>
                       </div>
                   ))}
                </div>
            </div>

            <div className="lg:w-2/5 w-full space-y-4">
                <div className="p-1 w-full bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
                    <div className="bg-white/5 p-10 flex flex-col items-center justify-center gap-10">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-48 h-48 border-[2px] border-dashed border-[#007aff]/30 rounded-full flex items-center justify-center"
                        >
                            <Boxes size={40} className="text-[#007aff]" />
                        </motion.div>
                        <div className="text-center space-y-2">
                           <p className="text-lg font-black text-white/80">Diagnostic Throughput</p>
                           <p className="text-[10px] font-black uppercase tracking-widest text-[#86868b]">Syncing with Unit-Alpha-4</p>
                        </div>
                    </div>
                </div>
                <Button className="w-full h-20 rounded-[32px] bg-[#007aff] text-white font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-white hover:text-[#1d1d1f] hover:scale-[1.02] transition-all">
                    Establish Technical Link
                </Button>
            </div>
         </div>
      </section>
    </PageContainer>
  );
}
