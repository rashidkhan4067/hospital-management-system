import React, { useState } from 'react';
import { 
    AlertCircle, 
    Stethoscope, 
    Zap, 
    Bell, 
    X,
    Activity,
    ShieldAlert
} from 'lucide-react';
import { Button, Modal } from '@/shared/components/ui';

/**
 * ⚡ EMERGENCY DISPATCH MODAL
 * Immediate clinical emergency signaling for the OPD/Queue matrix.
 */
export default function EmergencyCallModal({ isOpen, onClose, onDispatch }) {
    const [isBroadcasting, setIsBroadcasting] = useState(false);

    const handleDispatch = async () => {
        setIsBroadcasting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            onDispatch();
            onClose();
        } catch (err) {
            console.error('Emergency dispatch failure:', err);
        } finally {
            setIsBroadcasting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Emergency Protocol"
            subtitle="Immediate Clinical Node Dispatch"
            icon={ShieldAlert}
            maxWidth="max-w-md"
            titleClassName="text-rose-600 dark:text-rose-500"
        >
            <div className="flex flex-col gap-6 items-center text-center">
                <div className="p-8 rounded-full bg-rose-500/10 border-4 border-rose-500/20 relative group overflow-hidden cursor-pointer" onClick={handleDispatch}>
                    <div className="absolute inset-0 bg-rose-500/20 scale-0 group-hover:scale-100 transition-transform duration-[1s] rounded-full" />
                    <Zap size={64} className="text-rose-500 group-hover:scale-110 transition-transform animate-pulse" fill="currentColor" />
                    <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/10 blur-3xl opacity-50" />
                </div>

                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">Code Red Node</h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                        Dispatching a clinical emergency signal will notify all duty doctors and internal security nodes immediately.
                    </p>
                </div>

                <div className="w-full flex flex-col gap-3">
                    <Button 
                        onClick={handleDispatch}
                        disabled={isBroadcasting}
                        className="w-full py-5 rounded-[2.5rem] bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest border-none shadow-xl shadow-rose-500/25 hover:brightness-110 active:scale-95 transition-all italic flex items-center justify-center gap-3"
                    >
                        {isBroadcasting ? 'Broadcasting...' : <><Bell size={18} fill="currentColor" /> Initiate Emergency</>}
                    </Button>
                    <Button 
                        onClick={onClose}
                        className="w-full py-4 rounded-[2.5rem] bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] border-none hover:bg-slate-200 dark:hover:bg-white/10 transition-all italic"
                    >
                        Cancel Node
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
