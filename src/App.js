import logo from './logo.svg';
import './App.css';
import './styles/Button.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HustleGrid from './components/HustleGrid';
import { fetchActiveHustles } from './utils/api';
import Header from './components/Header';
import ViewHustle from './components/ViewHustle';

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
  <Router>
        <div><Header /> </div>
        <div className="button-container">
                <button className="my-hustle-button" onClick={loadHustles}>
                  My Hustle
                </button>
        </div>
        {loading && <p>Loading...</p>}
        <Routes>
                <Route path="/" element={<HustleGrid data={hustleData} />} />
                <Route path="/view/:id" element={<ViewHustle />} />
         </Routes>
     </Router>
  );
}

export default App;
