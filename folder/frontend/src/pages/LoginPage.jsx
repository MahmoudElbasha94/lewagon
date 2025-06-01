import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { HiMail } from 'react-icons/hi';
import { BsChatDots, BsGlobe } from 'react-icons/bs';
import { FiPhone } from 'react-icons/fi';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/api/token/', {
        email,
        password
      });

      console.log("API Response:", response.data);

      const { access, refresh, email: userEmail, is_student, is_instructor } = response.data;
      const is_superuser = !is_student && !is_instructor;

      const userData = {
        email: userEmail,
        is_student,
        is_instructor,
        is_superuser
      };

      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('user', JSON.stringify(userData));

      login(userData);

      await Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        timer: 1500,
      });

      if (is_superuser) {
        navigate('/admin/dashboard');
      } else if (is_instructor) {
        navigate('/instructor/dashboard');
      } else {
        navigate('/student/dashboard');
      }

    } catch (error) {
      console.error("Login Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Login failed!',
        text: error.response?.data?.detail || 'Invalid credentials',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form-section">
          <div className="brand">
            <Link to="/" className="logo-link">
              <h2 className="brand-name">&lt;/&gt; Le Wagon</h2>
            </Link>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Welcome Back</h1>
            <p className="subtitle">Continue your coding journey</p>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                placeholder="admin@test.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-options">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span className="checkbox-text">Remember me</span>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="sign-in-button"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In →'}
            </button>

            <button 
              type="button"
              className="google-sign-in"
              disabled={loading}
            >
              <FcGoogle className="google-icon" />
              Continue with Google
            </button>

            <div className="signup-prompt">
              <span>New to Le Wagon?</span>{' '}
              <Link to="/signup" className="signup-link">
                Create account
              </Link>
            </div>
          </form>
        </div>

        <div className="illustration-section">
          <div className="floating-icons">
            <HiMail className="icon mail" />
            <BsChatDots className="icon chat" />
            <BsGlobe className="icon globe" />
            <FiPhone className="icon phone" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 