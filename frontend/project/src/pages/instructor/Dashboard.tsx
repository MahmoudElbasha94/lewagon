import React, { useState, useEffect } from 'react';
import { useCourses } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  Users,
  BookOpen,
  Star,
  DollarSign,
  TrendingUp,
  Clock,
  MessageSquare,
  Award,
  BarChart2,
  Calendar
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { courses, loading } = useCourses();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalRevenue: 0,
    averageRating: 0,
    totalReviews: 0,
    monthlyRevenue: 0,
    monthlyGrowth: 0,
    activeStudents: 0,
    completionRate: 0,
    totalQuestions: 0,
    responseRate: 0,
    totalHours: 0
  });

  useEffect(() => {
    if (courses) {
      // Calculate statistics
      const totalStudents = courses.reduce((acc, course) => acc + (course.students?.length || 0), 0);
      const totalRevenue = courses.reduce((acc, course) => acc + (course.revenue || 0), 0);
      const totalReviews = courses.reduce((acc, course) => acc + (course.reviews?.length || 0), 0);
      const averageRating = courses.reduce((acc, course) => acc + (course.rating || 0), 0) / (courses.length || 1);
      const monthlyRevenue = totalRevenue * 0.3; // Example calculation
      const monthlyGrowth = 15; // Example growth percentage
      const activeStudents = Math.floor(totalStudents * 0.7); // Example calculation
      const completionRate = 75; // Example completion rate
      const totalQuestions = courses.reduce((acc, course) => acc + (course.questions?.length || 0), 0);
      const responseRate = 95; // Example response rate
      const totalHours = courses.reduce((acc, course) => acc + (course.duration || 0), 0);

      setStats({
        totalStudents,
        totalCourses: courses.length,
        totalRevenue,
        averageRating,
        totalReviews,
        monthlyRevenue,
        monthlyGrowth,
        activeStudents,
        completionRate,
        totalQuestions,
        responseRate,
        totalHours
      });
    }
  }, [courses]);

  const StatCard = ({ title, value, icon: Icon, color, trend }: { 
    title: string; 
    value: string | number; 
    icon: any;
    color: string;
    trend?: { value: number; isPositive: boolean };
  }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {trend && (
            <p className={`text-sm mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const RecentActivity = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {courses.slice(0, 5).map(course => (
          <div key={course.id} className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {course.title}
              </p>
              <p className="text-sm text-gray-500">
                {course.students?.length || 0} new students this week
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const QuickActions = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/instructor/courses/new"
          className="flex items-center justify-center p-4 border rounded-lg hover:bg-gray-50"
        >
          <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
          <span>Create New Course</span>
        </Link>
        <Link
          to="/instructor/notifications"
          className="flex items-center justify-center p-4 border rounded-lg hover:bg-gray-50"
        >
          <MessageSquare className="w-5 h-5 mr-2 text-indigo-600" />
          <span>View Messages</span>
        </Link>
        <Link
          to="/instructor/analytics"
          className="flex items-center justify-center p-4 border rounded-lg hover:bg-gray-50"
        >
          <BarChart2 className="w-5 h-5 mr-2 text-indigo-600" />
          <span>View Analytics</span>
        </Link>
        <Link
          to="/instructor/settings"
          className="flex items-center justify-center p-4 border rounded-lg hover:bg-gray-50"
        >
          <Award className="w-5 h-5 mr-2 text-indigo-600" />
          <span>Update Profile</span>
        </Link>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="mt-2 text-gray-600">Here's what's happening with your courses today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          color="bg-blue-500"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="bg-green-500"
          trend={{ value: stats.monthlyGrowth, isPositive: true }}
        />
        <StatCard
          title="Average Rating"
          value={stats.averageRating.toFixed(1)}
          icon={Star}
          color="bg-yellow-500"
        />
        <StatCard
          title="Active Courses"
          value={stats.totalCourses}
          icon={BookOpen}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Course Performance</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-semibold">{stats.completionRate}%</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600">Response Rate</p>
                <p className="text-2xl font-semibold">{stats.responseRate}%</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600">Total Hours</p>
                <p className="text-2xl font-semibold">{stats.totalHours}h</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm font-medium">Course Launch</p>
                <p className="text-sm text-gray-500">New course launching next week</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Clock className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm font-medium">Live Session</p>
                <p className="text-sm text-gray-500">Q&A session with students</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 