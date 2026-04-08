import React, { useState, useMemo } from 'react';
import { 
  CreditCard, Download, Plus, TrendingUp, Zap, Banknote, History
} from 'lucide-react';
import { Button, PageHeader, FilterBar } from '@/components/primitives';

// ─── Shared Layout Components ───
import AdminPage from '@/layouts/AdminPage';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';

// ─── Finance Modular Shards ───
import BillingSidebar from '@/features/finance/components/BillingSidebar';
import RevenueCycleShard from '@/features/finance/components/RevenueCycleShard';
import InsuranceNodeShard from '@/features/finance/components/InsuranceNodeShard';
import FiscalVelocityShard from '@/features/finance/components/FiscalVelocityShard';
import InvoiceTable from '@/features/finance/components/InvoiceTable';

// ─── High-Fidelity Modals ───
import CreateInvoiceModal from '@/features/finance/components/CreateInvoiceModal';
import SettlePaymentModal from '@/features/finance/components/SettlePaymentModal';
import InsuranceClaimModal from '@/features/finance/components/InsuranceClaimModal';

// ─── Hooks & Services ───
import { useAdminFinance } from '@/features/finance/hooks/useFinance';
import { useAdminPatients } from '@/features/patients/hooks/usePatients';
import { useUI } from '@/core/ui/UIContext';
import LaboratoryService from '@/features/analytics/api/labService'; // Placeholder for finance service

/**
 * 💹 Billing & Invoice Command Hub (Orchestrator)
 * Refactored for modular consistency and high-fidelity modal orchestration.
 * Global fiscal registry managing clinical revenue propagation.
 */
export default function BillingPage() {
  const { addNotification } = useUI();
  
  // 🧭 UI Local State (Modals)
  const [activeModal, setActiveModal] = useState(null); // 'CREATE', 'SETTLE', 'CLAIM'
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({});

  // 🛰 Core Data Matrix
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const { transactions, loading, refresh } = useAdminFinance();
  const { patients } = useAdminPatients();

  // 🔭 Business Logic: Memoized Ledger Matrix
  const filteredInvoices = useMemo(() => {
    return (transactions || []).filter(t => 
      (t.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       t.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeTab === 'ALL' || t.status.toUpperCase() === activeTab)
    );
  }, [transactions, searchTerm, activeTab]);

  // 🧭 KPI Matrix
  const kpis = [
    { title: "Network Revenue", value: `Rs. 4.8M`, icon: TrendingUp, color: "text-accent-primary", trend: "+14.2% Velocity" },
    { title: "Cleared Invoices", value: transactions.filter(t => t.status === 'completed').length, icon: Zap, color: "text-emerald-500", trend: "Protocol Ready" },
    { title: "Pending Collection", value: `Rs. 1.2M`, icon: CreditCard, color: "text-amber-500", trend: "In Sync Buffer" },
    { title: "Yield Efficiency", value: "94.8%", icon: Zap, color: "text-rose-500", trend: "Target Matrix" },
  ];

  // ⚡ EVENT HANDLERS
  const handleOpenCreate = () => {
      setFormData({ protocol: 'Standard' });
      setActiveModal('CREATE');
  };

  const handleAction = (type, invoice) => {
      setSelectedInvoice(invoice);
      setFormData({ method: 'CARD', coverage: 80, priority: 'NORMAL' });
      if (type === 'view') navigate(`/admin/billing/${invoice.id}`);
      else if (type === 'claim') setActiveModal('CLAIM');
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
          // Simulation of clinical fiscal sync
          await new Promise(r => setTimeout(r, 1200));
          addNotification('Fiscal Node Committed', 'Financial shard successfully propagated to clinical ledger.', 'success');
          setActiveModal(null);
          refresh?.();
      } catch (err) {
          addNotification('Sync Failure', 'Could not commit fiscal node to global registry.', 'error');
      } finally {
          setIsSubmitting(false);
      }
  };

  return (
    <AdminPage>
      <div className="flex flex-col gap-5 lg:gap-6 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* 🛸 COMMAND CLUSTER: Row 1 — Header */}
        <PageHeader 
          title="Billing & Invoice" 
          subtitle="Clinical Revenue Cycle & Global Audit Shard Registry"
          status="Ledger Matrix Synchronized"
          actions={<BillingHeaderActions onAdd={handleOpenCreate} />}
        />

        {/* 🌠 PERSISTENT HUB: Row 2 — Hero CTA */}
        <UnifiedHeroCTA 
           compact
           title={<>Fiscal <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Oversight Matrix.</span></>}
           subtitle="Manage clinical invoices, orchestrate insurance claims, and track global revenue velocity through the Al Shifaa matrix."
           pillPrefix="Financial Command Hub"
           pillIcon={Banknote}
           actions={[
              { title: 'New Sync', subtitle: 'Post Invoice Shard', icon: Plus, onClick: handleOpenCreate, variant: 'primary' },
              { title: 'Full Ledger', subtitle: 'Global Export', icon: Download, onClick: () => {} },
           ]}
        />

        {/* 🛰 KPI Hub */}
        <UnifiedKpiGrid stats={kpis} loading={loading} />

        {/* 🏗 CLUSTER ASSEMBLY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
           <div className="lg:col-span-8 flex flex-col gap-8">
              <RevenueCycleShard />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <InsuranceNodeShard onClick={() => setActiveModal('CLAIM')} />
                 <FiscalVelocityShard efficiency="98.2%" amount="82.4K" />
              </div>

              <div className="flex flex-col gap-6 w-full mt-4">
                 <FilterBar 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabs={[
                        { id: 'ALL', label: 'Global Registry' },
                        { id: 'COMPLETED', label: 'Cleared Node' },
                        { id: 'PENDING', label: 'Invoice Loop' },
                        { id: 'FAILED', label: 'Safety Abort' }
                    ]}
                    placeholder="Search invoice nodes, patient refs, clinical leads..."
                 />
                 <InvoiceTable 
                    data={filteredInvoices} 
                    loading={loading}
                    onAction={handleAction} 
                 />
              </div>
           </div>

           <aside className="lg:col-span-4 flex flex-col gap-6 sticky top-8">
              <BillingSidebar 
                 stats={{ patient_pay: 72, insurance: 18, subsidy: 6 }} 
                 onCreateInvoice={handleOpenCreate} 
              />
           </aside>
        </div>
      </div>

      {/* 🔮 MODULAR DIALOG ORCHESTRATOR */}
      <CreateInvoiceModal 
        isOpen={activeModal === 'CREATE'}
        onClose={() => setActiveModal(null)}
        onAction={handleSubmit}
        isSubmitting={isSubmitting}
        patients={patients}
        formData={formData}
        setFormData={setFormData}
      />

      <SettlePaymentModal 
        isOpen={activeModal === 'SETTLE'}
        onClose={() => setActiveModal(null)}
        onAction={handleSubmit}
        isSubmitting={isSubmitting}
        invoice={selectedInvoice || {}}
        formData={formData}
        setFormData={setFormData}
      />

      <InsuranceClaimModal 
        isOpen={activeModal === 'CLAIM'}
        onClose={() => setActiveModal(null)}
        onAction={handleSubmit}
        isSubmitting={isSubmitting}
        invoice={selectedInvoice || {}}
        formData={formData}
        setFormData={setFormData}
      />
    </AdminPage>
  );
}

function BillingHeaderActions({ onAdd }) {
    return (
        <div className="flex gap-4">
            <Button className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border-none hover:shadow-lg transition-all italic font-display">
                <Download size={16} /> Global Export
            </Button>
            <Button 
                onClick={onAdd}
                className="bg-accent-primary text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-2 border-none hover:brightness-110 transition-all font-display italic"
            >
                <Plus size={16} strokeWidth={3} /> Post Invoice
            </Button>
        </div>
    );
}
