import React from 'react';
import { Button } from '@/shared/components/ui';
import { UserCheck, Stethoscope } from 'lucide-react';

/**
 * 🏥 ADMISSION LISTING SHARD
 * High-fidelity patient record row for the active clinical matrix.
 */
export default function AdmittedPatientShard({ admissions = [] }) {
    if (!admissions.length) return (
        <div className="flex flex-col items-center justify-center py-10 opacity-40">
           <UserCheck size={40} className="mb-4" />
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">No active admissions node detected.</p>
        </div>
    );

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-6">
                <h3 className="text-[12px] font-black text-slate-900 dark:text-white uppercase italic tracking-widest leading-none flex items-center gap-2">
                   <UserCheck size={14} className="text-accent-primary" /> Active Admitted Nodes
                </h3>
                <p className="text-[10px] font-black text-accent-primary uppercase tracking-tighter hover:underline cursor-pointer">Global Registry →</p>
            </div>

            <div className="flex flex-col gap-3">
                {admissions.map((patient, idx) => (
                    <div 
                        key={idx}
                        className="bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-3xl p-5 flex items-center justify-between group transition-all hover:bg-white dark:hover:bg-slate-900 shadow-sm hover:shadow-xl hover:shadow-accent-primary/5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center text-indigo-500 font-black italic shadow-inner">
                                {patient.patient_name?.charAt(0) || 'AK'}
                            </div>
                            <div>
                                <h4 className="text-[14px] font-black text-slate-900 dark:text-white uppercase italic leading-none">{patient.patient_name}</h4>
                                <div className="flex items-center gap-2 mt-2">
                                   <p className="text-[8.5px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
                                      {patient.ward_name} · Bed {patient.bed_number}
                                   </p>
                                   <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/10" />
                                   <p className="text-[8.5px] font-black text-indigo-500 uppercase tracking-widest leading-none italic">
                                      <Stethoscope size={10} className="inline mr-1" /> General MD
                                   </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                             <div className="text-right">
                                <p className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase italic leading-none">Day {patient.days}</p>
                                <p className="text-[7.5px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 opacity-60">Admission Duration</p>
                             </div>
                             <Button className="px-6 py-2.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[9px] font-black uppercase tracking-[0.2em] border-none shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95 italic">
                                Discharge Node
                             </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
