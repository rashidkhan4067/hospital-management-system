import React, { useMemo } from 'react';
import { Eye, ShieldAlert, Edit2, Trash2, Fingerprint } from 'lucide-react';
import { Badge, TableActions } from '@/shared/components/ui';

export function useUsersColumns({ openDetails, openEdit, handleToggleStatus, openDelete }) {
  return useMemo(() => [
    { 
        header: 'User Name', 
        cell: (u) => (
            <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary text-[10px] font-black group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                    {(u.full_name || '??').split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase leading-none group-hover:text-accent-primary transition-colors">{u.full_name}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 tabular-nums flex items-center gap-2">
                        <Fingerprint size={10} className="text-accent-primary opacity-40" /> ID-00{u.id}
                    </p>
                </div>
            </div>
        )
    },
    { 
        header: 'Role',
        cell: (u) => (
            <Badge className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.15em] border-none ${
                u.role === 'doctor' ? 'bg-blue-500/10 text-blue-500 shadow-[0_4px_12px_rgba(59,130,246,0.1)]' : 
                u.role === 'staff' ? 'bg-indigo-500/10 text-indigo-500' :
                u.role === 'admin' ? 'bg-rose-500/10 text-rose-500' :
                'bg-emerald-500/10 text-emerald-500'
            }`}>
                {u.role}
             </Badge>
        )
    },
    { header: 'Email Address', cell: (u) => <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tabular-nums lowercase italic group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{u.email}</span> },
    { 
        header: 'Status',
        cell: (u) => (
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${u.is_active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${u.is_active ? 'text-emerald-500' : 'text-amber-500'}`}>{u.is_active ? 'Active' : 'Disabled'}</span>
            </div>
        )
    },
    { 
        header: 'Actions', 
        cell: (u) => (
            <div className="flex justify-end pr-4">
                <TableActions 
                    row={u}
                    actions={[
                        { label: 'View Profile', icon: Eye, onClick: openDetails },
                        { label: 'Edit Account', icon: Edit2, onClick: openEdit },
                        { 
                            label: u.is_active ? 'Disable Account' : 'Enable Account', 
                            icon: ShieldAlert, 
                            onClick: handleToggleStatus,
                            variant: u.is_active ? 'danger' : 'success'
                        },
                        { 
                            label: 'Delete Account', 
                            icon: Trash2, 
                            onClick: openDelete, 
                            variant: 'danger' 
                        },
                    ]}
                />
            </div>
        )
    },
  ], [openDetails, openEdit, handleToggleStatus, openDelete]);
}
