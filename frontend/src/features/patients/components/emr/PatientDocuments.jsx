import React from 'react';
import { FileText, Download, Clock, Image as ImageIcon, Zap, ShieldCheck } from 'lucide-react';

const DEFAULT_DOCS = [
  { id: 1, name: 'Chest X-Ray', type: 'IMAGE/DICOM', date: 'March 28, 2026', size: '4.2 MB', icon: <ImageIcon size={18}/> },
  { id: 2, name: 'CBC Blood Report', type: 'PDF/BIO', date: 'Feb 15, 2026', size: '1.2 MB', icon: <FileText size={18}/> },
  { id: 3, name: 'MRI Brain Scan', type: 'IMAGE/DICOM', date: 'Jan 10, 2026', size: '14.8 MB', icon: <ImageIcon size={18}/> }
];

/**
 * 📁 PatientDocuments
 * Clean documentation log matching the system design language.
 */
export default function PatientDocuments({ documents }) {
  const data = documents || DEFAULT_DOCS;

  return (
    <div className="space-y-6">
      {/* Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((doc, i) => (
          <div key={i} className="flex flex-col gap-5 p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] hover:border-accent-primary/20 transition-all cursor-pointer group hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm border border-blue-500/10 shrink-0">
                  {doc.icon}
                </div>
                <div>
                   <h4 className="text-[13px] font-black text-slate-800 dark:text-white uppercase italic leading-none">{doc.name}</h4>
                   <div className="flex items-center gap-2 mt-2">
                     <span className="px-2 py-0.5 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/5 text-[8px] font-black lowercase tracking-widest">{doc.type}</span>
                     <span className="text-[9px] font-black italic text-slate-300 dark:text-white/20 tabular-nums">{doc.size}</span>
                   </div>
                </div>
              </div>
              <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-accent-primary flex items-center justify-center border border-slate-100 dark:border-white/10 transition-all shadow-sm">
                 <Download size={16} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-white/[0.04]">
              <div className="flex items-center gap-2 opacity-60">
                 <ShieldCheck size={11} className="text-blue-500" />
                 <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest italic">Diagnostic Shard Intact</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 opacity-60 font-medium">
                  <Clock size={11} strokeWidth={3} />
                  <span className="text-[9px] font-bold uppercase">{doc.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
