import React, { useState } from 'react';
import { Bell, CheckCircle, Clock, AlertCircle, MessageCircle, DollarSign } from 'lucide-react';
import PageTransition from '../../components/common/PageTransition';

interface Notification {
  id: string;
  type: 'course_review' | 'student_message' | 'payment' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const Notifications: React.FC = () => {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'course_review',
      title: 'Course Approved',
      message: 'Your course "Advanced Web Development" has been approved and is now live.',
      timestamp: '2024-03-15T10:30:00',
      isRead: false
    },
    {
      id: '2',
      type: 'student_message',
      title: 'New Student Message',
      message: 'John Doe has sent you a message regarding the React module.',
      timestamp: '2024-03-14T15:45:00',
      isRead: false
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Received',
      message: 'You have received a payment of $99.99 for course enrollment.',
      timestamp: '2024-03-14T09:20:00',
      isRead: true
    },
    {
      id: '4',
      type: 'system',
      title: 'System Update',
      message: 'Platform maintenance scheduled for tomorrow at 2 AM UTC.',
      timestamp: '2024-03-13T18:00:00',
      isRead: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'course_review':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'student_message':
        return <MessageCircle className="w-6 h-6 text-blue-500" />;
      case 'payment':
        return <DollarSign className="w-6 h-6 text-yellow-500" />;
      case 'system':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Bell className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <button className="text-sm text-red-500 hover:text-red-600">
            Mark all as read
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start p-4 border-b last:border-b-0 ${
                !notification.isRead ? 'bg-red-50' : ''
              }`}
            >
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                    {notification.title}
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className={`mt-1 text-sm ${!notification.isRead ? 'text-gray-800' : 'text-gray-600'}`}>
                  {notification.message}
                </p>
              </div>
              {!notification.isRead && (
                <div className="ml-4 flex-shrink-0">
                  <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                </div>
              )}
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No notifications yet
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Notifications; 