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
import { UserProvider } from './components/UserContext'; //

function App() {
  const [hustleData, setHustleData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadHustles = async () => {
     setLoading(true);
     try {
       const data = await fetchActiveHustles();
       setHustleData(data);
     } catch (error) {
       console.error('Failed to load hustles:', error.message);
     } finally {
       setLoading(false);
     }
  };
  return (
  <UserProvider>
  <Router>
        <div><Header /> </div>
        <div className="button-container">
                <button className="my-hustle-button" onClick={loadHustles}>
                  My Hustle
                </button>
        </div>
        {loading && <p>Loading...</p>}
        <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login by default */}
                <Route path="/hustle" element={<HustleGrid data={hustleData} />} />
                <Route path="/view/:id" element={<ViewHustle />} />
         </Routes>
     </Router>
      </UserProvider>
  );
}

export default App;
