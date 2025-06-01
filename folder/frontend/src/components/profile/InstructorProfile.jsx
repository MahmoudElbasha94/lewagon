import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaGraduationCap, FaStar, FaBook, FaDollarSign, FaUser } from 'react-icons/fa';
import '../../styles/InstructorProfile.css';

const InstructorProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    averageRating: 0,
    totalRevenue: 0
  });
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    bio: '',
    expertise: '',
    profile_image: null,
    teaching_experience: '',
    education: '',
    website: '',
    social_media: {
      linkedin: '',
      twitter: '',
      facebook: ''
    }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('access');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const [profileRes, statsRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/users/instructor/profile/', { headers }),
          axios.get('http://127.0.0.1:8000/courses/instructor/stats/', { headers })
        ]);

        setFormData(prevData => ({
          ...prevData,
          ...profileRes.data,
          social_media: {
            ...prevData.social_media,
            ...profileRes.data.social_media
          }
        }));

        setStats(statsRes.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_media.')) {
      const socialField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        social_media: {
          ...prev.social_media,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profile_image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('access');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'social_media') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (key === 'profile_image' && formData[key] instanceof File) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      await axios.put(
        'http://127.0.0.1:8000/users/instructor/profile/update/',
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setSuccess('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="instructor-profile">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="instructor-profile">
      <div className="container">
        <div className="profile-header">
          <h2>Instructor Profile</h2>
          <p className="text-light opacity-75">Manage your personal information and view your statistics</p>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="profile-card">
              <div className="profile-info text-center">
                {formData.profile_image ? (
                  <img
                    src={formData.profile_image}
                    alt="Profile"
                    className="profile-avatar"
                  />
                ) : (
                  <div className="profile-avatar-placeholder">
                    <FaUser size={50} />
                  </div>
                )}
                <h3 className="profile-name">{`${formData.first_name} ${formData.last_name}`}</h3>
                <p className="profile-title">Instructor</p>
                
                <div className="profile-stats">
                  <div className="stat-card">
                    <div className="stat-value">
                      <FaBook className="me-2" />
                      {stats.totalCourses}
                    </div>
                    <div className="stat-label">Courses</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">
                      <FaGraduationCap className="me-2" />
                      {stats.totalStudents}
                    </div>
                    <div className="stat-label">Students</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">
                      <FaStar className="me-2" />
                      {stats.averageRating.toFixed(1)}
                    </div>
                    <div className="stat-label">Avg. Rating</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">
                      <FaDollarSign className="me-2" />
                      {stats.totalRevenue.toFixed(2)}
                    </div>
                    <div className="stat-label">Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="profile-card">
              <div className="profile-info">
                <h4 className="section-title">Personal Information</h4>
                
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Profile Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Expertise</label>
                    <input
                      type="text"
                      className="form-control"
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleChange}
                      placeholder="e.g., Web Development, Data Science"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Bio</label>
                    <textarea
                      className="form-control"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about yourself and your teaching experience"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Teaching Experience</label>
                    <textarea
                      className="form-control"
                      name="teaching_experience"
                      value={formData.teaching_experience}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Describe your teaching experience"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Education</label>
                    <textarea
                      className="form-control"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      rows="2"
                      placeholder="Your educational background"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Website</label>
                    <input
                      type="url"
                      className="form-control"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://your-website.com"
                    />
                  </div>

                  <h4 className="section-title mt-4">Social Media</h4>
                  
                  <div className="form-group">
                    <label className="form-label">LinkedIn</label>
                    <input
                      type="url"
                      className="form-control"
                      name="social_media.linkedin"
                      value={formData.social_media.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/your-profile"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Twitter</label>
                    <input
                      type="url"
                      className="form-control"
                      name="social_media.twitter"
                      value={formData.social_media.twitter}
                      onChange={handleChange}
                      placeholder="https://twitter.com/your-handle"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Facebook</label>
                    <input
                      type="url"
                      className="form-control"
                      name="social_media.facebook"
                      value={formData.social_media.facebook}
                      onChange={handleChange}
                      placeholder="https://facebook.com/your-profile"
                    />
                  </div>

                  {error && <div className="error-message">{error}</div>}
                  {success && <div className="success-message">{success}</div>}

                  <button
                    type="submit"
                    className="save-button mt-4"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile; 