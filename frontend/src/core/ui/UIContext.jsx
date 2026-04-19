import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useUIStore } from '@/core/store/useUIStore';

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const [isSanaActive, setIsSanaActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  // 🛰️ Redirect Sidebar Logic to Central Store (Optimized Selectors)
  // Use discrete selectors to ensure stability and prevent infinite re-renders.
  const isSidebarExpanded = useUIStore(s => s.isSidebarExpanded);
  const setSidebarExpanded = useUIStore(s => s.setSidebarExpanded);
  const toggleSidebarCollapse = useUIStore(s => s.toggleSidebar);

  // Derived state to maintain backward compatibility with legacy consumers
  const isSidebarCollapsed = !isSidebarExpanded;
  const setIsSidebarCollapsed = useCallback((collapsed) => {
    setSidebarExpanded(!collapsed);
  }, [setSidebarExpanded]);

  // 🎨 Material 3 Theme Management
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('shifaa_theme');
    return saved || 'light';
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  // Global Telemetry Sinks
  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  // Apply Theme to Document Element
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('shifaa_theme', theme);
  }, [theme]);

  // Optimized Responsive Listener (Throttled Discrete State)
  useEffect(() => {
    let timeoutId = null;
    const handleResize = () => {
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        const mobile = width < 1024;
        
        setIsMobile(mobile);
        
        // Let the central store manage responsive breakpoints for consistency
        const { setSidebarExpanded } = useUIStore.getState();
        if (width < 1280 && width >= 1024) setSidebarExpanded(false);
        else if (width >= 1280) setSidebarExpanded(true);
        
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
    removeNotification,
    globalLoading,
    setGlobalLoading,
    globalError,
    setGlobalError,
    theme,
    setTheme
  }), [
    isSanaActive, 
    isMobile, 
    isSidebarCollapsed, 
    setIsSidebarCollapsed,
    toggleSidebarCollapse,
    isMobileMenuOpen, 
    notifications, 
    toggleSana, 
    toggleMobileMenu, 
    addNotification, 
    removeNotification,
    globalLoading,
    globalError,
    theme
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
