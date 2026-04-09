import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, AlertCircle, ChevronRight } from 'lucide-react';
import { Card } from '@/components/primitives';

export default function WardFlowShard() {
  const navigate = useNavigate();

  const wards = [
    { id: 1, name: 'General Ward', occupied: 42, total: 50, trend: 'stable' },
    { id: 2, name: 'ICU Unit', occupied: 11, total: 12, trend: 'critical' },
    { id: 3, name: 'Pediatrics', occupied: 18, total: 20, trend: 'approaching' },
    { id: 4, name: 'Cardiology', occupied: 8, total: 15, trend: 'optimal' },
  ];

  const getStatusColor = (occ, tot) => {
    const ratio = occ / tot;
    if (ratio >= 0.9) return 'text-red-600 bg-red-50 border-red-100';
    if (ratio >= 0.75) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-green-600 bg-green-50 border-green-100';
  };

  return (
    <Card className="flex flex-col bg-white border border-slate-200 rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Facility Inventory</span>
          <h3 className="text-sm font-bold text-slate-900">Ward Capacity Flow</h3>
        </div>
        <button 
          onClick={() => navigate('/admin/wards')}
          className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-[#1A73E8] hover:bg-blue-50 transition-all"
        >
          <LayoutGrid size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {wards.map((ward) => (
          <div 
            key={ward.id}
            onClick={() => navigate(`/admin/wards?id=${ward.id}`)}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:border-slate-200 hover:bg-slate-50/50 transition-all cursor-pointer group"
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-700">{ward.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${ward.occupied/ward.total > 0.9 ? 'bg-red-500' : 'bg-[#1A73E8]'}`}
                    style={{ width: `${(ward.occupied / ward.total) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400">{ward.occupied}/{ward.total}</span>
              </div>
            </div>
            <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(ward.occupied, ward.total)}`}>
              {ward.occupied >= ward.total - 1 ? 'Critical' : ward.occupied >= ward.total * 0.8 ? 'Approaching' : 'Optimal'}
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => navigate('/admin/wards')}
        className="mt-6 flex items-center justify-between p-3 rounded-xl bg-[#1A73E8]/5 group hover:bg-[#1A73E8] transition-all"
      >
        <span className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-widest group-hover:text-white">Detailed Occupancy Monitor</span>
        <ChevronRight size={14} className="text-[#1A73E8] group-hover:text-white" />
      </button>
    </Card>
  );
}
