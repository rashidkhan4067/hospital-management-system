import React from 'react';
import { PageHeader, Card } from '@/components/primitives';
import { Construction } from 'lucide-react';

export default function DoctorDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] space-y-8 animate-in fade-in duration-700">
        <div className="p-8 bg-indigo-50 text-indigo-600 rounded-[40px] shadow-soft border border-indigo-100 flex items-center justify-center group hover:scale-110 transition-transform duration-500">
            <Construction size={80} strokeWidth={1} className="animate-pulse" />
        </div>
        <div className="text-center space-y-3">
            <h2 className="text-4xl font-black text-[#1d1d1f] tracking-tighter italic uppercase leading-none">Specialist Hub 01</h2>
            <p className="text-xs font-black text-[#86868b] uppercase tracking-[0.4em] opacity-40">Section Under Highnd Maintenance</p>
        </div>
        <Card className="p-10 bg-white/40 backdrop-blur-xl border-bg-offset rounded-[32px] max-w-md text-center shadow-soft">
            <p className="text-sm font-medium text-[#86868b] leading-relaxed">
                Currently focusing on the Admin Monolith development. This unit will be re-synchronized following the Admin portal stabilization.
            </p>
        </Card>
    </div>
  );
}
