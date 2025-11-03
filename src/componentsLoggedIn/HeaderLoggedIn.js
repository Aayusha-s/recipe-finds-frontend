import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faBars, faTimes, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import './HeaderLoggedIn.css';

const HeaderLoggedIn = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Force home navigation to prevent redirect issues
  const handleHomeClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    window.location.href = '/';
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-container">
          {/* Hamburger Menu for Mobile */}
          <div className="hamburger-menu" onClick={toggleMenu}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="hamburger-icon" />
          </div>
          
          <div className="logo">
            <Link to="/" onClick={handleLogoClick}>
              <img src="/images/RecipeFindsLogo.png" 
              alt='RecipeFinds Logo' 
              className='logo-image' />
            </Link>
          </div>
          
          <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-active' : ''}`}>
            <li className="nav-item">
              <Link 
                to="/explore" 
                className={`nav-link ${isActiveLink('/explore') ? 'nav-link-active' : ''}`} 
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/top-recipes" 
                className={`nav-link ${isActiveLink('/top-recipes') ? 'nav-link-active' : ''}`} 
                onClick={() => setIsMenuOpen(false)}
              >
                Top Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/community" 
                className={`nav-link ${isActiveLink('/community') ? 'nav-link-active' : ''}`} 
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
            </li>
          </ul>
          
          {/* Right Section - Search Bar and User Avatar */}
          <div className="nav-right">
            {/* Search Bar */}
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search recipes, ingredients or chefs..." 
                className="search-input"
              />
              <button className="search-button">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
              </button>
            </div>
            
            {/* User Avatar with Dropdown */}
            <div className="user-menu" ref={dropdownRef}>
              <div className="user-avatar-container" onClick={toggleDropdown}>
                <img 
                  src={user?.avatar || '/images/default-avatar.png'} 
                  alt={user?.name || 'User'} 
                  className="user-avatar"
                />
                <span className="user-name">{user?.name || 'User'}</span>
              </div>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <img 
                      src={user?.avatar || '/images/default-avatar.png'} 
                      alt={user?.name || 'User'} 
                      className="dropdown-avatar"
                    />
                    <div className="user-info">
                      <div className="user-display-name">{user?.name || 'User'}</div>
                      <div className="user-email">{user?.email || 'user@example.com'}</div>
                    </div>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <button className="dropdown-item" onClick={handleProfileClick}>
                    <FontAwesomeIcon icon={faUser} className="dropdown-icon" />
                    <span>My Profile</span>
                  </button>
                  
                  <button className="dropdown-item">
                    <FontAwesomeIcon icon={faCog} className="dropdown-icon" />
                    <span>Settings</span>
                  </button>
                  
                  <div className="dropdown-divider"></div>
                  
                  <button className="dropdown-item logout-item" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="dropdown-icon" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderLoggedIn;