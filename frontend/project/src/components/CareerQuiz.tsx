import React, { useState } from 'react';

interface Question {
  id: number;
  text: string;
  options: string[];
}

const CareerQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      text: "What interests you most when working with technology?",
      options: [
        "Building websites and user interfaces",
        "Analyzing data and finding patterns",
        "Creating mobile applications",
        "Working with artificial intelligence"
      ]
    },
    {
      id: 2,
      text: "How do you prefer to solve problems?",
      options: [
        "Visually and creatively",
        "Analytically and methodically",
        "Through experimentation",
        "By collaborating with others"
      ]
    },
    {
      id: 3,
      text: "What type of projects excite you the most?",
      options: [
        "User-facing applications",
        "Backend systems and databases",
        "Data analysis and visualization",
        "Machine learning and AI"
      ]
    }
  ];

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Career Quiz</h1>
      <div className="max-w-2xl mx-auto">
        {currentQuestion < questions.length ? (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="mb-8">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <h2 className="text-xl font-semibold mt-2">
                {questions[currentQuestion].text}
              </h2>
            </div>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left px-6 py-4 border rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Quiz Completed!</h2>
            <p className="text-gray-600 mb-6">
              Based on your answers, you might be interested in:
              {answers.includes("Building websites and user interfaces") && (
                <span className="block mt-2">• Web Development</span>
              )}
              {answers.includes("Analyzing data and finding patterns") && (
                <span className="block mt-2">• Data Science</span>
              )}
              {answers.includes("Creating mobile applications") && (
                <span className="block mt-2">• Mobile Development</span>
              )}
              {answers.includes("Working with artificial intelligence") && (
                <span className="block mt-2">• AI & Machine Learning</span>
              )}
            </p>
            <button
              onClick={resetQuiz}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Take Quiz Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerQuiz; 