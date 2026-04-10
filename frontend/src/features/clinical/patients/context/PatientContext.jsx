import React, { createContext, useContext, useState, useMemo } from 'react';

const PatientContext = createContext();

/**
 * 🛰️ PatientProvider
 * Global clinical state store for the active active patient profile.
 * Synchronizes history navigation across the master-detail workspace.
 */
export function PatientProvider({ children }) {
  const [activePatientId, setActivePatientId] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const value = useMemo(() => ({
    activePatientId,
    setActivePatientId,
    isSearchOpen,
    setIsSearchOpen
  }), [activePatientId, isSearchOpen]);

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
}

export const usePatientState = () => {
  const context = useContext(PatientContext);
  if (!context) throw new Error('usePatientState must be used within PatientProvider');
  return context;
};
