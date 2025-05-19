import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Award,
  RefreshCcw
} from 'lucide-react';
import { Quiz, QuizQuestion, QuizAttempt } from '../types/Quiz';
import { useAuth } from '../contexts/AuthContext';
import confetti from 'canvas-confetti';

const QuizPage: React.FC = () => {
  const { lessonId, quizId } = useParams<{ lessonId: string; quizId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizAttempt | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Fetch quiz data
  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchQuiz = async () => {
      try {
        // Simulated quiz data
        const mockQuiz: Quiz = {
          id: quizId || '1',
          lessonId: lessonId || '1',
          title: 'Module Quiz',
          description: 'Test your knowledge of this lesson',
          timeLimit: 30,
          passingScore: 70,
          totalPoints: 100,
          questions: [
            {
              id: '1',
              question: 'What is React?',
              options: [
                { id: 'a', text: 'A JavaScript library', isCorrect: true },
                { id: 'b', text: 'A programming language', isCorrect: false },
                { id: 'c', text: 'A database', isCorrect: false },
                { id: 'd', text: 'An operating system', isCorrect: false }
              ],
              explanation: 'React is a JavaScript library for building user interfaces.',
              points: 25
            },
            // Add more questions...
          ]
        };
        setQuiz(mockQuiz);
        setTimeLeft(mockQuiz.timeLimit * 60);
      } catch (error) {
        toast.error('Failed to load quiz');
      }
    };

    fetchQuiz();
  }, [quizId, lessonId]);

  // Timer countdown
  useEffect(() => {
    if (!isSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, isSubmitted]);

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!quiz || !user) return;

    const answers = Object.entries(selectedAnswers).map(([questionId, optionId]) => {
      const question = quiz.questions.find(q => q.id === questionId);
      const isCorrect = question?.options.find(o => o.id === optionId)?.isCorrect || false;
      return { questionId, selectedOptionId: optionId, isCorrect };
    });

    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const score = (correctAnswers / quiz.questions.length) * 100;
    const passed = score >= quiz.passingScore;

    const attempt: QuizAttempt = {
      id: Date.now().toString(),
      userId: user.id,
      quizId: quiz.id,
      startTime: new Date(Date.now() - timeLeft * 1000),
      endTime: new Date(),
      score,
      answers,
      passed
    };

    setQuizResult(attempt);
    setIsSubmitted(true);

    if (passed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // TODO: Save attempt to backend
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const navigateQuestion = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (direction === 'next' && quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const retakeQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setQuizResult(null);
    setShowExplanation(false);
    if (quiz) {
      setTimeLeft(quiz.timeLimit * 60);
    }
  };

  if (!quiz) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const hasAnsweredAll = quiz.questions.every(q => selectedAnswers[q.id]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {!isSubmitted ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Quiz Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">{quiz.title}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </span>
                <div className={`flex items-center ${
                  timeLeft < 60 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`
                }}
              />
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectAnswer(currentQuestion.id, option.id)}
                    className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                      selectedAnswers[currentQuestion.id] === option.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigateQuestion('prev')}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 flex items-center text-gray-600 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Previous
              </button>
              {isLastQuestion ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={!hasAnsweredAll}
                  className={`px-6 py-2 rounded-lg ${
                    hasAnsweredAll
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={() => navigateQuestion('next')}
                  className="px-4 py-2 flex items-center text-gray-600"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            {/* Quiz Results */}
            <div className="text-center mb-8">
              <div className="mb-4">
                {quizResult?.passed ? (
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {quizResult?.passed ? 'Congratulations!' : 'Keep Practicing!'}
              </h2>
              <p className="text-gray-600 mb-4">
                You scored {quizResult?.score.toFixed(0)}% ({quizResult?.passed ? 'Passed' : 'Failed'})
              </p>
            </div>

            {/* Question Review */}
            <div className="space-y-6 mb-8">
              {quiz.questions.map((question, index) => {
                const selectedOption = question.options.find(
                  o => o.id === selectedAnswers[question.id]
                );
                const isCorrect = selectedOption?.isCorrect;

                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold">
                        Question {index + 1}: {question.question}
                      </h3>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="space-y-2">
                      {question.options.map(option => (
                        <div
                          key={option.id}
                          className={`p-3 rounded-lg ${
                            selectedAnswers[question.id] === option.id
                              ? option.isCorrect
                                ? 'bg-green-100'
                                : 'bg-red-100'
                              : option.isCorrect
                              ? 'bg-green-100'
                              : 'bg-gray-50'
                          }`}
                        >
                          {option.text}
                        </div>
                      ))}
                    </div>
                    {showExplanation && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="px-6 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                {showExplanation ? 'Hide' : 'Show'} Explanations
              </button>
              <button
                onClick={retakeQuiz}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                <RefreshCcw className="w-4 h-4 mr-2 inline" />
                Retake Quiz
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizPage; 