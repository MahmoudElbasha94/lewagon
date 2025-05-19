/*
ملف سياق المدربين
هذا الملف يحتوي على وظائف إدارة المدربين في التطبيق
سيتم استبداله بملف views.py في Django مع استخدام Django REST Framework
*/

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';
import type { Instructor } from '../types/Instructor';

// تعريف نوع طلب المدرب
interface InstructorApplication {
  id: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  expertise: string[];
  experience: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

// تعريف نوع الملف الشخصي للمدرب
interface InstructorProfile {
  id: string;
  userId: string;
  bio: string;
  expertise: string[];
  experience: string;
  education: string;
  achievements: string[];
  socialLinks: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  rating: number;
  totalStudents: number;
  totalCourses: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

// تعريف نوع إحصائيات المدرب
interface InstructorStats {
  totalStudents: number;
  totalCourses: number;
  totalEarnings: number;
  totalReviews: number;
  averageRating: number;
  monthlyStats: {
    month: string;
    earnings: number;
    newStudents: number;
    newReviews: number;
  }[];
}

// تعريف نوع أرباح المدرب
interface InstructorEarnings {
  id: string;
  instructorId: string;
  courseId: string;
  courseName: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
}

// تعريف نوع سياق المدربين
interface InstructorContextType {
  application: InstructorApplication | null;
  profile: InstructorProfile | null;
  stats: InstructorStats | null;
  earnings: InstructorEarnings[];
  loading: boolean;
  error: string | null;
  submitApplication: (data: Omit<InstructorApplication, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProfile: (data: Partial<InstructorProfile>) => Promise<void>;
  getStats: (period?: 'week' | 'month' | 'year') => Promise<InstructorStats>;
  getEarnings: (period?: 'week' | 'month' | 'year') => Promise<InstructorEarnings[]>;
  instructors: Instructor[];
  fetchInstructors: () => Promise<void>;
  getInstructor: (id: string) => Promise<Instructor>;
  createInstructor: (instructor: Omit<Instructor, 'id'>) => Promise<void>;
  updateInstructor: (id: string, instructor: Partial<Instructor>) => Promise<void>;
  deleteInstructor: (id: string) => Promise<void>;
  approveInstructor: (id: string) => Promise<void>;
  rejectInstructor: (id: string) => Promise<void>;
  getInstructorStats: (id: string) => Promise<any>;
  getInstructorEarnings: (id: string) => Promise<any>;
}

// إنشاء سياق المدربين
const InstructorContext = createContext<InstructorContextType | undefined>(undefined);

// مكون مزود المدربين
export const InstructorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [application, setApplication] = useState<InstructorApplication | null>(null);
  const [profile, setProfile] = useState<InstructorProfile | null>(null);
  const [stats, setStats] = useState<InstructorStats | null>(null);
  const [earnings, setEarnings] = useState<InstructorEarnings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  // تحميل بيانات المدرب عند بدء التشغيل
  useEffect(() => {
    if (user) {
      loadInstructorData();
    }
  }, [user]);

  // وظيفة تحميل بيانات المدرب
  const loadInstructorData = async () => {
    try {
      // في التطبيق الحقيقي، سيكون هذا استدعاء API للخادم
      const storedApplication = localStorage.getItem(`instructor_application_${user?.id}`);
      const storedProfile = localStorage.getItem(`instructor_profile_${user?.id}`);
      const storedStats = localStorage.getItem(`instructor_stats_${user?.id}`);
      const storedEarnings = localStorage.getItem(`instructor_earnings_${user?.id}`);

      if (storedApplication) setApplication(JSON.parse(storedApplication));
      if (storedProfile) setProfile(JSON.parse(storedProfile));
      if (storedStats) setStats(JSON.parse(storedStats));
      if (storedEarnings) setEarnings(JSON.parse(storedEarnings));

      setLoading(false);
    } catch (error) {
      setError('فشل تحميل بيانات المدرب');
      setLoading(false);
    }
  };

  // وظيفة تقديم طلب مدرب
  const submitApplication = async (data: Omit<InstructorApplication, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      // في التطبيق الحقيقي، سيكون هذا استدعاء API للخادم
      const newApplication: InstructorApplication = {
        id: Math.random().toString(36).substring(2, 9),
        userId: user?.id || '',
        status: 'pending',
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setApplication(newApplication);
      localStorage.setItem(`instructor_application_${user?.id}`, JSON.stringify(newApplication));

      addNotification({
        userId: user?.id || '',
        title: 'تم تقديم طلب المدرب',
        message: 'تم تقديم طلبك بنجاح. سنقوم بمراجعته قريباً.',
        type: 'success'
      });

      setError(null);
    } catch (err) {
      setError('فشل تقديم طلب المدرب');
      console.error('خطأ في تقديم طلب المدرب:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // وظيفة تحديث الملف الشخصي للمدرب
  const updateProfile = async (data: Partial<InstructorProfile>) => {
    try {
      setLoading(true);
      // في التطبيق الحقيقي، سيكون هذا استدعاء API للخادم
      if (profile) {
        const updatedProfile = {
          ...profile,
          ...data,
          updatedAt: new Date().toISOString()
        };

        setProfile(updatedProfile);
        localStorage.setItem(`instructor_profile_${user?.id}`, JSON.stringify(updatedProfile));

        addNotification({
          userId: user?.id || '',
          title: 'تم تحديث الملف الشخصي',
          message: 'تم تحديث ملفك الشخصي بنجاح.',
          type: 'success'
        });

        setError(null);
      }
    } catch (err) {
      setError('فشل تحديث الملف الشخصي');
      console.error('خطأ في تحديث الملف الشخصي:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // وظيفة جلب إحصائيات المدرب
  const getStats = async (period: 'week' | 'month' | 'year' = 'month'): Promise<InstructorStats> => {
    try {
      // في التطبيق الحقيقي، سيكون هذا استدعاء API للخادم مع معامل الفترة
      const mockStats: InstructorStats = {
        totalStudents: 150,
        totalCourses: 5,
        totalEarnings: 15000,
        totalReviews: 75,
        averageRating: 4.5,
        monthlyStats: [
          {
            month: '2024-01',
            earnings: 3000,
            newStudents: 30,
            newReviews: 15
          },
          {
            month: '2024-02',
            earnings: 3500,
            newStudents: 35,
            newReviews: 20
          },
          {
            month: '2024-03',
            earnings: 4000,
            newStudents: 40,
            newReviews: 25
          }
        ]
      };

      setStats(mockStats);
      return mockStats;
    } catch (error) {
      setError('فشل جلب الإحصائيات');
      throw error;
    }
  };

  // وظيفة جلب أرباح المدرب
  const getEarnings = async (period: 'week' | 'month' | 'year' = 'month'): Promise<InstructorEarnings[]> => {
    try {
      // في التطبيق الحقيقي، سيكون هذا استدعاء API للخادم مع معامل الفترة
      const mockEarnings: InstructorEarnings[] = [
        {
          id: '1',
          instructorId: user?.id || '',
          courseId: 'course-1',
          courseName: 'Advanced Web Development',
          amount: 1500,
          date: '2024-03-15',
          status: 'paid'
        },
        {
          id: '2',
          instructorId: user?.id || '',
          courseId: 'course-2',
          courseName: 'React Masterclass',
          amount: 2000,
          date: '2024-03-10',
          status: 'pending'
        }
      ];

      setEarnings(mockEarnings);
      return mockEarnings;
    } catch (error) {
      setError('فشل جلب الأرباح');
      throw error;
    }
  };

  return (
    <InstructorContext.Provider
      value={{
        application,
        profile,
        stats,
        earnings,
        loading,
        error,
        submitApplication,
        updateProfile,
        getStats,
        getEarnings,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
};

// مكون استخدام سياق المدربين
export const useInstructor = () => {
  const context = useContext(InstructorContext);
  if (context === undefined) {
    throw new Error('useInstructor must be used within an InstructorProvider');
  }
  return context;
}; 