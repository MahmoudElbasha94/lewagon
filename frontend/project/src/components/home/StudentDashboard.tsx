import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Calendar, 
  BarChart2, 
  Settings, 
  LogOut,
  Bell,
  User,
  BookMarked,
  MessageSquare,
  GraduationCap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  // Mock data - In a real app, this would come from an API
  const studentInfo = {
    name: "محمد أحمد",
    email: "mohamed@example.com",
    avatar: "https://ui-avatars.com/api/?name=محمد+أحمد&background=random",
    progress: 75,
    notifications: 3,
  };

  const enrolledCourses = [
    {
      id: 1,
      title: "تطوير تطبيقات الويب المتقدمة",
      progress: 80,
      nextLesson: "React Hooks المتقدمة",
      instructor: "أحمد محمود",
      duration: "2:30:00",
    },
    {
      id: 2,
      title: "تعلم Python من الصفر",
      progress: 45,
      nextLesson: "العمل مع قواعد البيانات",
      instructor: "سارة خالد",
      duration: "1:45:00",
    },
    {
      id: 3,
      title: "أساسيات الذكاء الاصطناعي",
      progress: 30,
      nextLesson: "خوارزميات التعلم الآلي",
      instructor: "عمر حسن",
      duration: "3:15:00",
    },
  ];

  const achievements = [
    { id: 1, title: "إتمام 5 دورات", icon: Award, date: "2024-03-15" },
    { id: 2, title: "شهادة Python", icon: GraduationCap, date: "2024-03-10" },
    { id: 3, title: "100 ساعة تعلم", icon: Clock, date: "2024-03-05" },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "جلسة مباشرة: تطوير الويب",
      date: "2024-03-20",
      time: "14:00",
    },
    {
      id: 2,
      title: "موعد تسليم المشروع النهائي",
      date: "2024-03-25",
      time: "23:59",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
              <h1 className="text-xl font-bold text-gray-800">لوحة التحكم</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-red-600 transition-colors">
                <Bell className="h-6 w-6" />
                {studentInfo.notifications > 0 && (
                  <span className="absolute top-0 right-0 h-5 w-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                    {studentInfo.notifications}
                  </span>
                )}
              </button>
              <div className="flex items-center space-x-2">
                <img src={studentInfo.avatar} alt="Profile" className="h-8 w-8 rounded-full" />
                <span className="text-gray-800 font-medium">{studentInfo.name}</span>
              </div>
              <button 
                className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-colors"
                onClick={() => {/* Handle logout */}}
              >
                <LogOut className="h-5 w-5" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">نظرة عامة على التقدم</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-red-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <BookOpen className="h-8 w-8 text-red-600" />
                    <span className="text-2xl font-bold text-red-600">{enrolledCourses.length}</span>
                  </div>
                  <p className="mt-2 text-gray-600">الدورات المسجلة</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <Clock className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-600">45</span>
                  </div>
                  <p className="mt-2 text-gray-600">ساعات التعلم</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <Award className="h-8 w-8 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">12</span>
                  </div>
                  <p className="mt-2 text-gray-600">الشهادات</p>
                </div>
              </div>
            </motion.div>

            {/* Enrolled Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">الدورات المسجلة</h2>
              <div className="space-y-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                      <span className="text-sm text-gray-600">{course.duration}</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>التقدم</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-red-600 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">الدرس التالي: {course.nextLesson}</span>
                      <span className="text-gray-600">المدرب: {course.instructor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">الإجراءات السريعة</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <BookMarked className="h-6 w-6 text-red-600 mb-2" />
                  <span className="text-sm text-gray-600">دوراتي</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <MessageSquare className="h-6 w-6 text-red-600 mb-2" />
                  <span className="text-sm text-gray-600">الرسائل</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <GraduationCap className="h-6 w-6 text-red-600 mb-2" />
                  <span className="text-sm text-gray-600">الشهادات</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <Settings className="h-6 w-6 text-red-600 mb-2" />
                  <span className="text-sm text-gray-600">الإعدادات</span>
                </button>
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">الأحداث القادمة</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center space-x-4 bg-gray-50 rounded-xl p-4">
                    <div className="flex-shrink-0">
                      <Calendar className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.date} - {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">الإنجازات الأخيرة</h2>
              <div className="space-y-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.id} className="flex items-center space-x-4 bg-gray-50 rounded-xl p-4">
                      <div className="flex-shrink-0">
                        <Icon className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 