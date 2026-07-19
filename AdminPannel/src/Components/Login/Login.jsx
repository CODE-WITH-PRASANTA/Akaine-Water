import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { 
  FaUser, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaUserShield, 
  FaRegSquare, 
  FaCheckSquare,
  FaKey
} from 'react-icons/fa';
import { TbGridDots } from 'react-icons/tb';
import './Login.css';

// Importing custom Alka Drops logo
import alkaDropsLogo from "../../assets/ALKA DROPS LOGO.png"; // Adjust path to match your assets directory

const Login = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Credentials check
    if (username === 'alkadrops' && password === '12345') {
      setErrorMessage('');
      setLoginSuccess(true);
      
      // Save authenticated state in session storage
      sessionStorage.setItem("isAdminAuthenticated", "true");
      
      // Slight delay for smooth visual transition
      setTimeout(() => {
        navigate("/wdms/dashboard"); // Redirect directly to the admin dashboard
      }, 1200);
    } else {
      setErrorMessage('Incorrect ID or Password. Check credentials displayed above.');
      setLoginSuccess(false);
    }
  };

  return (
    <div className="Login-container">
      <div className="Login-card">
        
        {/* Left Side: Gradient Banner */}
        <div className="Login-left">
          <div className="Login-dots-top">
            <TbGridDots size={40} />
          </div>

          <div className="Login-brand-header">
            <div className="Login-logo-container">
              {alkaDropsLogo ? (
                <img src={alkaDropsLogo} alt="Alka Drops Logo" className="Login-logo-img" />
              ) : (
                <span className="Login-logo-fallback">AD</span>
              )}
            </div>
            <div className="Login-brand-text-group">
              <h3 className="Login-brand-title">ALKA DROPS</h3>
              <p className="Login-brand-subtitle">BEST SOFTWARE SOLUTION</p>
            </div>
          </div>

          <div className="Login-left-body">
            <h1 className="Login-hero-text">
              ALKA <br />
              DROPS
            </h1>
            <div className="Login-divider" />
            <p className="Login-description">
              Welcome to the Alka Drops Admin Dashboard. Manage projects, clients, content and business operations securely.
            </p>
          </div>

          <div className="Login-secure-badge">
            <div className="Login-badge-icon-wrapper">
              <FaUserShield className="Login-badge-icon" />
            </div>
            <div className="Login-badge-text">
              <span className="Login-badge-title">Secure Login</span>
              <span className="Login-badge-desc">Your security is our priority.</span>
            </div>
          </div>

          <div className="Login-dots-bottom">
            <TbGridDots size={40} />
          </div>

          <div className="Login-orb-bottom" />
        </div>

        {/* Right Side: Form */}
        <div className="Login-right">
          <div className="Login-avatar-container">
            <div className="Login-avatar-wrapper">
              <FaUserShield className="Login-avatar-icon" />
            </div>
          </div>

          <div className="Login-right-header">
            <h2 className="Login-welcome-title">Welcome Back</h2>
            <p className="Login-welcome-subtitle">Sign in to continue to your dashboard</p>
          </div>

          {/* Credentials Display Box */}
          <div className="Login-credentials-hint">
            <div className="Login-hint-header">
              <FaKey className="Login-hint-key-icon" />
              <span className="Login-hint-title">Admin Access Credentials</span>
            </div>
            <div className="Login-hint-row">
              <span className="Login-hint-label">Username ID:</span>
              <code className="Login-hint-value">alkadrops</code>
            </div>
            <div className="Login-hint-row">
              <span className="Login-hint-label">Password:</span>
              <code className="Login-hint-value">12345</code>
            </div>
          </div>

          {loginSuccess && (
            <div className="Login-success-toast">
              <span className="Login-success-check">✓</span>
              <span>Credentials verified! Opening dashboard...</span>
            </div>
          )}

          {errorMessage && (
            <div className="Login-error-toast">
              <span className="Login-error-cross">✗</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form className="Login-form" onSubmit={handleSubmit}>
            <div className="Login-input-wrapper">
              <FaUser className="Login-input-icon" />
              <input
                type="text"
                placeholder="alkadrops"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="Login-input"
                required
              />
            </div>

            <div className="Login-input-wrapper">
              <FaLock className="Login-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="•••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="Login-input"
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

            <div className="Login-options">
              <button 
                type="button"
                className="Login-remember-toggle"
                onClick={() => setRememberMe(!rememberMe)}
              >
                <span className="Login-custom-checkbox">
                  {rememberMe ? <FaCheckSquare /> : <FaRegSquare />}
                </span>
                Remember me
              </button>
              <a href="#forgot" className="Login-forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="Login-submit-btn">
              Login
            </button>
          </form>

          <p className="Login-footer-text">
            © {new Date().getFullYear()} ALKA DROPS. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;