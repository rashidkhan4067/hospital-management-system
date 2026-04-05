/**
 * 🏥 WARD & BED CONSTANTS
 * Enforces visual consistency across the clinical matrix.
 */

export const BED_STATUS = {
    AVAILABLE: { 
        id: 'available', 
        label: 'Available', 
        color: 'bg-emerald-500', 
        bg: 'bg-emerald-50', 
        border: 'border-emerald-200', 
        text: 'text-emerald-700' 
    },
    OCCUPIED: { 
        id: 'occupied', 
        label: 'Occupied', 
        color: 'bg-rose-500', 
        bg: 'bg-rose-50', 
        border: 'border-rose-200', 
        text: 'text-rose-700' 
    },
    RESERVED: { 
        id: 'reserved', 
        label: 'Reserved', 
        color: 'bg-amber-500', 
        bg: 'bg-amber-50', 
        border: 'border-amber-200', 
        text: 'text-amber-700' 
    },
    MAINTENANCE: { 
        id: 'maintenance', 
        label: 'Maintenance', 
        color: 'bg-slate-400', 
        bg: 'bg-slate-50', 
        border: 'border-slate-200', 
        text: 'text-slate-600' 
    },
    ICU: { 
        id: 'icu', 
        label: 'ICU / Critical', 
        color: 'bg-violet-500', 
        bg: 'bg-violet-50', 
        border: 'border-violet-200', 
        text: 'text-violet-700' 
    }
};

export const WARD_TYPES = [
    { id: 'ALL', label: 'All Wards' },
    { id: 'GENERAL', label: 'General' },
    { id: 'ICU', label: 'ICU' },
    { id: 'PRIVATE', label: 'Private' }
];

export const ADMISSION_STATUS = [
    { id: 'ALL', label: 'All History' },
    { id: 'ACTIVE', label: 'Active Nodes' },
    { id: 'DISCHARGED', label: 'Historical' },
    { id: 'TRANSFERRED', label: 'Migrations' }
];
