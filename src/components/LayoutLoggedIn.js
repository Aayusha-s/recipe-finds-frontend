import React from 'react';
import HeaderLoggedIn from '../componentsLoggedIn/HeaderLoggedIn';
import Footer from './Footer';
import './LayoutLoggedIn.css';

const LayoutLoggedIn = ({ children }) => {
  return (
    <div className="layout-loggedin">
      <HeaderLoggedIn />
      <main className="main-content-loggedin">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutLoggedIn;