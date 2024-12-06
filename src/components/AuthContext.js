import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

// Create AuthContext
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sailorId, setSailorId] = useState(null);
  const [fullName, setFullName] = useState('');

  const login = () => setIsAuthenticated(true); // Call this after successful login
  const logout = () => setIsAuthenticated(false); // Call this to log out the user

  const setFullNameWithLog = (name) => {
      console.log('Setting Full Name:', name); // Debugging log
      setFullName(name);
    };

  return (
    <AuthContext.Provider value={{ isAuthenticated, sailorId, setSailorId, login, logout, fullName, setFullName: setFullNameWithLog }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};