import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCourses } from '../contexts/CourseContext';
import { motion } from 'framer-motion';
import { Play, BookOpen, Bookmark, Settings, User } from 'lucide-react';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { getUserCourses, getCourseProgress } = useCourses();
  const [activeTab, setActiveTab] = useState('courses');
  
  // Get user's enrolled courses
  const enrolledCourses = user ? getUserCourses(user.id) : [];

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
            
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map(course => {
                  const progress = user ? getCourseProgress(user.id, course.id) : 0;
                  
                  return (
                    <motion.div
                      key={course.id}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={course.image}
                          alt={course.title}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="bg-white bg-opacity-90 h-1 rounded-full mb-2">
                            <div 
                              className="bg-primary-500 h-1 rounded-full" 
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-white text-sm">
                            <span>{progress}% complete</span>
                            <span>{course.lessons.length} lessons</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 text-gray-900">{course.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                        <Button 
                          variant="primary" 
                          fullWidth
                          icon={<Play className="h-4 w-4" />}
                        >
                          <Link to={`/courses/${course.id}/lessons/${course.lessons[0].id}`}>
                            Continue Learning
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
                <p className="text-gray-600 mb-6">
                  You haven't enrolled in any courses yet. Browse our catalog to find courses that interest you.
                </p>
                <Button variant="primary">
                  <Link to="/courses">Browse Courses</Link>
                </Button>
              </div>
            )}
          </div>
        );
        
      case 'profile':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-4 md:mb-0 md:mr-6">
                  <User className="h-12 w-12" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h3>
                  <p className="text-gray-600 mb-4">{user?.email}</p>
                  <Button variant="outline" size="sm">Change Profile Picture</Button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="primary">Save Changes</Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <Button variant="primary">Update Password</Button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive emails about course updates and new content</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Course Reminders</h4>
                      <p className="text-sm text-gray-500">Receive reminders to continue your courses</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Marketing Emails</h4>
                      <p className="text-sm text-gray-500">Receive emails about special offers and new courses</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <Button variant="primary">Save Preferences</Button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Once you delete your account, all of your data will be permanently removed. This action cannot be undone.
                </p>
                <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}!</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <nav className="divide-y divide-gray-200">
                  <button
                    className={`w-full flex items-center px-4 py-3 ${
                      activeTab === 'courses'
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('courses')}
                  >
                    <BookOpen className="h-5 w-5 mr-3" />
                    <span className="font-medium">My Courses</span>
                  </button>
                  
                  <button
                    className={`w-full flex items-center px-4 py-3 ${
                      activeTab === 'bookmarks'
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('bookmarks')}
                  >
                    <Bookmark className="h-5 w-5 mr-3" />
                    <span className="font-medium">Bookmarks</span>
                  </button>
                  
                  <button
                    className={`w-full flex items-center px-4 py-3 ${
                      activeTab === 'profile'
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="h-5 w-5 mr-3" />
                    <span className="font-medium">My Profile</span>
                  </button>
                  
                  <button
                    className={`w-full flex items-center px-4 py-3 ${
                      activeTab === 'settings'
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    <span className="font-medium">Settings</span>
                  </button>
                </nav>
              </div>
              
              <div className="mt-6 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-sm p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                <p className="mb-4 text-primary-100">
                  Our support team is always ready to assist you with any questions.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-white text-white hover:bg-white/10"
                >
                  Contact Support
                </Button>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default DashboardPage;