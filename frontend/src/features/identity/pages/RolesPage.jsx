import React, { useState } from 'react';
import { ShieldCheck, MoreHorizontal, ShieldAlert, Key, Fingerprint, Lock } from 'lucide-react';
import { Card, Button, PageHeader } from '@/shared/components/ui';
import { motion } from 'framer-motion';

import AddUserModal from '@/features/identity/components/AddUserModal';
import UserService from '@/features/identity/api/userService';
import { useUI } from '@/core/ui/UIContext';
import { useAdminUsers } from '@/features/identity/hooks/useUsers';
import AdminPage from '@/shared/components/layout/AdminPage'; // ✨ THE BASE FILE

/**
 * 🔐 Role Architecture & Security Matrix
 */
export default function Roles() {
  const { addNotification } = useUI();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { users, loading, refresh } = useAdminUsers();

  const handleForge = async (formData, resetForm) => {
    setIsSubmitting(true);
    try {
        await UserService.create(formData);
        addNotification('Authorization Shard Forged', 'New identity successfully committed to the security matrix.', 'success');
        setIsModalOpen(false);
        refresh(); 
        resetForm();
    } catch (err) {
        addNotification('Forge Failure', 'Could not propagate role shard.', 'error');
    } finally {
        setIsSubmitting(false);
    }
  };

  const getRoleCount = (roleName) => {
    return users.filter(u => u.role === roleName).length;
  };

  const roles = [
    { title: 'Super Administrator', users: users.filter(u => u.is_superuser).length, access: 'Global', sensitivity: 'L5', color: 'rose', backendRole: 'admin' },
    { title: 'Clinical Specialist', users: getRoleCount('doctor'), access: 'Clinical + Admin', sensitivity: 'L4', color: 'teal', backendRole: 'doctor' },
    { title: 'Operational Staff', users: getRoleCount('staff'), access: 'Clinical Console', sensitivity: 'L3', color: 'indigo', backendRole: 'staff' },
    { title: 'Civilian Patient', users: getRoleCount('patient'), access: 'Patient Portal', sensitivity: 'L1', color: 'emerald', backendRole: 'patient' },
  ];

  return (
    <AdminPage>
      <PageHeader 
        title="Role Architecture" 
        subtitle="Control Global Authorization Shards & Privacy Nodes"
        actions={
            <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-3 border-none hover:scale-105 transition-all"
            >
                <ShieldAlert size={18} /> Forge Security Shard
            </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {roles.map((role, i) => (
          <motion.div
            key={role.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="matrix-card p-10 border-none flex flex-col gap-8 group">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black/20 flex items-center justify-center border border-slate-100 dark:border-white/5 shadow-inner group-hover:rotate-12 transition-transform duration-500">
                  <ShieldCheck className={role.title.includes('Super') ? 'text-rose-500' : 'text-accent-primary'} size={28} />
                </div>
                <button className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-slate-400 hover:text-accent-primary transition-all shadow-inner">
                    <MoreHorizontal size={16} />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Auth Tier {role.sensitivity}</p>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">{role.title}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-[24px] bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Users</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white tabular-nums italic">{role.users}</p>
                </div>
                <div className="p-5 rounded-[24px] bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic pt-2">Active</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 tracking-[0.1em]"><Key size={12} /> Access Scope</span>
                    <span className="text-[10px] font-black uppercase text-slate-900 dark:text-white italic">{role.access}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-primary w-[75%] rounded-full opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-accent-primary/5 border border-accent-primary/20 rounded-[48px] p-12 flex flex-col lg:flex-row items-center gap-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40" />
        <div className="w-24 h-24 bg-accent-primary rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-accent-primary/30 shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700">
          <Fingerprint size={48} strokeWidth={2.5} />
        </div>
        <div className="space-y-3 flex-1 text-center lg:text-left relative z-10">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Advanced Entropy Control</h2>
          <p className="text-sm font-bold text-slate-500 max-w-2xl">Modify global permission shards and protocol levels. Changes here will propagate through the entire clinical network in real-time. Use caution when modifying L5 nodes.</p>
        </div>
        <Button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-12 py-5 rounded-[22px] text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-4 border-none shadow-2xl hover:scale-105 transition-all relative z-10">
          <Lock size={18} /> Master Auth Table
        </Button>
      </Card>

      <AddUserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleForge}
        isSubmitting={isSubmitting}
      />
    </AdminPage>
  );
}

