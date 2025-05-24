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
        setLoading(false);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err.response?.data?.detail || 'Failed to load course details');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  if (loading) return <div className="container mt-5 text-center"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
  if (!course) return <div className="container mt-5"><div className="alert alert-warning">Course not found</div></div>;

  const currentVideo = course.videos[activeVideoIndex];
  const instructorName = course.instructor?.first_name && course.instructor?.last_name 
    ? `${course.instructor.first_name} ${course.instructor.last_name}`
    : course.instructor?.name || 'Unknown Instructor';

  return (
    <div className="container py-5">
      <div className="row">
        {/* Course Header */}
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
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h3 className="mb-4">
                {currentVideo ? `Lesson ${activeVideoIndex + 1}: ${currentVideo.lesson_name}` : 'Course Video'}
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

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between mt-3">
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => setActiveVideoIndex(prev => Math.max(0, prev - 1))}
                  disabled={activeVideoIndex === 0}
                >
                  Previous
                </button>
                
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => setActiveVideoIndex(prev => Math.min(course.videos.length - 1, prev + 1))}
                  disabled={activeVideoIndex === course.videos.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Info Sidebar */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;