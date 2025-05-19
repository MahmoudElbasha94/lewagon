/*
ملف إدارة التقييمات
هذا الملف يحتوي على وظائف إدارة تقييمات الطلاب في التطبيق
سيتم استبداله بملف views.py في Django مع استخدام Django REST Framework
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageCircle, Flag, Search } from 'lucide-react';
import { StudentReviewDetailed } from '../types/instructor';

const mockReviews: StudentReviewDetailed[] = [
  {
    id: '1',
    studentId: 'student1',
    studentName: 'John Doe',
    studentAvatar: 'https://i.pravatar.cc/150?u=john',
    rating: 5,
    comment: 'Excellent course! The content was well-structured and the instructor was very responsive.',
    date: '2024-03-15T10:30:00Z',
    courseId: '1',
    courseName: 'Advanced Web Development',
    helpful: 15,
    response: {
      id: 'resp1',
      instructorName: 'Jane Smith',
      comment: 'Thank you for your kind words! I\'m glad you found the course helpful.',
      date: '2024-03-15T11:30:00Z',
    },
  },
  {
    id: '2',
    studentId: 'student2',
    studentName: 'Alice Johnson',
    studentAvatar: 'https://i.pravatar.cc/150?u=alice',
    rating: 4,
    comment: 'Great course overall. Would love to see more practical examples.',
    date: '2024-03-14T15:45:00Z',
    courseId: '1',
    courseName: 'Advanced Web Development',
    helpful: 8,
  },
];

const ReviewManagement: React.FC = () => {
  const [reviews, setReviews] = useState<StudentReviewDetailed[]>(mockReviews);
  const [filter, setFilter] = useState<'all' | 'pending' | 'responded'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'helpful'>('date');

  const handleResponseSubmit = async (reviewId: string, response: string) => {
    try {
      // Replace with actual API call
      // await fetch(`/api/reviews/${reviewId}/respond`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ response }),
      // });

      setReviews(prev =>
        prev.map(review =>
          review.id === reviewId
            ? {
                ...review,
                response: {
                  id: `resp${Date.now()}`,
                  instructorName: 'Jane Smith', // Replace with actual instructor name
                  comment: response,
                  date: new Date().toISOString(),
                },
              }
            : review
        )
      );
    } catch (error) {
      console.error('Failed to submit response:', error);
    }
  };

  const handleReportReview = async (reviewId: string) => {
    try {
      // Replace with actual API call
      // await fetch(`/api/reviews/${reviewId}/report`, {
      //   method: 'POST',
      // });
      alert('Review reported successfully');
    } catch (error) {
      console.error('Failed to report review:', error);
    }
  };

  const filteredReviews = reviews
    .filter(review => {
      if (filter === 'pending') return !review.response;
      if (filter === 'responded') return !!review.response;
      return true;
    })
    .filter(review =>
      searchTerm
        ? review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.studentName.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return b.helpful - a.helpful;
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Review Management</h1>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'pending'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Pending Response
            </button>
            <button
              onClick={() => setFilter('responded')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'responded'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Responded
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'date' | 'rating' | 'helpful')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
              <option value="helpful">Sort by Helpful</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map(review => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={review.studentAvatar || 'https://via.placeholder.com/40'}
                    alt={review.studentName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{review.studentName}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-600">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{review.comment}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {review.helpful} helpful
                      </button>
                      <button
                        onClick={() => handleReportReview(review.id)}
                        className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                      >
                        <Flag className="w-4 h-4 mr-1" />
                        Report
                      </button>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.courseName}</span>
              </div>

              {review.response && (
                <div className="mt-4 pl-14">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">
                        Response from {review.response.instructorName}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {new Date(review.response.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{review.response.comment}</p>
                  </div>
                </div>
              )}

              {!review.response && (
                <div className="mt-4 pl-14">
                  <textarea
                    placeholder="Write a response..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                  <button
                    onClick={() => {
                      const textarea = document.querySelector('textarea');
                      if (textarea && textarea.value) {
                        handleResponseSubmit(review.id, textarea.value);
                        textarea.value = '';
                      }
                    }}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Submit Response
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewManagement; 