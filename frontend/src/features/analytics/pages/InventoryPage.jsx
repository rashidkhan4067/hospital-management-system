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
  Trash,
  Zap,
  ShieldCheck,
  LayoutGrid,
  Settings
} from 'lucide-react';
import { Badge, Button, PageHeader, Card, TableActions, FilterBar } from '@/components/primitives';
import AdminTable from '@/components/primitives/AdminTable';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';
import ProvisionSupplyShardModal from '@/features/analytics/components/ProvisionSupplyShardModal';
import AdminPage from '@/layouts/AdminPage';
import { useNavigate } from 'react-router-dom';

import { useAdminInventory } from '@/features/analytics/hooks/useInventory';
import { useUI } from '@/core/ui/UIContext';
import { inventoryService } from '@/features/analytics/api/inventoryService';
import { AssetHealthShard, SupplyChainFluxShard, MaintenanceProtocolShard } from '../components/ResourceShards';

/**
 * 🛰 Global Resources Hub — Inventory & Asset Matrix
 */
export default function ResourcesHub({ autoOpenAdd = false }) {
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
        addNotification('Clinical Shard Provisioned', 'Matrix node updated successfully.', 'success');
        setIsModalOpen(false);
        resetForm();
        refresh();
    } catch (error) {
        addNotification('Provision Failure', 'Could not sync node to matrix.', 'error');
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to decommission ${item.name}?`)) {
        try {
            await inventoryService.delete(item.id);
            addNotification('Shard Decommissioned', 'Resource node removed from matrix.', 'success');
            refresh();
        } catch (error) {
            addNotification('Decommission Error', 'Node could not be removed.', 'error');
        }
    }
  };

  const filteredItems = items.filter(a => 
    (a.name.toLowerCase().includes(searchTerm.toLowerCase()) || (a.sku && a.sku.includes(searchTerm))) &&
    (activeTab === 'ALL' || a.status.toUpperCase() === activeTab)
  );

  const columns = [
    { 
        header: 'Resource Node', 
        cell: (a) => (
            <div 
                className="flex items-center gap-4 group cursor-pointer" 
                onClick={() => navigate(`/admin/inventory/${a.id}`)}
            >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6 ${
                    a.status === 'low' || a.status === 'critical' 
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' 
                    : 'bg-accent-primary/10 border-accent-primary/20 text-accent-primary'
                }`}>
                    {a.status === 'low' || a.status === 'critical' ? <AlertTriangle size={20} strokeWidth={2.5} /> : <Package size={20} strokeWidth={2.5} />}
                </div>
                <div className="flex flex-col">
                    <p className="text-[13px] font-black text-slate-900 dark:text-white uppercase leading-none group-hover:text-accent-primary transition-colors italic font-display">{a.name}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 italic tabular-nums opacity-60">SHARD_ID: {a.sku || 'SYS_NODE'}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Matrix Stock',
        cell: (a) => (
            <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-1.5">
                    <span className={`text-lg font-black tracking-tight italic ${a.status === 'critical' ? 'text-rose-500' : 'text-slate-900 dark:text-white'} tabular-nums`}>
                        {a.current_stock}
                    </span>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter italic">{a.unit_display || 'UNITS'}</span>
                </div>
                {a.status === 'low' && <span className="text-[7px] font-black text-amber-500 uppercase tracking-widest leading-none italic animate-pulse">Low Reserve</span>}
            </div>
        )
    },
    { 
        header: 'Protocol Status',
        cell: (a) => (
            <Badge variant="outline" className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest italic border ${
                a.status === 'stable' ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20' : 
                a.status === 'low' ? 'bg-amber-500/5 text-amber-500 border-amber-500/20' : 'bg-rose-500/5 text-rose-500 border-rose-500/20'
            }`}>
               {a.status === 'stable' ? 'Nominal' : a.status === 'low' ? 'Low Flux' : 'CRITICAL'}
            </Badge>
        )
    },
    { 
        header: 'Health Matrix', 
        cell: (a) => (
            <div className="flex flex-col gap-2 w-32">
                <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                    <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                            a.current_stock < a.min_stock_level ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' : 'bg-accent-primary shadow-[0_0_8px_rgba(20,184,166,0.4)]'
                        }`} 
                        style={{ width: `${Math.min(100, (a.current_stock / (a.min_stock_level * 2)) * 100)}%` }}
                    />
                </div>
                <div className="flex justify-between items-center text-[7px] font-black uppercase opacity-40 italic tracking-widest">
                   <span>Stability</span>
                   <span className="tabular-nums">{Math.round(Math.min(100, (a.current_stock / (a.min_stock_level * 2)) * 100))}%</span>
                </div>
            </div>
        )
    },
    { 
        header: 'Pulse Actions', 
        cell: (a) => (
            <TableActions 
                row={a}
                actions={[
                    { label: 'View Shard', icon: Eye, onClick: (row) => navigate(`/admin/inventory/${row.id}`) },
                    { label: 'Sync Node', icon: RefreshCw, onClick: (row) => refresh() },
                    { label: 'Decommission', icon: Trash, onClick: handleDelete, variant: 'danger' },
                ]}
            />
        )
    },
  ];

  const kpis = [
    { title: "Total Nodes", value: items.length, icon: Archive, trend: "Sync'd", trendType: "neutral" },
    { title: "Critical alerts", value: items.filter(i => i.status === 'critical').length, icon: AlertTriangle, trend: "High Risk", trendType: "negative" },
    { title: "Matrix Health", value: "98.2%", icon: Activity, trend: "Stable", trendType: "positive" },
    { title: "Logistics Flux", value: "+42", icon: Truck, trend: "In Route", trendType: "positive" },
  ];

  return (
    <AdminPage>
      <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-1000 italic">
        
        <PageHeader 
          title="Resources Hub" 
          subtitle="Global management of medicinal inventory and clinical asset matrices."
          status="Logistics Shield: Active"
          actions={
              <Button 
                  onClick={handleProvision}
                  className="bg-accent-primary text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-3 border-none hover:scale-105 transition-all font-display italic"
              >
                  <Plus size={16} strokeWidth={3} /> Provision Shard
              </Button>
          }
        />

        <UnifiedHeroCTA 
          compact
          title={<>Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Resources.</span></>}
          subtitle={`Synchronizing ${items.length} clinical supply nodes and asset shards across the institutional grid.`}
          pillPrefix="Supply Chain Protocol"
          pillIcon={Settings}
          actions={[
            { title: 'Provision Node', subtitle: 'Add New Shard', icon: Plus, onClick: handleProvision },
            { title: 'Matrix Sync',   subtitle: 'Global Refresh', icon: RefreshCw, onClick: refresh }
          ]}
        />

        <UnifiedKpiGrid loading={loading} stats={kpis} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
           {/* 🚚 PRIMARY: The Resource Matrix */}
           <div className="lg:col-span-8 space-y-8">
              <FilterBar 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  tabs={[
                      { id: 'ALL', label: 'Global Matrix' },
                      { id: 'STABLE', label: 'Stable Nodes' },
                      { id: 'LOW', label: 'Low Flux' },
                      { id: 'CRITICAL', label: 'Critical Alert' }
                  ]}
              />

              <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-2 shadow-2als border border-slate-100 dark:border-white/5 overflow-hidden">
                <AdminTable 
                    columns={columns} 
                    data={filteredItems} 
                    isLoading={loading}
                />
              </div>

              {/* 🔄 SHARD LOGS */}
              {!loading && logs.length > 0 && (
                <div className="space-y-6 pt-4">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white flex items-center gap-4 font-display">
                        <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20">
                           <RefreshCw size={20} strokeWidth={3} className="animate-spin-slow" />
                        </div>
                        Real-time Propagation Logs
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {logs.slice(0, 4).map((log, i) => (
                            <Card key={i} className="p-6 border-none flex items-center gap-6 bg-white dark:bg-slate-900 shadow-2als rounded-[2.5rem] group relative overflow-hidden italic">
                                <div className={`w-2 h-12 rounded-full ${log.transaction_type === 'in' ? 'bg-emerald-500' : 'bg-rose-500'} opacity-20 group-hover:opacity-100 transition-opacity`} />
                                
                                <div className="flex-1 space-y-1">
                                    <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase leading-none italic tracking-tight font-display">{log.item_name}</p>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-60 italic">{log.transaction_display} • {log.performer_name || 'System'}</p>
                                </div>
                                
                                <div className="text-right">
                                    <p className={`text-lg font-black italic tabular-nums leading-none ${log.transaction_type === 'in' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                       {log.transaction_type === 'in' ? '+' : '-'}{log.quantity}
                                    </p>
                                    <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-1 opacity-40">{new Date(log.timestamp).toLocaleTimeString()}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
              )}
           </div>

           {/* 📡 SECONDARY: Intelligence Shards */}
           <div className="lg:col-span-4 flex flex-col gap-8">
              <AssetHealthShard />
              <div className="grid grid-cols-1 gap-8">
                 <SupplyChainFluxShard />
                 <MaintenanceProtocolShard />
              </div>

              {/* 📦 MATRIX HELP */}
              <Card className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als flex flex-col items-center text-center gap-6 group hover:border-accent-primary/20 transition-all italic relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 dark:bg-white/5 blur-[40px] rounded-full -mr-12 -mt-12" />
                 <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800/60 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <LayoutGrid size={32} />
                 </div>
                 <div className="space-y-2 relative z-10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic font-display">Logistics Docs</h4>
                    <p className="text-[11px] font-bold text-slate-500 leading-relaxed italic">Guidelines for clinical shard provisioning and asset maintenance protocols.</p>
                 </div>
                 <Button className="w-full py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-slate-400 text-[9px] font-black uppercase tracking-widest hover:text-accent-primary transition-all border border-slate-100 dark:border-white/5 font-display">
                    Protocol Schema
                 </Button>
              </Card>
           </div>
        </div>
      </div>

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
