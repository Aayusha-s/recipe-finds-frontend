// components/Layout.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Header from './header/Header';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;