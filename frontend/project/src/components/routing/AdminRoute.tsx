import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  console.log('AdminRoute - Auth State:', { isAuthenticated, user });
  
  if (!isAuthenticated) {
    console.log('AdminRoute - Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has admin role
  if (!user?.role || user.role !== 'admin') {
    console.log('AdminRoute - Not admin, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }
  
  console.log('AdminRoute - Admin access granted');
  return <>{children}</>;
};

export default AdminRoute; 