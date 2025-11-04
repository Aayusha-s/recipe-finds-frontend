import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      recipeUpdates: true,
      newsletter: false
    },
    privacy: {
      profilePublic: true,
      showEmail: false,
      showRecipes: true
    },
    preferences: {
      cuisine: 'Any',
      difficulty: 'All',
      servings: 4,
      dietary: ['Vegetarian']
    }
  });

  const [activeTab, setActiveTab] = useState('notifications');

  const handleNotificationChange = (key) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key]
      }
    });
  };

  const handlePrivacyChange = (key) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key]
      }
    });
  };

  const handlePreferenceChange = (key, value) => {
    setSettings({
      ...settings,
      preferences: {
        ...settings.preferences,
        [key]: value
      }
    });
  };

  const handleSaveSettings = () => {
    // Save settings to backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <h1>Account Settings</h1>
      
      <div className="settings-content">
        <div className="settings-sidebar">
          <button 
            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            Privacy
          </button>
          <button 
            className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
          </button>
          <button 
            className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            Account
          </button>
        </div>

        <div className="settings-main">
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Settings</h2>
              <div className="setting-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                  <span className="slider"></span>
                </label>
                <div className="setting-info">
                  <h4>Email Notifications</h4>
                  <p>Receive updates via email</p>
                </div>
              </div>

              <div className="setting-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={() => handleNotificationChange('push')}
                  />
                  <span className="slider"></span>
                </label>
                <div className="setting-info">
                  <h4>Push Notifications</h4>
                  <p>Get notifications in your browser</p>
                </div>
              </div>

              <div className="setting-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications.recipeUpdates}
                    onChange={() => handleNotificationChange('recipeUpdates')}
                  />
                  <span className="slider"></span>
                </label>
                <div className="setting-info">
                  <h4>Recipe Updates</h4>
                  <p>Notifications about saved recipes</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="settings-section">
              <h2>Privacy Settings</h2>
              <div className="setting-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.privacy.profilePublic}
                    onChange={() => handlePrivacyChange('profilePublic')}
                  />
                  <span className="slider"></span>
                </label>
                <div className="setting-info">
                  <h4>Public Profile</h4>
                  <p>Allow others to view your profile</p>
                </div>
              </div>

              <div className="setting-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.privacy.showEmail}
                    onChange={() => handlePrivacyChange('showEmail')}
                  />
                  <span className="slider"></span>
                </label>
                <div className="setting-info">
                  <h4>Show Email</h4>
                  <p>Display your email on your public profile</p>
                </div>
              </div>

              <div className="setting-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.privacy.showRecipes}
                    onChange={() => handlePrivacyChange('showRecipes')}
                  />
                  <span className="slider"></span>
                </label>
                <div className="setting-info">
                  <h4>Show My Recipes</h4>
                  <p>Display your recipes to other users</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="settings-section">
              <h2>Cooking Preferences</h2>
              
              <div className="preference-group">
                <label>Preferred Cuisine</label>
                <select 
                  value={settings.preferences.cuisine}
                  onChange={(e) => handlePreferenceChange('cuisine', e.target.value)}
                >
                  <option value="Any">Any Cuisine</option>
                  <option value="Italian">Italian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Asian">Asian</option>
                  <option value="Indian">Indian</option>
                </select>
              </div>

              <div className="preference-group">
                <label>Difficulty Level</label>
                <select 
                  value={settings.preferences.difficulty}
                  onChange={(e) => handlePreferenceChange('difficulty', e.target.value)}
                >
                  <option value="All">All Levels</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="preference-group">
                <label>Default Servings</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={settings.preferences.servings}
                  onChange={(e) => handlePreferenceChange('servings', parseInt(e.target.value))}
                />
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="settings-section">
              <h2>Account Management</h2>
              
              <div className="account-actions">
                <button className="action-btn change-password">
                  Change Password
                </button>
                <button className="action-btn download-data">
                  Download My Data
                </button>
                <button className="action-btn delete-account">
                  Delete Account
                </button>
              </div>
            </div>
          )}

          <button className="save-settings-btn" onClick={handleSaveSettings}>
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;