import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaGraduationCap, 
  FaBook, 
  FaCheckCircle, 
  FaSpinner, 
  FaPlus, 
  FaChartLine,
  FaUsers,
  FaStar
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import '../../styles/StudentDashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    averageProgress: 0,
    courses: [],
    recommendedCourses: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const enrolledCoursesResponse = await axios.get(
          'http://127.0.0.1:8000/api/courses/student/enrolled/',
          { headers }
        );

        const recommendedCoursesResponse = await axios.get(
          'http://127.0.0.1:8000/api/courses/recommended/',
          { headers }
        );

        const enrolledCourses = Array.isArray(enrolledCoursesResponse.data)
          ? enrolledCoursesResponse.data
          : enrolledCoursesResponse.data.courses || [];
        const recommendedCourses = Array.isArray(recommendedCoursesResponse.data)
          ? recommendedCoursesResponse.data
          : recommendedCoursesResponse.data.courses || [];

        const completed = enrolledCourses.filter(course => course.progress === 100).length;
        const totalProgress = enrolledCourses.reduce((sum, course) => sum + course.progress, 0);
        const averageProgress = enrolledCourses.length > 0 
          ? Math.round(totalProgress / enrolledCourses.length) 
          : 0;

        setStats({
          enrolledCourses: enrolledCourses.length,
          completedCourses: completed,
          inProgressCourses: enrolledCourses.length - completed,
          averageProgress,
          courses: enrolledCourses,
          recommendedCourses: recommendedCourses.slice(0, 3)
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          setError('Your session has expired. Please log in again.');
          navigate('/login');
        } else {
          setError('Failed to fetch dashboard data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="student-dashboard">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">Student Dashboard</h2>
              <p className="text-light opacity-75 mb-0">Welcome back, {user?.email}</p>
            </div>
            <button className="action-button" onClick={() => navigate('/courses')}>
              <FaPlus className="me-2" />
              Browse Courses
            </button>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="stats-card">
              <div className="icon">
                <FaBook />
              </div>
              <h5>Enrolled Courses</h5>
              <div className="value">{stats.enrolledCourses}</div>
              <div className="subtitle">Total courses</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-card">
              <div className="icon">
                <FaCheckCircle />
              </div>
              <h5>Completed</h5>
              <div className="value">{stats.completedCourses}</div>
              <div className="subtitle">Finished courses</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-card">
              <div className="icon">
                <FaSpinner />
              </div>
              <h5>In Progress</h5>
              <div className="value">{stats.inProgressCourses}</div>
              <div className="subtitle">Active courses</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-card">
              <div className="icon">
                <FaChartLine />
              </div>
              <h5>Average Progress</h5>
              <div className="value">{stats.averageProgress}%</div>
              <div className="subtitle">Overall completion</div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="data-card">
              <div className="card-header">
                <h5>Your Courses</h5>
              </div>
              <div className="card-body">
                {stats.courses.length === 0 ? (
                  <div className="text-center py-4">
                    <FaBook className="mb-3" style={{ fontSize: '2rem', opacity: '0.5' }} />
                    <p className="mb-4">You haven't enrolled in any courses yet.</p>
                    <Link to="/courses">
                      <button className="action-button">
                        <FaPlus className="me-2" />
                        Browse Courses
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="course-list">
                    {stats.courses.map((course) => (
                      <div key={course.id} className="course-card">
                        <h6>{course.title}</h6>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between mb-1">
                            <small className="text-light">Progress</small>
                            <small className="text-light">{course.progress}%</small>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: `${course.progress}%` }}
                              aria-valuenow={course.progress}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            />
                          </div>
                        </div>
                        <div className="d-flex gap-2">
                          <Link to={`/courses/${course.slug}`} className="flex-grow-1">
                            <button className="continue-button w-100">
                              Continue Learning
                            </button>
                          </Link>
                          {course.progress === 100 && (
                            <button className="certificate-button">
                              Get Certificate
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="data-card">
              <div className="card-header">
                <h5>Recommended Courses</h5>
              </div>
              <div className="card-body">
                {stats.recommendedCourses.map((course) => (
                  <div key={course.id} className="course-card">
                    <h6>{course.title}</h6>
                    <div className="d-flex align-items-center mb-3">
                      <FaUsers className="me-2 text-light opacity-75" />
                      <small className="text-light opacity-75">
                        {course.enrolled_students || 0} students enrolled
                      </small>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <FaStar className="me-2 text-warning" />
                      <small className="text-light opacity-75">
                        {course.average_rating || 0} rating
                      </small>
                    </div>
                    <Link to={`/courses/${course.slug}`}>
                      <button className="action-button secondary w-100">
                        View Course
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;