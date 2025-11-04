// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

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
  // const [user, setUser] = useState({
  //   id: 1,
  //   name: 'Test User',
  //   email: 'test@test.com',
  //   avatar: 'https://i.pravatar.cc/150?img=1'
  // });
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app start
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // ADD THE MISSING LOGIN FUNCTION
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              user: {
                id: 1,
                name: 'User',
                email: email,
                avatar: 'https://i.pravatar.cc/150?img=1'
              },
              token: 'mock-jwt-token-' + Date.now()
            }
          });
        }, 1000);
      });

      const { user: userData, token } = response.data;
      
      // Store in localStorage for persistence
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      setUser(userData);
      setIsLoading(false);
      
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  // FIXED SIGNUP FUNCTION (Auto-login version)
  const signup = async (userData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              user: {
                id: 1,
                name: userData.name,
                email: userData.email,
                avatar: 'https://i.pravatar.cc/150?img=1'
              },
              token: 'mock-jwt-token-' + Date.now()
            }
          });
        }, 1000);
      });

      const { user: newUser, token } = response.data;
      
      // Auto-login after signup
      setUser(newUser);
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(newUser));
      
      setIsLoading(false);
      return response;
      
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = '/';
  };

  const updateUser = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      localStorage.setItem('userData', JSON.stringify({ ...parsedData, ...updatedData }));
    }
  };

  const value = {
    user,
    isLoading,
    login, // NOW THIS EXISTS!
    signup,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};