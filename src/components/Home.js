// components/Home.js
import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Categories from './Categories';
import PopularRecipes from './PopularRecipes';
import QuickRecipes from './QuickRecipes';
import Community from './Community';
import Footer from './Footer';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <Categories />
      <PopularRecipes />
      <QuickRecipes />
      <Community />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;