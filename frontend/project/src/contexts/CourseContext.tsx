import React, { createContext, useContext, useState, useEffect } from 'react';
import courseData from '../data/courses';
import { Course, Lesson, UserProgress } from '../types';

interface CourseContextType {
  courses: Course[];
  loading: boolean;
  error: string | null;
  enrollInCourse: (userId: string, courseId: string) => Promise<boolean>;
  isEnrolled: (userId: string, courseId: string) => boolean;
  getUserCourses: (userId: string) => Course[];
  markLessonComplete: (userId: string, courseId: string, lessonId: string) => void;
  getLessonProgress: (userId: string, courseId: string, lessonId: string) => boolean;
  getCourseProgress: (userId: string, courseId: string) => number;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollments, setEnrollments] = useState<string[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);

  // Load courses and user progress from local storage on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // In a real app, this would be an API call
        setCourses(courseData);
        
        // Load enrollments from localStorage
        const storedEnrollments = localStorage.getItem('enrollments');
        if (storedEnrollments) {
          setEnrollments(JSON.parse(storedEnrollments));
        }
        
        // Load progress from localStorage
        const storedProgress = localStorage.getItem('userProgress');
        if (storedProgress) {
          setProgress(JSON.parse(storedProgress));
        }
      } catch (err) {
        setError('Failed to load courses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  // Save enrollments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }, [progress]);

  // Enroll user in a course
  const enrollInCourse = async (userId: string, courseId: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      const enrollmentId = `${userId}-${courseId}`;
      if (!enrollments.includes(enrollmentId)) {
        setEnrollments([...enrollments, enrollmentId]);
      }
      return true;
    } catch (err) {
      console.error('Failed to enroll in course:', err);
      return false;
    }
  };

  // Check if user is enrolled in a course
  const isEnrolled = (userId: string, courseId: string): boolean => {
    return enrollments.includes(`${userId}-${courseId}`);
  };

  // Get all courses a user is enrolled in
  const getUserCourses = (userId: string): Course[] => {
    const userEnrollments = enrollments
      .filter(enrollment => enrollment.startsWith(`${userId}-`))
      .map(enrollment => enrollment.split('-')[1]);
    
    return courses.filter(course => userEnrollments.includes(course.id));
  };

  // Mark a lesson as complete for a user
  const markLessonComplete = (userId: string, courseId: string, lessonId: string): void => {
    const progressId = `${userId}-${courseId}-${lessonId}`;
    if (!progress.some(p => p.id === progressId)) {
      setProgress([...progress, { id: progressId, completed: true }]);
    }
  };

  // Get the completion status of a lesson for a user
  const getLessonProgress = (userId: string, courseId: string, lessonId: string): boolean => {
    const progressId = `${userId}-${courseId}-${lessonId}`;
    return progress.some(p => p.id === progressId);
  };

  // Calculate the course progress percentage for a user
  const getCourseProgress = (userId: string, courseId: string): number => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    
    const totalLessons = course.lessons.length;
    if (totalLessons === 0) return 0;
    
    const completedLessons = course.lessons.filter(lesson => 
      getLessonProgress(userId, courseId, lesson.id)
    ).length;
    
    return Math.round((completedLessons / totalLessons) * 100);
  };

  const value = {
    courses,
    loading,
    error,
    enrollInCourse,
    isEnrolled,
    getUserCourses,
    markLessonComplete,
    getLessonProgress,
    getCourseProgress,
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};