import React, { useState, useMemo } from 'react';
import { 
   Wallet, Plus, Clock, CheckCircle, AlertCircle, Eye, XCircle,
   Download, Trash2, Edit3, TrendingDown, Activity, ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
   Badge,
   Button, 
   Card,
   PageHeader,
   FilterBar 
} from '@/components/primitives';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';
import AdminPage from '@/layouts/AdminPage';

// Modular Expense Components
import ExpenseTable from '../components/expenses/ExpenseTable';
import ExpenseModal from '../components/expenses/ExpenseModal';
import { OutflowVolumeShard, ThresholdShard, FiscalContextNotice } from '../components/expenses/ExpenseVisualShards';

/**
 * 💹 Al Shifaa Expenses Matrix
 * Unified high-fidelity administrative fiscal command center.
 */
export default function ExpensesPage() {
   const navigate = useNavigate();
   const [searchTerm, setSearchTerm] = useState('');
   const [activeTab, setActiveTab] = useState('ALL');
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [loading, setLoading] = useState(false);

   // 🧪 Mock Telemetry Matrix
   const expenses = useState([
       { id: 1, title: 'Medical Supplies Sync', category: 'Inventory', amount: 45000, status: 'APPROVED', date: '2026-04-05', reference: 'EXP-8821' },
       { id: 2, title: 'Staff Payroll Matrix', category: 'Salary', amount: 850000, status: 'PENDING', date: '2026-04-05', reference: 'EXP-8822' },
       { id: 3, title: 'Server Shard Maintenance', category: 'Software', amount: 12000, status: 'APPROVED', date: '2026-04-04', reference: 'EXP-8823' },
       { id: 4, title: 'Emergency Ward Logistics', category: 'Operating', amount: 8500, status: 'REJECTED', date: '2026-04-04', reference: 'EXP-8824' },
       { id: 5, title: 'Pharmacy Node Logistics', category: 'Inventory', amount: 28000, status: 'APPROVED', date: '2026-04-03', reference: 'EXP-8825' },
   ])[0];

   const handleViewDetail = (exp) => {
       navigate(`/admin/expenses/${exp.id}`);
   };

   const stats = {
       overview: { total: 12, approved: 8, pending: 3, rejected: 1 },
       volume: [
           { label: 'Mon', value: 45 },
           { label: 'Tue', value: 120 },
           { label: 'Wed', value: 85 },
           { label: 'Thu', value: 210 },
           { label: 'Fri', value: 160 },
           { label: 'Sat', value: 40 },
           { label: 'Sun', value: 15 }
       ]
   };

   // ─── Filter Matrix ───
   const filteredExpenses = useMemo(() => {
      return expenses.filter(e => {
         const title = e.title.toLowerCase();
         const category = e.category.toLowerCase();
         const status = e.status;
         
         const matchesSearch = title.includes(searchTerm.toLowerCase()) || 
                               category.includes(searchTerm.toLowerCase()) ||
                               e.reference.toLowerCase().includes(searchTerm.toLowerCase());
                               
         const matchesTab = activeTab === 'ALL' || status === activeTab;

         return matchesSearch && matchesTab;
      });
   }, [expenses, searchTerm, activeTab]);

   return (
      <AdminPage>
         <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-1000">
            
            {/* 🛸 COMMAND HUB: Row 1 — Header */}
            <PageHeader 
               title="Fiscal Outflow Matrix"
               subtitle="System Expenditure Synchronized"
               status="Registry Live"
               actions={
                  <div className="flex items-center gap-2">
                     <Button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-accent-primary/90 hover:scale-105 transition-all shadow-lg shadow-accent-primary/25 border-none font-display italic"
                     >
                        <Plus size={16} strokeWidth={3} /> Entry Log
                     </Button>
                  </div>
               }
            />

            {/* 🌠 PERSISTENT HUB: Row 2 — Hero CTA */}
            <UnifiedHeroCTA 
               compact
               title={<>Expenditure <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Analytics.</span></>}
               subtitle="Manage clinical outflows, synchronize vendor nodes, and optimize resource allocation across the Al Shifaa fiscal matrix."
               pillPrefix="Financial Outflow Hub"
               pillIcon={Wallet}
               actions={[
                  { title: 'Log Entry', subtitle: 'New Expenditure', icon: Plus, onClick: () => setIsModalOpen(true) },
                  { title: 'Audit Shard', subtitle: 'View Full Report', icon: Activity, onClick: () => {} }
               ]}
            />

            {/* 🛰 KPI Hub */}
            <UnifiedKpiGrid 
               loading={loading}
               stats={[
                  { title: 'Gross Outflow', value: `Rs. ${stats.volume.reduce((acc, curr) => acc + curr.value, 0)}k`, icon: TrendingDown, color: 'text-rose-500' },
                  { title: 'Registry Nodes', value: stats.overview.total, icon: Wallet, color: 'text-slate-900 dark:text-white' },
                  { title: 'Pending Verify', value: stats.overview.pending, icon: Clock, color: 'text-amber-500' },
                  { title: 'Approved Value', value: '72%', icon: CheckCircle, color: 'text-emerald-500' }
               ]}
            />

            {/* 🛰 SESSION DENSITY HUB */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <OutflowVolumeShard stats={stats.volume} />
                <ThresholdShard />
            </div>

            {/* 🛰 Master Control Matrix */}
            <div className="w-full">
               <FilterBar 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  placeholder="Search expenditure, category, or ref..."
                  tabs={[
                     { id: 'ALL', label: 'All Shards' },
                     { id: 'APPROVED', label: 'Authorized' },
                     { id: 'PENDING', label: 'Verification' },
                     { id: 'REJECTED', label: 'Declined' }
                  ]}
               />
            </div>

            {/* 🛰 Unified Assembly */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
               
               {/* 🏗 FISCAL OPERATIONS (Left Space) */}
               <div className="lg:col-span-8 flex flex-col gap-5 lg:gap-6">
                  
                  <ExpenseTable 
                     expenses={filteredExpenses} 
                     isLoading={loading}
                     onStatusChange={() => {}}
                     onViewDetail={handleViewDetail}
                  />

                  {/* Operational Toolbox */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
                     <div className="lg:col-span-1 p-5 rounded-[2.5rem] bg-rose-500/10 border border-rose-500/20 flex flex-col gap-3 group cursor-pointer hover:bg-rose-500 transition-all shadow-xl shadow-rose-500/10">
                        <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-rose-500 shadow-sm transition-transform group-hover:rotate-12 italic">
                           <Download size={16} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black group-hover:text-white text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none font-display">Export Shard</p>
                           <p className="text-[8px] font-bold text-slate-400 group-hover:text-white/60 uppercase tracking-widest mt-1.5 leading-none italic font-display">Fiscal Archives</p>
                        </div>
                     </div>

                     <div className="lg:col-span-2 p-5 lg:p-6 rounded-[2.5rem] bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-5 group shadow-2als">
                        <div className="flex items-center gap-4">
                           <div className="w-11 h-11 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-all shadow-sm italic">
                              <TrendingDown size={20} />
                           </div>
                           <div className="flex flex-col">
                              <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none group-hover:text-accent-primary transition-colors font-display">Audit Propagation</p>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none italic font-display">Neural balance verification.</p>
                           </div>
                        </div>
                        <Button className="px-6 py-3.5 rounded-2xl bg-slate-900 dark:bg-accent-primary text-white text-[10px] font-black uppercase tracking-widest border-none shadow-lg shadow-black/20 font-display italic">Execute Sync</Button>
                     </div>
                  </div>
               </div>

               {/* 🛰 SIDEBAR INTELLIGENCE (Right Space) */}
               <div className="lg:col-span-4 flex flex-col gap-5 lg:gap-6">
                  
                  <FiscalContextNotice />

                  {/* Protocol Notice Card */}
                  <Card className="p-8 rounded-[2.5rem] bg-slate-900 text-white flex flex-col gap-6 relative overflow-hidden group shadow-2als border-none">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-[60px] rounded-full pointer-events-none" />
                     <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-sm transition-transform group-hover:rotate-12 italic">
                           <ArrowUpRight size={18} />
                        </div>
                        <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display">Audit Protocol</h4>
                     </div>
                     <p className="text-[10px] font-black italic text-slate-400 leading-relaxed uppercase tracking-wide opacity-80 relative z-10 font-display">
                        Spectral balance verified. Outflow velocity is within optimized clinical thresholds. No anomaly detected.
                     </p>
                     <Button className="w-full bg-accent-primary text-white py-4 rounded-xl text-[9px] font-black uppercase tracking-widest border-none transition-all hover:scale-[1.02] active:scale-95 italic shadow-lg shadow-accent-primary/20 font-display">
                        Refresh Fiscal Hub
                     </Button>
                  </Card>

                  {/* Mini Stats Card */}
                  <Card className="p-6 rounded-[2.5rem] bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex flex-col gap-4 shadow-sm">
                      <div className="flex items-center justify-between">
                         <p className="text-[9px] font-black uppercase text-slate-400 italic">Category Node Sync</p>
                         <Activity size={12} className="text-accent-primary" />
                      </div>
                      <div className="space-y-3">
                         {['Inventory', 'Salary', 'Software', 'Operating'].map((cat, i) => (
                            <div key={i} className="flex flex-col gap-1.5">
                               <div className="flex justify-between text-[10px] font-black uppercase italic">
                                  <span className="text-slate-600 dark:text-slate-300">{cat}</span>
                                  <span className="text-accent-primary">{(100 - i * 15)}%</span>
                               </div>
                               <div className="h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-accent-primary transition-all duration-1000" style={{ width: `${100 - i * 15}%` }} />
                               </div>
                            </div>
                         ))}
                      </div>
                  </Card>
               </div>
            </div>
         </div>

         {/* Layered Entry Modal */}
         <ExpenseModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onRefresh={() => {}}
         />
      </AdminPage>
   );
}
