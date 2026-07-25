import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaRegSquare,
  FaCheckSquare,
  FaKey,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserPlus
} from 'react-icons/fa';
import { TbGridDots } from 'react-icons/tb';
import './Login.css';

// Importing custom logo 
import alkaDropsLogo from "../../assets/ALKA DROPS LOGO.png";

const Login = () => {
  const navigate = useNavigate();

  // Mode state: 'login' | 'register'
  const [isRegistering, setIsRegistering] = useState(false);

  // Common UI State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Login Form State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Registration Form State
  const [registerData, setRegisterData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMode = (mode) => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsRegistering(mode === 'register');
  };

  // Login Handler (Simulated JWT Auth)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Check credentials against demo admin or registered user in localStorage
    const savedUser = JSON.parse(localStorage.getItem('alkadrops_user') || '{}');

    const isValidAdmin = loginUsername === 'alkadrops' && loginPassword === '12345';
    const isValidRegisteredUser = savedUser.email === loginUsername && savedUser.password === loginPassword;

    if (isValidAdmin || isValidRegisteredUser) {
      setSuccessMessage('Credentials verified! Opening dashboard...');
      
      // Store JWT token simulation in Session/Local Storage
      const mockJWTToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo2NjYiLCJyb2xlIjoiYWRtaW4ifQ";
      sessionStorage.setItem("authToken", mockJWTToken);
      sessionStorage.setItem("isAdminAuthenticated", "true");

      setTimeout(() => {
        navigate("/wdms/dashboard");
      }, 1200);
    } else {
      setErrorMessage('Invalid ID or Password. Check credentials displayed above.');
    }
  };

  // Registration Handler
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Password validation check
    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    if (registerData.password.length < 5) {
      setErrorMessage('Password must be at least 5 characters long.');
      return;
    }

    // Save registered user details locally (Mock backend call)
    localStorage.setItem('alkadrops_user', JSON.stringify(registerData));

    setSuccessMessage('Account registered successfully! Please login with your details.');
    
    // Switch back to login panel after short delay
    setTimeout(() => {
      setLoginUsername(registerData.email);
      setLoginPassword('');
      setIsRegistering(false);
      setSuccessMessage('');
    }, 1500);
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
              {isRegistering 
                ? "Join our platform today to manage projects, access client dashboards, and stay synced." 
                : "Welcome to the Alka Drops Admin Dashboard. Manage projects, clients, content and business operations securely."}
            </p>
          </div>

          <div className="Login-secure-badge">
            <div className="Login-badge-icon-wrapper">
              <FaUserShield className="Login-badge-icon" />
            </div>
            <div className="Login-badge-text">
              <span className="Login-badge-title">JWT Authenticated</span>
              <span className="Login-badge-desc">Your security is our priority.</span>
            </div>
          </div>

          <div className="Login-dots-bottom">
            <TbGridDots size={40} />
          </div>

          <div className="Login-orb-bottom" />
        </div>

        {/* Right Side: Dynamic Form (Login / Register) */}
        <div className="Login-right">
          
          <div className="Login-avatar-container">
            <div className="Login-avatar-wrapper">
              {isRegistering ? (
                <FaUserPlus className="Login-avatar-icon" />
              ) : (
                <FaUserShield className="Login-avatar-icon" />
              )}
            </div>
          </div>

          <div className="Login-right-header">
            <h2 className="Login-welcome-title">
              {isRegistering ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="Login-welcome-subtitle">
              {isRegistering 
                ? "Fill in your details to create a new user profile" 
                : "Sign in to continue to your dashboard"}
            </p>
          </div>

          {/* Feedback Messages */}
          {successMessage && (
            <div className="Login-success-toast">
              <span className="Login-success-check">✓</span>
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="Login-error-toast">
              <span className="Login-error-cross">✗</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* LOGIN FORM VIEW */}
          {!isRegistering ? (
            <>
              {/* Credentials Display Box */}
              <form className="Login-form" onSubmit={handleLoginSubmit}>
                <div className="Login-input-wrapper">
                  <FaUser className="Login-input-icon" />
                  <input
                    type="text"
                    placeholder="Username or Email"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="Login-input"
                    required
                  />
                </div>

                <div className="Login-input-wrapper">
                  <FaLock className="Login-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="Login-input"
                    required
                  />
                  <button
                    type="button"
                    className="Login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
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

              <div className="Login-switch-prompt">
                <span>Don't have an account?</span>
                <button 
                  type="button" 
                  className="Login-switch-btn"
                  onClick={() => toggleMode('register')}
                >
                  Register Now
                </button>
              </div>
            </>
          ) : (
            /* REGISTER FORM VIEW */
            <>
              <form className="Login-form Login-register-form" onSubmit={handleRegisterSubmit}>
                
                {/* Full Name */}
                <div className="Login-input-wrapper">
                  <FaUser className="Login-input-icon" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={registerData.fullName}
                    onChange={handleRegisterChange}
                    className="Login-input"
                    required
                  />
                </div>

                {/* Address */}
                <div className="Login-input-wrapper">
                  <FaMapMarkerAlt className="Login-input-icon" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Full Address"
                    value={registerData.address}
                    onChange={handleRegisterChange}
                    className="Login-input"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="Login-input-wrapper">
                  <FaPhone className="Login-input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    className="Login-input"
                    required
                  />
                </div>

                {/* Email ID */}
                <div className="Login-input-wrapper">
                  <FaEnvelope className="Login-input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    className="Login-input"
                    required
                  />
                </div>

                {/* Password */}
                <div className="Login-input-wrapper">
                  <FaLock className="Login-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create Password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    className="Login-input"
                    required
                  />
                  <button
                    type="button"
                    className="Login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="Login-input-wrapper">
                  <FaLock className="Login-input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Re-enter Password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    className="Login-input"
                    required
                  />
                  <button
                    type="button"
                    className="Login-password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <button type="submit" className="Login-submit-btn">
                  Submit & Register
                </button>
              </form>

              <div className="Login-switch-prompt">
                <span>Already have an account?</span>
                <button 
                  type="button" 
                  className="Login-switch-btn"
                  onClick={() => toggleMode('login')}
                >
                  Sign In
                </button>
              </div>
            </>
          )}

          <p className="Login-footer-text">
            © {new Date().getFullYear()} ALKA DROPS. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;