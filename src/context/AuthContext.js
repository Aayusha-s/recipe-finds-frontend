// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setUser({
          id: 1,
          name: 'User',
          email: email,
          avatar: 'https://i.pravatar.cc/150?img=1'
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const signup = async (userData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setUser({
          id: 1,
          name: userData.name,
          email: userData.email,
          avatar: 'https://i.pravatar.cc/150?img=1'
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};