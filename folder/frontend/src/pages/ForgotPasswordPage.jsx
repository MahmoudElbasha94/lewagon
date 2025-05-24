import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!email) {
      setError('يرجى إدخال البريد الإلكتروني');
      return;
    }
    // نجاح وهمي
    setMessage('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني (تجريبي).');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 p-8">
        <div className="flex flex-col items-center mb-6">
          <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/logo.png" alt="Le Wagon" className="h-12 mb-2" />
          <h2 className="text-2xl font-bold text-white mb-2">Forgot Password</h2>
          <p className="text-gray-300 mb-4 text-center">Enter your email address and we'll send you a link to reset your password.</p>
        </div>
        {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
        {message && <div className="mb-4 text-green-400 text-center">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-200 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="name@email.com"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors">Send Reset Link</button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/login" className="text-red-400 hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage; 