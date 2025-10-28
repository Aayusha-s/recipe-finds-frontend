import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPlus, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <Link to="/">
              <img src="images/RecipeFindsLogo.png" alt='RecipeFinds Logo' className='logo-image' />
            </Link>
          </div>
          
          <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-active' : ''}`}>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/explore" className="nav-link" onClick={() => setIsMenuOpen(false)}>Explore</Link>
            </li>
            <li className="nav-item">
              <Link to="/top-recipes" className="nav-link" onClick={() => setIsMenuOpen(false)}>Top Recipes</Link>
            </li>
            <li className="nav-item">
              <Link to="/community" className="nav-link" onClick={() => setIsMenuOpen(false)}>Community</Link>
              
            </li>
          </ul>
          
          {/* Right Section - Search Bar and Sign Up */}
          <div className="nav-right">
            {/* Search Bar */}
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search recipes..." 
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