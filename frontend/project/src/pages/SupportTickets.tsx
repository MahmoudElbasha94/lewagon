import React, { useState } from 'react';
import {
  Ticket as TicketIcon,
  MessageCircle,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  ChevronDown,
  Send,
  MessageSquare,
} from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import { useSupport, Ticket as SupportTicket } from '../contexts/SupportContext';
import { useAuth } from '../contexts/AuthContext';

interface TicketMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    role: 'user' | 'admin';
  };
  timestamp: string;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
  responses?: {
    id: string;
    message: string;
    isStaff: boolean;
    createdAt: string;
  }[];
}

interface TicketFilters {
  status: 'all' | 'open' | 'closed';
  priority: 'all' | 'high' | 'medium' | 'low';
  search: string;
}

const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Video playback issue',
    description: 'Cannot play video in lesson 3 of the course...',
    status: 'open',
    priority: 'high',
    category: 'technical',
    userId: 'user-1',
    createdAt: '2024-03-10T10:30:00',
    updatedAt: '2024-03-10T10:30:00',
    messages: [
      {
        id: 'msg-1',
        content: 'Cannot play video in lesson 3 of the course...',
        sender: {
          id: 'user-1',
          name: 'John Smith',
          role: 'user',
        },
        timestamp: '2024-03-10T10:30:00',
      },
    ],
    responses: [],
  },
  // Add more tickets
];

const SupportTickets: React.FC = () => {
  const { user } = useAuth();
  const { tickets, updateTicket, addResponse } = useSupport();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: ''
  });

  const filteredTickets = tickets?.filter(ticket => {
    const matchesStatus = filters.status === 'all' || ticket.status === filters.status;
    const matchesPriority = filters.priority === 'all' || ticket.priority === filters.priority;
    const matchesSearch = 
      ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleReply = async (ticketId: string) => {
    if (!replyText.trim() || !user) return;

    try {
      await addResponse(ticketId, user.id, replyText, user.role === 'admin');
      setReplyText('');
      setSelectedTicket(null);
    } catch (error) {
      console.error('Failed to add reply:', error);
    }
  };

  const handleStatusChange = async (ticketId: string, newStatus: SupportTicket['status']) => {
    try {
      await updateTicket(ticketId, newStatus);
    } catch (error) {
      console.error('Failed to update ticket status:', error);
    }
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTransition>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Support Tickets</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search tickets..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="px-4 py-2 border rounded-lg"
            />
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as TicketFilters['status'] }))}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={filters.priority}
              onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value as TicketFilters['priority'] }))}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-6">
          {filteredTickets?.map(ticket => (
            <div key={ticket.id} className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{ticket.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {ticket.userId}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        ticket.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {ticket.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(ticket.id, ticket.status === 'open' ? 'closed' : 'open')}
                      className={`p-2 rounded-full ${
                        ticket.status === 'open'
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                    >
                      {ticket.status === 'open' ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        <CheckCircle className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="prose max-w-none mb-6">
                  <p className="text-gray-600">{ticket.description}</p>
                </div>

                {ticket.status === 'open' && (
                  <div className="mt-4">
                    {selectedTicket === ticket.id ? (
                      <div className="space-y-4">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your reply..."
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          rows={3}
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedTicket(null);
                              setReplyText('');
                            }}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleReply(ticket.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            Send Reply
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedTicket(ticket.id)}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Reply
                      </button>
                    )}
                  </div>
                )}

                {/* Display responses */}
                {ticket.responses && ticket.responses.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <h4 className="font-semibold text-gray-700">Responses</h4>
                    {ticket.responses.map(response => (
                      <div key={response.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                          <span>{response.isStaff ? 'Support Staff' : 'User'}</span>
                          <span>{new Date(response.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-gray-700">{response.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredTickets?.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
              <p className="text-gray-500">No support tickets match your current filters.</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default SupportTickets; 