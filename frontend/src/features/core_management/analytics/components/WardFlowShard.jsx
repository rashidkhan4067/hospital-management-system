import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, ChevronRight } from 'lucide-react';
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
    if (ratio >= 0.9) return 'text-error bg-error/10 border-error/20';
    if (ratio >= 0.75) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-success bg-success/10 border-success/20';
  };

  return (
    <Card className="flex flex-col bg-surface-bright border border-outline rounded-2xl p-6 h-full transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-black text-text-sub uppercase tracking-widest transition-colors">Facility Inventory</span>
          <h3 className="text-sm font-bold text-text-main transition-colors">Ward Capacity Flow</h3>
        </div>
        <button 
          onClick={() => navigate('/admin/wards')}
          className="p-2 rounded-lg bg-surface text-text-sub hover:text-primary hover:bg-primary/10 transition-all"
        >
          <LayoutGrid size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {wards.map((ward) => (
          <div 
            key={ward.id}
            onClick={() => navigate(`/admin/wards?id=${ward.id}`)}
            className="flex items-center justify-between p-3 rounded-xl border border-outline/10 hover:border-outline hover:bg-surface transition-all cursor-pointer group"
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-text-main transition-colors">{ward.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-surface rounded-full overflow-hidden transition-colors">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${ward.occupied/ward.total > 0.9 ? 'bg-error' : 'bg-primary'}`}
                    style={{ width: `${(ward.occupied / ward.total) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-text-sub transition-colors">{ward.occupied}/{ward.total}</span>
              </div>
            </div>
            <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-colors ${getStatusColor(ward.occupied, ward.total)}`}>
              {ward.occupied >= ward.total - 1 ? 'Critical' : ward.occupied >= ward.total * 0.8 ? 'Approaching' : 'Optimal'}
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => navigate('/admin/wards')}
        className="mt-6 flex items-center justify-between p-3 rounded-xl bg-primary/5 group hover:bg-primary transition-all"
      >
        <span className="text-[10px] font-bold text-primary uppercase tracking-widest group-hover:text-surface-bright transition-colors">Detailed Occupancy Monitor</span>
        <ChevronRight size={14} className="text-primary group-hover:text-surface-bright transition-colors" />
      </button>
    </Card>
  );
}
