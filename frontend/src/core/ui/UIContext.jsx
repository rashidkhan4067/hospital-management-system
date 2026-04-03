import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const [isSanaActive, setIsSanaActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  // Persist Sidebar State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    return saved ? JSON.parse(saved) : (window.innerWidth < 1280);
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Save Sidebar State
  useEffect(() => {
    localStorage.setItem('sidebar_collapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  // Optimized Responsive Listener (Throttled Discrete State)
  useEffect(() => {
    let timeoutId = null;
    const handleResize = () => {
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        const mobile = width < 1024;
        
        setIsMobile(mobile);
        
        // Auto-collapse on smaller screens, expand on large
        if (width < 1280 && width >= 1024) setIsSidebarCollapsed(true);
        else if (width >= 1280) setIsSidebarCollapsed(false);
        
        if (width >= 1024) setIsMobileMenuOpen(false); 
        
        timeoutId = null;
      }, 150); // 150ms throttle for ultra-smooth resize
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const toggleSana = useCallback(() => setIsSanaActive(prev => !prev), []);
  const toggleSidebarCollapse = useCallback(() => setIsSidebarCollapsed(prev => !prev), []);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);
  
  const addNotification = useCallback((title, message = '', type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // 💎 Ultra-Performance Memoization: Prevent global re-renders
  const contextValue = useMemo(() => ({
    isSanaActive, 
    setIsSanaActive, 
    toggleSana,
    isMobile,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    toggleSidebarCollapse,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,
    notifications,
    addNotification,
    removeNotification
  }), [
    isSanaActive, 
    isMobile, 
    isSidebarCollapsed, 
    isMobileMenuOpen, 
    notifications, 
    toggleSana, 
    toggleSidebarCollapse, 
    toggleMobileMenu, 
    addNotification, 
    removeNotification
  ]);

  return (
    <UIContext.Provider value={contextValue}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
};
