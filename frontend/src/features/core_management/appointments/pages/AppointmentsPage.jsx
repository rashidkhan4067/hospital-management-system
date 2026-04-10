import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar, 
    LayoutList, 
    Clock, 
    Plus, 
    Printer, 
    Info, 
    X,
    CheckCircle2,
    XCircle,
    CalendarCheck,
    AlertCircle
} from 'lucide-react';
import AdminPage from '@/layouts/AdminPage';
import { 
    Button, 
    MaterialSideSheet, 
    Card, 
    Badge, 
    KpiCard 
} from '@/components/primitives';

import { useAppointments } from '../hooks/useAppointments';
import { useAppointmentFilters } from '../hooks/useAppointmentFilters';
import AgendaView from '../components/AgendaView';
import CalendarView from '../components/CalendarView';
import SmartScheduler from '../components/SmartScheduler';
import AppointmentFilters from '../components/AppointmentFilters';
import AppointmentDetailView from '../components/AppointmentDetailView';
import { useUIStore } from '@/core/store/useUIStore';
import { useDataStore } from '@/core/store/useDataStore';

/**
 * 🏥 AppointmentsPage (Senior Analytics Alignment Spec)
 * Fully synchronized with the 8px MD3 design matrix used in high-fidelity analytics.
 */
export default function AppointmentsPage() {
  const { filters, setFilter } = useAppointmentFilters();
  const { 
    appointments, 
    isLoading,
    error,
    createAppointment, 
    isCreating,
    rescheduleAppointment,
    cancelAppointment 
  } = useAppointments(filters);

  const [selectedAppt, setSelectedAppt] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const addNotification = useUIStore(state => state.addNotification);
  const resetGlobalFilters = useDataStore(state => state.resetFilters);
  const [showReassurance, setShowReassurance] = useState(false);

  // 📡 Initial State Sync (Dashboard Context)
  useEffect(() => {
    if (filters.range && filters.range !== 'Today' || filters.status !== 'All') {
        setShowReassurance(true);
    }
  }, [filters.range, filters.status]);

  const handleCreate = (data) => {
    createAppointment(data, { onSuccess: () => setIsSheetOpen(false) });
  };

  const handleSelection = (appt) => {
    setSelectedAppt(appt);
    setFilter('id', appt.id);
  };

  const handleCloseDetail = () => {
    setSelectedAppt(null);
    setFilter('id', null);
  };

  const handlePrint = () => {
    window.print();
    addNotification('Print Service', 'Preparing daily clinical schedule...', 'info');
  };

  // 📊 M3 Tactical Metrics
  const stats = [
    { title: "Today's Volume", value: appointments.length || 0, icon: CalendarCheck, isUp: true, trend: "Daily Focus" },
    { title: "Pending Triage", value: appointments.filter(a => a.status === 'Pending').length, icon: Clock, isUp: true, trend: "Action Required", color: "warning" },
    { title: "Completed Ops", value: appointments.filter(a => a.status === 'Completed').length, icon: CheckCircle2, isUp: true, trend: "Finalized", color: "success" },
    { title: "Cancelled Slots", value: appointments.filter(a => a.status === 'Cancelled').length, icon: XCircle, isUp: false, trend: "Operational Loss", color: "error" },
  ];

  return (
    <AdminPage className="bg-[#FEF7FF]/50 min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-col gap-10 sm:gap-16 pb-20"
      >
        
        {/* 📟 Header Shard (Recursive Fluid Pattern) */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between w-full">
            
            {/* 🏷️ Identity Area */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.25em]">Clinical Flow Registry</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-main tracking-tighter leading-none">Schedule Hub</h1>
            </div>

            {/* 🎮 Command Console (Adaptive Stacking) */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full lg:w-auto">
                
                {/* 🔳 View Toggles (Segmented Pattern) */}
                <div className="flex items-center p-1 bg-surface-bright border border-outline/40 rounded-2xl shadow-sm w-full sm:w-auto">
                    <button 
                        onClick={() => setFilter('view', 'agenda')}
                        className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${filters.view === 'agenda' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-sub hover:bg-surface'}`}
                    >
                        <LayoutList size={14} /> Agenda
                    </button>
                    <button 
                        onClick={() => setFilter('view', 'calendar')}
                        className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${filters.view === 'calendar' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-sub hover:bg-surface'}`}
                    >
                        <Clock size={14} /> Calendar
                    </button>
                </div>

                {/* ⚡ Action Shard */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button 
                        variant="outlined" 
                        icon={Printer} 
                        onClick={handlePrint}
                        className="flex-1 sm:flex-none rounded-2xl border-outline/30 text-text-sub h-12 font-black uppercase text-[10px] tracking-widest"
                    >
                        Print
                    </Button>
                    <Button 
                        variant="filled" 
                        icon={Plus} 
                        onClick={() => setIsSheetOpen(true)}
                        className="flex-1 sm:flex-none h-12 px-8 rounded-2xl shadow-xl shadow-primary/20 bg-primary font-black uppercase text-[10px] tracking-widest text-center"
                    >
                        Book Slot
                    </Button>
                </div>
            </div>
        </div>

        {/* 🪄 Dashboard Context Banner */}
        <AnimatePresence>
            {showReassurance && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className="bg-primary/5 border border-primary/20 rounded-[32px] p-6 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-transform">
                                <Info size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-text-main tracking-tight">Active Drill-Down Context</span>
                                <span className="text-[11px] font-medium text-text-sub opacity-70">Showing clinical telemetry for status: {filters.status}. Triage logic applied.</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => {
                                resetGlobalFilters();
                                setShowReassurance(false);
                                setFilter('status', 'All');
                                setFilter('range', 'Today');
                            }}
                            className="px-5 py-2.5 bg-white border border-outline/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-main hover:bg-primary hover:text-white transition-all flex items-center gap-2 shadow-sm"
                        >
                            Reset Registry <X size={14} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* 🛰️ Telemetry Matrix (8px Gaps) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
                <KpiCard key={i} {...s} className="rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 bg-surface-bright border-outline/5" />
            ))}
        </div>

        {/* 🔍 Command Console */}
        <div className="rounded-[32px] overflow-hidden">
            <AppointmentFilters 
                filters={filters} 
                setFilter={setFilter} 
            />
        </div>

        {/* 🏢 Main Registry Registry Viewport */}
        <div className="flex flex-col gap-8 pb-12">
            <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-outline/20" />
                <span className="text-[10px] font-black text-text-sub uppercase tracking-[0.3em]">
                   Registry Partition
                </span>
                <div className="h-[1px] flex-1 bg-outline/20" />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                  key={filters.view}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-[32px] overflow-hidden"
                >
                    {error ? (
                        <div className="bg-error/5 border border-error/20 rounded-[32px] p-20 flex flex-col items-center justify-center text-center gap-6 shadow-sm">
                            <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center text-error mb-2">
                                <AlertCircle size={32} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-black text-text-main">Operational Pipeline Interrupted</h3>
                                <p className="text-sm font-medium text-text-sub max-w-[400px]">Unable to synchronize clinical slots. Please check your network context.</p>
                            </div>
                            <Button variant="outlined" className="rounded-xl border-error/20 text-error hover:bg-error hover:text-white" onClick={() => window.location.reload()}>Retry Sync</Button>
                        </div>
                    ) : filters.view === 'calendar' ? (
                       <CalendarView 
                         appointments={appointments} 
                         isLoading={isLoading}
                         onSelection={handleSelection} 
                         onReschedule={(id, date, time) => rescheduleAppointment({ id, date, time })} 
                       />
                    ) : (
                       <AgendaView 
                         appointments={appointments} 
                         isLoading={isLoading}
                         onSelection={handleSelection} 
                         onEdit={handleSelection}
                         onDelete={(id) => cancelAppointment(id)}
                       />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>

        {/* 📋 Clinical Interaction Shards */}
        <MaterialSideSheet 
            isOpen={isSheetOpen} 
            onClose={() => setIsSheetOpen(false)}
            title="Registry Scheduler"
            subtitle="Secure allocation of clinical resources"
        >
            <SmartScheduler 
              onSubmit={handleCreate} 
              onCancel={() => setIsSheetOpen(false)}
              isSubmitting={isCreating}
            />
        </MaterialSideSheet>

        <MaterialSideSheet 
            isOpen={!!selectedAppt} 
            onClose={handleCloseDetail}
            title={selectedAppt?.patient}
            subtitle={`Case ID: ${selectedAppt?.id}`}
        >
            <AppointmentDetailView 
                appointment={selectedAppt} 
                onStatusUpdate={(status) => {
                    // Logic for status update
                }} 
                onClose={handleCloseDetail} 
            />
        </MaterialSideSheet>

      </motion.div>
    </AdminPage>
  );
}
