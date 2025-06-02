import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import axios from 'axios';
import '../../styles/AddCourse.css';

const API_BASE_URL = 'http://127.0.0.1:8000';

const AddCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [videos, setVideos] = useState([]);
  
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    level: 'Beginner',
    category: 'Programming',
    courseImage: null,
    requirements: '',
    what_you_will_learn: '',
    courseType: 'Paid'
  });

  const [videoData, setVideoData] = useState({
    lesson_name: '',
    video_url: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'courseImage') {
      setCourseData(prev => ({
        ...prev,
        courseImage: files[0]
      }));
    } else {
      setCourseData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleVideoChange = (e) => {
    const { name, value } = e.target;
    setVideoData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addVideo = () => {
    if (videoData.lesson_name && videoData.video_url) {
      setVideos(prev => [...prev, { ...videoData }]);
      setVideoData({ lesson_name: '', video_url: '' });
    }
  };

  const removeVideo = (index) => {
    setVideos(prev => prev.filter((_, i) => i !== index));
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
      Object.keys(courseData).forEach(key => {
        if (courseData[key] !== null) {
          formData.append(key, courseData[key]);
        }
      });

      // Add videos to formData
      videos.forEach((video, index) => {
        formData.append(`videos[${index}][lesson_name]`, video.lesson_name);
        formData.append(`videos[${index}][video_url]`, video.video_url);
      });

      const response = await axios.post(
        `${API_BASE_URL}/courses/instructor/add-course/`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      setSuccess('Course added successfully!');
      setTimeout(() => {
        navigate('/instructor/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error adding course:', error);
      setError(error.response?.data?.message || 'An error occurred while adding the course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-course">
      <div className="container">
        <div className="page-header">
          <div>
            <h2>Add New Course</h2>
            <p>Create a new course to share your knowledge</p>
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/instructor/dashboard')}
          >
            <FaArrowLeft className="me-2" />
            Back to Dashboard
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Course Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={courseData.title}
                onChange={handleChange}
                required
                placeholder="Enter course title"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                value={courseData.description}
                onChange={handleChange}
                required
                placeholder="Enter course description"
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={courseData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="Enter course price"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Duration (hours)</label>
                  <input
                    type="number"
                    name="duration"
                    className="form-control"
                    value={courseData.duration}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="Enter course duration"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Level</label>
                  <select
                    name="level"
                    className="form-control"
                    value={courseData.level}
                    onChange={handleChange}
                    required
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    className="form-control"
                    value={courseData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Business">Business</option>
                    <option value="Data Science">Data Science</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Course Type</label>
              <select
                name="courseType"
                className="form-control"
                value={courseData.courseType}
                onChange={handleChange}
                required
              >
                <option value="Paid">Paid</option>
                <option value="Free">Free</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Course Image</label>
              <input
                type="file"
                name="courseImage"
                className="form-control"
                onChange={handleChange}
                accept="image/*"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Requirements</label>
              <textarea
                name="requirements"
                className="form-control"
                value={courseData.requirements}
                onChange={handleChange}
                required
                placeholder="Enter course requirements"
              />
            </div>

            <div className="form-group">
              <label className="form-label">What You Will Learn</label>
              <textarea
                name="what_you_will_learn"
                className="form-control"
                value={courseData.what_you_will_learn}
                onChange={handleChange}
                required
                placeholder="Enter what students will learn"
              />
            </div>

            <div className="form-card">
              <h4 className="mb-4">Course Videos</h4>
              <div className="form-group">
                <label className="form-label">Lesson Name</label>
                <input
                  type="text"
                  name="lesson_name"
                  className="form-control"
                  value={videoData.lesson_name}
                  onChange={handleVideoChange}
                  placeholder="Enter lesson name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Video URL</label>
                <input
                  type="url"
                  name="video_url"
                  className="form-control"
                  value={videoData.video_url}
                  onChange={handleVideoChange}
                  placeholder="https://example.com/video"
                />
              </div>

              <button 
                type="button"
                className="btn btn-secondary"
                onClick={addVideo}
                disabled={!videoData.lesson_name || !videoData.video_url}
              >
                Add Video
              </button>

              {videos.length > 0 && (
                <div className="videos-list mt-4">
                  {videos.map((video, index) => (
                    <div key={index} className="video-item">
                      <div>
                        <strong>{video.lesson_name}</strong>
                        <br />
                        <small>{video.video_url}</small>
                      </div>
                      <button 
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removeVideo(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="btn-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/instructor/dashboard')}
              >
                <FaArrowLeft className="me-2" />
                Back to Dashboard
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    <FaSave className="me-2" />
                    Save Course
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse; 