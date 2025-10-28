import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faHeart, faShare, faComment, faTrophy, faUpload } from '@fortawesome/free-solid-svg-icons';
import './Community.css';

const Community = () => {
  const communityFeatures = [
    {
      icon: faHeart,
      title: "Save Recipes",
      description: "Build your personal collection of favorite recipes"
    },
    {
      icon: faShare,
      title: "Share Creations",
      description: "Share your culinary masterpieces with the community"
    },
    {
      icon: faComment,
      title: "Get Feedback",
      description: "Receive tips and suggestions from fellow food lovers"
    },
    {
      icon: faTrophy,
      title: "Win Contests",
      description: "Participate in cooking challenges and win prizes"
    }
  ];

  const communityStats = [
    { number: "50K+", label: "Active Members" },
    { number: "100K+", label: "Recipes Shared" },
    { number: "1M+", label: "Likes Given" },
    { number: "10K+", label: "Success Stories" }
  ];

  return (
    <section className="community-section">
      <div className="container">
        <div className="community-content">
          {/* Left Side - Text Content */}
          <div className="community-text">
            <div className="community-badge">
              <FontAwesomeIcon icon={faUsers} className="community-icon" />
              Join Our Food Community
            </div>
            
            <h2 className="community-title">
              Connect with 
              <span className="highlight"> Food Lovers</span> 
              Worldwide
            </h2>
            
            <p className="community-description">
              Join thousands of passionate cooks sharing recipes, tips, and culinary experiences. 
              Be part of a supportive community that celebrates good food and great company.
            </p>

            {/* Community Features */}
            <div className="features-grid">
              {communityFeatures.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon-wrapper">
                    <FontAwesomeIcon icon={feature.icon} className="feature-icon" />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">{feature.title}</h4>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Community Stats */}
            <div className="stats-grid">
              {communityStats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="community-actions">
              <button className="join-now-btn">
                <FontAwesomeIcon icon={faUsers} className="btn-icon" />
                Join Community Now
              </button>
              <button className="share-recipe-btn">
                <FontAwesomeIcon icon={faUpload} className="btn-icon" />
                Share Your Recipe
              </button>
            </div>
          </div>

          {/* Right Side - Community Showcase */}
          <div className="community-showcase">
            <div className="showcase-container">
              {/* Main Community Image */}
              <div className="main-community-image">
                <img 
                  src="/images/community.png" 
                  alt="Food Community"
                  className="community-img"
                />
              </div>

              {/* Floating User Cards */}
              <div className="floating-user user-1">
                <div className="user-avatar">
                  <img src="/images/pfp1.png" alt="User 1" />
                </div>
                <div className="user-info">
                  <span className="user-name">Sarah M.</span>
                  <span className="user-action">Shared a recipe</span>
                </div>
              </div>

              <div className="floating-user user-2">
                <div className="user-avatar">
                  <img src="/images/pfp2.png" alt="User 2" />
                </div>
                <div className="user-info">
                  <span className="user-name">Mikasa T.</span>
                  <span className="user-action">Won cooking contest</span>
                </div>
              </div>

              <div className="floating-user user-3">
                <div className="user-avatar">
                  <img src="/images/pfp3.png" alt="User 3" />
                </div>
                <div className="user-info">
                  <span className="user-name">Emma L.</span>
                  <span className="user-action">Got 500 likes</span>
                </div>
              </div>

              <div className="floating-user user-4">
                <div className="user-avatar">
                  <img src="/images/pfp4.png" alt="User 4" />
                </div>
                <div className="user-info">
                  <span className="user-name">Alexa K.</span>
                  <span className="user-action">New member</span>
                </div>
              </div>

              {/* Animated Elements */}
              <div className="floating-heart"></div>
              <div className="floating-star"></div>
              <div className="floating-food"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;