import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPizzaSlice,
  faBowlFood,
  faLeaf,
  faDrumstickBite,
  faIceCream,
  faFire
} from '@fortawesome/free-solid-svg-icons';
import './CategoriesLoggedIn.css';

const CategoriesLoggedIn = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Italian', icon: faPizzaSlice, slug: 'italian' },
    { name: 'Asian', icon: faBowlFood, slug: 'asian' },
    { name: 'Vegan', icon: faLeaf, slug: 'vegan' },
    { name: 'Chicken', icon: faDrumstickBite, slug: 'chicken' },
    { name: 'Desserts', icon: faIceCream, slug: 'desserts' },
    { name: 'Quick Meals', icon: faFire, slug: 'quick-meals' }
  ];

  const handleCategoryClick = (categorySlug) => {
    navigate(`/category/${categorySlug}`);
  };

  return (
    <section className="categories-section">
      <div className="container">
        <div className="categories-header">
          <h2 className="categories-main-title">Browse Popular Categories</h2>
          <p className="categories-subtitle">Discover recipes by your favorite cuisine types and cooking styles</p>
        </div>
        
        <div className="categories-container">
          <div className="categories-grid">
            {categories.map((category) => (
              <div 
                key={category.slug}
                className="category-item"
                onClick={() => handleCategoryClick(category.slug)}
              >
                <FontAwesomeIcon icon={category.icon} className="category-icon" />
                <span className="category-name">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesLoggedIn;