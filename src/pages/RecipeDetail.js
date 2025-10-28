import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faFire,
  faArrowLeft,
  faUtensils,
  faUser,
  faComment,
  faShare,
  faStar,
  faLeaf,
  faUsers,
  faBook,
   faUserPlus, 
} from '@fortawesome/free-solid-svg-icons';

import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import './RecipeDetail.css';
// Font Awesome imports
import { faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { 
  faInstagram, 
  faFacebook, 
  faTwitter, 
  faPinterest 
} from '@fortawesome/free-brands-svg-icons';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentLocation = useLocation(); 
  const { user, isAuthenticated } = useAuth();
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const imageRef = useRef(null);
  const titleRef = useRef(null);

  const [comments, setComments] = useState([
    { id: 1, user: "James", text: "Some of the most delicious tacos I've ever had! The whole family loved them 😊", likes: 12, time: "2 hours ago" },
    { id: 2, user: "Melju", text: "Works really well with shrimp and fish 😊", likes: 8, time: "5 hours ago" },
    { id: 3, user: "Melissa", text: "I just had some like an hour ago and now I'm craving more. Soooo good. Thank you so much for this recipe. You are a legend!", likes: 25, time: "1 day ago" },
    { id: 4, user: "Antoine", text: "Wow! The best!", likes: 5, time: "2 days ago" }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const recipe = {
    id: 1,
    title: "Simple Delicious Beef Tacos",
    category: "Main Course",
    image: "/images/Spicy Beef Tacos with Salsa.png",
    cookingTime: "2 hours 30 mins",
    difficulty: "Medium",
    likes: 1789,
    user: { 
      name: "Chef Carlos", 
      avatar: "https://i.pravatar.cc/150?img=23",
      verified: true,
      rating: 4.8,
      recipes: 47,
      followers: "12.5K"
    },
    description: "This is my personal favorite dish and version. Definitely recommend experimenting!",
    rating: 4.7,
    reviews: 124,
    ingredients: [
      "2 sticks of lemongrass",
      "25gr dried coconut flakes",
      "200ml pineapple juice or orange juice",
      "1 can coconut milk",
      "4 red peppers or 2 habanero",
      "3 tbsp coriander seeds",
      "5cm piece of ginger, grated",
      "Beef (your preferred cut)",
      "Salt to taste"
    ],
    directions: [
      "In a kitchen mixer add peppers, garlic, ginger, oranges, turmeric and the coriander and blend to a paste",
      "Take the paste and rub it into the beef",
      "Take the beef and section and bring to a soft boil",
      "Add the lemongrass and lemongrass (bruised) and simmer on low for 2 hours",
      "Taste add optional ingredients and salt and simmer 1 more hour stirring occasionally",
      "When the liquid has evaporated and oil floats to the top and the meat is golden brown it's done",
      "Toast the coconut flakes and stir it into the stew",
      "During the cooling down the meat will soak up the liquid - we rehydrate this with the pineapple juice"
    ],
    tags: ["Tacos", "Beef", "Spicy", "Main Course"],
    nutrition: {
      calories: 320,
      protein: "25g",
      carbs: "18g",
      fat: "12g"
    }
  };

  const handleChefClick = () => {
    navigate(`/chef/${recipe.user.name.toLowerCase().replace(' ', '-')}`);
  };

  const handleLike = () => {
    if (!isAuthenticated) {
      navigate('/signup', { state: { from: currentLocation } }); // Use currentLocation
      return;
    }
    setIsLiked(!isLiked);
  };

  const handleCommentLike = (commentId) => {
    if (!isAuthenticated) {
      navigate('/signup', { state: { from: currentLocation } }); // Use currentLocation
      return;
    }
    
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/signup', { state: { from: currentLocation } }); // Use currentLocation
      return;
    }
    
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: user.name,
        text: comment,
        likes: 0,
        time: "Just now"
      };
      setComments([...comments, newComment]);
      setComment('');
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
    <div className="recipe-detail-page">
      {/* Header */}
      <header className="recipe-detail-header">
        <div className="recipe-detail-nav">
          {/* <button onClick={() => navigate(-1)} className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Explore
          </button> */}
          <Link to="/" className="logo">
            <img src='/images/RecipeFindsLogo.png' alt='RecipeFinds' />
          </Link>
          
          {/* User info or Sign Up button */}
          {isAuthenticated ? (
            <div className="user-info-header">
              <img src={user.avatar} alt={user.name} className="user-avatar-small" />
              <span className="user-name-header">{user.name}</span>
            </div>
          ) : (
            <button 
              className="signup-btn" 
              onClick={() => navigate('/signup', { state: { from: currentLocation } })} // Use currentLocation
            >
              <FontAwesomeIcon icon={faUserPlus} className="btn-icon" />
              Sign Up
            </button>
          )}
        </div>
      </header>

      <div className="recipe-detail-container">
        {/* Recipe Header */}
        <div className="recipe-header">
          <div className="recipe-title-section">
            <h1 className="recipe-title">
              {recipe.title}
            </h1>
            <div className="recipe-category">{recipe.category}</div>
            <div className="recipe-rating">
              {renderStars(recipe.rating)}
              <span>({recipe.reviews} reviews)</span>
            </div>
          </div>
          <div className="recipe-actions">
            <button 
              className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
              onClick={handleLike}
            >
              <FontAwesomeIcon icon={isLiked ? faHeart : faRegularHeart} />
              {recipe.likes + (isLiked ? 1 : 0)}
            </button>
            <button className="action-btn">
              <FontAwesomeIcon icon={faShare} />
              Share
            </button>
          </div>
        </div>

        <div className="recipe-content-layout">
          {/* Left Column - Image and Chef */}
          <div className="recipe-left-column">
            <div className="recipe-image-container">
              <img src={recipe.image} alt={recipe.title} className="recipe-main-image" />
              <div className="image-overlay"></div>
            </div>
            
            <div className="chef-card">
              <div className="chef-header" onClick={handleChefClick}>
                <img src={recipe.user.avatar} alt={recipe.user.name} className="chef-avatar" />
                <div className="chef-info">
                  <h3>{recipe.user.name}</h3>
                  <div className="chef-verified">
                    <span>Verified Chef</span>
                  </div>
                  <div className="chef-stats">
                    <div className="chef-stat">
                      <FontAwesomeIcon icon={faStar} />
                      <span>{recipe.user.rating}</span>
                    </div>
                    <div className="chef-stat">
                      <FontAwesomeIcon icon={faBook} />
                      <span>{recipe.user.recipes} recipes</span>
                    </div>
                    <div className="chef-stat">
                      <FontAwesomeIcon icon={faUsers} />
                      <span>{recipe.user.followers} followers</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="chef-notes">{recipe.description}</p>
            </div>

            {/* Nutrition Card */}
            <div className="nutrition-card">
              <h3>Nutrition Facts</h3>
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <span className="nutrition-value">{recipe.nutrition.calories}</span>
                  <span className="nutrition-label">Calories</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-value">{recipe.nutrition.protein}</span>
                  <span className="nutrition-label">Protein</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-value">{recipe.nutrition.carbs}</span>
                  <span className="nutrition-label">Carbs</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-value">{recipe.nutrition.fat}</span>
                  <span className="nutrition-label">Fat</span>
                </div>
              </div>
            </div>

            {/* More Recipes Section */}
            <div className="more-recipes">
              <h3>More Tacos</h3>
              <div className="more-recipes-grid">
                <div className="more-recipe-item">
                  <span>Tacos Veracruz</span>
                </div>
                <div className="more-recipe-item">
                  <span>Fish Tacos</span>
                </div>
                <div className="more-recipe-item">
                  <span>Chicken Tacos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Ingredients, Directions, Comments */}
          <div className="recipe-right-column">
            {/* Recipe Meta */}
            <div className="recipe-meta">
              <div className="meta-item">
                <FontAwesomeIcon icon={faClock} />
                <span>{recipe.cookingTime}</span>
              </div>
              <div className="meta-item">
                <FontAwesomeIcon icon={faFire} />
                <span>{recipe.difficulty}</span>
              </div>
              <div className="meta-item">
                <FontAwesomeIcon icon={faUtensils} />
                <span>{recipe.category}</span>
              </div>
              <div className="meta-item">
                <FontAwesomeIcon icon={faLeaf} />
                <span>{recipe.tags.slice(0, 2).join(', ')}</span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="ingredients-section">
              <h2>Ingredients</h2>
              <ul className="ingredients-list">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="ingredient-item">
                    <span className="ingredient-text">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Directions */}
            <div className="directions-section">
              <h2>Directions</h2>
              <ol className="directions-list">
                {recipe.directions.map((direction, index) => (
                  <li key={index} className="direction-step">
                    <span className="step-number">{index + 1}</span>
                    <p>{direction}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Comments Section */}
            <div className="comments-section">
              <h2>
                <FontAwesomeIcon icon={faComment} />
                Comments ({comments.length})
              </h2>
              
              {/* Add Comment */}
              <form className="add-comment-form" onSubmit={handleAddComment}>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add your comment..."
                  rows="3"
                />
                <button type="submit" className="submit-comment-btn">
                  Post Comment
                </button>
              </form>

              {/* Comments List */}
              <div className="comments-list">
                {comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-header">
                      <img 
                        src={`https://i.pravatar.cc/40?img=${comment.id + 10}`} 
                        alt={comment.user}
                        className="comment-avatar"
                      />
                      <div className="comment-user">
                        <strong>{comment.user}</strong>
                        <span className="comment-time">{comment.time}</span>
                      </div>
                      {comment.user === user?.name && <span className="you-badge">You</span>}
                    </div>
                    <p className="comment-text">{comment.text}</p>
                    <div className="comment-actions">
                      <button 
                        className="comment-like"
                        onClick={() => handleCommentLike(comment.id)}
                      >
                        <FontAwesomeIcon icon={faHeart} />
                        {comment.likes}
                      </button>
                      <button className="reply-btn">Reply</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

     
            
    </div>
  );
};

export default RecipeDetail;