import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Table, Container, ProgressBar, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://127.0.0.1:8000';

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    courses: [],
    recommendedCourses: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access');
      if (!token) {
        Swal.fire({
          icon: 'warning',
          title: 'Login Required',
          text: 'Please log in to view your dashboard.',
          confirmButtonText: 'Go to Login',
        }).then(() => navigate('/login'));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const [enrolledRes, recommendedRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/courses/student/enrolled-courses/`, { headers }),
          axios.get(`${API_BASE_URL}/courses/all/`, { headers }),
        ]);

        const enrolledCourses = Array.isArray(enrolledRes.data)
          ? enrolledRes.data
          : enrolledRes.data.courses || [];
        const recommendedCourses = Array.isArray(recommendedRes.data)
          ? recommendedRes.data
          : recommendedRes.data.courses || [];

        const completed = enrolledCourses.filter(course => course.progress === 100).length;

        setStats({
          enrolledCourses: enrolledCourses.length,
          completedCourses: completed,
          inProgressCourses: enrolledCourses.length - completed,
          courses: enrolledCourses,
          recommendedCourses: recommendedCourses,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Error details:', error.response?.data);
        console.error('Error status:', error.response?.status);

        let errorMessage = 'Failed to load data. Please try again later.';
        if (error.response?.status === 401) {
          errorMessage = 'Session expired. Please log in again.';
          localStorage.removeItem('access');
          Swal.fire({
            icon: 'warning',
            title: 'Session Expired',
            text: errorMessage,
            confirmButtonText: 'Go to Login',
          }).then(() => navigate('/login'));
        } else if (error.response?.status === 500) {
          errorMessage = error.response.data?.error || 'Server error. Please try again later.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          toast: true,
          position: 'top-end',
          timer: 3000,
        });

        setStats({
          enrolledCourses: 0,
          completedCourses: 0,
          inProgressCourses: 0,
          courses: [],
          recommendedCourses: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Student Dashboard</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Enrolled Courses</Card.Title>
              <Card.Text className="display-6">{stats.enrolledCourses}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Completed</Card.Title>
              <Card.Text className="display-6">{stats.completedCourses}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>In Progress</Card.Title>
              <Card.Text className="display-6">{stats.inProgressCourses}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Your Courses</Card.Title>
              {stats.courses.length === 0 ? (
                <div className="alert alert-info">You are not enrolled in any courses yet.</div>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Progress</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.courses.map((course) => (
                      <tr key={course.id}>
                        <td>{course.title}</td>
                        <td>
                          <ProgressBar now={course.progress} label={`${course.progress}%`} />
                        </td>
                        <td>
                          <Link to={`/courses/${course.slug}`}>
                            <Button variant="primary" size="sm">
                              Continue
                            </Button>
                          </Link>
                          {course.progress === 100 && (
                            <Button variant="success" size="sm" className="ms-2">
                              Get Certificate
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Recommended Courses</Card.Title>
              <div className="d-grid gap-3">
                {stats.recommendedCourses.slice(0, 3).map((course) => (
                  <Card key={course.id}>
                    <Card.Img
  variant="top"
  src={course.courseImage && course.courseImage !== 'null' ? course.courseImage : '/images/no-image.png'}
  onError={(e) => (e.target.src = '/images/no-image.png')}
/>
                    <Card.Body>
                      <Card.Title>{course.title}</Card.Title>
                      <Card.Text>
                        <small className="text-muted">
                          By {course.instructor?.name || 'Unknown Instructor'}
                        </small>
                      </Card.Text>
                      <Link to={`/courses/${course.slug}`}>
                        <Button variant="outline-primary" size="sm">
                          View Course
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;