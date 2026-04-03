import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Globe, Sparkles } from 'lucide-react';
import SpecialistCard from '@/shared/components/common/SpecialistCard';
import SpecialistDetailModal from '@/shared/components/common/SpecialistDetailModal';

/**
 *  Ultra Premium Apple-Style Specialists
 * Focus: Refined Grid, High-Fidelity Cards, Minimalist Professionalism.
 */
export default function LandingSpecialists() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const apiUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1/') + "doctors/";
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Sync Failed");
        const data = await response.json();
        const list = data.results || data;
        setDoctors(Array.isArray(list) ? list.slice(0, 4) : []);
        setLoading(false);
      } catch (error) {
        console.error("Connectivity Error:", error);
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Node */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Medical Network</span>
              </div>
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">
              Meet Our Specialist <br /> <span className="text-blue-600 italic text-4xl lg:text-6xl font-medium">Practitioners.</span>
            </h2>
            <p className="text-lg lg:text-xl text-slate-500 font-medium max-w-2xl">
              Connect with Pakistan's most prestigious clinicians. Our specialists lead with 
              verified expertise and AI-augmented clinical precision.
            </p>
          </motion.div>

          <Link to="/doctors">
            <button className="h-14 px-8 border border-slate-200 dark:border-slate-800 rounded-full font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2">
              View All Doctors <ArrowRight size={18} />
            </button>
          </Link>
        </div>

        {/* Grid Node */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            [1, 2, 3, 4].map(i => <div key={i} className="h-96 bg-slate-50 dark:bg-slate-800/50 rounded-3xl animate-pulse" />)
          ) : doctors.length > 0 ? (
            doctors.map((doc, idx) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div 
                  onClick={() => setSelectedDoctor(doc)}
                  className="group cursor-pointer bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-[32px] p-6 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-500"
                >
                  <div className="aspect-[4/5] rounded-[24px] bg-slate-200 dark:bg-slate-700 mb-6 overflow-hidden relative">
                    <img 
                      src={doc.image || 'https://via.placeholder.com/400x500'} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt={doc.name} 
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{doc.speciality_name || 'Specialist'}</p>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{doc.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-[32px]">
              <p className="text-slate-400 font-bold">Synchronizing medical records...</p>
            </div>
          )}
        </div>
      </div>

      <SpecialistDetailModal
        doc={selectedDoctor}
        isOpen={!!selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
      />
    </section>
  );
}

