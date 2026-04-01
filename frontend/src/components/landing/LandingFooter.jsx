import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Activity } from 'lucide-react';

export default function LandingFooter() {
  return (
    <footer className="footer-section bg-[#000000] py-24 md:py-48 px-6 md:px-8 text-white relative overflow-hidden">
      {/* Liquid Top Glow */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#007aff]/40 to-transparent"
      />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 relative z-10">
        <div className="col-span-1 sm:col-span-2">
            <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 mb-8 cursor-pointer"
            >
                <div className="w-14 h-14 bg-[#007aff] rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/20">
                    <Heart className="text-white" size={28} fill="white" />
                </div>
                <span className="text-4xl font-black tracking-tight uppercase">AL SHIFAA</span>
            </motion.div>
            <p className="text-[#86868b] text-xl leading-relaxed max-w-md font-medium">
                Empowering patients through intelligent healthcare management. 
                Redefining clinical excellence for the digital age in Karachi.
            </p>
        </div>
        
        <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#007aff]">Clinic Portal</h4>
            <div className="flex flex-col gap-5 text-[#86868b] font-bold text-lg">
                <Link to="/doctors" className="hover:text-white hover:translate-x-1 transition-all">Specialists List</Link>
                <Link to="/register" className="hover:text-white hover:translate-x-1 transition-all">Join Network</Link>
                <Link to="/login" className="hover:text-white hover:translate-x-1 transition-all">Patient Log In</Link>
            </div>
        </div>

        <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#007aff]">Compliance</h4>
            <div className="flex flex-col gap-5 text-[#86868b] font-bold text-lg">
                <span className="flex items-center gap-3"><ShieldCheck size={20} className="text-[#34c759]" /> Identity Shield</span>
                <span className="flex items-center gap-3"><Activity size={20} className="text-white" /> ISO 2026 Live</span>
            </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 md:mt-48 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-[#86868b] font-bold">
        <p className="text-center md:text-left">&copy; 2026 Al Shifaa Medical Group. Karachi, PK.</p>
        <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="mailto:alshifaaclinic99@gmail.com" className="hover:text-white transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
}
