// src/components/header/Header.js
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faUserPlus, 
  faUser, 
  faBars, 
  faTimes, 
  faSignOutAlt, 
  faCog 
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

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

  // Mock search data - replace with actual API call
  const mockSearchData = [
    { id: 1, type: 'recipe', title: 'Chocolate Chip Cookies', category: 'Desserts' },
    { id: 2, type: 'recipe', title: 'Vegetable Stir Fry', category: 'Main Course' },
    { id: 3, type: 'ingredient', title: 'Chicken Breast', category: 'Ingredients' },
    { id: 4, type: 'chef', title: 'Chef Maria', category: 'Chefs' },
    { id: 5, type: 'recipe', title: 'Classic Pancakes', category: 'Breakfast' },
    { id: 6, type: 'recipe', title: 'Spaghetti Carbonara', category: 'Italian' },
  ];

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      // Filter mock data based on query
      const filtered = mockSearchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
      setSearchQuery('');
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'recipe') {
      navigate(`/recipe/${suggestion.id}`);
    } else if (suggestion.type === 'chef') {
      navigate(`/chef/${suggestion.id}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(suggestion.title)}&type=${suggestion.type}`);
    }
    setShowSuggestions(false);
    setSearchQuery('');
  };

  // Handle search by pressing Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close user dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      // Close search suggestions
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // ADD THIS FUNCTION: Handle Settings Click
  const handleSettingsClick = () => {
    setIsDropdownOpen(false);
    navigate('/settings');
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    navigate('/');
  };

  // Clear search when navigating
  useEffect(() => {
    setSearchQuery('');
    setShowSuggestions(false);
  }, [location.pathname]);

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
          
          {/* Right Section - Search Bar and User/Auth Controls */}
          <div className="nav-right">
            {/* Search Bar with Suggestions */}
            <div className="search-wrapper" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="search-container">
                <input 
                  type="text" 
                  placeholder="Search recipes, ingredients or chefs..." 
                  className="search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                  onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                />
                <button type="submit" className="search-button">
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </button>
              </form>
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="search-suggestions">
                  {searchSuggestions.map((suggestion) => (
                    <div
                      key={`${suggestion.type}-${suggestion.id}`}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="suggestion-content">
                        <div className="suggestion-title">{suggestion.title}</div>
                        <div className="suggestion-category">{suggestion.category}</div>
                      </div>
                      <div className={`suggestion-type ${suggestion.type}`}>
                        {suggestion.type}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Conditional Rendering based on Authentication */}
            {isAuthenticated ? (
              /* Logged-in User: Avatar with Dropdown */
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
                    
                    {/* UPDATED: Settings button now navigates to settings page */}
                    <button className="dropdown-item" onClick={handleSettingsClick}>
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
            ) : (
              /* Guest User: Sign Up Button */
              <Link to="/signup" className="sign-up-btn" onClick={() => setIsMenuOpen(false)}>
                <FontAwesomeIcon icon={faUserPlus} className="btn-icon" />
                <span className="btn-text">Sign Up</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;