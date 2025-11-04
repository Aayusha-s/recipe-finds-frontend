import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faCamera, 
  faClock, 
  faUtensils, 
  faList, 
  faBook,
  faPlus,
  faTrash,
  faFire
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import './CreateRecipe.css';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Easy',
    category: '',
    image: null,
    ingredients: [''],
    instructions: [''],
    tags: []
  });

  const categories = [
    'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Low-Carb', 'Keto',
    'Italian', 'Mexican', 'Asian', 'Indian', 'Mediterranean',
    'Quick & Easy', 'Comfort Food', 'Healthy', 'Party'
  ];

  const difficulties = ['Very Easy', 'Easy', 'Medium', 'Hard', 'Expert'];

  const handleInputChange = (field, value) => {
    setRecipeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setRecipeData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setRecipeData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    if (recipeData[field].length > 1) {
      setRecipeData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setRecipeData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagAdd = (tag) => {
    if (tag && !recipeData.tags.includes(tag)) {
      setRecipeData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setRecipeData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Validate required fields
  if (!recipeData.title || !recipeData.description || !recipeData.ingredients[0] || !recipeData.instructions[0]) {
    alert('Please fill in all required fields');
    setIsSubmitting(false);
    return;
  }

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create the recipe object to send to profile
    const newRecipe = {
      title: recipeData.title,
      description: recipeData.description,
      image: recipeData.image,
      cookTime: recipeData.cookTime ? `${recipeData.cookTime} mins` : '30 mins',
      prepTime: recipeData.prepTime ? `${recipeData.prepTime} mins` : '15 mins',
      difficulty: recipeData.difficulty,
      category: recipeData.category,
      servings: recipeData.servings,
      ingredients: recipeData.ingredients.filter(ing => ing.trim() !== ''),
      instructions: recipeData.instructions.filter(inst => inst.trim() !== ''),
      tags: recipeData.tags,
      createdAt: new Date().toISOString()
    };

    // In real app, you would send recipeData to your backend
    console.log('Recipe created:', newRecipe);
    
    // Navigate back to profile with the new recipe data
    navigate('/profile', { 
      state: { 
        newRecipe: newRecipe,
        showRecipesTab: true 
      } 
    });
    
  } catch (error) {
    console.error('Error creating recipe:', error);
    alert('Failed to create recipe. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="create-recipe-page">
      <div className="create-recipe-container">
        {/* Header */}
        <header className="create-recipe-header">
          <button className="back-button" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>
          <h1>Create New Recipe</h1>
          <div className="header-actions">
            <button 
              className="preview-btn"
              onClick={() => {/* Preview functionality */}}
            >
              Preview
            </button>
            <button 
              className="save-draft-btn"
              onClick={() => {/* Save draft functionality */}}
            >
              Save Draft
            </button>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="create-recipe-form">
          {/* Basic Information Section */}
          <section className="form-section">
            <h2>Basic Information</h2>
            
            {/* Recipe Title */}
            <div className="form-group">
              <label className="form-label required">Recipe Title</label>
              <input
                type="text"
                value={recipeData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Classic Chocolate Chip Cookies"
                className="form-input"
                required
              />
            </div>

            {/* Recipe Description */}
            <div className="form-group">
              <label className="form-label required">Description</label>
              <textarea
                value={recipeData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your recipe... What makes it special?"
                className="form-textarea"
                rows="4"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label className="form-label">Recipe Image</label>
              <div className="image-upload-container">
                {recipeData.image ? (
                  <div className="image-preview">
                    <img src={recipeData.image} alt="Recipe preview" />
                    <button 
                      type="button"
                      className="change-image-btn"
                      onClick={() => handleInputChange('image', null)}
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <label className="image-upload-area">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="image-input"
                    />
                    <FontAwesomeIcon icon={faCamera} className="upload-icon" />
                    <span>Click to upload recipe image</span>
                    <p>Recommended: 1200x800 pixels or similar ratio</p>
                  </label>
                )}
              </div>
            </div>
          </section>

          {/* Recipe Details Section */}
          <section className="form-section">
            <h2>Recipe Details</h2>
            <div className="details-grid">
              {/* Preparation Time */}
              <div className="form-group">
                <label className="form-label">
                  <FontAwesomeIcon icon={faClock} />
                  Prep Time (minutes)
                </label>
                <input
                  type="number"
                  value={recipeData.prepTime}
                  onChange={(e) => handleInputChange('prepTime', e.target.value)}
                  placeholder="15"
                  className="form-input"
                />
              </div>

              {/* Cooking Time */}
              <div className="form-group">
                <label className="form-label">
                  <FontAwesomeIcon icon={faFire} />
                  Cook Time (minutes)
                </label>
                <input
                  type="number"
                  value={recipeData.cookTime}
                  onChange={(e) => handleInputChange('cookTime', e.target.value)}
                  placeholder="30"
                  className="form-input"
                />
              </div>

              {/* Servings */}
              <div className="form-group">
                <label className="form-label">
                  <FontAwesomeIcon icon={faUtensils} />
                  Servings
                </label>
                <input
                  type="number"
                  value={recipeData.servings}
                  onChange={(e) => handleInputChange('servings', e.target.value)}
                  placeholder="4"
                  className="form-input"
                />
              </div>

              {/* Difficulty */}
              <div className="form-group">
                <label className="form-label">Difficulty</label>
                <select
                  value={recipeData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className="form-select"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={recipeData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="form-select"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Ingredients Section */}
          <section className="form-section">
            <h2>
              <FontAwesomeIcon icon={faList} />
              Ingredients
            </h2>
            <div className="ingredients-list">
              {recipeData.ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-item">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleArrayChange('ingredients', index, e.target.value)}
                    placeholder="e.g., 2 cups all-purpose flour"
                    className="form-input"
                    required={index === 0}
                  />
                  {recipeData.ingredients.length > 1 && (
                    <button
                      type="button"
                      className="remove-item-btn"
                      onClick={() => removeArrayItem('ingredients', index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="add-item-btn"
                onClick={() => addArrayItem('ingredients')}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add Another Ingredient
              </button>
            </div>
          </section>

          {/* Instructions Section */}
          <section className="form-section">
            <h2>
              <FontAwesomeIcon icon={faBook} />
              Instructions
            </h2>
            <div className="instructions-list">
              {recipeData.instructions.map((instruction, index) => (
                <div key={index} className="instruction-item">
                  <div className="step-number">Step {index + 1}</div>
                  <textarea
                    value={instruction}
                    onChange={(e) => handleArrayChange('instructions', index, e.target.value)}
                    placeholder="Describe this step in detail..."
                    className="form-textarea step-textarea"
                    rows="3"
                    required={index === 0}
                  />
                  {recipeData.instructions.length > 1 && (
                    <button
                      type="button"
                      className="remove-item-btn"
                      onClick={() => removeArrayItem('instructions', index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="add-item-btn"
                onClick={() => addArrayItem('instructions')}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add Another Step
              </button>
            </div>
          </section>

          {/* Tags Section */}
          <section className="form-section">
            <h2>Tags</h2>
            <div className="tags-section">
              <div className="tags-input-container">
                <input
                  type="text"
                  placeholder="Add tags (e.g., spicy, healthy, quick)..."
                  className="form-input"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleTagAdd(e.target.value.trim());
                      e.target.value = '';
                    }
                  }}
                />
                <button type="button" className="add-tag-btn">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className="tags-list">
                {recipeData.tags.map(tag => (
                  <span key={tag} className="tag">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="remove-tag"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Submit Section */}
          <section className="submit-section">
            <button
              type="submit"
              className={`submit-recipe-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Creating Recipe...
                </>
              ) : (
                'Publish Recipe'
              )}
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;