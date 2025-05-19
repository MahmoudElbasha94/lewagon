import React from 'react';
import { BarChart2, Users, BookOpen, DollarSign, TrendingUp, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import AdminLayout from '../components/layout/AdminLayout';

const Overview: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const stats = {
    totalUsers: 15234,
    totalInstructors: 245,
    totalCourses: 890,
    totalRevenue: 523650,
    activeUsers: 8756,
    pendingCourses: 23,
    supportTickets: 45,
    activeCoupons: 12,
  };

  const recentTransactions = [
    {
      id: 1,
      user: 'John Doe',
      course: 'Advanced Web Development',
      amount: 99.99,
      date: '2024-03-15',
      status: 'completed'
    },
    {
      id: 2,
      user: 'Jane Smith',
      course: 'UI/UX Design Fundamentals',
      amount: 79.99,
      date: '2024-03-14',
      status: 'completed'
    }
  ];

  return (
    <PageTransition>
      <AdminLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Overview</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {stats.totalUsers.toLocaleString()}
                  </h3>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+12%</span>
                <span className="text-gray-400 ml-2">vs last month</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Courses</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {stats.totalCourses.toLocaleString()}
                  </h3>
                </div>
                <div className="p-3 bg-purple-50 rounded-full">
                  <BookOpen className="w-6 h-6 text-purple-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+8%</span>
                <span className="text-gray-400 ml-2">vs last month</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    ${stats.totalRevenue.toLocaleString()}
                  </h3>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+23%</span>
                <span className="text-gray-400 ml-2">vs last month</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Instructors</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {stats.totalInstructors.toLocaleString()}
                  </h3>
                </div>
                <div className="p-3 bg-yellow-50 rounded-full">
                  <Star className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+15%</span>
                <span className="text-gray-400 ml-2">vs last month</span>
              </div>
            </motion.div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${transaction.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminLayout>
    </PageTransition>
  );
};

export default Overview; 