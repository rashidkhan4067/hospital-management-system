import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Calendar, FileText, Activity, Pill, Thermometer, 
    Stethoscope, ArrowLeft, Clock, MoreVertical, Download, 
    ShieldAlert, MapPin, Phone, Mail, Receipt, FlaskConical,
    ChevronRight, CreditCard, Heart, Edit3, BedDouble, Plus,
    Hash, CheckCircle2, Search
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '@/core/api/apiClient';
import AdminPage from '@/layouts/AdminPage';
import Loading from '@/components/composed/Loading';
import { useModalStore } from '@/core/store/useModalStore';

/**
 * 👤 PatientDetailPage (EMR Dashboard)
 * Central patient record dashboard showing complete history with tabs.
 */
export default function PatientDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { openModal } = useModalStore();
    
    // Tab State
    const [activeTab, setActiveTab] = useState('Appointments');

    // Fetch Global Patient Record
    const { data: patient, isLoading, error } = useQuery({
        queryKey: ['patient', id],
        queryFn: async () => {
            const { data } = await api.get(`patients/profiles/${id}/`);
            return data;
        }
    });

    if (isLoading) return <Loading />;
    if (error) return (
        <AdminPage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '48px' }}>
                <div style={{ width: 80, height: 80, background: 'var(--m3-error-container)', color: 'var(--m3-error)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    <ShieldAlert size={40} />
                </div>
                <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--m3-text-main)', marginBottom: 8 }}>Registry Lookup Failed</h1>
                <p style={{ color: 'var(--m3-text-sub)', maxWidth: 380, marginBottom: 32 }}>The requested medical record could not be retrieved from the institutional shard.</p>
                <button onClick={() => navigate(-1)} className="chip" style={{ background: 'var(--m3-surface-variant)', color: 'var(--m3-text-main)', height: 36, padding: '0 24px', fontSize: 12 }}>Back to Registry</button>
            </div>
        </AdminPage>
    );

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const age = new Date().getFullYear() - (patient.date_of_birth ? new Date(patient.date_of_birth).getFullYear() : 0);
    const tabs = ['Appointments', 'Admissions', 'Lab Orders', 'Invoices'];

    return (
        <AdminPage>
            <main
                aria-label="Patient Electronic Health Record"
                style={{
                    maxWidth: 1560,
                    margin: '0 auto',
                    padding: 'clamp(14px, 3vw, 24px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                }}
            >
                {/* ── 1. PATIENT HEADER WIDGET ── */}
                <div className="widget" style={{ padding: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                            {/* Avatar */}
                            <div style={{ 
                                width: 80, height: 80, borderRadius: 24, 
                                background: 'var(--m3-primary)', color: 'var(--m3-on-primary)', 
                                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                fontSize: 32, fontWeight: 900, flexShrink: 0,
                                boxShadow: 'var(--m3-elev-2)'
                            }}>
                                {patient.full_name?.charAt(0).toUpperCase()}
                            </div>
                            
                            {/* Core Identity */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                                    <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--m3-text-main)', letterSpacing: '-0.02em', lineHeight: 1 }}>{patient.full_name}</h1>
                                    <span className="chip" style={{ background: patient.is_admitted ? 'var(--m3-primary-container)' : 'var(--m3-success-container)', color: patient.is_admitted ? 'var(--m3-primary)' : 'var(--m3-success)' }}>
                                        {patient.is_admitted ? 'Admitted' : (patient.status || 'Active')}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--m3-text-sub)', fontWeight: 600 }}>
                                        <Hash size={14} /> ID: {patient.mrn}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--m3-text-sub)', fontWeight: 600 }}>
                                        <User size={14} /> CNIC: {patient.cnic || 'N/A'}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--m3-text-sub)', fontWeight: 600 }}>
                                        <Activity size={14} /> {age} Yrs / {patient.gender}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Details */}
                        <div style={{ display: 'flex', gap: 32, padding: '16px 24px', background: 'var(--m3-surface-variant)', borderRadius: 16 }}>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--m3-text-sub)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Phone</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--m3-text-main)' }}>{patient.phone || patient.user_details?.phone_number || 'N/A'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--m3-text-sub)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Registered</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--m3-text-main)' }}>{formatDate(patient.created_at)}</div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                {/* ── 2. QUICK ACTIONS ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                    <button 
                        onClick={() => openModal('BOOK_APPOINTMENT', { initialPatient: patient })} 
                        className="widget" style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'all 0.2s', border: '1px solid transparent', hover: { borderColor: 'var(--m3-primary)' } }}
                    >
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--m3-primary-container)', color: 'var(--m3-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Calendar size={18} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--m3-text-main)' }}>New Appointment</div>
                            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--m3-text-sub)' }}>Schedule visit</div>
                        </div>
                    </button>

                    <button 
                        onClick={() => openModal('NEW_LAB_ORDER', { initialPatient: patient })} 
                        className="widget" style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, cursor: 'pointer' }}
                    >
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--m3-warning-container)', color: 'var(--m3-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FlaskConical size={18} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--m3-text-main)' }}>New Lab Order</div>
                            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--m3-text-sub)' }}>Request diagnostics</div>
                        </div>
                    </button>

                    <button 
                        onClick={() => openModal('NEW_INVOICE', { initialPatient: patient })} 
                        className="widget" style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, cursor: 'pointer' }}
                    >
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--m3-success-container)', color: 'var(--m3-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Receipt size={18} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--m3-text-main)' }}>New Invoice</div>
                            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--m3-text-sub)' }}>Generate billing</div>
                        </div>
                    </button>

                    <button 
                        onClick={() => {
                            if (!patient.is_admitted) openModal('ADMIT_PATIENT', { initialPatient: patient });
                        }} 
                        className="widget" style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, cursor: patient.is_admitted ? 'not-allowed' : 'pointer', opacity: patient.is_admitted ? 0.6 : 1 }}
                    >
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--m3-error-container)', color: 'var(--m3-error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <BedDouble size={18} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--m3-text-main)' }}>Admit Patient</div>
                            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--m3-text-sub)' }}>{patient.is_admitted ? 'Already Admitted' : 'Assign to ward'}</div>
                        </div>
                    </button>
                </div>

                {/* ── 3. MEDICAL HISTORY TABS ── */}
                <div className="widget" style={{ flex: 1, minHeight: 400 }}>
                    {/* Header / Tab Bar */}
                    <div className="widget-header" style={{ padding: '0 16px', borderBottom: '1px solid var(--m3-outline-variant)' }}>
                        <div style={{ display: 'flex', gap: 24, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    style={{
                                        position: 'relative',
                                        height: 48,
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: 13,
                                        fontWeight: activeTab === tab ? 800 : 600,
                                        color: activeTab === tab ? 'var(--m3-primary)' : 'var(--m3-text-sub)',
                                        background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap'
                                    }}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="active-tab"
                                            style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, background: 'var(--m3-primary)', borderRadius: '2px 2px 0 0' }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content Area */}
                    <div className="widget-body" style={{ padding: 0 }}>
                        <div className="widget-scroll-area">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.15 }}
                                    style={{ padding: 16 }}
                                >
                                    {/* ── APPOINTMENTS TAB ── */}
                                    {activeTab === 'Appointments' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            {(patient.appointments && patient.appointments.length > 0) ? patient.appointments.map((app, idx) => (
                                                <div key={idx} className="widget-row" style={{ padding: '12px 16px', background: 'var(--m3-surface-variant)', borderRadius: 12, border: 'none' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--m3-text-sub)', letterSpacing: '0.1em' }}>#{app.id || 'APT-00' + (idx+1)}</div>
                                                        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--m3-text-main)', marginTop: 2 }}>Dr. {app.doctor?.user?.full_name || 'Assigned Doctor'}</div>
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--m3-text-main)' }}>{formatDate(app.appointment_date)}</div>
                                                        <div style={{ fontSize: 11, color: 'var(--m3-text-sub)' }}>{app.start_time || 'Morning Session'}</div>
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                         <span className="chip" style={{ background: app.status === 'Completed' ? 'var(--m3-success-container)' : 'var(--m3-primary-container)', color: app.status === 'Completed' ? 'var(--m3-success)' : 'var(--m3-primary)' }}>
                                                            {app.status || 'Scheduled'}
                                                        </span>
                                                    </div>
                                                    <button className="ghost-link" onClick={() => openModal('APPOINTMENT_REPORT', { id: app.id })}>View →</button>
                                                </div>
                                            )) : (
                                                <div style={{ padding: 40, textAlign: 'center', opacity: 0.5 }}>
                                                    <Calendar size={32} style={{ margin: '0 auto', marginBottom: 12 }} />
                                                    <div style={{ fontSize: 13, fontWeight: 800 }}>No Appointments Found</div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* ── ADMISSIONS TAB ── */}
                                    {activeTab === 'Admissions' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            {(patient.admissions && patient.admissions.length > 0) ? patient.admissions.map((adm, idx) => (
                                                <div key={idx} className="widget-row" style={{ padding: '12px 16px', background: 'var(--m3-surface-variant)', borderRadius: 12, border: 'none' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--m3-text-sub)', letterSpacing: '0.1em' }}>#{adm.id || 'ADM-00' + (idx+1)}</div>
                                                        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--m3-text-main)', marginTop: 2 }}>{adm.ward_details?.name || 'General Ward'}</div>
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--m3-text-main)' }}>Room {adm.room || 'N/A'}, Bed {adm.bed_details?.number || 'N/A'}</div>
                                                        <div style={{ fontSize: 11, color: 'var(--m3-text-sub)' }}>Admitted: {formatDate(adm.admission_date)}</div>
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                         <span className="chip" style={{ background: adm.status === 'Discharged' ? 'var(--m3-surface-container)' : 'var(--m3-error-container)', color: adm.status === 'Discharged' ? 'var(--m3-text-sub)' : 'var(--m3-error)' }}>
                                                            {adm.status || 'Active'}
                                                        </span>
                                                    </div>
                                                    <button className="ghost-link">View →</button>
                                                </div>
                                            )) : (
                                                <div style={{ padding: 40, textAlign: 'center', opacity: 0.5 }}>
                                                    <BedDouble size={32} style={{ margin: '0 auto', marginBottom: 12 }} />
                                                    <div style={{ fontSize: 13, fontWeight: 800 }}>No Admissions Found</div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* ── LAB ORDERS TAB ── */}
                                    {activeTab === 'Lab Orders' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            {(patient.lab_orders && patient.lab_orders.length > 0) ? patient.lab_orders.map((lab, idx) => (
                                                <div key={idx} className="widget-row" style={{ padding: '12px 16px', background: 'var(--m3-surface-variant)', borderRadius: 12, border: 'none' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--m3-text-sub)', letterSpacing: '0.1em' }}>#{lab.order_id || lab.id}</div>
                                                        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--m3-text-main)', marginTop: 2 }}>{(lab.test_names && lab.test_names.length > 0 ? lab.test_names : ['Complete Blood Count']).join(', ')}</div>
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--m3-text-main)' }}>{formatDate(lab.created_at)}</div>
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                         <span className="chip" style={{ background: lab.status === 'Completed' ? 'var(--m3-success-container)' : 'var(--m3-warning-container)', color: lab.status === 'Completed' ? 'var(--m3-success)' : 'var(--m3-warning)' }}>
                                                            {lab.status || 'Pending'}
                                                        </span>
                                                    </div>
                                                    <button className="ghost-link">View →</button>
                                                </div>
                                            )) : (
                                                <div style={{ padding: 40, textAlign: 'center', opacity: 0.5 }}>
                                                    <FlaskConical size={32} style={{ margin: '0 auto', marginBottom: 12 }} />
                                                    <div style={{ fontSize: 13, fontWeight: 800 }}>No Lab Orders Found</div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* ── INVOICES TAB ── */}
                                    {activeTab === 'Invoices' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            {(patient.invoices && patient.invoices.length > 0) ? patient.invoices.map((inv, idx) => (
                                                <div key={idx} className="widget-row" style={{ padding: '12px 16px', background: 'var(--m3-surface-variant)', borderRadius: 12, border: 'none' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--m3-text-sub)', letterSpacing: '0.1em' }}>#{inv.invoice_no}</div>
                                                        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--m3-text-main)', marginTop: 2 }}>{formatDate(inv.created_at)}</div>
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--m3-text-main)' }}>Rs. {parseFloat(inv.total_amount).toLocaleString()}</div>
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                         <span className="chip" style={{ background: inv.status === 'Paid' ? 'var(--m3-success-container)' : 'var(--m3-warning-container)', color: inv.status === 'Paid' ? 'var(--m3-success)' : 'var(--m3-warning)' }}>
                                                            {inv.status || 'Pending'}
                                                        </span>
                                                    </div>
                                                    <button className="ghost-link" onClick={() => navigate(`/admin/financials/invoices/${inv.id}`)}>View →</button>
                                                </div>
                                            )) : (
                                                <div style={{ padding: 40, textAlign: 'center', opacity: 0.5 }}>
                                                    <Receipt size={32} style={{ margin: '0 auto', marginBottom: 12 }} />
                                                    <div style={{ fontSize: 13, fontWeight: 800 }}>No Invoices Found</div>
                                                </div>
                                            )}
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
