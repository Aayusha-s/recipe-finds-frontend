// PopularRecipes.js with 3D effects
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faFire } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './PopularRecipes.css';

const PopularRecipes = () => {

  const navigate = useNavigate();

  const popularRecipes = [
    {
      id: 1,
      name: "French Sausage",
      likes: "1022",
      image: "/images/French Sausage.png"
    },
    {
      id: 2,
      name: "Italian Gnocchi",
      likes: "834", 
      image: "/images/Italian Gnocchi.png"
    },
    {
      id: 3,
      name: "Japanese Ramen Noodle",
      likes: "732",
      image: "/images/Japanese Ramen Noodle.png"
    },
    {
      id: 4,
      name: "Mexican Tacos",
      likes: "689",
      image: "/images/Mexican Tacos.png"
    }
  ];

  const handleRecipeClick = (recipeId) => {
navigate(`/recipe/${recipeId}`);
  };

  return (
    <section className="popular-recipes-section">
      {/* Animated Background */}
      <div className="floating-elements">
        <div className="floating-element el-1"></div>
        <div className="floating-element el-2"></div>
        <div className="floating-element el-3"></div>
      </div>
      
      <div className="container">
        <div className="popular-recipes-header">
          <div className="fire-container">
            <FontAwesomeIcon icon={faFire} className="popular-icon" />
            <div className="fire-glow"></div>
          </div>
          <h2 className="popular-recipes-title">Most Popular Food</h2>
        </div>
        
        <div className="popular-recipes-grid">
          {popularRecipes.map((recipe, index) => (
            <div 
              key={recipe.id} 
              className="recipe-card-3d"
              onClick={() => handleRecipeClick(recipe.id)}
              style={{ '--delay': index * 0.1 + 's' }}
            >
              <div className="recipe-image-container-3d">
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  className="recipe-image-3d"
                />
                <div className="image-overlay"></div>
              </div>
              <div className="recipe-info-3d">
                <h3 className="recipe-name-3d">{recipe.name}</h3>
                <div className="recipe-likes-3d">
                  <FontAwesomeIcon icon={faHeart} className="heart-icon-3d" />
                  <span>{recipe.likes}</span>
                </div>
              </div>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRecipes;