import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar, Clock, User, Stethoscope, FileText, 
    CheckCircle2, XCircle, AlertTriangle, ArrowLeft,
    Phone, Mail, MapPin, Hash, Receipt, Info, ShieldAlert,
    CalendarClock, ArrowUpRight, Activity
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/core/api/apiClient';
import AdminPage from '@/layouts/AdminPage';
import Loading from '@/components/composed/Loading';
import { useModalStore } from '@/core/store/useModalStore';

/**
 * 📅 AppointmentDetailPage
 * Standardized Material 3 Dashboard view for individual appointment records.
 */
export default function AppointmentDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { openModal } = useModalStore();

    const [cancelReason, setCancelReason] = useState('');
    const [showCancelPrompt, setShowCancelPrompt] = useState(false);

    // Fetch Global Appointment Record
    const { data: appointment, isLoading, error } = useQuery({
        queryKey: ['appointment', id],
        queryFn: async () => {
            const { data } = await api.get(`appointments/${id}/`);
            return data;
        }
    });

    // Cancellation Mutation
    const cancelMutation = useMutation({
        mutationFn: async (payload) => {
            return await api.patch(`appointments/${id}/cancel/`, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['appointment', id]);
            setShowCancelPrompt(false);
        }
    });

    if (isLoading) return <Loading />;
    if (error) return (
        <AdminPage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '48px' }}>
                <div style={{ width: 80, height: 80, background: 'var(--m3-error-container)', color: 'var(--m3-error)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    <ShieldAlert size={40} />
                </div>
                <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--m3-text-main)', marginBottom: 8 }}>Scheduling Record Not Found</h1>
                <p style={{ color: 'var(--m3-text-sub)', maxWidth: 380, marginBottom: 32 }}>The requested appointment telemetry could not be retrieved from the central nexus.</p>
                <button onClick={() => navigate('/admin/appointments')} className="chip" style={{ background: 'var(--m3-surface-variant)', color: 'var(--m3-text-main)', height: 36, padding: '0 24px', fontSize: 12 }}>Back to Registry</button>
            </div>
        </AdminPage>
    );

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
    };

    const getStatusColor = (status) => {
        switch((status || '').toLowerCase()) {
            case 'confirmed': return { bg: 'var(--m3-success-container)', text: 'var(--m3-success)' };
            case 'completed': return { bg: 'var(--m3-surface-container)', text: 'var(--m3-text-sub)' };
            case 'cancelled': return { bg: 'var(--m3-error-container)', text: 'var(--m3-error)' };
            default: return { bg: 'var(--m3-primary-container)', text: 'var(--m3-primary)' }; // Pending
        }
    };
    const sColors = getStatusColor(appointment.status);

    return (
        <AdminPage>
            <main
                aria-label="Appointment Details Dashboard"
                style={{
                    maxWidth: 1560,
                    margin: '0 auto',
                    padding: 'clamp(14px, 3vw, 24px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                }}
            >
                {/* ── 1. CORE HEADER WIDGET ── */}
                <div className="widget" style={{ padding: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                            {/* Icon Graph */}
                            <div style={{ 
                                width: 80, height: 80, borderRadius: 24, 
                                background: 'var(--m3-primary)', color: 'var(--m3-on-primary)', 
                                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                flexShrink: 0,
                                boxShadow: 'var(--m3-elev-2)'
                            }}>
                                <Calendar size={36} />
                            </div>
                            
                            {/* Global Identity */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                                    <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--m3-text-main)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                                        Consultation Event
                                    </h1>
                                    <span className="chip" style={{ background: sColors.bg, color: sColors.text, fontWeight: 800 }}>
                                        {appointment.status_display || appointment.status}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--m3-text-sub)', fontWeight: 600 }}>
                                        <Hash size={14} /> ID: APT-{appointment.id.toString().padStart(6, '0')}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--m3-text-sub)', fontWeight: 600 }}>
                                        <Clock size={14} /> Booked: {new Date(appointment.created_at).toLocaleDateString()}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--m3-text-sub)', fontWeight: 600, textTransform: 'capitalize' }}>
                                        <Activity size={14} /> Priority: {appointment.priority || 'Routine'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Back / Quick Actions */}
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button 
                                onClick={() => navigate('/admin/appointments')}
                                className="widget-row-btn"
                                style={{ background: 'transparent', border: '1px solid var(--m3-outline-variant)', height: 44 }}
                            >
                                <ArrowLeft size={16} /> <span style={{ fontSize: 12, fontWeight: 800 }}>Back</span>
                            </button>
                            {appointment.is_cancellable && (
                                <button 
                                    onClick={() => setShowCancelPrompt(true)}
                                    className="widget-row-btn"
                                    style={{ background: 'var(--m3-error-container)', color: 'var(--m3-error)', height: 44, border: 'none' }}
                                >
                                    <XCircle size={16} /> <span style={{ fontSize: 12, fontWeight: 800 }}>Cancel Appointment</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── 1.5 CANCEL PROMPT (CONDITIONAL) ── */}
                <AnimatePresence>
                    {showCancelPrompt && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ overflow: 'hidden' }}
                        >
                            <div className="widget" style={{ padding: 24, background: 'var(--m3-error-container)', borderColor: 'var(--m3-error)', gap: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--m3-error)' }}>
                                    <AlertTriangle size={20} />
                                    <h3 style={{ fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Revoke Consultation Slot</h3>
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Reason for cancellation (optional)..."
                                    value={cancelReason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                    style={{
                                        width: '100%', height: 44, padding: '0 16px', borderRadius: 12,
                                        background: 'var(--m3-surface)', border: '1px solid var(--m3-outline-variant)',
                                        color: 'var(--m3-text-main)', fontSize: 13, outline: 'none'
                                    }}
                                />
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                                    <button onClick={() => setShowCancelPrompt(false)} className="chip" style={{ background: 'transparent', color: 'var(--m3-text-main)', padding: '0 20px', height: 36 }}>Abort</button>
                                    <button 
                                        onClick={() => cancelMutation.mutate({ cancellation_reason: cancelReason })}
                                        disabled={cancelMutation.isLoading}
                                        className="chip" style={{ background: 'var(--m3-error)', color: 'white', padding: '0 20px', height: 36 }}
                                    >
                                        {cancelMutation.isLoading ? 'Revoking...' : 'Confirm Cancellation'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
                    {/* ── 2. TEMPORAL SCHEDULING NODE ── */}
                    <div className="widget" style={{ background: 'var(--m3-surface-variant)', border: 'none' }}>
                        <div className="widget-header">
                            <div>
                                <div className="eyebrow">
                                    <div className="eyebrow-dot" style={{ background: 'var(--m3-primary)' }} />
                                    Temporal Details
                                </div>
                                <div className="widget-title" style={{ marginTop: 2 }}>Allocated Slot</div>
                            </div>
                            <CalendarClock size={20} color="var(--m3-primary)" />
                        </div>
                        <div className="widget-body" style={{ gap: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--m3-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--m3-outline-variant)' }}>
                                    <Calendar size={20} color="var(--m3-text-main)" />
                                </div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: 'var(--m3-text-sub)', letterSpacing: '0.1em' }}>Date</div>
                                    <div style={{ fontSize: 16, fontWeight: 900, color: 'var(--m3-text-main)', marginTop: 2 }}>{formatDate(appointment.appointment_date)}</div>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--m3-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--m3-outline-variant)' }}>
                                    <Clock size={20} color="var(--m3-text-main)" />
                                </div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: 'var(--m3-text-sub)', letterSpacing: '0.1em' }}>Time Block</div>
                                    <div style={{ fontSize: 16, fontWeight: 900, color: 'var(--m3-text-main)', marginTop: 2 }}>{appointment.start_time} — {appointment.end_time}</div>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--m3-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--m3-outline-variant)' }}>
                                    <Info size={20} color="var(--m3-text-main)" />
                                </div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: 'var(--m3-text-sub)', letterSpacing: '0.1em' }}>Consultation Type</div>
                                    <div style={{ fontSize: 16, fontWeight: 900, color: 'var(--m3-text-main)', marginTop: 2, textTransform: 'capitalize' }}>{appointment.appointment_type?.replace('_', ' ') || 'In-Person'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── 3. CLINICAL CONTEXT WIDGET ── */}
                    <div className="widget" style={{ flex: 1, minHeight: 180 }}>
                        <div className="widget-header">
                            <div>
                                <div className="eyebrow">
                                    <div className="eyebrow-dot" style={{ background: 'var(--m3-warning)' }} />
                                    Clinical Record
                                </div>
                                <div className="widget-title" style={{ marginTop: 2 }}>Visit Notes</div>
                            </div>
                            <FileText size={20} color="var(--m3-text-sub)" />
                        </div>
                        <div className="widget-body" style={{ gap: 20 }}>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--m3-text-sub)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Patient Submitted Notes</div>
                                <div style={{ padding: 16, background: 'var(--m3-surface-variant)', borderRadius: 12, fontSize: 13, fontWeight: 600, color: 'var(--m3-text-main)' }}>
                                    {appointment.notes || <span style={{ opacity: 0.5 }}>No notes provided by patient.</span>}
                                </div>
                            </div>
                            
                            {appointment.status === 'cancelled' && appointment.cancellation_reason && (
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--m3-error)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Cancellation Reason</div>
                                    <div style={{ padding: 16, background: 'var(--m3-error-container)', borderRadius: 12, fontSize: 13, fontWeight: 600, color: 'var(--m3-error)' }}>
                                        {appointment.cancellation_reason}
                                    </div>
                                </div>
                            )}

                            {appointment.doctor_notes && (
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--m3-success)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Practitioner End-Notes</div>
                                    <div style={{ padding: 16, background: 'var(--m3-success-container)', borderRadius: 12, fontSize: 13, fontWeight: 600, color: 'var(--m3-success)' }}>
                                        {appointment.doctor_notes}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
                    {/* ── 4. PATIENT NODE ── */}
                    <div className="widget" style={{ padding: 20, cursor: 'pointer', transition: 'all 0.2s', border: '1px solid transparent', hover: { borderColor: 'var(--m3-primary)' } }} onClick={() => navigate(`/admin/patients/${appointment.patient_profile_id}`)}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                            <div className="eyebrow">
                                <div className="eyebrow-dot" style={{ background: 'var(--m3-primary)' }} />
                                Patient Entity
                            </div>
                            <ArrowUpRight size={16} color="var(--m3-text-sub)" />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 16, background: 'var(--m3-primary)', color: 'var(--m3-on-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800 }}>
                                {appointment.patient?.full_name?.charAt(0) || <User size={20} />}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--m3-text-main)', marginBottom: 2 }}>{appointment.patient?.full_name}</h3>
                                <p style={{ fontSize: 12, color: 'var(--m3-text-sub)', fontWeight: 600 }}>{appointment.patient?.email || 'System Identity'}</p>
                            </div>
                        </div>
                    </div>

                    {/* ── 5. DOCTOR NODE ── */}
                    <div className="widget" style={{ padding: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                            <div className="eyebrow">
                                <div className="eyebrow-dot" style={{ background: 'var(--m3-success)' }} />
                                Assigned Specialist
                            </div>
                            <Stethoscope size={16} color="var(--m3-text-sub)" />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 16, background: 'var(--m3-success-container)', color: 'var(--m3-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800 }}>
                                {appointment.doctor?.user?.full_name?.charAt(0) || 'D'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--m3-text-main)', marginBottom: 2 }}>Dr. {appointment.doctor?.user?.full_name}</h3>
                                <p style={{ fontSize: 12, color: 'var(--m3-text-sub)', fontWeight: 600 }}>{appointment.doctor?.specialty || 'General Practice'}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </AdminPage>
    );
}
