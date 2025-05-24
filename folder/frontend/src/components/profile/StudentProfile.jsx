import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_BASE_URL = 'http://127.0.0.1:8000';
const DEFAULT_AVATAR = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    user: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      profile_picture: ''
    },
    phone_number: '',
    interests: '',
    education_level: '',
    profile_pic: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('access');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await axios.get(
        `${API_BASE_URL}/users/student/profile/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      setProfile({
        ...response.data,
        user: {
          ...response.data.user,
          profile_picture: response.data.user.profile_picture || DEFAULT_AVATAR
        },
        profile_pic: response.data.profile_pic || DEFAULT_AVATAR
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name.startsWith('user.')) {
      const userField = name.split('.')[1];
      setProfile(prev => ({
        ...prev,
        user: {
          ...prev.user,
          [userField]: files ? files[0] : value
        }
      }));
    } else if (name === 'profile_pic') {
      setProfile(prev => ({
        ...prev,
        profile_pic: files[0]
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('access');
      if (!token) {
        throw new Error('No access token found');
      }

      const formData = new FormData();
      
      // Add user fields
      Object.keys(profile.user).forEach(key => {
        if (profile.user[key] !== null && profile.user[key] !== undefined && profile.user[key] !== DEFAULT_AVATAR) {
          formData.append(`user.${key}`, profile.user[key]);
        }
      });

      // Add student fields
      Object.keys(profile).forEach(key => {
        if (key !== 'user' && profile[key] !== null && profile[key] !== undefined && profile[key] !== DEFAULT_AVATAR) {
          formData.append(key, profile[key]);
        }
      });

      await axios.put(
        `${API_BASE_URL}/users/student/profile/update/`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      setSuccess('Profile updated successfully');
      Swal.fire(
        'Success!',
        'Your profile has been updated successfully.',
        'success'
      );
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile');
      Swal.fire(
        'Error!',
        error.response?.data?.message || 'Failed to update profile',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <div>Loading...</div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <img
                src={profile.profile_pic || profile.user.profile_picture || DEFAULT_AVATAR}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h3>{profile.user.first_name} {profile.user.last_name}</h3>
              <p className="text-muted">Student</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Profile Information</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="user.first_name"
                        value={profile.user.first_name || ''}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="user.last_name"
                        value={profile.user.last_name || ''}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="user.email"
                    value={profile.user.email || ''}
                    onChange={handleChange}
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone_number"
                    value={profile.phone_number || ''}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Interests</Form.Label>
                  <Form.Control
                    type="text"
                    name="interests"
                    value={profile.interests || ''}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Education Level</Form.Label>
                  <Form.Control
                    type="text"
                    name="education_level"
                    value={profile.education_level || ''}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="profile_pic"
                    onChange={handleChange}
                    accept="image/*"
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentProfile; 