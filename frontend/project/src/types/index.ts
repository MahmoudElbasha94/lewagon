export * from './Course';

export interface Instructor {
  id: string | number;
  name: string;
  bio: string;
  avatar: string;
  expertise: string[];
  rating: number;
  totalStudents: number;
  totalCourses: number;
  email: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  description?: string;
  completed?: boolean;
}

export interface UserProgress {
  id: string;
  completed: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt?: string;
  lastLogin?: string;
  isActive?: boolean;
  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    theme: 'light' | 'dark';
  };
}