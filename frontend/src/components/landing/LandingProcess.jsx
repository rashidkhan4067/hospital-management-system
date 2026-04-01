import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Brain, Shield, ArrowRight, UserCheck } from 'lucide-react';
import { Badge } from '../ui';

const specialityItems = [
    { 
        id: '01', 
        title: 'Cardiovascular', 
        desc: 'Atomic blood-flow monitoring and heart health synchronization.', 
        icon: Heart,
        color: 'text-red-500 bg-red-50'
    },
    { 
        id: '02', 
        title: 'Neurological Hub', 
        desc: 'Advanced brain-mapping and neural management for complex care.', 
        icon: Brain,
        color: 'text-purple-500 bg-purple-50'
    },
    { 
        id: '03', 
        title: 'Precision Surgery', 
        desc: 'Conflict-free surgical scheduling with atomic database locking.', 
        icon: Activity,
        color: 'text-blue-500 bg-blue-50'
    }
];

export default function LandingProcess() {
  return (
    <section id="specialities" className="py-48 bg-[#f5f5f7] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
        >
            <Badge className="bg-[#007aff]/10 text-[#007aff] border-none mb-6 px-6 py-2 text-sm font-black tracking-widest uppercase">Clinical Departments</Badge>
            <h2 className="text-5xl md:text-[6rem] font-black text-[#1d1d1f] leading-none tracking-tighter">Engineered for <br/> Precision.</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {specialityItems.map((item, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -10 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative p-12 rounded-[56px] bg-white border border-white shadow-soft group overflow-hidden"
                >
                    <div className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                        <item.icon size={36} />
                    </div>
                    
                    <h3 className="text-3xl font-black text-[#1d1d1f] mb-6">{item.title}</h3>
                    <p className="text-[#86868b] font-medium leading-relaxed mb-10 text-lg">{item.desc}</p>
                    
                    <motion.div 
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-[#007aff] font-black uppercase text-xs tracking-widest cursor-pointer"
                    >
                        View Specialists <ArrowRight size={16} />
                    </motion.div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
