import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Users,
  DollarSign,
  Star,
  Eye,
  ShoppingCart,
  Plus,
  Book,
  Bell,
  Settings,
  BarChart,
  FileText,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import { InstructorStats, InstructorNotification } from '../types/instructor';

// Mock data - replace with actual API calls
const mockStats: InstructorStats = {
  totalStudents: 1250,
  totalRevenue: 25000,
  totalCourses: 5,
  averageRating: 4.8,
  totalViews: 15000,
  totalSales: 850,
  revenueByMonth: [
    { month: 'Jan', revenue: 2500 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 4500 },
  ],
  salesByMonth: [
    { month: 'Jan', sales: 85 },
    { month: 'Feb', sales: 120 },
    { month: 'Mar', sales: 150 },
  ],
  topCourses: [
    {
      id: '1',
      title: 'Advanced Web Development',
      sales: 350,
      revenue: 12000,
      rating: 4.9,
    },
    {
      id: '2',
      title: 'UI/UX Design Masterclass',
      sales: 280,
      revenue: 8000,
      rating: 4.7,
    },
  ],
};

const mockNotifications: InstructorNotification[] = [
  {
    id: '1',
    type: 'review',
    title: 'New Course Review',
    message: 'John Doe left a 5-star review on Advanced Web Development',
    date: '2024-03-15T10:30:00Z',
    read: false,
    courseId: '1',
    courseName: 'Advanced Web Development',
    studentName: 'John Doe',
  },
  {
    id: '2',
    type: 'sale',
    title: 'New Course Sale',
    message: 'Your course "UI/UX Design Masterclass" was purchased',
    date: '2024-03-15T09:15:00Z',
    read: false,
    courseId: '2',
    courseName: 'UI/UX Design Masterclass',
  },
];

const InstructorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const stats = [
    {
      title: 'Total Students',
      value: mockStats.totalStudents.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(mockStats.totalRevenue),
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Average Rating',
      value: mockStats.averageRating.toFixed(1),
      icon: Star,
      color: 'bg-yellow-500',
    },
    {
      title: 'Total Views',
      value: mockStats.totalViews.toLocaleString(),
      icon: Eye,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Sales',
      value: mockStats.totalSales.toLocaleString(),
      icon: ShoppingCart,
      color: 'bg-pink-500',
    },
    {
      title: 'Total Courses',
      value: mockStats.totalCourses.toString(),
      icon: Book,
      color: 'bg-indigo-500',
    },
  ];

  const quickActions = [
    {
      title: 'Create New Course',
      description: 'Start building a new course',
      icon: Plus,
      color: 'bg-blue-500',
      onClick: () => navigate('/instructor/courses/new'),
    },
    {
      title: 'View Analytics',
      description: 'Check your course performance',
      icon: BarChart,
      color: 'bg-green-500',
      onClick: () => navigate('/instructor/analytics'),
    },
    {
      title: 'Review Management',
      description: 'Manage student reviews',
      icon: Star,
      color: 'bg-yellow-500',
      onClick: () => navigate('/instructor/reviews'),
    },
    {
      title: 'Course Management',
      description: 'Manage your existing courses',
      icon: FileText,
      color: 'bg-purple-500',
      onClick: () => navigate('/instructor/courses'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/instructor/notifications')}
              icon={<Bell className="w-4 h-4" />}
            >
              Notifications
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/instructor/settings')}
              icon={<Settings className="w-4 h-4" />}
            >
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.onClick}
                className="bg-white rounded-lg shadow-sm p-6 text-left hover:shadow-md transition-shadow"
              >
                <div className={`p-3 rounded-lg ${action.color} w-12 h-12 flex items-center justify-center mb-4`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performing Courses */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top Performing Courses</h2>
            <div className="space-y-4">
              {mockStats.topCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">{course.rating}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-600">{course.sales} sales</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(course.revenue)}</p>
                    <p className="text-sm text-gray-600">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Notifications</h2>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={!notification.read ? { backgroundColor: '#f7f7f7' } : {}}
                  className={`p-4 rounded-lg border ${notification.read ? 'border-gray-100' : 'border-blue-100 bg-blue-50'}`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg ${
                      notification.type === 'review' ? 'bg-yellow-100 text-yellow-600' :
                      notification.type === 'sale' ? 'bg-green-100 text-green-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {notification.type === 'review' ? <Star className="w-5 h-5" /> :
                       notification.type === 'sale' ? <ShoppingCart className="w-5 h-5" /> :
                       <Bell className="w-5 h-5" />}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="font-medium text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard; 