// components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart,
  faComment,
  faBookmark,
  faEllipsisH,
  faShare,
  faBook,
  faUser,
  faMapMarkerAlt,
  faCalendarAlt,
  faClock,
  faFire
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import './UserProfile.css';

const MOCK_USERS = {
  'chef-maria': {
    id: 1,
    username: 'chef-maria',
    name: 'Chef Maria',
    avatar: 'https://i.pravatar.cc/150?img=32',
    bio: 'Professional chef | Italian cuisine specialist 🍝 | Creating magic in the kitchen ✨',
    location: 'Rome, Italy',
    joinDate: '2022-03-15',
    followers: 12542,
    following: 342,
    recipes: 156,
    isFollowing: false,
  },
  'chef-alex': {
    id: 2,
    username: 'chef-alex',
    name: 'Alex Thompson',
    avatar: 'https://i.pravatar.cc/150?img=45',
    bio: 'Healthy eating enthusiast 🥑 | Nutrition expert | Quick & easy recipes ⏱️',
    location: 'California, USA',
    joinDate: '2023-01-20',
    followers: 8921,
    following: 215,
    recipes: 89,
    isFollowing: true,
  },
  'chef-sarah': {
    id: 3,
    username: 'chef-sarah',
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?img=28',
    bio: 'Pastry chef 🍰 | Dessert lover | Making life sweeter one recipe at a time 🎂',
    location: 'Paris, France',
    joinDate: '2022-08-10',
    followers: 15687,
    following: 189,
    recipes: 203,
    isFollowing: false,
  }
};

// Mock user recipes
const getUserRecipes = (userId) => {
  const userRecipes = {
    1: [1, 4, 7, 10, 13, 16],
    2: [2, 5, 8, 11, 14, 17],
    3: [3, 6, 9, 12, 15, 18]
  };
  
  return ALL_RECIPES.filter(recipe => userRecipes[userId]?.includes(recipe.id));
};

// Sample recipe data
const ALL_RECIPES = [
  {
    id: 1, 
    title: "Creamy Garlic Pasta with Fresh Herbs", 
    image: "/images/Creamy Garlic Pasta with Fresh Herbs.png", 
    likes: 1247,
    comments: 89,
    cookingTime: 25,
    difficulty: "Easy",
    description: "A delicious and easy-to-make pasta with fresh herbs and parmesan cheese that everyone will love."
  },
  {
    id: 2, 
    title: "Avocado Toast with Cherry Tomatoes", 
    image: "/images/Avocado Toast with Cherry Tomatoes.png", 
    likes: 892,
    comments: 45,
    cookingTime: 10,
    difficulty: "Easy",
    description: "Perfect for breakfast or a quick snack. Healthy and tasty with cherry tomatoes and microgreens."
  },
  {
    id: 3, 
    title: "Berry Smoothie Bowl with Granola", 
    image: "/images/Berry Smoothie Bowl with Granola.png", 
    likes: 1563,
    comments: 123,
    cookingTime: 5,
    difficulty: "Easy",
    description: "Healthy and refreshing smoothie bowl topped with granola and fresh berries for a perfect start to your day."
  },
  {
    id: 4, 
    title: "Chicken Teriyaki with Steamed Rice", 
    image: "/images/Chicken Teriyaki with Steamed Rice.png", 
    likes: 2105,
    comments: 156,
    cookingTime: 35,
    difficulty: "Medium",
    description: "Japanese-inspired chicken teriyaki with perfectly steamed rice and vegetables."
  },
  {
    id: 5, 
    title: "Decadent Chocolate Brownies", 
    image: "/images/Decadent Chocolate Brownies.png", 
    likes: 3120,
    comments: 234,
    cookingTime: 45,
    difficulty: "Medium",
    description: "Rich, fudgy chocolate brownies with walnuts. The perfect dessert for chocolate lovers."
  },
  {
    id: 6, 
    title: "Fresh Greek Salad with Feta", 
    image: "/images/Fresh Greek Salad with Feta.png", 
    likes: 987,
    comments: 67,
    cookingTime: 15,
    difficulty: "Easy",
    description: "Crisp vegetables, tangy feta cheese, and kalamata olives in a light olive oil dressing."
  },
];

const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, isAuthenticated } = useAuth();
  const [user, setUser] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState('recipes');
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const foundUser = MOCK_USERS[username];
      setUser(foundUser);
      if (foundUser) {
        setUserRecipes(getUserRecipes(foundUser.id));
      }
      setLoading(false);
    }, 800);
  }, [username]);

  const handleFollow = () => {
    if (!isAuthenticated) {
      navigate('/signup', { state: { from: `/chef/${username}` } });
      return;
    }

    if (user) {
      setUser(prev => ({
        ...prev,
        isFollowing: !prev.isFollowing,
        followers: prev.isFollowing ? prev.followers - 1 : prev.followers + 1
      }));
    }
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
      alert('Profile link copied to clipboard!');
    }
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const isOwnProfile = currentUser && user && currentUser.username === user.username;

  if (loading) {
    return (
      <div className="user-profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-profile-error">
        <h2>User Not Found</h2>
        <p>This profile doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/explore')} className="back-to-explore">
          Back to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="user-profile-instagram">
      {/* Profile Info Section - No Top Header */}
      <section className="profile-info-insta">
        <div className="profile-main-section">
          {/* Avatar on Left */}
          <div className="avatar-section-insta">
            <img src={user.avatar} alt={user.name} className="profile-avatar-insta" />
          </div>
          
          {/* Stats on Right */}
          <div className="stats-section-insta">
            <div className="stat">
              <span className="stat-number">{user.recipes}</span>
              <span className="stat-label">Recipes</span>
            </div>
            <div className="stat">
              <span className="stat-number">{user.followers.toLocaleString()}</span>
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
            <h1 className="profile-name-insta">{user.name}</h1>
            <p className="profile-username-insta">@{user.username}</p>
          </div>
          
          <p className="profile-bio-insta">{user.bio}</p>
          
          {/* <div className="profile-meta-insta">
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
          </div> */}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          {isOwnProfile ? (
            <button className="edit-profile-btn">
              Edit Profile
            </button>
          ) : (
            <>
              <button 
                className={`follow-btn-insta ${user.isFollowing ? 'following' : ''}`}
                onClick={handleFollow}
              >
                {user.isFollowing ? 'Following' : 'Follow'}
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
                    <button className="menu-item report">
                      Report User
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
          className={`tab-insta ${activeTab === 'recipes' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipes')}
        >
          <FontAwesomeIcon icon={faBook} />
          <span>RECIPES</span>
        </button>
        <button 
          className={`tab-insta ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <FontAwesomeIcon icon={faUser} />
          <span>ABOUT</span>
        </button>
      </nav>

      {/* Content Area */}
      <section className="profile-content-insta">
        {activeTab === 'recipes' && (
          <div className="recipes-grid-classic">
            {userRecipes.length > 0 ? (
              userRecipes.map(recipe => (
                <div 
                  key={recipe.id} 
                  className="recipe-card-classic"
                  onClick={() => handleRecipeClick(recipe.id)}
                >
                  <div className="recipe-image-classic">
                    <img src={recipe.image} alt={recipe.title} />
                    <div className="recipe-overlay-classic">
                      <div className="recipe-time-classic">
                        <FontAwesomeIcon icon={faClock} />
                        {recipe.cookingTime}min
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
                  </div>
                </div>
              ))
            ) : (
              <div className="no-posts">
                <div className="no-posts-icon">
                  <FontAwesomeIcon icon={faBook} />
                </div>
                <h3>No Recipes Yet</h3>
                <p>When {user.name} shares recipes, they'll appear here.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'about' && (
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
                  <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserProfile;