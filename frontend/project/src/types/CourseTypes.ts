export interface CourseQuiz {
  id: string;
  courseId: string;
  sectionId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  duration: number; // in minutes
  passingScore: number;
  attempts: number; // maximum number of attempts allowed
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options: QuizOption[];
  correctAnswer: string | number;
  points: number;
  explanation?: string; // Explanation shown after answering
  order: number;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface StudentQuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  answers: {
    questionId: string;
    answer: string | number;
  }[];
  score: number;
  passed: boolean;
  startedAt: string;
  completedAt: string;
}

export interface CourseQuestion {
  id: string;
  courseId: string;
  lessonId: string;
  studentId: string;
  studentName: string;
  question: string;
  createdAt: string;
  status: 'pending' | 'answered';
  answer?: {
    content: string;
    answeredAt: string;
    instructorId: string;
    instructorName: string;
  };
  isPublic: boolean; // Whether other students can see this Q&A
  likes: number;
  replies: QuestionReply[];
}

export interface QuestionReply {
  id: string;
  questionId: string;
  userId: string;
  userName: string;
  userRole: 'student' | 'instructor';
  content: string;
  createdAt: string;
  likes: number;
}

export interface CourseManagement {
  updateCourse: (courseId: string, data: Partial<CourseBasicInfo>) => Promise<boolean>;
  deleteCourse: (courseId: string) => Promise<boolean>;
  publishCourse: (courseId: string) => Promise<boolean>;
  unpublishCourse: (courseId: string) => Promise<boolean>;
  addQuiz: (courseId: string, sectionId: string, quiz: Omit<CourseQuiz, 'id' | 'courseId' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updateQuiz: (quizId: string, data: Partial<CourseQuiz>) => Promise<boolean>;
  deleteQuiz: (quizId: string) => Promise<boolean>;
  answerQuestion: (questionId: string, answer: string) => Promise<boolean>;
} 