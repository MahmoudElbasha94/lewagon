// واجهة المستخدم
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'student';
  avatar: string;
  createdAt: string;
  lastLogin: string;
  isActive: boolean;
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    theme: 'light' | 'dark';
  };
} 