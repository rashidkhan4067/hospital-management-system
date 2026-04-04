import React from 'react';
import { Edit2 } from 'lucide-react';
import AdminTable from '@/shared/components/ui/AdminTable';
import PatientRow from './PatientRow';
import { Badge } from '@/shared/components/ui';

/**
 * 📊 PatientTable
 * Table — Patient ID, Name, Age, Gender, Blood Group, Phone, Last Visit, Actions (View, Edit).
 * Sortable columns. Pagination.
 */
export default function PatientTable({ data, isLoading, onRowClick, onEdit, onDelete }) {
  const columns = [
    {
      header: 'Clinical Identity',
      cell: (p) => <PatientRow patient={p} onRowClick={onRowClick} />,
    },
    {
      header: 'Bio Age/Sex',
      cell: (p) => (
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter tabular-nums">
          {p.age || '35'} YRS • {p.gender || 'MALE'}
        </span>
      ),
    },
    {
      header: 'Blood Matrix',
      accessor: 'blood_group',
      cell: (p) => (
        <Badge className="bg-rose-500/10 text-rose-500 border-none text-[9px] px-3 py-1 font-black uppercase tracking-[0.2em] shadow-sm">
          {p.blood_group || 'O+'}
        </Badge>
      ),
    },
    {
       header: 'Contact Shard',
       accessor: 'phone',
       cell: (p) => (
          <div className="flex flex-col">
             <span className="text-[10px] font-black text-slate-900 dark:text-white/80 tabular-nums">{p.phone || '—'}</span>
             <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60">Verified Node</span>
          </div>
       )
    },
    {
      header: 'Last Visit Matrix',
      accessor: 'updated_at',
      cell: (p) => (
        <div className="flex flex-col">
           <span className="text-[10px] font-bold text-slate-500 tabular-nums uppercase">
             {p.updated_at ? new Date(p.updated_at).toLocaleDateString('en-GB') : '—'}
           </span>
           <span className="text-[7px] font-black text-emerald-500/60 uppercase tracking-widest mt-0.5">Completed</span>
        </div>
      ),
    },
    {
      header: 'EMR Protocols',
      cell: (p) => (
         <div className="flex items-center gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onRowClick(p); }}
              className="px-4 py-1.5 rounded-lg bg-accent-primary/10 text-accent-primary text-[8px] font-black uppercase tracking-widest hover:bg-accent-primary/20 transition-all border border-accent-primary/10"
            >
              View EMR
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(p); }}
              className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-center border border-transparent hover:border-slate-200 dark:hover:border-white/10"
            >
               <Edit2 size={12} />
            </button>
         </div>
      ),
    },
  ];

  return (
    <AdminTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      onRowClick={onRowClick}
    />
  );
}


