import React, { useEffect, useState, useCallback } from 'react';
import { 
  ChevronLeft, Plus, Edit2, Activity, Calendar, FileText,
  ClipboardList, Pill, Stethoscope, Upload, Users, Heart,
  Wallet, Tag, ArrowRight, Printer, Share2, ShieldCheck, Clock
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, PageHeader, Badge, Card } from '@/shared/components/ui';
import AdminPage from '@/shared/components/layout/AdminPage';
import UnifiedHeroCTA from '@/shared/components/common/UnifiedHeroCTA';
import UnifiedKpiGrid from '@/shared/components/common/UnifiedKpiGrid';

// ── Modular Expense Shards ──────────────────────────────────────────────────
import ExpenseDetailsCard from '../components/record/ExpenseDetailsCard';
import TransactionAuditTrail from '../components/record/TransactionAuditTrail';

const TABS = [
  { id: 'overview',   label: 'Overview',      icon: Activity },
  { id: 'audit',      label: 'Audit Trail',   icon: ClipboardList },
  { id: 'documents',  label: 'Documents',     icon: FileText },
  { id: 'related',    label: 'Related Node',  icon: Globe },
];

function Globe({ size, className }) {
    return <Activity size={size} className={className} />;
}

/**
 * 💹 Al Shifaa Expense Record Hub
 * High-fidelity fiscal registry for individual expenditures.
 */
export default function ExpenseRecordPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // 🧪 Mock Load Shard
  const loadExpense = useCallback(async () => {
    try {
      setLoading(true);
      setTimeout(() => {
          setExpense({
              id: id,
              title: 'Clinical Diagnostic Matrix Prop',
              category: 'Inventory',
              amount: 54000,
              vendor: 'Global Bio-Systems',
              date: '2026-04-05',
              reference: 'EXP-SHARD-9912',
              status: 'APPROVED',
              description: 'Implementation of high-fidelity diagnostic shards across all clinical laboratories.',
              logs: [
                  { time: '10:30 AM', event: 'Fiscal Node Dispatched', status: 'Success' },
                  { time: '09:45 AM', event: 'Audit Synchronization', status: 'Success' },
                  { time: '09:12 AM', event: 'Entry Initialized', status: 'Success' },
              ]
          });
          setLoading(false);
      }, 800);
    } catch {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) loadExpense();
  }, [id, loadExpense]);

  if (loading && !expense) return <Loading />;
  if (!expense) return null;

  const kpis = [
      { title: 'Gross Committed', value: `Rs. ${Number(expense.amount).toLocaleString()}`, icon: Wallet, color: 'text-slate-900 dark:text-white' },
      { title: 'Audit Index', value: 'High Conf.', icon: ShieldCheck, color: 'text-emerald-500' },
      { title: 'Status Shard', value: expense.status, icon: Clock, color: 'text-accent-primary' },
      { title: 'Registry Sync', value: '100%', icon: Activity, color: 'text-indigo-500' }
  ];

  return (
    <AdminPage>
      <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-1000">

        {/* 🛸 COMMAND CLUSTER: Row 1 — Header */}
        <PageHeader 
          title={expense.title}
          subtitle={`Expense Node #${id} · Fiscal Category: ${expense.category}`}
          status="Registry Detail"
          actions={
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate('/admin/expenses')}
                className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-white/5 text-slate-500 dark:text-white/60 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all font-display italic"
              >
                <ChevronLeft size={14} /> Fiscal Matrix
              </Button>
              <Button 
                className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/25 border-none hover:brightness-110 transition-all font-display italic"
              >
                <Edit2 size={14} /> Edit Entry
              </Button>
            </div>
          }
        />

        {/* 🌠 PERSISTENT HUB: Row 2 — Hero CTA */}
        <UnifiedHeroCTA 
          compact
          title={<>Fiscal Entry <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Propagated.</span></>}
          subtitle={`This node represents a committed expenditure of Rs. ${expense.amount.toLocaleString()}. Audit protocols verified against clinical standards.`}
          pillPrefix="Financial Record Node"
          pillIcon={Wallet}
          actions={[
             { title: 'Print Receipt',   subtitle: 'Ledger Archival', icon: Printer, onClick: () => {} },
             { title: 'Share Node',      subtitle: 'Dispatch Matrix', icon: Share2,  onClick: () => {} },
          ]}
        />

        {/* 🛰 KPI Hub */}
        <UnifiedKpiGrid stats={kpis} loading={loading} />

        {/* 🏗 CLUSTER ASSEMBLY: 4:8 Modular Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
           
           {/* LEFT - Fiscal Context (4 cols) */}
           <div className="lg:col-span-4 flex flex-col gap-6">
              <ExpenseDetailsCard expense={expense} />
              
              <Card className="p-8 rounded-[2.5rem] bg-slate-900 text-white flex flex-col gap-6 relative overflow-hidden group shadow-2als border-none italic">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-[60px] rounded-full pointer-events-none" />
                 <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-sm transition-transform group-hover:rotate-12">
                       <Clock size={18} />
                    </div>
                    <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display text-accent-primary">Fiscal Intelligence</h4>
                 </div>
                 <p className="text-[10px] font-black italic text-slate-400 leading-relaxed uppercase tracking-wide opacity-80 relative z-10 font-display">
                    Audit trail synchronized with regional financial protocols. No discrepancies detected in this fiscal node.
                 </p>
                 <Button className="w-full bg-accent-primary text-white py-4 rounded-xl text-[9px] font-black uppercase tracking-widest border-none transition-all hover:scale-[1.02] active:scale-95 italic shadow-lg shadow-accent-primary/20 font-display">
                    Full Ledger Sync
                 </Button>
              </Card>
           </div>

           {/* RIGHT - Detailed Shards (8 cols) */}
           <div className="lg:col-span-8 flex flex-col gap-5">
              
              {/* Tab Matrix */}
              <div className="bg-white dark:bg-white/[0.03] rounded-2xl border border-slate-200 dark:border-white/[0.06] p-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar">
                {TABS.map(tab => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all italic font-display ${
                        active
                          ? 'bg-accent-primary text-white shadow-md shadow-accent-primary/30'
                          : 'text-slate-400 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-white/70'
                      }`}
                    >
                      <Icon size={13} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Interaction Panel */}
              <div className="bg-white dark:bg-white/[0.03] rounded-2xl border border-slate-200 dark:border-white/[0.06] p-8 lg:p-10 min-h-[400px] relative overflow-hidden group">
                  <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-2 duration-300 relative z-10">
                     <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-[1.2rem] bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:rotate-6 transition-transform italic">
                              <Wallet size={22} />
                           </div>
                           <div>
                              <h3 className="text-[18px] font-black text-slate-800 dark:text-white uppercase tracking-tight italic font-display">
                                 Fiscal {activeTab} Hub
                              </h3>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 font-display">Synchronized Revenue Node</p>
                           </div>
                        </div>
                     </div>

                     <div className="mt-8">
                        {activeTab === 'overview' && (
                           <div className="space-y-8">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <Card className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col gap-3">
                                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic group-hover:text-accent-primary transition-colors">Description</h5>
                                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-relaxed uppercase italic">{expense.description}</p>
                                 </Card>
                                 <Card className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col gap-3">
                                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic group-hover:text-accent-primary transition-colors">Audit Node Verified</h5>
                                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-relaxed uppercase italic">Confirmed by Admin System Node at 2026-04-05 09:44 AM</p>
                                 </Card>
                              </div>
                              <TransactionAuditTrail logs={expense.logs} />
                           </div>
                        )}
                        {activeTab === 'audit' && <TransactionAuditTrail logs={expense.logs} />}
                        {activeTab === 'documents' && (
                            <div className="w-full h-40 flex flex-col items-center justify-center gap-4 text-slate-300 italic border-2 border-dashed border-slate-100 dark:border-white/5 rounded-3xl">
                                <FileText size={24} />
                                <p className="text-[9px] font-black uppercase tracking-widest">No Documents Dispatched</p>
                            </div>
                        )}
                        {activeTab === 'related' && (
                            <div className="w-full h-40 flex flex-col items-center justify-center gap-4 text-slate-300 italic border-2 border-dashed border-slate-100 dark:border-white/5 rounded-3xl">
                                <Users size={24} />
                                <p className="text-[9px] font-black uppercase tracking-widest">No Shared Parent Nodes</p>
                            </div>
                        )}
                     </div>
                  </div>
              </div>

           </div>
        </div>
      </div>
    </AdminPage>
  );
}

function Loading() {
  return (
    <AdminPage>
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 rounded-[1.5rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-accent-primary animate-spin shadow-inner italic">
             <Wallet size={24} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/30 italic font-display">
            Propagating Fiscal Detail Matrix...
          </p>
        </div>
      </div>
    </AdminPage>
  );
}
