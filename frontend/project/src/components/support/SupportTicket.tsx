import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSupport, Ticket } from '../../contexts/SupportContext';

interface SupportTicketProps {
  ticket?: Ticket;
  onClose?: () => void;
}

const SupportTicket: React.FC<SupportTicketProps> = ({ ticket, onClose }) => {
  const { user } = useAuth();
  const { createTicket, addResponse } = useSupport();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Ticket['priority']>('medium');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!ticket) {
      // Create new ticket
      const success = await createTicket(user.id, title, description, priority);
      if (success && onClose) {
        onClose();
      }
    } else {
      // Add response to existing ticket
      const success = await addResponse(ticket.id, user.id, response, user.role === 'admin');
      if (success) {
        setResponse('');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {!ticket ? (
        // New ticket form
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Create Support Ticket</h2>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Ticket['priority'])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      ) : (
        // Existing ticket view
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{ticket.title}</h2>
              <p className="text-sm text-gray-500">
                Created on {new Date(ticket.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                ticket.status === 'open'
                  ? 'bg-green-100 text-green-800'
                  : ticket.status === 'in_progress'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {ticket.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-700">{ticket.description}</p>
          </div>

          {/* Responses */}
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold">Responses</h3>
            {ticket.responses.map((response) => (
              <div
                key={response.id}
                className={`p-4 rounded-lg ${
                  response.isStaff ? 'bg-blue-50 ml-4' : 'bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">
                    {response.isStaff ? 'Support Staff' : 'You'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(response.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700">{response.message}</p>
              </div>
            ))}
          </div>

          {/* Add response form */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <label htmlFor="response" className="block text-sm font-medium text-gray-700">
                Add Response
              </label>
              <textarea
                id="response"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Send Response
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SupportTicket; 