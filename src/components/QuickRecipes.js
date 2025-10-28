import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faFire, faStar, faUtensils } from '@fortawesome/free-solid-svg-icons';
import './QuickRecipes.css';
import { useNavigate } from 'react-router-dom';

const QuickRecipes = () => {
  const navigate = useNavigate(); 

  const quickRecipes = [
    {
      id: 1,
      name: "Quick Pasta",
      time: "15 mins",
      difficulty: "Easy",
      rating: "4.8",
      calories: "320",
      image: "/images/Quick Pasta.png",
      description: "Creamy garlic pasta with fresh herbs and parmesan cheese."
    },
    {
      id: 2,
      name: "Avocado Toast",
      time: "10 mins", 
      difficulty: "Very Easy",
      rating: "4.5",
      calories: "280",
      image: "/images/Avocado Toast.png",
      description: "Crispy toast topped with mashed avocado, cherry tomatoes, and spices."
    },
    {
      id: 3,
      name: "Chicken Salad",
      time: "20 mins",
      difficulty: "Medium",
      rating: "4.7",
      calories: "250",
      image: "/images/Chicken Salad.png",
      description: "Fresh greens with grilled chicken, nuts, and light dressing."
    },
    {
      id: 4,
      name: "Berry Smoothie",
      time: "5 mins",
      difficulty: "Very Easy",
      rating: "4.9",
      calories: "180",
      image: "/images/Berry Smoothie.png",
      description: "Mixed berry smoothie with yogurt and honey for quick energy."
    }
  ];

   const handleRecipeClick = (recipeId) => {
    // Navigate to recipe detail page
    navigate(`/recipe/${recipeId}`);
  };

  const handleViewAllClick = () => {
    // Navigate to explore page or quick recipes page
    navigate('/explore', { state: { filter: 'quick' } });
   
  };

  const handleCookNowClick = (recipeId, e) => {
    e.stopPropagation(); 
    // Navigate to recipe detail page
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <section className="quick-recipes-section">
      <div className="container">
        <div className="quick-recipes-header">
          <div className="header-content">
            <FontAwesomeIcon icon={faClock} className="clock-icon" />
            <h2 className="quick-recipes-title">Under 30 Minutes</h2>
            <button className="view-all-btn" onClick={handleViewAllClick}>
              View All
              <FontAwesomeIcon icon={faFire} className="btn-arrow" />
            </button>
          </div>
          <p className="quick-recipes-subtitle">Quick and delicious recipes for busy days</p>
        </div>
        
        <div className="quick-recipes-grid">
          {quickRecipes.map((recipe) => (
            <div key={recipe.id} className="quick-recipe-card" onClick={handleRecipeClick(recipe.id)}>
              <div className="card-front">
                <div className="recipe-image-container">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name}
                    className="recipe-image"
                  />
                  <div className="time-badge">
                    <FontAwesomeIcon icon={faClock} className="time-icon" />
                    <span>{recipe.time}</span>
                  </div>
                </div>
                <div className="recipe-basic-info">
                  <h3 className="recipe-name">{recipe.name}</h3>
                  <span className="difficulty">{recipe.difficulty}</span>
                </div>
              </div>
              
              <div className="card-back">
                <div className="recipe-details">
                  <h3 className="recipe-title">{recipe.name}</h3>
                  <p className="recipe-description">{recipe.description}</p>
                  
                  <div className="recipe-stats">
                    <div className="stat">
                      <FontAwesomeIcon icon={faStar} className="stat-icon" />
                      <span className="stat-value">{recipe.rating}</span>
                    </div>
                    <div className="stat">
                      <FontAwesomeIcon icon={faFire} className="stat-icon" />
                      <span className="stat-value">{recipe.calories} cal</span>
                    </div>
                    <div className="stat">
                      <FontAwesomeIcon icon={faUtensils} className="stat-icon" />
                      <span className="stat-value">{recipe.difficulty}</span>
                    </div>
                  </div>
                  
                  <button className="cook-now-btn" onClick={(e) => handleCookNowClick(recipe.id, e)}>
                    Start Cooking
                    <FontAwesomeIcon icon={faFire} className="btn-fire" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickRecipes;