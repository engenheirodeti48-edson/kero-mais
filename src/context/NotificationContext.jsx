import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((config) => {
    setNotification({
      id: Date.now(),
      title: config.title || 'Aviso',
      message: config.message || '',
      type: config.type || 'info', // success, error, info, warning
      icon: config.icon || null,
      action: config.action || null, // botão extra opcional
      onClose: config.onClose || null
    });
  }, []);

  const closeNotification = useCallback(() => {
    if (notification?.onClose) notification.onClose();
    setNotification(null);
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ showNotification, closeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};