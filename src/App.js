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
import LayoutLoggedIn from "./components/LayoutLoggedIn";

import HomeLoggedIn from './pages-protected/HomeLoggedIn';
import ExploreLoggedIn from './pages-protected/ExploreLoggedIn';
import CommunityPageLoggedIn from './pages-protected/CommunityPageLoggedIn';

import TopRecipesLoggedIn from './pages-protected/TopRecipesLoggedIn';

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
              path="/top-recipes"
              element={
                <Layout>
                  <TopRecipes />
                </Layout>
              }
            />

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

            {/* Protected/Logged-in Routes */}
            <Route
              path="/home-loggedin"
              element={
                <LayoutLoggedIn>
                  <HomeLoggedIn />
                </LayoutLoggedIn>
              }
            />
            <Route
              path="/explore-loggedin"
              element={
                <LayoutLoggedIn>
                  <ExploreLoggedIn />
                </LayoutLoggedIn>
              }
            />
            <Route
              path="/community-loggedin"
              element={
                <LayoutLoggedIn>
                  <CommunityPageLoggedIn />
                </LayoutLoggedIn>
              }
            />

            <Route
              path="/top-recipes-loggedin"
              element={
                <LayoutLoggedIn>
                  <TopRecipesLoggedIn />
                </LayoutLoggedIn>
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
