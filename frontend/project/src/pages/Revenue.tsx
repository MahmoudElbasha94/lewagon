import React from 'react';
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import AdminLayout from '../components/layout/AdminLayout';

const Revenue: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const revenueStats = {
    totalRevenue: 523650,
    monthlyRevenue: 48750,
    weeklyRevenue: 12450,
    dailyRevenue: 2340,
    pendingPayouts: 15600,
    completedPayouts: 485000,
  };

  const recentTransactions = [
    {
      id: 1,
      user: 'John Doe',
      course: 'Advanced Web Development',
      amount: 99.99,
      date: '2024-03-15',
      status: 'completed',
      paymentMethod: 'Credit Card'
    },
    {
      id: 2,
      user: 'Jane Smith',
      course: 'UI/UX Design Fundamentals',
      amount: 79.99,
      date: '2024-03-14',
      status: 'completed',
      paymentMethod: 'PayPal'
    }
  ];

  return (
    <PageTransition>
      <AdminLayout>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Revenue</h1>
            <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>

          {/* Revenue Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    ${revenueStats.totalRevenue.toLocaleString()}
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
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Monthly Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    ${revenueStats.monthlyRevenue.toLocaleString()}
                  </h3>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+15%</span>
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
                  <p className="text-sm text-gray-500">Pending Payouts</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    ${revenueStats.pendingPayouts.toLocaleString()}
                  </h3>
                </div>
                <div className="p-3 bg-yellow-50 rounded-full">
                  <DollarSign className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-yellow-500 font-medium">Pending approval</span>
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
                      Payment Method
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
                        {transaction.paymentMethod}
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

export default Revenue; 