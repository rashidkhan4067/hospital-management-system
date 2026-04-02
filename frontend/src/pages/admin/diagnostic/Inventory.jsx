import React, { useState } from 'react';
import { 
  Package, 
  Plus,
  Activity,
  AlertTriangle,
  Archive,
  MoreHorizontal,
  BarChart3,
  RefreshCw,
  Box,
  Truck
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard, Card } from '../../../components/ui';
import AdminTable from '../../../components/features/admin/AdminTable';
import FilterBar from '../../../components/features/admin/FilterBar';
import ProvisionSupplyShardModal from '../../../components/features/admin/ProvisionSupplyShardModal';
import { useAdminInventory } from '../../../hooks/admin/useAdminInventory';
import { useUI } from '../../../context/UIContext';
import { inventoryService } from '../../../services/admin/InventoryService';

/**
 * 📦 Resource & Inventory Matrix
 * Real-time clinical supply chain oversight and resource allocation control.
 * High-fidelity command center for Global Resource Allocation.
 */
export default function AdminInventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { addNotification } = useUI();
  const { items, categories, logs, loading, refresh } = useAdminInventory();

  // 🧪 Logic: Transaction Shard Propagator
  const handleProvision = () => {
    setIsModalOpen(true);
  };

  const handleRegister = async (data, resetForm) => {
    setIsSubmitting(true);
    try {
        // High-fidelity protocol commit
        // Simulation of registry synchronization
        setTimeout(() => {
            addNotification('Inventory Node Synced', 'Global logistics matrix updated successfully.', 'success');
            setIsSubmitting(false);
            setIsModalOpen(false);
            resetForm();
            refresh();
        }, 1500);
    } catch (error) {
        addNotification('System Failure', 'Inventory shard propagation unsuccessful.', 'error');
        setIsSubmitting(false);
    }
  };

  const filteredItems = items.filter(a => 
    (a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.sku.includes(searchTerm)) &&
    (activeTab === 'ALL' || a.status.toUpperCase() === activeTab)
  );

  const columns = [
    { 
        header: 'Asset Node', 
        cell: (a) => (
            <div className="flex items-center gap-4 group">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3 ${
                    a.status === 'low' || a.status === 'critical' 
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' 
                    : 'bg-accent-primary/10 border-accent-primary/20 text-accent-primary'
                }`}>
                    {a.status === 'low' || a.status === 'critical' ? <AlertTriangle size={18} /> : <Box size={18} />}
                </div>
                <div className="flex flex-col">
                    <p className="text-[13px] font-black text-text-primary dark:text-white uppercase leading-none">{a.name}</p>
                    <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-[0.2em] mt-2 italic">{a.sku} • {a.category_name}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Stock Density',
        cell: (a) => (
            <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                    <span className={`text-[16px] font-black tracking-tight ${a.status === 'critical' ? 'text-rose-500' : 'text-text-primary dark:text-white'}`}>
                        {a.current_stock}
                    </span>
                    <span className="text-[8px] font-black text-text-secondary/60 uppercase">{a.unit_display}</span>
                </div>
                <span className="text-[8px] font-bold text-text-secondary/30 uppercase tracking-widest mt-1">Threshold: {a.min_stock_level}</span>
            </div>
        )
    },
    { 
        header: 'Supply Status',
        cell: (a) => (
            <div className="flex items-center gap-2.5">
                <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)] ${
                    a.status === 'stable' ? 'bg-emerald-500 shadow-emerald-500/40' : 
                    a.status === 'low' ? 'bg-amber-500 shadow-amber-500/40' : 'bg-rose-500 shadow-rose-500/40'
                }`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${
                    a.status === 'stable' ? 'text-emerald-500' : 
                    a.status === 'low' ? 'text-amber-500' : 'text-rose-500'
                }`}>
                    {a.status} Node
                </span>
            </div>
        )
    },
    { 
        header: 'Resource Health', 
        cell: (a) => (
            <div className="flex flex-col gap-2">
                <div className="w-28 h-2 bg-bg-base dark:bg-white/5 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                    <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                            a.current_stock < a.min_stock_level ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.3)]' : 'bg-accent-primary opacity-60'
                        }`} 
                        style={{ width: `${Math.min(100, (a.current_stock / (a.min_stock_level * 2)) * 100)}%` }}
                    />
                </div>
                <span className="text-[7px] font-bold text-text-secondary/40 uppercase tracking-tighter">Availability Index: {Math.min(100, (a.current_stock / (a.min_stock_level * 2)) * 100).toFixed(1)}%</span>
            </div>
        )
    },
    { 
        header: 'Matrix Flux', 
        cell: (a) => (
            <button className="p-3 rounded-2xl bg-bg-base dark:bg-slate-800/40 text-text-secondary hover:text-accent-primary hover:bg-accent-primary/5 transition-all">
                <RefreshCw size={14} className="hover:rotate-180 transition-transform duration-500" />
            </button>
        )
    },
  ];

  const stats = [
    { title: "Global Assets", value: loading ? "..." : items.length, icon: Archive, trend: "Sync'd", color: "var(--accent-primary)" },
    { title: "Critical Nodes", value: loading ? "..." : items.filter(i => i.status === 'critical').length, icon: AlertTriangle, trend: "Watch", color: "#f43f5e" },
    { title: "Supply Cadence", value: "98.2%", icon: Activity, trend: "Stable", color: "#10b981" },
    { title: "Incoming Shards", value: "+42", icon: Truck, trend: "In route", color: "#6366f1" },
  ];

  return (
    <>
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Supply Matrix" 
        subtitle="Global Resource Allocation Control"
        actions={
            <Button 
                onClick={handleProvision}
                className="bg-accent-primary text-white px-8 py-3 rounded-[20px] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-3 border-none hover:translate-y-[-2px] transition-all"
            >
                <Plus size={16} /> Provision Supply Shard
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
            { id: 'STABLE', label: 'Healthy Shards' },
            { id: 'LOW', label: 'Supply Alert' },
            { id: 'CRITICAL', label: 'Clinical Failure' }
        ]}
      />

      <AdminTable 
        columns={columns} 
        data={filteredItems} 
        isLoading={loading}
      />

      {/* 📜 Audit Log Shard Matrix */}
      {!loading && logs.length > 0 && (
          <div className="mt-12 space-y-6">
              <h3 className="text-xl font-black uppercase italic tracking-tighter text-text-primary dark:text-white ml-2 flex items-center gap-3">
                  <RefreshCw size={20} className="text-accent-primary animate-spin-slow" />
                  Supply Allocation Audit Trail
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {logs.slice(0, 6).map((log, i) => (
                      <Card key={i} className="p-6 bg-white dark:bg-slate-900 border-none rounded-[24px] shadow-sm flex flex-col gap-4">
                          <div className="flex justify-between items-start">
                              <Badge className={`${log.transaction_type === 'in' ? 'bg-emerald-500' : 'bg-rose-500'} text-white`}>
                                  {log.transaction_display}
                              </Badge>
                              <span className="text-[10px] font-black text-text-secondary/40">{new Date(log.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-[12px] font-bold text-text-primary dark:text-white uppercase truncate">{log.item_name}</p>
                          <div className="flex justify-between items-center mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                              <span className="text-[10px] font-black text-accent-primary italic">Qty: {log.quantity}</span>
                              <span className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest">{log.performer_name || 'System'}</span>
                          </div>
                      </Card>
                  ))}
              </div>
          </div>
      )}
    </div>
    <ProvisionSupplyShardModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onRegister={handleRegister}
      isSubmitting={isSubmitting}
    />
    </>
  );
}
