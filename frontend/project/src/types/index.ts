/**
 * TODO: التغييرات المطلوبة للجانغو:
 * 1. سيتم استبدال هذه الـ interfaces بـ Django Models في models.py
 * 2. سيتم استخدام Django Model Fields بدلاً من TypeScript types
 * 3. سيتم إضافة Meta classes للـ models لتحديد العلاقات والخصائص
 * 4. سيتم استخدام Django Model Managers للتعامل مع البيانات
 * 5. سيتم إضافة Django Model Methods للوظائف المخصصة
 * 6. سيتم استخدام Django Model Validators للتحقق من صحة البيانات
 */

export * from './Course';

// تعريف واجهة المدرب - تحتوي على معلومات المدرب الأساسية وإحصائياته
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

// تعريف واجهة المرفقات - تستخدم لإرفاق ملفات مع الدروس
export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

// تعريف واجهة الدرس - تحتوي على معلومات الدرس ومحتواه
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

// تعريف واجهة التقييم - تحتوي على تقييمات الطلاب للدورات
export interface Review {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  rating: number;
  comment: string;
  date: string;
}

// تعريف واجهة المستخدم - تحتوي على معلومات المستخدم وتفضيلاته
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

// تعريف واجهة سجل المشتريات - تحتوي على تفاصيل مشتريات الطلاب للدورات
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

// تعريف واجهة الفاتورة - تحتوي على تفاصيل فواتير المشتريات
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

// تعريف واجهة طريقة الدفع - تحتوي على معلومات طرق الدفع المدخلة
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