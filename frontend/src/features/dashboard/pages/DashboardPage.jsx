import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';
import DashboardHeader from '../components/DashboardHeader';
import FilterChips from '../components/FilterChips';
import StatusRail from '../components/StatusRail';
import AnalyticsHub from '../components/AnalyticsHub';
import OperationalRegistry from '../components/OperationalRegistry';
import SystemTelemetry from '../components/SystemTelemetry';
import InventoryAlerts from '../components/InventoryAlerts';
import AddAppointmentModal from '../components/AddAppointmentModal';
import AddPatientSheet from '../components/AddPatientSheet';

export default function DashboardPage() {
    const [searchParams] = useSearchParams();
    const unitFilter = searchParams.get('unit') || 'All Units';
    const [isApptOpen, setIsApptOpen] = useState(false);
    const [isPatientOpen, setIsPatientOpen] = useState(false);
    const [isDoctorOpen, setIsDoctorOpen] = useState(false);

    return (
        <AdminPage className="bg-surface">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.2 }}
               className="w-full flex flex-col gap-10"
            >
                <div className="flex flex-col">
                    <DashboardHeader 
                        onNewAppointment={() => setIsApptOpen(true)}
                        onAddPatient={() => setIsPatientOpen(true)}
                        onAddDoctor={() => setIsDoctorOpen(true)}
                    />
                    <div className="mt-8">
                        <FilterChips />
                    </div>
                </div>
                <StatusRail unit={unitFilter} />
                <AnalyticsHub unit={unitFilter} />
                <div className="grid grid-cols-12 gap-8">
                    <OperationalRegistry unit={unitFilter} />
                </div>
                <div className="grid grid-cols-12 gap-8 pb-16">
                    <SystemTelemetry />
                    <InventoryAlerts />
                </div>
                <AddAppointmentModal isOpen={isApptOpen} onClose={() => setIsApptOpen(false)} />
                <AddPatientSheet isOpen={isPatientOpen} onClose={() => setIsPatientOpen(false)} />
                <AddPatientSheet isOpen={isDoctorOpen} onClose={() => setIsDoctorOpen(false)} title="Register New Doctor" />
            </motion.div>
        </AdminPage>
    );
}
