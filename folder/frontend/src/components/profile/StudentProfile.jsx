import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaCamera } from 'react-icons/fa';
import '../../styles/StudentProfile.css';

const DEFAULT_AVATAR = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    user: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      profile_picture: '',
      current_password: '',
      new_password: '',
      confirm_password: ''
    },
    phone: '',
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
        throw new Error('لا يوجد رمز وصول');
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

      console.log('بيانات الملف الشخصي:', response.data);

      setProfile({
        ...response.data,
        user: {
          ...response.data.user,
          profile_picture: response.data.user.profile_picture || DEFAULT_AVATAR,
          current_password: '',
          new_password: '',
          confirm_password: ''
        },
        profile_pic: response.data.profile_pic || DEFAULT_AVATAR
      });
    } catch (error) {
      console.error('خطأ في جلب بيانات الملف الشخصي:', error);
      setError('فشل في تحميل بيانات الملف الشخصي');
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
        throw new Error('لا يوجد رمز وصول');
      }

      const formData = new FormData();
      
      const userFields = ['first_name', 'last_name', 'profile_picture', 'current_password', 'new_password', 'confirm_password'];
      userFields.forEach(key => {
        if (profile.user[key] && profile.user[key] !== DEFAULT_AVATAR) {
          formData.append(`user.${key}`, profile.user[key]);
        }
      });

      const studentFields = ['phone', 'profile_pic'];
      studentFields.forEach(key => {
        if (profile[key] && profile[key] !== DEFAULT_AVATAR) {
          formData.append(key, profile[key]);
        }
      });

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axios.put(
        `${API_BASE_URL}/users/student/profile/update/`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      setSuccess('تم تحديث الملف الشخصي بنجاح');
      Swal.fire({
        title: 'نجاح!',
        text: 'تم تحديث الملف الشخصي بنجاح.' + (profile.user.new_password ? ' يرجى إعادة تسجيل الدخول.' : ''),
        icon: 'success',
        confirmButtonText: 'حسنًا'
      }).then(() => {
        if (profile.user.new_password) {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          window.location.href = '/login';
        }
      });

      await fetchProfile();
    } catch (error) {
      console.error('خطأ في تحديث الملف الشخصي:', error);
      const errorMessage = error.response?.data || 'فشل في تحديث الملف الشخصي';
      console.log('تفاصيل الخطأ:', errorMessage);
      setError(errorMessage);
      Swal.fire('خطأ!', JSON.stringify(errorMessage), 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="student-profile">
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
    <div className="student-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-card">
              <div className="profile-info">
                <div className="position-relative d-inline-block">
                  {profile.profile_pic ? (
                    <img
                      src={profile.profile_pic}
                      alt="Profile"
                      className="profile-avatar"
                    />
                  ) : (
                    <div className="profile-avatar-placeholder">
                      <FaUser size={50} />
                    </div>
                  )}
                  <label className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2 cursor-pointer">
                    <FaCamera className="text-white" />
                    <input
                      type="file"
                      name="profile_pic"
                      onChange={handleChange}
                      accept="image/*"
                      className="d-none"
                    />
                  </label>
                </div>
                <h3 className="profile-name">{profile.user.first_name} {profile.user.last_name}</h3>
                <p className="profile-title">Student</p>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="profile-card">
              <div className="profile-info">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="user.first_name"
                          value={profile.user.first_name || ''}
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
                          name="user.last_name"
                          value={profile.user.last_name || ''}
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
                      name="user.email"
                      value={profile.user.email || ''}
                      onChange={handleChange}
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone_number"
                      value={profile.phone_number || ''}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Interests</label>
                    <input
                      type="text"
                      className="form-control"
                      name="interests"
                      value={profile.interests || ''}
                      onChange={handleChange}
                      placeholder="e.g., Web Development, Data Science"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Education Level</label>
                    <input
                      type="text"
                      className="form-control"
                      name="education_level"
                      value={profile.education_level || ''}
                      onChange={handleChange}
                      placeholder="e.g., Bachelor's Degree, High School"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="action-button"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
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

export default StudentProfile; 
