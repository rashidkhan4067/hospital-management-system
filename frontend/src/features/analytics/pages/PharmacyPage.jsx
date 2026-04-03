import React, { useState } from 'react';
import { 
  Plus, 
  Droplets, 
  Archive, 
  AlertTriangle, 
  ShieldCheck,
  MoreHorizontal
} from 'lucide-react';
import { Badge, Button, PageHeader, StatsCard } from '@/shared/components/ui';
import AdminTable from '@/shared/components/ui/AdminTable';
import FilterBar from '@/shared/components/ui/FilterBar';
import RegisterMedicationModal from '@/features/analytics/components/RegisterMedicationModal';

import { useAdminPharmacy } from '@/features/analytics/hooks/usePharmacy';
import { useUI } from '@/core/ui/UIContext';
import PharmacyService from '@/features/analytics/api/pharmacyService';

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
        addNotification('Medicine Added', 'New medicine has been added to the store.', 'success');
        setIsModalOpen(false);
        refresh(); // Refresh inventory
        resetForm(); // Clear the modal's internal form
    } catch (err) {
        addNotification('Error', 'Could not add medicine to the database.', 'error');
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
        header: 'Medicine Name', 
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
        header: 'Category', 
        cell: (m) => (
            <div className="flex items-center gap-2">
                <Badge className="bg-bg-base dark:bg-slate-800/40 text-accent-primary text-[9px] font-black uppercase tracking-widest border-none">
                    {m.category}
                </Badge>
            </div>
        )
    },
    { 
        header: 'Stock Level', 
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
        header: 'Price (Rs)', 
        cell: (m) => <span className="text-[11px] font-black text-text-primary dark:text-white tracking-widest uppercase italic">Rs. {m.unit_price}</span>
    },
    { 
        header: 'Expiry Date',
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
    { title: "Total Medicines", value: loading ? "..." : inventory.length, icon: Archive, trend: "Sync'd", color: "var(--accent-primary)" },
    { title: "Total Stock", value: loading ? "..." : inventory.reduce((acc, m) => acc + m.stock_quantity, 0).toLocaleString(), icon: Droplets, trend: "Live", color: "#10b981" },
    { title: "Low Stock", value: loading ? "..." : criticalItems.length, icon: AlertTriangle, trend: "Immediate", color: "#f43f5e" },
    { title: "Pharmacy Status", value: "Verified", icon: ShieldCheck, trend: "Secure", color: "#6366f1" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <PageHeader 
        title="Pharmacy" 
        subtitle="Medicine & Prescription Management"
        actions={
            <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none"
            >
                <Plus size={14} /> Add Medicine
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
            { id: 'ALL', label: 'All Medicines' },
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
