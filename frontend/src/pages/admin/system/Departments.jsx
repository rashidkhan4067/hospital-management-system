import React from 'react';
import { LayoutGrid, MoreHorizontal, Bed, UserCircle, Microscope, Activity, Calendar, ShieldAlert, Database } from 'lucide-react';
import { Card, Badge, Button } from '../../../components/ui';
import { motion } from 'framer-motion';
import { useAdminSystem } from '../../../hooks/admin/useAdminSystem';
import { useUI } from '../../../context/UIContext';
import PageLoader from '../../../components/common/Loading';
import DepartmentModal from '../../../components/features/admin/DepartmentModal';
import FilterBar from '../../../components/features/admin/FilterBar';

/**
 * 🏥 Clinical Unit Shard Matrix
 * Enterprise control hub for medical departments and operational nodes.
 */
export default function DepartmentMatrix() {
  const { departments, loading, refresh, createDepartment, updateDepartment } = useAdminSystem();
  const { addNotification } = useUI();
  
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('ALL');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedDept, setSelectedDept] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (loading) return <PageLoader />;

  const handleOpenModal = (dept = null) => {
    setSelectedDept(dept);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (selectedDept) {
        await updateDepartment(selectedDept.id, data);
        addNotification('Clinical Unit Reconfigured', 'Shard propagation synchronized successfully.', 'success');
      } else {
        await createDepartment(data);
        addNotification('Clinical Node Deployed', 'New departmental shard initialized in the matrix.', 'success');
      }
      setIsModalOpen(false);
      refresh();
    } catch (error) {
      addNotification('Propagation Failure', 'Node could not be initialized in the clinical grid.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDynamicColor = (name) => {
    const colors = ['rose', 'accent', 'indigo', 'emerald', 'amber'];
    const charSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  const getDynamicIcon = (name) => {
    const icons = [<Activity />, <Microscope />, <LayoutGrid />, <UserCircle />, <Bed />];
    const charSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return icons[charSum % icons.length];
  };

  const filteredDepts = departments.filter(d => 
    (d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'ALL' || (activeTab === 'ACTIVE' ? d.is_active : !d.is_active))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-2">
         <div className="space-y-1">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-6 bg-accent-primary rounded-full shadow-lg shadow-accent-primary/20" />
               <h1 className="text-xl md:text-2xl font-black text-text-primary dark:text-white tracking-tight uppercase italic font-display">Department Matrix</h1>
            </div>
            <p className="text-[9px] font-bold text-text-secondary dark:text-white/30 uppercase tracking-[0.3em] ml-5 opacity-60">Clinical Unit Shards</p>
         </div>

         <div className="flex items-center gap-3 bg-bg-offset dark:bg-slate-800/40 p-2 rounded-2xl border border-white/5 shadow-sm">
            <Button 
                onClick={() => handleOpenModal()}
                className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none"
            >
               <LayoutGrid size={16} /> Deploy New Matrix
            </Button>
         </div>
      </header>

      {/* 📊 Matrix Topology Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsOverview title="Total Shards" value={departments.length} icon={<Database size={18}/>} color="var(--accent-primary)" />
          <StatsOverview title="Active Nodes" value={departments.filter(d => d.is_active).length} icon={<Activity size={18}/>} color="#10b981" />
          <StatsOverview title="Offline Matrix" value={departments.filter(d => !d.is_active).length} icon={<ShieldAlert size={18}/>} color="#f43f5e" />
          <StatsOverview title="Total Personnel" value={departments.reduce((acc, d) => acc + (d.doctor_count || 0), 0)} icon={<UserCircle size={18}/>} color="#6366f1" />
      </div>

      {/* 🔍 Propagation Filters */}
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 🏥 Active Clinical Shards */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {filteredDepts.length === 0 ? (
            <div className="p-20 flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                <LayoutGrid size={48} className="text-slate-300" />
                <p className="text-[10px] font-black uppercase tracking-widest">No matching clinical shards found in the grid</p>
            </div>
          ) : filteredDepts.map((dept, i) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 bg-bg-offset dark:bg-slate-800/40 border border-white/5 rounded-[32px] flex items-center gap-8 relative overflow-hidden group hover:bg-bg-base dark:hover:bg-white/5 transition-all">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-${getDynamicColor(dept.name)}-500/10 text-${getDynamicColor(dept.name)}-500 shadow-inner group-hover:rotate-6 transition-transform flex-shrink-0`}>
                  {getDynamicIcon(dept.name) && React.cloneElement(getDynamicIcon(dept.name), { size: 28 })}
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                     <h3 className="text-lg font-black text-text-primary dark:text-white uppercase italic tracking-tight">{dept.name}</h3>
                     <Badge className="bg-bg-base dark:bg-white/5 text-[8px] font-black text-slate-400 border-none px-3">{dept.code}</Badge>
                  </div>
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest opacity-60 flex items-center gap-3">
                    <UserCircle size={12} /> {dept.doctor_count || 0} Authorized Personnel
                  </p>
                </div>

                <div className="hidden lg:flex flex-col items-center px-10 border-x border-white/5">
                  <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest mb-2 opacity-40">Load Pulse</p>
                  <Badge className={`px-4 py-1 rounded-full text-[8px] font-black uppercase text-white shadow-lg ${
                    !dept.is_active ? 'bg-rose-500 shadow-rose-500/20' : 'bg-emerald-500 shadow-emerald-500/20'
                  }`}>
                    {dept.is_active ? 'Active Node' : 'Offline Shard'}
                  </Badge>
                </div>

                <div className="space-y-2 w-32">
                   <div className="flex justify-between items-center text-[9px] font-black uppercase opacity-60 italic">
                      <span>Occupancy</span>
                      <span>{dept.capacity || '0%'}</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                      <div className={`h-full bg-accent-primary rounded-full transition-all duration-1000`} style={{ width: dept.capacity || '0%' }} />
                   </div>
                </div>

                <button 
                  onClick={() => handleOpenModal(dept)}
                  className="p-3 rounded-xl bg-bg-base dark:bg-slate-800 border border-white/5 text-text-secondary hover:text-accent-primary shadow-inner"
                >
                  <MoreHorizontal size={18} />
                </button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 🧬 Matrix Sidebar Insights */}
        <div className="lg:col-span-4 space-y-8">
           <Card className="p-8 bg-accent-primary text-white rounded-[48px] shadow-2xl shadow-accent-primary/20 space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-[60px] rounded-full group-hover:scale-125 transition-transform" />
              <div className="space-y-4 relative z-10">
                 <h2 className="text-2xl font-black uppercase italic tracking-tight leading-none">Matrix Analytics</h2>
                 <p className="text-xs font-bold opacity-60 uppercase tracking-widest leading-relaxed">Global Cross-Department Shard Efficiency and Resource Propagation Level 122.a</p>
              </div>

              <div className="grid grid-cols-2 gap-4 relative z-10 pt-4">
                 <div className="p-6 rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/10">
                    <p className="text-[9px] font-black uppercase opacity-60 mb-2">Wait Time</p>
                    <p className="text-xl font-black italic">12.4m</p>
                 </div>
                 <div className="p-6 rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/10">
                    <p className="text-[9px] font-black uppercase opacity-60 mb-2">ER Load</p>
                    <p className="text-xl font-black italic">92%</p>
                 </div>
              </div>
              
              <Button className="w-full bg-white text-accent-primary py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl relative z-10 group-hover:scale-[1.02] transition-transform border-none">
                 <Calendar size={16} /> Schedule Sync
              </Button>
           </Card>

           <div className="p-8 bg-bg-offset dark:bg-slate-800/40 border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center text-center gap-6 group">
              <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center opacity-40 group-hover:scale-110 transition-transform">
                 <LayoutGrid size={32} />
              </div>
              <div className="space-y-2">
                 <p className="text-[8px] font-black uppercase tracking-[0.4em] text-text-secondary">Topology Matrix</p>
                 <p className="text-sm font-medium text-text-secondary px-6">Configure additional departmental shards for the clinical grid network.</p>
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
    </div>
  );
}

function StatsOverview({ title, value, icon, color }) {
    return (
        <Card className="p-8 bg-bg-offset dark:bg-slate-900/40 border border-white/5 rounded-[40px] flex items-center gap-6 group hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 text-[22px] group-hover:scale-110 transition-transform" style={{ color }}>
                {icon}
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-60">{title}</p>
                <h4 className="text-2xl font-black dark:text-white leading-none italic">{value}</h4>
            </div>
        </Card>
    )
}
