// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import Layout from "./components/Layout";
import Home from "./components/Home";
import Explore from "./pages/Explore";
import RecipeDetail from "./pages/RecipeDetail";
import TopRecipes from "./pages/TopRecipes";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import UserProfile from "./pages/UserProfile";
import CategoryPage from "./pages/CategoryPage";

import Profile from './pages-protected/Profile';
import Settings from './pages-protected/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import CreateRecipe from "./pages-protected/CreateRecipe";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />

            {/* Explore Route */}
            <Route path="/explore" element={<Explore />} />

            {/* Recipe Details Route */}
            <Route
              path="/recipe/:id"
              element={
                <Layout>
                  <RecipeDetail />
                </Layout>
              }
            />

            {/* Top Recipes Route */}
            <Route
              path="/top-recipes"
              element={
                <Layout>
                  <TopRecipes />
                </Layout>
              }
            />

            {/* Community Route */}
            <Route
              path="/community"
              element={
                <Layout>
                  <Community />
                </Layout>
              }
            />
           

            <Route
              path="/chef/:username"
              element={
                <Layout>
                  <UserProfile />
                </Layout>
              }
            />

            <Route
              path="/category/:categoryId"
              element={
                <Layout>
                  <CategoryPage />
                </Layout>
              }
            />

                {/* Protected Routes - Only accessible when logged in */}
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            } />


              <Route 
  path="/create-recipe" 
  element={
    <ProtectedRoute>
      <Layout>
        <CreateRecipe />
      </Layout>
    </ProtectedRoute>
  } 
/>

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
