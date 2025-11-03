// Explore.js - WITH NAVIGATION LINKS ADDED
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { 
  faSearch, 
  faUserPlus, 
  faFilter, 
  faHeart,
  faClock,
  faFire,
  faSpinner,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import './Explore.css';

// Move recipe data outside component so it doesn't reset - ADD MORE RECIPES
const ALL_RECIPES = [
  {
    id: 1,
    title: "Creamy Garlic Pasta with Fresh Herbs",
    description: "A delicious and easy-to-make pasta with fresh herbs and parmesan cheese that everyone will love. Perfect for family dinners or special occasions.",
    image: "/images/Creamy Garlic Pasta with Fresh Herbs.png",
    width: 320,
    height: 450,
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
    description: "Perfect for breakfast or a quick snack. Healthy and tasty with cherry tomatoes and microgreens. Ready in just 10 minutes!",
    image: "/images/Avocado Toast with Cherry Tomatoes.png",
    width: 350,
    height: 350,
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
    description: "Healthy and refreshing smoothie bowl topped with granola and fresh berries for a perfect start to your day. Packed with antioxidants.",
    image: "/images/Berry Smoothie Bowl with Granola.png", 
    width: 400,
    height: 280,
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
  },
  {
    id: 4,
    title: "Chicken Teriyaki with Steamed Rice",
    description: "Japanese-inspired chicken teriyaki with perfectly steamed rice and vegetables. A restaurant-quality meal you can make at home.",
    image: "/images/Chicken Teriyaki with Steamed Rice.png",
    width: 280,
    height: 500,
    type: 'ultra-portrait',
    cookingTime: 35,
    difficulty: "Medium",
    likes: 2105,
    user: { name: "Chef Kenji", avatar: "https://i.pravatar.cc/150?img=12" },
    cuisine: "Japanese",
    dietary: [],
    mealType: "Dinner",
    mainIngredient: "Chicken",
    occasion: "Date Night",
    cookingMethod: "Grilled",
    allergens: ["Soy"]
  },
  {
    id: 5,
    title: "Decadent Chocolate Brownies",
    description: "Rich, fudgy chocolate brownies with walnuts. The perfect dessert for chocolate lovers. So good they'll disappear in minutes!",
    image: "/images/Decadent Chocolate Brownies.png",
    width: 420,
    height: 260,
    type: 'ultra-landscape',
    cookingTime: 45,
    difficulty: "Medium",
    likes: 3120,
    user: { name: "Chef Emma", avatar: "https://i.pravatar.cc/150?img=8" },
    cuisine: "American",
    dietary: ["Vegetarian"],
    mealType: "Dessert",
    mainIngredient: "Chocolate",
    occasion: "Comfort Food",
    cookingMethod: "Baked",
    allergens: ["Nuts", "Dairy", "Eggs"]
  },
  {
    id: 6,
    title: "Fresh Greek Salad with Feta",
    description: "Crisp vegetables, tangy feta cheese, and kalamata olives in a light olive oil dressing. A refreshing Mediterranean classic.",
    image: "/images/Fresh Greek Salad with Feta.png",
    width: 380,
    height: 300,
    type: 'landscape',
    cookingTime: 15,
    difficulty: "Easy",
    likes: 987,
    user: { name: "Chef Sophia", avatar: "https://i.pravatar.cc/150?img=51" },
    cuisine: "Mediterranean",
    dietary: ["Vegetarian"],
    mealType: "Lunch",
    mainIngredient: "Vegetables",
    occasion: "Healthy",
    cookingMethod: "Raw",
    allergens: ["Dairy"]
  },
  {
    id: 7,
    title: "Spicy Beef Tacos with Salsa",
    description: "Flavorful beef tacos with homemade salsa and guacamole. Perfect for Taco Tuesday or any day you're craving Mexican food.",
    image: "/images/Spicy Beef Tacos with Salsa.png",
    width: 330,
    height: 480,
    type: 'portrait',
    cookingTime: 30,
    difficulty: "Medium",
    likes: 1789,
    user: { name: "Chef Carlos", avatar: "https://i.pravatar.cc/150?img=23" },
    cuisine: "Mexican",
    dietary: [],
    mealType: "Dinner",
    mainIngredient: "Beef",
    occasion: "Party",
    cookingMethod: "Fried",
    allergens: ["Dairy"]
  },
  {
    id: 8,
    title: "Creamy Mushroom Risotto",
    description: "Rich and creamy risotto with wild mushrooms and parmesan. A comforting Italian dish that's worth the stirring effort.",
    image: "/images/Creamy Mushroom Risotto.png",
    width: 360,
    height: 320,
    type: 'square',
    cookingTime: 40,
    difficulty: "Hard",
    likes: 1423,
    user: { name: "Chef Marco", avatar: "https://i.pravatar.cc/150?img=17" },
    cuisine: "Italian",
    dietary: ["Vegetarian"],
    mealType: "Dinner",
    mainIngredient: "Rice",
    occasion: "Date Night",
    cookingMethod: "Slow Cooked",
    allergens: ["Dairy"]
  },
  {
    id: 9,
    title: "Fluffy Banana Pancakes",
    description: "Light and fluffy pancakes with ripe bananas and maple syrup. The perfect weekend breakfast that everyone will love.",
    image: "/images/Fluffy Banana Pancakes.png",
    width: 400,
    height: 280,
    type: 'landscape',
    cookingTime: 20,
    difficulty: "Easy",
    likes: 2341,
    user: { name: "Chef Lily", avatar: "https://i.pravatar.cc/150?img=36" },
    cuisine: "American",
    dietary: ["Vegetarian"],
    mealType: "Breakfast",
    mainIngredient: "Fruits",
    occasion: "Family Friendly",
    cookingMethod: "Fried",
    allergens: ["Dairy", "Eggs"]
  },
  {
    id: 10,
    title: "Classic Caprese Salad",
    description: "Simple yet elegant salad with fresh mozzarella, tomatoes, and basil. A taste of summer in every bite.",
    image: "/images/Classic Caprese Salad.png",
    width: 320,
    height: 450,
    type: 'portrait',
    cookingTime: 10,
    difficulty: "Easy",
    likes: 765,
    user: { name: "Chef Giovanni", avatar: "https://i.pravatar.cc/150?img=41" },
    cuisine: "Italian",
    dietary: ["Vegetarian"],
    mealType: "Appetizer",
    mainIngredient: "Cheese",
    occasion: "Quick & Easy",
    cookingMethod: "Raw",
    allergens: ["Dairy"]
  },
  {
    id: 11,
    title: "Crispy Fish Tacos with Lime",
    description: "Beer-battered fish tacos with cabbage slaw and lime crema. Crispy, fresh, and absolutely delicious.",
    image: "/images/Crispy Fish Tacos with Lime.png",
    width: 380,
    height: 280,
    type: 'landscape',
    cookingTime: 25,
    difficulty: "Medium",
    likes: 1987,
    user: { name: "Chef Miguel", avatar: "https://i.pravatar.cc/150?img=19" },
    cuisine: "Mexican",
    dietary: [],
    mealType: "Dinner",
    mainIngredient: "Seafood",
    occasion: "Party",
    cookingMethod: "Fried",
    allergens: []
  },
  {
    id: 12,
    title: "Spicy Vegetable Curry",
    description: "Hearty vegetable curry with coconut milk and aromatic spices. Vegan-friendly and packed with flavor.",
    image: "/images/Spicy Vegetable Curry.png",
    width: 350,
    height: 350,
    type: 'square',
    cookingTime: 35,
    difficulty: "Medium",
    likes: 1324,
    user: { name: "Chef Priya", avatar: "https://i.pravatar.cc/150?img=44" },
    cuisine: "Indian",
    dietary: ["Vegan", "Gluten-Free"],
    mealType: "Dinner",
    mainIngredient: "Vegetables",
    occasion: "Healthy",
    cookingMethod: "Steamed",
    allergens: []
  },
  {
    id: 13,
    title: "Homemade Margherita Pizza",
    description: "Classic Italian pizza with fresh tomatoes, mozzarella, and basil on a crispy thin crust.",
    image: "/images/Homemade Margherita Pizza.png",
    width: 400,
    height: 300,
    type: 'landscape',
    cookingTime: 30,
    difficulty: "Medium",
    likes: 2876,
    user: { name: "Chef Antonio", avatar: "https://i.pravatar.cc/150?img=5" },
    cuisine: "Italian",
    dietary: ["Vegetarian"],
    mealType: "Dinner",
    mainIngredient: "Cheese",
    occasion: "Family Friendly",
    cookingMethod: "Baked",
    allergens: ["Dairy"]
  },
  {
    id: 14,
    title: "Berry Cheesecake",
    description: "Creamy cheesecake with a graham cracker crust topped with fresh mixed berries.",
    image: "/images/Berry Cheesecake.png",
    width: 320,
    height: 480,
    type: 'portrait',
    cookingTime: 60,
    difficulty: "Hard",
    likes: 3452,
    user: { name: "Chef Isabella", avatar: "https://i.pravatar.cc/150?img=9" },
    cuisine: "American",
    dietary: ["Vegetarian"],
    mealType: "Dessert",
    mainIngredient: "Cheese",
    occasion: "Party",
    cookingMethod: "Baked",
    allergens: ["Dairy", "Eggs"]
  },
  {
    id: 15,
    title: "Grilled Salmon with Asparagus",
    description: "Perfectly grilled salmon fillet with roasted asparagus and lemon butter sauce.",
    image: "/images/Grilled Salmon with Asparagus.png",
    width: 380,
    height: 320,
    type: 'square',
    cookingTime: 25,
    difficulty: "Easy",
    likes: 1890,
    user: { name: "Chef Nathan", avatar: "https://i.pravatar.cc/150?img=15" },
    cuisine: "American",
    dietary: ["Gluten-Free"],
    mealType: "Dinner",
    mainIngredient: "Seafood",
    occasion: "Date Night",
    cookingMethod: "Grilled",
    allergens: []
  }
];

const Explore = () => {
  const [displayRecipes, setDisplayRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Add active nav link tracking
  const currentPath = location.pathname;

   const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const handleChefClick = (chefName, e) => {
    e.stopPropagation(); // Prevent triggering recipe click
    navigate(`/chef/${chefName.toLowerCase().replace(' ', '-')}`);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation(); // Prevent triggering recipe click
    navigate('/signup');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };


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

  // Handle filter changes
  const handleFilterChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  // Clear all filters
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
    setDisplayRecipes([]);
    setPage(1);
    setHasMore(true);
    // Reload initial recipes
    loadRecipes(1, true);
  };

  // Apply filters
  const applyFilters = () => {
    setShowFilters(false);
    
    // If no filters are selected and no search query, show all recipes with infinite scroll
    if (Object.values(filters).every(filterArray => filterArray.length === 0) && !searchQuery) {
      setIsFiltered(false);
      setDisplayRecipes([]);
      setPage(1);
      setHasMore(true);
      loadRecipes(1, true);
      return;
    }

    setIsFiltered(true);
    setLoading(true);

    // Simulate API delay for better UX
    setTimeout(() => {
      let results = [...ALL_RECIPES];

      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        results = results.filter(recipe => 
          recipe.title.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.user.name.toLowerCase().includes(query) ||
          (recipe.dietary && recipe.dietary.some(diet => diet.toLowerCase().includes(query))) ||
          recipe.cuisine.toLowerCase().includes(query)
        );
      }

      // Apply category filters
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

      if (filters.mealType.length > 0) {
        results = results.filter(recipe =>
          filters.mealType.includes(recipe.mealType)
        );
      }

      if (filters.mainIngredient.length > 0) {
        results = results.filter(recipe =>
          filters.mainIngredient.includes(recipe.mainIngredient)
        );
      }

      if (filters.occasion.length > 0) {
        results = results.filter(recipe =>
          filters.occasion.includes(recipe.occasion)
        );
      }

      if (filters.cookingMethod.length > 0) {
        results = results.filter(recipe =>
          filters.cookingMethod.includes(recipe.cookingMethod)
        );
      }

      if (filters.allergens.length > 0) {
        results = results.filter(recipe =>
          !filters.allergens.some(allergen => 
            recipe.allergens.includes(allergen.replace('-Free', ''))
          )
        );
      }

      if (filters.cookingTime.length > 0) {
        results = results.filter(recipe => {
          if (filters.cookingTime.includes("Under 30 min") && recipe.cookingTime < 30) return true;
          if (filters.cookingTime.includes("30-60 min") && recipe.cookingTime >= 30 && recipe.cookingTime <= 60) return true;
          if (filters.cookingTime.includes("Over 60 min") && recipe.cookingTime > 60) return true;
          return false;
        });
      }

      if (filters.difficulty.length > 0) {
        results = results.filter(recipe =>
          filters.difficulty.includes(recipe.difficulty)
        );
      }

      setDisplayRecipes(results);
      setLoading(false);
    }, 500);
  };

  // Get recipes for infinite scroll - LOAD MORE RECIPES PER PAGE
  const getRecipesForPage = (pageNum, limit = 12) => { // Increased from 8 to 12
    const startIndex = (pageNum - 1) * limit;
    const endIndex = startIndex + limit;
    
    // If we've reached the end of our recipe list
    if (startIndex >= ALL_RECIPES.length) {
      return [];
    }
    
    return ALL_RECIPES.slice(startIndex, endIndex);
  };

  // Load recipes for infinite scroll
  const loadRecipes = async (pageNum = page, reset = false) => {
    if (loading || !hasMore || isFiltered) return;
    
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newRecipes = getRecipesForPage(pageNum);
      
      if (newRecipes.length === 0) {
        // No more recipes to load
        setHasMore(false);
        setLoading(false);
        return;
      }
      
      if (reset) {
        setDisplayRecipes(newRecipes);
      } else {
        setDisplayRecipes(prev => [...prev, ...newRecipes]);
      }
      
      setPage(pageNum + 1);
      setLoading(false);
      
      // Check if we've loaded all recipes
      if ((pageNum * 12) >= ALL_RECIPES.length) {
        setHasMore(false);
      }
    }, 800);
  };

  // Handle search
  const handleSearch = () => {
    applyFilters();
  };

  // Initial load - LOAD MORE INITIALLY
  useEffect(() => {
    loadRecipes(1, true);
  }, []);

  // Infinite scroll (only for non-filtered state)
  useEffect(() => {
    if (isFiltered) return;

    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;

      // Load more when 500px from bottom
      if (scrollTop + windowHeight >= documentHeight - 500) {
        loadRecipes();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, isFiltered]);

  return (
    <div className="explore-page">
      <header className="explore-header">
        <div className="explore-nav-container">
          <div className="explore-logo">
            <Link to="/">
              <img src='/images/RecipeFindsLogo.png' alt='RecipeFinds Logo' className='logo-image' />
            </Link>
          </div>
          
          {/* ADDED NAVIGATION LINKS */}
          <ul className="explore-nav-menu">
            <li className="explore-nav-item">
              {/* <Link 
                to="/" 
                className={`explore-nav-link ${currentPath === '/' ? 'explore-nav-link-active' : ''}`}
              >
                Home
              </Link> */}
            </li>
            <li className="explore-nav-item">
              <Link 
                to="/explore" 
                className={`explore-nav-link ${currentPath === '/explore' ? 'explore-nav-link-active' : ''}`}
              >
                Explore
              </Link>
            </li>
            <li className="explore-nav-item">
              <Link 
                to="/top-recipes" 
                className={`explore-nav-link ${currentPath === '/top-recipes' ? 'explore-nav-link-active' : ''}`}
              >
                Top Recipes
              </Link>
            </li>
            <li className="explore-nav-item">
              <Link 
                to="/community" 
                className={`explore-nav-link ${currentPath === '/community' ? 'explore-nav-link-active' : ''}`}
              >
                Community
              </Link>
            </li>
          </ul>
          
          <div className="explore-search-section">
            <div className="explore-search-container">
              <div className="search-input-wrapper">
                {/* <FontAwesomeIcon icon={faSearch} className="search-icon-left" /> */}
                <input 
                  type="text" 
                  placeholder="Search recipes, ingredients, or chefs..." 
                  className="explore-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                  className="filter-toggle-btn"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FontAwesomeIcon icon={faFilter} />
                  <span className="filter-btn-text">Filters</span>
                </button>
              </div>
              <button className="explore-search-button" onClick={handleSearch}> 
                <FontAwesomeIcon icon={faSearch} className="explore-search-icon" />
                <span className="explore-search-btn-text">Search</span>
              </button>
            </div>

            {showFilters && (
              <div className="filters-dropdown">
                <div className="filters-header">
                  <h3>Filter Recipes</h3>
                  <button className="clear-filters-btn" onClick={clearAllFilters}>
                    Clear All
                  </button>
                </div>
                
                 <div className="filters-grid">
               {/* 1. Cuisine Type */}
                  <div className="filter-category">
                    <h4>Cuisine</h4>
                    <div className="filter-options">
                      {["Italian", "Asian", "Mexican", "Mediterranean", "American", "Indian", "Japanese", "Thai"].map(cuisine => (
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

                  {/* 2. Dietary Preferences */}
                  <div className="filter-category">
                    <h4>Dietary</h4>
                    <div className="filter-options">
                      {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Low-Carb", "Paleo"].map(diet => (
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

                  {/* 3. Meal Type */}
                  <div className="filter-category">
                    <h4>Meal Type</h4>
                    <div className="filter-options">
                      {["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Appetizer"].map(meal => (
                        <label key={meal}>
                          <input 
                            type="checkbox" 
                            checked={filters.mealType.includes(meal)}
                            onChange={() => handleFilterChange('mealType', meal)}
                          /> 
                          {meal}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 4. Main Ingredients */}
                  <div className="filter-category">
                    <h4>Main Ingredient</h4>
                    <div className="filter-options">
                      {["Chicken", "Beef", "Seafood", "Pasta", "Rice", "Vegetables", "Chocolate", "Cheese", "Fruits"].map(ingredient => (
                        <label key={ingredient}>
                          <input 
                            type="checkbox" 
                            checked={filters.mainIngredient.includes(ingredient)}
                            onChange={() => handleFilterChange('mainIngredient', ingredient)}
                          /> 
                          {ingredient}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 5. Seasonal & Occasion */}
                  <div className="filter-category">
                    <h4>Occasion</h4>
                    <div className="filter-options">
                      {["Quick & Easy", "Family Friendly", "Date Night", "Party", "Healthy", "Comfort Food", "Seasonal"].map(occasion => (
                        <label key={occasion}>
                          <input 
                            type="checkbox" 
                            checked={filters.occasion.includes(occasion)}
                            onChange={() => handleFilterChange('occasion', occasion)}
                          /> 
                          {occasion}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 6. Cooking Method */}
                  <div className="filter-category">
                    <h4>Cooking Method</h4>
                    <div className="filter-options">
                      {["Baked", "Grilled", "Fried", "Steamed", "Raw", "Slow Cooked", "Boiled"].map(method => (
                        <label key={method}>
                          <input 
                            type="checkbox" 
                            checked={filters.cookingMethod.includes(method)}
                            onChange={() => handleFilterChange('cookingMethod', method)}
                          /> 
                          {method}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 7. Allergens */}
                  <div className="filter-category">
                    <h4>Allergen-Free</h4>
                    <div className="filter-options">
                      {["Nut-Free", "Egg-Free", "Soy-Free", "Shellfish-Free", "Dairy-Free"].map(allergen => (
                        <label key={allergen}>
                          <input 
                            type="checkbox" 
                            checked={filters.allergens.includes(allergen)}
                            onChange={() => handleFilterChange('allergens', allergen)}
                          /> 
                          {allergen}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Original Filters */}
                  <div className="filter-category">
                    <h4>Cooking Time</h4>
                    <div className="filter-options">
                      {["Under 30 min", "30-60 min", "Over 60 min"].map(time => (
                        <label key={time}>
                          <input 
                            type="checkbox" 
                            checked={filters.cookingTime.includes(time)}
                            onChange={() => handleFilterChange('cookingTime', time)}
                          /> 
                          {time}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="filter-category">
                    <h4>Difficulty</h4>
                    <div className="filter-options">
                      {["Easy", "Medium", "Hard"].map(difficulty => (
                        <label key={difficulty}>
                          <input 
                            type="checkbox" 
                            checked={filters.difficulty.includes(difficulty)}
                            onChange={() => handleFilterChange('difficulty', difficulty)}
                          /> 
                          {difficulty}
                        </label>
                      ))}
                    </div>
                  </div>
                  </div>
                  

                <div className="filter-actions">
                  <button className="apply-filters-btn" onClick={applyFilters}>
                    Apply Filters ({Object.values(filters).flat().length} selected)
                  </button>
                </div>
              </div>
            )}
          </div>

            {isAuthenticated ? (
            <div className="user-info-header">
              <img src={user.avatar} alt={user.name} className="user-avatar-small" />
              <span className="user-name-header">{user.name}</span>
            </div>
          ) : (
            <button 
              className="explore-signup-btn"
              onClick={() => navigate('/signup', { state: { from: location } })}
            >
              <FontAwesomeIcon icon={faUserPlus} className="btn-icon" />
              <span className="explore-btn-text">Sign Up</span>
            </button>
          )}
        </div>
      </header>

      <main className="explore-main">
        <div className="explore-container">
          {/* Active Filters Display */}
          {(isFiltered || Object.values(filters).flat().length > 0 || searchQuery) && (
            <div className="active-filters">
              <span>Active filters: </span>
              {searchQuery && (
                <span className="active-filter-tag">
                  Search: "{searchQuery}"
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      if (Object.values(filters).flat().length === 0) {
                        clearAllFilters();
                      } else {
                        applyFilters();
                      }
                    }}
                    className="remove-filter"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </span>
              )}
              {Object.entries(filters).map(([category, values]) =>
                values.map(value => (
                  <span key={`${category}-${value}`} className="active-filter-tag">
                    {value}
                    <button 
                      onClick={() => {
                        handleFilterChange(category, value);
                        setTimeout(applyFilters, 100);
                      }}
                      className="remove-filter"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </span>
                ))
              )}
              {(isFiltered || Object.values(filters).flat().length > 0 || searchQuery) && (
                <button className="clear-all-filters" onClick={clearAllFilters}>
                  Clear All
                </button>
              )}
            </div>
          )}

          {/* Results Count */}
          {isFiltered && (
            <div className="results-count">
              Found {displayRecipes.length} recipe{displayRecipes.length !== 1 ? 's' : ''} 
              {searchQuery && ` for "${searchQuery}"`}
            </div>
          )}

</div>
{/* Masonry Grid */}
<div className="masonry-grid">
           {displayRecipes.map(recipe => (
    <div 
      key={recipe.id} 
      className={`masonry-item ${recipe.type}`}
      onClick={() => handleRecipeClick(recipe.id)}
    >
      <div className="recipe-card-pinterest">
        <div className="recipe-image-container">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="recipe-image-pinterest"
          />
          <div className="recipe-overlay">
            <button className="save-btn" onClick={handleLikeClick}>
              <FontAwesomeIcon icon={faHeart} className="save-icon" />
            </button>
            <div className="recipe-time">
              <FontAwesomeIcon icon={faClock} className="time-icon" />
              {recipe.cookingTime}min
            </div>
          </div>
        </div>
        
        <div className="recipe-info-pinterest">
          <h3 className="recipe-title">{recipe.title}</h3>
          <p className="recipe-description">{recipe.description}</p>
          <div className="recipe-meta">
            <div 
              className="user-info"
              onClick={(e) => handleChefClick(recipe.user.name, e)}
            >
              <img 
                src={recipe.user.avatar} 
                alt={recipe.user.name}
                className="user-avatar"
              />
              <span className="user-name">{recipe.user.name}</span>
            </div>
            <div className="recipe-stats">
              <span className="likes">
                <FontAwesomeIcon icon={faHeart} className="like-icon" />
                {recipe.likes}
              </span>
              <span className="difficulty">
                <FontAwesomeIcon icon={faFire} className="difficulty-icon" />
                {recipe.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}


          {/* No Results Message */}
          {isFiltered && displayRecipes.length === 0 && !loading && (
            <div className="no-results">
              <h3>No recipes found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button className="clear-all-filters" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="loading-indicator">
              <FontAwesomeIcon icon={faSpinner} className="loading-spinner" spin />
              <p>{isFiltered ? 'Searching recipes...' : 'Loading more delicious recipes...'}</p>
            </div>
          )}

          
        </div>
      </main>
    </div>
  );
};

export default Explore;