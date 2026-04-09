import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Package, ShieldCheck, Activity } from 'lucide-react';

export default function IntelligenceGateway() {
  const navigate = useNavigate();

  const GATEWAY_NODES = [
    { 
      id: 'finance', 
      label: 'Financials', 
      value: 'PKR 1.2M', 
      sub: 'Outstanding Dues', 
      icon: CreditCard, 
      color: '#1A73E8', 
      link: '/admin/finance' 
    },
    { 
      id: 'inventory', 
      label: 'Pharmacy', 
      value: '14 Items', 
      sub: 'Below Threshold', 
      icon: Package, 
      color: '#F9AB00', 
      link: '/admin/inventory' 
    },
    { 
      id: 'staff', 
      label: 'Staffing', 
      value: '42 Active', 
      sub: 'Physicians On-Call', 
      icon: ShieldCheck, 
      color: '#188038', 
      link: '/admin/staff' 
    },
    { 
      id: 'ops', 
      label: 'Ops Health', 
      value: '99.4%', 
      sub: 'System Latency', 
      icon: Activity, 
      color: '#D93025', 
      link: '/admin/settings' 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {GATEWAY_NODES.map((node) => (
        <div 
          key={node.id}
          onClick={() => navigate(node.link)}
          className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/20 cursor-pointer transition-all group h-full"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 group-hover:scale-110 transition-transform" style={{ color: node.color }}>
            <node.icon size={20} />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{node.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-900 truncate">{node.value}</span>
              <span className="text-[9px] font-medium text-slate-400 truncate opacity-0 group-hover:opacity-100 transition-opacity">{node.sub}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
