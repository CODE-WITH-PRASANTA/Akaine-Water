import React, { useState } from "react";
import "./Login.css";
import { 
  FiMail, 
  FiLock, 
  FiUser, 
  FiPhone, 
  FiCheckSquare, 
  FiSquare 
} from "react-icons/fi";

const Login = () => {
  // state to toggle between 'login' and 'register' views
  const [isRegister, setIsRegister] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Form states
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with: ${loginData.email}`);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert(`Creating account for: ${registerData.fullName}`);
  };

  return (
    <div className="Login__container">
      <div className="Login__card">
        {/* Brand Logo and Title Header with Built-in Water Drop Logo */}
        <div className="Login__header">
          <div className="Login__logoWrapper">
            <svg 
              className="Login__waterDropLogo" 
              viewBox="0 0 24 24" 
              width="42" 
              height="42" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Crown element */}
              <path 
                d="M7 6L9.5 9L12 5L14.5 9L17 6L16.5 10H7.5L7 6Z" 
                fill="#ECC94B" 
              />
              {/* Water Drop Body */}
              <path 
                d="M12 2.69c-4.97 5.78-8 9.08-8 12.31 0 4.41 3.59 8 8 8s8-3.59 8-8c0-3.23-3.03-6.53-8-12.31z" 
                fill="#4299E1" 
                fillOpacity="0.85"
              />
              {/* Water highlight reflection */}
              <path 
                d="M12 6c-2.5 3.5-4 5.8-4 8.2 0 2.2 1.8 4 4 4s4-1.8 4-4c0-2.4-1.5-4.7-4-8.2z" 
                fill="#90CDF4" 
                fillOpacity="0.6"
              />
            </svg>
          </div>
          <h2 className="Login__brandTitle">Alka Drops</h2>
        </div>

        {/* Conditional Rendering based on isRegister state */}
        {!isRegister ? (
          /* --- LOGIN VIEW (1st Reference Image) --- */
          <form className="Login__form" onSubmit={handleLoginSubmit}>
            <div className="Login__inputGroup">
              <span className="Login__inputIcon"><FiMail /></span>
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                value={loginData.email}
                onChange={handleLoginChange}
                required
                className="Login__input"
              />
            </div>

            <div className="Login__inputGroup">
              <span className="Login__inputIcon"><FiLock /></span>
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                value={loginData.password}
                onChange={handleLoginChange}
                required
                className="Login__input"
              />
            </div>

            <div className="Login__optionsRow">
              <label className="Login__checkboxLabel" onClick={() => setRememberMe(!rememberMe)}>
                {rememberMe ? <FiCheckSquare className="Login__checkActive" /> : <FiSquare />}
                <span>Remember Me</span>
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Redirecting to password recovery"); }} className="Login__forgotLink">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="Login__submitBtn">
              Sign In
            </button>

            <div className="Login__switchText">
              Don't have an account?{" "}
              <span 
                className="Login__switchActionLink" 
                onClick={() => setIsRegister(true)}
              >
                Create one
              </span>
            </div>
          </form>
        ) : (
          /* --- REGISTER VIEW (2nd Reference Image) --- */
          <form className="Login__form" onSubmit={handleRegisterSubmit}>
            <div className="Login__inputGroup">
              <span className="Login__inputIcon"><FiUser /></span>
              <input 
                type="text" 
                name="fullName"
                placeholder="Full Name" 
                value={registerData.fullName}
                onChange={handleRegisterChange}
                required
                className="Login__input"
              />
            </div>

            <div className="Login__inputGroup">
              <span className="Login__inputIcon"><FiMail /></span>
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                value={registerData.email}
                onChange={handleRegisterChange}
                required
                className="Login__input"
              />
            </div>

            <div className="Login__inputGroup">
              <span className="Login__inputIcon"><FiPhone /></span>
              <input 
                type="tel" 
                name="phone"
                placeholder="Phone Number" 
                value={registerData.phone}
                onChange={handleRegisterChange}
                required
                className="Login__input"
              />
            </div>

            <div className="Login__inputGroup">
              <span className="Login__inputIcon"><FiLock /></span>
              <input 
                type="password" 
                name="password"
                placeholder="Create Password" 
                value={registerData.password}
                onChange={handleRegisterChange}
                required
                className="Login__input"
              />
            </div>

            <div className="Login__inputGroup">
              <span className="Login__inputIcon"><FiLock /></span>
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="Confirm Password" 
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
                className="Login__input"
              />
            </div>

            <div className="Login__optionsRow">
              <label className="Login__checkboxLabel" onClick={() => setAgreeTerms(!agreeTerms)}>
                {agreeTerms ? <FiCheckSquare className="Login__checkActive" /> : <FiSquare />}
                <span>I agree to terms & conditions</span>
              </label>
            </div>

            <button type="submit" className="Login__submitBtn">
              Create Account
            </button>

            <div className="Login__switchText">
              Already have an account?{" "}
              <span 
                className="Login__switchActionLink" 
                onClick={() => setIsRegister(false)}
              >
                Sign In
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;