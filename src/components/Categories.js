import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPizzaSlice,
  faBowlFood,
  faLeaf,
  faDrumstickBite,
  faIceCream,
  faFire
} from '@fortawesome/free-solid-svg-icons';
import './Categories.css';

const Categories = () => {
  return (
    <section className="categories-section">
      <div className="container">
        <div className="categories-header">
          <h2 className="categories-main-title">Browse Popular Categories</h2>
          <p className="categories-subtitle">Discover recipes by your favorite cuisine types and cooking styles</p>
        </div>
        
        <div className="categories-container">
          <div className="categories-grid">
            <div className="category-item">
              <FontAwesomeIcon icon={faPizzaSlice} className="category-icon" />
              <span className="category-name">Italian</span>
            </div>
            <div className="category-item">
              <FontAwesomeIcon icon={faBowlFood} className="category-icon" />
              <span className="category-name">Asian</span>
            </div>
            <div className="category-item">
              <FontAwesomeIcon icon={faLeaf} className="category-icon" />
              <span className="category-name">Vegan</span>
            </div>
            <div className="category-item">
              <FontAwesomeIcon icon={faDrumstickBite} className="category-icon" />
              <span className="category-name">Chicken</span>
            </div>
            <div className="category-item">
              <FontAwesomeIcon icon={faIceCream} className="category-icon" />
              <span className="category-name">Desserts</span>
            </div>
            <div className="category-item">
              <FontAwesomeIcon icon={faFire} className="category-icon" />
              <span className="category-name">Quick Meals</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;