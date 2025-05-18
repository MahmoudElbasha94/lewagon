import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourses } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  ArrowLeft, ArrowRight, CheckCircle, BookOpen, 
  Clock, Menu, X 
} from 'lucide-react';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';

const LessonPage: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { courses, markLessonComplete, getLessonProgress } = useCourses();
  const { user } = useAuth();
  
  const [showSidebar, setShowSidebar] = useState(false);
  const [markingComplete, setMarkingComplete] = useState(false);

  // Find the course and lesson
  const course = courses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id.toString() === lessonId);
  
  // Find the index of the current lesson
  const lessonIndex = course?.lessons.findIndex(l => l.id.toString() === lessonId) ?? -1;
  
  // Previous and next lessons
  const prevLesson = lessonIndex > 0 ? course?.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < (course?.lessons.length ?? 0) - 1 ? course?.lessons[lessonIndex + 1] : null;
  
  // Check if the lesson is completed
  const isCompleted = user && course && lesson ? getLessonProgress(user.id, course.id, lesson.id) : false;

  // Handle marking lesson as complete
  const handleMarkComplete = async () => {
    if (!user || !course || !lesson) return;
    
    setMarkingComplete(true);
    try {
      markLessonComplete(user.id, course.id, lesson.id);
      toast.success('Lesson completed successfully!');
    } catch (error) {
      toast.error('Failed to update lesson status');
    } finally {
      setMarkingComplete(false);
    }
  };

  // If course or lesson not found, show error
  if (!course || !lesson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
        <p className="text-gray-600 mb-8">The lesson you are looking for does not exist or has been removed.</p>
        <Button variant="primary">
          <Link to="/courses">Browse Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link to={`/courses/${course.id}`} className="flex items-center text-gray-600 hover:text-primary-600 mr-4">
                  <ArrowLeft className="h-5 w-5 mr-1" />
                  <span>Back to Course</span>
                </Link>
                <h1 className="text-xl font-bold text-gray-900 hidden md:block">{course.title}</h1>
              </div>
              <button 
                className="md:hidden flex items-center text-gray-600"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                {showSidebar ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="ml-1">Lessons</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Mobile Sidebar */}
            {showSidebar && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="fixed inset-0 z-50 lg:hidden bg-gray-900 bg-opacity-50"
                onClick={() => setShowSidebar(false)}
              >
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'tween' }}
                  className="absolute inset-y-0 left-0 w-3/4 max-w-xs bg-white shadow-xl p-4 overflow-y-auto"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
                    <button onClick={() => setShowSidebar(false)}>
                      <X className="h-6 w-6 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {course.lessons.map((item, index) => {
                      const isActive = item.id === lessonId;
                      const isItemCompleted = user ? getLessonProgress(user.id, course.id, item.id) : false;
                      
                      return (
                        <Link
                          key={item.id.toString()}
                          to={`/courses/${course.id}/lessons/${item.id.toString()}`}
                          onClick={() => setShowSidebar(false)}
                          className={`block p-3 rounded-lg ${
                            isActive 
                              ? 'bg-primary-50 text-primary-700' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`flex items-center justify-center h-6 w-6 rounded-full mr-3 text-sm 
                              ${isItemCompleted 
                                ? 'bg-success-100 text-success-700' 
                                : isActive 
                                  ? 'bg-primary-100 text-primary-700' 
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {isItemCompleted ? <CheckCircle className="h-4 w-4" /> : (index + 1)}
                            </div>
                            <div>
                              <h3 className={`font-medium ${isActive ? 'text-primary-700' : 'text-gray-900'}`}>
                                {item.title}
                              </h3>
                              <p className="text-xs text-gray-500">{item.duration}</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}
            
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Course Content</h2>
                <div className="space-y-2">
                  {course.lessons.map((item, index) => {
                    const isActive = item.id === lessonId;
                    const isItemCompleted = user ? getLessonProgress(user.id, course.id, item.id) : false;
                    
                    return (
                      <Link
                        key={item.id.toString()}
                        to={`/courses/${course.id}/lessons/${item.id.toString()}`}
                        className={`block p-3 rounded-lg ${
                          isActive 
                            ? 'bg-primary-50 text-primary-700' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`flex items-center justify-center h-6 w-6 rounded-full mr-3 text-sm 
                            ${isItemCompleted 
                              ? 'bg-success-100 text-success-700' 
                              : isActive 
                                ? 'bg-primary-100 text-primary-700' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {isItemCompleted ? <CheckCircle className="h-4 w-4" /> : (index + 1)}
                          </div>
                          <div>
                            <h3 className={`font-medium ${isActive ? 'text-primary-700' : 'text-gray-900'}`}>
                              {item.title}
                            </h3>
                            <p className="text-xs text-gray-500">{item.duration}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Lesson Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    src={lesson.videoUrl}
                    title={lesson.title}
                    className="w-full h-96"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{lesson.duration}</span>
                  </div>
                  {isCompleted && (
                    <div className="flex items-center text-success-600">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>
                
                <div className="prose max-w-none mb-6">
                  <p>{lesson.description || 'No description available for this lesson.'}</p>
                  
                  <h2>Key Concepts</h2>
                  <p>In this lesson, we'll cover the following concepts:</p>
                  <ul>
                    <li>Understanding the fundamentals</li>
                    <li>Applying concepts in real-world scenarios</li>
                    <li>Best practices for implementation</li>
                    <li>Common pitfalls and how to avoid them</li>
                  </ul>
                  
                  <h2>Additional Resources</h2>
                  <p>To deepen your understanding, check out these resources:</p>
                  <ul>
                    <li>Official documentation</li>
                    <li>Community forums</li>
                    <li>Practice exercises</li>
                  </ul>
                </div>
                
                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                  {!isCompleted ? (
                    <Button 
                      variant="primary" 
                      loading={markingComplete}
                      onClick={handleMarkComplete}
                      icon={<CheckCircle className="h-5 w-5" />}
                    >
                      Mark as Complete
                    </Button>
                  ) : (
                    <div className="flex items-center text-success-600">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex justify-between">
                {prevLesson ? (
                  <Link
                    to={`/courses/${course.id}/lessons/${prevLesson.id}`}
                    className="flex items-center text-gray-600 hover:text-primary-600"
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Previous</div>
                      <div className="font-medium">{prevLesson.title}</div>
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}
                
                {nextLesson ? (
                  <Link
                    to={`/courses/${course.id}/lessons/${nextLesson.id}`}
                    className="flex items-center text-right text-gray-600 hover:text-primary-600"
                  >
                    <div>
                      <div className="text-sm text-gray-500">Next</div>
                      <div className="font-medium">{nextLesson.title}</div>
                    </div>
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default LessonPage;