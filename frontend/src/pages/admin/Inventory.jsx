import React, { useState } from 'react';
import { 
  Package, 
  Plus,
  Activity,
  AlertTriangle,
  Archive,
  MoreHorizontal,
  BarChart3
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard } from '../../components/ui';
import AdminTable from '../../components/features/admin/AdminTable';
import FilterBar from '../../components/features/admin/FilterBar';

/**
 * 📦 Resource & Inventory Matrix
 * Real-time pharmacy and supply chain oversight.
 */
export default function AdminInventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const assets = [
    { id: 'AST-4421', name: 'Zine-04 (Vials)', category: 'Pharmaceutical', qty: 1240, minQty: 200, status: 'Stable' },
    { id: 'AST-1102', name: 'N95 Respirators', category: 'PPE', qty: 42, minQty: 50, status: 'Low' },
    { id: 'AST-2947', name: 'Adrenaline (Auto-Inject)', category: 'Emergency', qty: 12, minQty: 20, status: 'Critical' },
    { id: 'AST-9921', name: 'Saline 500ml', category: 'General', qty: 1400, minQty: 400, status: 'Stable' },
    { id: 'AST-8821', name: 'Morphine SH-1', category: 'Controlled', qty: 0, minQty: 10, status: 'Empty' },
  ].filter(a => 
    (a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.id.includes(searchTerm)) &&
    (activeTab === 'ALL' || a.status.toUpperCase() === activeTab)
  );

  const columns = [
    { 
        header: 'Asset Node', 
        cell: (a) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-center text-accent-primary">
                    {a.status === 'Low' || a.status === 'Critical' || a.status === 'Empty' ? <AlertTriangle size={16} className="text-rose-500" /> : <Archive size={16} />}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none">{a.name}</p>
                    <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1.5">{a.id} • {a.category}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Quantity Shard',
        cell: (a) => (
            <div className="flex flex-col">
                <span className={`text-[14px] font-black tracking-tight ${a.qty < a.minQty ? 'text-rose-500' : 'text-text-primary dark:text-white'}`}>{a.qty}</span>
                <span className="text-[8px] font-bold text-text-secondary/40 uppercase tracking-widest mt-0.5">MIN: {a.minQty}</span>
            </div>
        )
    },
    { 
        header: 'Supply Status',
        cell: (a) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${a.status === 'Stable' ? 'bg-emerald-500 shadow-emerald-500' : a.status === 'Empty' ? 'bg-slate-700' : 'bg-rose-500 shadow-rose-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{a.status}</span>
            </div>
        )
    },
    { 
        header: 'Health Check', 
        cell: (a) => (
            <div className="w-24 h-1.5 bg-bg-base dark:bg-white/5 rounded-full overflow-hidden">
                <div 
                    className={`h-full rounded-full transition-all duration-700 ${a.qty < a.minQty ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-emerald-500 opacity-40'}`} 
                    style={{ width: `${Math.min(100, (a.qty / (a.minQty * 2)) * 100)}%` }}
                />
            </div>
        )
    },
    { 
        header: 'Actions', 
        cell: () => (
            <button className="p-3 rounded-xl bg-bg-base dark:bg-slate-800/40 text-text-secondary hover:text-accent-primary transition-all">
                <MoreHorizontal size={14} />
            </button>
        )
    },
  ];

  const stats = [
    { title: "Global Assets", value: "8,942", icon: Archive, trend: "+12.5%", color: "var(--accent-primary)" },
    { title: "Low Stock Nodes", value: "14", icon: AlertTriangle, trend: "+2", color: "#f43f5e" },
    { title: "Supply Flux", value: "98.2%", icon: Activity, trend: "+0.5%", color: "#10b981" },
    { title: "Total Value", value: "$1.4M", icon: BarChart3, trend: "+$24k", color: "#6366f1" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Supply Matrix" 
        subtitle="Global Resource Allocation Control"
        actions={
            <Button className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none">
                <Plus size={14} /> Provision Stock
            </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
      </div>

      <FilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
            { id: 'ALL', label: 'Global Inventory' },
            { id: 'STABLE', label: 'Stable Nodes' },
            { id: 'LOW', label: 'Supply Alert' },
            { id: 'CRITICAL', label: 'Critical Failure' }
        ]}
      />

      <AdminTable columns={columns} data={assets} />
    </div>
  );
}
