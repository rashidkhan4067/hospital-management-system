import React, { createContext, useContext, useState, useEffect } from 'react';

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const [isSanaActive, setIsSanaActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Persist Sidebar State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Save Sidebar State
  useEffect(() => {
    localStorage.setItem('sidebar_collapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  // Responsive Listeners (Reactive Window Width)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 1280 && window.innerWidth >= 1024) setIsSidebarCollapsed(true);
      else if (window.innerWidth >= 1280) setIsSidebarCollapsed(false);
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false); 
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSana = () => setIsSanaActive(prev => !prev);
  const toggleSidebarCollapse = () => setIsSidebarCollapsed(prev => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  
  const addNotification = (title, message = '', type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, message, type }]);
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
      windowWidth,
      isSidebarCollapsed,
      setIsSidebarCollapsed,
      toggleSidebarCollapse,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      toggleMobileMenu,
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
