import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Heart, ShieldCheck, Activity, Brain, User, Calendar, MessageCircle } from 'lucide-react';
import LandingNavbar from '../../components/landing/LandingNavbar';
import LandingFooter from '../../components/landing/LandingFooter';
import { Badge, Button } from '../../components/ui';

/**
 * 🌟 ClinicalReviewsPage - Patient Success Stories & Metrics
 */
export default function ClinicalReviewsPage() {
  useEffect(() => window.scrollTo(0, 0), []);

  const reviews = [
    { 
       author: "Kamran Zahid", 
       location: "Lahore, PK", 
       spec: "Cardiology",
       title: "Unified AI Diagnosis", 
       desc: "The precision of the AI diagnostic agent paired with Dr. Ahmed's expertise was life-saving. The voice consultation was crystal clear and very professional."
    },
    { 
       author: "Sarah Mansoor", 
       location: "Karachi, PK", 
       spec: "Dermatology",
       title: "Seamless Engagement", 
       desc: "I was skeptical about AI-augmented healthcare, but the Al Shifaa portal made booking and results tracking so easy. My skin condition is now fully managed."
    },
    { 
       author: "Zulqarnain Ali", 
       location: "Islamabad, PK", 
       spec: "Neurology",
       title: "Elite Specialist Access", 
       desc: "The level of care and follow-up was unparalleled. Having my medical data atomic and synced across all units made my recovery journey much smoother."
    },
    { 
       author: "Fatima Noor", 
       location: "Faisalabad, PK", 
       spec: "Pediatrics",
       title: "Trustworthy Environment", 
       desc: "The peace of mind knowing my child's data is end-to-end encrypted is everything. The pediatricians here are the best in the country."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      
      {/* 🌟 Reviews Hero Section */}
      <section className="pt-48 pb-20 lg:pt-56 lg:pb-32 relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#007aff]/10 blur-[100px] -z-10 animate-pulse"></div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-4">
                    <Badge className="bg-yellow-50 text-yellow-600 border-none px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em]">98% Success Ratio</Badge>
                    <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                    <span className="text-[#86868b] text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <Star size={12} fill="#ffcc00" className="text-[#ffcc00]" /> 5.0 Global Rating
                    </span>
                </div>
                <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black text-[#1d1d1f] tracking-tighter leading-[0.85]">
                   Real Stories <br/> <span className="text-[#007aff]">Real Impact.</span>
                </h1>
                <p className="text-xl lg:text-3xl text-[#1d1d1f] font-medium leading-relaxed mx-auto max-w-3xl opacity-80 pt-6">
                    Our impact is measured not just in numbers, but in the recovery and trust of thousands of patients in the Al Shifaa hub.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-12 pt-12 opacity-40">
                   {[
                      { icon: <ShieldCheck size={20} />, label: "Verified Reviews" },
                      { icon: <Activity size={20} />, label: "Clinical Precision" },
                      { icon: <Heart size={20} />, label: "Patient Care" }
                   ].map((l, i) => (
                      <div key={i} className="flex items-center gap-2">
                         {l.icon}
                         <span className="text-[10px] font-black uppercase tracking-widest">{l.label}</span>
                      </div>
                   ))}
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🧬 Clinical Feedback Grid */}
      <section className="py-24 lg:py-48 bg-[#fbfbfd]">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {reviews.map((r, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-12 lg:p-16 bg-white rounded-[56px] border border-slate-100 group hover:border-[#007aff]/30 transition-all shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 relative overflow-hidden"
                    >
                        <Quote size={80} className="absolute top-10 right-10 text-[#007aff]/5 -z-0" />
                        
                        <div className="flex items-center gap-4 mb-10 relative z-10">
                            {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#007aff" className="text-[#007aff]" />)}
                        </div>
                        
                        <div className="space-y-6 relative z-10">
                            <h3 className="text-2xl lg:text-4xl font-black text-[#1d1d1f]">{r.title}</h3>
                            <p className="text-lg lg:text-xl text-[#86868b] leading-relaxed font-medium">
                                "{r.desc}"
                            </p>
                        </div>
                        
                        <div className="pt-12 mt-12 border-t border-slate-50 flex items-center justify-between relative z-10">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-[#1d1d1f]">
                                 <User size={20} />
                              </div>
                              <div>
                                 <p className="text-lg font-black text-[#1d1d1f]">{r.author}</p>
                                 <p className="text-[9px] font-black uppercase tracking-widest text-[#86868b]">{r.location}</p>
                              </div>
                           </div>
                           <Badge className="bg-slate-50 text-[#86868b] border-none px-4 py-1 text-[8px] font-black uppercase tracking-widest">{r.spec}</Badge>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 📊 Clinical Metrics Section */}
      <section className="py-32 lg:py-56 bg-white overflow-hidden relative">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-20">
                <div className="lg:w-1/2 space-y-12">
                   <div className="space-y-6">
                      <h2 className="text-5xl lg:text-[7rem] font-black text-[#1d1d1f] tracking-tighter leading-none">
                         Measured <br /> Excellence.
                      </h2>
                      <p className="text-xl lg:text-2xl text-[#86868b] leading-relaxed font-medium">
                         We use atomic clinical metrics to track the performance of our specialists and AI agents, ensuring the highest fidelity care in the hub.
                      </p>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-12">
                       {[
                           { label: "Patient NPS", value: "9.8" },
                           { label: "Accuracy", value: "99.2%" },
                           { label: "Success Rate", value: "98.5%" },
                           { label: "Consults", value: "50k+" }
                       ].map((item, i) => (
                           <div key={i} className="space-y-1">
                               <p className="text-[10px] font-black uppercase tracking-widest text-[#007aff] leading-none">{item.label}</p>
                               <p className="text-3xl lg:text-7xl font-black text-[#1d1d1f] leading-none tracking-tighter">{item.value}</p>
                           </div>
                       ))}
                   </div>
                </div>
                
                <div className="lg:w-1/2">
                    <div className="w-full aspect-[4/3] bg-[#fbfbfd] rounded-[64px] border border-slate-100 shadow-soft p-12 lg:p-20 flex flex-col justify-between">
                        <div className="space-y-4">
                            <Badge className="bg-[#007aff]/10 text-[#007aff] border-none px-6 py-2">Clinical Heartbeat</Badge>
                            <h4 className="text-4xl font-black text-[#1d1d1f]">Patient Sentiment Lab</h4>
                        </div>
                        <div className="h-40 w-full flex items-end gap-2 overflow-hidden">
                            {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85].map((h, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: i * 0.1, duration: 1 }}
                                    className="flex-1 bg-[#007aff]/30 rounded-t-xl group-hover:bg-[#007aff] transition-colors"
                                ></motion.div>
                            ))}
                        </div>
                        <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                           <p className="text-xs font-bold text-[#86868b] uppercase tracking-widest">Real-time Feedback Unit</p>
                           <MessageCircle size={20} className="text-[#007aff] animate-bounce" />
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      <LandingFooter />
    </div>
  );
}
