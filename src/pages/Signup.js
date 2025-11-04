// src/pages/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faLock, 
  faEye, 
  faEyeSlash,
  faUtensils,
  faSeedling,
  faHeart,
  faCheckCircle,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import './Signup.css';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const {signup} = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

 // src/pages/Signup.js - UPDATE HANDLESUBMIT
// src/pages/Signup.js - UPDATE THE HANDLESUBMIT FUNCTION
const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();
  
  if (Object.keys(newErrors).length === 0) {
    setIsLoading(true);
    try {
      // Use the actual signup function from AuthContext
      await signup({
        name: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      // Redirect to login page after successful signup
      navigate('/login', { 
        state: { 
          message: 'Account created successfully! Please sign in.',
          email: formData.email 
        }
      });
      
    } catch (error) {
      setErrors({ general: 'Signup failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  } else {
    setErrors(newErrors);
  }
};
// Add this after your form
{errors.general && <span className="error-message general-error">{errors.general}</span>}

  const passwordStrength = {
    length: formData.password.length >= 6,
    uppercase: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
  };

  const strengthScore = Object.values(passwordStrength).filter(Boolean).length;

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>

        {/* Left Side - Simplified Illustration */}
        <div className="signup-left">
          <div className="welcome-content">
            <img src='/images/RecipeFindsLogo.png' alt='RecipeFinds' className='side-logo' />
            <h1>Join RecipeFinds</h1>
            <p>Start your culinary journey with thousands of recipes</p>
            
            <div className="features-list">
              <div className="feature">
                <FontAwesomeIcon icon={faUtensils} className="feature-icon" />
                <span>10,000+ Recipes</span>
              </div>
              <div className="feature">
                <FontAwesomeIcon icon={faHeart} className="feature-icon" />
                <span>Save Favorites</span>
              </div>
              <div className="feature">
                <FontAwesomeIcon icon={faSeedling} className="feature-icon" />
                <span>Share Creations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="signup-right">
          <div className="signup-form-container">
            <div className="form-header">
              <h2>Create Account</h2>
              <p>Sign up to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              {/* Username Field */}
              <div className="form-group">
                <div className="input-container">
                  <FontAwesomeIcon icon={faUser} className="input-icon" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`form-input ${errors.username ? 'error' : ''}`}
                    placeholder="Username"
                  />
                </div>
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <div className="input-container">
                  <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Email address"
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <div className="input-container">
                  <FontAwesomeIcon icon={faLock} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                
                {/* Password Strength */}
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-meter">
                      <div 
                        className={`strength-bar ${strengthScore >= 1 ? 'active' : ''} ${strengthScore === 1 ? 'weak' : ''}`}
                      ></div>
                      <div 
                        className={`strength-bar ${strengthScore >= 2 ? 'active' : ''} ${strengthScore === 2 ? 'medium' : ''}`}
                      ></div>
                      <div 
                        className={`strength-bar ${strengthScore >= 3 ? 'active' : ''} ${strengthScore === 3 ? 'strong' : ''}`}
                      ></div>
                    </div>
                  </div>
                )}
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              {/* Confirm Password Field */}
              <div className="form-group">
                <div className="input-container">
                  <FontAwesomeIcon icon={faLock} className="input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              {/* Terms Agreement */}
              <div className="terms-agreement">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" required />
                  <span className="checkmark"></span>
                  I agree to the <a href="#terms" className="terms-link">Terms</a> and <a href="#privacy" className="terms-link">Privacy</a>
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className={`signup-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Login Link */}
              <div className="login-link">
                Already have an account? <Link to="/login" className="login-link-text">Sign in</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;