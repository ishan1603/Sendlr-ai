"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import Notification, { NotificationProps } from "@/components/Notification";

interface NotificationContextType {
  showNotification: (
    notification: Omit<NotificationProps, "id" | "onClose">
  ) => void;
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
  showWarning: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<
    (NotificationProps & { id: string })[]
  >([]);

  const showNotification = (
    notification: Omit<NotificationProps, "id" | "onClose">
  ) => {
    const id = Date.now().toString();
    const newNotification = {
      ...notification,
      id,
      onClose: removeNotification,
    };

    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const showSuccess = (title: string, message?: string) => {
    showNotification({ type: "success", title, message });
  };

  const showError = (title: string, message?: string) => {
    showNotification({ type: "error", title, message });
  };

  const showWarning = (title: string, message?: string) => {
    showNotification({ type: "warning", title, message });
  };

  const showInfo = (title: string, message?: string) => {
    showNotification({ type: "info", title, message });
  };

  const contextValue: NotificationContextType = {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <div className="fixed top-0 right-0 z-50 pointer-events-none">
        {notifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <Notification {...notification} />
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
