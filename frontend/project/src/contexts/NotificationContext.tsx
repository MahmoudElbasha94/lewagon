import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { InstructorNotification } from '../types/instructor';
import { useAuth } from './AuthContext';

// Define notification types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  read?: boolean;
  createdAt?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  isConnected: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Socket.IO configuration
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
const RECONNECTION_ATTEMPTS = 5;
const RECONNECTION_DELAY = 3000;
const MAX_NOTIFICATIONS = 50; // Maximum number of notifications to store

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);

  // Calculate unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Load notifications from localStorage
  const loadNotifications = useCallback(() => {
    if (user) {
      try {
        const stored = localStorage.getItem(`notifications_${user.id}`);
        if (stored) {
          const parsedNotifications = JSON.parse(stored);
          setNotifications(parsedNotifications.slice(0, MAX_NOTIFICATIONS));
        }
      } catch (error) {
        console.error('Failed to load notifications from localStorage:', error);
      }
    }
  }, [user]);

  // Save notifications to localStorage
  const saveNotifications = useCallback((notifs: Notification[]) => {
    if (user) {
      try {
        localStorage.setItem(
          `notifications_${user.id}`,
          JSON.stringify(notifs.slice(0, MAX_NOTIFICATIONS))
        );
      } catch (error) {
        console.error('Failed to save notifications to localStorage:', error);
      }
    }
  }, [user]);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (user) {
      const initializeSocket = () => {
        try {
          const newSocket = io(SOCKET_URL, {
            auth: {
              userId: user.id
            },
            reconnectionAttempts: RECONNECTION_ATTEMPTS,
            reconnectionDelay: RECONNECTION_DELAY,
            timeout: 10000,
            transports: ['websocket', 'polling'] // Try WebSocket first, fallback to polling
          });

          // Socket event handlers
          newSocket.on('connect', () => {
            console.log('Connected to notification server');
            setIsConnected(true);
            setConnectionAttempts(0);
            setIsReconnecting(false);
          });

          newSocket.on('disconnect', () => {
            console.log('Disconnected from notification server');
            setIsConnected(false);
            if (connectionAttempts < RECONNECTION_ATTEMPTS) {
              setIsReconnecting(true);
            }
          });

          newSocket.on('connect_error', (error) => {
            console.error('Connection error:', error);
            setIsConnected(false);
            setConnectionAttempts(prev => {
              const newAttempts = prev + 1;
              if (newAttempts >= RECONNECTION_ATTEMPTS) {
                console.log('Max reconnection attempts reached, falling back to localStorage only');
                setIsReconnecting(false);
                newSocket.disconnect();
              } else {
                setIsReconnecting(true);
              }
              return newAttempts;
            });
          });

          newSocket.on('error', (error) => {
            console.error('Socket error:', error);
            // Don't disconnect on general errors
          });

          newSocket.on('notification', (notification: Notification) => {
            if (notification.userId === user.id) {
              setNotifications(prev => {
                const newNotifications = [
                  { ...notification, read: false },
                  ...prev.filter(n => n.id !== notification.id)
                ].slice(0, MAX_NOTIFICATIONS);
                saveNotifications(newNotifications);
                return newNotifications;
              });
            }
          });

          setSocket(newSocket);

          return () => {
            newSocket.disconnect();
          };
        } catch (error) {
          console.error('Failed to initialize socket:', error);
          setIsConnected(false);
          setIsReconnecting(false);
        }
      };

      loadNotifications();
      const cleanup = initializeSocket();

      return () => {
        cleanup?.();
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [user, loadNotifications, saveNotifications, connectionAttempts]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 9),
      read: false,
      createdAt: new Date().toISOString()
    };

    setNotifications(prev => {
      const newNotifications = [newNotification, ...prev].slice(0, MAX_NOTIFICATIONS);
      saveNotifications(newNotifications);
      return newNotifications;
    });
  }, [saveNotifications]);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => {
      const updated = prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      );
      saveNotifications(updated);
      return updated;
    });
  }, [saveNotifications]);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(notification => ({ ...notification, read: true }));
      saveNotifications(updated);
      return updated;
    });
  }, [saveNotifications]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    if (user) {
      localStorage.removeItem(`notifications_${user.id}`);
    }
  }, [user]);

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    isConnected
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationProvider;

// TODO: في Django، سيتم استخدام:
// 1. Django Messages Framework بدلاً من Notification Context
// 2. Django Channels بدلاً من Real-time Notifications
// 3. Django Email Backend بدلاً من Email Notifications
// 4. Django Cache بدلاً من Notification State
// 5. Django Signals بدلاً من Notification Events 