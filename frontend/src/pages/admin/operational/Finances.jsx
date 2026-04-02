import React, { useState } from 'react';
import { 
  CreditCard, 
  TrendingUp,
  Receipt,
  Download,
  AlertCircle,
  MoreHorizontal,
  DollarSign,
  Activity,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge, Button, PageHeader, StatsCard, Card, TransactionModal } from '../../../components/ui';
import AdminTable from '../../../components/features/admin/AdminTable';
import FilterBar from '../../../components/features/admin/FilterBar';

// 🎣 CLINICAL DATA HOOKS
import { useAdminFinance } from '../../../hooks/admin/useAdminFinance';
import { useAdminStats } from '../../../hooks/admin/useAdminStats';
import { useAdminPatients } from '../../../hooks/admin/useAdminPatients';
import { useUI } from '../../../context/UIContext';

/**
 * 💹 Financial Oversight & Billing Hub
 * Real-time revenue propagation and invoice management.
 */
export default function AdminFinances() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ patient: '', amount: '', method: 'CARD', type: 'INCOME', description: '' });

  const { addNotification } = useUI();
  const { transactions, loading: financeLoading, postTransaction, refresh } = useAdminFinance();
  const { stats: statsSummary, loading: statsLoading } = useAdminStats();
  const { patients, loading: patientsLoading } = useAdminPatients();

  const loading = financeLoading || statsLoading;

  const handleCreateTransaction = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await postTransaction(formData);
      addNotification('Clinical transaction node committed successfully.', 'success');
      setIsModalOpen(false);
      setFormData({ patient: '', amount: '', method: 'CARD', type: 'INCOME', description: '' });
      refresh();
    } catch (err) {
      addNotification('System could not propagate financial shard. Check API status.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    { 
        header: 'Billing Instance', 
        cell: (t) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/5 border border-accent-primary/10 flex items-center justify-center text-accent-primary">
                    <Receipt size={16} />
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase leading-none">{t.patient_name || 'Generic Transaction'}</p>
                    <p className="text-[8px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest mt-1.5">{t.transaction_id}</p>
                </div>
            </div>
        )
    },
    { 
        header: 'Total Value',
        cell: (t) => <span className="text-[14px] font-black text-text-primary dark:text-white tracking-tight">${Number(t.amount).toLocaleString()}</span>
    },
    { 
        header: 'Protocol Shard',
        cell: (t) => <span className="text-[10px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-widest italic">{t.method}</span>
    },
    { 
        header: 'Status',
        cell: (t) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${t.status === 'completed' ? 'bg-emerald-500 shadow-emerald-500' : t.status === 'failed' ? 'bg-rose-500 shadow-rose-500' : 'bg-amber-500 shadow-amber-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">{t.status}</span>
            </div>
        )
    },
    { header: 'Issued On', cell: (t) => new Date(t.timestamp).toLocaleDateString() },
    { 
        header: 'Actions', 
        cell: () => (
            <div className="flex items-center justify-end gap-2">
                <button className="p-2.5 rounded-xl bg-bg-base dark:bg-white/5 text-text-secondary hover:text-accent-primary transition-all">
                    <Download size={14} />
                </button>
                <button className="p-2.5 rounded-xl bg-bg-base dark:bg-slate-800/40 text-text-secondary hover:text-accent-primary transition-all">
                    <MoreHorizontal size={14} />
                </button>
            </div>
        )
    },
  ];

  const stats = [
    { title: "Network Revenue", value: loading ? "..." : `$${(statsSummary?.finance?.net_revenue || 0).toLocaleString()}`, icon: TrendingUp, trend: "Live", color: "var(--accent-primary)" },
    { title: "Pending Shards", value: loading ? "..." : statsSummary?.finance?.pending_invoices ?? 0, icon: DollarSign, trend: "In-Transit", color: "#f59e0b" },
    { title: "Total Transactions", value: loading ? "..." : statsSummary?.finance?.total_transactions ?? 0, icon: Receipt, trend: "Synced", color: "#10b981" },
    { title: "Alert Node", value: "0", icon: AlertCircle, trend: "Healthy", color: "#f43f5e" },
  ];

  const filteredTransactions = transactions.filter(t => 
    (t.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     t.transaction_id?.includes(searchTerm.toUpperCase())) &&
    (activeTab === 'ALL' || t.status.toUpperCase() === activeTab)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto relative">
      
      <PageHeader 
        title="Revenue Matrix" 
        subtitle="Global Financial Propagation Console"
        actions={
            <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-accent-primary text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2 border-none"
            >
                <CreditCard size={14} /> New Transaction
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
            { id: 'ALL', label: 'Global Ledger' },
            { id: 'COMPLETED', label: 'Paid Assets' },
            { id: 'PENDING', label: 'Pending Processing' },
            { id: 'FAILED', label: 'Failed Shards' }
        ]}
      />

      <AdminTable 
        columns={columns} 
        data={filteredTransactions} 
        isLoading={loading}
      />
          {/* 🔮 NEW TRANSACTION MODAL (Standardized Shard) */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Node Protocol"
        subtitle="Fiscal Initialization Hub"
        icon={Activity}
        maxWidth="max-w-4xl"
      >
        <form onSubmit={handleCreateTransaction} className="space-y-8">
            <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-2">Relational Target Shard</label>
                <div className="relative">
                    <select 
                        required
                        className="w-full bg-slate-50 dark:bg-slate-900/50 p-5 rounded-[24px] border border-slate-200 dark:border-white/5 text-[13px] font-extrabold outline-none focus:ring-4 focus:ring-accent-primary/10 focus:border-accent-primary transition-all appearance-none cursor-pointer text-slate-900 dark:text-white shadow-inner"
                        value={formData.patient}
                        onChange={(e) => setFormData({...formData, patient: e.target.value})}
                    >
                        <option value="">Select Identity</option>
                        {patients.map(p => (
                            <option key={p.id} value={p.id}>{p.full_name}</option>
                        ))}
                    </select>
                    <ArrowRight size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-2">Value Matrix (USD)</label>
                    <div className="relative">
                        <input 
                            type="number"
                            required
                            placeholder="0.00"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-5 pl-12 rounded-[24px] border border-slate-200 dark:border-white/5 text-[15px] font-black outline-none focus:ring-4 focus:ring-accent-primary/10 focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-inner"
                            value={formData.amount}
                            onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        />
                        <DollarSign size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-accent-primary" />
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-2">Audit Category</label>
                    <select 
                        className="w-full bg-slate-50 dark:bg-slate-900/50 p-5 rounded-[24px] border border-slate-200 dark:border-white/5 text-[13px] font-extrabold outline-none focus:ring-4 focus:ring-accent-primary/10 focus:border-accent-primary transition-all cursor-pointer text-slate-900 dark:text-white shadow-inner"
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                        <option value="INCOME">Clinical Revenue</option>
                        <option value="EXPENSE">Global Outflow</option>
                        <option value="REFUND">Relational Refund</option>
                    </select>
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-2">Payment Shard Sync</label>
                <select 
                    className="w-full bg-slate-50 dark:bg-slate-900/50 p-5 rounded-[24px] border border-slate-200 dark:border-white/5 text-[13px] font-extrabold outline-none focus:ring-4 focus:ring-accent-primary/10 focus:border-accent-primary transition-all cursor-pointer text-slate-900 dark:text-white shadow-inner"
                    value={formData.method}
                    onChange={(e) => setFormData({...formData, method: e.target.value})}
                >
                    <option value="CARD">Digital Stripe Node</option>
                    <option value="CASH">Physical Currency</option>
                    <option value="INSURANCE">Insurance Policy Sync</option>
                    <option value="TRANSFER">Internal Node Transfer</option>
                </select>
            </div>

            <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-accent-primary text-white p-7 rounded-[26px] text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-accent-primary/40 border-none hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-10"
            >
                {isSubmitting ? 'Syncing Node...' : 'Commit Transaction Protocol'}
            </Button>
        </form>
      </TransactionModal>
    </div>
  );
}
