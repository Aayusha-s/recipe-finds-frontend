import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faUserPlus, 
  faSearch,
  faFire,
  faStar,
  faBook,
  faHeart,
  faComment,
  faShare,
  faEllipsisV,
  faPlus,
  faFilter,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import './Community.css';

const Community = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chefs');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const topChefs = [
    {
      id: 1,
      name: "Chef Carlos",
      username: "@chefcarlos",
      avatar: "https://i.pravatar.cc/150?img=23",
      verified: true,
      rating: 4.8,
      recipes: 47,
      followers: "12.5K",
      bio: "Master of Mexican cuisine with 15 years experience. Love sharing authentic family recipes!",
      specialties: ["Mexican", "BBQ", "Spicy"],
      isFollowing: false
    },
    {
      id: 2,
      name: "Chef Marie",
      username: "@chefmarie",
      avatar: "https://i.pravatar.cc/150?img=32",
      verified: true,
      rating: 4.9,
      recipes: 32,
      followers: "8.7K",
      bio: "French pastry chef specializing in desserts and baked goods. Bon appétit!",
      specialties: ["French", "Desserts", "Baking"],
      isFollowing: false
    },
    {
      id: 3,
      name: "Chef Yuki",
      username: "@chefyuki",
      avatar: "https://i.pravatar.cc/150?img=45",
      verified: true,
      rating: 4.7,
      recipes: 28,
      followers: "6.3K",
      bio: "Japanese cuisine expert. Traditional techniques with modern twists.",
      specialties: ["Japanese", "Sushi", "Ramen"],
      isFollowing: false
    },
    {
      id: 4,
      name: "Chef Marco",
      username: "@chefmarco",
      avatar: "https://i.pravatar.cc/150?img=12",
      verified: true,
      rating: 4.6,
      recipes: 41,
      followers: "9.2K",
      bio: "Italian nonna's recipes passed down through generations. Mangia!",
      specialties: ["Italian", "Pasta", "Seafood"],
      isFollowing: false
    },
    {
      id: 5,
      name: "Chef Sophia",
      username: "@chefsophia",
      avatar: "https://i.pravatar.cc/150?img=28",
      verified: false,
      rating: 4.5,
      recipes: 23,
      followers: "4.8K",
      bio: "Healthy eating enthusiast. Creating nutritious and delicious meals for everyone.",
      specialties: ["Healthy", "Vegetarian", "Mediterranean"],
      isFollowing: false
    },
    {
      id: 6,
      name: "Chef Anong",
      username: "@chefanong",
      avatar: "https://i.pravatar.cc/150?img=41",
      verified: true,
      rating: 4.8,
      recipes: 35,
      followers: "7.9K",
      bio: "Thai street food master. Bringing authentic Thai flavors to your kitchen.",
      specialties: ["Thai", "Street Food", "Curry"],
      isFollowing: false
    }
  ];

  const communityPosts = [
    {
      id: 1,
      user: {
        name: "Foodie Explorer",
        username: "@foodexplorer",
        avatar: "https://i.pravatar.cc/150?img=5"
      },
      content: "Just tried making Beef Wellington for the first time! It was challenging but so worth it. The puff pastry was perfectly golden and the beef was medium rare. 🥩✨",
      image: "/images/Beef Wellington.png",
      likes: 234,
      comments: 45,
      shares: 12,
      time: "2 hours ago",
      tags: ["BeefWellington", "CookingChallenge", "Gourmet"]
    },
    {
      id: 2,
      user: {
        name: "Baking Queen",
        username: "@bakingqueen",
        avatar: "https://i.pravatar.cc/150?img=8"
      },
      content: "My sourdough starter is thriving! Baked these beautiful loaves this morning. Nothing beats the smell of fresh bread in the house. 🍞💕",
      image: "/images/Sourdough Bread.png",
      likes: 189,
      comments: 32,
      shares: 8,
      time: "5 hours ago",
      tags: ["Sourdough", "Baking", "Bread"]
    },
    {
      id: 3,
      user: {
        name: "Healthy Eats",
        username: "@healthyeats",
        avatar: "https://i.pravatar.cc/150?img=15"
      },
      content: "Meal prep Sunday done right! Quinoa bowls with roasted veggies and tahini dressing. Ready for a healthy week ahead! 🥗💪",
      image: "/images/Meal Prep.png",
      likes: 156,
      comments: 28,
      shares: 15,
      time: "1 day ago",
      tags: ["MealPrep", "Healthy", "Vegetarian"]
    }
  ];

  const trendingRecipes = [
    {
      id: 1,
      name: "Spicy Beef Tacos",
      image: "/images/Spicy Beef Tacos with Salsa.png",
      likes: 892,
      chef: "Chef Carlos",
      trend: "hot"
    },
    {
      id: 2,
      name: "Chocolate Lava Cake",
      image: "/images/Chocolate Lava Cake.png",
      likes: 765,
      chef: "Chef Marie",
      trend: "rising"
    },
    {
      id: 3,
      name: "Thai Green Curry",
      image: "/images/Thai Green Curry.png",
      likes: 543,
      chef: "Chef Anong",
      trend: "hot"
    }
  ];

  const handleFollowChef = (chefId, e) => {
    e.stopPropagation();
    // In a real app, you would make an API call here
    console.log(`Followed chef ${chefId}`);
  };

  const handleChefClick = (chefId) => {
    navigate(`/chef/${chefId}`);
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const handleLikePost = (postId, e) => {
    e.stopPropagation();
    // In a real app, you would make an API call here
    console.log(`Liked post ${postId}`);
  };

  const filteredChefs = topChefs.filter(chef =>
    chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chef.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
    <div className="community-page">
      {/* Hero Section */}
      <section className="community-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <FontAwesomeIcon icon={faUsers} className="badge-icon" />
            Join Our Food Community
          </div>
          <h1 className="hero-title">
            Connect with <span className="highlight">Food Lovers</span>
          </h1>
          <p className="hero-subtitle">
            Share recipes, get inspired, and learn from amazing chefs and home cooks around the world
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Community Members</span>
            </div>
            <div className="stat">
              <span className="stat-number">200+</span>
              <span className="stat-label">Expert Chefs</span>
            </div>
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Recipes Shared</span>
            </div>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="floating-avatars">
            {topChefs.slice(0, 4).map((chef, index) => (
              <img 
                key={chef.id}
                src={chef.avatar} 
                alt={chef.name}
                className={`floating-avatar avatar-${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="community-container">
        <div className="community-layout">
          {/* Left Sidebar - Trending */}
          <aside className="community-sidebar">
            <div className="sidebar-section trending-recipes">
              <h3>
                <FontAwesomeIcon icon={faFire} />
                Trending Recipes
              </h3>
              <div className="trending-list">
                {trendingRecipes.map((recipe, index) => (
                  <div 
                    key={recipe.id} 
                    className="trending-item"
                    onClick={() => handleRecipeClick(recipe.id)}
                  >
                    <div className="trending-rank">#{index + 1}</div>
                    <img src={recipe.image} alt={recipe.name} className="trending-image" />
                    <div className="trending-info">
                      <h4>{recipe.name}</h4>
                      <p>by {recipe.chef}</p>
                      <div className="trending-stats">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>{recipe.likes}</span>
                        <span className={`trend-tag ${recipe.trend}`}>
                          {recipe.trend === 'hot' ? '🔥 Hot' : '📈 Rising'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-section community-stats">
              <h3>Community Stats</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <FontAwesomeIcon icon={faUsers} className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-number">50,247</span>
                    <span className="stat-label">Members</span>
                  </div>
                </div>
                <div className="stat-card">
                  <FontAwesomeIcon icon={faBook} className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-number">12,893</span>
                    <span className="stat-label">Recipes</span>
                  </div>
                </div>
                <div className="stat-card">
                  <FontAwesomeIcon icon={faComment} className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-number">34,562</span>
                    <span className="stat-label">Comments</span>
                  </div>
                </div>
                <div className="stat-card">
                  <FontAwesomeIcon icon={faHeart} className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-number">245,789</span>
                    <span className="stat-label">Likes</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="community-main">
            {/* Navigation Tabs */}
            <div className="community-tabs">
              <button 
                className={`tab-btn ${activeTab === 'chefs' ? 'active' : ''}`}
                onClick={() => setActiveTab('chefs')}
              >
                Top Chefs
              </button>
              <button 
                className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
                onClick={() => setActiveTab('posts')}
              >
                Community Posts
              </button>
              <button 
                className={`tab-btn ${activeTab === 'discussions' ? 'active' : ''}`}
                onClick={() => setActiveTab('discussions')}
              >
                Discussions
              </button>
            </div>

            {/* Search and Filters */}
            <div className="search-filters">
              <div className="search-bar">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input 
                  type="text" 
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              <button 
                className="filter-btn"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FontAwesomeIcon icon={faFilter} />
                Filters
                <FontAwesomeIcon icon={faChevronDown} className="chevron" />
              </button>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'chefs' && (
              <div className="chefs-grid">
                {filteredChefs.map(chef => (
                  <div 
                    key={chef.id} 
                    className="chef-card"
                    onClick={() => handleChefClick(chef.id)}
                  >
                    <div className="chef-header">
                      <div className="chef-avatar-container">
                        <img src={chef.avatar} alt={chef.name} className="chef-avatar" />
                        {chef.verified && <div className="verified-badge">✓</div>}
                      </div>
                      <div className="chef-info">
                        <h3 className="chef-name">{chef.name}</h3>
                        <span className="chef-username">{chef.username}</span>
                        <div className="chef-rating">
                          {renderStars(chef.rating)}
                          <span className="rating-value">{chef.rating}</span>
                        </div>
                      </div>
                      <button 
                        className={`follow-btn ${chef.isFollowing ? 'following' : ''}`}
                        onClick={(e) => handleFollowChef(chef.id, e)}
                      >
                        {chef.isFollowing ? 'Following' : 'Follow'}
                      </button>
                    </div>
                    
                    <p className="chef-bio">{chef.bio}</p>
                    
                    <div className="chef-specialties">
                      {chef.specialties.map(specialty => (
                        <span key={specialty} className="specialty-tag">{specialty}</span>
                      ))}
                    </div>
                    
                    <div className="chef-stats">
                      <div className="stat">
                        <FontAwesomeIcon icon={faBook} />
                        <span>{chef.recipes} recipes</span>
                      </div>
                      <div className="stat">
                        <FontAwesomeIcon icon={faUsers} />
                        <span>{chef.followers} followers</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'posts' && (
              <div className="posts-feed">
                {communityPosts.map(post => (
                  <div key={post.id} className="post-card">
                    <div className="post-header">
                      <div className="post-user">
                        <img src={post.user.avatar} alt={post.user.name} className="user-avatar" />
                        <div className="user-info">
                          <h4>{post.user.name}</h4>
                          <span>{post.user.username} • {post.time}</span>
                        </div>
                      </div>
                      <button className="post-options">
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </button>
                    </div>
                    
                    <p className="post-content">{post.content}</p>
                    
                    {post.image && (
                      <div 
                        className="post-image"
                        onClick={() => handleRecipeClick(1)} // You might want to link to actual recipe
                      >
                        <img src={post.image} alt="Post content" />
                      </div>
                    )}
                    
                    <div className="post-tags">
                      {post.tags.map(tag => (
                        <span key={tag} className="post-tag">#{tag}</span>
                      ))}
                    </div>
                    
                    <div className="post-actions">
                      <button 
                        className="action-btn"
                        onClick={(e) => handleLikePost(post.id, e)}
                      >
                        <FontAwesomeIcon icon={faHeart} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="action-btn">
                        <FontAwesomeIcon icon={faComment} />
                        <span>{post.comments}</span>
                      </button>
                      <button className="action-btn">
                        <FontAwesomeIcon icon={faShare} />
                        <span>{post.shares}</span>
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Create Post Card */}
                <div className="create-post-card">
                  <div className="create-post-header">
                    <img 
                      src="https://i.pravatar.cc/150?img=1" 
                      alt="Your avatar" 
                      className="user-avatar" 
                    />
                    <button className="create-post-input">
                      Share your cooking experience...
                    </button>
                  </div>
                  <div className="create-post-actions">
                    <button className="action-option">
                      <FontAwesomeIcon icon={faPlus} />
                      Photo
                    </button>
                    <button className="action-option">
                      <FontAwesomeIcon icon={faBook} />
                      Recipe
                    </button>
                    <button className="post-now-btn">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'discussions' && (
              <div className="discussions-placeholder">
                <div className="placeholder-content">
                  <FontAwesomeIcon icon={faComment} className="placeholder-icon" />
                  <h3>Coming Soon!</h3>
                  <p>Recipe discussions and Q&A section will be available soon.</p>
                  <button className="primary-btn">
                    Notify Me
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Community;