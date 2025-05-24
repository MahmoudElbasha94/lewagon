import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../context/AuthContext';
import { FaUsers, FaChalkboardTeacher, FaBook, FaStar, FaGraduationCap, FaComments, FaPlus, FaHome, FaUserPlus, FaList } from 'react-icons/fa';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalInstructors: 0,
    totalCourses: 0,
    totalReviews: 0,
    totalEnrollments: 0,
    totalRevenue: 0,
    activeInstructors: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('access');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        console.log('Fetching stats with token:', token);

        const response = await axios.get('http://127.0.0.1:8000/users/admin/dashboard/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Raw API Response:', response);
        console.log('API Response Data:', response.data);

        if (response.data) {
          const newStats = {
            totalUsers: response.data.stats.total_users || 0,
            totalStudents: response.data.stats.total_students || 0,
            totalInstructors: response.data.stats.total_instructors || 0,
            totalCourses: response.data.stats.total_courses || 0,
            totalReviews: response.data.stats.total_reviews || 0,
            totalEnrollments: response.data.stats.total_enrollments || 0,
            totalRevenue: response.data.stats.total_payments || 0,
            activeInstructors: response.data.stats.active_instructors || 0
          };
          console.log('Processed Stats:', newStats);
          setStats(newStats);
          
          if (response.data.recent_users) {
            setRecentUsers(response.data.recent_users);
          }
          if (response.data.recent_courses) {
            setRecentCourses(response.data.recent_courses);
          }
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers
        });
        setError(error.response?.data?.detail || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (user?.is_superuser) {
      console.log('User is superuser, fetching data...');
      fetchStats();
    } else {
      console.log('User is not superuser:', user);
      setError('You do not have permission to access this page');
    }
  }, [user]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      {/* Removed internal Admin Navigation Bar here */}
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Dashboard Overview</h2>
          <div>
            <Link to="/admin/manage-instructors" className="btn btn-primary me-2">
              <FaList className="me-2" />
              Manage Instructors
            </Link>
            <Link to="/admin/add-instructor" className="btn btn-success">
            <FaPlus className="me-2" />
            Add New Instructor
          </Link>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card text-center shadow-sm h-100 border-0">
              <div className="card-body">
                <FaUsers className="text-primary mb-3" size={24} />
                <h5>Total Users</h5>
                <h3>{stats.totalUsers}</h3>
                <p className="text-muted mb-0">All registered users</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center shadow-sm h-100 border-0">
              <div className="card-body">
                <FaGraduationCap className="text-success mb-3" size={24} />
                <h5>Total Students</h5>
                <h3>{stats.totalStudents}</h3>
                <p className="text-muted mb-0">Active students</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center shadow-sm h-100 border-0">
              <div className="card-body">
                <FaChalkboardTeacher className="text-danger mb-3" size={24} />
                <h5>Total Instructors</h5>
                <h3>{stats.totalInstructors}</h3>
                <p className="text-muted mb-0">Active instructors</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center shadow-sm h-100 border-0">
              <div className="card-body">
                <FaBook className="text-warning mb-3" size={24} />
                <h5>Total Courses</h5>
                <h3>{stats.totalCourses}</h3>
                <p className="text-muted mb-0">Available courses</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white">
                <h5 className="mb-0">Recent Users</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user, index) => (
                        <tr key={index}>
                          <td>{user.email}</td>
                          <td>
                            <span className={`badge ${user.is_instructor ? 'bg-primary' : 'bg-success'}`}>
                              {user.is_instructor ? 'Instructor' : 'Student'}
                            </span>
                          </td>
                          <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white">
                <h5 className="mb-0">Recent Courses</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Instructor</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentCourses.map((course, index) => (
                        <tr key={index}>
                          <td>{course.title}</td>
                          <td>{course.instructor}</td>
                          <td>${course.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
