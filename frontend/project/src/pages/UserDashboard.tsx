import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Clock, Award, Settings, 
  Calendar, BarChart2, BookMarked,
  Bell, User, LogOut, ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCourses } from '../contexts/CourseContext';
import { Link } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { courses, isEnrolled } = useCourses();
  const [activeTab, setActiveTab] = useState('overview');

  // Get enrolled courses
  const enrolledCourses = courses.filter(course => user && isEnrolled(user.id, course.id));

  // Calculate progress statistics
  const completedCourses = enrolledCourses.filter(course => 
    course.courseProgress && course.courseProgress.completed === course.courseProgress.totalUnits
  );
  
  const totalProgress = enrolledCourses.reduce((acc, course) => {
    if (course.courseProgress) {
      return acc + (course.courseProgress.completed / course.courseProgress.totalUnits) * 100;
    }
    return acc;
  }, 0);

  const averageProgress = enrolledCourses.length > 0 
    ? totalProgress / enrolledCourses.length 
    : 0;

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
                  <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
                  <p className="text-gray-600">Continue your learning journey</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Statistics Cards */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary-100 rounded-full p-3">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                </div>
                <span className="text-sm text-gray-500">Courses</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">{enrolledCourses.length}</h3>
                  <p className="text-gray-600">Enrolled Courses</p>
                </div>
                <div className="text-right">
                  <p className="text-success-500 font-medium">{completedCourses.length} completed</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-success-100 rounded-full p-3">
                  <BarChart2 className="h-6 w-6 text-success-600" />
                </div>
                <span className="text-sm text-gray-500">Progress</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">{averageProgress.toFixed(1)}%</h3>
                  <p className="text-gray-600">Average Progress</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-warning-100 rounded-full p-3">
                  <Clock className="h-6 w-6 text-warning-600" />
                </div>
                <span className="text-sm text-gray-500">Learning Time</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {enrolledCourses.reduce((acc, course) => acc + parseInt(course.duration), 0)}h
                  </h3>
                  <p className="text-gray-600">Total Hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex space-x-8 px-6">
                  <button
                    className={`py-4 px-2 border-b-2 font-medium ${
                      activeTab === 'overview'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`py-4 px-2 border-b-2 font-medium ${
                      activeTab === 'courses'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('courses')}
                  >
                    My Courses
                  </button>
                  <button
                    className={`py-4 px-2 border-b-2 font-medium ${
                      activeTab === 'certificates'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('certificates')}
                  >
                    Certificates
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                    {enrolledCourses.length > 0 ? (
                      <div className="space-y-4">
                        {enrolledCourses.map(course => (
                          <div key={course.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <img 
                                  src={course.thumbnail} 
                                  alt={course.title}
                                  className="h-16 w-16 rounded-lg object-cover"
                                />
                                <div>
                                  <h4 className="font-medium text-gray-900">{course.title}</h4>
                                  <p className="text-sm text-gray-600">
                                    {course.courseProgress 
                                      ? `${((course.courseProgress.completed / course.courseProgress.totalUnits) * 100).toFixed(1)}% complete`
                                      : 'Not started'}
                                  </p>
                                </div>
                              </div>
                              <Link 
                                to={`/courses/${course.id}/lessons/${course.lessons[0].id}`}
                                className="flex items-center text-primary-600 hover:text-primary-700"
                              >
                                Continue
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <BookMarked className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
                        <p className="text-gray-600 mb-4">Start your learning journey today</p>
                        <Link
                          to="/courses"
                          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                        >
                          Browse Courses
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'courses' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">My Courses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {enrolledCourses.map(course => (
                        <div key={course.id} className="bg-gray-50 rounded-lg overflow-hidden">
                          <img 
                            src={course.thumbnail} 
                            alt={course.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h4 className="font-medium text-gray-900 mb-2">{course.title}</h4>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                                <span className="text-sm text-gray-600">{course.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <BookOpen className="h-4 w-4 text-gray-400 mr-1" />
                                <span className="text-sm text-gray-600">
                                  {course.lessons.length} lessons
                                </span>
                              </div>
                            </div>
                            <Link
                              to={`/courses/${course.id}/lessons/${course.lessons[0].id}`}
                              className="block w-full text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                            >
                              Continue Learning
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'certificates' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">My Certificates</h3>
                    {completedCourses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {completedCourses.map(course => (
                          <div key={course.id} className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-center justify-center mb-4">
                              <Award className="h-12 w-12 text-primary-600" />
                            </div>
                            <h4 className="text-center font-medium text-gray-900 mb-2">
                              {course.title}
                            </h4>
                            <p className="text-center text-sm text-gray-600 mb-4">
                              {course.certification.type}
                            </p>
                            <button className="w-full bg-white text-primary-600 border border-primary-600 py-2 rounded-lg hover:bg-primary-50 transition-colors">
                              Download Certificate
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No certificates yet
                        </h3>
                        <p className="text-gray-600">
                          Complete courses to earn certificates
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserDashboard; 