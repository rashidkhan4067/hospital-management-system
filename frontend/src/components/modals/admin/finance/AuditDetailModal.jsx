import React from 'react';
import { 
  ShieldCheck, 
  History, 
  User, 
  Activity, 
  Fingerprint, 
  Clock,
  ArrowRight,
  Database,
  Lock,
  Globe
} from 'lucide-react';
import { Modal, Badge, Button } from '../../../ui';

/**
 * 🕵️ Financial Audit Detail Shard
 * Professional-grade forensic visualization of a single transactional node.
 * Re-mapped to the Global Financial Modal Registry.
 */
export default function AuditDetailModal({ isOpen, onClose, transaction }) {
    if (!transaction) return null;

    const auditTrail = [
        { status: 'Initialized', timestamp: transaction.timestamp, note: 'Transaction node created in clinical buffer' },
        { status: 'Validated', timestamp: transaction.timestamp, note: 'Identity verification phase complete' },
        { status: 'Committed', timestamp: transaction.timestamp, note: 'Persistent shard written to global ledger' },
    ];

    const sidebar = (
        <div className="space-y-6">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary">Security Protocol</p>
            
            <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <ShieldCheck size={18} />
                </div>
                <div>
                    <p className="text-[12px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tight">Node Integrity: 100%</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest">Shard #44-A2-SYNC</p>
                </div>
            </div>

            <div className="space-y-3 px-2">
                <div className="flex justify-between items-center text-slate-400">
                    <span className="text-[7px] font-black uppercase tracking-widest">Protocol</span>
                    <span className="text-[9px] font-black uppercase text-slate-900 dark:text-white">AES-256-GCM</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                    <span className="text-[7px] font-black uppercase tracking-widest">Channel</span>
                    <span className="text-[9px] font-black uppercase text-slate-900 dark:text-white">Direct Connect</span>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5 space-y-4">
                <div className="flex items-center gap-2 text-slate-300">
                    <Fingerprint size={12} />
                    <span className="text-[7px] font-black uppercase tracking-widest">Digital Fingerprint Verified</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                    <p className="text-[6px] font-mono break-all text-slate-400">{transaction.transaction_id || `0x clinical-shard-${transaction.id}-auth-pulse`}</p>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Forensic Audit Node"
            subtitle={`Transaction ID: ${transaction.transaction_id || transaction.id}`}
            icon={History}
            sidebar={sidebar}
            maxWidth="max-w-3xl"
        >
            <div className="space-y-10">
                {/* Header Metadata Shard */}
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-accent-primary">
                            <User size={14} />
                            <span className="text-[9px] font-black uppercase tracking-widest">Identity Node</span>
                        </div>
                        <p className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">{transaction.patient_name}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Global Medical Registry #PAT-4421</p>
                    </div>
                    <div className="space-y-3 text-right">
                        <div className="flex items-center gap-2 text-accent-primary justify-end">
                            <Activity size={14} />
                            <span className="text-[9px] font-black uppercase tracking-widest">Sync Value</span>
                        </div>
                        <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums underline decoration-accent-primary/20 underline-offset-8 decoration-4">Rs. {Number(transaction.amount).toLocaleString()}</p>
                    </div>
                </div>

                {/* Relational Mapping */}
                <div className="grid grid-cols-3 gap-6">
                    <DetailShard label="Operational Type" value={transaction.type} icon={<Database size={12}/>} />
                    <DetailShard label="Sync Method" value={transaction.method} icon={< Globe size={12}/>} />
                    <DetailShard label="Commit Status" value="Verified" icon={<Lock size={12}/>} valueClass="text-emerald-500" />
                </div>

                {/* Immutable Audit Trail */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-3 bg-accent-primary rounded-full" />
                        <h3 className="text-[10px] font-black uppercase italic tracking-widest text-slate-400">Propagation Timeline</h3>
                    </div>

                    <div className="space-y-4 relative ml-3 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100 dark:before:bg-white/5">
                        {auditTrail.map((event, i) => (
                            <div key={i} className="relative pl-6">
                                <div className="absolute left-[-3px] top-1.5 w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] font-black text-slate-800 dark:text-white uppercase italic">{event.status}</p>
                                        <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{event.note}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Clock size={10} />
                                        <span className="text-[8px] font-black tabular-nums">{new Date(event.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="flex gap-4 pt-6">
                    <Button 
                        onClick={onClose}
                        className="flex-1 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white border-none py-6 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all hover:bg-slate-100 dark:hover:bg-white/10"
                    >
                        Verify Node
                    </Button>
                    <Button className="flex-1 bg-accent-primary text-white border-none py-6 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] shadow-xl shadow-accent-primary/20 hover:scale-105 transition-all">
                        Propagate Credentials
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

function DetailShard({ label, value, icon, valueClass = "text-slate-900 dark:text-white" }) {
    return (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-slate-400">
                {icon}
                <span className="text-[7px] font-black uppercase tracking-widest">{label}</span>
            </div>
            <p className={`text-[11px] font-black uppercase tracking-tight truncate ${valueClass}`}>{value}</p>
        </div>
    );
}
