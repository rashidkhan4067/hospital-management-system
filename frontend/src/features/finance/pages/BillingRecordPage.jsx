import React, { useEffect, useState, useCallback } from 'react';
import { 
  ChevronLeft, CreditCard, Calendar, Clock, DollarSign, Download, 
  ShieldCheck, Activity, Users, ArrowRight, Printer, Copy, RefreshCcw,
  FileText, Zap, TrendingUp, BarChart3, Banknote, Receipt, Plus
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader, Button, Badge, Card } from '@/shared/components/ui';
import AdminPage from '@/shared/components/layout/AdminPage';
import UnifiedHeroCTA from '@/shared/components/common/UnifiedHeroCTA';
import UnifiedKpiGrid from '@/shared/components/common/UnifiedKpiGrid';

// ── Modular Billing Shards ──────────────────────────────────────────────────
import BillingItemsTable from '../components/record/BillingItemsTable';
import BillingSummaryShard from '../components/record/BillingSummaryShard';
import TransactionAuditTrail from '../components/record/TransactionAuditTrail';

// ── Hooks & Services ────────────────────────────────────────────────────────
import financeService from '@/features/finance/api/financeService';
import { useNotifications } from '@/shared/hooks/useNotifications';

/**
 * 💹 Billing Record Hub
 * High-fidelity financial telemetry for clinical invoices.
 * Implements the 4:8 split command center design system check mapping.
 */
export default function BillingRecordPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addNotifications } = useNotifications();
  
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧪 Mock Load Shard for High-Fidelity Design
  const loadInvoice = useCallback(async () => {
    try {
      setLoading(true);
      // Simulating fiscal propagation
      setTimeout(() => {
          setInvoice({
              id: id,
              patient_name: 'Ellen Ripley',
              patient_id: 'PAT-8821',
              amount: 28500,
              paid: 15000,
              balance: 13500,
              date: '2026-04-05',
              due_date: '2026-05-05',
              status: 'PENDING',
              method: 'Digital Shard',
              reference: 'INV-SHARD-4421',
              description: 'Global clinical diagnostic matrix propagation services and medication entry.',
              logs: [
                  { time: '10:00', event: 'Invoice Node Dispatched', status: 'Success' },
                  { time: '09:45', event: 'Fiscal Shards Aggregated', status: 'Success' },
              ]
          });
          setLoading(false);
      }, 700);
    } catch {
      // addNotifications('Error', 'Failed to synchronize fiscal node.', 'error');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) loadInvoice();
  }, [id, loadInvoice]);

  if (loading && !invoice) return <Loading />;
  if (!invoice) return null;

  const kpis = [
      { title: 'Gross Matrix', value: `Rs. ${Number(invoice.amount).toLocaleString()}`, icon: Banknote, color: 'text-slate-900 dark:text-white' },
      { title: 'Collected Shard', value: `Rs. ${Number(invoice.paid).toLocaleString()}`, icon: Zap, color: 'text-emerald-500' },
      { title: 'Due Node', value: `Rs. ${Number(invoice.balance).toLocaleString()}`, icon: Clock, color: 'text-amber-500' },
      { title: 'Target Velocity', value: '100% Sync', icon: TrendingUp, color: 'text-accent-primary' }
  ];

  return (
    <AdminPage>
      <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-1000">

        {/* 🛸 COMMAND CLUSTER: Row 1 — Header */}
        <PageHeader 
          title={`INV-ID #${id}`}
          subtitle={`Clinical Revenue Shard · Patient Ref: ${invoice.patient_id}`}
          status="Fiscal Registry"
          actions={<BillingHeaderActions onBack={() => navigate('/admin/billing')} />}
        />

        {/* 🌠 PERSISTENT HUB: Row 2 — Hero CTA */}
        <UnifiedHeroCTA 
          compact
          title={<>Invoice Shard <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Finalized.</span></>}
          pillPrefix="Fiscal Orchestration"
          pillIcon={Receipt}
          subtitle={`This fiscal node represents Rs. ${invoice.amount.toLocaleString()} in committed services. Clinical audit verified for immediate propagation.`}
          actions={[
             { title: 'Print Node',   subtitle: 'Thermal Receipt', icon: Printer, onClick: () => {} },
             { title: 'Settle Shard', subtitle: 'Post Payment',   icon: DollarSign, onClick: () => {}, variant: 'primary' },
             { title: 'Claim Node',    subtitle: 'Insurance Sync', icon: ShieldCheck, onClick: () => {} },
          ]}
        />

        {/* 🛰 KPI Hub */}
        <UnifiedKpiGrid stats={kpis} loading={loading} />

        {/* 🏗 CLUSTER ASSEMBLY: 4:8 Modular Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
           
           {/* LEFT - Fiscal Summary (4 cols) */}
           <div className="lg:col-span-4 flex flex-col gap-6">
              <BillingSummaryShard invoice={invoice} />
              
              <Card className="p-8 rounded-[2.5rem] bg-slate-900 text-white flex flex-col gap-6 relative overflow-hidden group shadow-2als border-none">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-[60px] rounded-full pointer-events-none" />
                 <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-sm transition-transform group-hover:rotate-12 italic">
                       <Zap size={18} />
                    </div>
                    <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display">Fiscal Intelligence</h4>
                 </div>
                 <p className="text-[10px] font-black italic text-slate-400 leading-relaxed uppercase tracking-wide opacity-80 relative z-10">
                    Neural audit successful. Revenue velocity optimized for clinical clearance. No leakage detected.
                 </p>
                 <Button className="w-full bg-accent-primary text-white py-4 rounded-xl text-[9px] font-black uppercase tracking-widest border-none transition-all hover:scale-[1.02] active:scale-95 italic shadow-lg shadow-accent-primary/20 font-display">
                    Initiate Global Sync
                 </Button>
              </Card>
           </div>

           {/* RIGHT - Detailed Ledger (8 cols) */}
           <div className="lg:col-span-8 flex flex-col gap-6">
              <BillingItemsTable />
              <TransactionAuditTrail logs={invoice.logs} />
           </div>

        </div>
      </div>
    </AdminPage>
  );
}

/** 🛸 UI SUB-COMPONENT: Header Actions */
function BillingHeaderActions({ onBack }) {
    return (
        <div className="flex items-center gap-2">
            <Button 
                onClick={onBack}
                className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-white/5 text-slate-500 dark:text-white/60 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-sm font-display italic"
            >
                <ChevronLeft size={14} /> Fiscal Matrix
            </Button>
            <Button 
                className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/25 border-none hover:brightness-110 transition-all font-display italic"
            >
                <Plus size={14} /> Generate Adjunct
            </Button>
        </div>
    );
}

function Loading() {
    return (
        <AdminPage>
            <div className="flex items-center justify-center min-h-[70vh]">
                <div className="flex flex-col items-center gap-5">
                    <div className="w-14 h-14 rounded-[1.5rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-accent-primary animate-spin shadow-inner">
                        <Banknote size={24} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/30 italic font-display">
                        Propagating Fiscal Node...
                    </p>
                </div>
            </div>
        </AdminPage>
    );
}
