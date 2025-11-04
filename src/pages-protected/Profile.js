import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faBookmark,
  faEllipsisH,
  faShare,
  faBook,
  faUser,
  faMapMarkerAlt,
  faCalendarAlt,
  faClock,
  faFire,
  faEdit,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import "./Profile.css";

// Mock user data - in real app, this would come from your backend
const MOCK_CURRENT_USER = {
  id: 1,
  username: "chef-aayusha",
  name: "Aayusha Sharma",
  avatar: "https://i.pravatar.cc/150?img=32",
  bio: "Food enthusiast and home chef 🍳 | Love creating healthy & delicious recipes | Sharing my culinary journey ✨",
  location: "Kathmandu, Nepal",
  joinDate: "2024-01-15",
  followers: 1242,
  following: 156,
  recipes: 47,
  isFollowing: false,
};

// Sample recipe data for the current user
const USER_RECIPES = [
  {
    id: 1,
    title: "Mo:Mo with Spicy Chutney",
    image: "/images/momo.png",
    likes: 324,
    comments: 45,
    cookingTime: 40,
    difficulty: "Medium",
    description: "Traditional Nepalese dumplings with authentic spicy tomato chutney.",
    isLiked: true,
  },
  {
    id: 2,
    title: "Dal Bhat with Achar",
    image: "/images/dal-bhat.png",
    likes: 287,
    comments: 32,
    cookingTime: 35,
    difficulty: "Easy",
    description: "Classic Nepalese lentil soup with rice and spicy pickle.",
    isLiked: false,
  },
  {
    id: 3,
    title: "Sel Roti with Tea",
    image: "/images/sel-roti.png",
    likes: 412,
    comments: 67,
    cookingTime: 25,
    difficulty: "Medium",
    description: "Traditional Nepalese rice doughnut perfect for breakfast with milk tea.",
    isLiked: true,
  },
  {
    id: 4,
    title: "Chicken Choila",
    image: "/images/choila.png",
    likes: 198,
    comments: 23,
    cookingTime: 30,
    difficulty: "Easy",
    description: "Spicy grilled chicken salad, a Newari delicacy from Nepal.",
    isLiked: false,
  },
  {
    id: 5,
    title: "Yomari with Chaku",
    image: "/images/yomari.png",
    likes: 356,
    comments: 51,
    cookingTime: 50,
    difficulty: "Hard",
    description: "Sweet rice flour dumplings filled with molasses and sesame seeds.",
    isLiked: true,
  },
  {
    id: 6,
    title: "Gundruk with Dhedo",
    image: "/images/gundruk.png",
    likes: 173,
    comments: 19,
    cookingTime: 20,
    difficulty: "Easy",
    description: "Fermented leafy greens served with millet dough, a Nepalese staple.",
    isLiked: false,
  },
];

// Mock liked recipes from other users
const LIKED_RECIPES = [
  {
    id: 101,
    title: "Spicy Thai Green Curry",
    image: "/images/thai-curry.png",
    likes: 892,
    comments: 124,
    cookingTime: 30,
    difficulty: "Medium",
    description: "Authentic Thai green curry with coconut milk and fresh vegetables.",
    author: "chef-thai",
    authorName: "Thai Food Lover",
    isLiked: true,
  },
  {
    id: 102,
    title: "Classic Italian Tiramisu",
    image: "/images/tiramisu.png",
    likes: 1567,
    comments: 289,
    cookingTime: 45,
    difficulty: "Medium",
    description: "Traditional Italian dessert with coffee-soaked ladyfingers and mascarpone.",
    author: "italian-chef",
    authorName: "Marco Italian",
    isLiked: true,
  },
  {
    id: 103,
    title: "Japanese Ramen Bowl",
    image: "/images/ramen.png",
    likes: 2103,
    comments: 342,
    cookingTime: 40,
    difficulty: "Hard",
    description: "Rich pork broth ramen with soft-boiled egg and chashu pork.",
    author: "ramen-master",
    authorName: "Ramen Master",
    isLiked: true,
  },
  {
    id: 104,
    title: "Mexican Tacos Al Pastor",
    image: "/images/tacos.png",
    likes: 1245,
    comments: 187,
    cookingTime: 25,
    difficulty: "Easy",
    description: "Traditional Mexican tacos with marinated pork and pineapple.",
    author: "mexican-foodie",
    authorName: "Carlos Mexican",
    isLiked: true,
  },
];

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user: currentUser, isAuthenticated, logout } = useAuth();
  const [user, setUser] = useState(MOCK_CURRENT_USER);
  const [userRecipes, setUserRecipes] = useState(USER_RECIPES);
  const [likedRecipes, setLikedRecipes] = useState(LIKED_RECIPES);
  const [activeTab, setActiveTab] = useState("recipes");
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(MOCK_CURRENT_USER);


  useEffect(() => {
    if (location.state?.newRecipe) {
      const newRecipe = location.state.newRecipe;
      addNewRecipe(newRecipe);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);


  // Function to add a new recipe to the user's recipes
// Enhanced addNewRecipe function in Profile component
const addNewRecipe = (newRecipeData) => {
  const newRecipe = {
    id: Date.now(), // Generate unique ID
    title: newRecipeData.title,
    image: newRecipeData.image || getDefaultRecipeImage(newRecipeData.category),
    likes: 0, // Start with 0 likes
    comments: 0,
    cookingTime: newRecipeData.cookTime || "30 mins",
    difficulty: newRecipeData.difficulty || "Medium",
    description: newRecipeData.description,
    // Add chef information from current user
    chef: user.name,
    chefAvatar: user.avatar,
    // Additional metadata
    isNew: true, // Flag to highlight new recipes
    createdAt: new Date().toISOString(),
    // Filter out empty ingredients and instructions
    ingredients: newRecipeData.ingredients ? newRecipeData.ingredients.filter(ing => ing.trim() !== '') : [],
    instructions: newRecipeData.instructions ? newRecipeData.instructions.filter(inst => inst.trim() !== '') : [],
    tags: newRecipeData.tags || []
  };

  setUserRecipes(prev => [newRecipe, ...prev]); // Add to beginning of array
  
  // Update user stats
  setUser(prev => ({
    ...prev,
    recipes: prev.recipes + 1
  }));
  
  // Auto-switch to recipes tab
  setActiveTab("recipes");
  
  // Show success message
  setTimeout(() => {
    alert(`"${newRecipeData.title}" has been successfully published! 🎉`);
  }, 100);
};

// Helper function to get default images based on category
const getDefaultRecipeImage = (category) => {
  const defaultImages = {
    'Breakfast': '/images/breakfast-default.png',
    'Lunch': '/images/lunch-default.png',
    'Dinner': '/images/dinner-default.png',
    'Dessert': '/images/dessert-default.png',
    'Snack': '/images/snack-default.png',
    'Vegetarian': '/images/vegetarian-default.png',
    'Vegan': '/images/vegan-default.png',
    'Italian': '/images/italian-default.png',
    'Mexican': '/images/mexican-default.png',
    'Asian': '/images/asian-default.png'
  };
  return defaultImages[category] || '/images/recipe-placeholder.png';
};

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${user.name}'s Profile`,
        text: `Check out ${user.name}'s recipes on RecipeFinds!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Profile link copied to clipboard!");
    }
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSaveProfile = () => {
    setUser(editedUser);
    setIsEditing(false);
    // In real app, make API call to update user profile
  };

  const handleCancelEdit = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleUnlikeRecipe = (recipeId) => {
    setLikedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  const handleCreateRecipe = () => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          from: '/profile',
          message: 'Please login to create and share your recipes!'
        } 
      });
      return;
    }
    navigate('/create-recipe');
  };

  return (
    <div className="user-profile-instagram">
      {/* Profile Info Section */}
      <section className="profile-info-insta">
        <div className="profile-main-section">
          {/* Avatar on Left */}
          <div className="avatar-section-insta">
            <img
              src={user.avatar}
              alt={user.name}
              className="profile-avatar-insta"
            />
          </div>

          {/* Stats on Right */}
          <div className="stats-section-insta">
            <div className="stat">
              <span className="stat-number">{userRecipes.length}</span>
              <span className="stat-label">Recipes</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {user.followers.toLocaleString()}
              </span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-number">{user.following}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
        </div>

        <div className="profile-details-insta">
          {/* Name and Username */}
          <div className="name-username-section">
            {isEditing ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="edit-input"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  value={editedUser.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="edit-input"
                  placeholder="Username"
                />
                <textarea
                  value={editedUser.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="edit-textarea"
                  placeholder="Bio"
                  rows="3"
                />
                <input
                  type="text"
                  value={editedUser.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="edit-input"
                  placeholder="Location"
                />
              </div>
            ) : (
              <>
                <h1 className="profile-name-insta">{user.name}</h1>
                <p className="profile-username-insta">@{user.username}</p>
                <p className="profile-bio-insta">{user.bio}</p>
                
                <div className="profile-meta-insta">
                  {user.location && (
                    <div className="meta-item">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      <span>{user.location}</span>
                    </div>
                  )}
                  <div className="meta-item">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>Joined {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          {isEditing ? (
            <>
              <button className="save-profile-btn" onClick={handleSaveProfile}>
                Save Changes
              </button>
              <button className="cancel-edit-btn" onClick={handleCancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="edit-profile-btn" onClick={handleEditProfile}>
                <FontAwesomeIcon icon={faEdit} />
                Edit Profile
              </button>
              <button className="create-recipe-main-btn" onClick={handleCreateRecipe}>
                <FontAwesomeIcon icon={faPlus} />
                Create Recipe
              </button>
              <button className="share-profile-btn" onClick={handleShare}>
                <FontAwesomeIcon icon={faShare} />
                Share
              </button>
              <div className="menu-container">
                <button
                  className="more-btn"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
                {showMenu && (
                  <div className="dropdown-menu">
                    <button className="menu-item" onClick={() => navigate('/settings')}>
                      Settings
                    </button>
                    <button className="menu-item logout" onClick={handleLogout}>
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="profile-tabs-insta">
        <button
          className={`tab-insta ${activeTab === "recipes" ? "active" : ""}`}
          onClick={() => setActiveTab("recipes")}
        >
          <FontAwesomeIcon icon={faBook} />
          <span>RECIPES</span>
        </button>
        <button
          className={`tab-insta ${activeTab === "liked" ? "active" : ""}`}
          onClick={() => setActiveTab("liked")}
        >
          <FontAwesomeIcon icon={faHeart} />
          <span>LIKED</span>
        </button>
        <button
          className={`tab-insta ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          <FontAwesomeIcon icon={faUser} />
          <span>ABOUT</span>
        </button>
      </nav>

      {/* Content Area */}
      <section className="profile-content-insta">
        {activeTab === "recipes" && (
          <div className="recipes-grid-classic">
          
{userRecipes.map((recipe) => (
  <div
    key={recipe.id}
    className={`recipe-card-classic ${recipe.isNew ? 'new-recipe' : ''}`}
    onClick={() => handleRecipeClick(recipe.id)}
  >
    <div className="recipe-image-classic">
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipe-overlay-classic">
        <div className="recipe-time-classic">
          <FontAwesomeIcon icon={faClock} />
          {recipe.cookingTime}
        </div>
      </div>
    </div>
    <div className="recipe-info-classic">
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <div className="recipe-meta-classic">
        <span className="difficulty-classic">
          <FontAwesomeIcon icon={faFire} />
          {recipe.difficulty}
        </span>
        <span className="likes-classic">
          <FontAwesomeIcon icon={faHeart} />
          {recipe.likes}
        </span>
      </div>
      {recipe.isNew && (
        <div className="new-recipe-badge">
          Just Published!
        </div>
      )}
    </div>
  </div>
))}
          </div>
        )}

        {activeTab === "liked" && (
          <div className="liked-recipes-section">
            {likedRecipes.length > 0 ? (
              <>
                <div className="liked-recipes-header">
                  <h3>Recipes You've Liked</h3>
                  <p className="liked-count">{likedRecipes.length} recipes</p>
                </div>
                <div className="recipes-grid-classic">
                  {likedRecipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="recipe-card-classic liked-recipe-card"
                    >
                      <div className="recipe-image-classic">
                        <img src={recipe.image} alt={recipe.title} />
                        <div className="recipe-overlay-classic">
                          <div className="recipe-time-classic">
                            <FontAwesomeIcon icon={faClock} />
                            {recipe.cookingTime}min
                          </div>
                          <button 
                            className="unlike-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUnlikeRecipe(recipe.id);
                            }}
                            title="Unlike recipe"
                          >
                            <FontAwesomeIcon icon={faHeart} />
                          </button>
                        </div>
                      </div>
                      <div className="recipe-info-classic">
                        <h3>{recipe.title}</h3>
                        <p>{recipe.description}</p>
                        <div className="recipe-meta-classic">
                          <span className="difficulty-classic">
                            <FontAwesomeIcon icon={faFire} />
                            {recipe.difficulty}
                          </span>
                          <span className="likes-classic">
                            <FontAwesomeIcon icon={faHeart} />
                            {recipe.likes}
                          </span>
                        </div>
                        <div className="recipe-author">
                          <span>By {recipe.authorName}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-posts">
                <div className="no-posts-icon">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <h3>No Liked Recipes</h3>
                <p>Recipes you like will appear here.</p>
                <button 
                  className="explore-recipes-btn"
                  onClick={() => navigate('/explore')}
                >
                  Explore Recipes
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "about" && (
          <div className="about-content-insta">
            <div className="about-section">
              <h3>Bio</h3>
              <p className="about-bio">{user.bio}</p>
            </div>

            <div className="about-section">
              <h3>Details</h3>
              <div className="details-list">
                {user.location && (
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>{user.location}</span>
                  </div>
                )}
                <div className="detail-item">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="detail-item">
                  <FontAwesomeIcon icon={faBook} />
                  <span>
                    {userRecipes.length} recipes published
                  </span>
                </div>
                <div className="detail-item">
                  <FontAwesomeIcon icon={faHeart} />
                  <span>
                    {likedRecipes.length} recipes liked
                  </span>
                </div>
              </div>
            </div>

            <div className="about-section">
              <h3>Cooking Style</h3>
              <div className="cooking-tags">
                <span className="cooking-tag">Nepalese Cuisine</span>
                <span className="cooking-tag">Healthy</span>
                <span className="cooking-tag">Traditional</span>
                <span className="cooking-tag">Quick Meals</span>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;