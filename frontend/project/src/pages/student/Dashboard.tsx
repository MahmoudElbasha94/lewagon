import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Award,
  Star,
  TrendingUp,
  Book,
  CheckCircle,
  Medal,
  ChevronRight,
  Calendar,
  Target,
  Brain,
  Zap,
  Trophy,
  PlayCircle,
  BookmarkCheck,
  MessageSquare,
  Bell,
  FileText,
  Users,
  BarChart2,
  Bookmark,
  Gift,
  GraduationCap
} from 'lucide-react';

interface RecommendedCourse {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  students: number;
  isRecommended: boolean;
  instructor: string;
  rating: number;
}

interface ActiveCourse {
  id: string;
  title: string;
  progress: number;
  nextLesson: string;
  lastAccessed: string;
  thumbnail: string;
  instructor: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'webinar' | 'assignment' | 'live' | 'deadline';
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
}

const StudentDashboard: React.FC = () => {
  const [stats] = useState({
    enrolledCourses: 0,
    learningHours: 45,
    certificates: 2,
    monthlyHours: 15,
    completedLessons: 45,
    achievements: 8,
    averageHoursPerDay: 2.5,
    streak: 7,
    totalPoints: 1250,
    rank: "Silver Scholar",
    completionRate: 75,
    quizScore: 85,
    discussionPosts: 12
  });

  const [recommendedCourses] = useState<RecommendedCourse[]>([
    {
      id: '1',
      title: 'Complete React Developer Course',
      thumbnail: '/course-images/react.jpg',
      price: 89.99,
      students: 1234,
      isRecommended: true,
      instructor: "Sarah Johnson",
      rating: 4.8
    },
    {
      id: '2',
      title: 'UI/UX Design Masterclass',
      thumbnail: '/course-images/uiux.jpg',
      price: 79.99,
      students: 856,
      isRecommended: true,
      instructor: "David Chen",
      rating: 4.9
    },
    {
      id: '3',
      title: 'Advanced JavaScript Programming',
      thumbnail: '/course-images/javascript.jpg',
      price: 94.99,
      students: 2341,
      isRecommended: true,
      instructor: "Michael Brown",
      rating: 4.7
    }
  ]);

  const [achievements] = useState([
    { id: 1, title: "7-Day Streak", icon: Zap, color: "text-yellow-500" },
    { id: 2, title: "Quick Learner", icon: Brain, color: "text-blue-500" },
    { id: 3, title: "Goal Crusher", icon: Target, color: "text-green-500" },
    { id: 4, title: "Top Performer", icon: Trophy, color: "text-purple-500" }
  ]);

  const [activeCourses] = useState<ActiveCourse[]>([
    {
      id: '1',
      title: 'React Development Bootcamp',
      progress: 65,
      nextLesson: 'Advanced Hooks and State Management',
      lastAccessed: '2 hours ago',
      thumbnail: '/course-images/react-bootcamp.jpg',
      instructor: 'Sarah Johnson'
    },
    {
      id: '2',
      title: 'UI/UX Fundamentals',
      progress: 40,
      nextLesson: 'User Research Methods',
      lastAccessed: 'Yesterday',
      thumbnail: '/course-images/uiux-fundamentals.jpg',
      instructor: 'David Chen'
    }
  ]);

  const [upcomingEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Live Q&A Session: React Best Practices',
      date: '2024-03-20',
      time: '14:00',
      type: 'live'
    },
    {
      id: '2',
      title: 'UI/UX Project Submission',
      date: '2024-03-25',
      time: '23:59',
      type: 'deadline'
    },
    {
      id: '3',
      title: 'JavaScript Advanced Concepts Webinar',
      date: '2024-03-22',
      time: '15:00',
      type: 'webinar'
    }
  ]);

  const [assignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'React Final Project',
      course: 'React Development Bootcamp',
      dueDate: '2024-03-25',
      status: 'pending'
    },
    {
      id: '2',
      title: 'User Research Report',
      course: 'UI/UX Fundamentals',
      dueDate: '2024-03-20',
      status: 'submitted'
    },
    {
      id: '3',
      title: 'JavaScript Quiz',
      course: 'Advanced JavaScript',
      dueDate: '2024-03-18',
      status: 'graded',
      grade: 92
    }
  ]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'live':
        return <PlayCircle className="h-5 w-5 text-green-500" />;
      case 'deadline':
        return <Clock className="h-5 w-5 text-red-500" />;
      case 'webinar':
        return <Users className="h-5 w-5 text-blue-500" />;
      case 'assignment':
        return <FileText className="h-5 w-5 text-purple-500" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAssignmentStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'submitted':
        return 'text-blue-500';
      case 'graded':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-8 text-white shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, Student!</h1>
              <p className="text-blue-100 text-lg">Ready to continue your learning journey?</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-semibold">{stats.rank}</p>
              <p className="text-blue-200">{stats.totalPoints} XP</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
              <div className="flex items-center mb-2">
                <BookOpen className="h-5 w-5 mr-2" />
                <span>Enrolled Courses</span>
              </div>
              <p className="text-2xl font-bold">{stats.enrolledCourses}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 mr-2" />
                <span>Learning Hours</span>
              </div>
              <p className="text-2xl font-bold">{stats.learningHours}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Award className="h-5 w-5 mr-2" />
                <span>Certificates</span>
              </div>
              <p className="text-2xl font-bold">{stats.certificates}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Zap className="h-5 w-5 mr-2" />
                <span>Day Streak</span>
              </div>
              <p className="text-2xl font-bold">{stats.streak} days</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Courses */}
            <motion.div {...fadeInUp} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Courses</h2>
              <div className="space-y-6">
                {activeCourses.map(course => (
                  <div key={course.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                        <div className="mt-2">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm text-gray-500">Last accessed {course.lastAccessed}</span>
                          <Link
                            to={`/student/courses/${course.id}`}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                          >
                            Continue Learning
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                      <p className="text-sm text-indigo-700">
                        <span className="font-medium">Next Lesson:</span> {course.nextLesson}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recommended Courses */}
            <motion.div
              {...fadeInUp}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Recommended Courses</h2>
                <Link
                  to="/student/courses"
                  className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium"
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {recommendedCourses.map(course => (
                  <motion.div
                    key={course.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                  >
                    <div className="flex">
                      <div className="w-48 h-32 relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        {course.isRecommended && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Recommended
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-4">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                        <div className="flex items-center mb-3">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700 ml-1">{course.rating}</span>
                          <span className="text-sm text-gray-500 ml-2">({course.students} students)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-900">${course.price}</span>
                          <Link
                            to={`/student/courses/${course.id}`}
                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Learning Path Progress */}
            <motion.div {...fadeInUp} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Path Progress</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Frontend Development Path</h3>
                    <p className="text-sm text-gray-600">Master modern web development</p>
                  </div>
                  <span className="text-2xl font-bold text-indigo-600">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: '75%' }}
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <BookmarkCheck className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-medium">HTML & CSS</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <BookmarkCheck className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-medium">JavaScript</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <Bookmark className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-sm font-medium">React.js</p>
                    <p className="text-xs text-gray-500">In Progress</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <Bookmark className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium">Next.js</p>
                    <p className="text-xs text-gray-500">Upcoming</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Learning Statistics */}
            <motion.div
              {...fadeInUp}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Statistics</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                    <span className="text-sm text-gray-600">This Month</span>
                  </div>
                  <p className="text-2xl font-bold mb-1">{stats.monthlyHours}</p>
                  <p className="text-gray-600">Learning Hours</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <BookOpen className="h-8 w-8 text-green-600" />
                    <span className="text-sm text-gray-600">Total</span>
                  </div>
                  <p className="text-2xl font-bold mb-1">{stats.completedLessons}</p>
                  <p className="text-gray-600">Completed Lessons</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Award className="h-8 w-8 text-yellow-600" />
                    <span className="text-sm text-gray-600">Achievements</span>
                  </div>
                  <p className="text-2xl font-bold mb-1">{stats.achievements}</p>
                  <p className="text-gray-600">Badges Earned</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Clock className="h-8 w-8 text-purple-600" />
                    <span className="text-sm text-gray-600">Average</span>
                  </div>
                  <p className="text-2xl font-bold mb-1">{stats.averageHoursPerDay}</p>
                  <p className="text-gray-600">Hours/Day</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <motion.div {...fadeInUp} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    {getEventIcon(event.type)}
                    <div>
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Assignments */}
            <motion.div {...fadeInUp} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Assignments</h2>
              <div className="space-y-4">
                {assignments.map(assignment => (
                  <div key={assignment.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{assignment.title}</p>
                        <p className="text-sm text-gray-600">{assignment.course}</p>
                      </div>
                      <span className={`text-sm font-medium ${getAssignmentStatusColor(assignment.status)}`}>
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-gray-500">Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      {assignment.grade && (
                        <span className="font-medium text-green-600">Grade: {assignment.grade}%</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Learning Progress */}
            <motion.div
              {...fadeInUp}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Learning Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Monthly Goal</span>
                    <span>{stats.monthlyHours}/30 hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.monthlyHours / 30) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Daily Average</span>
                    <span>{stats.averageHoursPerDay} hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.averageHoursPerDay / 4) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              {...fadeInUp}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Achievements</h2>
              <div className="space-y-4">
                {achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className="flex items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <achievement.icon className={`h-6 w-6 ${achievement.color} mr-3`} />
                    <span className="font-medium text-gray-700">{achievement.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Resources & Tools */}
            <motion.div {...fadeInUp} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Resources & Tools</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/student/discussion"
                  className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageSquare className="w-6 h-6 text-indigo-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Discussion Forum</span>
                </Link>
                <Link
                  to="/student/resources"
                  className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FileText className="w-6 h-6 text-indigo-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Study Materials</span>
                </Link>
                <Link
                  to="/student/community"
                  className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="w-6 h-6 text-indigo-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Community</span>
                </Link>
                <Link
                  to="/student/rewards"
                  className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Gift className="w-6 h-6 text-indigo-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Rewards</span>
                </Link>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div {...fadeInUp} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
                <Link to="/student/notifications" className="text-indigo-600 text-sm">View All</Link>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">New Certificate Available</p>
                    <p className="text-sm text-gray-600">You've completed the JavaScript Basics course</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Bell className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">Course Update</p>
                    <p className="text-sm text-gray-600">New content added to React Development</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 