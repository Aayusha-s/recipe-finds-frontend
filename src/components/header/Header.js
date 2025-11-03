import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPlus, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  console.log('Current pathname:', location.pathname); // Debug log

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
    window.location.href = '/'; // Force navigation to home
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.href = '/'; // Force navigation to home
  };

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
          
          {/* Right Section - Search Bar and Sign Up */}
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
            
            {/* Sign Up Button */}
             <Link to="/signup" className="sign-up-btn" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faUserPlus} className="btn-icon" />
              <span className="btn-text">Sign Up</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;