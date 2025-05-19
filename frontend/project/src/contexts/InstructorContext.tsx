import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';
import { 
  InstructorApplication, 
  InstructorProfile, 
  InstructorStats, 
  InstructorEarnings 
} from '../types/instructor';

interface InstructorContextType {
  application: InstructorApplication | null;
  profile: InstructorProfile | null;
  stats: InstructorStats | null;
  earnings: InstructorEarnings[];
  loading: boolean;
  error: string | null;
  submitApplication: (data: Omit<InstructorApplication, 'id' | 'userId' | 'status' | 'submittedAt'>) => Promise<boolean>;
  updateProfile: (data: Partial<InstructorProfile>) => Promise<boolean>;
  getStats: (period?: 'week' | 'month' | 'year') => Promise<InstructorStats>;
  getEarnings: (period?: 'week' | 'month' | 'year') => Promise<InstructorEarnings[]>;
}

const InstructorContext = createContext<InstructorContextType | undefined>(undefined);

export const useInstructor = () => {
  const context = useContext(InstructorContext);
  if (context === undefined) {
    throw new Error('useInstructor must be used within an InstructorProvider');
  }
  return context;
};

export const InstructorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [application, setApplication] = useState<InstructorApplication | null>(null);
  const [profile, setProfile] = useState<InstructorProfile | null>(null);
  const [stats, setStats] = useState<InstructorStats | null>(null);
  const [earnings, setEarnings] = useState<InstructorEarnings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load instructor data on mount
  useEffect(() => {
    if (user) {
      loadInstructorData();
    }
  }, [user]);

  const loadInstructorData = async () => {
    try {
      // In a real app, these would be API calls
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
      setError('Failed to load instructor data');
      setLoading(false);
    }
  };

  const submitApplication = async (
    data: Omit<InstructorApplication, 'id' | 'userId' | 'status' | 'submittedAt'>
  ): Promise<boolean> => {
    try {
      const newApplication: InstructorApplication = {
        ...data,
        id: Math.random().toString(36).substring(2, 9),
        userId: user?.id || '',
        status: 'pending',
        submittedAt: new Date().toISOString(),
      };

      // In a real app, this would be an API call
      localStorage.setItem(
        `instructor_application_${user?.id}`,
        JSON.stringify(newApplication)
      );

      setApplication(newApplication);

      addNotification({
        userId: user?.id || '',
        title: 'Application Submitted',
        message: 'Your instructor application has been submitted successfully. We will review it shortly.',
        type: 'success'
      });

      return true;
    } catch (error) {
      setError('Failed to submit application');
      return false;
    }
  };

  const updateProfile = async (data: Partial<InstructorProfile>): Promise<boolean> => {
    try {
      if (!profile) return false;

      const updatedProfile = {
        ...profile,
        ...data,
      };

      // In a real app, this would be an API call
      localStorage.setItem(
        `instructor_profile_${user?.id}`,
        JSON.stringify(updatedProfile)
      );

      setProfile(updatedProfile);

      addNotification({
        userId: user?.id || '',
        title: 'Profile Updated',
        message: 'Your instructor profile has been updated successfully.',
        type: 'success'
      });

      return true;
    } catch (error) {
      setError('Failed to update profile');
      return false;
    }
  };

  const getStats = async (period: 'week' | 'month' | 'year' = 'month'): Promise<InstructorStats> => {
    try {
      // In a real app, this would be an API call with the period parameter
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
      setError('Failed to fetch stats');
      throw error;
    }
  };

  const getEarnings = async (period: 'week' | 'month' | 'year' = 'month'): Promise<InstructorEarnings[]> => {
    try {
      // In a real app, this would be an API call with the period parameter
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
      setError('Failed to fetch earnings');
      throw error;
    }
  };

  const value = {
    application,
    profile,
    stats,
    earnings,
    loading,
    error,
    submitApplication,
    updateProfile,
    getStats,
    getEarnings
  };

  return (
    <InstructorContext.Provider value={value}>
      {children}
    </InstructorContext.Provider>
  );
}; 