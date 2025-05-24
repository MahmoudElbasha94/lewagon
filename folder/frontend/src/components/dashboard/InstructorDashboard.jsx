import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Table, Container, ProgressBar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// إضافة عنوان API الأساسي
const API_BASE_URL = 'http://127.0.0.1:8000';

const InstructorDashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    courses: [],
    recentStudents: []
  });
  
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        };

        console.log('Making API requests with token:', token);

        // تحديث المسارات لتتوافق مع المسارات في الخادم
        const coursesRes = await axios.get(`${API_BASE_URL}/courses/instructor/courses/`, { headers });
        console.log('Raw Courses Response:', coursesRes);

        let courses = [];
        if (Array.isArray(coursesRes.data)) {
          courses = coursesRes.data;
        } else if (coursesRes.data && Array.isArray(coursesRes.data.courses)) {
          courses = coursesRes.data.courses;
        } else if (coursesRes.data && typeof coursesRes.data === 'object') {
          courses = Object.values(coursesRes.data);
        }

        // تجميع جميع الطلاب من جميع الدورات
        const allStudents = [];
        const coursesWithStudents = courses.map(course => {
          // إضافة معلومات الطلاب من البيانات المتوفرة
          const enrolledStudents = course.enrolled_students || [];
          allStudents.push(...enrolledStudents);
          
          return {
            ...course,
            enrolled_students: enrolledStudents,
            total_revenue: course.total_revenue || 0,
            students_count: course.students_count || 0,
            average_rating: course.average_rating || 0
          };
        });

        console.log('Processed Courses:', coursesWithStudents);
        console.log('All Students:', allStudents);
        
        const totalRevenue = coursesWithStudents.reduce((sum, course) => {
          const revenue = parseFloat(course.total_revenue) || 0;
          return sum + revenue;
        }, 0);
        
        setStats({
          totalCourses: courses.length,
          totalStudents: allStudents.length,
          totalRevenue,
          courses: coursesWithStudents,
          recentStudents: allStudents.slice(0, 5)
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Error details:', error.response?.data);
        console.error('Error status:', error.response?.status);
        console.error('Error headers:', error.response?.headers);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Instructor Dashboard</h2>
        <Button 
          variant="primary" 
          onClick={() => navigate('/instructor/add-course')}
        >
          Add New Course
        </Button>
      </div>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Courses</Card.Title>
              <Card.Text className="display-6">{stats.totalCourses}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Students</Card.Title>
              <Card.Text className="display-6">{stats.totalStudents}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Revenue</Card.Title>
              <Card.Text className="display-6">${stats.totalRevenue.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Your Courses</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Students</th>
                    <th>Revenue</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.courses.map((course) => (
                    <tr key={course.id}>
                      <td>{course.title}</td>
                      <td>{course.students_count}</td>
                      <td>${(course.total_revenue || 0).toFixed(2)}</td>
                      <td>
                        {course.average_rating ? (
                          <ProgressBar now={course.average_rating * 20} label={`${course.average_rating}/5`} />
                        ) : 'No ratings'}
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          className="me-2"
                          onClick={() => navigate(`/instructor/edit-course/${course.id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={async () => {
                            const result = await Swal.fire({
                              title: 'Are you sure?',
                              text: "You won't be able to revert this!",
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Yes, delete the course',
                              cancelButtonText: 'Cancel'
                            });

                            if (result.isConfirmed) {
                              try {
                                const token = localStorage.getItem('access');
                                await axios.delete(
                                  `${API_BASE_URL}/courses/instructor/delete-course/${course.id}/`,
                                  {
                                    headers: {
                                      'Authorization': `Bearer ${token}`,
                                      'Content-Type': 'application/json',
                                    }
                                  }
                                );
                                
                                await Swal.fire(
                                  'Deleted!',
                                  'The course has been deleted successfully.',
                                  'success'
                                );
                                
                                // تحديث القائمة بعد الحذف
                                setStats(prev => ({
                                  ...prev,
                                  courses: prev.courses.filter(c => c.id !== course.id)
                                }));
                              } catch (error) {
                                console.error('Error deleting course:', error);
                                Swal.fire(
                                  'Error!',
                                  error.response?.data?.message || 'An error occurred while deleting the course',
                                  'error'
                                );
                              }
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Recent Students</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentStudents.map((student, index) => (
                    <tr key={index}>
                      <td>{student.name || student.username}</td>
                      <td>{student.email}</td>
                      <td>{student.course_title || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InstructorDashboard;