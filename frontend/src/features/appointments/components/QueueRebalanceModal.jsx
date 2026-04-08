import React, { useState } from 'react';
import { 
    Clock, 
    SkipForward, 
    AlertTriangle, 
    UserX, 
    RefreshCcw, 
    ArrowDownToLine,
    X,
    MessageSquare
} from 'lucide-react';
import { Button, Modal, Card } from '@/components/primitives';

/**
 * ⚡ QUEUE REBALANCE MODAL
 * Provides high-fidelity logic for skipping, re-indexing, or canceling clinical appointments.
 */
export default function QueueRebalanceModal({ isOpen, onClose, appointment, onAction }) {
    const [reason, setReason] = useState('');
    const [selectedAction, setSelectedAction] = useState('REQUEUE'); // REQUEUE, NOSHOW, END
    const [isProcessing, setIsProcessing] = useState(false);

    if (!appointment) return null;

    const actions = [
        { id: 'REQUEUE', title: 'Re-Queue Node', icon: RefreshCcw, color: 'text-accent-primary', desc: 'Moves patient back to the "Waiting" pool for next doctor.' },
        { id: 'END', title: 'Move to End', icon: ArrowDownToLine, color: 'text-amber-500', desc: 'Decrements priority. Patient will be seen after all current nodes.' },
        { id: 'NOSHOW', title: 'Mark No-Show', icon: UserX, color: 'text-rose-500', desc: 'Invalidates session token. Record remains as skipped visit.' },
    ];

    const handleSubmit = async () => {
        setIsProcessing(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 600));
            onAction(selectedAction, reason);
            onClose();
        } catch (err) {
            console.error('Queue rebalance failure:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    const sidebar = (
        <div className="flex flex-col gap-6">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary">Node Snapshot</p>
            
            <div className="p-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 space-y-4">
               <div>
                  <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase italic leading-none">{appointment.patient?.full_name}</p>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 opacity-60 italic">Current Status: {appointment.status?.toUpperCase()}</p>
               </div>
               <div className="pt-3 border-t border-slate-50 dark:border-white/5">
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                     <span className="text-[8px] font-black uppercase text-amber-500 tracking-widest italic leading-none">Awaiting Re-indexing</span>
                  </div>
               </div>
            </div>

            <div className="flex-1 flex flex-col justify-end">
               <div className="p-4 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <p className="text-[9px] font-black uppercase text-slate-400 italic leading-relaxed">
                     Skipping this node will automatically re-calculate the session latency index for upcoming patients.
                  </p>
               </div>
            </div>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Queue Re-indexing"
            subtitle="Coordinate Patient Flow Logic"
            icon={SkipForward}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-3">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Select Redirect Protocol</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {actions.map((act) => (
                            <div 
                                key={act.id}
                                onClick={() => setSelectedAction(act.id)}
                                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-3 group relative overflow-hidden ${
                                    selectedAction === act.id 
                                    ? 'bg-accent-primary/10 border-accent-primary shadow-lg shadow-accent-primary/10' 
                                    : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5 hover:border-slate-200'
                                }`}
                            >
                                <div className={`w-8 h-8 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center ${act.color} shadow-sm group-hover:scale-110 transition-transform italic`}>
                                    <act.icon size={16} />
                                </div>
                                <h4 className={`text-[10px] font-black uppercase italic tracking-tighter ${selectedAction === act.id ? 'text-accent-primary' : 'text-slate-700 dark:text-slate-300'}`}>
                                    {act.title}
                                </h4>
                                <p className="text-[7.5px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                                    {act.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Protocol Reasoning</label>
                    <div className="relative group">
                        <textarea
                            rows="2"
                            placeholder="Brief reason for re-indexing (e.g., Patient skipped turn, No response after 3 calls)..."
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white resize-none"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                        <MessageSquare size={16} className="absolute right-4 bottom-4 text-slate-300 group-focus-within:text-accent-primary opacity-40" />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button 
                        type="button" 
                        onClick={onClose}
                        className="px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[9px] font-black uppercase tracking-widest border-none hover:bg-slate-200 dark:hover:bg-white/10 transition-all italic"
                    >
                        <X size={14} className="mr-2" /> Cancel Action
                    </Button>
                    <Button 
                        onClick={handleSubmit}
                        disabled={isProcessing}
                        className="px-8 py-3.5 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white text-[9px] font-black uppercase tracking-widest border-none shadow-xl shadow-slate-900/25 hover:brightness-110 active:scale-95 transition-all italic"
                    >
                        {isProcessing ? 'Re-indexing...' : <><RefreshCcw size={14} className="mr-2" /> Sync Queue</>}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
