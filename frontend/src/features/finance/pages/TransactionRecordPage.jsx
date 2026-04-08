import React, { useEffect, useState, useCallback } from 'react';
import { 
  ChevronLeft, CreditCard, Calendar, Clock, DollarSign, Download, 
  ShieldCheck, Activity, Users, ArrowRight, Printer, Copy, RefreshCcw
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader, Button, Badge } from '@/components/primitives';
import AdminPage from '@/layouts/AdminPage';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';

import financeService from '@/features/finance/api/financeService';
import { useNotifications } from '@/hooks/useNotifications';

// ── Modular Fiscal Shards ───────────────────────────────────────────────────
import TransactionDetailsCard from '../components/record/TransactionDetailsCard';
import TransactionLedgerHistory from '../components/record/TransactionLedgerHistory';
import TransactionAuditTrail from '../components/record/TransactionAuditTrail';

// ── Required Modals ────────────────────────────────────────────────────────
import RefundTransactionModal from '../components/record/modals/RefundTransactionModal';
import AuditNoteModal from '../components/record/modals/AuditNoteModal';
import EditFiscalShardModal from '../components/record/modals/EditFiscalShardModal';

/**
 * 💹 TransactionRecordPage
 * High-fidelity financial telemetry detail view with design parity.
 */
export default function TransactionRecordPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addNotification } = useNotifications();
  
  const [txn, setTxn] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧪 Modal Registry State
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      // In a real app, we'd call financeService.getTransactionById(id)
      // Simulating data for high-fidelity parity
      setTimeout(() => {
          setTxn({
              id: id,
              patient_name: 'Ellen Ripley',
              patient_id: 'PAT-8821',
              amount: 15400,
              type: 'INCOME',
              method: 'CARD',
              status: 'COMPLETED',
              timestamp: '2026-04-04 14:22:10',
              reference: 'TXN-SHARD-99021',
              description: 'Emergency Consultation + Laboratory Diagnostic Matrix Shard Entry',
              authorized_by: 'Admin Orchestrator',
              audit_logs: [
                  { time: '14:22:15', event: 'Fiscal Node Committed', status: 'Success' },
                  { time: '14:22:12', event: 'Payment Gateway Synchronized', status: 'Success' },
                  { time: '14:22:00', event: 'Inception of Fiscal Shard', status: 'Initialized' },
              ]
          });
          setLoading(false);
      }, 800);
    } catch {
      addNotification('Error', 'Failed to load transaction shard.', 'error');
      setLoading(false);
    }
  }, [id, addNotification]);

  useEffect(() => {
    if (id) load();
  }, [id, load]);

  if (loading && !txn) return <Loading />;
  if (!txn) return null;

  return (
    <AdminPage>
      <div className="flex flex-col gap-4 lg:gap-5 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20">

        {/* ── Page Header ── */}
        <PageHeader 
          title={`TXN-ID #${id}`}
          subtitle={`${txn.method} Matrix · Authorized Node`}
          status="Financial Telemetry"
          actions={
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => navigate('/admin/finances')}
                className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-white/5 text-slate-500 dark:text-white/60 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-sm font-display italic"
              >
                <ChevronLeft size={14} /> Back to Ledger
              </Button>
              <Button 
                className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/25 border-none hover:brightness-110 transition-all font-display italic"
              >
                <Printer size={14} /> Generate Receipt
              </Button>
            </div>
          }
        />

        {/* ── Unified Hero CTA ── */}
        <UnifiedHeroCTA 
          compact
          title={<>Fiscal Shard <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Synchronized.</span></>}
          subtitle={`This transaction of Rs. ${txn.amount.toLocaleString()} was committed to the clinical ledger matrix on ${txn.timestamp}. Status represents absolute parity.`}
          pillPrefix="Transaction Detail"
          pillIcon={CreditCard}
          actions={[
            { title: 'Recalibrate', subtitle: 'Edit Fiscal Shard', icon: CreditCard, onClick: () => setIsEditOpen(true) },
            { title: 'Audit Note',  subtitle: 'Commit Observation',  icon: Copy, onClick: () => setIsNoteOpen(true) },
            { title: 'Purge Shard',  subtitle: 'Initiate Reversal',   icon: RefreshCcw, onClick: () => setIsRefundOpen(true), variant: 'danger' },
          ]}
        />

        {/* ── KPI Grid ── */}
        <UnifiedKpiGrid
           items={[
              { label: 'Amount Matric', value: `Rs. ${txn.amount.toLocaleString()}`, icon: DollarSign, color: 'text-accent-primary' },
              { label: 'Channel Hub',   value: txn.method, icon: Activity, color: 'text-sky-500' },
              { label: 'Audit Result',  value: txn.status, icon: ShieldCheck, color: 'text-emerald-500' },
              { label: 'Auth Level',    value: 'Orchestrator', icon: Users, color: 'text-violet-500' }
           ]}
           className="mb-2"
        />

        {/* ── Main 4:8 Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* LEFT - Fiscal Summary (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
             <TransactionDetailsCard txn={txn} />
             <div className="bg-white dark:bg-white/[0.03] rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/5 space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                      <ShieldCheck size={18} />
                   </div>
                   <h4 className="text-[14px] font-black text-slate-800 dark:text-white uppercase tracking-tight italic font-display">Auth Signature</h4>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex flex-col gap-2">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Authorized By</p>
                   <p className="text-[12px] font-bold text-slate-700 dark:text-white uppercase">{txn.authorized_by}</p>
                </div>
                <Button className="w-full bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-white/40 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border-none">
                   <Copy size={12} /> Copy Transaction Reference
                </Button>
             </div>
          </div>

          {/* RIGHT - Detailed Ledger (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
             <TransactionLedgerHistory txn={txn} />
             <TransactionAuditTrail logs={txn.audit_logs} />
          </div>

        </div>
      </div>

      {/* ── Modal Orchestration Hub ── */}
      <RefundTransactionModal 
        isOpen={isRefundOpen} 
        onClose={() => setIsRefundOpen(false)} 
        txn={txn} 
        onRefresh={load} 
      />
      
      <AuditNoteModal 
        isOpen={isNoteOpen} 
        onClose={() => setIsNoteOpen(false)} 
        txn={txn} 
        onRefresh={load} 
      />

      <EditFiscalShardModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        txn={txn} 
        onRefresh={load} 
      />
    </AdminPage>
  );
}

function Loading() {
  return (
    <AdminPage>
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 rounded-[1.5rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-accent-primary animate-spin shadow-inner">
             <RefreshCcw size={24} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/30 italic font-display">
            Synthesizing Fiscal Shard...
          </p>
        </div>
      </div>
    </AdminPage>
  );
}
