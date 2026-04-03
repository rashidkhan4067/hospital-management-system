import React, { useState } from 'react';
import { CreditCard, Download } from 'lucide-react';
import { Button, PageHeader } from '../../../components/ui';
import AdminPage from '../../../components/layout/AdminPage';
import FilterBar from '../../../components/features/admin/FilterBar';

// 🏗️ MODULAR FINANCE SHARDS
import FinanceStats from '../../../components/features/admin/finance/FinanceStats';
import TransactionTable from '../../../components/features/admin/finance/TransactionTable';
import ProvisionTransactionModal from '../../../components/modals/admin/finance/ProvisionTransactionModal';
import ReceiptModal from '../../../components/modals/admin/finance/ReceiptModal';
import AuditDetailModal from '../../../components/modals/admin/finance/AuditDetailModal';

// 🎣 CLINICAL DATA HOOKS
import { useAdminFinance } from '../../../hooks/admin/useAdminFinance';
import { useAdminStats } from '../../../hooks/admin/useAdminStats';
import { useAdminPatients } from '../../../hooks/admin/useAdminPatients';
import { useUI } from '../../../context/UIContext';

/**
 * 💹 Financial Oversight & Billing Hub (Orchestrator)
 */
export default function AdminFinances() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);
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
      addNotification('System could not propagate financial shard.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * ⚡ MATRIX LOGIC: EXPORT SHARD
   */
  const handleExport = (txn) => {
    const data = txn ? [txn] : transactions;
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Patient,Amount,Method,Status,Timestamp\n"
      + data.map(t => `${t.transaction_id || t.id},${t.patient_name},${t.amount},${t.method},${t.status},${t.timestamp}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AlShifaa_Finance_Shard_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    addNotification('Telemetry Shard Exported', 'CSV matrix generated and committed to local drive.', 'success');
  };

  const handleAction = (type, txn) => {
    setSelectedTxn(txn);
    switch(type) {
        case 'view':
            setIsReceiptOpen(true);
            break;
        case 'export':
            handleExport(txn);
            break;
        case 'print':
            setIsReceiptOpen(true); // Open receipt then user can print
            break;
        case 'audit':
            setIsAuditOpen(true);
            break;
        default: break;
    }
  };

  const filteredTransactions = transactions.filter(t => 
    (t.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     (t.transaction_id || t.id.toString()).includes(searchTerm.toUpperCase())) &&
    (activeTab === 'ALL' || t.status.toUpperCase() === activeTab)
  );

  return (
    <AdminPage>
      <PageHeader 
        title="Revenue Matrix" 
        subtitle="Global Financial Shard Propagation Console"
        actions={
            <div className="flex gap-4">
                <Button 
                    onClick={() => handleExport()}
                    className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-none hover:scale-105 transition-all flex items-center gap-2"
                >
                    <Download size={16} /> Global Export
                </Button>
                <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-3 border-none hover:scale-105 transition-all"
                >
                    <CreditCard size={18} /> Sync Transaction
                </Button>
            </div>
        }
      />

      <FinanceStats metrics={statsSummary?.finance} loading={loading} />

      <div className="space-y-10 mt-10">
        <FilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={[
                { id: 'ALL', label: 'Global Ledger' },
                { id: 'COMPLETED', label: 'Committed Shards' },
                { id: 'PENDING', label: 'Pending Processing' },
                { id: 'FAILED', label: 'Alert Failures' }
            ]}
        />

        <TransactionTable 
            data={filteredTransactions} 
            loading={loading}
            onAction={handleAction}
        />
      </div>

      <ProvisionTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleCreateTransaction}
        isSubmitting={isSubmitting}
        patients={patientsLoading ? [] : patients}
        formData={formData}
        setFormData={setFormData}
      />

      <ReceiptModal 
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        transaction={selectedTxn}
      />

      <AuditDetailModal 
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        transaction={selectedTxn}
      />
    </AdminPage>
  );
}
