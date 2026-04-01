import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import SpecialistCard from '../features/doctors/SpecialistCard';
import SpecialistDetailModal from '../features/doctors/SpecialistDetailModal';
import { Badge, Button } from '../ui';

/**
 * 👨‍⚕️ Al Shifaa "Specialist Hub" - Spotlight Section
 * Reusable spotlight component with integrated detail modal.
 */
export default function LandingSpecialists() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL + "doctors/";
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Database Sync Failed");
        const data = await response.json();
        const list = data.results || data;
        setDoctors(Array.isArray(list) ? list.slice(0, 4) : []);
        setLoading(false);
      } catch (error) {
        console.error("❌ API Connectivity Error:", error);
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <section id="specialist-list" className="py-48 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Top Feature Section: Elite Illustration + Mission Text */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-48 gap-20">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:w-1/2 space-y-10 text-center lg:text-left"
            >
                <Badge className="bg-blue-50 text-[#007aff] border-none px-6 py-2 text-[10px] font-black uppercase tracking-widest leading-none">Pakistan's Elite Network</Badge>
                <h2 className="text-6xl md:text-9xl font-black text-[#1d1d1f] tracking-tighter leading-[0.85] mb-10">
                    The Specialist <br/> <span className="text-[#007aff]">Hub.</span>
                </h2>
                <p className="text-2xl text-[#86868b] font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Connect with a hand-picked network of Pakistan’s most prestigious clinicians. 
                    Verified expertise, bilingual care, and <span className="text-[#007aff] font-bold">AI-augmented diagnostics.</span>
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                    <Link to="/specialists">
                        <Button className="h-16 px-12 rounded-2xl bg-[#1d1d1f] text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-black/20 hover:scale-105 transition-all">
                            Explore Full Team
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2 text-[#86868b] text-[10px] font-black uppercase tracking-widest">
                        <CheckCircle2 size={16} className="text-[#007aff]" /> 20+ Verified Experts
                    </div>
                </div>
            </motion.div>

            {/* Premium Generated PNG */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:w-1/2 relative group"
            >
                <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full group-hover:bg-blue-500/20 transition-all duration-1000"></div>
                <img 
                    src="/specialists-hub.png" 
                    alt="Clinical Specialist Hub"
                    className="relative z-10 w-full h-auto drop-shadow-2xl group-hover:scale-105 transition-transform duration-700" 
                />
            </motion.div>
        </div>

        {/* Real Specialist Grid - REUSABLE VERSION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
                [1,2,3,4].map(i => <div key={i} className="h-[520px] bg-slate-50 rounded-[48px] animate-pulse border border-slate-100"></div>)
            ) : doctors.length > 0 ? (
                doctors.map((doc) => (
                    <SpecialistCard 
                      key={doc.id} 
                      doc={doc} 
                      isCompact={true} 
                      onClick={(d) => setSelectedDoctor(d)} 
                    />
                ))
            ) : (
                <div className="col-span-full py-24 text-center bg-[#f5f5f7] rounded-[64px] border border-dashed border-slate-200">
                    <p className="text-[#86868b] font-black uppercase tracking-widest text-xs">Waiting for Clinical Records Sync...</p>
                </div>
            )}
        </div>
      </div>

      {/* 🔮 Detail Modal Integration */}
      <SpecialistDetailModal 
        doc={selectedDoctor} 
        isOpen={!!selectedDoctor} 
        onClose={() => setSelectedDoctor(null)} 
      />
    </section>
  );
}
