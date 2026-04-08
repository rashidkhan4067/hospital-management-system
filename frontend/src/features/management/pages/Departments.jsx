import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, MoreHorizontal, UserCircle, Activity, ShieldAlert, Database, Calendar, Plus, Zap, ShieldCheck } from 'lucide-react';
import { Card, Badge, Button, PageHeader } from '@/components/primitives';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminSystem } from '@/features/management/hooks/useSystem';
import { useUI } from '@/core/ui/UIContext';
import DepartmentModal from '@/features/management/components/DepartmentModal';
import FilterBar from '@/components/primitives/FilterBar';
import AdminPage from '@/layouts/AdminPage';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';
import { DepartmentThroughputShard, UnitEfficiencyShard, TopologyMatrixShard } from '../components/DepartmentShards';

/**
 * 🏥 Clinical Unit Shard Matrix — Premium Evolution
 */
export default function DepartmentMatrix() {
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get('section');
  
  const { departments, loading, refresh, createDepartment, updateDepartment } = useAdminSystem();
  const { addNotification } = useUI();
  
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('ALL');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedDept, setSelectedDept] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleOpenModal = (dept = null) => {
    setSelectedDept(dept);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (selectedDept) {
        await updateDepartment(selectedDept.id, data);
        addNotification('Clinical Unit Reconfigured', 'Shard propagation synchronized.', 'success');
      } else {
        await createDepartment(data);
        addNotification('Clinical Node Deployed', 'New departmental shard initialized.', 'success');
      }
      setIsModalOpen(false);
      refresh();
    } catch (error) {
      addNotification('Propagation Failure', 'Node could not be initialized.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🧬 Filter Logic with Shard Deep-Linking
  const filteredDepts = React.useMemo(() => {
    return departments.filter(d => {
      // 🛰️ Strict Node Filtering via Deep Link
      if (sectionId && d.id !== sectionId) return false;
      
      const searchMatch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || (d.code && d.code.toLowerCase().includes(searchTerm.toLowerCase()));
      const tabMatch = activeTab === 'ALL' || (activeTab === 'ACTIVE' ? d.is_active : !d.is_active);
      return searchMatch && tabMatch;
    });
  }, [departments, searchTerm, activeTab, sectionId]);

  const kpis = [
    { title: "Total Shards", value: loading ? "..." : departments.length, icon: Database, trend: "+2", trendType: "neutral" },
    { title: "Active Nodes", value: loading ? "..." : departments.filter(d => d.is_active).length, icon: Activity, trend: "Stable", trendType: "positive" },
    { title: "Offline Shards", value: loading ? "..." : departments.filter(d => !d.is_active).length, icon: ShieldAlert, trend: "0 Flux", trendType: "warning" },
    { title: "Global Experts", value: loading ? "..." : departments.reduce((acc, d) => acc + (d.doctor_count || 0), 0), icon: UserCircle, trend: "+12", trendType: "positive" },
  ];

  return (
    <AdminPage>
      <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-1000 italic">
        
        <PageHeader 
          title="Clinical Matrix" 
          subtitle="Synchronization and control of global hospital departmental shards."
          status="Grid Resonance: Optimal"
          actions={
              <Button 
                  onClick={() => handleOpenModal()}
                  className="bg-accent-primary text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-3 border-none hover:scale-105 transition-all font-display italic"
              >
                 <Plus size={18} strokeWidth={3} /> Deploy New Node
              </Button>
          }
        />

        <UnifiedHeroCTA 
          compact
          title={<>Clinical <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Architecture.</span></>}
          subtitle="Orchestrate institutional topology with high-fidelity shard mapping. Real-time resource propagation across clinical units enabled."
          pillPrefix="Spatial Control Matrix"
          pillIcon={LayoutGrid}
          actions={[
             { title: 'Global Sync', subtitle: 'Grid Propagation', icon: Zap, onClick: () => {} },
             { title: 'Topology MD', subtitle: 'Schema Ledger',    icon: ShieldCheck, onClick: () => {} }
          ]}
        />

        <UnifiedKpiGrid loading={false} stats={kpis} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
           {/* 🛸 LEFT FLANK: The Shard Matrix */}
           <div className="lg:col-span-8 space-y-8">
              <FilterBar 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  tabs={[
                      { id: 'ALL', label: 'Global Matrix' },
                      { id: 'ACTIVE', label: 'Operational Nodes' },
                      { id: 'OFFLINE', label: 'Offline Shards' }
                  ]}
              />

              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 gap-6">
                  {filteredDepts.length === 0 ? (
                    <div className="p-32 flex flex-col items-center justify-center text-center space-y-6 opacity-30 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-2als">
                        <LayoutGrid size={80} strokeWidth={1} className="text-slate-400" />
                        <p className="text-[12px] font-black uppercase tracking-[0.4em] italic font-display">Zero grid resonance detected</p>
                    </div>
                  ) : filteredDepts.map((dept, i) => (
                    <motion.div
                      key={dept.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className="p-8 border-none flex flex-col sm:flex-row items-center gap-8 group hover:-translate-y-1 transition-all duration-500 bg-white dark:bg-slate-900 shadow-2als rounded-[3rem] relative overflow-hidden italic">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/5 blur-[40px] rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform" />
                        
                        {/* ⚛️ Icon Core */}
                        <div className="w-16 h-16 rounded-[22px] flex items-center justify-center bg-accent-primary/5 text-accent-primary border border-accent-primary/10 shadow-inner group-hover:rotate-6 transition-transform relative shrink-0">
                          <LayoutGrid size={32} strokeWidth={2.5} />
                          {dept.is_active && <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900 animate-pulse shadow-lg shadow-emerald-500/50" />}
                        </div>
                        
                        {/* 📝 Identity Flux */}
                        <div className="flex-1 space-y-3 text-center sm:text-left">
                          <div className="flex flex-col sm:flex-row items-center gap-3">
                             <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter font-display leading-none">{dept.name}</h3>
                             <Badge variant="outline" className="text-[9px] font-black text-slate-400 border-slate-200 dark:border-white/10 px-4 py-1 tracking-widest uppercase opacity-60 italic">{dept.code || 'NULL'}</Badge>
                          </div>
                          <div className="flex items-center justify-center sm:justify-start gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic opacity-80">
                            <span className="flex items-center gap-2 font-display"><UserCircle size={14} className="text-accent-primary" /> {dept.doctor_count || 0} Specialties</span>
                            <span className="flex items-center gap-2 font-display"><Database size={14} className="text-accent-primary" /> Shard Verified</span>
                          </div>
                        </div>

                        {/* 📊 Flow Matrix */}
                        <div className="hidden lg:flex flex-col gap-3 w-48 px-10 border-x border-slate-50 dark:border-white/5">
                           <div className="flex justify-between items-center text-[9px] font-black uppercase italic tracking-widest text-slate-300">
                              <span>Throughput</span>
                              <span className="tabular-nums text-accent-primary">{dept.capacity || '42%'}</span>
                           </div>
                           <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                              <div className="h-full bg-accent-primary rounded-full transition-all duration-[1.5s] relative" style={{ width: dept.capacity || '42%' }}>
                                 <div className="absolute top-0 right-0 h-full w-4 bg-white/30 skew-x-12 animate-shimmer" />
                              </div>
                           </div>
                        </div>

                        {/* ⚙️ Control Pulse */}
                        <div className="flex items-center gap-4 shrink-0">
                           <Badge className={`px-5 py-2.5 rounded-2xl text-[9px] font-black uppercase text-white shadow-xl border-none transition-all ${
                              !dept.is_active ? 'bg-rose-500 shadow-rose-500/30' : 'bg-emerald-500 shadow-emerald-500/30 group-hover:scale-110'
                           }`}>
                              {dept.is_active ? 'Active Node' : 'Offline'}
                           </Badge>

                           <button 
                             onClick={() => handleOpenModal(dept)}
                             className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/5 text-slate-400 hover:text-accent-primary shadow-inner hover:scale-110 hover:rotate-90 transition-all flex items-center justify-center"
                           >
                             <MoreHorizontal size={20} />
                           </button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
           </div>

           {/* 🛰 RIGHT FLANK: Telemetry Shards */}
           <div className="lg:col-span-4 flex flex-col gap-8">
              <DepartmentThroughputShard />
              
              <div className="grid grid-cols-1 gap-8">
                 <UnitEfficiencyShard />
                 <TopologyMatrixShard />
              </div>

              {/* 🏥 GRID ASSISTANT */}
              <div className="p-10 bg-white dark:bg-slate-900 shadow-2als border border-slate-100 dark:border-white/5 rounded-[3rem] flex flex-col items-center justify-center text-center gap-8 group hover:border-accent-primary/20 transition-all border-none italic">
                 <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                    <LayoutGrid size={40} />
                 </div>
                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic font-display">Protocol Manual</p>
                    <p className="text-sm font-bold text-slate-500 px-6 leading-relaxed">Cross-departmental shard mapping documentation is synchronized with the global clinical grid.</p>
                 </div>
                 <Button className="px-10 py-4 rounded-2xl border border-slate-100 dark:border-white/5 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-50 dark:hover:bg-white/5 transition-all w-full font-display">
                     Access Grid Docs
                 </Button>
              </div>
           </div>
        </div>
      </div>

      <DepartmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        department={selectedDept}
        loading={isSubmitting}
      />
    </AdminPage>
  );
}
