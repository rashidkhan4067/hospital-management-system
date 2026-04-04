import React from 'react';
import { Calendar, TrendingUp, TrendingDown, Mic, XCircle, Activity, CheckCircle } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Card } from '@/shared/components/ui';

const mockData = (base, range) => 
  Array.from({ length: 12 }, () => ({ val: base + Math.floor(Math.random() * range) }));

/**
 * 🛰 AppointmentKpiGrid — High-fidelity metric row
 * Modified to show actual data from appointments.
 */
const AppointmentKpiGrid = ({ appointments = [] }) => {
   const total = appointments.length || 1; // Avoid divide by zero
   const confirmedCount = appointments.filter(a => a.status === 'scheduled' || a.status === 'pending' || a.status === 'completed').length;
   const voiceCount = appointments.filter(a => a.channel === 'voice').length;
   const cancelledCount = appointments.filter(a => a.status === 'cancelled').length;

   const confirmationRate = ((confirmedCount / total) * 100).toFixed(1);
   const voiceShare = ((voiceCount / total) * 100).toFixed(1);
   const cancellationRate = ((cancelledCount / total) * 100).toFixed(1);

   const kpis = [
      { 
         label: 'Total Appointments', 
         value: appointments.length.toLocaleString(), 
         trend: '+12.4%', 
         up: true, 
         icon: Calendar, 
         color: '#2dd4bf', 
         data: mockData(4000, 800) 
      },
      { 
         label: 'Confirmation Rate', 
         value: `${confirmationRate}%`, 
         trend: '+2.1%', 
         up: true, 
         icon: CheckCircle, 
         color: '#0ea5e9', 
         data: mockData(90, 5) 
      },
      { 
         label: 'Voice Booking Share', 
         value: `${voiceShare}%`, 
         trend: '+8.4%', 
         up: true, 
         icon: Mic, 
         color: '#6366f1', 
         data: mockData(20, 10) 
      },
      { 
         label: 'Cancellation Rate', 
         value: `${cancellationRate}%`, 
         trend: '-0.4%', 
         up: false, 
         icon: XCircle, 
         color: '#f43f5e', 
         data: mockData(1, 1) 
      }
   ];

   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 mt-2">
         {kpis.map((kpi, idx) => (
            <Card key={idx} className="relative overflow-hidden p-5 lg:p-6 rounded-[2.5rem] bg-white dark:bg-white/5 border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-none flex items-center gap-5 lg:gap-6 group hover:translate-y-[-4px] transition-all duration-500">
               {/* 🚀 Floating Icon Box */}
               <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-[1.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-[0_10px_25px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <kpi.icon size={22} style={{ color: kpi.color }} strokeWidth={2.5} />
               </div>

               <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                     <span className="text-xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none italic uppercase tabular-nums">
                        {kpi.value}
                     </span>
                     <div className={`flex items-center gap-0.5 text-[8px] lg:text-[9px] font-black uppercase italic ${kpi.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {kpi.up ? '↑' : '↓'} {kpi.trend}
                     </div>
                  </div>
                  <p className="text-[9px] lg:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic mt-1.5 lg:mt-2 opacity-60">
                     {kpi.label}
                  </p>
               </div>

               {/* 📈 Bottom Edge Sparkline */}
               <div className="absolute bottom-0 left-0 right-0 h-6 lg:h-8 opacity-20 pointer-events-none transition-opacity group-hover:opacity-40">
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={kpi.data}>
                        <Line 
                           type="monotone" 
                           dataKey="val" 
                           stroke={kpi.color} 
                           strokeWidth={3} 
                           dot={false}
                           animationDuration={2000}
                        />
                     </LineChart>
                  </ResponsiveContainer>
               </div>
            </Card>
         ))}
      </div>
   );
};

export default AppointmentKpiGrid;
