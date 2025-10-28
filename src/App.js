// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import Layout from './components/Layout';
import Home from './components/Home';
import Explore from './pages/Explore';
import RecipeDetail from './pages/RecipeDetail';
import TopRecipes from './pages/TopRecipes';
import Community from './pages/Community';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  return (
    <AuthProvider> 
      <Router>
        <div className="App">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={
              <Layout>
                <Home />
              </Layout>
            } />
            
            {/* Explore Route */}
            <Route path="/explore" element={
              <Layout>
                <Explore />
              </Layout>
            } />
            
            {/* Recipe Details Route */}
            <Route path="/recipe/:id" element={
              <Layout>
                <RecipeDetail />
              </Layout>
            } />
            
            {/* Top Recipes Route */}
            <Route path="/top-recipes" element={
              <Layout>
                <TopRecipes />
              </Layout>
            } />
            
            {/* Community Route */}
            <Route path="/community" element={
              <Layout>
                <Community />
              </Layout>
            } />

            <Route path='/top-recipes' element={
              <Layout>
                <TopRecipes />
              </Layout>
            } />
            
            <Route path='/community' element={
              <Layout>
                <Community />
              </Layout>
            } />
            {/* Auth Routes (without Layout) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;