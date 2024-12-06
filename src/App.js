import logo from './logo.svg';
import './App.css';
import './styles/Button.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import HustleGrid from './components/HustleGrid';
import { fetchActiveHustles } from './utils/api';
import Header from './components/Header';
import ViewHustle from './components/ViewHustle';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import { UserProvider } from './components/UserContext';
import HustleList from './components/HustleList';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
  <AuthProvider>
  <UserProvider>
  <Router>
        <div><Header /> </div>
        <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login by default */}
                <Route path="/hustle" element={<ProtectedRoute><HustleList /></ProtectedRoute>} />
                <Route path="/view/:id" element={<ProtectedRoute><ViewHustle /></ProtectedRoute>} />
         </Routes>
     </Router>
      </UserProvider>
      </AuthProvider>
  );
}

export default App;
