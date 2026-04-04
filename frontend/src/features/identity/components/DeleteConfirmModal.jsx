import React from 'react';
import { 
    AlertTriangle, 
    Trash2, 
    ShieldAlert, 
    Zap,
    Fingerprint,
    Shield, Briefcase, Users as UsersIcon, Stethoscope
} from 'lucide-react';
import { Modal, Button } from '@/shared/components/ui';

/**
 * ☢️ Identity Termination Protocol Shard
 * High-fidelity confirmation portal for permanent identity deletion with design parity.
 */
export default function DeleteConfirmModal({ isOpen, onClose, onAction, isSubmitting, item, title = "Terminate Identity" }) {
    if (!item) return null;

    const sidebar = (
        <React.Fragment>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-400">Security Override</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-rose-500/10 space-y-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <ShieldAlert size={18} />
                </div>
                <div>
                    <p className="text-[14px] font-black text-slate-900 dark:text-white truncate">Security Shard</p>
                    <p className="text-[8px] font-bold text-rose-400 uppercase mt-1 tracking-widest leading-none italic italic">Destructive Operation</p>
                </div>
            </div>

            <div className="space-y-4 px-2 pt-4">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Protocol Node</span>
                    <span className="text-[10px] font-black text-rose-500 uppercase">Acknowledge Breach</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">System Status</span>
                    <span className="text-[10px] font-black text-rose-500 uppercase italic animate-pulse">Critical Lock</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 opacity-20 grayscale mt-auto pt-8">
                <Stethoscope size={16} />
                <Briefcase size={16} />
                <UsersIcon size={16} />
            </div>
        </React.Fragment>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            subtitle="Protocol Level: Critical Security Override"
            icon={ShieldAlert}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <div className="flex flex-col items-center text-center space-y-8 py-6">
                <div className="w-24 h-24 rounded-[32px] bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 relative">
                    <AlertTriangle size={40} strokeWidth={2.5} className="animate-pulse" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-black shadow-lg">
                        9+
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Confirm Kernel Wipe?</h3>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed px-4">
                        You are about to permanently terminate identity <span className="text-rose-500 font-black italic">"{item.full_name}"</span>. This action will purge all associated relational shards from the clinical matrix.
                    </p>
                </div>

                <div className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 p-5 rounded-2xl flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-500">
                            <Fingerprint size={18} />
                        </div>
                        <div className="text-left">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Shard Index</p>
                            <p className="text-[12px] font-mono font-bold text-slate-700 dark:text-white">NODE-IDX-00{item.id}</p>
                        </div>
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-500 text-[8px] font-black uppercase tracking-widest">
                        Destructive
                    </div>
                </div>

                <div className="w-full flex flex-col gap-4 pt-4">
                    <Button
                        onClick={() => onAction(item)}
                        disabled={isSubmitting}
                        className="w-full bg-rose-500 text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-rose-500/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 border-none italic"
                    >
                        {isSubmitting ? <><Zap size={16} className="animate-spin" /> Purging Shard...</> : <><Trash2 size={16} /> Terminate Record</>}
                    </Button>
                    <Button
                        onClick={onClose}
                        className="w-full bg-transparent text-slate-400 p-4 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-white/5 transition-all border-none italic"
                    >
                        Abort Protocol
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
