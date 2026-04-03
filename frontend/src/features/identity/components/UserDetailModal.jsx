import React from 'react';
import { 
    User, 
    Mail, 
    Shield, 
    Activity, 
    Calendar, 
    Clock, 
    MapPin, 
    Phone,
    Briefcase,
    Stethoscope,
    HeartPulse,
    Fingerprint
} from 'lucide-react';
import { Modal, Badge } from '@/shared/components/ui';

/**
 * 👤 Identity Detail Shard
 * High-fidelity read-only portal for inspecting user identity kernels.
 */
export default function UserDetailModal({ isOpen, onClose, user }) {
    if (!user) return null;

    const metadata = [
        { label: 'Full Name', value: user.full_name, icon: User },
        { label: 'Email Address', value: user.email, icon: Mail },
        { label: 'Role', value: user.role, icon: Shield, isBadge: true },
        { label: 'System ID', value: `ID-${user.id}`, icon: Fingerprint },
        { label: 'Phone Number', value: user.phone || 'Not Configured', icon: Phone },
        { label: 'Address / Location', value: user.address || 'Global Access', icon: MapPin },
    ];

    const sidebar = (
        <div className="flex flex-col h-full">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary mb-6">Account Status</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${user.is_active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    <Activity size={18} />
                </div>
                <div>
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight">System Access</p>
                    <p className={`text-[8px] font-bold uppercase mt-1 tracking-widest ${user.is_active ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {user.is_active ? 'Active Account' : 'Disabled'}
                    </p>
                </div>
            </div>

            <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Added On</span>
                    <span className="text-[10px] font-black text-text-primary dark:text-white uppercase italic">{user.date_joined?.split('T')[0] || 'Unknown'}</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Activity</span>
                    <span className="text-[10px] font-black text-accent-primary uppercase">Active Now</span>
                </div>
            </div>

            <div className="mt-auto pt-8 flex items-center gap-2 text-text-secondary/40 italic">
                <Shield size={12} />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Standard Security</span>
            </div>
        </div>
    );

    const getRoleIcon = (role) => {
        switch(role) {
            case 'doctor': return Stethoscope;
            case 'staff': return Briefcase;
            case 'patient': return HeartPulse;
            default: return User;
        }
    };
    const RoleIcon = getRoleIcon(user.role);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="User Profile Detail"
            subtitle={`Inspecting ID-${user.id}`}
            icon={RoleIcon}
            sidebar={sidebar}
            maxWidth="max-w-3xl"
        >
            <div className="space-y-6 py-2">
                {/* 📍 Top Identity Banner */}
                <div className="flex items-center gap-6 p-8 rounded-[32px] bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-accent-primary/5 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                    
                    <div className="w-20 h-20 rounded-[28px] bg-accent-primary text-white flex items-center justify-center text-2xl font-black shadow-[0_15px_40px_rgba(20,184,166,0.3)] relative z-10 transition-transform group-hover:scale-105">
                        {user.full_name?.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div className="space-y-1 relative z-10">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{user.full_name}</h2>
                            <Badge className="bg-accent-primary/10 text-accent-primary border-none text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                                {user.role}
                            </Badge>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] font-display flex items-center gap-2">
                            <Mail size={10} className="text-accent-primary" /> {user.email}
                        </p>
                    </div>
                </div>

                {/* 🧬 Metadata Grid */}
                <div className="grid grid-cols-2 gap-6 px-2">
                    {metadata.map((item, i) => (
                        <div key={i} className="flex items-center gap-4 group p-1.5 hover:bg-slate-50 dark:hover:bg-white/[0.01] rounded-xl transition-all">
                            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm flex items-center justify-center text-slate-400 group-hover:text-accent-primary transition-colors">
                                <item.icon size={18} />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                                {item.isBadge ? (
                                    <Badge className="bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border-none text-[9px] font-black uppercase px-2.5 py-0.5 rounded-md">
                                        {item.value}
                                    </Badge>
                                ) : (
                                    <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase italic truncate max-w-[150px]">{item.value}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 🔒 Security Protocols Footer */}
                <div className="p-8 rounded-[32px] bg-slate-950 border border-white/5 flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-inner">
                            <Shield size={20} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-white uppercase tracking-widest">Authentication Level</p>
                            <p className="text-[9px] font-bold text-slate-500 uppercase">2FA Security Enabled</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Verified User</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
