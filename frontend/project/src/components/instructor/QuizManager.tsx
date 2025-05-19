import React, { useState } from 'react';
import { useCourses } from '../../contexts/CourseContext';
import { CourseQuiz, QuizQuestion } from '../../types/CourseTypes';

interface QuizManagerProps {
  courseId: string;
  sectionId: string;
}

const QuizManager: React.FC<QuizManagerProps> = ({ courseId, sectionId }) => {
  const { addQuiz, updateQuiz, deleteQuiz, loading } = useCourses();
  const [showForm, setShowForm] = useState(false);
  const [quizData, setQuizData] = useState<Partial<CourseQuiz>>({
    title: '',
    description: '',
    duration: 30,
    passingScore: 70,
    attempts: 2,
    questions: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quizData.title && quizData.questions?.length) {
      const success = await addQuiz(courseId, sectionId, quizData as Omit<CourseQuiz, 'id' | 'courseId' | 'createdAt' | 'updatedAt'>);
      if (success) {
        setShowForm(false);
        setQuizData({
          title: '',
          description: '',
          duration: 30,
          passingScore: 70,
          attempts: 2,
          questions: []
        });
      }
    }
  };

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Math.random().toString(36).substring(2, 9),
      quizId: '',
      question: '',
      type: 'multiple_choice',
      options: [
        { id: '1', text: '', isCorrect: false },
        { id: '2', text: '', isCorrect: false },
        { id: '3', text: '', isCorrect: false },
        { id: '4', text: '', isCorrect: false }
      ],
      correctAnswer: '',
      points: 10,
      order: (quizData.questions?.length || 0) + 1
    };

    setQuizData(prev => ({
      ...prev,
      questions: [...(prev.questions || []), newQuestion]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Quiz Manager</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {showForm ? 'Cancel' : 'Add New Quiz'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quiz Title
            </label>
            <input
              type="text"
              value={quizData.title}
              onChange={e => setQuizData(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={quizData.description}
              onChange={e => setQuizData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={quizData.duration}
                onChange={e => setQuizData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Passing Score (%)
              </label>
              <input
                type="number"
                value={quizData.passingScore}
                onChange={e => setQuizData(prev => ({ ...prev, passingScore: parseInt(e.target.value) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                min="0"
                max="100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Attempts Allowed
              </label>
              <input
                type="number"
                value={quizData.attempts}
                onChange={e => setQuizData(prev => ({ ...prev, attempts: parseInt(e.target.value) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Questions</h3>
              <button
                type="button"
                onClick={addQuestion}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Question
              </button>
            </div>

            <div className="space-y-4">
              {quizData.questions?.map((question, index) => (
                <div key={question.id} className="border rounded-md p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Question {index + 1}
                    </label>
                    <input
                      type="text"
                      value={question.question}
                      onChange={e => {
                        const updatedQuestions = [...(quizData.questions || [])];
                        updatedQuestions[index] = {
                          ...question,
                          question: e.target.value
                        };
                        setQuizData(prev => ({ ...prev, questions: updatedQuestions }));
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`correct_${question.id}`}
                          checked={question.correctAnswer === option.id}
                          onChange={() => {
                            const updatedQuestions = [...(quizData.questions || [])];
                            updatedQuestions[index] = {
                              ...question,
                              correctAnswer: option.id
                            };
                            setQuizData(prev => ({ ...prev, questions: updatedQuestions }));
                          }}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <input
                          type="text"
                          value={option.text}
                          onChange={e => {
                            const updatedQuestions = [...(quizData.questions || [])];
                            const updatedOptions = [...question.options];
                            updatedOptions[optIndex] = {
                              ...option,
                              text: e.target.value
                            };
                            updatedQuestions[index] = {
                              ...question,
                              options: updatedOptions
                            };
                            setQuizData(prev => ({ ...prev, questions: updatedQuestions }));
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder={`Option ${optIndex + 1}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
            >
              {loading ? 'Saving...' : 'Save Quiz'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default QuizManager; 