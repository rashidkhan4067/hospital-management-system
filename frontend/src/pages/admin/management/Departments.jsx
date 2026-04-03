import React from 'react';
import { LayoutGrid, MoreHorizontal, UserCircle, Activity, ShieldAlert, Database, Calendar } from 'lucide-react';
import { Card, Badge, Button, PageHeader, StatsCard } from '../../../components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminSystem } from '../../../hooks/admin/useAdminSystem';
import { useUI } from '../../../context/UIContext';
import DepartmentModal from '../../../components/modals/admin/management/DepartmentModal';
import FilterBar from '../../../components/features/admin/FilterBar';
import AdminPage from '../../../components/layout/AdminPage'; // ✨ THE BASE FILE

/**
 * 🏥 Clinical Unit Shard Matrix
 */
export default function DepartmentMatrix() {
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

  const filteredDepts = departments.filter(d => 
    (d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'ALL' || (activeTab === 'ACTIVE' ? d.is_active : !d.is_active))
  );

  const stats = [
    { title: "Total Shards", value: loading ? "..." : departments.length, icon: Database, trend: "Sync'd" },
    { title: "Active Nodes", value: loading ? "..." : departments.filter(d => d.is_active).length, icon: Activity, trend: "Operational" },
    { title: "Offline Shards", value: loading ? "..." : departments.filter(d => !d.is_active).length, icon: ShieldAlert, trend: "Watch" },
    { title: "Global Personnel", value: loading ? "..." : departments.reduce((acc, d) => acc + (d.doctor_count || 0), 0), icon: UserCircle, trend: "Authorized" },
  ];

  return (
    <AdminPage>
      <PageHeader 
        title="Clinical Matrix" 
        subtitle="Control Global Hospital Departmental Shards"
        actions={
            <Button 
                onClick={() => handleOpenModal()}
                className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-3 border-none hover:scale-105 transition-all"
            >
               <LayoutGrid size={18} /> Deploy New Matrix
            </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
      </div>

      <div className="space-y-10">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[500px]">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <AnimatePresence mode="popLayout">
              {filteredDepts.length === 0 ? (
                <div className="p-20 flex flex-col items-center justify-center text-center space-y-6 opacity-30 bg-slate-50 dark:bg-black/10 rounded-[48px] border-2 border-dashed border-slate-200 dark:border-white/5">
                    <LayoutGrid size={64} strokeWidth={1} />
                    <p className="text-[12px] font-black uppercase tracking-[0.4em]">No clinical shards detected in current grid resonance</p>
                </div>
              ) : filteredDepts.map((dept, i) => (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="matrix-card p-8 border-none flex items-center gap-10 group hover:translate-x-2 transition-all duration-500">
                    <div className="w-16 h-16 rounded-[22px] flex items-center justify-center bg-accent-primary/5 text-accent-primary border border-accent-primary/10 shadow-inner group-hover:rotate-6 transition-transform relative">
                      <LayoutGrid size={32} strokeWidth={2.5} />
                      {dept.is_active && <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-4">
                         <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{dept.name}</h3>
                         <Badge className="bg-slate-100 dark:bg-white/5 text-[9px] font-black text-slate-400 border-none px-4 py-1 tracking-widest">{dept.code}</Badge>
                      </div>
                      <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                        <span className="flex items-center gap-2"><UserCircle size={14} className="text-accent-primary" /> {dept.doctor_count || 0} Specialists</span>
                        <span className="flex items-center gap-2"><Database size={14} className="text-accent-primary" /> Shard Verified</span>
                      </div>
                    </div>

                    <div className="hidden xl:flex flex-col items-center px-10 border-x border-slate-100 dark:border-white/5 min-w-[200px]">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 italic">Node Pulse</p>
                      <Badge className={`px-5 py-1.5 rounded-full text-[9px] font-black uppercase text-white shadow-xl transition-all ${
                        !dept.is_active ? 'bg-rose-500 shadow-rose-500/30' : 'bg-emerald-500 shadow-emerald-500/30 group-hover:scale-110'
                      }`}>
                        {dept.is_active ? 'Active Node' : 'Offline Shard'}
                      </Badge>
                    </div>

                    <div className="hidden md:flex flex-col gap-3 w-40">
                       <div className="flex justify-between items-center text-[10px] font-black uppercase italic tracking-widest text-slate-400">
                          <span>Throughput</span>
                          <span className="tabular-nums">{dept.capacity || '0%'}</span>
                       </div>
                       <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                          <div className="h-full bg-accent-primary rounded-full transition-all duration-[1.5s]" style={{ width: dept.capacity || '0%' }} />
                       </div>
                    </div>

                    <button 
                      onClick={() => handleOpenModal(dept)}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/5 text-slate-400 hover:text-accent-primary shadow-inner hover:scale-110 transition-all"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-10">
             <Card className="matrix-card p-10 bg-accent-primary text-white border-none shadow-[0_32px_64px_-12px_rgba(20,184,166,0.3)] space-y-10 group overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-[2s]" />
                <div className="space-y-4 relative z-10">
                   <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none pr-10">Clinical Network Efficiency</h2>
                   <p className="text-[11px] font-bold opacity-60 uppercase tracking-widest leading-loose">Global Cross-Department Shard Efficiency and Resource Propagation Level 122.a</p>
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                   <div className="p-8 rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl group-hover:-translate-y-2 transition-all">
                      <p className="text-[10px] font-black uppercase opacity-60 mb-3 tracking-[0.2em]">Avg Wait</p>
                      <p className="text-2xl font-black italic tabular-nums">12.4m</p>
                   </div>
                   <div className="p-8 rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl group-hover:-translate-y-2 transition-all delay-75">
                      <p className="text-[10px] font-black uppercase opacity-60 mb-3 tracking-[0.2em]">Matrix Load</p>
                      <p className="text-2xl font-black italic tabular-nums">92%</p>
                   </div>
                </div>
                
                <Button className="w-full bg-white text-accent-primary py-5 rounded-[22px] text-[11px] font-black uppercase tracking-[0.5em] shadow-2xl relative z-10 group-hover:scale-x-105 transition-all border-none">
                   <Calendar size={18} /> Schedule Sync
                </Button>
             </Card>

             <div className="p-10 bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-white/5 rounded-[48px] flex flex-col items-center justify-center text-center gap-8 group hover:border-accent-primary/20 transition-all border-none">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                   <LayoutGrid size={40} />
                </div>
                <div className="space-y-3">
                   <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 italic">Topology Matrix</p>
                   <p className="text-sm font-bold text-slate-500 px-6 leading-relaxed">Configure additional departmental shards for the clinical grid network mapping.</p>
                </div>
                <Button className="px-8 py-3 rounded-full border border-slate-200 dark:border-white/10 text-slate-400 text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
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
