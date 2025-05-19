import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNotifications } from './NotificationContext';
import { useAuth } from './AuthContext';

export interface Ticket {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  responses: TicketResponse[];
}

interface TicketResponse {
  id: string;
  ticketId: string;
  userId: string;
  message: string;
  createdAt: string;
  isStaff: boolean;
}

interface SupportContextType {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  createTicket: (userId: string, title: string, description: string, priority: Ticket['priority']) => Promise<boolean>;
  updateTicket: (ticketId: string, status: Ticket['status']) => Promise<boolean>;
  addResponse: (ticketId: string, userId: string, message: string, isStaff: boolean) => Promise<boolean>;
  getUserTickets: (userId: string) => Ticket[];
  getTicketById: (ticketId: string) => Ticket | null;
}

const SupportContext = createContext<SupportContextType | undefined>(undefined);

export const useSupport = () => {
  const context = useContext(SupportContext);
  if (context === undefined) {
    throw new Error('useSupport must be used within a SupportProvider');
  }
  return context;
};

export const SupportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tickets from local storage on mount
  useEffect(() => {
    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
    setLoading(false);
  }, []);

  // Save tickets to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const createTicket = async (
    userId: string,
    title: string,
    description: string,
    priority: Ticket['priority']
  ): Promise<boolean> => {
    try {
      const newTicket: Ticket = {
        id: Math.random().toString(36).substring(2, 9),
        userId,
        title,
        description,
        status: 'open',
        priority,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        responses: []
      };

      setTickets([...tickets, newTicket]);
      toast.success('Support ticket created successfully');

      // Notify admins about new ticket
      if (user?.role === 'admin') {
        addNotification({
          userId: 'admin',
          title: 'New Support Ticket',
          message: `New ticket created: ${title}`,
          type: 'info',
          link: `/support/${newTicket.id}`
        });
      }

      return true;
    } catch (error) {
      toast.error('Failed to create support ticket');
      return false;
    }
  };

  const updateTicket = async (ticketId: string, status: Ticket['status']): Promise<boolean> => {
    try {
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === ticketId) {
          const updatedTicket = {
            ...ticket,
            status,
            updatedAt: new Date().toISOString()
          };

          // Notify ticket owner about status change
          if (user?.id !== ticket.userId) {
            addNotification({
              userId: ticket.userId,
              title: 'Ticket Status Updated',
              message: `Your ticket "${ticket.title}" has been marked as ${status}`,
              type: 'info',
              link: `/support/${ticketId}`
            });
          }

          return updatedTicket;
        }
        return ticket;
      });

      setTickets(updatedTickets);
      toast.success('Ticket status updated successfully');
      return true;
    } catch (error) {
      toast.error('Failed to update ticket status');
      return false;
    }
  };

  const addResponse = async (
    ticketId: string,
    userId: string,
    message: string,
    isStaff: boolean
  ): Promise<boolean> => {
    try {
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === ticketId) {
          const newResponse: TicketResponse = {
            id: Math.random().toString(36).substring(2, 9),
            ticketId,
            userId,
            message,
            createdAt: new Date().toISOString(),
            isStaff
          };

          const updatedTicket = {
            ...ticket,
            responses: [...ticket.responses, newResponse],
            updatedAt: new Date().toISOString()
          };

          // Notify the other party about the new response
          const notificationUserId = isStaff ? ticket.userId : 'admin';
          const notificationTitle = isStaff ? 'Support Staff Response' : 'New User Response';
          
          addNotification({
            userId: notificationUserId,
            title: notificationTitle,
            message: `New response on ticket "${ticket.title}"`,
            type: 'info',
            link: `/support/${ticketId}`
          });

          return updatedTicket;
        }
        return ticket;
      });

      setTickets(updatedTickets);
      toast.success('Response added successfully');
      return true;
    } catch (error) {
      toast.error('Failed to add response');
      return false;
    }
  };

  const getUserTickets = (userId: string): Ticket[] => {
    return tickets.filter(ticket => ticket.userId === userId);
  };

  const getTicketById = (ticketId: string): Ticket | null => {
    return tickets.find(ticket => ticket.id === ticketId) || null;
  };

  const value = {
    tickets,
    loading,
    error,
    createTicket,
    updateTicket,
    addResponse,
    getUserTickets,
    getTicketById
  };

  return (
    <SupportContext.Provider value={value}>
      {children}
    </SupportContext.Provider>
  );
};

// TODO: في Django، سيتم استخدام:
// 1. Django Admin بدلاً من Support Context
// 2. Django Forms بدلاً من Support Forms
// 3. Django Email Backend بدلاً من Support Emails
// 4. Django Messages بدلاً من Support Messages
// 5. Django Templates بدلاً من Support UI
// ... existing code ... 