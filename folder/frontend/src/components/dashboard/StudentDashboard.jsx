import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Table, Container, ProgressBar, Button } from 'react-bootstrap';

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    courses: [],
    recommendedCourses: []
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access');
        if (!token) {
          console.error('No access token found');
          return;
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const [enrolledRes, recommendedRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/courses/student/enrolled-courses/', { headers }),
          axios.get('http://127.0.0.1:8000/courses/all/', { headers })
        ]);
        
        const enrolledCourses = Array.isArray(enrolledRes.data) ? enrolledRes.data : 
                              enrolledRes.data.courses ? enrolledRes.data.courses : [];
        
        const recommendedCourses = Array.isArray(recommendedRes.data) ? recommendedRes.data :
                                 recommendedRes.data.courses ? recommendedRes.data.courses : [];
        
        const completed = enrolledCourses.filter(course => course.progress === 100).length;
        
        setStats({
          enrolledCourses: enrolledCourses.length,
          completedCourses: completed,
          inProgressCourses: enrolledCourses.length - completed,
          courses: enrolledCourses,
          recommendedCourses: recommendedCourses
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Error details:', error.response?.data);
        console.error('Error status:', error.response?.status);
        setStats({
          enrolledCourses: 0,
          completedCourses: 0,
          inProgressCourses: 0,
          courses: [],
          recommendedCourses: []
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

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
                        <Button variant="primary" size="sm">Continue</Button>
                        {course.progress === 100 && (
                          <Button variant="success" size="sm" className="ms-2">Get Certificate</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
                    <Card.Img variant="top" src={course.image} />
                    <Card.Body>
                      <Card.Title>{course.title}</Card.Title>
                      <Card.Text>
                        <small className="text-muted">By {course.instructor}</small>
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">View Course</Button>
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