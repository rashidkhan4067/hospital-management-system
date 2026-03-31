/**
 * @file context/UIContext.jsx
 * @description Global context for UI states like Sana AI activity.
 */
import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const [isSanaActive, setIsSanaActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const toggleSana = () => setIsSanaActive(prev => !prev);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  
  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <UIContext.Provider value={{ 
      isSanaActive, 
      setIsSanaActive, 
      toggleSana,
      isSidebarOpen, 
      setIsSidebarOpen,
      toggleSidebar,
      notifications,
      addNotification,
      removeNotification
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
};
