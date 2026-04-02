import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Activity, Zap, Filter } from 'lucide-react';
import SpecialistCard from '../../components/features/doctors/SpecialistCard';
import SpecialistDetailModal from '../../components/features/doctors/SpecialistDetailModal';
import { Button } from '../../components/ui';
import PageContainer from '../../components/common/PageContainer';
import SEO from '../../components/common/SEO';

/**
 * 🏙️ DoctorsPage - Ultra-Premium Responsive Edition
 */
export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDoctors = async () => {
      try {
        const apiUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1/') + "doctors/";
        const response = await fetch(apiUrl);
        const data = await response.json();
        const list = data.results || data;
        setDoctors(list);
        setFilteredDoctors(list);
        setLoading(false);
      } catch (error) {
        console.error("❌ API Connectivity Error:", error);
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    let result = doctors;
    if (activeFilter !== 'all') {
      result = result.filter(doc => doc.specialization === activeFilter);
    }
    if (searchQuery) {
      result = result.filter(doc => 
        doc.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialization_display?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredDoctors(result);
  }, [activeFilter, searchQuery, doctors]);

  const specializations = [
    { label: 'All Fields', value: 'all' },
    { label: 'Cardiology', value: 'cardiology' },
    { label: 'Dentistry', value: 'dentistry' },
    { label: 'Neurology', value: 'neurology' },
    { label: 'Pediatrics', value: 'pediatrics' },
    { label: 'Orthopedics', value: 'orthopedics' },
  ];

  return (
    <PageContainer 
      title="Verified Specialist Network" 
      description="Connect with Pakistan's elite medical practitioners through our secure clinical node."
      maxWidth="full"
      className="bg-white p-0!"
    >
      <SEO 
        title="Find Specialists" 
        description="Book appointments with Pakistan's top-rated clinical practitioners through our AI-augmented directory." 
      />
      {/* 🏔️ Responsive Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-24 relative overflow-hidden bg-white">
        <div className="hidden lg:block absolute top-0 right-0 w-[500px] h-full bg-[#fbfcfd] -z-10 skew-x-[-20deg] translate-x-[200px]"></div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
            >
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                   <div className="space-y-6">
                        <div className="flex items-center gap-4">
                           <span className="text-[#86868b] font-black uppercase tracking-[0.4em] text-[9px] lg:text-[10px]">Clinical Directory</span>
                           <div className="w-[1px] h-4 bg-slate-200"></div>
                           <span className="text-[#0071e3] text-[9px] lg:text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                              <Zap size={10} className="animate-pulse" /> Live Network
                           </span>
                        </div>
                        <h1 className="text-5xl md:text-[8rem] lg:text-[10rem] font-black text-[#1d1d1f] tracking-tighter leading-[0.9] lg:leading-[0.85]">
                           Find Elite <br/> <span className="text-[#007aff]">Specialists.</span>
                        </h1>
                   </div>
                   
                   <div className="text-left lg:text-right space-y-6 lg:w-[400px]">
                        <p className="text-base md:text-xl lg:text-2xl text-[#86868b] font-medium leading-relaxed max-w-lg lg:ml-auto">
                            Hand-picked practitioners verified with unified AI clinical systems.
                        </p>
                        <div className="flex items-center justify-start lg:justify-end gap-10 lg:gap-12 pt-6 border-t border-slate-100">
                           <div>
                              <p className="text-[8px] lg:text-[9px] font-black uppercase tracking-widest text-[#86868b] mb-1">Network</p>
                              <p className="text-xl lg:text-2xl font-black text-[#1d1d1f] tracking-tighter uppercase leading-none">Verified</p>
                           </div>
                           <div>
                              <p className="text-[8px] lg:text-[9px] font-black uppercase tracking-widest text-[#86868b] mb-1">Units</p>
                              <p className="text-xl lg:text-2xl font-black text-[#1d1d1f] tracking-tighter capitalize leading-none">{doctors.length}+</p>
                           </div>
                        </div>
                   </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 🔍 Responsive Integrated Command Center */}
      <div className="sticky top-[80px] z-[50] w-full px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
            <motion.div 
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white/95 backdrop-blur-3xl border border-slate-100 shadow-soft rounded-[28px] lg:rounded-[36px] p-2 flex flex-col md:flex-row items-center gap-2"
            >
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0071e3] transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search for specialists..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#fcfdfe] border-none rounded-[20px] lg:rounded-[28px] py-4 lg:py-6 pl-14 lg:pl-16 pr-8 text-sm font-bold text-[#1d1d1f] outline-none"
                    />
                </div>

                <div className="hidden md:block w-[1px] h-10 bg-slate-100 mx-2"></div>

                <div className="flex items-center gap-2 px-4 overflow-x-auto w-full md:w-auto scrollbar-hide py-3 md:py-0">
                    <Filter size={14} className="text-[#0071e3] mr-3 flex-shrink-0" />
                    {specializations.map((spec) => (
                        <button
                            key={spec.value}
                            onClick={() => setActiveFilter(spec.value)}
                            className={`px-8 py-3.5 rounded-xl lg:rounded-2xl text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                                activeFilter === spec.value 
                                ? 'bg-[#1d1d1f] text-white shadow-lg' 
                                : 'bg-white text-[#86868b] border border-slate-50 hover:border-slate-200'
                            }`}
                        >
                            {spec.label}
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
      </div>

      {/* 🧬 Specialists Directory Grid */}
      <section className="py-24 lg:py-32 bg-white min-h-[600px]">
        <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
            <AnimatePresence mode='popLayout'>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1,2,3,4,5,6,7,8].map(i => (
                            <div key={i} className="h-[420px] bg-[#fcfdfe] rounded-[32px] animate-pulse border border-slate-100 shadow-sm"></div>
                        ))}
                    </div>
                ) : filteredDoctors.length > 0 ? (
                    <motion.div 
                        layout 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
                    >
                        {filteredDoctors.map((doc) => (
                            <SpecialistCard 
                               key={doc.id} 
                               doc={doc} 
                               onClick={(d) => setSelectedDoctor(d)} 
                            />
                        ))}
                    </motion.div>
                ) : (
                    <div className="py-24 text-center bg-[#fcfdfe] rounded-[48px] border border-dashed border-slate-200">
                         <h3 className="text-3xl font-black text-[#1d1d1f] mb-4">No Units Found</h3>
                         <p className="text-[#86868b] font-medium max-w-md mx-auto px-6">We currently do not have a specialist matching these parameters.</p>
                         <Button 
                             onClick={() => {setActiveFilter('all'); setSearchQuery('');}}
                             className="mt-12 bg-[#1d1d1f] text-white rounded-2xl px-12 h-16 font-black uppercase tracking-widest text-[10px]"
                         >
                            Reset Network Filters
                         </Button>
                    </div>
                )}
            </AnimatePresence>
        </div>
      </section>

      <SpecialistDetailModal 
        doc={selectedDoctor} 
        isOpen={!!selectedDoctor} 
        onClose={() => setSelectedDoctor(null)} 
      />
    </PageContainer>
  );
}
