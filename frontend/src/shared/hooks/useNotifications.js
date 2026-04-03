import { useState, useCallback } from 'react';

/**
 * useNotifications
 * Lightweight in-app notification queue.
 * Used by pages to show transient success/error toasts.
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((title, message, type = 'info') => {
    const id = Date.now() + Math.random();
    const notification = { id, title, message, type };

    setNotifications(prev => [...prev, notification]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
  };
};

export default useNotifications;
