import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_BASE_URL = 'http://127.0.0.1:8000';

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('access');
        const response = await axios.get(
          `${API_BASE_URL}/courses/course/${slug}/`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );
        setCourse(response.data);
        setIsEnrolled(response.data.progress > 0); // افتراض: التقدم > 0 يعني التسجيل
        setLoading(false);
        console.log('Course lessons:', response.data.lessons);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err.response?.data?.detail || 'Failed to load course details');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  const enrollInCourse = async () => {
    try {
      const token = localStorage.getItem('access');
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
      alert(response.data.message);
    } catch (err) {
      console.error('Error enrolling in course:', err);
      setError(err.response?.data?.error || 'Failed to enroll in course');
    }
  };

  const markLessonCompleted = async () => {
    if (!course?.lessons || !course.lessons[activeVideoIndex]) return;

    try {
      const token = localStorage.getItem('access');
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
      console.log('Lesson marked as completed:', response.data);
      setCourse(prev => ({
        ...prev,
        lessons: prev.lessons.map((lesson, index) =>
          index === activeVideoIndex ? { ...lesson, is_completed: true } : lesson
        ),
        progress: response.data.progress
      }));
    } catch (err) {
      console.error('Error marking lesson as completed:', err);
      setError(err.response?.data?.error || 'Failed to mark lesson as completed');
    }
  };

  if (loading) return <div className="container mt-5 text-center"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
  if (!course) return <div className="container mt-5"><div className="alert alert-warning">Course not found</div></div>;

  const currentVideo = course.lessons[activeVideoIndex];
  const instructorName = course.instructor || 'Unknown Instructor';

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
                <strong>Progress:</strong> {course.progress ? `${course.progress.toFixed(2)}%` : '0%'}
              </div>
              {!isEnrolled && (
                <button 
                  className="btn btn-primary mt-3"
                  onClick={enrollInCourse}
                >
                  Enroll in Course
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
                {currentVideo && currentVideo.is_completed && (
                  <span className="badge bg-success ms-2">Completed</span>
                )}
              </h3>
              
              <div className="course-video-wrapper mb-4">
                {currentVideo?.video_url ? (
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
                    No video available for this lesson.
                  </div>
                )}
              </div>

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
                  disabled={activeVideoIndex === course.lessons.length - 1}
                >
                  Next
                </button>
              </div>
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
                    onClick={() => setActiveVideoIndex(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {`Lesson ${index + 1}: ${lesson.title}`}
                    {lesson.is_completed && (
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