import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFilter, 
  faHeart,
  faClock,
  faFire,
  faSpinner,
  faTimes,
  faUser,
  faSignOutAlt,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import './ExploreLoggedIn.css';

// Recipe data
const ALL_RECIPES = [
  {
    id: 1,
    title: "Creamy Garlic Pasta with Fresh Herbs",
    description: "A delicious and easy-to-make pasta with fresh herbs and parmesan cheese that everyone will love.",
    image: "/images/Creamy Garlic Pasta with Fresh Herbs.png",
    type: 'portrait',
    cookingTime: 25,
    difficulty: "Easy",
    likes: 1247,
    user: { name: "Chef Maria", avatar: "https://i.pravatar.cc/150?img=32" },
    cuisine: "Italian",
    dietary: ["Vegetarian"],
    mealType: "Dinner",
    mainIngredient: "Pasta",
    occasion: "Family Friendly",
    cookingMethod: "Boiled",
    allergens: ["Dairy"]
  },
  {
    id: 2,
    title: "Avocado Toast with Cherry Tomatoes", 
    description: "Perfect for breakfast or a quick snack. Healthy and tasty with cherry tomatoes and microgreens.",
    image: "/images/Avocado Toast with Cherry Tomatoes.png",
    type: 'square',
    cookingTime: 10,
    difficulty: "Easy",
    likes: 892,
    user: { name: "Chef Alex", avatar: "https://i.pravatar.cc/150?img=45" },
    cuisine: "American",
    dietary: ["Vegan", "Gluten-Free"],
    mealType: "Breakfast",
    mainIngredient: "Vegetables",
    occasion: "Quick & Easy",
    cookingMethod: "Raw",
    allergens: []
  },
  {
    id: 3,
    title: "Berry Smoothie Bowl with Granola",
    description: "Healthy and refreshing smoothie bowl topped with granola and fresh berries.",
    image: "/images/Berry Smoothie Bowl with Granola.png", 
    type: 'landscape',
    cookingTime: 5,
    difficulty: "Easy",
    likes: 1563,
    user: { name: "Chef Sarah", avatar: "https://i.pravatar.cc/150?img=28" },
    cuisine: "American",
    dietary: ["Vegetarian", "Gluten-Free"],
    mealType: "Breakfast",
    mainIngredient: "Fruits",
    occasion: "Healthy",
    cookingMethod: "Raw",
    allergens: ["Nuts"]
  }
];

const ExploreLogged = () => {
  const [displayRecipes, setDisplayRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Filter states
  const [filters, setFilters] = useState({
    cuisine: [],
    dietary: [],
    mealType: [],
    mainIngredient: [],
    occasion: [],
    cookingMethod: [],
    allergens: [],
    cookingTime: [],
    difficulty: []
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    navigate('/');
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const handleChefClick = (chefName, e) => {
    e.stopPropagation();
    navigate(`/chef/${chefName.toLowerCase().replace(' ', '-')}`);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    // Add like functionality here
  };

  // Filter functions
  const handleFilterChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      cuisine: [],
      dietary: [],
      mealType: [],
      mainIngredient: [],
      occasion: [],
      cookingMethod: [],
      allergens: [],
      cookingTime: [],
      difficulty: []
    });
    setSearchQuery('');
    setIsFiltered(false);
    setDisplayRecipes(ALL_RECIPES);
  };

  // Apply filters
  const applyFilters = () => {
    setShowFilters(false);
    
    if (Object.values(filters).every(filterArray => filterArray.length === 0) && !searchQuery) {
      setIsFiltered(false);
      setDisplayRecipes(ALL_RECIPES);
      return;
    }

    setIsFiltered(true);
    setLoading(true);

    setTimeout(() => {
      let results = [...ALL_RECIPES];

      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        results = results.filter(recipe => 
          recipe.title.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.user.name.toLowerCase().includes(query)
        );
      }

      // Apply filters (simplified for example)
      if (filters.cuisine.length > 0) {
        results = results.filter(recipe => 
          filters.cuisine.includes(recipe.cuisine)
        );
      }

      if (filters.dietary.length > 0) {
        results = results.filter(recipe =>
          filters.dietary.some(diet => recipe.dietary.includes(diet))
        );
      }

      setDisplayRecipes(results);
      setLoading(false);
    }, 500);
  };

  const handleSearch = () => {
    applyFilters();
  };

  // Load all recipes on component mount
  useEffect(() => {
    setDisplayRecipes(ALL_RECIPES);
  }, []);

  return (
    <div className="explore-logged-page">
      {/* Custom Header for Logged-in Users */}
      <header className="explore-logged-header">
        <div className="explore-logged-nav-container">
          {/* Logo */}
          <div className="explore-logged-logo">
            <img src="/images/RecipeFindsLogo.png" alt='RecipeFinds Logo' className='explore-logo-image' />
          </div>
          
          {/* Navigation */}
          <ul className="explore-logged-nav-menu">
            <li className="explore-logged-nav-item">
              <span className="explore-logged-nav-link explore-logged-nav-link-active">Explore</span>
            </li>
            <li className="explore-logged-nav-item">
              <span className="explore-logged-nav-link">Top Recipes</span>
            </li>
            <li className="explore-logged-nav-item">
              <span className="explore-logged-nav-link">Community</span>
            </li>
          </ul>
          
          {/* Search Bar */}
          <div className="explore-logged-search-section">
            <div className="explore-logged-search-container">
              <div className="explore-search-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Search recipes, ingredients, or chefs..." 
                  className="explore-logged-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                  className="explore-filter-toggle-btn"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FontAwesomeIcon icon={faFilter} />
                  <span className="explore-filter-btn-text">Filters</span>
                </button>
              </div>
              <button className="explore-logged-search-button" onClick={handleSearch}> 
                <FontAwesomeIcon icon={faSearch} className="explore-logged-search-icon" />
                <span className="explore-logged-search-btn-text">Search</span>
              </button>
            </div>
          </div>

          {/* User Avatar with Dropdown */}
          <div className="explore-logged-user-menu" ref={dropdownRef}>
            <div className="explore-logged-user-avatar-container" onClick={toggleDropdown}>
              <img 
                src={user?.avatar || '/images/default-avatar.png'} 
                alt={user?.name || 'User'} 
                className="explore-logged-user-avatar"
              />
              <span className="explore-logged-user-name">{user?.name || 'User'}</span>
            </div>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="explore-logged-dropdown-menu">
                <div className="explore-logged-dropdown-header">
                  <img 
                    src={user?.avatar || '/images/default-avatar.png'} 
                    alt={user?.name || 'User'} 
                    className="explore-logged-dropdown-avatar"
                  />
                  <div className="explore-logged-user-info">
                    <div className="explore-logged-user-display-name">{user?.name || 'User'}</div>
                    <div className="explore-logged-user-email">{user?.email || 'user@example.com'}</div>
                  </div>
                </div>
                
                <div className="explore-logged-dropdown-divider"></div>
                
                <button className="explore-logged-dropdown-item" onClick={handleProfileClick}>
                  <FontAwesomeIcon icon={faUser} className="explore-logged-dropdown-icon" />
                  <span>My Profile</span>
                </button>
                
                <button className="explore-logged-dropdown-item">
                  <FontAwesomeIcon icon={faCog} className="explore-logged-dropdown-icon" />
                  <span>Settings</span>
                </button>
                
                <div className="explore-logged-dropdown-divider"></div>
                
                <button className="explore-logged-dropdown-item explore-logged-logout-item" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="explore-logged-dropdown-icon" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filters Dropdown */}
        {showFilters && (
          <div className="explore-logged-filters-dropdown">
            <div className="explore-logged-filters-header">
              <h3>Filter Recipes</h3>
              <button className="explore-logged-clear-filters-btn" onClick={clearAllFilters}>
                Clear All
              </button>
            </div>
            
            <div className="explore-logged-filters-grid">
              <div className="explore-logged-filter-category">
                <h4>Cuisine</h4>
                <div className="explore-logged-filter-options">
                  {["Italian", "Asian", "Mexican", "Mediterranean", "American"].map(cuisine => (
                    <label key={cuisine}>
                      <input 
                        type="checkbox" 
                        checked={filters.cuisine.includes(cuisine)}
                        onChange={() => handleFilterChange('cuisine', cuisine)}
                      /> 
                      {cuisine}
                    </label>
                  ))}
                </div>
              </div>

              <div className="explore-logged-filter-category">
                <h4>Dietary</h4>
                <div className="explore-logged-filter-options">
                  {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"].map(diet => (
                    <label key={diet}>
                      <input 
                        type="checkbox" 
                        checked={filters.dietary.includes(diet)}
                        onChange={() => handleFilterChange('dietary', diet)}
                      /> 
                      {diet}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="explore-logged-filter-actions">
              <button className="explore-logged-apply-filters-btn" onClick={applyFilters}>
                Apply Filters ({Object.values(filters).flat().length} selected)
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="explore-logged-main">
        <div className="explore-logged-container">
          {/* Active Filters Display */}
          {(isFiltered || Object.values(filters).flat().length > 0 || searchQuery) && (
            <div className="explore-logged-active-filters">
              <span>Active filters: </span>
              {searchQuery && (
                <span className="explore-logged-active-filter-tag">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="explore-logged-remove-filter">
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </span>
              )}
              {Object.entries(filters).map(([category, values]) =>
                values.map(value => (
                  <span key={`${category}-${value}`} className="explore-logged-active-filter-tag">
                    {value}
                    <button 
                      onClick={() => handleFilterChange(category, value)}
                      className="explore-logged-remove-filter"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </span>
                ))
              )}
              <button className="explore-logged-clear-all-filters" onClick={clearAllFilters}>
                Clear All
              </button>
            </div>
          )}

          {/* Results Count */}
          {isFiltered && (
            <div className="explore-logged-results-count">
              Found {displayRecipes.length} recipe{displayRecipes.length !== 1 ? 's' : ''} 
              {searchQuery && ` for "${searchQuery}"`}
            </div>
          )}

          {/* Masonry Grid */}
          <div className="explore-logged-masonry-grid">
            {displayRecipes.map(recipe => (
              <div 
                key={recipe.id} 
                className={`explore-logged-masonry-item ${recipe.type}`}
                onClick={() => handleRecipeClick(recipe.id)}
              >
                <div className="explore-logged-recipe-card">
                  <div className="explore-logged-recipe-image-container">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="explore-logged-recipe-image"
                    />
                    <div className="explore-logged-recipe-overlay">
                      <button className="explore-logged-save-btn" onClick={handleLikeClick}>
                        <FontAwesomeIcon icon={faHeart} className="explore-logged-save-icon" />
                      </button>
                      <div className="explore-logged-recipe-time">
                        <FontAwesomeIcon icon={faClock} className="explore-logged-time-icon" />
                        {recipe.cookingTime}min
                      </div>
                    </div>
                  </div>
                  
                  <div className="explore-logged-recipe-info">
                    <h3 className="explore-logged-recipe-title">{recipe.title}</h3>
                    <p className="explore-logged-recipe-description">{recipe.description}</p>
                    <div className="explore-logged-recipe-meta">
                      <div 
                        className="explore-logged-user-info"
                        onClick={(e) => handleChefClick(recipe.user.name, e)}
                      >
                        <img 
                          src={recipe.user.avatar} 
                          alt={recipe.user.name}
                          className="explore-logged-user-avatar-small"
                        />
                        <span className="explore-logged-user-name-small">{recipe.user.name}</span>
                      </div>
                      <div className="explore-logged-recipe-stats">
                        <span className="explore-logged-likes">
                          <FontAwesomeIcon icon={faHeart} className="explore-logged-like-icon" />
                          {recipe.likes}
                        </span>
                        <span className="explore-logged-difficulty">
                          <FontAwesomeIcon icon={faFire} className="explore-logged-difficulty-icon" />
                          {recipe.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="explore-logged-loading-indicator">
              <FontAwesomeIcon icon={faSpinner} className="explore-logged-loading-spinner" spin />
              <p>Searching recipes...</p>
            </div>
          )}

          {/* No Results Message */}
          {isFiltered && displayRecipes.length === 0 && !loading && (
            <div className="explore-logged-no-results">
              <h3>No recipes found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button className="explore-logged-clear-all-filters" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExploreLogged;