export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  explanation: string;
  points: number;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  passingScore: number;
  questions: QuizQuestion[];
  totalPoints: number;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  startTime: Date;
  endTime: Date;
  score: number;
  answers: {
    questionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
  }[];
  passed: boolean;
} 