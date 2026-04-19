import React, { useState, useEffect } from 'react';
import MaterialDialog from '@/components/primitives/MaterialDialog';
import { useModalStore } from '@/core/store/useModalStore';
import { useUIStore } from '@/core/store/useUIStore';
import api from '@/core/api/apiClient';
import { useDashboardData } from '@/features/core_management/dashboard/hooks/useDashboardData';
import { 
  UserPlus, CalendarPlus, BedDouble, ReceiptText, 
  FlaskConical, AlertCircle, X, ChevronRight, Loader2
} from 'lucide-react';
import AddPatientForm from './forms/AddPatientForm';
import BookAppointmentForm from './forms/BookAppointmentForm';
import AdmitPatientForm from './forms/AdmitPatientForm';
import NewInvoiceForm from './forms/NewInvoiceForm';
import LabOrderForm from './forms/LabOrderForm';

const MODAL_REGISTRY = {
  'ADD_PATIENT': {
    title: 'Patient Registration',
    subtitle: 'Onboard new patient to system registry',
    icon: UserPlus,
    component: AddPatientForm,
    endpoint: 'patients/profiles/', 
    method: 'POST',
    submitLabel: 'Register Patient'
  },
  'BOOK_APPOINTMENT': {
    title: 'Schedule Appointment',
    subtitle: 'Temporal slot allocation for clinical consults',
    icon: CalendarPlus,
    component: BookAppointmentForm,
    endpoint: 'appointments/', 
    method: 'POST',
    submitLabel: 'Confirm Booking'
  },
  'ADMIT_PATIENT': {
    title: 'Clinical Admission',
    subtitle: 'Admit patient to hospital (IPD)',
    icon: BedDouble,
    component: AdmitPatientForm,
    endpoint: 'wards/beds/', 
    method: 'PATCH',
    submitLabel: 'Admit Patient'
  },
  'NEW_INVOICE': {
    title: 'Generate Invoice',
    subtitle: 'Fiscal shard generation for medical billing',
    icon: ReceiptText,
    component: NewInvoiceForm,
    endpoint: 'finance/invoices/', 
    method: 'POST',
    submitLabel: 'Generate'
  },
  'LAB_ORDER': {
    title: 'Lab Requisition',
    subtitle: 'Diagnostic test requisition matrix',
    icon: FlaskConical,
    component: LabOrderForm,
    endpoint: 'lab/results/', 
    method: 'POST',
    submitLabel: 'Create Order'
  }
};

export default function GlobalModalContainer() {
  const { activeModal, closeModal, modalStack } = useModalStore();
  const addNotification = useUIStore((state) => state.addNotification);
  const { refetch } = useDashboardData();
  
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    isValid: false,
    data: {},
    title: '',
    subtitle: '',
    submitLabel: ''
  });
  const [formErrors, setFormErrors] = useState({});

  if (!activeModal) return null;

  const config = MODAL_REGISTRY[activeModal.type];
  if (!config) return null;

  const Icon = config.icon || AlertCircle;
  const FormComponent = config.component;

  const handleFormStateChange = (state) => {
    setFormState(prev => ({ ...prev, ...state }));
  };

  const handleClose = () => {
    if (Object.keys(formState.data).length > 0) {
      if (!window.confirm("Discard changes? Unsaved clinical data will be lost.")) return;
    }
    closeModal();
  };

  const handleRegistrySubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formState.isValid || loading) return;

    setFormErrors({});
    setLoading(true);
    
    try {
      const response = await api({
          method: config.method,
          url: config.endpoint,
          data: formState.data
      });

      addNotification("Success", formState.successMessage || "Process completed successfully.", "success");
      
      // Atomic Cleanup & Refresh
      if (refetch) refetch();
      closeModal();
      
      if (activeModal.props?.onSuccess) activeModal.props.onSuccess(response.data);
    } catch (err) {
      setFormErrors(err.response?.data || {});
      addNotification("Error", "Action failed. Please verify entries.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MaterialDialog 
      isOpen={!!activeModal} 
      onClose={handleClose} 
      maxWidth="max-w-4xl"
      title={
        <div className="flex items-center justify-between w-full pr-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[18px] bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/5">
                    <Icon size={24} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                    <span className="font-black text-[20px] text-text-main tracking-tight leading-none">
                        {formState.title || config.title}
                    </span>
                    <span className="text-[12px] font-bold text-text-sub opacity-50 mt-1">
                        {formState.subtitle || config.subtitle}
                    </span>
                </div>
            </div>
        </div>
      }
      footerActions={
        <div className="flex items-center justify-end gap-4 w-full pt-2 border-t border-outline/5 px-2">
          <button 
            onClick={handleClose} 
            className="px-6 py-2.5 text-[14px] font-black text-text-sub hover:bg-surface-variant/30 rounded-2xl transition-all duration-200"
          >
            Cancel
          </button>
          <button 
            onClick={handleRegistrySubmit} 
            disabled={!formState.isValid || loading}
            className={`
                px-8 py-2.5 rounded-[18px] text-[14px] font-black flex items-center gap-2 shadow-lg shadow-primary/10 transition-all duration-300
                ${formState.isValid && !loading 
                    ? 'bg-primary text-white hover:scale-[1.02] active:scale-[0.98]' 
                    : 'bg-surface-variant text-text-sub opacity-50 cursor-not-allowed'
                }
            `}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <ChevronRight size={18} />}
            {formState.submitLabel || config.submitLabel}
          </button>
        </div>
      }
    >
      <div className="mt-2 min-h-[400px]">
        <FormComponent 
          onFormStateChange={handleFormStateChange}
          formErrors={formErrors}
          {...activeModal.props} 
        />
      </div>
    </MaterialDialog>
  );
}
