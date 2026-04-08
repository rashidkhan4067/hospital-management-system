import React, { useState, useMemo, useCallback } from 'react';
import { CreditCard, Download } from 'lucide-react';
import { Button, PageHeader } from '@/components/primitives';
import AdminPage from '@/layouts/AdminPage';
import FilterBar from '@/components/primitives/FilterBar';

// 🏗️ MODULAR FINANCE SHARDS
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';
import TransactionTable from '@/features/finance/components/TransactionTable';
import ProvisionTransactionModal from '@/features/finance/components/ProvisionTransactionModal';
import ReceiptModal from '@/features/finance/components/ReceiptModal';
import AuditDetailModal from '@/features/finance/components/AuditDetailModal';

// 🎣 CLINICAL DATA HOOKS
import { useAdminFinance } from '@/features/finance/hooks/useFinance';
import { useAdminStats } from '@/features/dashboard/hooks/useStats';
import { useAdminPatients } from '@/features/patients/hooks/usePatients';
import { useUI } from '@/core/ui/UIContext';
import { useFinanceForm } from '../hooks/useFinanceForm';
import { exportToCSV } from '@/utils/exportUtils';

import { useNavigate } from 'react-router-dom';

/**
 * 💹 Financial Oversight & Billing Hub (Orchestrator)
 * High-fidelity hub for managing clinical financial telemetry.
 */
export default function AdminFinances() {
  const navigate = useNavigate();
  const { addNotification } = useUI();
  
  // 🧭 UI Local State
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);

  // 🎣 Core Data Hooks
  const { transactions, loading: financeLoading, refresh } = useAdminFinance();
  const { stats: statsSummary, loading: statsLoading } = useAdminStats();
  const { patients, loading: patientsLoading } = useAdminPatients();

  const loading = financeLoading || statsLoading;

  // 🛡️ Logic Decoupling: SRP
  const { 
    formData, 
    setFormData,
    updateField, 
    handleSubmit, 
    isSubmitting 
  } = useFinanceForm(() => setIsModalOpen(false));

  /**
   * ⚡ Telemetry Matrix Operations
   */
  const handleExport = useCallback((txn = null) => {
    const data = txn ? [txn] : transactions;
    const success = exportToCSV(data, 'Finance_Ledger', ['transaction_id', 'patient_name', 'amount', 'method', 'status', 'timestamp']);
    
    if (success) {
      addNotification('Telemetry Shard Exported', 'CSV matrix generated successfully.', 'success');
    }
  }, [transactions, addNotification]);

  const handleAction = useCallback((type, txn) => {
    setSelectedTxn(txn);
    switch(type) {
        case 'view':
        case 'print':
            setIsReceiptOpen(true);
            break;
        case 'export':
            handleExport(txn);
            break;
        case 'audit':
            setIsAuditOpen(true);
            break;
        default: break;
    }
  }, [handleExport]);

  // ⚡ Performance: Memoized Ledger Matrix
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
        const id = (t.transaction_id || t.id.toString()).toUpperCase();
        const matchesSearch = t.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             id.includes(searchTerm.toUpperCase());
        
        const matchesTab = activeTab === 'ALL' || t.status.toUpperCase() === activeTab;
        
        return matchesSearch && matchesTab;
    });
  }, [transactions, searchTerm, activeTab]);

  return (
    <AdminPage>
      <PageHeader 
        title="Revenue Matrix" 
        subtitle="Global Financial Shard Propagation Console"
        status="Live Audit"
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

      {/* ── Unified Hero CTA ── */}
      <UnifiedHeroCTA 
        title={<>Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Oversight.</span></>}
        subtitle={`Tracking Rs. ${(statsSummary?.finance?.revenue || 0).toLocaleString()} in clinical revenue with ${transactions.length} committed transaction shards.`}
        pillPrefix="Clinical Financial Ledger"
        pillIcon={CreditCard}
        actions={[
          { title: 'New Sync', subtitle: 'Post Transaction', icon: CreditCard, onClick: () => setIsModalOpen(true) },
          { title: 'Full Export', subtitle: 'Generate CSV Shard', icon: Download, onClick: () => handleExport() }
        ]}
      />

      <UnifiedKpiGrid 
        loading={loading}
        stats={[
          { title: 'Gross Revenue', value: `Rs. ${(statsSummary?.finance?.revenue || 0).toLocaleString()}`, icon: CreditCard, trend: '+12.4% Up' },
          { title: 'Transactions', value: transactions.length, icon: Download, trend: 'Synchronized' },
          { title: 'Pending Clearance', value: transactions.filter(t => t.status === 'PENDING').length, icon: CreditCard, trend: 'In Cache' },
          { title: 'System Health', value: '100% Sync', icon: CreditCard, trend: 'Optimal' }
        ]}
      />

      <div className="space-y-10 mt-10">
        <FilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={[
                { id: 'ALL', label: 'Global Ledger' },
                { id: 'COMPLETED', label: 'Committed' },
                { id: 'PENDING', label: 'Pending Processing' },
                { id: 'FAILED', label: 'Alert Failures' }
            ]}
        />

        <TransactionTable 
            data={filteredTransactions} 
            loading={loading}
            onAction={handleAction}
            onRowClick={(row) => navigate(`/admin/finances/${row.id}`)}
        />
      </div>

      <ProvisionTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleSubmit}
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
