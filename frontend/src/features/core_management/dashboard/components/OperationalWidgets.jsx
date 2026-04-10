import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '@/core/store/useDataStore';
import { UserCog, Bed, Activity, Microscope, ArrowUpRight } from 'lucide-react';
import { MiniWidget } from '@/components/primitives';

const widgets = [
    { id: 'opd', title: 'OPD Patients', value: '42', subValue: '12 Emergency', icon: UserCog, color: 'text-blue-600', route: '/admin/appointments', filter: { department: 'OPD' } },
    { id: 'ipd', title: 'IPD Admissions', value: '18', subValue: '8 Today', icon: Bed, color: 'text-emerald-600', route: '/admin/analytics', filter: { type: 'distribution', department: 'IPD' } },
    { id: 'doctors', title: 'Active Doctors', value: '24', subValue: '6 On Call', icon: Activity, color: 'text-amber-600', route: '/admin/analytics', filter: { type: 'schedule', status: 'active' } },
    { id: 'lab', title: 'Pending Tests', value: '156', subValue: '14 Critical', icon: Microscope, color: 'text-rose-600', route: '/admin/analytics', filter: { type: 'distribution', status: 'pending' } }
];

/**
 * 🏗️ OperationalWidgets (MD3 Matrix)
 * Implements strict 8px alignment (gap-8) and high-density tactical oversight.
 */
const OperationalWidgets = () => {
    const navigate = useNavigate();
    const setFilters = useDataStore(state => state.setFilters);

    const handleAction = (widget) => {
        if (widget.filter) {
            setFilters({ 
                department: widget.filter.department || 'All',
                status: widget.filter.status || 'all'
            });
        }
        
        // Context-aware navigation
        const path = widget.filter?.type 
            ? `${widget.route}?type=${widget.filter.type}` 
            : widget.route;
            
        navigate(path);
    };

    return (
        <section className="grid grid-cols-12 gap-8 items-end">
            {/* 🛰️ Section Identification Node */}
            <div className="col-span-12 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                        <span className="text-[10px] font-black uppercase text-text-sub tracking-[0.25em] opacity-60">Tactical Matrix</span>
                    </div>
                    <h3 className="text-2xl font-black text-text-main tracking-tighter">Operational Readiness</h3>
                </div>
                
                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest cursor-pointer hover:opacity-70 transition-opacity">
                    View Registry <ArrowUpRight size={14} />
                </div>
            </div>

            {/* 📟 Intelligence Shard Matrix */}
            <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {widgets.map((widget, idx) => (
                    <motion.div
                        key={widget.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="h-full"
                    >
                        <MiniWidget 
                            {...widget}
                            onClick={() => handleAction(widget)}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default OperationalWidgets;
