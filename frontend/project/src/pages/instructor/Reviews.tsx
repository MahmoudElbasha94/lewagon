import React, { useState, useEffect } from 'react';
import PageTransition from '../../components/common/PageTransition';
import { Star, MessageCircle, ThumbsUp, Flag, Search, Filter, Trash2, AlertCircle } from 'lucide-react';

interface Review {
  id: string;
  courseTitle: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  replied: boolean;
  reported: boolean;
  reply?: {
    content: string;
    date: string;
  };
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    // TODO: Fetch real reviews from API
    setReviews([
      {
        id: '1',
        courseTitle: 'React Fundamentals',
        studentName: 'John Smith',
        rating: 5,
        comment: 'Excellent course! The practical examples really helped me understand React concepts better.',
        date: '2024-03-15',
        helpful: 12,
        replied: true,
        reported: false,
        reply: {
          content: 'Thank you for your kind feedback! We\'re glad you found the practical examples helpful.',
          date: '2024-03-16'
        }
      },
      {
        id: '2',
        courseTitle: 'Advanced TypeScript',
        studentName: 'Emma Wilson',
        rating: 4,
        comment: 'Great content but could use more exercises. The theoretical parts were very well explained.',
        date: '2024-03-14',
        helpful: 8,
        replied: false,
        reported: false
      },
      {
        id: '3',
        courseTitle: 'Web Development',
        studentName: 'Michael Brown',
        rating: 3,
        comment: 'Good course overall. Some concepts could be explained in more detail.',
        date: '2024-03-13',
        helpful: 5,
        replied: false,
        reported: false
      }
    ]);
  }, []);

  const handleReply = (reviewId: string) => {
    if (replyText.trim()) {
      setReviews(reviews.map(review =>
        review.id === reviewId ? {
          ...review,
          replied: true,
          reply: {
            content: replyText,
            date: new Date().toISOString()
          }
        } : review
      ));
      setSelectedReview(null);
      setReplyText('');
    }
  };

  const handleDeleteReply = (reviewId: string) => {
    setReviews(reviews.map(review =>
      review.id === reviewId ? {
        ...review,
        replied: false,
        reply: undefined
      } : review
    ));
  };

  const handleReport = (reviewId: string) => {
    setReviews(reviews.map(review =>
      review.id === reviewId ? {
        ...review,
        reported: true
      } : review
    ));
  };

  const handleHelpful = (reviewId: string) => {
    setReviews(reviews.map(review =>
      review.id === reviewId ? {
        ...review,
        helpful: review.helpful + 1
      } : review
    ));
  };

  const filteredAndSortedReviews = reviews
    .filter(review => {
      const matchesSearch = review.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.studentName.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;

      switch (filter) {
        case 'positive':
          return review.rating >= 4;
        case 'negative':
          return review.rating <= 2;
        case 'unreplied':
          return !review.replied;
        case 'reported':
          return review.reported;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return sortOrder === 'desc'
          ? b.rating - a.rating
          : a.rating - b.rating;
      }
    });

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getAverageRating = () => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Reviews</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              {getAverageRating()} average rating
            </span>
            <span className="mx-2">•</span>
            <span>{reviews.length} total reviews</span>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Reviews</option>
                <option value="positive">Positive (4-5 ★)</option>
                <option value="negative">Negative (1-2 ★)</option>
                <option value="unreplied">Unreplied</option>
                <option value="reported">Reported</option>
              </select>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-');
                  setSortBy(newSortBy as 'date' | 'rating');
                  setSortOrder(newSortOrder as 'asc' | 'desc');
                }}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="rating-asc">Lowest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredAndSortedReviews.map(review => (
            <div key={review.id} className={`bg-white rounded-lg shadow p-6 ${review.reported ? 'border-l-4 border-yellow-400' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{review.courseTitle}</h3>
                  <p className="text-sm text-gray-500">{review.studentName}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-gray-700">{review.comment}</p>

              <div className="mt-4 flex items-center gap-4 text-sm">
                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center text-gray-500 hover:text-gray-700"
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  <span>{review.helpful} Helpful</span>
                </button>
                {!review.replied && (
                  <button
                    onClick={() => setSelectedReview(review.id)}
                    className="flex items-center text-blue-500 hover:text-blue-600"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>Reply</span>
                  </button>
                )}
                {!review.reported && (
                  <button
                    onClick={() => handleReport(review.id)}
                    className="flex items-center text-gray-500 hover:text-gray-700"
                  >
                    <Flag className="w-4 h-4 mr-1" />
                    <span>Report</span>
                  </button>
                )}
                {review.reported && (
                  <span className="flex items-center text-yellow-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    <span>Reported</span>
                  </span>
                )}
              </div>

              {selectedReview === review.id && (
                <div className="mt-4">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply here..."
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setSelectedReview(null);
                        setReplyText('');
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReply(review.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Submit Reply
                    </button>
                  </div>
                </div>
              )}

              {review.reply && (
                <div className="mt-4 pl-4 border-l-2 border-blue-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Your Reply</p>
                      <p className="mt-1 text-sm text-gray-600">{review.reply.content}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        Replied on {new Date(review.reply.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteReply(review.id)}
                      className="text-gray-400 hover:text-red-500"
                      title="Delete reply"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredAndSortedReviews.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No reviews match your current filters</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Reviews; 