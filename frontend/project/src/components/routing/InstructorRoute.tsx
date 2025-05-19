import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface InstructorRouteProps {
  children: React.ReactNode;
}

const InstructorRoute: React.FC<InstructorRouteProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has instructor role
  if (!user?.role || user.role !== 'instructor') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default InstructorRoute; 