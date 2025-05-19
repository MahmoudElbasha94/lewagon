/**
 * TODO: التغييرات المطلوبة للجانغو:
 * 1. سيتم استبدال هذا المكون بـ Django Login Required Decorator
 * 2. سيتم استخدام Django Authentication Middleware بدلاً من useAuth hook
 * 3. سيتم استخدام Django Redirect بدلاً من Navigate
 * 4. سيتم استخدام Django Messages Framework للإشعارات
 * 5. سيتم استخدام Django Session Management بدلاً من loading state
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// TODO: في الجانغو، سيتم استخدام Django Template Context بدلاً من Props Interface
// TODO: سيتم استخدام Django Template Tags بدلاً من React Props

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // TODO: في الجانغو، سيتم استخدام Django Authentication Middleware بدلاً من useAuth hook
  // TODO: سيتم استخدام Django Session بدلاً من loading state
  // TODO: سيتم استخدام Django URL Patterns بدلاً من useLocation
  // TODO: سيتم استخدام Django Template Context بدلاً من Props

  // Show loading state while checking authentication
  if (loading) {
    // TODO: في الجانغو، سيتم استخدام Django Template Tags لعرض حالة التحميل
    // TODO: سيتم استخدام Django Static Files بدلاً من CSS Classes
    // TODO: سيتم استخدام Django Template Context بدلاً من loading state
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // TODO: في الجانغو، سيتم استخدام Django Login Required Decorator بدلاً من Redirect
    // TODO: سيتم استخدام Django Messages Framework للإشعارات
    // TODO: سيتم استخدام Django URL Patterns بدلاً من location state
    // TODO: سيتم استخدام Django Template Context بدلاً من isAuthenticated state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

// TODO: في الجانغو، سيتم استخدام Django Template Tags بدلاً من React Components
// TODO: سيتم استخدام Django Template Inheritance بدلاً من Component Composition
// TODO: سيتم استخدام Django Template Context بدلاً من children prop

export default ProtectedRoute;