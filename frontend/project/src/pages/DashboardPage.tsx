import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import InstructorDashboard from './InstructorDashboard';
import StudentDashboard from './student/Dashboard';

// TODO: في Django، سيتم استخدام:
// 1. Django Class-Based Views بدلاً من React Components
// 2. Django Templates بدلاً من JSX
// 3. Django Context بدلاً من React State
// 4. Django ORM بدلاً من API Calls
// 5. Django Forms بدلاً من Form Handling

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Route to appropriate dashboard based on user role
  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'instructor':
      return <InstructorDashboard />;
    case 'student':
      return <StudentDashboard />;
    default:
      // If role is not recognized, redirect to login
      return <Navigate to="/login" replace />;
  }
};

export default DashboardPage;