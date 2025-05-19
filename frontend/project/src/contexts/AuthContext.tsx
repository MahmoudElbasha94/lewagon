import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { User, ProfileUpdateData, PasswordChangeData } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: ProfileUpdateData) => Promise<boolean>;
  updatePassword: (data: PasswordChangeData) => Promise<boolean>;
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
        toast.success('Successfully logged in as admin');
        return true;
      } else if (email === 'instructor@test.com' && password === 'Instructor@123') {
        const userData: User = {
          id: 'instructor-1',
          name: 'Instructor User',
          email: 'instructor@test.com',
          role: 'instructor',
          avatar: '/images/avatars/instructor.jpg',
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
        toast.success('Successfully logged in as instructor');
        return true;
      } else if (email === 'student@test.com' && password === 'Student@123') {
        const userData: User = {
          id: 'student-1',
          name: 'Student User',
          email: 'student@test.com',
          role: 'student',
          avatar: '/images/avatars/student.jpg',
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
        toast.success('Successfully logged in as student');
        return true;
      } else {
        toast.error('Invalid email or password');
        return false;
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
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
        role: 'student',
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
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update profile function - simulated
  const updateProfile = async (data: ProfileUpdateData): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be a backend API call
      const updatedUser: User = {
        ...user,
        name: data.name,
        email: data.email,
        avatar: data.avatar ? URL.createObjectURL(data.avatar) : user.avatar,
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      return false;
    }
  };

  // Update password function - simulated
  const updatePassword = async (data: PasswordChangeData): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would validate the current password and update it on the backend
      // For demo purposes, we'll just simulate success
      return true;
    } catch (error) {
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Successfully logged out');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    updatePassword,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};