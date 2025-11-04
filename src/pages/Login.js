// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faLock, 
  faEye, 
  faEyeSlash,
  faUtensils,
  faSeedling,
  faHeart,
  faUser,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

// src/pages/Login.js - UPDATE THE HANDLESUBMIT FUNCTION
const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();
  
  if (Object.keys(newErrors).length === 0) {
    setIsLoading(true);
    try {
      // Use the actual login function from AuthContext
      await login(formData.email, formData.password);
      // No need to navigate - the AuthContext will update and components will re-render
    } catch (error) {
      setErrors({ general: 'Login failed. Please check your credentials.' });
    } finally {
      setIsLoading(false);
    }
  } else {
    setErrors(newErrors);
  }
};

// Add this error display after your form
{errors.general && <span className="error-message general-error">{errors.general}</span>}

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <button className="login-back-button" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>
        {/* Left Side - Illustration */}
        <div className="login-left">
          
          <div className="welcome-illustration">
            <div className="cooking-scene">
              <div className="chef-hat"></div>
              <div className="cooking-pot">
                <div className="pot"></div>
                <div className="steam steam-1"></div>
                <div className="steam steam-2"></div>
                <div className="steam steam-3"></div>
              </div>
              <div className="ingredients">
                <div className="ingredient tomato"></div>
                <div className="ingredient herb"></div>
                <div className="ingredient garlic"></div>
              </div>
            </div>
            
            <div className="welcome-message">
              <h1>Welcome Back!</h1>
              <p>Sign in to continue your culinary journey and access your saved recipes.</p>
              
              <div className="feature-highlights">
                <div className="highlight">
                  <FontAwesomeIcon icon={faSeedling} className="highlight-icon" />
                  <span>Your saved recipes</span>
                </div>
                <div className="highlight">
                  <FontAwesomeIcon icon={faHeart} className="highlight-icon" />
                  <span>Personal favorites</span>
                </div>
                <div className="highlight">
                  <FontAwesomeIcon icon={faUser} className="highlight-icon" />
                  <span>Community features</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login-right">
          <div className="login-form-container">
            <div className="form-header">
              {/* <img src='/images/RecipeFindsLogo.png' alt='RecipeFinds' className='form-logo' /> */}
              <h2>Sign In</h2>
              <p>Welcome back to RecipeFinds</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-container">
                  <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <div className="password-label-row">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Link to="/forgot-password" className="forgot-password">
                    Forgot Password?
                  </Link>
                </div>
                <div className="input-container">
                  <FontAwesomeIcon icon={faLock} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              {/* Remember Me */}
              <div className="login-options">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    className="checkbox-input"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className={`login-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Signup Link */}
              <div className="signup-link">
                Don't have an account? <Link to="/signup" className="signup-link-text">Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;