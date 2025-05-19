import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { CourseAnalytics } from '../types/instructor';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Users, DollarSign, Star, Clock } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock data - replace with API call
const mockAnalytics: CourseAnalytics = {
  id: '1',
  views: 15000,
  sales: 850,
  revenue: 25000,
  rating: 4.8,
  totalReviews: 320,
  completionRate: 78,
  studentEngagement: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    activeStudents: Math.floor(Math.random() * 100) + 50,
  })),
  lessonProgress: [
    { lessonId: '1', lessonTitle: 'Introduction', completions: 800, avgWatchTime: 15 },
    { lessonId: '2', lessonTitle: 'Basic Concepts', completions: 750, avgWatchTime: 25 },
    { lessonId: '3', lessonTitle: 'Advanced Topics', completions: 600, avgWatchTime: 35 },
    { lessonId: '4', lessonTitle: 'Practice Session', completions: 500, avgWatchTime: 45 },
    { lessonId: '5', lessonTitle: 'Final Project', completions: 400, avgWatchTime: 60 },
  ],
};

const CourseAnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const engagementData = {
    labels: mockAnalytics.studentEngagement.map(item => item.date),
    datasets: [
      {
        label: 'Active Students',
        data: mockAnalytics.studentEngagement.map(item => item.activeStudents),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const lessonProgressData = {
    labels: mockAnalytics.lessonProgress.map(item => item.lessonTitle),
    datasets: [
      {
        label: 'Completions',
        data: mockAnalytics.lessonProgress.map(item => item.completions),
        backgroundColor: 'rgb(59, 130, 246)',
      },
      {
        label: 'Avg. Watch Time (min)',
        data: mockAnalytics.lessonProgress.map(item => item.avgWatchTime),
        backgroundColor: 'rgb(16, 185, 129)',
      },
    ],
  };

  const stats = [
    {
      title: 'Total Views',
      value: mockAnalytics.views.toLocaleString(),
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Sales',
      value: mockAnalytics.sales.toLocaleString(),
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Revenue',
      value: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(mockAnalytics.revenue),
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
    {
      title: 'Rating',
      value: `${mockAnalytics.rating} (${mockAnalytics.totalReviews} reviews)`,
      icon: Star,
      color: 'bg-purple-500',
    },
    {
      title: 'Completion Rate',
      value: `${mockAnalytics.completionRate}%`,
      icon: Clock,
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Course Analytics</h1>
          <div className="flex items-center space-x-2">
            {(['7d', '30d', '90d'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  timeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student Engagement Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Student Engagement</h2>
            <Line
              data={engagementData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </motion.div>

          {/* Lesson Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Lesson Progress</h2>
            <Bar
              data={lessonProgressData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </motion.div>
        </div>

        {/* Detailed Lesson Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-lg shadow-sm p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Lesson Analytics</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lesson
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completions
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Watch Time
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockAnalytics.lessonProgress.map((lesson, index) => (
                  <tr key={lesson.lessonId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {lesson.lessonTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {lesson.completions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {lesson.avgWatchTime} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {Math.round((lesson.completions / mockAnalytics.sales) * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseAnalyticsPage; 