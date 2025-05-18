import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function - simulated
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in a real app, this would be a backend API call
      if (email === 'admin@test.com' && password === 'Admin@123') {
        const userData: User = {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@test.com',
          role: 'admin',
          avatar: '/images/avatars/admin.jpg',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          isActive: true,
          preferences: {
            notifications: true,
            emailUpdates: true,
            theme: 'light'
          }
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('تم تسجيل الدخول كمسؤول');
        return true;
      } else if (email === 'user@test.com' && password === 'User@123') {
        const userData: User = {
          id: 'user-1',
          name: 'Regular User',
          email: 'user@test.com',
          role: 'user',
          avatar: '/images/avatars/user.jpg',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          isActive: true,
          preferences: {
            notifications: true,
            emailUpdates: true,
            theme: 'light'
          }
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('تم تسجيل الدخول بنجاح!');
        return true;
      } else {
        toast.error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        return false;
      }
    } catch (error) {
      toast.error('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Signup function - simulated
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be a backend API call
      const userData: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role: 'user',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true,
        preferences: {
          notifications: true,
          emailUpdates: true,
          theme: 'light'
        }
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('تم إنشاء الحساب بنجاح!');
      return true;
    } catch (error) {
      toast.error('فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('تم تسجيل الخروج');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};