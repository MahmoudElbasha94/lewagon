import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const API_BASE_URL = 'http://127.0.0.1:8000';

const CourseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const token = localStorage.getItem('access');
  const isAuthenticated = !!token;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/courses/course/${slug}/`,
          {
            headers: isAuthenticated
              ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
              : { 'Content-Type': 'application/json' }
          }
        );
        setCourse(response.data);
        setIsEnrolled(response.data.is_enrolled);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err.response?.data?.detail || 'Failed to load course details');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug, isAuthenticated]);

  const enrollInCourse = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You need to log in to enroll in this course.',
        confirmButtonText: 'Go to Login',
      }).then(() => navigate('/login'));
      return;
    }

    if (!course?.id) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Course ID is missing. Please try again.',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      console.log('Attempting to enroll with course_id:', course.id);
      const response = await axios.post(
        `${API_BASE_URL}/courses/student/enroll/`,
        { course_id: course.id },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      setIsEnrolled(true);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message || 
              (course.courseType.toLowerCase() === 'paid' 
                ? 'Payment successful! You have enrolled in the course!' 
                : 'You have successfully enrolled in the course!'),
        confirmButtonText: 'OK',
      });
    } catch (err) {
      console.error('Error enrolling in course:', err.response?.data);
      const errorMessage = err.response?.status === 402 
        ? 'Payment failed. Please try again.' 
        : err.response?.data?.error || 'Failed to enroll in course';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonText: 'OK',
      });
      setError(errorMessage);
    }
  };

  const handleButtonClick = () => {
    if (course.courseType.toLowerCase() === 'paid') {
      Swal.fire({
        icon: 'info',
        title: 'Proceed to Payment',
        text: `You are about to purchase ${course.title} for $${course.price}. Continue?`,
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // Mock payment flow (replace with actual payment gateway integration)
          enrollInCourse(); // Call enrollInCourse to handle enrollment and payment
        }
      });
    } else {
      enrollInCourse(); // Free course, proceed directly to enrollment
    }
  };

  const markLessonCompleted = async () => {
    if (!course?.lessons || !course.lessons[activeVideoIndex]) return;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/courses/student/mark-lesson-completed/`,
        {
          lesson_id: course.lessons[activeVideoIndex].id,
          course_id: course.id
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      setCourse(prev => ({
        ...prev,
        lessons: prev.lessons.map((lesson, index) =>
          index === activeVideoIndex ? { ...lesson, is_completed: true } : lesson
        ),
        progress: response.data.progress
      }));
      Swal.fire({
        icon: 'success',
        title: 'Lesson Completed',
        text: 'You have successfully marked this lesson as completed!',
        confirmButtonText: 'OK',
      });
    } catch (err) {
      console.error('Error marking lesson as completed:', err.response?.data);
      setError(err.response?.data?.error || 'Failed to mark lesson as completed');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.error || 'Failed to mark lesson as completed',
        confirmButtonText: 'OK',
      });
    }
  };

  if (loading) return <div className="container mt-5 text-center"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
  if (!course) return <div className="container mt-5"><div className="alert alert-warning">Course not found</div></div>;

  const currentVideo = course.lessons[activeVideoIndex];
  const instructorName = course.instructor || 'Unknown Instructor';
  const isNextDisabled = activeVideoIndex === course.lessons.length - 1 || 
                        (isAuthenticated && isEnrolled && !course.lessons[activeVideoIndex]?.is_completed);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h1 className="mb-3">{course.title}</h1>
              <p className="text-muted mb-4">{course.description}</p>
              <div className="d-flex gap-3 mb-4">
                <span className="badge bg-primary">{course.level}</span>
                <span className="badge bg-secondary">{course.category}</span>
                <span className="badge bg-info">{course.courseType}</span>
              </div>
              <div>
                <strong>Progress:</strong> {isAuthenticated && isEnrolled ? `${course.progress?.toFixed(2) || 0}%` : 'Not Enrolled'}
              </div>
              {!isEnrolled && (
                <button 
                  className={`btn mt-3 ${course.courseType.toLowerCase() === 'paid' ? 'btn-success' : 'btn-primary'}`}
                  onClick={handleButtonClick}
                >
                  {isAuthenticated 
                    ? (course.courseType.toLowerCase() === 'paid' ? 'Buy Now' : 'Enroll in Course') 
                    : 'Log in to Enroll'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h3 className="mb-4">
                {currentVideo ? `Lesson ${activeVideoIndex + 1}: ${currentVideo.title}` : 'Course Video'}
                {isAuthenticated && isEnrolled && currentVideo && currentVideo.is_completed && (
                  <span className="badge bg-success ms-2">Completed</span>
                )}
              </h3>
              
              <div className="course-video-wrapper mb-4">
                {isAuthenticated && isEnrolled && currentVideo?.video_url ? (
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={currentVideo.video_url}
                      title={`Lesson ${activeVideoIndex + 1}`}
                      allowFullScreen
                      className="rounded"
                    />
                  </div>
                ) : (
                  <div className="alert alert-info">
                    {isAuthenticated ? 
                      'You need to enroll in this course to view lessons.' : 
                      'Please log in to view course lessons.'
                    }
                    {!isAuthenticated && (
                      <button 
                        className="btn btn-link p-0 ms-2"
                        onClick={() => navigate('/login')}
                      >
                        Log in now
                      </button>
                    )}
                  </div>
                )}
              </div>

              {isAuthenticated && isEnrolled && (
                <div className="d-flex justify-content-between mt-3">
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => setActiveVideoIndex(prev => Math.max(0, prev - 1))}
                    disabled={activeVideoIndex === 0}
                  >
                    Previous
                  </button>

                  {currentVideo && !currentVideo.is_completed && (
                    <button 
                      className="btn btn-success"
                      onClick={markLessonCompleted}
                    >
                      Mark as Completed
                    </button>
                  )}

                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => setActiveVideoIndex(prev => Math.min(course.lessons.length - 1, prev + 1))}
                    disabled={isNextDisabled}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h4 className="mb-3">Course Information</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>Duration:</strong> {course.duration} hours
                </li>
                <li className="mb-2">
                  <strong>Price:</strong> ${course.price}
                </li>
                <li className="mb-2">
                  <strong>Instructor:</strong> {instructorName}
                </li>
              </ul>

              <h5 className="mt-4 mb-3">What you'll learn</h5>
              <p className="text-muted">{course.what_you_will_learn}</p>

              <h5 className="mt-4 mb-3">Requirements</h5>
              <p className="text-muted">{course.requirements}</p>

              <h5 className="mt-4 mb-3">Lessons</h5>
              <ul className="list-group">
                {course.lessons.map((lesson, index) => (
                  <li 
                    key={lesson.id}
                    className={`list-group-item ${index === activeVideoIndex ? 'active' : ''}`}
                    onClick={() => {
                      if (isAuthenticated && isEnrolled && (index === 0 || course.lessons[index - 1]?.is_completed)) {
                        setActiveVideoIndex(index);
                      } else if (!isAuthenticated) {
                        Swal.fire({
                          icon: 'warning',
                          title: 'Login Required',
                          text: 'Please log in to access this lesson.',
                          confirmButtonText: 'Go to Login',
                        }).then(() => navigate('/login'));
                      } else if (!isEnrolled) {
                        Swal.fire({
                          icon: 'warning',
                          title: 'Enrollment Required',
                          text: 'You need to enroll in this course to access lessons.',
                          confirmButtonText: 'OK',
                        });
                      } else {
                        Swal.fire({
                          icon: 'warning',
                          title: 'Complete Previous Lesson',
                          text: 'You must complete the previous lesson to access this one.',
                          confirmButtonText: 'OK',
                        });
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {`Lesson ${index + 1}: ${lesson.title}`}
                    {isAuthenticated && isEnrolled && lesson.is_completed && (
                      <span className="badge bg-success ms-2">Completed</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;