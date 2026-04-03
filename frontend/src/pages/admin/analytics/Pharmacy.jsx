import React, { useState } from 'react';
import { 
  Plus, 
  Droplets, 
  Archive, 
  AlertTriangle, 
  ShieldCheck,
  MoreHorizontal
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard } from '../../../components/ui';
import AdminTable from '../../../components/features/admin/AdminTable';
import FilterBar from '../../../components/features/admin/FilterBar';
import RegisterMedicationModal from '../../../components/features/admin/RegisterMedicationModal';

import { useAdminPharmacy } from '../../../hooks/admin/useAdminPharmacy';
import { useUI } from '../../../context/UIContext';
import PharmacyService from '../../../services/admin/PharmacyService';

/**
 * 💊 Pharmacy Fulfillment Shard
 * Specialized drug distribution, prescription tracking, and inventory sync.
 * Scale: Admin Dashboard | High-Density Portal
 */
export default function AdminPharmacy() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addNotification } = useUI();
  const { inventory, criticalItems, loading, refresh } = useAdminPharmacy();

  const handleRegisterMedication = async (formData, resetForm) => {
    setIsSubmitting(true);
    try {
        await PharmacyService.createMedicine(formData);
        addNotification('Medication Initialized', 'Asset successfully committed to global inventory.', 'success');
        setIsModalOpen(false);
        refresh(); // Refresh inventory
        resetForm(); // Clear the modal's internal form
    } catch (err) {
        addNotification('Sync Failure', 'Could not propagate medication shard to database.', 'error');
        console.error(err);
    } finally {
        setIsSubmitting(false);
    }
  };

  const filteredInventory = inventory.filter(m => 
    (m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.batch_number?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'ALL' || m.category.toUpperCase() === activeTab)
  );

  const columns = [
    { 
        header: 'Asset Identity', 
        cell: (m) => (
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-center text-accent-primary shadow-inner">
                    <Droplets size={20} />
                </div>
                <div className="flex flex-col">
                    <p className="text-[13px] font-black text-text-primary dark:text-white uppercase leading-none">{m.name}</p>
                    <p className="text-[9px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-[0.2em] mt-2">{m.batch_number}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Clinical Category', 
        cell: (m) => (
            <div className="flex items-center gap-2">
                <Badge className="bg-bg-base dark:bg-slate-800/40 text-accent-primary text-[9px] font-black uppercase tracking-widest border-none">
                    {m.category}
                </Badge>
            </div>
        )
    },
    { 
        header: 'Stock Quantum', 
        cell: (m) => (
            <div className="flex flex-col">
                <span className={`text-[12px] font-extrabold ${m.stock_quantity <= m.reorder_level ? 'text-rose-500' : 'text-text-primary dark:text-white'}`}>
                    {m.stock_quantity} Units
                </span>
                <div className="w-24 h-1.5 bg-bg-base dark:bg-slate-800/40 rounded-full mt-2 overflow-hidden">
                    <div 
                        className={`h-full ${m.stock_quantity <= m.reorder_level ? 'bg-rose-500' : 'bg-emerald-500'} transition-all`} 
                        style={{ width: `${Math.min((m.stock_quantity / 200) * 100, 100)}%` }}
                    />
                </div>
            </div>
        )
    },
    { 
        header: 'Unit Valuation', 
        cell: (m) => <span className="text-[11px] font-black text-text-primary dark:text-white tracking-widest uppercase italic">${m.unit_price}</span>
    },
    { 
        header: 'Expiry Protocol',
        cell: (m) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${new Date(m.expiry_date) < new Date() ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight text-text-secondary">{m.expiry_date}</span>
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
    { title: "Total Shards", value: loading ? "..." : inventory.length, icon: Archive, trend: "Sync'd", color: "var(--accent-primary)" },
    { title: "Active Inventory", value: loading ? "..." : inventory.reduce((acc, m) => acc + m.stock_quantity, 0).toLocaleString(), icon: Droplets, trend: "Live", color: "#10b981" },
    { title: "Critical Alerts", value: loading ? "..." : criticalItems.length, icon: AlertTriangle, trend: "Immediate", color: "#f43f5e" },
    { title: "Security Protocols", value: "Level 9", icon: ShieldCheck, trend: "Hardened", color: "#6366f1" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Pharmacy Shard Matrix" 
        subtitle="Global Pharmaceutical Fulfillment Console"
        actions={
            <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none"
            >
                <Plus size={14} /> Register Medication
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
            { id: 'ALL', label: 'Global Shards' },
            { id: 'ANTIBIOTICS', label: 'Antibiotics' },
            { id: 'ANALGESICS', label: 'Analgesics' },
            { id: 'CARDIAC', label: 'Cardiac Care' }
        ]}
      />

      <AdminTable 
        columns={columns} 
        data={filteredInventory} 
        isLoading={loading}
      />

      {/* 🔮 MODULAR REGISTRATION DIALOG */}
      <RegisterMedicationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegister={handleRegisterMedication}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
