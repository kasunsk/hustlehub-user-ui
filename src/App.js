import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import HustleGrid from './components/HustleGrid';
import { fetchActiveHustles } from './utils/api';
import Header from './components/Header';
import './styles/Button.css';

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
    <div className="App">
        <div><Header /> </div>
        <div className="button-container">
                <button className="my-hustle-button" onClick={loadHustles}>
                  My Hustle
                </button>
        </div>
        {loading && <p>Loading...</p>}
        <HustleGrid data={hustleData} />
    </div>
  );
}

export default App;
