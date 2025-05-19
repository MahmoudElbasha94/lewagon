import React, { createContext, useContext, useState, useEffect } from 'react';
import courseData from '../data/courses';
import type { Course } from '../types/Course';
import type { Lesson, UserProgress } from '../types';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';
import type {
  CourseQuiz,
  QuizQuestion,
  CourseQuestion,
  CourseManagement
} from '../types/CourseTypes';
import type { CourseBasicInfo } from '../types/instructor';

interface CourseContextType extends CourseManagement {
  courses: Course[];
  loading: boolean;
  error: string | null;
  enrollInCourse: (userId: string, courseId: string) => Promise<boolean>;
  isEnrolled: (userId: string, courseId: string) => boolean;
  getUserCourses: (userId: string) => Course[];
  markLessonComplete: (userId: string, courseId: string, lessonId: string) => void;
  getLessonProgress: (userId: string, courseId: string, lessonId: string) => boolean;
  getCourseProgress: (userId: string, courseId: string) => number;
  quizzes: CourseQuiz[];
  questions: CourseQuestion[];
  updateCourse: (courseId: string, data: Partial<CourseBasicInfo>) => Promise<boolean>;
  deleteCourse: (courseId: string) => Promise<boolean>;
  publishCourse: (courseId: string) => Promise<boolean>;
  unpublishCourse: (courseId: string) => Promise<boolean>;
  addQuiz: (
    courseId: string,
    sectionId: string,
    quizData: Omit<CourseQuiz, 'id' | 'courseId' | 'createdAt' | 'updatedAt'>
  ) => Promise<boolean>;
  updateQuiz: (quizId: string, data: Partial<CourseQuiz>) => Promise<boolean>;
  deleteQuiz: (quizId: string) => Promise<boolean>;
  answerQuestion: (questionId: string, answer: string) => Promise<boolean>;
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
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [courses, setCourses] = useState<Course[]>(courseData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enrollments, setEnrollments] = useState<string[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [quizzes, setQuizzes] = useState<CourseQuiz[]>([]);
  const [questions, setQuestions] = useState<CourseQuestion[]>([]);

  // Load user progress from local storage on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
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
        setError('Failed to load user data');
        console.error(err);
      }
    };
    
    loadUserData();
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
    
    return courses.filter(course => userEnrollments.includes(String(course.id)));
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
    const course = courses.find(c => String(c.id) === courseId);
    if (!course) return 0;
    
    const totalLessons = course.lessons.length;
    if (totalLessons === 0) return 0;
    
    const completedLessons = course.lessons.filter(lesson => 
      getLessonProgress(userId, courseId, String(lesson.id))
    ).length;
    
    return Math.round((completedLessons / totalLessons) * 100);
  };

  // Course Management Functions
  const updateCourse = async (courseId: string, data: Partial<CourseBasicInfo>): Promise<boolean> => {
    try {
      setLoading(true);
      // API call would go here
      // For now, using localStorage for demo
      const courseData = localStorage.getItem(`course_${courseId}`);
      if (courseData) {
        const course = JSON.parse(courseData);
        const updatedCourse = { ...course, ...data };
        localStorage.setItem(`course_${courseId}`, JSON.stringify(updatedCourse));
        
        addNotification({
          userId: user?.id || '',
          title: 'Course Updated',
          message: 'Course details have been updated successfully.',
          type: 'success'
        });
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to update course');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId: string): Promise<boolean> => {
    try {
      setLoading(true);
      // API call would go here
      localStorage.removeItem(`course_${courseId}`);
      
      addNotification({
        userId: user?.id || '',
        title: 'Course Deleted',
        message: 'Course has been deleted successfully.',
        type: 'success'
      });
      return true;
    } catch (err) {
      setError('Failed to delete course');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const publishCourse = async (courseId: string): Promise<boolean> => {
    try {
      setLoading(true);
      // API call would go here
      const courseData = localStorage.getItem(`course_${courseId}`);
      if (courseData) {
        const course = JSON.parse(courseData);
        course.isPublished = true;
        localStorage.setItem(`course_${courseId}`, JSON.stringify(course));
        
        addNotification({
          userId: user?.id || '',
          title: 'Course Published',
          message: 'Your course is now live and visible to students.',
          type: 'success'
        });
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to publish course');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const unpublishCourse = async (courseId: string): Promise<boolean> => {
    try {
      setLoading(true);
      // API call would go here
      const courseData = localStorage.getItem(`course_${courseId}`);
      if (courseData) {
        const course = JSON.parse(courseData);
        course.isPublished = false;
        localStorage.setItem(`course_${courseId}`, JSON.stringify(course));
        
        addNotification({
          userId: user?.id || '',
          title: 'Course Unpublished',
          message: 'Your course has been unpublished and is no longer visible to students.',
          type: 'success'
        });
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to unpublish course');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Quiz Management Functions
  const addQuiz = async (
    courseId: string,
    sectionId: string,
    quizData: Omit<CourseQuiz, 'id' | 'courseId' | 'createdAt' | 'updatedAt'>
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const newQuiz: CourseQuiz = {
        ...quizData,
        id: Math.random().toString(36).substring(2, 9),
        courseId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setQuizzes([...quizzes, newQuiz]);
      localStorage.setItem(`quiz_${newQuiz.id}`, JSON.stringify(newQuiz));
      
      addNotification({
        userId: user?.id || '',
        title: 'Quiz Added',
        message: 'New quiz has been added to the course.',
        type: 'success'
      });
      return true;
    } catch (err) {
      setError('Failed to add quiz');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateQuiz = async (quizId: string, data: Partial<CourseQuiz>): Promise<boolean> => {
    try {
      setLoading(true);
      const quizIndex = quizzes.findIndex(q => q.id === quizId);
      if (quizIndex !== -1) {
        const updatedQuiz = { ...quizzes[quizIndex], ...data, updatedAt: new Date().toISOString() };
        const updatedQuizzes = [...quizzes];
        updatedQuizzes[quizIndex] = updatedQuiz;
        setQuizzes(updatedQuizzes);
        localStorage.setItem(`quiz_${quizId}`, JSON.stringify(updatedQuiz));
        
        addNotification({
          userId: user?.id || '',
          title: 'Quiz Updated',
          message: 'Quiz has been updated successfully.',
          type: 'success'
        });
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to update quiz');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async (quizId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setQuizzes(quizzes.filter(q => q.id !== quizId));
      localStorage.removeItem(`quiz_${quizId}`);
      
      addNotification({
        userId: user?.id || '',
        title: 'Quiz Deleted',
        message: 'Quiz has been deleted successfully.',
        type: 'success'
      });
      return true;
    } catch (err) {
      setError('Failed to delete quiz');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Question Management Functions
  const answerQuestion = async (questionId: string, answer: string): Promise<boolean> => {
    try {
      setLoading(true);
      const questionIndex = questions.findIndex(q => q.id === questionId);
      if (questionIndex !== -1) {
        const updatedQuestion = {
          ...questions[questionIndex],
          status: 'answered' as const,
          answer: {
            content: answer,
            answeredAt: new Date().toISOString(),
            instructorId: user?.id || '',
            instructorName: user?.name || 'Instructor'
          }
        };
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = updatedQuestion;
        setQuestions(updatedQuestions);
        localStorage.setItem(`question_${questionId}`, JSON.stringify(updatedQuestion));
        
        addNotification({
          userId: user?.id || '',
          title: 'Question Answered',
          message: 'Your answer has been posted successfully.',
          type: 'success'
        });
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to answer question');
      return false;
    } finally {
      setLoading(false);
    }
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
    quizzes,
    questions,
    updateCourse,
    deleteCourse,
    publishCourse,
    unpublishCourse,
    addQuiz,
    updateQuiz,
    deleteQuiz,
    answerQuestion
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};