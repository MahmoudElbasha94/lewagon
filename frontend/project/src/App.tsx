import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';
import 'aos/dist/aos.css';
import CareerQuiz from './components/CareerQuiz.tsx';
import FreeEvents from './components/FreeEvents.tsx';
import FreeCourses from './components/FreeCourses.tsx';
// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { CourseProvider } from './contexts/CourseContext';

// Pages
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import BlogPage from './pages/BlogPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import InstructorsPage from './pages/InstructorsPage';

// Components
import ProtectedRoute from './components/routing/ProtectedRoute';
import AdminRoute from './components/routing/AdminRoute';
import Layout from './components/layout/Layout';

function App() {
  // Initialize AOS
  React.useEffect(() => {
    const initializeAOS = async () => {
      const AOS = await import('aos');
      AOS.default.init({
        duration: 800,
        once: true,
        mirror: false,
      });
    };

    initializeAOS();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CourseProvider>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="courses/detail" element={<CourseDetailPage />} />
                <Route 
                  path="courses/:courseId/lessons/:lessonId" 
                  element={
                    <ProtectedRoute>
                      <LessonPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
                <Route 
                  path="dashboard" 
                  element={
                    <ProtectedRoute>
                      <StudentDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="admin" 
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="checkout/:courseId" 
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="faq" element={<FAQPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="instructors" element={<InstructorsPage />} />
                <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="terms-of-service" element={<TermsOfServicePage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="career-quiz" element={<CareerQuiz />} />
                <Route path="free-events" element={<FreeEvents />} />
                <Route path="free-courses" element={<FreeCourses />} />
              </Route>
            </Routes>
          </AnimatePresence>
          <ToastContainer position="bottom-right" />
        </CourseProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;