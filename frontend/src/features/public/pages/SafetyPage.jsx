import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, UserCheck, HardDrive, EyeOff, Activity } from 'lucide-react';
import { Badge } from '@/shared/components/ui';
import PageContainer from '@/shared/components/common/PageContainer';
import SEO from '@/shared/components/common/SEO';

/**
 * 🛡️ SafetyPage - Patient Data Protection & Clinical Standards
 */
export default function SafetyPage() {
  useEffect(() => window.scrollTo(0, 0), []);

  const protocols = [
    { 
       icon: <Lock size={24} />, 
       label: "Encryption Hub", 
       title: "End-to-End Session Masking", 
       desc: "Every voice consultation and message is encrypted at the source using AES-256 GCM logic."
    },
    { 
       icon: <UserCheck size={24} />, 
       label: "Identity Verification", 
       title: "Verified Practitioner Network", 
       desc: "All specialists in the Al Shifaa hub undergo 3nd-party PMDC verification before access."
    },
    { 
       icon: <HardDrive size={24} />, 
       label: "Storage Security", 
       title: "Atomic Decentralized Vaults", 
       desc: "Patient files are stored in isolated clinical vaults with Zero-Knowledge encryption."
    },
    { 
       icon: <EyeOff size={24} />, 
       label: "Anonymity Layer", 
       title: "AI Anonymization Units", 
       desc: "Medical records are automatically stripped of PII via our internal AI cleaning pipeline."
    }
  ];

  return (
    <PageContainer 
      title="Privacy & Protocol" 
      description="Clinical safety is not a feature; it is our foundation. We implement sovereign data protocols."
      maxWidth="full"
      className="bg-white p-0!"
    >
      <SEO 
        title="Clinical Safety Hub" 
        description="Unified security protocols and sovereign health data protection for our patient network." 
      />
      {/* 🛡️ Safety Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-[400px] lg:w-[600px] h-full bg-[#fbfcfd] -z-10 skew-x-[15deg] -translate-x-[100px] hidden lg:block"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-50/20 blur-[120px] -z-10"></div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-6 lg:max-w-4xl">
                <div className="flex items-center gap-4">
                    <Badge className="bg-blue-50 text-[#007aff] border-none px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em]">Protocol V4.0 Active</Badge>
                    <span className="text-[#86868b] text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <Activity size={12} className="text-[#007aff] animate-pulse" /> 100% Safe Node
                    </span>
                </div>
                <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black text-[#1d1d1f] tracking-tighter leading-[0.85]">
                   Privacy & <br/> <span className="text-[#007aff]">Protocol.</span>
                </h1>
                <p className="text-xl lg:text-3xl text-[#1d1d1f] font-medium leading-relaxed max-w-2xl opacity-80 pt-6">
                    Clinical safety is not a feature; it is our foundation. We implement sovereign data protocols to protect your health sovereignty.
                </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🧬 Security Protocol Grid */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {protocols.map((p, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="p-12 lg:p-16 bg-[#fbfbfd] rounded-[56px] border border-slate-50 group hover:border-[#007aff]/30 hover:bg-white transition-all shadow-sm hover:shadow-2xl hover:shadow-blue-500/5"
                    >
                        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-[#007aff] shadow-soft mb-10 group-hover:scale-110 transition-transform ring-1 ring-slate-100">
                             {p.icon}
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868b] mb-3">{p.label}</p>
                        <h3 className="text-2xl lg:text-4xl font-black text-[#1d1d1f] mb-6">{p.title}</h3>
                        <p className="text-lg lg:text-xl text-[#86868b] leading-relaxed font-medium">
                            {p.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 🗺️ Compliance Map Section */}
      <section className="py-32 lg:py-48 bg-[#fbfbfd] border-t border-slate-100 overflow-hidden relative">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-20">
                <div className="lg:w-1/2 space-y-12">
                <h2 className="text-5xl lg:text-7xl font-black text-[#1d1d1f] tracking-tighter leading-none italic uppercase">
                         Zero Trust <br /> Architecture.
                      </h2>
                   
                   <div className="grid grid-cols-2 gap-8">
                       {[
                           { label: "Identity", value: "Bio-Login" },
                           { label: "Tokenization", value: "JWT-Sec10" },
                           { label: "Verification", value: "2FA-Unit" },
                           { label: "Logging", value: "Immutable" }
                       ].map((item, i) => (
                           <div key={i} className="space-y-1">
                               <p className="text-[9px] font-black uppercase tracking-widest text-[#007aff] leading-none">{item.label}</p>
                               <p className="text-2xl lg:text-3xl font-black text-[#1d1d1f] leading-none uppercase">{item.value}</p>
                           </div>
                       ))}
                   </div>
                </div>
                
                <div className="lg:w-1/2 relative">
                    <div className="w-full aspect-square bg-[#1d1d1f] rounded-[64px] shadow-2xl flex items-center justify-center p-12 lg:p-20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#007aff]/30 to-transparent"></div>
                        <ShieldCheck size={200} strokeWidth={0.5} className="text-[#007aff] animate-pulse relative z-10" />
                        <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl z-20">
                           <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Internal Monitor</p>
                           <p className="text-xl font-bold text-white tracking-tight">Active Protocol Integrity: 100%</p>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </section>
    </PageContainer>
  );
}
