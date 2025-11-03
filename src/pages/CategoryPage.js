import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft,
  faClock,
  faHeart,
  faFire,
  faUtensils,
  faPizzaSlice,
  faBowlFood,
  faLeaf,
  faDrumstickBite,
  faIceCream
} from '@fortawesome/free-solid-svg-icons';
import './CategoryPage.css';

// Sample recipe data for each category
const CATEGORY_RECIPES = {
  italian: [
    {
      id: 1,
      title: "Creamy Garlic Pasta with Fresh Herbs",
      description: "A delicious and easy-to-make pasta with fresh herbs and parmesan cheese.",
      image: "/images/Creamy Garlic Pasta with Fresh Herbs.png",
      cookingTime: 25,
      difficulty: "Easy",
      likes: 1247,
      user: { name: "Chef Maria", avatar: "https://i.pravatar.cc/150?img=32" }
    },
    {
      id: 4,
      title: "Homemade Margherita Pizza",
      description: "Classic Italian pizza with fresh tomatoes, mozzarella, and basil.",
      image: "/images/Homemade Margherita Pizza.png",
      cookingTime: 30,
      difficulty: "Medium",
      likes: 2876,
      user: { name: "Chef Antonio", avatar: "https://i.pravatar.cc/150?img=5" }
    },
    {
      id: 10,
      title: "Classic Caprese Salad",
      description: "Simple yet elegant salad with fresh mozzarella, tomatoes, and basil.",
      image: "/images/Classic Caprese Salad.png",
      cookingTime: 10,
      difficulty: "Easy",
      likes: 765,
      user: { name: "Chef Giovanni", avatar: "https://i.pravatar.cc/150?img=41" }
    }
  ],
  asian: [
    {
      id: 4,
      title: "Chicken Teriyaki with Steamed Rice",
      description: "Japanese-inspired chicken teriyaki with perfectly steamed rice.",
      image: "/images/Chicken Teriyaki with Steamed Rice.png",
      cookingTime: 35,
      difficulty: "Medium",
      likes: 2105,
      user: { name: "Chef Kenji", avatar: "https://i.pravatar.cc/150?img=12" }
    },
    {
      id: 12,
      title: "Spicy Vegetable Curry",
      description: "Hearty vegetable curry with coconut milk and aromatic spices.",
      image: "/images/Spicy Vegetable Curry.png",
      cookingTime: 35,
      difficulty: "Medium",
      likes: 1324,
      user: { name: "Chef Priya", avatar: "https://i.pravatar.cc/150?img=44" }
    }
  ],
  vegan: [
    {
      id: 2,
      title: "Avocado Toast with Cherry Tomatoes",
      description: "Perfect for breakfast or a quick snack. Healthy and tasty.",
      image: "/images/Avocado Toast with Cherry Tomatoes.png",
      cookingTime: 10,
      difficulty: "Easy",
      likes: 892,
      user: { name: "Chef Alex", avatar: "https://i.pravatar.cc/150?img=45" }
    },
    {
      id: 3,
      title: "Berry Smoothie Bowl with Granola",
      description: "Healthy and refreshing smoothie bowl topped with granola.",
      image: "/images/Berry Smoothie Bowl with Granola.png",
      cookingTime: 5,
      difficulty: "Easy",
      likes: 1563,
      user: { name: "Chef Sarah", avatar: "https://i.pravatar.cc/150?img=28" }
    },
    {
      id: 6,
      title: "Fresh Greek Salad with Feta",
      description: "Crisp vegetables, tangy feta cheese, and kalamata olives.",
      image: "/images/Fresh Greek Salad with Feta.png",
      cookingTime: 15,
      difficulty: "Easy",
      likes: 987,
      user: { name: "Chef Sophia", avatar: "https://i.pravatar.cc/150?img=51" }
    }
  ],
  chicken: [
    {
      id: 4,
      title: "Chicken Teriyaki with Steamed Rice",
      description: "Japanese-inspired chicken teriyaki with perfectly steamed rice.",
      image: "/images/Chicken Teriyaki with Steamed Rice.png",
      cookingTime: 35,
      difficulty: "Medium",
      likes: 2105,
      user: { name: "Chef Kenji", avatar: "https://i.pravatar.cc/150?img=12" }
    },
    {
      id: 7,
      title: "Spicy Beef Tacos with Salsa",
      description: "Flavorful beef tacos with homemade salsa and guacamole.",
      image: "/images/Spicy Beef Tacos with Salsa.png",
      cookingTime: 30,
      difficulty: "Medium",
      likes: 1789,
      user: { name: "Chef Carlos", avatar: "https://i.pravatar.cc/150?img=23" }
    }
  ],
  desserts: [
    {
      id: 5,
      title: "Decadent Chocolate Brownies",
      description: "Rich, fudgy chocolate brownies with walnuts.",
      image: "/images/Decadent Chocolate Brownies.png",
      cookingTime: 45,
      difficulty: "Medium",
      likes: 3120,
      user: { name: "Chef Emma", avatar: "https://i.pravatar.cc/150?img=8" }
    },
    {
      id: 14,
      title: "Berry Cheesecake",
      description: "Creamy cheesecake with a graham cracker crust.",
      image: "/images/Berry Cheesecake.png",
      cookingTime: 60,
      difficulty: "Hard",
      likes: 3452,
      user: { name: "Chef Isabella", avatar: "https://i.pravatar.cc/150?img=9" }
    }
  ],
  'quick-meals': [
    {
      id: 2,
      title: "Avocado Toast with Cherry Tomatoes",
      description: "Perfect for breakfast or a quick snack.",
      image: "/images/Avocado Toast with Cherry Tomatoes.png",
      cookingTime: 10,
      difficulty: "Easy",
      likes: 892,
      user: { name: "Chef Alex", avatar: "https://i.pravatar.cc/150?img=45" }
    },
    {
      id: 3,
      title: "Berry Smoothie Bowl with Granola",
      description: "Healthy and refreshing smoothie bowl.",
      image: "/images/Berry Smoothie Bowl with Granola.png",
      cookingTime: 5,
      difficulty: "Easy",
      likes: 1563,
      user: { name: "Chef Sarah", avatar: "https://i.pravatar.cc/150?img=28" }
    },
    {
      id: 10,
      title: "Classic Caprese Salad",
      description: "Simple yet elegant salad.",
      image: "/images/Classic Caprese Salad.png",
      cookingTime: 10,
      difficulty: "Easy",
      likes: 765,
      user: { name: "Chef Giovanni", avatar: "https://i.pravatar.cc/150?img=41" }
    }
  ]
};

const CATEGORY_INFO = {
  italian: {
    name: "Italian Cuisine",
    description: "Discover the rich flavors of Italy with our collection of authentic pasta dishes, pizzas, and traditional recipes.",
    icon: faPizzaSlice,
    color: '#FF6B6B'
  },
  asian: {
    name: "Asian Flavors", 
    description: "Explore the diverse and vibrant tastes of Asian cuisine from teriyaki to curry and everything in between.",
    icon: faBowlFood,
    color: '#4ECDC4'
  },
  vegan: {
    name: "Vegan Delights",
    description: "Healthy and delicious plant-based recipes that are good for you and the planet.",
    icon: faLeaf,
    color: '#45B7D1'
  },
  chicken: {
    name: "Chicken Recipes",
    description: "Tender, juicy chicken dishes from around the world - grilled, baked, fried, and more.",
    icon: faDrumstickBite,
    color: '#96CEB4'
  },
  desserts: {
    name: "Sweet Desserts",
    description: "Indulge in our collection of decadent desserts, from rich chocolate treats to light fruity delights.",
    icon: faIceCream,
    color: '#FFEAA7'
  },
  'quick-meals': {
    name: "Quick & Easy Meals",
    description: "Perfect for busy days - delicious recipes you can make in 30 minutes or less.",
    icon: faFire,
    color: '#DDA0DD'
  }
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (categoryId && CATEGORY_RECIPES[categoryId]) {
      setRecipes(CATEGORY_RECIPES[categoryId]);
      setCategory(CATEGORY_INFO[categoryId]);
    }
  }, [categoryId]);

  const handleRecipeClick = (recipeId) => {
    // Navigate to recipe detail page
    window.location.href = `/recipe/${recipeId}`;
  };

  const handleChefClick = (chefName, e) => {
    e.stopPropagation();
    window.location.href = `/chef/${chefName.toLowerCase().replace(' ', '-')}`;
  };

  if (!category) {
    return <div className="category-not-found">Category not found</div>;
  }

  return (
    <div className="category-page">
      {/* Header Section */}
      <div className="category-header" style={{ backgroundColor: category.color }}>
        <div className="container">
          
          
          <div className="category-hero">
            <div className="category-icon-large">
              <FontAwesomeIcon icon={category.icon} />
            </div>
            <div className="category-info">
              <h1 className="category-title">{category.name}</h1>
              <p className="category-description">{category.description}</p>
              <div className="recipe-count">
                <FontAwesomeIcon icon={faUtensils} />
                <span>{recipes.length} Recipes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="category-recipes-section">
        <div className="container">
          <div className="recipes-grid">
            {recipes.map(recipe => (
              <div 
                key={recipe.id} 
                className="recipe-card"
                onClick={() => handleRecipeClick(recipe.id)}
              >
                <div className="recipe-image">
                  <img src={recipe.image} alt={recipe.title} />
                  <div className="recipe-overlay">
                    <button className="save-btn">
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <div className="recipe-time">
                      <FontAwesomeIcon icon={faClock} />
                      {recipe.cookingTime}min
                    </div>
                  </div>
                </div>
                
                <div className="recipe-info">
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
                        <FontAwesomeIcon icon={faHeart} />
                        {recipe.likes}
                      </span>
                      <span className="difficulty">
                        <FontAwesomeIcon icon={faFire} />
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {recipes.length === 0 && (
            <div className="no-recipes">
              <h3>No recipes found in this category</h3>
              <p>Check back later for new recipes!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;