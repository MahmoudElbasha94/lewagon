import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useCourses } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  Clock, Star, Award, Users, BookOpen, 
  ChevronDown, ChevronUp, CheckCircle, ArrowRight,
  Play, Calendar, DollarSign, GraduationCap,
  Globe, FileText, Video, MessageCircle, Share2,
  Heart, BookmarkPlus, ShieldCheck, Lock,
  BarChart, Target, Zap, Gift, ThumbsUp, X
} from 'lucide-react';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import { Rating } from '@mui/material';
import { Course } from '../types/Course';

const CourseDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { courses, loading, enrollInCourse, isEnrolled } = useCourses();
  const { user, isAuthenticated } = useAuth();
  
  // Add useEffect to scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('overview');
  const [openAccordion, setOpenAccordion] = useState<string | null>('what-youll-learn');
  const [enrolling, setEnrolling] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Find the course
  const course = courses.find(c => String(c.id) === id);

  // Check if user is enrolled
  const userEnrolled = user && course ? isEnrolled(user.id, String(course.id)) : false;

  // Handle enrollment
  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/courses/${id}` } });
      return;
    }
    
    if (!user || !course) return;
    
    // Redirect to checkout page instead of direct enrollment
    navigate(`/checkout/${course.id}`);
  };

  // Toggle accordion
  const toggleAccordion = (accordionId: string) => {
    if (openAccordion === accordionId) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(accordionId);
    }
  };

  // Handle share
  const handleShare = async () => {
    try {
      await navigator.share({
        title: course?.title,
        text: course?.description,
        url: window.location.href,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Not Found</h1>
        <p className="text-gray-600 mb-8">The course you are looking for does not exist or has been removed.</p>
        <Link 
          to="/courses" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-red-600 to-red-400 text-white">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container mx-auto px-4 py-16 relative">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Course Info */}
              <div className="lg:w-2/3">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                    {course.category}
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                    {course.level}
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">{course.title}</h1>
                <p className="text-xl text-white/90 mb-6">{course.description}</p>
                
                {/* Course Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-white/80" />
                    <span>{(course.students || 0).toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-white/80" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-white/80" />
                    <span>{course.rating} rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-white/80" />
                    <span>{course.language}</span>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={course.instructorDetails.avatar}
                    alt={course.instructorDetails.name}
                    className="w-12 h-12 rounded-full border-2 border-white/20"
                  />
                  <div>
                    <p className="text-sm text-white/80">Instructor</p>
                    <p className="font-medium">{course.instructorDetails.name}</p>
                  </div>
                </div>
              </div>

              {/* Course Card */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  {course.previewVideo && (
                    <div className="aspect-video relative">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <button 
                        onClick={() => setShowPreviewModal(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group"
                      >
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/90 group-hover:bg-white transition-colors">
                          <Play className="h-8 w-8 text-red-600" />
                        </div>
                      </button>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-3xl font-bold text-gray-900">
                          ${course.price}
                        </p>
                        {course.discount && (
                          <p className="text-sm text-gray-500">
                            <span className="line-through">${course.price}</span>
                            <span className="text-red-600 ml-2">{course.discount}% OFF</span>
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setIsBookmarked(!isBookmarked)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {isBookmarked ? (
                            <Heart className="h-6 w-6 text-red-600 fill-current" />
                          ) : (
                            <Heart className="h-6 w-6 text-gray-600" />
                          )}
                        </button>
                        <button 
                          onClick={handleShare}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Share2 className="h-6 w-6 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleEnroll}
                      disabled={enrolling}
                      className="w-full bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-colors disabled:bg-red-400"
                    >
                      {enrolling ? 'Enrolling...' : userEnrolled ? 'Continue Learning' : 'Enroll Now'}
                    </button>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-center text-gray-700">
                        <ShieldCheck className="h-5 w-5 mr-3 text-green-600" />
                        <span>30-Day Money-Back Guarantee</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Award className="h-5 w-5 mr-3 text-blue-600" />
                        <span>Certificate of Completion</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-5 w-5 mr-3 text-orange-600" />
                        <span>Lifetime Access</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:w-2/3">
              {/* Navigation Tabs */}
              <div className="flex border-b mb-8">
                {['Overview', 'Curriculum', 'Instructor', 'Reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-6 py-3 font-medium transition-colors ${
                      activeTab === tab.toLowerCase()
                        ? 'text-red-600 border-b-2 border-red-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* What You'll Learn */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <Target className="h-6 w-6 mr-2 text-red-600" />
                      What You'll Learn
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.learningOutcomes?.map((outcome, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Course Description */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <FileText className="h-6 w-6 mr-2 text-red-600" />
                      Course Description
                    </h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">{course.description}</p>
                    </div>
                  </div>

                  {/* Prerequisites */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <BookOpen className="h-6 w-6 mr-2 text-red-600" />
                      Prerequisites
                    </h2>
                    <ul className="space-y-3">
                      {course.prerequisites?.map((prerequisite, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <ArrowRight className="h-5 w-5 mr-2 text-gray-400" />
                          {prerequisite}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Course Features */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <Gift className="h-6 w-6 mr-2 text-red-600" />
                      Course Features
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {course.materials?.map((material, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mr-4">
                            <Video className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{material.type}</p>
                            <p className="text-sm text-gray-500">{material.count} items</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">Course Content</h2>
                  <div className="space-y-6">
                    {course.sections.map((section) => (
                      <div key={section.id} className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                        <p className="text-gray-600">{section.description}</p>
                        <div className="space-y-2">
                          {section.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="border rounded-xl p-4 hover:shadow-md transition-shadow"
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <Play className="h-5 w-5 text-red-600 mr-3" />
                                  <div>
                                    <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                                    <p className="text-sm text-gray-500">{lesson.duration}</p>
                                  </div>
                                </div>
                                {userEnrolled ? (
                                  <Link 
                                    to={`/courses/${course.id}/lessons/${lesson.id}`}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    Start Learning
                                  </Link>
                                ) : (
                                  <Lock className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start space-x-6">
                    <img
                      src={course.instructorDetails.avatar}
                      alt={course.instructorDetails.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{course.instructorDetails.name}</h2>
                      <p className="text-gray-600 mb-4">{course.instructorDetails.bio}</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                          <p className="text-2xl font-bold text-gray-900">
                            {(course.instructorDetails.totalStudents || 0).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">Students</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                          <p className="text-2xl font-bold text-gray-900">
                            {course.instructorDetails.totalCourses}
                          </p>
                          <p className="text-sm text-gray-600">Courses</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                          <p className="text-2xl font-bold text-gray-900">
                            {course.instructorDetails.rating}
                          </p>
                          <p className="text-sm text-gray-600">Rating</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                          {course.instructorDetails.expertise.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Student Reviews</h2>
                    <div className="flex items-center">
                      <Star className="h-6 w-6 text-yellow-400 fill-current" />
                      <span className="text-2xl font-bold ml-2">{course.rating}</span>
                      <span className="text-gray-500 ml-2">
                        ({course.reviews?.length} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {course.reviews?.map((review, index) => (
                      <div key={index} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-center mb-4">
                          <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="w-12 h-12 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h3 className="font-medium">{review.userName}</h3>
                            <div className="flex items-center">
                              <Rating value={review.rating} readOnly size="small" />
                              <span className="text-sm text-gray-500 ml-2">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        <div className="flex items-center mt-4 text-sm text-gray-500">
                          <button className="flex items-center hover:text-gray-700">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Related Courses */}
            <div className="lg:w-1/3">
              <div className="sticky top-24">
                <h2 className="text-xl font-bold mb-4">Related Courses</h2>
                <div className="space-y-4">
                  {courses
                    .filter(c => c.category === course.category && c.id !== course.id)
                    .slice(0, 3)
                    .map((relatedCourse) => (
                      <Link
                        key={relatedCourse.id}
                        to={`/courses/${relatedCourse.id}`}
                        className="block bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <img
                          src={relatedCourse.thumbnail}
                          alt={relatedCourse.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 mb-2">
                            {relatedCourse.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">
                              {relatedCourse.instructorDetails.name}
                            </span>
                            <span className="font-medium text-red-600">
                              ${relatedCourse.price}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Preview Modal */}
        {showPreviewModal && course.previewVideo && (
          <div 
            className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center"
            onClick={() => setShowPreviewModal(false)}
          >
            <div 
              className="relative w-full max-w-4xl mx-4"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPreviewModal(false)}
                className="absolute -top-10 right-0 text-white hover:text-red-500 transition-colors z-50"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Video Player */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
                <iframe
                  src={`${course.previewVideo}?autoplay=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="mt-4 text-white">
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p className="text-white/80 mt-2">Course Preview</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default CourseDetailPage;