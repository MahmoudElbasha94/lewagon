import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, BookOpen, DollarSign, TrendingUp,
  Settings, Bell, LogOut, User, Plus,
  BarChart2, PieChart, Calendar, Search,
  Edit, Trash2, CheckCircle, XCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCourses } from '../contexts/CourseContext';
import { Link } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import Button from '../components/common/Button';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { courses } = useCourses();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for admin dashboard
  const stats = {
    totalUsers: 1250,
    totalCourses: courses.length,
    totalRevenue: 45750,
    activeUsers: 890,
    completionRate: 78,
    averageRating: 4.5
  };

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2024-03-15', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2024-03-14', status: 'pending' },
    // Add more mock users as needed
  ];

  const recentTransactions = [
    { 
      id: 1, 
      user: 'John Doe', 
      course: 'Advanced Web Development',
      amount: 99.99,
      date: '2024-03-15',
      status: 'completed'
    },
    // Add more mock transactions as needed
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Dashboard Header */}
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-gray-600">Manage your platform</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Bell className="h-6 w-6 text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Settings className="h-6 w-6 text-gray-600" />
                </button>
                <button 
                  onClick={logout}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <LogOut className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary-100 rounded-full p-3">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <span className="text-sm text-gray-500">Total Users</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">{stats.totalUsers}</h3>
                  <p className="text-gray-600">Active: {stats.activeUsers}</p>
                </div>
                <div className="text-success-500">+12%</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-success-100 rounded-full p-3">
                  <BookOpen className="h-6 w-6 text-success-600" />
                </div>
                <span className="text-sm text-gray-500">Total Courses</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">{stats.totalCourses}</h3>
                  <p className="text-gray-600">Published</p>
                </div>
                <div className="text-success-500">+5%</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-warning-100 rounded-full p-3">
                  <DollarSign className="h-6 w-6 text-warning-600" />
                </div>
                <span className="text-sm text-gray-500">Total Revenue</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">${stats.totalRevenue}</h3>
                  <p className="text-gray-600">This month</p>
                </div>
                <div className="text-success-500">+8%</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-info-100 rounded-full p-3">
                  <TrendingUp className="h-6 w-6 text-info-600" />
                </div>
                <span className="text-sm text-gray-500">Completion Rate</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">{stats.completionRate}%</h3>
                  <p className="text-gray-600">Average</p>
                </div>
                <div className="text-success-500">+3%</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Course Management */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow mb-8">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Course Management</h2>
                    <Button variant="primary" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Course
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search courses..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {courses.map(course => (
                      <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900">{course.title}</h3>
                            <p className="text-sm text-gray-600">{course.lessons.length} lessons</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-600 hover:text-primary-600">
                            <Edit className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-red-600">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Recent Activity */}
            <div className="space-y-8">
              {/* Recent Users */}
              <div className="bg-white rounded-xl shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentUsers.map(user => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'active' 
                            ? 'bg-success-100 text-success-700'
                            : 'bg-warning-100 text-warning-700'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-xl shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentTransactions.map(transaction => (
                      <div key={transaction.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{transaction.user}</p>
                          <p className="text-sm text-gray-600">{transaction.course}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-success-600">${transaction.amount}</p>
                          <p className="text-sm text-gray-600">{transaction.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard; 