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

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  attachments: Attachment[];
  order: number;
  isCompleted?: boolean;
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
  role: 'admin' | 'instructor' | 'student';
  avatar?: string;
  createdAt: string;
  lastLogin: string;
  isActive: boolean;
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    theme: 'light' | 'dark';
  };
}

export interface ProfileUpdateData {
  name: string;
  email: string;
  avatar?: File;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ProfileFormData extends ProfileUpdateData {
  notifications: boolean;
  emailUpdates: boolean;
  theme: 'light' | 'dark';
}

export interface PurchaseHistory {
  id: string;
  courseId: string;
  courseName: string;
  courseImage: string;
  purchaseDate: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  invoiceUrl?: string;
  transactionId: string;
}

export interface Invoice {
  id: string;
  purchaseId: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'overdue';
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  billingDetails: {
    name: string;
    email: string;
    address?: string;
    country?: string;
  };
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'paypal';
  last4?: string;
  expiryDate?: string;
  cardType?: string;
  isDefault: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
}

export interface Review {
  userName: string;
  rating: number;
  comment: string;
  date: string;
  userAvatar: string;
  helpful: number;
}