import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCourses } from '../contexts/CourseContext';
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  PlayCircle,
  ChevronRight,
  Star
} from 'lucide-react';
import { User, Course } from '../types';

interface Lesson {
  id: string;
  title: string;
  duration: string;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface CourseProgress {
  courseId: string;
  progress: number;
  lastAccessedDate: string;
  completedLessons: number;
  totalLessons: number;
}

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { courses, getUserCourses } = useCourses();

  // Get enrolled courses using the CourseContext
  const enrolledCourses = user ? getUserCourses(user.id) : [];

  const courseProgress: Record<string, CourseProgress> = {
    '1': {
      courseId: '1',
      progress: 65,
      lastAccessedDate: '2024-03-15',
      completedLessons: 13,
      totalLessons: 20
    },
    '2': {
      courseId: '2',
      progress: 30,
      lastAccessedDate: '2024-03-14',
      completedLessons: 6,
      totalLessons: 20
    }
  };

  const recommendedCourses = courses
    .filter(course => !enrolledCourses.some(enrolled => enrolled.id === course.id))
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name || 'Student'}</h1>
        <p className="text-blue-100">Continue your learning journey</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <BookOpen className="h-5 w-5 mr-2" />
              <span>Enrolled Courses</span>
            </div>
            <p className="text-2xl font-bold">{enrolledCourses.length}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 mr-2" />
              <span>Learning Hours</span>
            </div>
            <p className="text-2xl font-bold">45</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Award className="h-5 w-5 mr-2" />
              <span>Certificates</span>
            </div>
            <p className="text-2xl font-bold">2</p>
          </div>
        </div>
      </motion.div>

      {/* Courses in Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Courses in Progress</h2>
          <Link to="/courses" className="text-blue-600 hover:text-blue-700 flex items-center">
            View All
            <ChevronRight className="h-5 w-5 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map(course => {
            const progress = courseProgress[course.id.toString()] || {
              progress: 0,
              completedLessons: 0,
              totalLessons: course.lessons.length
            };

            return (
              <motion.div
                key={course.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-white opacity-80 hover:opacity-100 cursor-pointer" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{course.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Last activity: {progress.lastAccessedDate}</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{progress.completedLessons} of {progress.totalLessons} lessons</span>
                      <span>{progress.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${progress.progress}%` }}
                      />
                    </div>
                  </div>
                  <Link
                    to={`/courses/${course.id}/lessons/${course.lessons[0].id}`}
                    className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Continue Learning
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recommended Courses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Recommended Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map(course => (
            <motion.div
              key={course.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-blue-600">
                  Recommended
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{course.title}</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span>{course.rating}</span>
                    <span className="text-gray-600 ml-1">({course.students} students)</span>
                  </div>
                  <span className="font-bold text-blue-600">${course.price}</span>
                </div>
                <Link
                  to={`/courses/${course.id}`}
                  className="block text-center border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Learning Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Learning Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="text-sm text-gray-600">This Month</span>
            </div>
            <p className="text-2xl font-bold mb-1">15</p>
            <p className="text-gray-600">Learning Hours</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="h-8 w-8 text-green-600" />
              <span className="text-sm text-gray-600">Total</span>
            </div>
            <p className="text-2xl font-bold mb-1">45</p>
            <p className="text-gray-600">Completed Lessons</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <Award className="h-8 w-8 text-yellow-600" />
              <span className="text-sm text-gray-600">Achievements</span>
            </div>
            <p className="text-2xl font-bold mb-1">8</p>
            <p className="text-gray-600">Badges Earned</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-purple-600" />
              <span className="text-sm text-gray-600">Average</span>
            </div>
            <p className="text-2xl font-bold mb-1">2.5</p>
            <p className="text-gray-600">Hours/Day</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard; 