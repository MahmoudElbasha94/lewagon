import React, { useState, useEffect } from 'react';
import { useCourses } from '../../contexts/CourseContext';                                                                                                                                                                                                                                                        
import { CourseQuestion } from '../../types/CourseTypes';

interface QAManagerProps {
  courseId: string;
  lessonId?: string;
}

const QAManager: React.FC<QAManagerProps> = ({ courseId, lessonId }) => {
  const { questions, answerQuestion, loading } = useCourses();
  const [selectedQuestion, setSelectedQuestion] = useState<CourseQuestion | null>(null);
  const [answer, setAnswer] = useState('');

  // Filter questions based on courseId and lessonId (if provided)
  const filteredQuestions = questions.filter(q => 
    q.courseId === courseId && (!lessonId || q.lessonId === lessonId)
  );

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedQuestion && answer.trim()) {
      const success = await answerQuestion(selectedQuestion.id, answer);
      if (success) {
        setSelectedQuestion(null);
        setAnswer('');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Student Questions</h2>

      <div className="space-y-6">
        {filteredQuestions.map(question => (
          <div
            key={question.id}
            className={`border rounded-lg p-4 ${
              question.status === 'answered' ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{question.studentName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(question.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  question.status === 'answered'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {question.status.toUpperCase()}
              </span>
            </div>

            <p className="mt-2">{question.question}</p>

            {question.answer && (
              <div className="mt-4 pl-4 border-l-2 border-indigo-500">
                <p className="text-sm font-medium">Your Answer:</p>
                <p className="mt-1 text-gray-600">{question.answer.content}</p>
                <p className="mt-1 text-xs text-gray-500">
                  Answered on {new Date(question.answer.answeredAt).toLocaleDateString()}
                </p>
              </div>
            )}

            {question.status === 'pending' && (
              <div className="mt-4">
                {selectedQuestion?.id === question.id ? (
                  <form onSubmit={handleSubmitAnswer}>
                    <textarea
                      value={answer}
                      onChange={e => setAnswer(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      rows={3}
                      placeholder="Type your answer here..."
                      required
                    />
                    <div className="mt-2 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedQuestion(null);
                          setAnswer('');
                        }}
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 disabled:bg-indigo-400"
                      >
                        {loading ? 'Submitting...' : 'Submit Answer'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setSelectedQuestion(question)}
                    className="mt-2 text-indigo-600 hover:text-indigo-800"
                  >
                    Answer Question
                  </button>
                )}
              </div>
            )}

            {question.replies && question.replies.length > 0 && (
              <div className="mt-4 space-y-3">
                <p className="text-sm font-medium text-gray-700">
                  {question.replies.length} Replies
                </p>
                {question.replies.map(reply => (
                  <div key={reply.id} className="pl-4 border-l border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {reply.userName}
                        <span className="ml-2 text-xs text-gray-500">
                          {reply.userRole}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {filteredQuestions.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No questions yet
          </div>
        )}
      </div>
    </div>
  );
};

export default QAManager; 