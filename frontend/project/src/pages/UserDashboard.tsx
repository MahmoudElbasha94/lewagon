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
import type { Course } from '../types/Course';

// TODO: في Django، سيتم استخدام:
// 1. Django Class-Based Views بدلاً من User Dashboard
// 2. Django Templates بدلاً من Dashboard UI
// 3. Django ORM بدلاً من User Data
// 4. Django Permissions بدلاً من Access Control
// 5. Django Cache بدلاً من Dashboard State

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { courses, isEnrolled } = useCourses();
  const [activeTab, setActiveTab] = useState('overview');

  // Get enrolled courses with null check
  const enrolledCourses = courses?.filter(course => user && isEnrolled(user.id, String(course.id))) || [];

  // Calculate progress statistics with null checks
  const completedCourses = enrolledCourses?.filter(course => 
    course.courseProgress && course.courseProgress.completed === course.courseProgress.totalUnits
  ) || [];
  
  const totalProgress = enrolledCourses?.reduce((acc, course) => {
    if (course.courseProgress) {
      return acc + (course.courseProgress.completed / course.courseProgress.totalUnits) * 100;
    }
    return acc;
  }, 0) || 0;

  const averageProgress = enrolledCourses?.length > 0 
    ? totalProgress / enrolledCourses.length 
    : 0;

  // Calculate total lessons across all sections
  const getTotalLessons = (course: Course): number => {
    return course.sections?.reduce((total: number, section) => 
      total + (section.lessons?.length || 0), 0) || 0;
  };

  // Get total duration across all sections
  const getTotalDuration = (course: Course): number => {
    return course.sections?.reduce((total: number, section) => {
      return total + section.lessons?.reduce((lessonTotal: number, lesson) => {
        const duration = lesson.duration || '0:00';
        const [hours = 0, minutes = 0] = duration.split(':').map(Number);
        return lessonTotal + hours * 60 + minutes;
      }, 0) || 0;
    }, 0) || 0;
  };

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
                    {enrolledCourses.reduce((acc, course) => acc + getTotalDuration(course), 0)}h
                  </h3>
                  <p className="text-gray-600">Total Hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'courses'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All Courses
                </button>
                <button
                  onClick={() => setActiveTab('certificates')}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'certificates'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Certificates
                </button>
              </div>
            </div>

            {activeTab === 'courses' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {enrolledCourses.map(course => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative h-52">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        {course.certification && (
                          <span className="px-3 py-1.5 bg-white/90 text-red-600 text-xs font-semibold rounded-full shadow-sm">
                            {course.certification.type}
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg line-clamp-2">{course.title}</h3>
                        <div className="flex items-center text-white/90 text-sm space-x-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1.5 drop-shadow-lg" />
                            <span className="drop-shadow-lg">{course.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1.5 drop-shadow-lg" />
                            <span className="drop-shadow-lg">{getTotalLessons(course)} lessons</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="relative">
                            <img
                              src={course.instructorDetails.avatar}
                              alt={course.instructorDetails.name}
                              className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{course.instructorDetails.name}</p>
                            <p className="text-xs text-gray-500">Instructor</p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-gray-900">Course Progress</span>
                          <span className="font-semibold text-red-600">{course.courseProgress?.completed || 0}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.courseProgress?.completed || 0}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                        <div className="bg-gray-50 rounded-lg p-2">
                          <p className="text-lg font-semibold text-gray-900">{getTotalLessons(course)}</p>
                          <p className="text-xs text-gray-500">Total Lessons</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <p className="text-lg font-semibold text-gray-900">{course.courseProgress?.completedLessons || 0}</p>
                          <p className="text-xs text-gray-500">Completed</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <p className="text-lg font-semibold text-gray-900">{getTotalDuration(course)}h</p>
                          <p className="text-xs text-gray-500">Duration</p>
                        </div>
                      </div>
                      <Link
                        to={`/course/${course.id}/learn`}
                        className="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transform transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Continue Learning
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
                {enrolledCourses.length === 0 && (
                  <div className="col-span-3 bg-white rounded-2xl shadow-sm p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                      <BookOpen className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Yet</h3>
                    <p className="text-gray-600 mb-6">Start your learning journey by enrolling in a course</p>
                    <Link
                      to="/courses"
                      className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
                    >
                      Browse Courses
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedCourses.map(course => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="p-3 bg-yellow-100 rounded-xl">
                            <Award className="h-8 w-8 text-yellow-600" />
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{course.certification?.type}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-primary-600">100%</p>
                            <p className="text-xs text-gray-500">Completed</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{getTotalLessons(course)}</p>
                            <p className="text-xs text-gray-500">Lessons</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{course.duration}</p>
                            <p className="text-xs text-gray-500">Hours</p>
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/course/${course.id}/certificate`}
                        className="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm font-semibold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transform transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                      >
                        View Certificate
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserDashboard; 