import React, { useState, useMemo } from 'react';
import { 
  Plus, Droplets, Archive, AlertTriangle, ShieldCheck, 
  MoreHorizontal, Download, Zap, TrendingUp, Search, 
  Trash2, Edit3, Eye, Calendar, Wallet, CheckCircle, XCircle
} from 'lucide-react';
import { 
  Badge, 
  Button, 
  PageHeader, 
  Card,
  TableActions,
  FilterBar 
} from '@/components/primitives';
import AdminPage from '@/layouts/AdminPage';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';
import RegisterMedicationModal from '@/features/core_management/analytics/components/RegisterMedicationModal';

// 🏗️ FEATURE SHARDS


import { useAdminPharmacy } from '@/features/core_management/analytics/hooks/usePharmacy';
import { useUI } from '@/core/ui/UIContext';
import PharmacyService from '@/features/core_management/analytics/api/pharmacyService';
import { useNavigate } from 'react-router-dom';

/**
 * 💊 Pharmacy Fulfillment Shard
 * Specialized drug distribution, prescription tracking, and inventory sync.
 * Scale: Admin Dashboard | High-Fidelity Clinical Command Center.
 */
export default function PharmacyPage() {
  const navigate = useNavigate();
  const { addNotification } = useUI();
  const { inventory, criticalItems, loading, refresh } = useAdminPharmacy();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegisterMedication = async (formData, resetForm) => {
    setIsSubmitting(true);
    try {
        await PharmacyService.createMedicine(formData);
        addNotification('Medicine Added', 'New medicine has been added to the store.', 'success');
        setIsModalOpen(false);
        refresh();
        resetForm();
    } catch (err) {
        addNotification('Error', 'Could not add medicine to the database.', 'error');
        console.error(err);
    } finally {
        setIsSubmitting(false);
    }
  };

  const filteredInventory = useMemo(() => {
     return inventory.filter(m => 
       (m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.batch_number?.toLowerCase().includes(searchTerm.toLowerCase())) &&
       (activeTab === 'ALL' || m.category?.toUpperCase() === activeTab)
     );
  }, [inventory, searchTerm, activeTab]);

  return (
    <AdminPage>
      <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-1000">
        
        {/* 🛸 COMMAND HUB: Row 1 — Header */}
        <PageHeader 
          title="Pharmacy Intelligence"
          subtitle="Medicine distribution and prescription fulfillment matrix."
          status="Dispatch Ready"
          actions={
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-accent-primary/90 hover:scale-105 transition-all shadow-lg shadow-accent-primary/25 border-none font-display italic"
              >
                <Plus size={16} strokeWidth={3} /> Add Medicine
              </Button>
            </div>
          }
        />

        {/* 🌠 PERSISTENT HUB: Row 2 — Hero CTA */}
        <UnifiedHeroCTA 
          compact
          title={<>Clinical <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Fulfillment.</span></>}
          subtitle={`Managing ${inventory.length} medicine shards within the Al Shifaa matrix. High-fidelity stock synchronization verified against clinical needs.`}
          pillPrefix="Pharmacy Matrix Console"
          pillIcon={Droplets}
          actions={[
             { title: 'Add Entry',   subtitle: 'Register Medicine', icon: Plus, onClick: () => setIsModalOpen(true) },
             { title: 'Full Export',  subtitle: 'Archives Matrix', icon: Download, onClick: () => {} }
          ]}
        />

        {/* 🛰 KPI Hub */}
        <UnifiedKpiGrid 
          loading={loading}
          stats={[
            { title: 'Total Medicines', value: inventory.length, icon: Archive, color: 'text-slate-900 dark:text-white', trend: 'Sync\'d' },
            { title: 'Total Stock', value: inventory.reduce((acc, m) => acc + (m.stock_quantity || 0), 0).toLocaleString(), icon: Droplets, color: 'text-accent-primary', trend: '+4% Up' },
            { title: 'Critical Low', value: criticalItems.length, icon: AlertTriangle, color: 'text-rose-500', trend: 'Immediate' },
            { title: 'Nodes Online', value: '42%', icon: ShieldCheck, color: 'text-indigo-500', trend: 'Stable' }
          ]}
        />

        {/* 🏗 ASSET ASSEMBLY: 8:4 Modular Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
           
           {/* LEFT - Global Asset Hub (8 cols) */}
           <div className="lg:col-span-8 flex flex-col gap-6">
              
              <div className="w-full">
                 <FilterBar 
                   searchTerm={searchTerm}
                   setSearchTerm={setSearchTerm}
                   activeTab={activeTab}
                   setActiveTab={setActiveTab}
                   placeholder="Search ID, batch, or medicine name..."
                   tabs={[
                       { id: 'ALL', label: 'All Global' },
                       { id: 'ANTIBIOTICS', label: 'Antibiotics' },
                       { id: 'ANALGESICS', label: 'Analgesics' },
                       { id: 'CARDIAC', label: 'Cardiac Care' }
                   ]}
                 />
              </div>

              {/* High-Fidelity Custom Table */}
              <div className="w-full bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col p-3 lg:p-6 italic">
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent-primary/5 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="w-full overflow-x-auto relative z-10 scrollbar-hide">
                  <table className="w-full text-left border-collapse table-fixed min-w-[850px]">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-white/5">
                        <th className="w-[30%] px-3 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest whitespace-nowrap text-left italic">Medicine & Identification</th>
                        <th className="w-[18%] px-3 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center whitespace-nowrap italic">Category</th>
                        <th className="w-[18%] px-3 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center whitespace-nowrap italic">Stock Shard</th>
                        <th className="w-[15%] px-3 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center whitespace-nowrap italic">Status</th>
                        <th className="w-[19%] px-3 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right whitespace-nowest italic">Controls</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-white/5 text-left">
                      {loading ? (
                         <tr><td colSpan="5" className="h-40 text-center text-[10px] font-black uppercase text-slate-300 italic">Syncing Matrix...</td></tr>
                      ) : filteredInventory.length === 0 ? (
                         <tr><td colSpan="5" className="h-40 text-center text-[10px] font-black uppercase text-slate-300 italic">No Matching Node Found</td></tr>
                      ) : filteredInventory.map((m, idx) => (
                         <tr key={idx} className="group/row hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300">
                            <td className="px-3 py-6">
                               <div className="flex items-center gap-4">
                                  <div className="relative group cursor-pointer" onClick={() => navigate(`/admin/inventory/${m.id}`)}>
                                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 flex items-center justify-center text-accent-primary font-black text-xs uppercase border border-accent-primary/10 italic shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
                                        <Droplets size={20} />
                                     </div>
                                  </div>
                                  <div className="flex flex-col min-w-0">
                                     <p className="text-[13px] font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none group-hover/row:text-accent-primary transition-colors truncate font-display">
                                        {m.name || 'Unknown Specimen'}
                                     </p>
                                     <span className="text-[8px] font-black uppercase tracking-widest mt-2 px-2 py-0.5 rounded-lg bg-slate-900/5 dark:bg-white/5 text-slate-500 border border-slate-100 dark:border-white/5 lowercase italic block w-fit">
                                        Batch: {m.batch_number || 'NODE-00'}
                                     </span>
                                  </div>
                               </div>
                            </td>

                            <td className="px-3 py-6 text-center">
                               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accent-primary/5 text-accent-primary text-[9px] font-black uppercase italic border border-accent-primary/10 shadow-sm leading-none">
                                  {m.category || 'General'}
                               </div>
                            </td>

                            <td className="px-3 py-6 text-center">
                               <div className="flex flex-col items-center gap-2">
                                  <span className={`text-[12px] font-black italic tracking-tighter tabular-nums leading-none ${m.stock_quantity <= m.reorder_level ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>
                                     {m.stock_quantity || 0} Units
                                  </span>
                                  <div className="w-20 h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                     <div 
                                        className={`h-full ${m.stock_quantity <= m.reorder_level ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'} transition-all duration-700`} 
                                        style={{ width: `${Math.min(((m.stock_quantity || 0) / 200) * 100, 100)}%` }}
                                     />
                                  </div>
                               </div>
                            </td>

                            <td className="px-3 py-6 text-center">
                               <div className="flex flex-col items-center gap-1 shrink-0">
                                  {new Date(m.expiry_date) < new Date() ? (
                                     <Badge variant="error" className="text-[8px] font-black uppercase italic italic">Expired Shard</Badge>
                                  ) : m.stock_quantity <= m.reorder_level ? (
                                     <Badge variant="warning" className="text-[8px] font-black uppercase italic italic">Critical Node</Badge>
                                  ) : (
                                     <Badge variant="success" className="text-[8px] font-black uppercase italic italic">Stable Node</Badge>
                                  )}
                               </div>
                            </td>

                            <td className="px-3 py-6 text-right">
                               <div className="flex items-center justify-end gap-2.5 opacity-0 group-hover/row:opacity-100 transition-opacity translate-x-2 group-hover/row:translate-x-0 transition-transform">
                                  <button type="button" onClick={() => navigate(`/admin/inventory/${m.id}`)} className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 hover:text-accent-primary border border-slate-200 dark:border-white/10 transition-all hover:scale-110 shadow-sm whitespace-nowrap italic font-black uppercase text-[10px]"><Eye size={16} /></button>
                                  <button type="button" className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 transition-all hover:scale-110 shadow-sm whitespace-nowrap italic font-black uppercase text-[10px]"><Edit3 size={16} /></button>
                                  <button type="button" className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20 transition-all hover:scale-110 shadow-sm whitespace-nowrap italic font-black uppercase text-[10px]"><Trash2 size={16} /></button>
                               </div>
                            </td>
                         </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0">
                  <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic leading-none">Clinical Fulfillment v4.2</span>
                  <div className="flex gap-1.5">
                    <Button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10 p-0 shadow-sm min-w-0">&lt;</Button>
                    <Button className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-accent-primary text-white border-none p-0 shadow-lg font-black italic shadow-accent-primary/20 min-w-0">01</Button>
                    <Button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10 p-0 shadow-sm min-w-0">&gt;</Button>
                  </div>
                </div>
              </div>

              {/* SECONDARY ROW: Promotions & Incentives */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Shards Removed Temporarily to fix build */}
              </div>

           </div>

           {/* RIGHT - Context Shards (4 cols) */}
           <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Specialized Visual Shards Removed Temporarily */}


              <Card className="p-8 rounded-[2.5rem] bg-slate-900 text-white border-none flex flex-col gap-6 shadow-2als relative overflow-hidden group">
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-primary/10 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-[3s]" />
                  <div className="flex items-center gap-4 relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 italic">
                          <Zap size={20} className="text-accent-primary" />
                      </div>
                      <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display text-white">Neural Dispatch</h4>
                  </div>
                  <div className="space-y-1 relative z-10">
                      <p className="text-3xl font-black italic tracking-tighter leading-none text-accent-primary font-display">Optimal</p>
                      <p className="text-[9px] font-bold uppercase opacity-60 tracking-widest mt-1 font-display">Prescription throughput is within threshold.</p>
                  </div>
                  <button className="mt-auto w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl py-4 text-[9px] font-black uppercase tracking-widest transition-all relative z-10 italic font-display">
                      Verify Dispatch Registry
                  </button>
              </Card>

           </div>
        </div>

      </div>

      <RegisterMedicationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegister={handleRegisterMedication}
        isSubmitting={isSubmitting}
      />
    </AdminPage>
  );
}


