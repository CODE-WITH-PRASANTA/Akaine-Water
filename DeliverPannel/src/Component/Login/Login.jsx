import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

// Custom Alka Drops Logo & Right Side Image
import alkaDropsLogo from '../../assets/ALKA DROPS LOGO.png';
import rightSideGraphic from '../../assets/gemini-svg (1).svg'; // 👈 Update with your image filename

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Reset authentication state on mount
  useEffect(() => {
    sessionStorage.removeItem('isAdminAuthenticated');
  }, []);

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Verified credentials check (alkadrops / 12345)
    if (username.trim() === 'alkadrops' && password === '12345') {
      setErrorMessage('');
      setLoginSuccess(true);

      sessionStorage.setItem('isAdminAuthenticated', 'true');

      setTimeout(() => {
        navigate('/wdms/dashboard', { replace: true });
      }, 1000);
    } else {
      setIsSubmitting(false);
      setErrorMessage('Incorrect ID or Password. Credentials are "alkadrops" and "12345".');
      setLoginSuccess(false);
    }
  };

  return (
    <div className="Login-container">
      <div className="Login-card">
        {/* Left Side: Form Section */}
        <div className="Login-left">
          {/* Logo Header */}
          <div className="Login-brand-header">
            {alkaDropsLogo ? (
              <img
                src={alkaDropsLogo}
                alt="Alka Drops Logo"
                className="Login-logo-img"
              />
            ) : (
              <div className="Login-logo-fallback">AD</div>
            )}
            <div className="Login-brand-text">
              <span className="Login-brand-title">ALKA DROPS</span>
              <span className="Login-brand-subtitle">BEST SOFTWARE SOLUTION</span>
            </div>
          </div>

          {/* Header Title */}
          <div className="Login-header">
            <h1 className="Login-title">Admin Login</h1>
            <p className="Login-subtitle">Welcome Back! Please login to continue.</p>
          </div>

          {/* Feedback Messages */}
          {loginSuccess && (
            <div className="Login-toast Login-toast-success">
              <span>✓ Credentials verified! Redirecting to dashboard...</span>
            </div>
          )}

          {errorMessage && (
            <div className="Login-toast Login-toast-error">
              <span>✗ {errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form className="Login-form" onSubmit={handleSubmit}>
            <div className="Login-input-group">
              <label className="Login-label">Username ID</label>
              <input
                type="text"
                placeholder="Enter Username ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="Login-input"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="Login-input-group">
              <label className="Login-label">Password</label>
              <div className="Login-password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="Login-input"
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="button"
                  className="Login-password-toggle"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="Login-options">
              <label className="Login-remember-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="Login-checkbox"
                />
                Remember Me
              </label>
              <a href="#forgot" className="Login-forgot-link">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="Login-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          <p className="Login-footer-text">
            © {new Date().getFullYear()} ALKA DROPS. All rights reserved.
          </p>
        </div>

        {/* Right Side: Image Asset Section */}
        <div className="Login-right">
          <div className="Login-image-wrapper">
            <img
              src={rightSideGraphic}
              alt="Alka Drops Graphic"
              className="Login-right-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;