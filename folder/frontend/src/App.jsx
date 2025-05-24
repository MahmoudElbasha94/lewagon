import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import Navbar from './components/layout/Navbar';
import AdminNavbar from './components/layout/AdminNavbar';
import InstructorNavbar from './components/layout/InstructorNavbar';
import StudentNavbar from './components/layout/StudentNavbar';
import Navbar from './components/layout/Navbar23';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Courses from './pages/CoursesPage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/Admin/admin_dashboard';
import InstructorDashboard from './components/dashboard/InstructorDashboard';
import StudentDashboard from './components/dashboard/StudentDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import AddInstructor from './pages/Admin/AddInstructor';
import ManageInstructors from './pages/Admin/ManageInstructors';
import ManageCourses from './pages/Admin/ManageCourses';
import ManageStudents from './pages/Admin/ManageStudents';
import AddCourse from './components/courses/AddCourse';
import EditCourse from './components/courses/EditCourse';
import MyCourses from './components/courses/MyCourses';
import InstructorProfile from './components/profile/InstructorProfile';
import StudentProfile from './components/profile/StudentProfile';
import AdminProfile from './components/profile/AdminProfile';
import CourseDetail from './pages/CourseDetail';
import FAQ from './pages/FAQ';
import HelpCenter from './pages/HelpCenter';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isInstructorRoute = location.pathname.startsWith('/instructor');
  const isStudentRoute = location.pathname.startsWith('/student');
  const isPublicRoute = !isAdminRoute && !isInstructorRoute && !isStudentRoute;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        {isAdminRoute && <AdminNavbar />}
        {isInstructorRoute && <InstructorNavbar />}
        {isStudentRoute && <StudentNavbar />}
        {isPublicRoute && <Navbar isScrolled={isScrolled} />}
        
        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/add-instructor" element={
              <ProtectedRoute>
                <AddInstructor />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/manage-instructors" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageInstructors />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/manage-courses" element={<ProtectedRoute allowedRoles={['admin']}><ManageCourses /></ProtectedRoute>} />
            <Route path="/admin/manage-students" element={<ProtectedRoute allowedRoles={['admin']}><ManageStudents /></ProtectedRoute>} />
            
            <Route path="/instructor/dashboard" element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <InstructorDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/student/dashboard" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/instructor/add-course" element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <AddCourse />
              </ProtectedRoute>
            } />
            
            <Route path="/instructor/edit-course/:courseId" element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <EditCourse />
              </ProtectedRoute>
            } />
            
            <Route path="/instructor/courses" element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <MyCourses />
              </ProtectedRoute>
            } />
            
            <Route path="/instructor/profile" element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <InstructorProfile />
              </ProtectedRoute>
            } />
            
            <Route path="/student/profile" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentProfile />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/profile" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminProfile />
              </ProtectedRoute>
            } />
            
            {/* Redirect based on user role */}
            <Route path="/dashboard" element={<HomeRedirect />} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
            
            <Route path="/faq" element={<FAQ />} />
            <Route path="/help" element={<HelpCenter />} />
          </Routes>
        </main>
        {isPublicRoute && <Footer />}
      </div>
    </AuthProvider>
  );
}

function HomeRedirect() {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  
  if (user.is_superuser) return <Navigate to="/admin/dashboard" />;
  if (user.is_instructor) return <Navigate to="/instructor/dashboard" />;
  return <Navigate to="/student/dashboard" />;
}

export default App;