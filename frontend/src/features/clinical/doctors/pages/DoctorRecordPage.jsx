import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Stethoscope, Calendar, Activity, Clock, 
    ArrowLeft, MoreVertical, Edit3, Award, 
    Phone, Mail, Briefcase, Star, Users,
    DollarSign, Trash2, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '@/core/api/apiClient';
import AdminPage from '@/layouts/AdminPage';
import Loading from '@/components/composed/Loading';
import { useNotifications } from '@/core/hooks/useNotifications';

/**
 * 🩺 DoctorRecordPage (Practitioner EMR Dashboard)
 * High-fidelity practitioner profile echoing the Patient Detail architecture.
 */
export default function DoctorRecordPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addNotification } = useNotifications();
    
    // Tab State
    const [activeTab, setActiveTab] = useState('Overview');

    // Fetch Global Practitioner Record
    const { data: doctor, isLoading, error } = useQuery({
        queryKey: ['doctor', id],
        queryFn: async () => {
            const { data } = await api.get(`doctors/${id}/`);
            return data;
        }
    });

    if (isLoading) return <Loading />;
    if (error || !doctor) return (
        <AdminPage>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12">
                <div className="w-20 h-20 bg-error-container text-error rounded-full flex items-center justify-center mb-6">
                    <ShieldAlert size={40} />
                </div>
                <h1 className="text-2xl font-black text-text-main mb-2">Practitioner Not Found</h1>
                <p className="text-text-sub max-w-sm mb-8">The requested clinician record could not be retrieved from the institutional matrix.</p>
                <button onClick={() => navigate(-1)} className="chip bg-surface-variant text-text-main h-9 px-6 text-xs">Back to Hub</button>
            </div>
        </AdminPage>
    );

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const tabs = ['Overview', 'Patient Load', 'Schedule', 'Performance'];

    return (
        <AdminPage>
            <main
                aria-label="Practitioner Identity Matrix"
                style={{
                    maxWidth: 1560,
                    margin: '0 auto',
                    padding: 'clamp(14px, 3vw, 24px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                }}
            >
                {/* ── 1. PRACTITIONER HEADER WIDGET ── */}
                <div className="widget" style={{ padding: 24 }}>
                    <div className="flex items-start justify-between gap-6 flex-wrap">
                        
                        <div className="flex items-center gap-6">
                            {/* Avatar */}
                            <div style={{ 
                                width: 80, height: 80, borderRadius: 24, 
                                background: 'var(--m3-primary)', color: 'var(--m3-on-primary)', 
                                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                fontSize: 32, fontWeight: 900, flexShrink: 0,
                                boxShadow: 'var(--m3-elev-2)'
                            }} className="flex items-center justify-center">
                                {doctor?.user?.full_name?.charAt(0).toUpperCase() || 'D'}
                            </div>
                            
                            {/* Core Identity */}
                            <div>
                                <div className="flex items-center gap-3 mb-1.5">
                                    <h1 className="text-2xl font-black text-text-main tracking-tight leading-none">{doctor?.user?.full_name}</h1>
                                    <span className="chip bg-success-container text-success">
                                        {doctor?.is_available ? 'Active' : 'On Leave'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex items-center gap-1.5 text-[13px] text-text-sub font-semibold">
                                        <Stethoscope size={14} className="text-primary" /> {doctor?.specialization_display || 'Specialist'}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[13px] text-text-sub font-semibold">
                                        <Award size={14} className="text-warning" /> {doctor?.experience_years || 0} Yrs Exp
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[13px] text-success font-bold">
                                        <DollarSign size={14} /> Rs. {doctor?.consultation_fee?.toLocaleString() || 0} / visit
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Details */}
                        <div className="flex gap-8 p-4 bg-surface-variant/40 rounded-2xl">
                            <div>
                                <div className="text-[10px] font-bold text-text-sub uppercase tracking-widest mb-1 opacity-50">Role Profile</div>
                                <div className="text-[13px] font-bold text-text-main">{doctor?.specialization_display || 'Practitioner'}</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-text-sub uppercase tracking-widest mb-1 opacity-50">Staff ID</div>
                                <div className="text-[13px] font-bold text-text-main">#{doctor?.id || 'N/A'}</div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                {/* ── 2. QUICK ACTIONS ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px]">
                    <button className="widget p-4 flex-row items-center gap-3 cursor-pointer hover:border-primary/20 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-primary-container/30 text-primary flex items-center justify-center">
                            <Edit3 size={18} />
                        </div>
                        <div className="text-left">
                            <div className="text-[13px] font-bold text-text-main">Edit Identity</div>
                            <div className="text-[10px] font-semibold text-text-sub">Refine credentials</div>
                        </div>
                    </button>

                    <button className="widget p-4 flex-row items-center gap-3 cursor-pointer hover:border-primary/20 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                            <Clock size={18} />
                        </div>
                        <div className="text-left">
                            <div className="text-[13px] font-bold text-text-main">Update Schedule</div>
                            <div className="text-[10px] font-semibold text-text-sub">Calibrate shifts</div>
                        </div>
                    </button>

                    <button className="widget p-4 flex-row items-center gap-3 cursor-pointer hover:border-primary/20 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <DollarSign size={18} />
                        </div>
                        <div className="text-left">
                            <div className="text-[13px] font-bold text-text-main">Fee Management</div>
                            <div className="text-[10px] font-semibold text-text-sub">Adjust billing</div>
                        </div>
                    </button>

                    <button className="widget p-4 flex-row items-center gap-3 cursor-pointer hover:border-primary/20 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                            <ShieldAlert size={18} />
                        </div>
                        <div className="text-left">
                            <div className="text-[13px] font-bold text-text-main">Credentialing</div>
                            <div className="text-[10px] font-semibold text-text-sub">Verification sync</div>
                        </div>
                    </button>
                </div>

                {/* ── 3. PRACTITIONER INTELLIGENCE TABS ── */}
                <div className="widget flex-1 min-h-[500px]">
                    {/* Header / Tab Bar */}
                    <div className="p-0 px-4 border-b border-outline-variant/10">
                        <div className="flex gap-8 overflow-x-auto no-scrollbar">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`relative h-14 flex items-center text-[13px] transition-all ${
                                        activeTab === tab ? 'font-bold text-primary' : 'font-medium text-text-sub'
                                    }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="active-tab-practitioner"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content Area */}
                    <div className="p-0 flex-1 overflow-hidden">
                        <div className="h-full overflow-y-auto p-6 scrollbar-hide">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {/* ── OVERVIEW TAB ── */}
                                    {activeTab === 'Overview' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="flex flex-col gap-6">
                                                <h4 className="text-[11px] font-bold uppercase tracking-widest text-text-sub opacity-50">Identity Matrix</h4>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-surface-variant/30 flex items-center justify-center text-text-sub">
                                                            <Mail size={16} />
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] font-bold text-text-sub uppercase mb-0.5">Primary Email</div>
                                                            <div className="text-[13px] font-bold text-text-main">{doctor?.user?.email || 'N/A'}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-surface-variant/30 flex items-center justify-center text-text-sub">
                                                            <Phone size={16} />
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] font-bold text-text-sub uppercase mb-0.5">Contact Node</div>
                                                            <div className="text-[13px] font-bold text-text-main">{doctor?.user?.phone_number || 'N/A'}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-6">
                                                <h4 className="text-[11px] font-bold uppercase tracking-widest text-text-sub opacity-50">Professional Core</h4>
                                                <div className="flex flex-col gap-3 p-5 rounded-2xl bg-surface-variant/20">
                                                    <p className="text-[13px] leading-relaxed text-text-main font-medium italic">
                                                        "{doctor?.bio || 'Lead clinical practitioner specializing in advanced patient care and institutional health strategies.'}"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* ── PATIENT LOAD TAB ── */}
                                    {activeTab === 'Patient Load' && (
                                        <div className="flex flex-col gap-3">
                                            {/* Simulated patient list for the load tab */}
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className="px-5 py-3.5 bg-surface-variant/20 rounded-2xl flex items-center justify-between border border-transparent hover:border-primary/10 transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-primary-container/30 text-primary flex items-center justify-center text-xs font-bold">
                                                            P{i}
                                                        </div>
                                                        <div>
                                                            <div className="text-[13px] font-bold text-text-main">Assigned Patient Node {i}02</div>
                                                            <div className="text-[10px] font-semibold text-text-sub">Last sync: 2 hours ago</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-[12px] font-black text-text-main">OPD Consultation</div>
                                                        <div className="text-[10px] font-bold text-success uppercase">Completed</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* ── SCHEDULE TAB ── */}
                                    {activeTab === 'Schedule' && (
                                        <div className="flex flex-col gap-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                                                    <div key={day} className="p-4 rounded-2xl border border-outline-variant/30 flex flex-col gap-3">
                                                        <div className="text-[11px] font-bold uppercase tracking-widest text-primary">{day}</div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="text-[13px] font-bold text-text-main">09:00 - 17:00</div>
                                                            <span className="chip bg-primary-container text-primary text-[9px]">Normal Shift</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* ── PERFORMANCE TAB ── */}
                                    {activeTab === 'Performance' && (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="p-6 rounded-2xl bg-warning/5 border border-warning/10 flex flex-col items-center gap-3">
                                                <Star className="text-warning fill-warning" size={32} />
                                                <div className="text-3xl font-black text-text-main">4.9/5</div>
                                                <div className="text-[11px] font-bold text-text-sub uppercase tracking-widest">Patient Rating</div>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-success/5 border border-success/10 flex flex-col items-center gap-3">
                                                <Activity className="text-success" size={32} />
                                                <div className="text-3xl font-black text-text-main">98%</div>
                                                <div className="text-[11px] font-bold text-text-sub uppercase tracking-widest">Efficiency Shard</div>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center gap-3">
                                                <Users className="text-primary" size={32} />
                                                <div className="text-3xl font-black text-text-main">1,240</div>
                                                <div className="text-[11px] font-bold text-text-sub uppercase tracking-widest">Cumulative Load</div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

            </main>
        </AdminPage>
    );
}
