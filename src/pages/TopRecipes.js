import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFire, 
  faHeart, 
  faClock, 
  faStar, 
  faUtensils,
  faFilter,
  faArrowUpWideShort,
  faArrowDownWideShort
} from '@fortawesome/free-solid-svg-icons';
import './TopRecipes.css';

const TopRecipes = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('popularity');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const topRecipes = [
    {
      id: 1,
      name: "French Sausage",
      likes: "1022",
      rating: 4.9,
      cookTime: "45 mins",
      difficulty: "Medium",
      category: "meat",
      image: "/images/French Sausage.png",
      description: "Classic French sausage with herbs and spices",
      chef: "Chef Marie",
      chefAvatar: "https://i.pravatar.cc/150?img=32"
    },
    {
      id: 2,
      name: "Italian Gnocchi",
      likes: "834",
      rating: 4.8,
      cookTime: "30 mins",
      difficulty: "Easy",
      category: "pasta",
      image: "/images/Italian Gnocchi.png",
      description: "Homemade potato gnocchi with fresh tomato sauce",
      chef: "Chef Marco",
      chefAvatar: "https://i.pravatar.cc/150?img=12"
    },
    {
      id: 3,
      name: "Japanese Ramen Noodle",
      likes: "732",
      rating: 4.9,
      cookTime: "1 hour",
      difficulty: "Hard",
      category: "noodles",
      image: "/images/Japanese Ramen Noodle.png",
      description: "Authentic Japanese ramen with rich broth",
      chef: "Chef Yuki",
      chefAvatar: "https://i.pravatar.cc/150?img=45"
    },
    {
      id: 4,
      name: "Mexican Tacos",
      likes: "689",
      rating: 4.7,
      cookTime: "25 mins",
      difficulty: "Easy",
      category: "mexican",
      image: "/images/Mexican Tacos.png",
      description: "Spicy beef tacos with fresh salsa",
      chef: "Chef Carlos",
      chefAvatar: "https://i.pravatar.cc/150?img=23"
    },
    {
      id: 5,
      name: "Beef Wellington",
      likes: "567",
      rating: 4.9,
      cookTime: "2 hours",
      difficulty: "Hard",
      category: "meat",
      image: "/images/Beef Wellington.png",
      description: "Perfectly cooked beef wrapped in puff pastry",
      chef: "Chef Gordon",
      chefAvatar: "https://i.pravatar.cc/150?img=8"
    },
    {
      id: 6,
      name: "Mediterranean Salad",
      likes: "498",
      rating: 4.6,
      cookTime: "15 mins",
      difficulty: "Very Easy",
      category: "vegetarian",
      image: "/images/Mediterranean Salad.png",
      description: "Fresh Mediterranean salad with feta and olives",
      chef: "Chef Sophia",
      chefAvatar: "https://i.pravatar.cc/150?img=28"
    },
    {
      id: 7,
      name: "Thai Green Curry",
      likes: "423",
      rating: 4.7,
      cookTime: "35 mins",
      difficulty: "Medium",
      category: "asian",
      image: "/images/Thai Green Curry.png",
      description: "Spicy and aromatic Thai green curry",
      chef: "Chef Anong",
      chefAvatar: "https://i.pravatar.cc/150?img=41"
    },
    {
      id: 8,
      name: "Chocolate Lava Cake",
      likes: "389",
      rating: 4.8,
      cookTime: "40 mins",
      difficulty: "Medium",
      category: "dessert",
      image: "/images/Chocolate Lava Cake.png",
      description: "Decadent chocolate cake with molten center",
      chef: "Chef Pierre",
      chefAvatar: "https://i.pravatar.cc/150?img=19"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'meat', label: 'Meat' },
    { value: 'pasta', label: 'Pasta' },
    { value: 'noodles', label: 'Noodles' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'asian', label: 'Asian' },
    { value: 'dessert', label: 'Dessert' }
  ];

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular', icon: faFire },
    { value: 'rating', label: 'Highest Rated', icon: faStar },
    { value: 'likes', label: 'Most Likes', icon: faHeart },
    { value: 'time', label: 'Quickest', icon: faClock }
  ];

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const handleChefClick = (chefName, e) => {
    e.stopPropagation();
    navigate(`/chef/${chefName.toLowerCase().replace(' ', '-')}`);
  };

  const filteredAndSortedRecipes = topRecipes
    .filter(recipe => filterCategory === 'all' || recipe.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return parseInt(b.likes) - parseInt(a.likes);
        case 'rating':
          return b.rating - a.rating;
        case 'likes':
          return parseInt(b.likes) - parseInt(a.likes);
        case 'time':
          return parseInt(a.cookTime) - parseInt(b.cookTime);
        default:
          return 0;
      }
    });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'very easy':
        return '#4CAF50';
      case 'easy':
        return '#8BC34A';
      case 'medium':
        return '#FF9800';
      case 'hard':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon 
        key={index} 
        icon={faStar} 
        className={index < Math.floor(rating) ? "star filled" : "star"}
      />
    ));
  };

  return (
    <div className="top-recipes-page">
      {/* Header Section */}
      <section className="top-recipes-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <FontAwesomeIcon icon={faFire} className="badge-icon" />
            Community Favorites
          </div>
          <h1 className="hero-title">
            Top Rated <span className="highlight">Recipes</span>
          </h1>
          <p className="hero-subtitle">
            Discover the most loved and highly rated recipes from our community of food enthusiasts
          </p>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Recipes</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2M+</span>
            <span className="stat-label">Likes</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100K+</span>
            <span className="stat-label">Chefs</span>
          </div>
        </div>
      </section>

      {/* Filters and Sorting Section */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-header">
            <h2>Discover Amazing Recipes</h2>
            <p>Filter by category and sort by your preference</p>
          </div>
          
          <div className="filters-controls">
            {/* Category Filter */}
            <div className="filter-group">
              <label>Category</label>
              <select 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
                className="category-select"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="sort-group">
              <label>Sort By</label>
              <div className="sort-options">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    className={`sort-option ${sortBy === option.value ? 'active' : ''}`}
                    onClick={() => setSortBy(option.value)}
                  >
                    <FontAwesomeIcon icon={option.icon} />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button 
              className="mobile-filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FontAwesomeIcon icon={faFilter} />
              Filters
            </button>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="mobile-filters">
              <div className="mobile-filter-group">
                <h4>Category</h4>
                <div className="mobile-category-options">
                  {categories.map(category => (
                    <button
                      key={category.value}
                      className={`mobile-category-option ${filterCategory === category.value ? 'active' : ''}`}
                      onClick={() => setFilterCategory(category.value)}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recipes Grid Section */}
      <section className="recipes-grid-section">
        <div className="container">
          <div className="results-info">
            <h3>
              Showing {filteredAndSortedRecipes.length} recipes
              {filterCategory !== 'all' && ` in ${categories.find(c => c.value === filterCategory)?.label}`}
            </h3>
          </div>

          <div className="top-recipes-grid">
            {filteredAndSortedRecipes.map((recipe, index) => (
              <div 
                key={recipe.id} 
                className="top-recipe-card"
                onClick={() => handleRecipeClick(recipe.id)}
              >
                {/* Rank Badge */}
                <div className="rank-badge">
                  #{index + 1}
                </div>

                {/* Recipe Image */}
                <div className="recipe-image-container">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name}
                    className="recipe-image"
                  />
                  <div className="image-overlay"></div>
                  
                  {/* Quick Stats */}
                  <div className="quick-stats">
                    <div className="quick-stat">
                      <FontAwesomeIcon icon={faHeart} />
                      <span>{recipe.likes}</span>
                    </div>
                    <div className="quick-stat">
                      <FontAwesomeIcon icon={faStar} />
                      <span>{recipe.rating}</span>
                    </div>
                    <div className="quick-stat">
                      <FontAwesomeIcon icon={faClock} />
                      <span>{recipe.cookTime}</span>
                    </div>
                  </div>
                </div>

                {/* Recipe Info */}
                <div className="recipe-info">
                  <div className="recipe-header">
                    <h3 className="recipe-name">{recipe.name}</h3>
                    <div className="recipe-rating">
                      {renderStars(recipe.rating)}
                      <span className="rating-value">{recipe.rating}</span>
                    </div>
                  </div>
                  
                  <p className="recipe-description">{recipe.description}</p>
                  
                  <div className="recipe-meta">
                    <span 
                      className="difficulty-badge"
                      style={{ backgroundColor: getDifficultyColor(recipe.difficulty) }}
                    >
                      {recipe.difficulty}
                    </span>
                    <div className="cook-time">
                      <FontAwesomeIcon icon={faClock} />
                      {recipe.cookTime}
                    </div>
                  </div>

                  {/* Chef Info */}
                  <div 
                    className="chef-info"
                    onClick={(e) => handleChefClick(recipe.chef, e)}
                  >
                    <img 
                      src={recipe.chefAvatar} 
                      alt={recipe.chef}
                      className="chef-avatar"
                    />
                    <span className="chef-name">By {recipe.chef}</span>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="card-hover-effect"></div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAndSortedRecipes.length === 0 && (
            <div className="empty-state">
              <FontAwesomeIcon icon={faUtensils} className="empty-icon" />
              <h3>No recipes found</h3>
              <p>Try adjusting your filters to see more results</p>
              <button 
                className="reset-filters-btn"
                onClick={() => setFilterCategory('all')}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TopRecipes;