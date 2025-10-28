import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Hero.css';

const Hero = () => {

  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/explore');
  };

  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          {/* <div className="hero-badge">
            Join Your Food Community
          </div> */}
          <h1 className="hero-title">
            Find Your Favorite<br />
            <span className="highlight">Food Recipe</span> in one click!
          </h1>
          <p className="hero-description">
            Discover new recipes from food lovers around the world.
            Save, share, and enjoy cooking your favourite meals effortlessly.
          </p>
          <button className="explore-btn" onClick={handleExploreClick}>
            <FontAwesomeIcon icon={faCompass} className="btn-icon" />
            Explore Now!
            <FontAwesomeIcon icon={faArrowRight} className="btn-arrow" />
          </button>
        </div>

        {/* Right Side - Circular Image with Floating Food Photos */}
        <div className="hero-image">
          <div className="circle-image-container">
            {/* Main Circular Image */}
            <div className="circle-image">
              <img 
                src="/images/hero-bg-3.png" 
                alt="Delicious Food"
                className="food-image"
              />
            </div>
            
            {/* Floating Food Photos */}
            <div className="floating-photo photo-1">
              <img 
                src="/images/arrow.png" 
                alt="image1"
                className="small-food-image"
              />
            </div>
            
            
            <div className="floating-photo photo-3">
              <img 
                src="/images/sushi.png" 
                alt="image3"
                className="small-food-image"
              />
            </div>
            
            <div className="floating-photo photo-4">
              <img 
                src="/images/food1.png" 
                alt="image4"
                className="small-food-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;