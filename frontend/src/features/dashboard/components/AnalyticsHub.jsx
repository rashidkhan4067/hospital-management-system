import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '@/components/primitives';
import { TrendingUp, Activity } from 'lucide-react';

export default function AnalyticsHub({ unit }) {
  const navigate = useNavigate();
  const departments = [
    { name: 'Emergency', load: 88 },
    { name: 'Cardiology', load: 72 },
    { name: 'Pediatrics', load: 45 },
    { name: 'Radiology', load: 94 },
  ];

  const revenueScale = unit === 'Emergency' ? 1.2 : (unit === 'Cardiology' ? 0.8 : 1);

  return (
    <div className="grid grid-cols-12 gap-8">
      
      {/* 📊 Widget A: Revenue Performance (Wide) */}
      <Card 
        onClick={() => navigate('/admin/reports/financial')}
        className="col-span-12 lg:col-span-8 flex flex-col gap-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue Performance: {unit}</span>
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-[#1A73E8]" />
              <h3 className="text-xl font-bold text-slate-900">Intelligence Matrix</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
            <TrendingUp size={12} className="text-[#137333]" />
            <span className="text-[11px] font-black text-[#137333]">
              {unit === 'All Units' ? '+15.4%' : (unit === 'Emergency' ? '+22.1%' : '+8.4%')}
            </span>
          </div>
        </div>
        
        {/* Simple Bar Chart Mockup - Google Precise Styling */}
        <div className="flex items-end justify-between h-48 gap-4 pt-4 border-b border-slate-100 pb-1 relative">
          <div className="absolute top-1/4 left-0 right-0 border-t border-slate-50 pointer-events-none" />
          <div className="absolute top-2/4 left-0 right-0 border-t border-slate-50 pointer-events-none" />
          <div className="absolute top-3/4 left-0 right-0 border-t border-slate-50 pointer-events-none" />

          {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-3 px-1 relative z-10">
              <div 
                style={{ height: `${h * revenueScale}%` }} 
                className="w-full bg-slate-50 group-hover:bg-[#1A73E8]/10 rounded-t-lg transition-all duration-300 border-x border-t border-slate-100 group-hover:border-[#1A73E8]/30"
              />
              <span className="text-[9px] font-bold text-slate-400 uppercase">W{i+1}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 🏥 Widget B: Department Load (Narrow) */}
      <Card className="col-span-12 lg:col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Facility Inventory</span>
          <h3 className="text-xl font-bold text-slate-900">Department Load</h3>
        </div>
        
        <div className="flex flex-col gap-6 mt-2">
          {departments.map((dept, idx) => (
            <div 
              key={idx} 
              onClick={() => navigate(`/admin/patients?unit=${dept.name}`)}
              className={`flex flex-col gap-3 group cursor-pointer hover:translate-x-1 transition-all p-3 rounded-2xl border border-transparent
                ${dept.name === unit ? 'bg-[#E8F0FE] border-[#1A73E8]/20' : 'hover:bg-slate-50'}
              `}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${dept.name === unit ? 'text-[#1967D2]' : 'text-slate-700'}`}>{dept.name}</span>
                <span className="text-[10px] font-bold text-slate-400">{dept.load}%</span>
              </div>
              <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${dept.load}%` }} 
                  className={`h-full rounded-full transition-all duration-500 ${dept.load > 90 ? 'bg-red-500' : 'bg-[#1A73E8]'}`}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}



