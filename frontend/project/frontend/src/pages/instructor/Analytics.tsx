import React, { useState, useEffect } from 'react';
import PageTransition from '../../components/common/PageTransition';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsData {
  revenue: number;
  totalStudents: number;
  totalCourses: number;
  completionRate: number;
  monthlyEnrollments: {
    month: string;
    students: number;
    revenue: number;
  }[];
}

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData>({
    revenue: 0,
    totalStudents: 0,
    totalCourses: 0,
    completionRate: 0,
    monthlyEnrollments: [
      { month: 'Jan', students: 0, revenue: 0 },
      { month: 'Feb', students: 0, revenue: 0 },
      { month: 'Mar', students: 0, revenue: 0 },
      { month: 'Apr', students: 0, revenue: 0 },
      { month: 'May', students: 0, revenue: 0 },
      { month: 'Jun', students: 0, revenue: 0 },
    ]
  });

  useEffect(() => {
    // TODO: Fetch real analytics data from API
    // This is mock data for demonstration
    setData({
      revenue: 15750,
      totalStudents: 324,
      totalCourses: 5,
      completionRate: 78,
      monthlyEnrollments: [
        { month: 'Jan', students: 45, revenue: 2250 },
        { month: 'Feb', students: 52, revenue: 2600 },
        { month: 'Mar', students: 61, revenue: 3050 },
        { month: 'Apr', students: 58, revenue: 2900 },
        { month: 'May', students: 64, revenue: 3200 },
        { month: 'Jun', students: 44, revenue: 1750 },
      ]
    });
  }, []);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">${data.revenue}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{data.totalStudents}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Active Courses</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{data.totalCourses}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{data.completionRate}%</p>
          </div>
        </div>

        {/* Enrollment Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Monthly Enrollments</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyEnrollments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="students" name="Students" fill="#4F46E5" />
                <Bar yAxisId="right" dataKey="revenue" name="Revenue ($)" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Top Performing Courses</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">React Fundamentals</span>
                <span className="text-green-600">89% completion</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Advanced TypeScript</span>
                <span className="text-green-600">82% completion</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Web Development</span>
                <span className="text-green-600">78% completion</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Student Engagement</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Watch Time</span>
                <span className="font-medium">45 minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Quiz Participation</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Discussion Posts</span>
                <span className="font-medium">156 this month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Analytics; 