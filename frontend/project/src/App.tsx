/*
TODO: التغييرات المطلوبة للجانغو:
1. سيتم استبدال هذا الملف بملف urls.py الذي يحتوي على جميع مسارات التطبيق
2. سيتم تحويل كل Route إلى path في urls.py
3. سيتم استبدال المكونات React بviews.py في الجانغو
4. سيتم تحويل ProtectedRoute و AdminRoute و InstructorRoute و StudentRoute إلى decorators في الجانغو
5. سيتم تحويل Context Providers إلى middleware في الجانغو
*/

// TODO: في Django، سيتم استخدام:
// 1. Django URLs بدلاً من React Router
// 2. Django Templates بدلاً من JSX
// 3. Django Context بدلاً من React Context
// 4. Django Middleware بدلاً من React Middleware
// 5. Django Static Files بدلاً من React Assets

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { CourseProvider } from './contexts/CourseContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { CouponProvider } from './contexts/CouponContext';
import { SupportProvider } from './contexts/SupportContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SupportPage from './pages/SupportTickets';
import NotFoundPage from './pages/NotFoundPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import CheckoutPage from './pages/CheckoutPage';

// Admin Pages
import Overview from './pages/Overview';
import UserManagement from './pages/UserManagement';
import CourseManagement from './pages/CourseManagement';
import CategoryManagement from './pages/CategoryManagement';
import CourseReview from './pages/CourseReview';
import CouponManagement from './pages/CouponManagement';
import SiteSettings from './pages/SiteSettings';
import Revenue from './pages/Revenue';
import Support from './pages/Support';

// Instructor Pages
import Notifications from './pages/instructor/Notifications';
import NewCourse from './pages/instructor/NewCourse';
import Analytics from './pages/instructor/Analytics';
import Reviews from './pages/instructor/Reviews';
import Courses from './pages/instructor/Courses';
import Settings from './pages/instructor/Settings';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import CourseDetails from './pages/student/CourseDetails';
import MyCourses from './pages/student/MyCourses';
import MyCertificates from './pages/student/MyCertificates';
import MyProgress from './pages/student/MyProgress';
import Discussions from './pages/student/Discussions';

// Route Protection
import ProtectedRoute from './components/routing/ProtectedRoute';
import AdminRoute from './components/routing/AdminRoute';
import InstructorRoute from './components/routing/InstructorRoute';
import StudentRoute from './components/routing/StudentRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CourseProvider>
          <CategoryProvider>
            <SettingsProvider>
              <CouponProvider>
                <SupportProvider>
                  <Layout>
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/signup" element={<SignupPage />} />
                      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/courses" element={<CoursesPage />} />
                      <Route path="/courses/:id" element={<CourseDetailPage />} />

                      {/* Protected Routes */}
                      <Route path="/dashboard" element={
                        <ProtectedRoute>
                          <DashboardPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <ProfilePage />
                        </ProtectedRoute>
                      } />
                      <Route path="/lesson/:id" element={
                        <ProtectedRoute>
                          <LessonPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/checkout/:courseId" element={
                        <ProtectedRoute>
                          <CheckoutPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/support" element={
                        <ProtectedRoute>
                          <SupportPage />
                        </ProtectedRoute>
                      } />

                      {/* Student Routes */}
                      <Route path="/student/dashboard" element={
                        <StudentRoute>
                          <StudentDashboard />
                        </StudentRoute>
                      } />
                      <Route path="/student/courses/:id" element={
                        <StudentRoute>
                          <CourseDetails />
                        </StudentRoute>
                      } />
                      <Route path="/student/my-courses" element={
                        <StudentRoute>
                          <MyCourses />
                        </StudentRoute>
                      } />
                      <Route path="/student/certificates" element={
                        <StudentRoute>
                          <MyCertificates />
                        </StudentRoute>
                      } />
                      <Route path="/student/progress" element={
                        <StudentRoute>
                          <MyProgress />
                        </StudentRoute>
                      } />
                      <Route path="/student/discussions" element={
                        <StudentRoute>
                          <Discussions />
                        </StudentRoute>
                      } />

                      {/* Instructor Routes */}
                      <Route path="/instructor/notifications" element={
                        <InstructorRoute>
                          <Notifications />
                        </InstructorRoute>
                      } />
                      <Route path="/instructor/courses" element={
                        <InstructorRoute>
                          <Courses />
                        </InstructorRoute>
                      } />
                      <Route path="/instructor/courses/new" element={
                        <InstructorRoute>
                          <NewCourse />
                        </InstructorRoute>
                      } />
                      <Route path="/instructor/analytics" element={
                        <InstructorRoute>
                          <Analytics />
                        </InstructorRoute>
                      } />
                      <Route path="/instructor/reviews" element={
                        <InstructorRoute>
                          <Reviews />
                        </InstructorRoute>
                      } />
                      <Route path="/instructor/settings" element={
                        <InstructorRoute>
                          <Settings />
                        </InstructorRoute>
                      } />

                      {/* Admin Routes */}
                      <Route path="/admin" element={
                        <AdminRoute>
                          <Overview />
                        </AdminRoute>
                      } />
                      <Route path="/admin/users" element={
                        <AdminRoute>
                          <UserManagement />
                        </AdminRoute>
                      } />
                      <Route path="/admin/courses" element={
                        <AdminRoute>
                          <CourseManagement />
                        </AdminRoute>
                      } />
                      <Route path="/admin/categories" element={
                        <AdminRoute>
                          <CategoryManagement />
                        </AdminRoute>
                      } />
                      <Route path="/admin/course-review" element={
                        <AdminRoute>
                          <CourseReview />
                        </AdminRoute>
                      } />
                      <Route path="/admin/coupons" element={
                        <AdminRoute>
                          <CouponManagement />
                        </AdminRoute>
                      } />
                      <Route path="/admin/revenue" element={
                        <AdminRoute>
                          <Revenue />
                        </AdminRoute>
                      } />
                      <Route path="/admin/support" element={
                        <AdminRoute>
                          <Support />
                        </AdminRoute>
                      } />
                      <Route path="/admin/settings" element={
                        <AdminRoute>
                          <SiteSettings />
                        </AdminRoute>
                      } />

                      {/* 404 Route */}
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Layout>
                </SupportProvider>
              </CouponProvider>
            </SettingsProvider>
          </CategoryProvider>
        </CourseProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;