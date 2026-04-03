import React, { useState } from 'react';
import { 
  Package, 
  Plus,
  Activity,
  AlertTriangle,
  Archive,
  RefreshCw,
  Box,
  Truck,
  Eye,
  Edit,
  Trash
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard, Card, TableActions } from '@/shared/components/ui';
import AdminTable from '@/shared/components/ui/AdminTable';
import FilterBar from '@/shared/components/ui/FilterBar';
import ProvisionSupplyShardModal from '@/features/analytics/components/ProvisionSupplyShardModal';
import AdminPage from '@/shared/components/layout/AdminPage';
import { useNavigate } from 'react-router-dom';

import { useAdminInventory } from '@/features/analytics/hooks/useInventory';
import { useUI } from '@/core/ui/UIContext';
import { inventoryService } from '@/features/analytics/api/inventoryService';

/**
 * 📦 Medicine & Stock Management
 */
export default function AdminInventory({ autoOpenAdd = false }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(autoOpenAdd);
  
  const { addNotification } = useUI();
  const { items, categories, logs, loading, refresh } = useAdminInventory();

  const handleProvision = () => setIsModalOpen(true);

  const handleRegister = async (data, resetForm) => {
    setIsSubmitting(true);
    try {
        await inventoryService.create(data);
        addNotification('Medicine Added', 'Inventory has been updated successfully.', 'success');
        setIsModalOpen(false);
        resetForm();
        refresh();
    } catch (error) {
        addNotification('Error', 'Could not add item to inventory.', 'error');
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to remove ${item.name}?`)) {
        try {
            await inventoryService.delete(item.id);
            addNotification('Item Removed', 'Medicine record deleted successfully.', 'success');
            refresh();
        } catch (error) {
            addNotification('Error', 'Could not delete item.', 'error');
        }
    }
  };

  const filteredItems = items.filter(a => 
    (a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.sku.includes(searchTerm)) &&
    (activeTab === 'ALL' || a.status.toUpperCase() === activeTab)
  );

  const columns = [
    { 
        header: 'Medicine Name', 
        cell: (a) => (
            <div 
                className="flex items-center gap-4 group cursor-pointer" 
                onClick={() => navigate(`/admin/inventory/${a.id}`)}
            >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all group-hover:scale-110 ${
                    a.status === 'low' || a.status === 'critical' 
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' 
                    : 'bg-accent-primary/10 border-accent-primary/20 text-accent-primary'
                }`}>
                    {a.status === 'low' || a.status === 'critical' ? <AlertTriangle size={16} /> : <Box size={16} />}
                </div>
                <div className="flex flex-col">
                    <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase leading-none group-hover:text-accent-primary transition-colors">{a.name}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic tabular-nums">SKU: {a.sku}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Stock Levels',
        cell: (a) => (
            <div className="flex items-baseline gap-1.5">
                <span className={`text-[14px] font-black tracking-tight ${a.status === 'critical' ? 'text-rose-500' : 'text-slate-900 dark:text-white'} tabular-nums`}>
                    {a.current_stock}
                </span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">{a.unit_display}</span>
            </div>
        )
    },
    { 
        header: 'Status',
        cell: (a) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${
                    a.status === 'stable' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
                    a.status === 'low' ? 'bg-amber-500' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'
                }`} />
                <span className={`text-[9px] font-black uppercase tracking-tight ${
                    a.status === 'stable' ? 'text-emerald-500' : 
                    a.status === 'low' ? 'text-amber-500' : 'text-rose-500'
                }`}>
                    {a.status}
                </span>
            </div>
        )
    },
    { 
        header: 'Health', 
        cell: (a) => (
            <div className="w-24 h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                        a.current_stock < a.min_stock_level ? 'bg-rose-500 shadow-[0_0_4px_rgba(244,63,94,0.3)]' : 'bg-accent-primary shadow-[0_0_4px_rgba(var(--accent-primary),0.3)]'
                    }`} 
                    style={{ width: `${Math.min(100, (a.current_stock / (a.min_stock_level * 2)) * 100)}%` }}
                />
            </div>
        )
    },
    { 
        header: 'Actions', 
        cell: (a) => (
            <TableActions 
                row={a}
                actions={[
                    { label: 'View Details', icon: Eye, onClick: (row) => console.log('View', row) },
                    { label: 'Sync Stock', icon: RefreshCw, onClick: (row) => refresh() },
                    { label: 'Delete Item', icon: Trash, onClick: handleDelete, variant: 'danger' },
                ]}
            />
        )
    },
  ];

  const stats = [
    { title: "Total Items", value: loading ? "..." : items.length, icon: Archive, trend: "Sync'd" },
    { title: "Critical Nodes", value: loading ? "..." : items.filter(i => i.status === 'critical').length, icon: AlertTriangle, trend: "Watch" },
    { title: "Matrix Health", value: "98.2%", icon: Activity, trend: "Stable" },
    { title: "Incoming Flux", value: "+42", icon: Truck, trend: "In Route" },
  ];

  return (
    <AdminPage>
      <PageHeader 
        title="Medicine & Stock" 
        subtitle="Clinical Inventory Protocol Management"
        actions={
            <Button 
                onClick={handleProvision}
                className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-3 border-none hover:scale-105 transition-all"
            >
                <Plus size={16} /> Add Stock Shard
            </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
      </div>

      <div className="space-y-10">
        <FilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={[
                { id: 'ALL', label: 'Global Inventory' },
                { id: 'STABLE', label: 'Stable Shards' },
                { id: 'LOW', label: 'Low Stocks' },
                { id: 'CRITICAL', label: 'Critical Alert' }
            ]}
        />

        <AdminTable 
            columns={columns} 
            data={filteredItems} 
            isLoading={loading}
        />
      </div>

      {!loading && logs.length > 0 && (
          <div className="space-y-8 mt-10">
              <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white flex items-center gap-3">
                  <RefreshCw size={22} className="text-accent-primary animate-spin-slow" />
                  Realtime Shard Logs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {logs.slice(0, 6).map((log, i) => (
                      <Card key={i} className="matrix-card p-6 border-none flex flex-col gap-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[2rem]">
                          <div className="flex justify-between items-start">
                              <Badge className={`${log.transaction_type === 'in' ? 'bg-emerald-500' : 'bg-rose-500'} text-white border-none py-1.5 px-4 text-[8px] font-black uppercase rounded-full tracking-widest`}>
                                  {log.transaction_display}
                              </Badge>
                              <span className="text-[10px] font-black text-slate-400 tabular-nums uppercase opacity-40">{new Date(log.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <div className="space-y-1">
                              <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase truncate leading-none italic tracking-tight">{log.item_name}</p>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-40 italic">ID: {log.id}</p>
                          </div>
                          <div className="flex justify-between items-center mt-auto pt-6 border-t border-slate-100 dark:border-white/5">
                              <span className="text-[11px] font-black text-accent-primary italic tabular-nums">+{log.quantity} UNITS</span>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic opacity-40">{log.performer_name || 'System'}</span>
                          </div>
                      </Card>
                  ))}
              </div>
          </div>
      )}

      <ProvisionSupplyShardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegister={handleRegister}
        isSubmitting={isSubmitting}
        categories={categories}
      />
    </AdminPage>
  );
}
