import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUtensils, 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faHeart,
  faShare,
  faLeaf
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faPinterest,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-wave"></div>
      
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-content">
          
          {/* Brand Column */}
          <div className="footer-column brand-column">
            <div className="footer-logo">
              <img src='/images/RecipeFindsLogo.png' alt='RecipeFinds Logo' className='footer-logo-image' />
              <span className="brand-name">RecipeFinds</span>
            </div>
            <p className="footer-description">
              Discover, share, and enjoy amazing recipes from food lovers around the world. 
              Join our community and transform your cooking experience.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social-link">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="social-link">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="social-link">
                <FontAwesomeIcon icon={faPinterest} />
              </a>
              <a href="#" className="social-link">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#explore">Explore Recipes</a></li>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#popular">Popular Recipes</a></li>
              <li><a href="#quick">Quick Meals</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-column">
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li><a href="#italian">Italian</a></li>
              <li><a href="#asian">Asian</a></li>
              <li><a href="#vegan">Vegan</a></li>
              <li><a href="#desserts">Desserts</a></li>
              <li><a href="#quick-meals">Quick Meals</a></li>
              <li><a href="#healthy">Healthy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-column">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
                <span>123 Food Street, Culinary City</span>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                <span>recipefinds@gmail.com</span>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                <span>+977 9869295758</span>
              </div>
            </div>
            
            {/* Newsletter Subscription */}
            <div className="newsletter">
              <h4 className="newsletter-title">Stay Updated</h4>
              <p className="newsletter-text">Get the latest recipes delivered to your inbox</p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                />
                <button className="newsletter-btn">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <FontAwesomeIcon icon={faLeaf} className="leaf-icon" />
              <span>&copy; {currentYear} RecipeFinds. All rights reserved.</span>
            </div>
            
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;