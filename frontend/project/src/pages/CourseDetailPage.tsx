import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useCourses } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  Clock, Star, Award, Users, BookOpen, 
  ChevronDown, ChevronUp, CheckCircle, ArrowRight,
  Play, Calendar, DollarSign, GraduationCap
} from 'lucide-react';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';

const CourseDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('id');
  const { courses, loading, enrollInCourse, isEnrolled } = useCourses();
  const { user, isAuthenticated } = useAuth();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [openAccordion, setOpenAccordion] = useState<string | null>('what-youll-learn');
  const [enrolling, setEnrolling] = useState(false);

  // Find the course
  const course = courses.find(c => String(c.id) === courseId);

  // Check if user is enrolled
  const userEnrolled = user && course ? isEnrolled(user.id, course.id) : false;

  // Handle enrollment
  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/courses/detail?id=${courseId}` } });
      return;
    }
    
    if (!user || !course) return;
    
    setEnrolling(true);
    try {
      const success = await enrollInCourse(user.id, course.id);
      if (success) {
        toast.success(`Successfully enrolled in ${course.title}`);
        navigate(`/courses/${course.id}/lessons/${course.lessons[0].id}`);
      } else {
        toast.error('Failed to enroll in course');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  // Toggle accordion
  const toggleAccordion = (accordionId: string) => {
    if (openAccordion === accordionId) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(accordionId);
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
        <Button variant="primary">
          <Link to="/courses">Browse Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <PageTransition>
      {/* Course Header */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 text-white pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-primary-100 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <Award className="h-4 w-4 mr-2" />
                  <span>{course.certification.type}</span>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <img 
                  src={course.instructorDetails.avatar} 
                  alt={course.instructorDetails.name} 
                  className="h-12 w-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <p className="font-medium">{course.instructorDetails.name}</p>
                  <p className="text-sm text-primary-100">{course.instructorDetails.expertise.join(', ')}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden sticky top-24">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                {course.discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.discount}% OFF
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-3xl font-bold text-gray-900">
                    ${course.price}
                  </div>
                  {course.discount && (
                    <div className="text-lg text-gray-500 line-through">
                      ${(course.price / (1 - course.discount / 100)).toFixed(2)}
                    </div>
                  )}
                </div>
                
                {userEnrolled ? (
                  <div className="space-y-4">
                    <div className="flex items-center text-success-600 mb-4">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>You are enrolled in this course</span>
                    </div>
                    <Button variant="primary" fullWidth>
                      <Link to={`/courses/${course.id}/lessons/${course.lessons[0].id}`}>
                        Continue Learning
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="primary" 
                    fullWidth
                    loading={enrolling}
                    onClick={handleEnroll}
                  >
                    Enroll Now
                  </Button>
                )}
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-success-500 mr-3" />
                    <span>Full lifetime access</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-success-500 mr-3" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-success-500 mr-3" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`py-3 px-4 font-medium border-b-2 ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-3 px-4 font-medium border-b-2 ${
                activeTab === 'curriculum'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('curriculum')}
            >
              Curriculum
            </button>
            <button
              className={`py-3 px-4 font-medium border-b-2 ${
                activeTab === 'instructor'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('instructor')}
            >
              Instructor
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="max-w-4xl">
            {activeTab === 'overview' && (
              <div>
                {/* What You'll Learn */}
                <div className="mb-8">
                  <div 
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-t-lg cursor-pointer"
                    onClick={() => toggleAccordion('what-youll-learn')}
                  >
                    <h3 className="text-xl font-bold text-gray-900">What You'll Learn</h3>
                    {openAccordion === 'what-youll-learn' ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  {openAccordion === 'what-youll-learn' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 border border-gray-200 rounded-b-lg"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.lessons.map((lesson, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{lesson.title}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {/* Course Description */}
                <div className="mb-8">
                  <div 
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-t-lg cursor-pointer"
                    onClick={() => toggleAccordion('description')}
                  >
                    <h3 className="text-xl font-bold text-gray-900">Course Description</h3>
                    {openAccordion === 'description' ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  {openAccordion === 'description' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 border border-gray-200 rounded-b-lg"
                    >
                      <p className="text-gray-600">{course.description}</p>
                    </motion.div>
                  )}
                </div>
                
                {/* Certification */}
                <div className="mb-8">
                  <div 
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-t-lg cursor-pointer"
                    onClick={() => toggleAccordion('certification')}
                  >
                    <h3 className="text-xl font-bold text-gray-900">Certification</h3>
                    {openAccordion === 'certification' ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  {openAccordion === 'certification' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 border border-gray-200 rounded-b-lg"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-primary-500 mr-3" />
                          <div>
                            <h4 className="font-medium text-gray-900">{course.certification.type}</h4>
                            <p className="text-sm text-gray-600">Valid for {course.certification.validity}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'curriculum' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex flex-wrap gap-y-2 justify-between items-center">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{course.lessons.length} lessons</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{course.duration} total</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {course.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-white p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="flex items-center justify-center bg-primary-100 text-primary-700 h-8 w-8 rounded-full font-medium mr-3">
                              {index + 1}
                            </span>
                            <div>
                              <h3 className="font-medium">{lesson.title}</h3>
                              <p className="text-sm text-gray-500">{lesson.duration}</p>
                            </div>
                          </div>
                          <div>
                            {userEnrolled ? (
                              <Link 
                                to={`/courses/${course.id}/lessons/${lesson.id}`}
                                className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                              >
                                <span>Start</span>
                                <ArrowRight className="h-4 w-4 ml-1" />
                              </Link>
                            ) : (
                              <span className="text-gray-500 text-sm">
                                {index === 0 ? 'Preview' : 'Locked'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'instructor' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Instructor</h2>
                <div className="flex items-start mb-6">
                  <img 
                    src={course.instructorDetails.avatar} 
                    alt={course.instructorDetails.name} 
                    className="h-20 w-20 rounded-full object-cover mr-6" 
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.instructorDetails.name}</h3>
                    <p className="text-gray-600 mb-4">Expert in {course.instructorDetails.expertise.join(', ')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CourseDetailPage;