import React, { useState, useMemo } from 'react';
import { 
    Eye, 
    Edit3, 
    Trash2, 
    ChevronLeft, 
    ChevronRight, 
    ArrowUpDown,
    User,
    Clock,
    UserCheck
} from 'lucide-react';
import { 
    AdminTable, 
    Badge, 
    Button, 
    IconButton, 
    EmptyState 
} from '@/components/primitives';

/**
 * 🛰️ AppointmentTable (Senior React Hub)
 * Optimized for high-density clinical registries across all device viewports.
 * Features deterministic sorting and adaptive pagination footprints.
 */
export default function AppointmentTable({ 
    appointments = [], 
    onSelection, 
    onEdit, 
    onDelete 
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: 'time', direction: 'asc' });
    const itemsPerPage = 7;

    const sortedData = useMemo(() => {
        let sortableItems = [...appointments];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [appointments, sortConfig]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getStatusColor = (status) => {
        const mapping = {
            confirmed: 'bg-success/10 text-success border-success/20',
            pending: 'bg-warning/10 text-warning border-warning/20',
            waiting: 'bg-primary/10 text-primary border-primary/20',
            completed: 'bg-outline/20 text-text-sub border-outline/30',
            cancelled: 'bg-error/10 text-error border-error/20'
        };
        return mapping[status.toLowerCase()] || 'bg-outline/10 text-text-sub';
    };

    const columns = [
        {
            header: () => (
                <button onClick={() => requestSort('patient')} className="flex items-center gap-2 group">
                    Patient Name <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            ),
            accessorKey: 'patient',
            cell: (val) => (
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <User size={18} />
                    </div>
                    <span className="font-extrabold text-text-main tracking-tight whitespace-nowrap">{val}</span>
                </div>
            )
        },
        {
            header: 'Clinician',
            accessorKey: 'doctor',
            cell: (val) => (
                <div className="flex items-center gap-2">
                    <UserCheck size={14} className="text-primary/60" />
                    <span className="text-[11px] font-bold text-text-sub whitespace-nowrap">{val}</span>
                </div>
            )
        },
        {
            header: () => (
                <button onClick={() => requestSort('time')} className="flex items-center gap-2 group">
                    Slot <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            ),
            accessorKey: 'time',
            cell: (val, row) => (
                <div className="flex flex-col">
                    <span className="text-sm font-black text-text-main leading-tight">{val}</span>
                    <span className="text-[10px] font-bold text-text-sub uppercase tracking-wider">{row.date}</span>
                </div>
            )
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (val) => (
                <Badge className={`${getStatusColor(val)} px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border`}>
                    {val}
                </Badge>
            )
        },
        {
            header: 'Actions',
            accessorKey: 'id',
            cell: (id, row) => (
                <div className="flex items-center gap-1">
                    <IconButton 
                        icon={Eye} 
                        onClick={(e) => { e.stopPropagation(); onSelection(row); }} 
                        className="text-text-sub hover:text-primary"
                    />
                    <IconButton 
                        icon={Edit3} 
                        onClick={(e) => { e.stopPropagation(); onEdit(row); }} 
                        className="text-text-sub hover:text-warning"
                    />
                    <IconButton 
                        icon={Trash2} 
                        onClick={(e) => { e.stopPropagation(); onDelete(id); }} 
                        className="text-text-sub hover:text-error"
                    />
                </div>
            )
        }
    ];

    if (appointments.length === 0) {
        return (
            <div className="bg-surface-bright border border-outline/30 rounded-[32px] p-20 flex items-center justify-center">
                <EmptyState title="Registry Empty" message="No appointment records found for the current filter." />
            </div>
        );
    }

    return (
        <div className="bg-surface-bright border border-outline/30 rounded-[32px] overflow-hidden shadow-2xl shadow-primary/5">
            
            {/* 📟 Registry Table (Horizontal Scroll Resilience Inherited from AdminTable) */}
            <div className="p-2 sm:p-4 overflow-hidden">
                <AdminTable 
                    data={paginatedData} 
                    columns={columns} 
                    onRowClick={onSelection}
                    className="border-none"
                />
            </div>

            {/* 📄 Pagination Orchestrator (Adaptive Fluid Stacking) */}
            <div className="px-5 sm:px-8 py-4 sm:py-5 bg-surface/30 border-t border-outline/10 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
                <div className="flex items-center gap-2 order-2 sm:order-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-sub">Registry Phase</span>
                    <span className="text-xs font-black text-primary flex items-center gap-1">
                        {currentPage} <span className="opacity-20">/</span> {totalPages}
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 order-1 sm:order-2 w-full sm:w-auto justify-center">
                    <Button 
                        variant="outlined" 
                        size="sm" 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(c => Math.max(1, c - 1))}
                        className="rounded-xl h-10 px-6 gap-2 border-outline/20 text-text-sub flex-1 sm:flex-none font-bold text-[10px] uppercase tracking-widest"
                    >
                        <ChevronLeft size={14} /> <span className="hidden sm:inline">Prev</span>
                    </Button>
                    
                    <Button 
                        variant="outlined" 
                        size="sm" 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(c => Math.min(totalPages, c + 1))}
                        className="rounded-xl h-10 px-6 gap-2 border-outline/20 text-text-sub flex-1 sm:flex-none font-bold text-[10px] uppercase tracking-widest"
                    >
                        <span className="hidden sm:inline">Next</span> <ChevronRight size={14} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
