import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Configure axios to attach token to all requests
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/api/token/', { 
        email, 
        password 
      });
  
      console.log("API Response:", response.data);
  
      const { access, refresh, email: userEmail, is_student, is_instructor } = response.data;
      
      // افترض أن is_superuser = true إذا لم يكن طالبًا ولا مدرسًا
      const is_superuser = !is_student && !is_instructor;
  
      const userData = {
        email: userEmail,
        is_student,
        is_instructor,
        is_superuser
      };

      // احفظ البيانات في localStorage
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('user', JSON.stringify(userData));

      // تحديث حالة المستخدم في AuthContext
      login(userData);
  
      await Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        timer: 1500,
      });
  
      // التوجيه بناءً على الدور
      if (is_superuser) {
        console.log('Navigating to admin dashboard');
        navigate('/admin/dashboard');
      } else if (is_instructor) {
        console.log('Navigating to instructor dashboard');
        navigate('/instructor/dashboard');
      } else {
        console.log('Navigating to student dashboard');
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
      <div className="login-box">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-danger">&lt;/&gt; Le Wagon</h2>
          <h5>Welcome Back</h5>
          <p className="text-muted small">Continue your coding journey</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control rounded-3"
              value={email}
              placeholder="admin@test.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                disabled={loading}
              />
              <label className="form-check-label small">Remember me</label>
            </div>
            <a href="#" className="small text-decoration-none text-light">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            className="btn w-100 text-white fw-bold mb-3" 
            style={{ background: 'linear-gradient(to right, #667eea, #764ba2)' }}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In →'}
          </button>

          <div className="text-center text-muted my-2">Or continue with</div>

          <div className="d-flex justify-content-between mb-3">
            <button 
              className="btn btn-danger w-100 me-2"
              disabled={loading}
              type="button"
            >
              Google
            </button>
            <button 
              className="btn btn-dark w-100"
              disabled={loading}
              type="button"
            >
              GitHub
            </button>
          </div>

          <div className="text-center mt-3">
            <span className="text-light">New to Le Wagon?</span>{' '}
            <a href="/signup" className="text-primary">Create account</a>
          </div>
        </form>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1e1e2f, #2e2e4d);
          overflow: hidden !important;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          margin: 0;
          padding: 0;
          -ms-overflow-style: none !important;  /* IE and Edge */
          scrollbar-width: none !important;  /* Firefox */
        }

        .login-container::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        .login-box {
          width: 100%;
          max-width: 400px;
          padding: 2rem;
          background: linear-gradient(145deg, #1e1e2f, #2e2e4d);
          border-radius: 1rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          color: white;
          overflow-y: auto;
          max-height: 90vh;
          margin: 1rem;
          -ms-overflow-style: none !important;  /* IE and Edge */
          scrollbar-width: none !important;  /* Firefox */
        }

        .login-box::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        .form-control {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: #667eea;
          box-shadow: none;
          color: white;
        }

        .form-control::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .btn {
          padding: 0.75rem;
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .form-check-input {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .form-check-input:checked {
          background-color: #667eea;
          border-color: #667eea;
        }

        a {
          transition: all 0.3s ease;
        }

        a:hover {
          color: #667eea !important;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}

export default Login;