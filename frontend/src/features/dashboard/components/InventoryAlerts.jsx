import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, PackageSearch } from 'lucide-react';

export default function InventoryAlerts({ unit }) {
  const navigate = useNavigate();
  
  const getAlerts = () => {
    if (unit === 'Emergency') return [
      { item: 'Ventilator Service', count: '2 Critical', priority: 'High', color: 'text-red-600 bg-red-50' },
      { item: 'Blood Plasma (O-)', count: '2 Units', priority: 'Critical', color: 'text-red-700 bg-red-100 font-black' },
      { item: 'Defibrillator Pads', count: '10 Left', priority: 'Low', color: 'text-amber-600 bg-amber-50' },
    ];
    if (unit === 'Pharmacy') return [
      { item: 'Antibiotics IV', count: '5 Box', priority: 'High', color: 'text-red-600 bg-red-50' },
      { item: 'Insulin Glargine', count: 'Out of Stock', priority: 'Critical', color: 'text-red-700 bg-red-100 font-black' },
    ];
    return [
      { item: 'O2 Cylinders (Refill)', count: '4 Left', priority: 'High', color: 'text-red-600 bg-red-50' },
      { item: 'Disposable Syringes', count: '12 Box', priority: 'Low', color: 'text-amber-600 bg-amber-50' },
      { item: 'Paracetamol 500mg', count: 'Out of Stock', priority: 'Critical', color: 'text-red-700 bg-red-100 font-black' },
    ];
  };

  const alerts = getAlerts();

  return (
    <div className="col-span-12 lg:col-span-6 bg-white border border-outline-variant rounded-xl p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-text-sub uppercase tracking-[0.2em]">Clinical Inventory Thresholds</span>
        <PackageSearch size={18} className="text-text-sub" />
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {alerts.map((alert, idx) => (
          <div 
            key={idx} 
            onClick={() => navigate('/admin/inventory?filter=low-stock')}
            className="flex items-center justify-between p-4 rounded-xl border border-outline-variant/30 hover:border-primary-blue/30 hover:bg-slate-50/50 transition-all bg-white group cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg ${alert.color.split(' ')[1]} flex items-center justify-center shrink-0`}>
                <AlertTriangle size={18} className={alert.color.split(' ')[0]} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-text-main group-hover:text-primary-blue transition-colors">{alert.item}</span>
                <span className="text-[10px] font-bold text-text-sub uppercase tracking-widest">{alert.priority} Priority</span>
              </div>
            </div>
            <div className={`px-4 py-1.5 rounded-lg text-xs font-bold ${alert.color}`}>
              {alert.count}
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => navigate('/admin/inventory')}
        className="mt-2 w-full py-3 rounded-xl border border-dashed border-outline-variant text-[11px] font-bold text-text-sub uppercase tracking-widest hover:border-primary-blue hover:text-primary-blue hover:bg-primary-blue/5 transition-all outline-none"
      >
        Open Supply Chain Manager
      </button>
    </div>
  );
}

