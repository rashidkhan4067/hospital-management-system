import React from 'react';
import { 
   X, User, Phone, Mail, MapPin, Calendar, Clock, Clipboard, 
   Activity, History, FileText, CheckCircle, XCircle 
} from 'lucide-react';
import { Badge, Button } from '@/components/primitives';

/**
 * 🛰 AppointmentDrawer — Slide-in medical visit details
 * Based on Blueprint row 3.
 */
const AppointmentDrawer = ({ isOpen, onClose, appointment }) => {
   if (!appointment) return null;

   return (
      <>
         {/* ─── Backdrop ─── */}
         <div 
            className={`fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
            onClick={onClose}
         />

         {/* ─── Drawer ─── */}
         <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white dark:bg-[#060b13] z-[101] shadow-2xl transition-transform duration-700 ease-in-out border-l border-slate-200 dark:border-white/5 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            
            {/* 🏷 Header Console */}
            <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-transparent shrink-0">
               <div className="flex flex-col gap-1">
                  <h2 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none">Visit Dossier</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1 italic">Archive Reference: #{appointment.id}</p>
               </div>
               <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-accent-primary transition-all">
                  <X size={20} />
               </button>
            </div>

            {/* 📋 Content Deep-Dive */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
               
               {/* 1. Personnel Card */}
               <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center gap-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-3xl pointer-events-none " />
                  <div className="w-20 h-20 rounded-[1.5rem] bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-black text-2xl uppercase border border-indigo-500/20 shadow-lg group-hover:rotate-6 transition-transform italic shrink-0">
                     {appointment.patient?.full_name?.charAt(0) || 'P'}
                  </div>
                  <div className="flex flex-col min-w-0">
                     <p className="text-[18px] font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none truncate">{appointment.patient?.full_name}</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                        <MapPin size={12} className="text-accent-primary" /> Al Shifaa Clinic v4
                     </p>
                  </div>
               </div>

               {/* 2. Engagement Telemetry */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm">
                     <div className="flex items-center gap-2 mb-3">
                        <Calendar size={14} className="text-accent-primary" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Visit Date</span>
                     </div>
                     <p className="text-[15px] font-black text-slate-900 dark:text-white tabular-nums leading-none italic">{appointment.appointment_date}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm">
                     <div className="flex items-center gap-2 mb-3">
                        <Clock size={14} className="text-accent-primary" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Status Cycle</span>
                     </div>
                     <p className="text-[15px] font-black text-emerald-500 uppercase leading-none italic tracking-tighter underline underline-offset-4">{appointment.status}</p>
                  </div>
               </div>

               {/* 3. Clinical Intelligence */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <Clipboard size={18} className="text-accent-primary" />
                     <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase italic tracking-wider leading-none">Intelligence Dossier</h3>
                  </div>
                  
                  <div className="space-y-4">
                     {[
                        { label: 'Primary Personnel', value: appointment.doctor?.full_name || 'Al Shifaa Expert', icon: User },
                        { label: 'Booking Method', value: appointment.channel === 'voice' ? 'Neural Sana Voice' : 'Global Web Booking', icon: Activity },
                        { label: 'Assigned Terminal', value: 'OPD Terminal Alpha', icon: MapPin },
                        { label: 'Priority Matrix', value: 'High Engagement', icon: History }
                     ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group/item">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover/item:text-accent-primary transition-all border border-slate-200 dark:border-white/10 group-hover/item:scale-110">
                                 <item.icon size={16} />
                              </div>
                              <div className="flex flex-col">
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60 leading-none">{item.label}</span>
                                 <span className="text-[13px] font-black text-slate-900 dark:text-white uppercase italic tracking-tight mt-1">{item.value}</span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* 4. Action Console */}
               <div className="grid grid-cols-2 gap-4 mt-10">
                  <Button className="py-4 border-emerald-500/20 text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white transition-all shadow-xl shadow-emerald-500/10 rounded-2xl text-[11px] font-black uppercase italic tracking-widest flex items-center justify-center gap-2">
                     <CheckCircle size={18} /> Close Dossier
                  </Button>
                  <Button className="py-4 border-rose-500/20 text-rose-500 bg-rose-500/10 hover:bg-rose-500 hover:text-white transition-all shadow-xl shadow-rose-500/10 rounded-2xl text-[11px] font-black uppercase italic tracking-widest flex items-center justify-center gap-2">
                     <XCircle size={18} /> Abort Entry
                  </Button>
               </div>
            </div>

            {/* 🏷 Footer Telemetry */}
            <div className="p-8 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-transparent shrink-0 flex items-center justify-between">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] italic">System Latency: 42ms</p>
               <span className="text-[10px] font-black text-emerald-500 uppercase italic opacity-60 tracking-widest">Archive Verified ✓</span>
            </div>
         </div>
      </>
   );
};

export default AppointmentDrawer;
